
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const { record } = await req.json()
    
    // Send notification to n8n webhook
    const n8nWebhookUrl = Deno.env.get('N8N_NEW_CLIENT_WEBHOOK_URL')
    
    if (n8nWebhookUrl) {
      const webhookPayload = {
        event_type: 'new_client_registration',
        client_id: record.id,
        email: record.email,
        full_name: record.full_name,
        phone: record.phone,
        country_of_origin: record.country_of_origin,
        visa_type_interested: record.visa_type_interested,
        registration_date: record.registration_date,
        timestamp: new Date().toISOString()
      }

      const response = await fetch(n8nWebhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(webhookPayload),
      })

      console.log('n8n webhook response:', await response.text())
    }

    return new Response(
      JSON.stringify({ success: true }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error) {
    console.error('Error in notify-new-client function:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      },
    )
  }
})
