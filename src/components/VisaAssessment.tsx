
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';
import ChatPopup from '@/components/ChatPopup';

const VisaAssessment: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleChatWithRitu = () => {
    setIsChatOpen(true);
  };

  return (
    <>
      <div className="max-w-md mx-auto p-8 bg-white rounded-lg shadow-md text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Visa Assessment</h2>
        
        <Button 
          onClick={handleChatWithRitu}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg flex items-center gap-2 mx-auto"
        >
          <MessageCircle className="w-5 h-5" />
          Chat with Ritu - FREE
        </Button>
      </div>

      <ChatPopup 
        isOpen={isChatOpen} 
        onClose={() => setIsChatOpen(false)} 
      />
    </>
  );
};

export default VisaAssessment;
