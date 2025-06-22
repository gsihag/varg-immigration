
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import RituChat from '@/components/RituChat';
import DashboardLayout from '@/components/DashboardLayout';

const ChatPage = () => {
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

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Chat with Ritu</h1>
          <p className="text-gray-600">Get instant answers to your immigration questions</p>
        </div>

        <div className="h-[600px]">
          <RituChat />
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <div className="bg-blue-100 rounded-full p-2">
              <svg className="h-5 w-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-medium text-blue-900">Need Human Support?</h3>
              <p className="text-sm text-blue-700 mt-1">
                If Ritu can't answer your question, you can request to speak with one of our immigration experts. 
                Use the escalation button in the chat or book a consultation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ChatPage;
