
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RefreshCw, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface ImmigrationData {
  id: number;
  data_type: string;
  visa_subclass: string | null;
  data_content: any;
  last_updated: string;
  created_at: string;
}

const KnowledgeStatus: React.FC = () => {
  const [knowledge, setKnowledge] = useState<ImmigrationData[]>([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<string>('');

  useEffect(() => {
    loadKnowledge();
  }, []);

  const loadKnowledge = async () => {
    try {
      const { data, error } = await supabase
        .from('immigration_data')
        .select('*')
        .order('last_updated', { ascending: false });

      if (!error && data) {
        setKnowledge(data);
        if (data.length > 0) {
          const latest = data.reduce((latest, current) => 
            new Date(current.last_updated) > new Date(latest.last_updated) ? current : latest
          );
          setLastUpdate(latest.last_updated);
        }
      }
    } catch (error) {
      console.error('Error loading knowledge:', error);
    }
  };

  const handleUpdate = async () => {
    setIsUpdating(true);
    try {
      const response = await fetch('/functions/v1/knowledge-updater', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action: 'update_knowledge' }),
      });

      const result = await response.json();
      if (result.success) {
        await loadKnowledge();
      }
    } catch (error) {
      console.error('Error updating knowledge:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const getKnowledgeAge = (lastUpdated: string): string => {
    const lastUpdatedDate = new Date(lastUpdated);
    const now = new Date();
    const diffHours = Math.floor((now.getTime() - lastUpdatedDate.getTime()) / (1000 * 60 * 60));
    
    if (diffHours < 1) return 'Just updated';
    if (diffHours < 24) return `${diffHours} hours ago`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays} days ago`;
  };

  const getStatusIcon = (item: ImmigrationData) => {
    const age = getKnowledgeAge(item.last_updated);
    if (age.includes('hour') || age === 'Just updated') {
      return <CheckCircle className="w-4 h-4 text-green-500" />;
    }
    if (age.includes('1 days') || age.includes('2 days')) {
      return <Clock className="w-4 h-4 text-yellow-500" />;
    }
    return <AlertCircle className="w-4 h-4 text-red-500" />;
  };

  const getStatusColor = (item: ImmigrationData) => {
    const age = getKnowledgeAge(item.last_updated);
    if (age.includes('hour') || age === 'Just updated') return 'bg-green-100 text-green-800';
    if (age.includes('1 days') || age.includes('2 days')) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  // Group data by type for better display
  const groupedKnowledge = knowledge.reduce((acc, item) => {
    const key = item.data_type;
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {} as Record<string, ImmigrationData[]>);

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-lg font-semibold">Immigration Data Status</CardTitle>
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
        
        <div className="space-y-4">
          {Object.entries(groupedKnowledge).map(([dataType, items]) => (
            <div key={dataType} className="border rounded-lg p-4">
              <h4 className="font-medium capitalize mb-3">
                {dataType.replace('_', ' ')} ({items.length} records)
              </h4>
              
              <div className="space-y-2">
                {items.slice(0, 5).map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(item)}
                      <div>
                        <span className="text-sm font-medium">
                          {item.visa_subclass ? `Subclass ${item.visa_subclass}` : 'General Info'}
                        </span>
                        {item.data_content.visa_name && (
                          <p className="text-xs text-gray-500">{item.data_content.visa_name}</p>
                        )}
                      </div>
                    </div>
                    
                    <Badge className={getStatusColor(item)}>
                      {getKnowledgeAge(item.last_updated)}
                    </Badge>
                  </div>
                ))}
                
                {items.length > 5 && (
                  <p className="text-xs text-gray-500 mt-2">
                    ...and {items.length - 5} more records
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
        
        {knowledge.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <AlertCircle className="w-8 h-8 mx-auto mb-2" />
            <p>No immigration data available</p>
            <Button onClick={handleUpdate} className="mt-2" disabled={isUpdating}>
              Initialize Data
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default KnowledgeStatus;
