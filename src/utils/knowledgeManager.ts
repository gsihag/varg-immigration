
interface KnowledgeSection {
  section: string;
  content: any;
  source_url: string;
  last_updated: string;
  version: string;
  is_active: boolean;
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
    const knowledge = await this.getKnowledgeSection('processing_times');
    return knowledge?.content || this.getFallbackProcessingTimes();
  }

  async getVisaCosts(): Promise<VisaCosts> {
    const knowledge = await this.getKnowledgeSection('visa_costs');
    return knowledge?.content || this.getFallbackVisaCosts();
  }

  async getAllKnowledge(): Promise<KnowledgeSection[]> {
    try {
      const response = await fetch('/functions/v1/knowledge-updater', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action: 'get_knowledge' }),
      });

      const data = await response.json();
      if (data.success) {
        // Update cache
        data.knowledge.forEach((item: KnowledgeSection) => {
          this.cache.set(item.section, item);
        });
        this.lastUpdate = new Date();
        return data.knowledge;
      }
    } catch (error) {
      console.error('Error fetching knowledge:', error);
    }
    
    return [];
  }

  async getKnowledgeSection(section: string): Promise<KnowledgeSection | null> {
    // Check cache first
    if (this.cache.has(section) && this.isCacheValid()) {
      return this.cache.get(section);
    }

    // Fetch fresh data
    await this.getAllKnowledge();
    return this.cache.get(section) || null;
  }

  async updateKnowledge(): Promise<boolean> {
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
      '500': '$710',
      'partner': '$8,850'
    };
  }

  getKnowledgeAge(section: string): string {
    const knowledge = this.cache.get(section);
    if (!knowledge) return 'Unknown';
    
    const lastUpdated = new Date(knowledge.last_updated);
    const now = new Date();
    const diffHours = Math.floor((now.getTime() - lastUpdated.getTime()) / (1000 * 60 * 60));
    
    if (diffHours < 1) return 'Just updated';
    if (diffHours < 24) return `${diffHours} hours ago`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays} days ago`;
  }
}

export const knowledgeManager = new KnowledgeManager();
