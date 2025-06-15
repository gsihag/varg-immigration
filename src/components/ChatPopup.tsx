
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X, Globe } from 'lucide-react';
import { useLanguage } from '@/components/LanguageSelector';
import RituChat from '@/components/RituChat';

interface ChatPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChatPopup: React.FC<ChatPopupProps> = ({ isOpen, onClose }) => {
  const { currentLanguage, setCurrentLanguage, languages } = useLanguage();
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[95vw] h-[90vh] sm:w-[90vw] sm:h-[90vh] lg:w-[85vw] lg:h-[85vh] max-w-[1200px] max-h-[800px] min-w-[320px] min-h-[400px] p-0 overflow-hidden flex flex-col">
        <DialogHeader className="flex-shrink-0 p-4 pb-0 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-bold text-gray-900">
              Ritu - Your Personal AI Immigration Assistant
            </DialogTitle>
            <div className="flex items-center gap-2">
              {/* Language Selector */}
              <div className="relative">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
                  className="flex items-center gap-2 h-8 px-2"
                >
                  <Globe className="w-4 h-4" />
                  <span className="text-sm">{languages[currentLanguage].flag}</span>
                  <span className="hidden sm:inline text-xs">{languages[currentLanguage].name}</span>
                </Button>

                {showLanguageDropdown && (
                  <div className="absolute top-full mt-1 right-0 bg-white border rounded-lg shadow-lg z-50 min-w-[180px]">
                    {Object.entries(languages).map(([code, lang]) => (
                      <button
                        key={code}
                        onClick={() => {
                          setCurrentLanguage(code);
                          setShowLanguageDropdown(false);
                        }}
                        className={`w-full px-3 py-2 text-left hover:bg-gray-50 flex items-center gap-2 text-sm ${
                          currentLanguage === code ? 'bg-blue-50 text-blue-600' : ''
                        }`}
                      >
                        <span className="text-base">{lang.flag}</span>
                        <span>{lang.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Single Close Button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="h-8 w-8"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </DialogHeader>
        
        <div className="flex-1 overflow-hidden">
          <RituChat isInPopup={true} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ChatPopup;
