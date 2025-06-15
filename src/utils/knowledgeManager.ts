
import { supabase } from '@/integrations/supabase/client';

interface ImmigrationData {
  id: number;
  data_type: string;
  visa_subclass: string | null;
  data_content: any;
  last_updated: string;
  created_at: string;
}

interface ProcessingTimes {
  [key: string]: string;
}

interface VisaCosts {
  [key: string]: string;
}

class KnowledgeManager {
  private cache: Map<string, any> = new Map();
  private lastUpdate: Date | null = null;
  private updateInterval = 24 * 60 * 60 * 1000; // 24 hours

  async getProcessingTimes(): Promise<ProcessingTimes> {
    try {
      const { data, error } = await supabase
        .from('immigration_data')
        .select('*')
        .eq('data_type', 'processing_times')
        .order('last_updated', { ascending: false });

      if (!error && data && data.length > 0) {
        const processingTimes: ProcessingTimes = {};
        data.forEach((item: ImmigrationData) => {
          if (item.visa_subclass) {
            const content = item.data_content;
            processingTimes[item.visa_subclass] = `${content.processing_time_75} (75%), ${content.processing_time_90} (90%)`;
          }
        });
        return processingTimes;
      }
    } catch (error) {
      console.error('Error fetching processing times from immigration_data:', error);
    }

    return this.getFallbackProcessingTimes();
  }

  async getVisaCosts(): Promise<VisaCosts> {
    try {
      const { data, error } = await supabase
        .from('immigration_data')
        .select('*')
        .eq('data_type', 'visa_costs')
        .order('last_updated', { ascending: false });

      if (!error && data && data.length > 0) {
        const visaCosts: VisaCosts = {};
        data.forEach((item: ImmigrationData) => {
          if (item.visa_subclass) {
            visaCosts[item.visa_subclass] = item.data_content.cost || 'Contact for pricing';
          }
        });
        return visaCosts;
      }
    } catch (error) {
      console.error('Error fetching visa costs from immigration_data:', error);
    }

    return this.getFallbackVisaCosts();
  }

  async getAllKnowledge(): Promise<ImmigrationData[]> {
    try {
      const { data, error } = await supabase
        .from('immigration_data')
        .select('*')
        .order('last_updated', { ascending: false });

      if (!error && data) {
        // Update cache
        data.forEach((item: ImmigrationData) => {
          const cacheKey = `${item.data_type}_${item.visa_subclass || 'general'}`;
          this.cache.set(cacheKey, item);
        });
        this.lastUpdate = new Date();
        return data;
      }
    } catch (error) {
      console.error('Error fetching knowledge from immigration_data:', error);
    }
    
    return [];
  }

  async getKnowledgeSection(section: string): Promise<ImmigrationData | null> {
    try {
      const { data, error } = await supabase
        .from('immigration_data')
        .select('*')
        .eq('data_type', section)
        .order('last_updated', { ascending: false })
        .limit(1);

      if (!error && data && data.length > 0) {
        return data[0];
      }
    } catch (error) {
      console.error('Error fetching knowledge section:', error);
    }

    return null;
  }

  async updateKnowledge(): Promise<boolean> {
    // This method could trigger the knowledge-updater function
    try {
      const response = await fetch('/functions/v1/knowledge-updater', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action: 'update_knowledge' }),
      });

      const data = await response.json();
      if (data.success) {
        // Clear cache to force refresh
        this.cache.clear();
        await this.getAllKnowledge();
        return true;
      }
    } catch (error) {
      console.error('Error updating knowledge:', error);
    }
    
    return false;
  }

  private isCacheValid(): boolean {
    if (!this.lastUpdate) return false;
    return (Date.now() - this.lastUpdate.getTime()) < this.updateInterval;
  }

  private getFallbackProcessingTimes(): ProcessingTimes {
    return {
      '189': '8-12 months',
      '190': '8-15 months',
      '491': '8-11 months',
      '482': '3-5 months',
      '485': '4-6 months',
      '500': '1-4 months',
      'partner': '12-29 months'
    };
  }

  private getFallbackVisaCosts(): VisaCosts {
    return {
      '189': '$4,640',
      '190': '$4,640',
      '491': '$4,640',
      '482': '$1,455',
      '485': '$710',
      '500': '$710',
      'partner': '$8,850'
    };
  }

  getKnowledgeAge(section: string): string {
    const cached = this.cache.get(section);
    if (!cached) return 'Unknown';
    
    const lastUpdated = new Date(cached.last_updated);
    const now = new Date();
    const diffHours = Math.floor((now.getTime() - lastUpdated.getTime()) / (1000 * 60 * 60));
    
    if (diffHours < 1) return 'Just updated';
    if (diffHours < 24) return `${diffHours} hours ago`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays} days ago`;
  }
}

export const knowledgeManager = new KnowledgeManager();
