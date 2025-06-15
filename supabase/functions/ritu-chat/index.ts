
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Enhanced RAG knowledge base with more comprehensive Australian immigration information
const immigrationKnowledge = `
AUSTRALIAN IMMIGRATION KNOWLEDGE BASE - COMPREHENSIVE EDITION:

VISA TYPES AND PATHWAYS:
- Subclass 189 (Skilled Independent): Permanent visa, no sponsorship required, points-based system (minimum 65 points, competitive scores 80-90+)
- Subclass 190 (Skilled Nominated): Permanent visa, requires state nomination, points-based system (minimum 65 points + state nomination)
- Subclass 491 (Skilled Work Regional): Provisional visa, requires regional nomination or family sponsorship (minimum 65 points)
- Subclass 482 (Temporary Skill Shortage): Temporary visa, requires employer sponsorship (Short-term: 2 years, Medium-term: 4 years)
- Subclass 500 (Student): Temporary visa for full-time study (English requirement, financial capacity, GTE)
- Partner visas (820/801, 309/100): For partners of Australian citizens/residents (two-stage process)
- Parent visas (103/143): For parents of Australian citizens/residents (contributory and non-contributory)
- Subclass 186 (Employer Nomination Scheme): Permanent employer-sponsored visa
- Subclass 494 (Skilled Employer Sponsored Regional): Regional employer sponsorship

POINTS TEST COMPREHENSIVE BREAKDOWN:
Age Points:
- 18-24 years: 25 points
- 25-32 years: 30 points (optimal age range)
- 33-39 years: 25 points
- 40-44 years: 15 points
- 45-49 years: 0 points

English Proficiency Points:
- Competent English (IELTS 6.0 each): 0 points
- Proficient English (IELTS 7.0 each): 10 points
- Superior English (IELTS 8.0 each): 20 points

Skilled Employment Points (in nominated occupation):
- Less than 1 year: 0 points
- 1-2 years: 5 points
- 3-4 years: 10 points
- 5-7 years: 15 points
- 8+ years: 20 points

Educational Qualifications:
- Bachelor's degree or higher: 15 points
- Doctorate degree: 20 points

Australian Study Requirement:
- 2+ years study in Australia: 5 points

Other Factor Points:
- Professional Year Program: 5 points
- Community Language (NAATI): 5 points
- Regional Study: 5 points
- Partner Skills (if applicable): 10 points
- Specialist Education Qualification: 10 points

CURRENT PROCESSING TIMES (2024):
- Subclass 189: 8-12 months
- Subclass 190: 8-15 months
- Subclass 491: 8-11 months
- Subclass 482 (TSS): 3-5 months
- Subclass 500 (Student): 1-4 months
- Partner visas: 12-29 months
- Parent visas: 12-30 years (non-contributory), 12-24 months (contributory)

ENGLISH TEST REQUIREMENTS:
IELTS Academic:
- Competent: Overall 6.0 (minimum 6.0 each band)
- Proficient: Overall 7.0 (minimum 7.0 each band)
- Superior: Overall 8.0 (minimum 8.0 each band)

PTE Academic:
- Competent: Overall 50 (minimum 50 each)
- Proficient: Overall 65 (minimum 65 each)
- Superior: Overall 79 (minimum 79 each)

TOEFL iBT:
- Competent: Overall 64 (L:12, R:13, W:21, S:18)
- Proficient: Overall 94 (L:24, R:24, W:27, S:23)
- Superior: Overall 110 (L:28, R:29, W:30, S:26)

SKILLS ASSESSMENT AUTHORITIES:
- Engineering: Engineers Australia (EA)
- ICT: Australian Computer Society (ACS)
- Accounting: CPA Australia, CA ANZ, IPA
- Health Professionals: AHPRA
- Trades: TRA (Trades Recognition Australia)
- Teachers: AITSL
- Architects: AACA
- Veterinarians: AVBC

DOCUMENT REQUIREMENTS:
Essential Documents:
- Passport and birth certificate
- Educational qualifications and transcripts
- English test results (valid for 3 years)
- Skills assessment (valid for 3 years)
- Work experience references and employment contracts
- Health examinations (valid for 12 months)
- Police certificates (valid for 12 months)
- Financial evidence (bank statements, tax returns)

Additional Documents (if applicable):
- Marriage certificate (for partner applications)
- Children's documents (for family applications)
- Military service records
- Change of name documents

STATE NOMINATION PROGRAMS:
- NSW: Skilled Nominated visa (190) and Regional visa (491)
- Victoria: Skilled migration program
- Queensland: Business and Skilled Migration Program
- Western Australia: State Nomination Program
- South Australia: State Nominated Migration Program
- Tasmania: Skilled Migration Program
- ACT: Canberra Matrix
- Northern Territory: Territory Nominated Program

CURRENT VISA APPLICATION COSTS (2024):
- Subclass 189: AUD 4,640 (main applicant)
- Subclass 190: AUD 4,640 (main applicant)
- Subclass 491: AUD 4,640 (main applicant)
- Subclass 482: AUD 1,330-2,690 (depending on stream)
- Subclass 500: AUD 710 (main applicant)
- Partner visas: AUD 8,515 (combined application)
- Additional applicant fees apply

IMPORTANT POLICY UPDATES:
- Regular SkillSelect invitation rounds (usually monthly)
- Occupation ceiling limits updated annually
- State nomination requirements change frequently
- Priority Migration Skilled Occupation List (PMSOL) for critical skills
- COVID-19 related policy changes and updates

COMMON PATHWAYS TO PERMANENT RESIDENCE:
1. Direct skilled migration (189/190/491)
2. Employer sponsorship pathway (482 → 186/494)
3. Student visa pathway (500 → Graduate visa → Skilled visa)
4. Working Holiday visa pathway (417/462 → other visas)
5. Family/Partner visa pathway

REGIONAL MIGRATION:
- Designated Regional Areas (DRA) for 491/494 visas
- Regional population growth program
- Regional employer sponsorship opportunities
- Living and working requirements in regional areas
`;

