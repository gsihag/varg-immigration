
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, Clock, AlertCircle, Calendar, FileText, Users, Shield } from 'lucide-react';

const TimelineTracker = () => {
  const [selectedVisa, setSelectedVisa] = useState('189');
  const [currentStage, setCurrentStage] = useState(1);

  const visaTimelines = {
    '189': [
      { stage: 'Expression of Interest (EOI)', duration: '1-2 weeks', status: 'completed', description: 'Submit EOI through SkillSelect' },
      { stage: 'Invitation to Apply', duration: '1-6 months', status: 'current', description: 'Receive invitation based on points score' },
      { stage: 'Visa Application', duration: '2-4 weeks', status: 'pending', description: 'Submit complete application with documents' },
      { stage: 'Health & Character Checks', duration: '4-8 weeks', status: 'pending', description: 'Medical exams and police clearances' },
      { stage: 'Case Officer Assessment', duration: '8-12 months', status: 'pending', description: 'Department reviews application' },
      { stage: 'Visa Decision', duration: '1-2 weeks', status: 'pending', description: 'Final decision notification' }
    ],
    '190': [
      { stage: 'State Nomination EOI', duration: '2-4 weeks', status: 'completed', description: 'Submit EOI for state nomination' },
      { stage: 'State Nomination', duration: '2-6 months', status: 'current', description: 'State reviews and nominates' },
      { stage: 'Federal EOI Invitation', duration: '2-4 weeks', status: 'pending', description: 'Automatic invitation after nomination' },
      { stage: 'Visa Application', duration: '2-4 weeks', status: 'pending', description: 'Submit federal visa application' },
      { stage: 'Health & Character Checks', duration: '4-8 weeks', status: 'pending', description: 'Medical exams and police clearances' },
      { stage: 'Case Officer Assessment', duration: '8-15 months', status: 'pending', description: 'Department reviews application' },
      { stage: 'Visa Decision', duration: '1-2 weeks', status: 'pending', description: 'Final decision notification' }
    ],
    '482': [
      { stage: 'Employer Sponsorship', duration: '2-4 weeks', status: 'completed', description: 'Employer applies for sponsorship' },
      { stage: 'Nomination Application', duration: '4-8 weeks', status: 'current', description: 'Employer nominates position' },
      { stage: 'Visa Application', duration: '2-4 weeks', status: 'pending', description: 'Employee applies for visa' },
      { stage: 'Health & Character Checks', duration: '4-6 weeks', status: 'pending', description: 'Medical exams and police clearances' },
      { stage: 'Assessment & Decision', duration: '3-5 months', status: 'pending', description: 'Department processes application' },
      { stage: 'Visa Grant', duration: '1-2 weeks', status: 'pending', description: 'Visa granted notification' }
    ]
  };

  const currentTimeline = visaTimelines[selectedVisa];
  const completedStages = currentTimeline.filter(stage => stage.status === 'completed').length;
  const progressPercentage = (completedStages / currentTimeline.length) * 100;

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'current': return <Clock className="w-5 h-5 text-blue-600" />;
      case 'pending': return <AlertCircle className="w-5 h-5 text-gray-400" />;
      default: return null;
    }
  };

  const getActionItems = () => {
    const currentStageData = currentTimeline.find(stage => stage.status === 'current');
    if (!currentStageData) return [];

    const actionsByStage = {
      'Expression of Interest (EOI)': [
        'Complete skills assessment',
        'Achieve required English score',
        'Gather education credentials',
        'Submit EOI through SkillSelect'
      ],
      'State Nomination EOI': [
        'Research state requirements',
        'Prepare state-specific documents',
        'Submit state nomination EOI',
        'Wait for state invitation'
      ],
      'Invitation to Apply': [
        'Gather all required documents',
        'Get health insurance',
        'Prepare statutory declarations',
        'Book medical examinations'
      ],
      'Visa Application': [
        'Complete Form 47SK',
        'Upload all documents',
        'Pay application fee',
        'Submit application'
      ]
    };

    return actionsByStage[currentStageData.stage] || [];
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Visa Processing Timeline
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Select Visa Type</label>
              <select 
                value={selectedVisa}
                onChange={(e) => setSelectedVisa(e.target.value)}
                className="w-full p-2 border rounded-lg"
              >
                <option value="189">Subclass 189 - Skilled Independent</option>
                <option value="190">Subclass 190 - Skilled Nominated</option>
                <option value="482">Subclass 482 - TSS Visa</option>
              </select>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Overall Progress</span>
                <span className="text-sm text-gray-600">{completedStages}/{currentTimeline.length} stages</span>
              </div>
              <Progress value={progressPercentage} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4">
        {currentTimeline.map((stage, index) => (
          <Card key={index} className={`${stage.status === 'current' ? 'border-blue-500 bg-blue-50' : ''}`}>
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                {getStatusIcon(stage.status)}
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold">{stage.stage}</h3>
                    <span className="text-sm text-gray-500">{stage.duration}</span>
                  </div>
                  <p className="text-gray-600 text-sm mb-2">{stage.description}</p>
                  
                  {stage.status === 'current' && (
                    <div className="mt-3 p-3 bg-white rounded border">
                      <h4 className="font-medium text-sm mb-2">Next Action Items:</h4>
                      <ul className="space-y-1">
                        {getActionItems().map((item, idx) => (
                          <li key={idx} className="text-sm text-gray-700 flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardContent className="p-4">
          <h3 className="font-semibold mb-2 flex items-center gap-2">
            <Shield className="w-4 h-4" />
            Important Reminders
          </h3>
          <ul className="space-y-1 text-sm text-gray-700">
            <li>• Keep all documents current and valid throughout the process</li>
            <li>• Respond to case officer requests within specified timeframes</li>
            <li>• Maintain health insurance coverage during application</li>
            <li>• Notify of any changes in circumstances immediately</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default TimelineTracker;
