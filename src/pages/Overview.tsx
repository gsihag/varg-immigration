
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useCRM } from '@/hooks/useCRM';
import DashboardLayout from '@/components/DashboardLayout';

// Import new overview components
import { WelcomeHero } from '@/components/overview/WelcomeHero';
import { StatusCards } from '@/components/overview/StatusCards';
import { QuickActionCenter } from '@/components/overview/QuickActionCenter';
import { ActivityFeed } from '@/components/overview/ActivityFeed';
import { ProgressTimeline } from '@/components/overview/ProgressTimeline';

const Overview = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
      }
    };
    getUser();
  }, []);

  const { useClient, useClientDocuments, useClientCases } = useCRM();
  
  // Only fetch data if user exists - this prevents unnecessary API calls
  const { data: client, isLoading: clientLoading } = useClient(user?.id || '');
  const { data: documents, isLoading: documentsLoading } = useClientDocuments(user?.id || '');  
  const { data: cases, isLoading: casesLoading } = useClientCases(user?.id || '');

  // Show loading state while any critical data is loading
  const isLoading = clientLoading || documentsLoading || casesLoading;

  const recentDocuments = documents?.slice(0, 3) || [];
  const activeCase = cases?.[0];

  // Calculate journey progress
  const getJourneyProgress = () => {
    if (!activeCase) return { progress: 0, stage: 'Getting Started' };
    
    const statusProgress = {
      'initiated': { progress: 15, stage: 'Initial Assessment' },
      'documents_collection': { progress: 35, stage: 'Document Collection' },
      'application_preparation': { progress: 65, stage: 'Application Preparation' },
      'submitted': { progress: 80, stage: 'Application Submitted' },
      'awaiting_response': { progress: 90, stage: 'Awaiting Decision' },
      'approved': { progress: 100, stage: 'Approved! 🎉' },
      'rejected': { progress: 100, stage: 'Under Review' },
      'closed': { progress: 100, stage: 'Case Closed' }
    };
    
    return statusProgress[activeCase.status as keyof typeof statusProgress] || { progress: 0, stage: 'Unknown' };
  };

  const journeyProgress = getJourneyProgress();

  // Profile completion score
  const getProfileCompletion = () => {
    if (!client) return 0;
    const fields = ['full_name', 'email', 'phone', 'country_of_origin'];
    const completed = fields.filter(field => client[field]).length;
    return Math.round((completed / fields.length) * 100);
  };

  const profileCompletion = getProfileCompletion();

  // Show loading state while user authentication or critical data is loading
  if (!user || isLoading) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center h-64 space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="text-gray-600">Loading your overview...</p>
        </div>
      </DashboardLayout>
    );
  }

  const userName = client?.full_name?.split(' ')[0] || user?.user_metadata?.full_name?.split(' ')[0] || 'Mate';

  return (
    <DashboardLayout>
      <div className="space-y-8 max-w-7xl mx-auto">
        {/* Welcome Hero Section */}
        <WelcomeHero 
          client={client}
          user={user}
          journeyProgress={journeyProgress}
          userName={userName}
        />

        {/* At-a-Glance Status Cards */}
        <StatusCards 
          activeCase={activeCase}
          documents={documents}
          journeyProgress={journeyProgress}
        />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          
          {/* Left Column - Progress Timeline (2 columns) */}
          <div className="xl:col-span-2">
            <ProgressTimeline 
              activeCase={activeCase}
              journeyProgress={journeyProgress}
            />
          </div>

          {/* Middle Column - Quick Actions (1 column) */}
          <div className="xl:col-span-1">
            <QuickActionCenter />
          </div>

          {/* Right Column - Activity Feed (1 column) */}
          <div className="xl:col-span-1">
            <ActivityFeed recentDocuments={recentDocuments} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Overview;