// Step 1: Input validation and processing
const validateAndProcessInput = (message: string): { isValid: boolean; sanitizedMessage: string; error?: string } => {
  if (!message || message.trim().length === 0) {
    return { isValid: false, sanitizedMessage: '', error: 'Empty message' };
  }
  
  const sanitizedMessage = message.trim().slice(0, 2000); // Limit message length
  console.log('Step 1: Input processed and validated');
  return { isValid: true, sanitizedMessage };
};

// Step 2: Question analysis using OpenAI
const analyzeQuestion = async (message: string): Promise<{ context: string; topics: string[]; visaType?: string }> => {
  console.log('Step 2: Starting question analysis');
  
  const analysisPrompt = `Analyze this Australian immigration question and identify:
1. Main visa type or category being asked about
2. User's current situation or background
3. Key requirements they need to know
4. Specific information categories to search for
5. Immigration context and intent

Question: "${message}"

Respond in this format:
VISA_TYPE: [type if identifiable]
SITUATION: [user background]
REQUIREMENTS: [key needs]
TOPICS: [comma-separated relevant topics]
CONTEXT: [overall immigration context]`;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'You are an Australian immigration expert analyzing user questions to extract key information for knowledge retrieval.' },
          { role: 'user', content: analysisPrompt }
        ],
        temperature: 0.3,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      throw new Error(`Analysis API error: ${response.status}`);
    }

    const data = await response.json();
    const analysis = data.choices[0].message.content;
    
    console.log('Step 2: Question analysis completed');
    
    // Extract topics and context from analysis
    const topics = analysis.match(/TOPICS: (.+)/)?.[1]?.split(',').map((t: string) => t.trim()) || [];
    const context = analysis.match(/CONTEXT: (.+)/)?.[1] || analysis;
    const visaType = analysis.match(/VISA_TYPE: (.+)/)?.[1];
    
    return { context, topics, visaType };
  } catch (error) {
    console.error('Step 2 failed:', error);
    throw new Error('Question analysis failed');
  }
};

