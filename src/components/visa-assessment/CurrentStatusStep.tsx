
import React from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AssessmentData } from './types';

interface CurrentStatusStepProps {
  assessmentData: AssessmentData;
  setAssessmentData: (data: AssessmentData) => void;
}

const CurrentStatusStep: React.FC<CurrentStatusStepProps> = ({ assessmentData, setAssessmentData }) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Current Status</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="location">Current Location</Label>
            <Select onValueChange={(value) => setAssessmentData({...assessmentData, currentLocation: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Select your location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="australia">Australia</SelectItem>
                <SelectItem value="india">India</SelectItem>
                <SelectItem value="china">China</SelectItem>
                <SelectItem value="uk">United Kingdom</SelectItem>
                <SelectItem value="usa">United States</SelectItem>
                <SelectItem value="canada">Canada</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="visaStatus">Current Visa Status (if in Australia)</Label>
            <Select onValueChange={(value) => setAssessmentData({...assessmentData, visaStatus: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Select visa status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">Not in Australia</SelectItem>
                <SelectItem value="student">Student Visa</SelectItem>
                <SelectItem value="temporary-graduate">Temporary Graduate Visa</SelectItem>
                <SelectItem value="working-holiday">Working Holiday Visa</SelectItem>
                <SelectItem value="work">Work Visa</SelectItem>
                <SelectItem value="visitor">Visitor Visa</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="family">Family Status</Label>
            <Select onValueChange={(value) => setAssessmentData({...assessmentData, familyStatus: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Select family status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="single">Single</SelectItem>
                <SelectItem value="married-included">Married (partner included in application)</SelectItem>
                <SelectItem value="married-separate">Married (partner not included)</SelectItem>
                <SelectItem value="defacto">De facto relationship</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="state">Preferred Australian State</Label>
            <Select onValueChange={(value) => setAssessmentData({...assessmentData, stateInterest: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Select preferred state" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="nsw">New South Wales (Sydney)</SelectItem>
                <SelectItem value="vic">Victoria (Melbourne)</SelectItem>
                <SelectItem value="qld">Queensland (Brisbane)</SelectItem>
                <SelectItem value="wa">Western Australia (Perth)</SelectItem>
                <SelectItem value="sa">South Australia (Adelaide)</SelectItem>
                <SelectItem value="tas">Tasmania (Hobart)</SelectItem>
                <SelectItem value="act">Australian Capital Territory (Canberra)</SelectItem>
                <SelectItem value="nt">Northern Territory (Darwin)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentStatusStep;
