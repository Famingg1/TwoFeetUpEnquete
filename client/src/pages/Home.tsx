import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import WelcomePage from '@/components/WelcomePage';
import SurveyQuestion from '@/components/SurveyQuestion';
import ThankYouPage from '@/components/ThankYouPage';
import ProgressBar from '@/components/ProgressBar';
import { surveyQuestions } from '@/data/surveyQuestions';
import { apiRequest } from '@/lib/queryClient';

type SurveyState = 'welcome' | 'survey' | 'complete' | 'submitting';

export default function Home() {
  const [state, setState] = useState<SurveyState>('welcome');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});

  // Mutation for submitting survey
  const submitSurvey = useMutation({
    mutationFn: async (responses: Record<string, any>) => {
      const result = await apiRequest('POST', '/api/survey/submit', { responses });
      return result.json();
    },
    onSuccess: (data) => {
      console.log('Survey submitted successfully:', data);
      setState('complete');
    },
    onError: (error) => {
      console.error('Error submitting survey:', error);
      // For now, still show completion page but log the error
      setState('complete');
    },
  });

  const handleStart = () => {
    setState('survey');
    setCurrentQuestion(0);
  };

  const handleAnswer = (answer: any) => {
    const questionId = surveyQuestions[currentQuestion].id;
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
    console.log('Answer updated:', { questionId, answer });
  };

  const handleNext = () => {
    if (currentQuestion < surveyQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      // Submit survey to backend
      console.log('Survey completed! Final answers:', answers);
      setState('submitting');
      submitSurvey.mutate(answers);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const handleRestart = () => {
    setState('welcome');
    setCurrentQuestion(0);
    setAnswers({});
    console.log('Survey restarted');
  };

  if (state === 'welcome') {
    return <WelcomePage onStart={handleStart} />;
  }

  if (state === 'submitting') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-twofeetup-dark-purple to-twofeetup-blue flex items-center justify-center p-4">
        <div className="bg-white/95 backdrop-blur-sm p-8 rounded-lg text-center">
          <div className="animate-spin w-8 h-8 border-4 border-twofeetup-purple border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-twofeetup-black">Je antwoorden worden opgeslagen...</p>
        </div>
      </div>
    );
  }

  if (state === 'complete') {
    return <ThankYouPage onRestart={handleRestart} />;
  }

  const question = surveyQuestions[currentQuestion];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <ProgressBar 
            currentStep={currentQuestion + 1} 
            totalSteps={surveyQuestions.length} 
          />
        </div>
      </div>
      
      <SurveyQuestion
        question={question}
        onAnswer={handleAnswer}
        onNext={handleNext}
        onPrevious={handlePrevious}
        showPrevious={currentQuestion > 0}
        isLastQuestion={currentQuestion === surveyQuestions.length - 1}
      />
    </div>
  );
}