// Step 3: RAG knowledge retrieval
const retrieveRelevantKnowledge = (context: string, topics: string[]): string => {
  console.log('Step 3: Starting knowledge retrieval');
  
  const searchTerms = [...topics, ...context.toLowerCase().split(' ')].filter(term => term.length > 2);
  const knowledgeSections = immigrationKnowledge.split('\n\n');
  
  const relevantSections = knowledgeSections.filter(section => {
    const sectionLower = section.toLowerCase();
    return searchTerms.some(term => sectionLower.includes(term.toLowerCase()));
  });
  
  const retrievedKnowledge = relevantSections.slice(0, 5).join('\n\n'); // Limit to most relevant sections
  
  console.log('Step 3: Knowledge retrieval completed');
  return retrievedKnowledge || immigrationKnowledge.slice(0, 2000); // Fallback to general knowledge
};

// Step 4: Final response generation
const generateFinalResponse = async (originalQuestion: string, analysisContext: string, retrievedKnowledge: string, conversationHistory: any[]): Promise<string> => {
  console.log('Step 4: Starting final response generation');
  
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

Use the provided analysis and knowledge to give specific, personalized advice. Always:
1. Start with a direct answer to the user's question
2. Provide specific, actionable advice in simple language
3. Break information into digestible paragraphs
4. Mention current processing times and requirements when relevant
5. Suggest official resources and next steps
6. Include disclaimers about seeking professional advice when needed

IMPORTANT: Format this reminder naturally within your response, not as a separate disclaimer: Immigration laws can change and users should verify information with the Department of Home Affairs or consult a registered migration agent for complex cases.`;

  const finalPrompt = `Using this official Australian immigration information and analysis:

QUESTION ANALYSIS: ${analysisContext}

RELEVANT KNOWLEDGE: ${retrievedKnowledge}

ORIGINAL QUESTION: "${originalQuestion}"

Provide a personalized, conversational answer that directly addresses the user's question. Make the response practical and actionable while maintaining accuracy.`;

  try {
    const messages = [
      { role: 'system', content: systemPrompt },
      ...conversationHistory.slice(-6).map((msg: any) => ({
        role: msg.type === 'user' ? 'user' : 'assistant',
        content: msg.message
      })),
      { role: 'user', content: finalPrompt }
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
      throw new Error(`Final response API error: ${response.status}`);
    }

    const data = await response.json();
    let finalResponse = data.choices[0].message.content;

    // Enhanced text sanitization to remove ALL formatting
    finalResponse = finalResponse
      .replace(/\*\*(.*?)\*\*/g, '$1') // Bold
      .replace(/\*(.*?)\*/g, '$1') // Italic
      .replace(/__(.*?)__/g, '$1') // Underline
      .replace(/`(.*?)`/g, '$1') // Code backticks
      .replace(/#{1,6}\s/g, '') // Headers
      .replace(/^\s*[\*\-\+]\s/gm, '') // Bullet points
      .replace(/^\s*\d+\.\s/gm, '') // Numbered lists
      .replace(/<[^>]*>/g, '') // HTML tags
      .replace(/class="[^"]*"/g, '') // CSS classes
      .replace(/style="[^"]*"/g, '') // Inline styles
      .replace(/australia-blue/g, '')
      .replace(/font-semibold/g, '')
      .replace(/font-bold/g, '')
      .replace(/text-\w+-\d+/g, '')
      .replace(/bg-\w+-\d+/g, '')
      .replace(/"\s*([^"]+)\s*"/g, '$1')
      .replace(/\s+/g, ' ')
      .replace(/\n{3,}/g, '\n\n')
      .trim();

    console.log('Step 4: Final response generation completed');
    return finalResponse;
  } catch (error) {
    console.error('Step 4 failed:', error);
    throw new Error('Final response generation failed');
  }
};

