
import { supabase } from '@/integrations/supabase/client';

export interface ImmigrationData {
  id: number;
  data_type: string;
  visa_subclass: string | null;
  data_content: any;
  last_updated: string;
  created_at: string;
}

export async function fetchImmigrationData(dataType: string, visaSubclass?: string): Promise<ImmigrationData[]> {
  try {
    let query = supabase
      .from('immigration_data')
      .select('*')
      .eq('data_type', dataType)
      .order('last_updated', { ascending: false });

    if (visaSubclass) {
      query = query.eq('visa_subclass', visaSubclass);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching immigration data:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error in fetchImmigrationData:', error);
    return [];
  }
}

export async function getProcessingTimes(visaSubclass?: string): Promise<ImmigrationData[]> {
  return fetchImmigrationData('processing_times', visaSubclass);
}

export async function getAllProcessingTimes(): Promise<ImmigrationData[]> {
  return fetchImmigrationData('processing_times');
}

export function formatProcessingTimeResponse(data: ImmigrationData[]): string {
  if (data.length === 0) {
    return "I don't have current processing time data available for that visa subclass.";
  }

  let response = "";
  
  data.forEach((item) => {
    const content = item.data_content;
    response += `\n${content.visa_name}:\n`;
    if (content.processing_time_75) {
      response += `• 75% of applications: ${content.processing_time_75}\n`;
    }
    if (content.processing_time_90) {
      response += `• 90% of applications: ${content.processing_time_90}\n`;
    }
    response += `Last updated: ${new Date(item.last_updated).toLocaleDateString()}\n`;
  });

  return response;
}

export function buildEnhancedKnowledgeBase(immigrationData: ImmigrationData[]): string {
  let knowledgeBase = `CURRENT AUSTRALIAN IMMIGRATION DATA (Updated ${new Date().toISOString().split('T')[0]}):\n\n`;
  
  // Group data by type
  const processingTimes = immigrationData.filter(item => item.data_type === 'processing_times');
  
  if (processingTimes.length > 0) {
    knowledgeBase += "CURRENT PROCESSING TIMES:\n";
    processingTimes.forEach(item => {
      const content = item.data_content;
      knowledgeBase += `- ${content.visa_name}: 75% processed in ${content.processing_time_75}, 90% in ${content.processing_time_90}\n`;
    });
    knowledgeBase += `\nLast updated: ${new Date(processingTimes[0].last_updated).toLocaleDateString()}\n\n`;
  }

  // Add static knowledge for comprehensive coverage
  knowledgeBase += `
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

  return knowledgeBase;
}
