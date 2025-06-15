
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
const staticKnowledgeBase = `
AUSTRALIAN IMMIGRATION KNOWLEDGE BASE (FALLBACK):

VISA TYPES:
- Subclass 189 (Skilled Independent): Permanent visa, no sponsorship required, points-based system
- Subclass 190 (Skilled Nominated): Permanent visa, requires state nomination, points-based system
- Subclass 491 (Skilled Work Regional): Provisional visa, requires regional nomination or family sponsorship
- Subclass 482 (Temporary Skill Shortage): Temporary visa, requires employer sponsorship
- Subclass 485 (Temporary Graduate): For recent graduates from Australian institutions
- Subclass 500 (Student): Temporary visa for full-time study
- Partner visas (820/801, 309/100): For partners of Australian citizens/residents

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
`;

async function fetchCurrentImmigrationData(): Promise<string> {
  try {
    const { data, error } = await supabase
      .from('immigration_data')
      .select('*')
      .order('last_updated', { ascending: false });
      
    if (error || !data || data.length === 0) {
      console.log('Using static knowledge base as fallback');
      return staticKnowledgeBase;
    }
    
    // Build dynamic knowledge from database
    let dynamicKnowledge = `CURRENT AUSTRALIAN IMMIGRATION DATA (Updated ${new Date().toISOString().split('T')[0]}):\n\n`;
    
    // Group data by type
    const processingTimes = data.filter(item => item.data_type === 'processing_times');
    
    if (processingTimes.length > 0) {
      dynamicKnowledge += "CURRENT PROCESSING TIMES:\n";
      processingTimes.forEach(item => {
        const content = item.data_content;
        dynamicKnowledge += `- ${content.visa_name}: 75% processed in ${content.processing_time_75}, 90% in ${content.processing_time_90}\n`;
      });
      dynamicKnowledge += `\nLast updated: ${new Date(processingTimes[0].last_updated).toLocaleDateString()}\n\n`;
    }
    
    // Add static knowledge for comprehensive coverage
    dynamicKnowledge += staticKnowledgeBase;
    
    return dynamicKnowledge;
  } catch (error) {
    console.error('Error fetching current immigration data:', error);
    return staticKnowledgeBase;
  }
}

async function getSpecificVisaInfo(userMessage: string): Promise<string> {
  const message = userMessage.toLowerCase();
  
  // Extract visa subclass from message
  const visaMatches = message.match(/(\d{3})\s*visa|subclass\s*(\d{3})|visa\s*(\d{3})/);
  const visaSubclass = visaMatches ? (visaMatches[1] || visaMatches[2] || visaMatches[3]) : null;
  
  if (visaSubclass && (message.includes('processing') || message.includes('time') || message.includes('how long'))) {
    try {
      const { data, error } = await supabase
        .from('immigration_data')
        .select('*')
        .eq('data_type', 'processing_times')
        .eq('visa_subclass', visaSubclass);
      
      if (!error && data && data.length > 0) {
        const item = data[0];
        const content = item.data_content;
        return `\nCURRENT PROCESSING TIMES FOR ${content.visa_name.toUpperCase()}:
• 75% of applications: ${content.processing_time_75}
• 90% of applications: ${content.processing_time_90}
Last updated: ${new Date(item.last_updated).toLocaleDateString()}

Source: Official Department of Home Affairs data\n`;
      }
    } catch (error) {
      console.error('Error fetching specific visa info:', error);
    }
  }
  
  return '';
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

    // Get current immigration data and specific visa info
    const [knowledgeBase, specificInfo] = await Promise.all([
      fetchCurrentImmigrationData(),
      getSpecificVisaInfo(message)
    ]);
    
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

IMPORTANT: When providing processing times or specific visa information, ALWAYS use the current data from the knowledge base below. Reference exact timeframes and mention when the data was last updated.

${specificInfo ? `SPECIFIC INFORMATION FOR THIS QUERY:\n${specificInfo}` : ''}

Current Knowledge Base:
${knowledgeBase}

Always remind users that immigration laws can change and they should verify information with the Department of Home Affairs or consult a registered migration agent for complex cases. Format this reminder naturally within your response, not as a separate disclaimer.`;

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
