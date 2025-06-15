
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, conversationHistory = [], language = 'en' } = await req.json();

    // Detailed debugging for API key
    console.log('=== RITU CHAT FUNCTION DEBUG ===');
    console.log('Function called at:', new Date().toISOString());
    console.log('User message:', message);
    console.log('Language:', language);
    console.log('Environment variables available:', Object.keys(Deno.env.toObject()));
    console.log('OpenAI API Key exists:', !!openAIApiKey);
    console.log('OpenAI API Key type:', typeof openAIApiKey);
    
    if (openAIApiKey) {
      console.log('API Key length:', openAIApiKey.length);
      console.log('API Key starts with:', openAIApiKey.substring(0, 7));
      console.log('API Key ends with:', openAIApiKey.substring(openAIApiKey.length - 4));
    } else {
      console.error('❌ CRITICAL: OpenAI API Key is null/undefined');
      console.log('Available environment variables:', Object.keys(Deno.env.toObject()));
      throw new Error('OpenAI API key not found in environment variables. Please check Supabase Edge Function secrets.');
    }

    // Test API key validity
    console.log('🔍 Testing OpenAI API connection...');
    const testResponse = await fetch('https://api.openai.com/v1/models', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
    });

    console.log('OpenAI Models API Status:', testResponse.status);
    console.log('OpenAI Models API Headers:', Object.fromEntries(testResponse.headers.entries()));
    
    if (!testResponse.ok) {
      const errorText = await testResponse.text();
      console.error('❌ OpenAI API Key Test Failed');
      console.error('Status:', testResponse.status);
      console.error('Error:', errorText);
      throw new Error(`OpenAI API key validation failed: ${testResponse.status} - ${errorText}`);
    }

    console.log('✅ OpenAI API key is valid!');

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

Key immigration knowledge to reference:
- Visa types: 189 (Skilled Independent), 190 (State Nominated), 491 (Regional), 482 (TSS), 500 (Student), Partner visas
- Points test: Age (25-32 = 30 points), English (Proficient = 10, Superior = 20), Experience, Education
- Processing times: 189/190 (8-12 months), 491 (8-11 months), 482 (3-5 months), Student (1-4 months)
- English tests: IELTS, PTE, TOEFL requirements for different visa types
- Skills assessments: Different authorities for different occupations

Always provide specific, actionable advice and suggest checking homeaffairs.gov.au for the latest information.

IMPORTANT: Format this reminder naturally within your response: Immigration laws can change and users should verify information with the Department of Home Affairs or consult a registered migration agent for complex cases.`;

    const userPrompt = `${message}

Please provide a helpful, accurate response about Australian immigration based on current policies and requirements. Make the response conversational and actionable.`;

    const messages = [
      { role: 'system', content: systemPrompt },
      ...conversationHistory.slice(-6).map((msg: any) => ({
        role: msg.type === 'user' ? 'user' : 'assistant',
        content: msg.message
      })),
      { role: 'user', content: userPrompt }
    ];

    console.log('🤖 Sending request to OpenAI chat completions...');
    console.log('Message count:', messages.length);
    
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

    console.log('OpenAI Chat Response Status:', response.status);
    console.log('OpenAI Chat Response Headers:', Object.fromEntries(response.headers.entries()));

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ OpenAI Chat Completion Error');
      console.error('Status:', response.status);
      console.error('Error:', errorText);
      throw new Error(`OpenAI API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log('✅ OpenAI response received successfully');
    console.log('Response data structure:', Object.keys(data));
    
    let aiResponse = data.choices[0].message.content;
    console.log('Raw AI response length:', aiResponse.length);

    // Enhanced text sanitization to remove ALL formatting
    aiResponse = aiResponse
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

    console.log('✅ Response processed and cleaned successfully');
    console.log('Final response length:', aiResponse.length);

    return new Response(JSON.stringify({ 
      response: aiResponse,
      success: true 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('❌ ERROR in ritu-chat function:', error);
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    
    const fallbackResponse = language === 'hi' 
      ? "मैं अभी कुछ तकनीकी कठिनाइयों का सामना कर रही हूँ। कृपया कुछ देर बाद फिर से कोशिश करें या homeaffairs.gov.au पर आधिकारिक जानकारी के लिए जाएं।"
      : "I'm experiencing some technical difficulties right now. Please try again in a moment, or visit homeaffairs.gov.au for official Australian immigration information.";

    return new Response(JSON.stringify({ 
      response: fallbackResponse,
      success: false,
      error: error.message,
      debug: {
        hasApiKey: !!openAIApiKey,
        apiKeyLength: openAIApiKey ? openAIApiKey.length : 0,
        errorType: error.name
      }
    }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
