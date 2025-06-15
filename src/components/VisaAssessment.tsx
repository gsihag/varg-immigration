
import React from 'react';
import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';

const VisaAssessment: React.FC = () => {
  const handleChatWithRitu = () => {
    // Switch to chat tab - this will be handled by the parent component
    const chatTab = document.querySelector('[value="chat"]') as HTMLElement;
    if (chatTab) {
      chatTab.click();
    }
  };

  return (
    <div className="max-w-md mx-auto p-8 bg-white rounded-lg shadow-md text-center">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Visa Assessment</h2>
      <div className="mb-6">
        <p className="text-gray-600 mb-4">
          Get personalized visa guidance and assessment through our AI assistant Ritu.
        </p>
      </div>
      
      <Button 
        onClick={handleChatWithRitu}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg flex items-center gap-2 mx-auto"
      >
        <MessageCircle className="w-5 h-5" />
        Chat with Ritu
      </Button>
    </div>
  );
};

export default VisaAssessment;
