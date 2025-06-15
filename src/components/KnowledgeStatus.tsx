
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RefreshCw, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { knowledgeManager } from '@/utils/knowledgeManager';

const KnowledgeStatus: React.FC = () => {
  const [knowledge, setKnowledge] = useState<any[]>([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<string>('');

  useEffect(() => {
    loadKnowledge();
  }, []);

  const loadKnowledge = async () => {
    try {
      const data = await knowledgeManager.getAllKnowledge();
      setKnowledge(data);
      if (data.length > 0) {
        const latest = data.reduce((latest, current) => 
          new Date(current.last_updated) > new Date(latest.last_updated) ? current : latest
        );
        setLastUpdate(latest.last_updated);
      }
    } catch (error) {
      console.error('Error loading knowledge:', error);
    }
  };

  const handleUpdate = async () => {
    setIsUpdating(true);
    try {
      const success = await knowledgeManager.updateKnowledge();
      if (success) {
        await loadKnowledge();
      }
    } catch (error) {
      console.error('Error updating knowledge:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const getStatusIcon = (section: any) => {
    const age = knowledgeManager.getKnowledgeAge(section.section);
    if (age.includes('hour') || age === 'Just updated') {
      return <CheckCircle className="w-4 h-4 text-green-500" />;
    }
    if (age.includes('1 days') || age.includes('2 days')) {
      return <Clock className="w-4 h-4 text-yellow-500" />;
    }
    return <AlertCircle className="w-4 h-4 text-red-500" />;
  };

  const getStatusColor = (section: any) => {
    const age = knowledgeManager.getKnowledgeAge(section.section);
    if (age.includes('hour') || age === 'Just updated') return 'bg-green-100 text-green-800';
    if (age.includes('1 days') || age.includes('2 days')) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-lg font-semibold">Knowledge Base Status</CardTitle>
        <Button 
          onClick={handleUpdate} 
          disabled={isUpdating}
          size="sm"
          variant="outline"
        >
          <RefreshCw className={`w-4 h-4 mr-2 ${isUpdating ? 'animate-spin' : ''}`} />
          Update
        </Button>
      </CardHeader>
      
      <CardContent>
        {lastUpdate && (
          <div className="mb-4 p-3 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">
              Last updated: {new Date(lastUpdate).toLocaleString()}
            </p>
          </div>
        )}
        
        <div className="space-y-3">
          {knowledge.map((section) => (
            <div key={section.section} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                {getStatusIcon(section)}
                <div>
                  <h4 className="font-medium capitalize">
                    {section.section.replace('_', ' ')}
                  </h4>
                  <p className="text-sm text-gray-500">
                    Version {section.version}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Badge className={getStatusColor(section)}>
                  {knowledgeManager.getKnowledgeAge(section.section)}
                </Badge>
                <a 
                  href={section.source_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-xs text-blue-600 hover:underline"
                >
                  Source
                </a>
              </div>
            </div>
          ))}
        </div>
        
        {knowledge.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <AlertCircle className="w-8 h-8 mx-auto mb-2" />
            <p>No knowledge base data available</p>
            <Button onClick={handleUpdate} className="mt-2" disabled={isUpdating}>
              Initialize Knowledge Base
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default KnowledgeStatus;
