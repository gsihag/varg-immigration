
import React from 'react';
import { Button } from '@/components/ui/button';
import { FileText } from 'lucide-react';

const VisaAssessment: React.FC = () => {
  const handleStartAssessment = () => {
    // This will be connected to the main assessment flow
    console.log('Starting visa assessment...');
  };

  return (
    <div className="max-w-md mx-auto p-8 bg-white rounded-lg shadow-md text-center">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Visa Assessment</h2>
      
      <Button 
        onClick={handleStartAssessment}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg flex items-center gap-2 mx-auto"
      >
        <FileText className="w-5 h-5" />
        Start Assessment
      </Button>
    </div>
  );
};

export default VisaAssessment;
