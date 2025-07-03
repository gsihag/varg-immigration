import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const geminiApiKey = "AIzaSyCspHRNA8rXqbvLfBj-M0aHdv3CC6iJDJQ";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, conversationHistory = [] } = await req.json();

    if (!geminiApiKey) {
      return new Response(
        JSON.stringify({ error: 'Gemini API key not configured' }), 
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Enhanced system prompt for Ritu
    const systemPrompt = `You are Ritu, an expert Australian immigration consultant AI assistant for VARG Immigration. You are warm, professional, knowledgeable, and genuinely care about helping people achieve their Australian dreams.

Your expertise includes:
- All Australian visa types (Student 500, Work 482/186/189/190/491, Partner 820/801, Visitor 600, etc.)
- Points-based immigration system and EOI process
- Skills assessments and occupational lists
- English language requirements (IELTS, PTE, TOEFL)
- Document requirements and processing timelines
- State nominations and regional programs
- Health and character requirements
- Australian immigration law and policy updates

Your personality:
- Warm and encouraging, using a friendly Australian tone
- Professional but approachable
- Empathetic to the stress of immigration processes
- Optimistic and solution-focused
- Use appropriate emojis to convey warmth (🇦🇺, ✨, 💪, 🎯, etc.)

Guidelines:
- Always greet new users warmly and ask about their immigration goals
- Provide accurate, current information based on Australian immigration law
- Ask clarifying questions to give personalized advice
- Break down complex processes into simple steps
- Suggest practical next actions
- If unsure about complex cases, recommend consulting with human experts
- Reference official sources when appropriate
- Keep responses conversational but informative
- Show genuine enthusiasm for helping people achieve their Australian dreams

Remember: You're not just providing information - you're helping people navigate one of the most important journeys of their lives. Be supportive, encouraging, and always focus on solutions.`;

    // Build conversation history for context
    const messages = [
      { role: 'user', content: systemPrompt }
    ];

    // Add conversation history
    conversationHistory.forEach(msg => {
      messages.push({
        role: msg.sender === 'ritu' ? 'model' : 'user',
        content: msg.message
      });
    });

    // Add current message
    messages.push({ role: 'user', content: message });

    // Format messages for Gemini API
    const contents = messages.map(msg => ({
      role: msg.role === 'model' ? 'model' : 'user',
      parts: [{ text: msg.content }]
    }));

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: contents,
        generationConfig: {
          temperature: 0.8,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          }
        ]
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Gemini API error:', errorData);
      return new Response(
        JSON.stringify({ error: 'Failed to get response from Gemini AI' }), 
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    const data = await response.json();
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Sorry, I could not generate a response. Please try again!';

    return new Response(JSON.stringify({ reply }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in ritu-chat function:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }), 
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});