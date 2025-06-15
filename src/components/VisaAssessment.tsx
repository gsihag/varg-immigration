import React, { useState } from 'react';

interface Question {
  id: string;
  text: string;
  options: { value: string; label: string; description?: string }[];
}

const questions: Question[] = [
  {
    id: 'age',
    text: 'What is your age?',
    options: [
      { value: '18-24', label: '18-24 years' },
      { value: '25-34', label: '25-34 years' },
      { value: '35-44', label: '35-44 years' },
      { value: '45+', label: '45 years or older' },
    ],
  },
  {
    id: 'education',
    text: 'What is your highest level of education?',
    options: [
      { value: 'high-school', label: 'High School Diploma' },
      { value: 'bachelor', label: 'Bachelor\'s Degree' },
      { value: 'master', label: 'Master\'s Degree' },
      { value: 'doctorate', label: 'Doctorate (Ph.D.)' },
    ],
  },
  {
    id: 'experience',
    text: 'How many years of professional experience do you have?',
    options: [
      { value: '0-2', label: '0-2 years' },
      { value: '3-5', label: '3-5 years' },
      { value: '6-10', label: '6-10 years' },
      { value: '10+', label: 'More than 10 years' },
    ],
  },
  {
    id: 'english',
    text: 'What is your English language proficiency level?',
    options: [
      { value: 'basic', label: 'Basic' },
      { value: 'intermediate', label: 'Intermediate' },
      { value: 'advanced', label: 'Advanced' },
      { value: 'native', label: 'Native Speaker' },
    ],
  },
];

const VisaAssessment: React.FC = () => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});

  const currentStep = questions[currentStepIndex];
  const totalSteps = questions.length;

  const handleAnswer = (answer: string) => {
    setAnswers({ ...answers, [currentStep.id]: answer });
  };

  const handleNext = () => {
    if (currentStepIndex < totalSteps - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  const handleSubmit = () => {
    alert('Assessment submitted! Results: ' + JSON.stringify(answers));
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Visa Assessment</h2>
      <div className="mb-6">
        <div className="text-gray-600 text-sm">Step {currentStepIndex + 1} of {totalSteps}</div>
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
          <div
            className="bg-blue-600 h-2.5 rounded-full"
            style={{ width: `${((currentStepIndex + 1) / totalSteps) * 100}%` }}
          ></div>
        </div>
        <h3 className="text-xl font-semibold text-gray-700 mb-3">{currentStep.text}</h3>
      </div>

      <div className="space-y-4">
        {currentStep.options?.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(option.value)}
            className={`w-full p-4 text-left border-2 rounded-lg transition-all duration-200 ${
              answers[currentStep.id] === option.value
                ? 'border-blue-600 bg-blue-50 text-blue-900'
                : 'border-gray-300 bg-white text-gray-700 hover:border-blue-600 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold">{option.label}</div>
                {option.description && (
                  <div className="text-sm text-gray-500 mt-1">{option.description}</div>
                )}
              </div>
              <div className={`w-4 h-4 rounded-full border-2 ${
                answers[currentStep.id] === option.value
                  ? 'border-blue-600 bg-blue-600'
                  : 'border-gray-300'
              }`}>
                {answers[currentStep.id] === option.value && (
                  <div className="w-full h-full rounded-full bg-white scale-50"></div>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>

      <div className="flex justify-between mt-6">
        <button
          onClick={handlePrevious}
          disabled={currentStepIndex === 0}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded disabled:opacity-50"
        >
          Previous
        </button>
        {currentStepIndex === totalSteps - 1 ? (
          <button
            onClick={handleSubmit}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
          >
            Submit
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default VisaAssessment;