// Enhanced fallback response for step failures
const getEnhancedFallbackResponse = (userMessage: string, language: string, error: any, failedStep: string) => {
  const isNetworkError = error.name === 'AbortError' || error.message.includes('fetch');
  const isServerError = error.message.includes('500') || error.message.includes('502') || error.message.includes('503');

  const fallbackResponses = {
    en: {
      step1: "I'm having trouble processing your question right now. Please try rephrasing your question or ask again in a moment.",
      step2: "I'm currently analyzing your question but experiencing some delays. While I work on this, you can visit homeaffairs.gov.au for immediate official information about Australian immigration.",
      step3: "I'm updating my knowledge base with the latest immigration policies. For immediate assistance with Australian immigration, please check the official Department of Home Affairs website at homeaffairs.gov.au.",
      step4: "I'm having trouble generating a complete response right now. For urgent immigration questions, please visit homeaffairs.gov.au or contact a registered migration agent. I should be back to full capacity shortly.",
      network: "I'm experiencing network connectivity issues. Please check your internet connection and try again. For immediate help, visit homeaffairs.gov.au for official Australian immigration information.",
      server: "My systems are currently being updated with the latest immigration policies. Please try again in a few minutes. In the meantime, visit homeaffairs.gov.au for official information."
    },
    hi: {
      step1: "मैं अभी आपके प्रश्न को समझने में कुछ कठिनाई का सामना कर रही हूँ। कृपया अपना प्रश्न दोबारा पूछें।",
      step2: "मैं आपके प्रश्न का विश्लेषण कर रही हूँ लेकिन कुछ देरी हो रही है। इस बीच homeaffairs.gov.au पर जाकर आधिकारिक जानकारी देख सकते हैं।",
      step3: "मैं अपने ज्ञान आधार को नवीनतम इमिग्रेशन नीतियों के साथ अपडेट कर रही हूँ। तुरंत सहायता के लिए homeaffairs.gov.au देखें।",
      step4: "मैं अभी पूरा उत्तर देने में कुछ कठिनाई का सामना कर रही हूँ। urgent प्रश्नों के लिए homeaffairs.gov.au देखें या registered migration agent से संपर्क करें।",
      network: "मैं नेटवर्क कनेक्टिविटी की समस्या का सामना कर रही हूँ। कृपया अपना इंटरनेट कनेक्शन जांचें और फिर से कोशिश करें।",
      server: "मेरे सिस्टम वर्तमान में नवीनतम इमिग्रेशन नीतियों के साथ अपडेट हो रहे हैं। कुछ मिनट बाद फिर से कोशिश करें।"
    }
  };

  const responses = fallbackResponses[language] || fallbackResponses.en;
  
  if (isNetworkError) {
    return responses.network;
  } else if (isServerError) {
    return responses.server;
  } else {
    return responses[failedStep] || responses.step4;
  }
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Starting Ritu AI workflow...');
    
    const { message, conversationHistory = [], language = 'en' } = await req.json();

    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    // Step 1: Input validation and processing
    const inputValidation = validateAndProcessInput(message);
    if (!inputValidation.isValid) {
      return new Response(JSON.stringify({ 
        response: getEnhancedFallbackResponse(message, language, inputValidation.error, 'step1'),
        success: false 
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    let finalResponse: string;

    try {
      // Step 2: Question analysis
      const analysis = await analyzeQuestion(inputValidation.sanitizedMessage);
      
      // Step 3: RAG knowledge retrieval
      const relevantKnowledge = retrieveRelevantKnowledge(analysis.context, analysis.topics);
      
      // Step 4: Final response generation
      finalResponse = await generateFinalResponse(
        inputValidation.sanitizedMessage, 
        analysis.context, 
        relevantKnowledge, 
        conversationHistory
      );
      
      console.log('Ritu AI workflow completed successfully');
      
    } catch (error) {
      console.error('Workflow step failed:', error);
      
      // Determine which step failed and provide appropriate fallback
      let failedStep = 'step4';
      if (error.message.includes('Question analysis failed')) {
        failedStep = 'step2';
      } else if (error.message.includes('Knowledge retrieval failed')) {
        failedStep = 'step3';
      }
      
      finalResponse = getEnhancedFallbackResponse(inputValidation.sanitizedMessage, language, error, failedStep);
    }

    return new Response(JSON.stringify({ 
      response: finalResponse,
      success: true 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Critical error in ritu-chat function:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      success: false,
      fallback: "I apologize, but I'm experiencing technical difficulties. Please try again in a moment, or visit homeaffairs.gov.au for official Australian immigration information."
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
