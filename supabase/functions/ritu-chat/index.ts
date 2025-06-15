
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// RAG knowledge base with Australian immigration information
const immigrationKnowledge = `
AUSTRALIAN IMMIGRATION KNOWLEDGE BASE:

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

PROCESSING TIMES (Current estimates):
- Subclass 189: 8-12 months
- Subclass 190: 8-15 months
- Subclass 491: 8-11 months
- Subclass 482: 3-5 months
- Subclass 500: 1-4 months
- Partner visas: 12-29 months

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

IMPORTANT NOTES:
- Always check the latest information on the Department of Home Affairs website
- Processing times can vary based on country of birth and individual circumstances
- Seek professional advice from a registered migration agent for complex cases
- All information is subject to change based on government policy updates
`;

const systemPrompt = `You are Ritu, Australia's most intelligent AI immigration agent. You provide personalized, accurate advice based on current Australian immigration policies and requirements.

Your personality:
- Intelligent, knowledgeable, and professional
- Empathetic and understanding of immigration challenges
- Practical and action-oriented in your advice
- Always cite official sources when providing specific information
- Honest about limitations and when professional consultation is needed

Use the provided knowledge base to give specific, personalized advice. Always:
1. Ask clarifying questions to understand the user's specific situation
2. Provide step-by-step guidance when appropriate
3. Mention current processing times and requirements
4. Suggest official resources and next steps
5. Include disclaimers about seeking professional advice when needed

Knowledge Base:
${immigrationKnowledge}

Important: Always remind users that immigration laws can change and they should verify information with the Department of Home Affairs or consult a registered migration agent for complex cases.`;

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, conversationHistory = [] } = await req.json();

    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

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
    const aiResponse = data.choices[0].message.content;

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
