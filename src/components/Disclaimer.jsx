
import React from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const Disclaimer = ({ className }) => {
  return (
    <Alert className={`bg-amber-50 border-amber-200 ${className}`}>
      <AlertDescription className="text-amber-800 text-sm">
        <strong>Important:</strong> The information provided by Ritu AI is based on publicly available resources and should not be considered as legal advice. For personalized guidance and official application support, please consult with our registered migration agents at VARG Immigration or visit the official Department of Home Affairs website.
      </AlertDescription>
    </Alert>
  );
};

export default Disclaimer;
