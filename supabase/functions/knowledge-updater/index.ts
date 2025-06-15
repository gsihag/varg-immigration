
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface KnowledgeUpdate {
  section: string;
  content: any;
  source_url: string;
  last_updated: string;
  version: string;
}

// Target sources for scraping
const SOURCES = {
  processing_times: 'https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-processing-times',
  visa_costs: 'https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-pricing',
  policy_updates: 'https://immi.homeaffairs.gov.au/news-media/archive',
  skilled_occupations: 'https://immi.homeaffairs.gov.au/visas/working-in-australia/skill-occupation-list'
};

async function scrapeProcessingTimes() {
  try {
    const response = await fetch(SOURCES.processing_times);
    const html = await response.text();
    
    // Extract processing time information
    const processingTimes = {
      '189': extractProcessingTime(html, 'Skilled Independent'),
      '190': extractProcessingTime(html, 'Skilled Nominated'),
      '491': extractProcessingTime(html, 'Skilled Work Regional'),
      '482': extractProcessingTime(html, 'Temporary Skill Shortage'),
      '500': extractProcessingTime(html, 'Student'),
      'partner': extractProcessingTime(html, 'Partner')
    };

    return {
      section: 'processing_times',
      content: processingTimes,
      source_url: SOURCES.processing_times,
      last_updated: new Date().toISOString(),
      version: generateVersion()
    };
  } catch (error) {
    console.error('Error scraping processing times:', error);
    return null;
  }
}

async function scrapeVisaCosts() {
  try {
    const response = await fetch(SOURCES.visa_costs);
    const html = await response.text();
    
    const visaCosts = {
      '189': extractVisaCost(html, '189'),
      '190': extractVisaCost(html, '190'),
      '491': extractVisaCost(html, '491'),
      '482': extractVisaCost(html, '482'),
      '500': extractVisaCost(html, '500'),
      'partner': extractVisaCost(html, 'Partner')
    };

    return {
      section: 'visa_costs',
      content: visaCosts,
      source_url: SOURCES.visa_costs,
      last_updated: new Date().toISOString(),
      version: generateVersion()
    };
  } catch (error) {
    console.error('Error scraping visa costs:', error);
    return null;
  }
}

function extractProcessingTime(html: string, visaType: string): string {
  // Simple extraction logic - in production, this would be more sophisticated
  const patterns = {
    'Skilled Independent': /skilled.{0,50}independent.{0,100}(\d+).{0,20}month/i,
    'Skilled Nominated': /skilled.{0,50}nominated.{0,100}(\d+).{0,20}month/i,
    'Skilled Work Regional': /skilled.{0,50}regional.{0,100}(\d+).{0,20}month/i,
    'Temporary Skill Shortage': /temporary.{0,50}skill.{0,100}(\d+).{0,20}month/i,
    'Student': /student.{0,100}(\d+).{0,20}month/i,
    'Partner': /partner.{0,100}(\d+).{0,20}month/i
  };

  const pattern = patterns[visaType];
  if (pattern) {
    const match = html.match(pattern);
    return match ? `${match[1]} months` : 'Not available';
  }
  return 'Not available';
}

function extractVisaCost(html: string, visaSubclass: string): string {
  // Extract visa costs using pattern matching
  const pattern = new RegExp(`${visaSubclass}.{0,200}\\$([\\d,]+)`, 'i');
  const match = html.match(pattern);
  return match ? `$${match[1]}` : 'Contact for pricing';
}

function generateVersion(): string {
  const date = new Date();
  return `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`;
}

async function updateKnowledgeBase() {
  const updates: KnowledgeUpdate[] = [];
  
  // Scrape all sources
  const processingTimes = await scrapeProcessingTimes();
  const visaCosts = await scrapeVisaCosts();
  
  if (processingTimes) updates.push(processingTimes);
  if (visaCosts) updates.push(visaCosts);
  
  // Store updates in database
  for (const update of updates) {
    const { error } = await supabase
      .from('knowledge_base')
      .upsert({
        section: update.section,
        content: update.content,
        source_url: update.source_url,
        last_updated: update.last_updated,
        version: update.version,
        is_active: true
      });
      
    if (error) {
      console.error(`Error updating ${update.section}:`, error);
    } else {
      console.log(`Successfully updated ${update.section}`);
    }
  }
  
  return updates;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { action } = await req.json();
    
    if (action === 'update_knowledge') {
      const updates = await updateKnowledgeBase();
      
      return new Response(JSON.stringify({
        success: true,
        updates: updates.length,
        timestamp: new Date().toISOString(),
        data: updates
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    
    if (action === 'get_knowledge') {
      const { data, error } = await supabase
        .from('knowledge_base')
        .select('*')
        .eq('is_active', true)
        .order('last_updated', { ascending: false });
        
      if (error) throw error;
      
      return new Response(JSON.stringify({
        success: true,
        knowledge: data
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    throw new Error('Invalid action');

  } catch (error) {
    console.error('Knowledge updater error:', error);
    return new Response(JSON.stringify({
      success: false,
      error: error.message
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
