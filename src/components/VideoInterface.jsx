
import React, { useState, useEffect } from 'react';
import { Video } from 'lucide-react';
import { Button } from '@/components/ui/button';

const VideoInterface = ({ onMessageReceived }) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  
  // Simulate connecting to video call
  const handleConnect = () => {
    setIsConnecting(true);
    
    // Simulate connection delay
    setTimeout(() => {
      setIsConnecting(false);
      setIsConnected(true);
      
      // Simulate receiving a welcome message after connection
      if (onMessageReceived) {
        setTimeout(() => {
          onMessageReceived({
            id: 'welcome',
            isAgent: true,
            message: "Hello! I'm Gulshan, your Australian migration assistant. How can I help you with your visa or migration questions today?",
            timestamp: new Date()
          });
        }, 1000);
      }
    }, 2000);
  };
  
  // Toggle mute status
  const toggleMute = () => {
    setIsMuted(!isMuted);
  };
  
  return (
    <div className="video-container w-full h-full min-h-[400px] bg-gray-100 rounded-lg overflow-hidden flex flex-col">
      {!isConnected ? (
        <div className="flex flex-col items-center justify-center h-full">
          <div className="bg-australia-blue/10 p-8 rounded-full mb-4">
            <Video size={48} className="text-australia-blue" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Meet with Gulshan</h3>
          <p className="text-gray-600 text-center max-w-md mb-6">
            Connect with Gulshan AI for personalized guidance on Australian migration and visa processes
          </p>
          <Button 
            onClick={handleConnect} 
            disabled={isConnecting}
            className="bg-australia-blue hover:bg-australia-darkBlue"
          >
            {isConnecting ? (
              <>
                <span className="animate-pulse">Connecting</span>
                <span className="typing-indicator ml-2">
                  <span></span>
                  <span></span>
                  <span></span>
                </span>
              </>
            ) : (
              'Start Video Meeting'
            )}
          </Button>
        </div>
      ) : (
        <>
          <div className="flex-grow relative">
            {/* This would be replaced with actual video stream */}
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-r from-australia-blue/5 to-australia-blue/10">
              <div className="w-40 h-40 rounded-full bg-australia-blue/20 flex items-center justify-center">
                <div className="w-32 h-32 rounded-full bg-australia-blue/30 flex items-center justify-center">
                  <div className="w-24 h-24 rounded-full bg-australia-blue flex items-center justify-center text-4xl font-bold text-white">
                    G
                  </div>
                </div>
              </div>
            </div>
            
            {/* User's video preview (small corner) */}
            <div className="absolute bottom-4 right-4 w-32 h-24 bg-gray-800 rounded-lg overflow-hidden border-2 border-white shadow-lg">
              <div className="w-full h-full bg-gray-900 flex items-center justify-center text-white text-xs">
                Your Camera
              </div>
            </div>
          </div>
          
          <div className="p-3 bg-white border-t flex justify-center">
            <Button 
              variant="outline" 
              size="icon"
              className={`rounded-full ${isMuted ? 'bg-red-100 text-red-500 border-red-200' : 'bg-gray-100'} mr-2`}
              onClick={toggleMute}
            >
              {isMuted ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="1" y1="1" x2="23" y2="23"></line>
                  <path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6"></path>
                  <path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23"></path>
                  <line x1="12" y1="19" x2="12" y2="23"></line>
                  <line x1="8" y1="23" x2="16" y2="23"></line>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                  <line x1="12" y1="19" x2="12" y2="23"></line>
                  <line x1="8" y1="23" x2="16" y2="23"></line>
                </svg>
              )}
            </Button>
            
            <Button 
              variant="outline"
              className="bg-red-500 hover:bg-red-600 text-white border-none rounded-full"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.42 19.42 0 0 1-3.33-2.67m-2.67-3.34a19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91"></path>
                <line x1="23" y1="1" x2="1" y2="23"></line>
              </svg>
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default VideoInterface;
