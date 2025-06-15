
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Static knowledge base as fallback
const staticKnowledge = `
AUSTRALIAN IMMIGRATION KNOWLEDGE BASE (FALLBACK):

VISA TYPES:
- Subclass 189 (Skilled Independent): Permanent visa, no sponsorship required, points-based system
- Subclass 190 (Skilled Nominated): Permanent visa, requires state nomination, points-based system
- Subclass 491 (Skilled Work Regional): Provisional visa, requires regional nomination or family sponsorship
- Subclass 482 (Temporary Skill Shortage): Temporary visa, requires employer sponsorship
- Subclass 500 (Student): Temporary visa for full-time study
- Partner visas (820/801, 309/100): For partners of Australian citizens/residents
- Parent visas (103/143): For parents of Australian citizens/residents

POINTS TEST FACTORS:
- Age (18-24: 25 points, 25-32: 30 points, 33-39: 25 points, 40-44: 15 points, 45-49: 0 points)
- English proficiency (Competent: 0, Proficient: 10, Superior: 20 points)
- Skilled employment (1-2 years: 5, 3-4 years: 10, 5-7 years: 15, 8+ years: 20 points)
- Australian study (2+ years: 5 points)
- Professional Year (5 points)
- Community language (5 points)
- Regional study (5 points)
- Partner skills (10 points if applicable)

ENGLISH REQUIREMENTS:
- IELTS: Overall 6.0 (Competent), 7.0 (Proficient), 8.0 (Superior)
- PTE: Overall 50 (Competent), 65 (Proficient), 79 (Superior)
- TOEFL: Overall 64 (Competent), 94 (Proficient), 110 (Superior)

SKILLS ASSESSMENT:
- Engineering: Engineers Australia (EA)
- ICT: Australian Computer Society (ACS)
- Accounting: CPA Australia, CA ANZ, IPA
- Health: AHPRA
- Trades: TRA (Trades Recognition Australia)

COMMON DOCUMENTS:
- Passport and birth certificate
- Educational qualifications and transcripts
- English test results (IELTS/PTE/TOEFL)
- Skills assessment
- Work experience references
- Health examinations
- Police certificates
- Financial evidence
`;

async function getDynamicKnowledge(): Promise<string> {
  try {
    const { data, error } = await supabase
      .from('knowledge_base')
      .select('*')
      .eq('is_active', true)
      .order('last_updated', { ascending: false });
      
    if (error || !data || data.length === 0) {
      console.log('Using static knowledge base as fallback');
      return staticKnowledge;
    }
    
    // Build dynamic knowledge from database
    let dynamicKnowledge = `AUSTRALIAN IMMIGRATION KNOWLEDGE BASE (UPDATED ${new Date().toISOString().split('T')[0]}):\n\n`;
    
    data.forEach(section => {
      if (section.section === 'processing_times') {
        dynamicKnowledge += "CURRENT PROCESSING TIMES:\n";
        Object.entries(section.content).forEach(([visa, time]) => {
          dynamicKnowledge += `- Subclass ${visa}: ${time}\n`;
        });
        dynamicKnowledge += `\nLast updated: ${section.last_updated}\nSource: ${section.source_url}\n\n`;
      }
      
      if (section.section === 'visa_costs') {
        dynamicKnowledge += "CURRENT VISA COSTS:\n";
        Object.entries(section.content).forEach(([visa, cost]) => {
          dynamicKnowledge += `- Subclass ${visa}: ${cost}\n`;
        });
        dynamicKnowledge += `\nLast updated: ${section.last_updated}\nSource: ${section.source_url}\n\n`;
      }
    });
    
    // Add static knowledge for comprehensive coverage
    dynamicKnowledge += staticKnowledge;
    
    return dynamicKnowledge;
  } catch (error) {
    console.error('Error fetching dynamic knowledge:', error);
    return staticKnowledge;
  }
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, conversationHistory = [] } = await req.json();

    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    // Get dynamic knowledge base
    const knowledgeBase = await getDynamicKnowledge();
    
    const systemPrompt = `You are Ritu, Australia's most intelligent AI immigration agent. You provide personalized, accurate advice based on current Australian immigration policies and requirements.

CRITICAL RESPONSE FORMAT REQUIREMENTS:
- Write ALL responses in plain text format only
- NO markdown formatting, bold, italic, underline, or special characters
- NO bullet points, numbered lists, or asterisks for emphasis
- Use simple paragraph format with line breaks for readability
- Keep language conversational and easy to understand
- Break long responses into short paragraphs
- Avoid technical jargon - explain complex terms simply
- Each response should be direct and actionable

Your personality:
- Intelligent, knowledgeable, and professional
- Empathetic and understanding of immigration challenges
- Practical and action-oriented in your advice
- Always cite official sources when providing specific information
- Honest about limitations and when professional consultation is needed

Use the provided knowledge base to give specific, personalized advice. Always:
1. Start with a direct answer to the user's question
2. Provide specific, actionable advice in simple language
3. Break information into digestible paragraphs
4. Mention current processing times and requirements
5. Suggest official resources and next steps
6. Include disclaimers about seeking professional advice when needed

IMPORTANT: When providing processing times or visa costs, always mention that this information is regularly updated from official sources and include the recommendation to verify current information with the Department of Home Affairs.

Knowledge Base:
${knowledgeBase}

Important: Always remind users that immigration laws can change and they should verify information with the Department of Home Affairs or consult a registered migration agent for complex cases. Format this reminder naturally within your response, not as a separate disclaimer.`;

    // Build conversation messages with context
    const messages = [
      { role: 'system', content: systemPrompt },
      ...conversationHistory.map((msg: any) => ({
        role: msg.type === 'user' ? 'user' : 'assistant',
        content: msg.message
      })),
      { role: 'user', content: message }
    ];

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: messages,
        temperature: 0.7,
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    let aiResponse = data.choices[0].message.content;

    // Enhanced text sanitization to remove ALL formatting
    aiResponse = aiResponse
      .replace(/\*\*(.*?)\*\*/g, '$1')
      .replace(/\*(.*?)\*/g, '$1')
      .replace(/__(.*?)__/g, '$1')
      .replace(/`(.*?)`/g, '$1')
      .replace(/#{1,6}\s/g, '')
      .replace(/^\s*[\*\-\+]\s/gm, '')
      .replace(/^\s*\d+\.\s/gm, '')
      .replace(/<[^>]*>/g, '')
      .replace(/class="[^"]*"/g, '')
      .replace(/style="[^"]*"/g, '')
      .replace(/australia-blue/g, '')
      .replace(/font-semibold/g, '')
      .replace(/font-bold/g, '')
      .replace(/text-\w+-\d+/g, '')
      .replace(/bg-\w+-\d+/g, '')
      .replace(/"\s*([^"]+)\s*"/g, '$1')
      .replace(/\s+/g, ' ')
      .replace(/\n{3,}/g, '\n\n')
      .trim();

    return new Response(JSON.stringify({ 
      response: aiResponse,
      success: true 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in ritu-chat function:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      success: false,
      fallback: "I apologize, but I'm experiencing technical difficulties. Please try again in a moment, or contact our human agents for immediate assistance."
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
