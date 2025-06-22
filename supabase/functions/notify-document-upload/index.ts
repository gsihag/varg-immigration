
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
    
    // Get client information
    const { data: client } = await supabaseClient
      .from('clients')
      .select('full_name, email')
      .eq('id', record.client_id)
      .single()
    
    // Send notification to n8n webhook
    const n8nWebhookUrl = Deno.env.get('N8N_DOCUMENT_UPLOAD_WEBHOOK_URL')
    
    if (n8nWebhookUrl) {
      const webhookPayload = {
        event_type: 'document_uploaded',
        client_id: record.client_id,
        client_name: client?.full_name,
        client_email: client?.email,
        document_type: record.document_type,
        file_name: record.file_name,
        upload_date: record.upload_date,
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
    console.error('Error in notify-document-upload function:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      },
    )
  }
})
