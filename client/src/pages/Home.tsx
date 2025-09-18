import { useState } from 'react';
import WelcomePage from '@/components/WelcomePage';
import SurveyQuestion from '@/components/SurveyQuestion';
import ThankYouPage from '@/components/ThankYouPage';
import ProgressBar from '@/components/ProgressBar';
import { surveyQuestions } from '@/data/surveyQuestions';

type SurveyState = 'welcome' | 'survey' | 'complete';

export default function Home() {
  const [state, setState] = useState<SurveyState>('welcome');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});

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
      // Save final answers (in a real app, this would send to backend)
      console.log('Survey completed! Final answers:', answers);
      setState('complete');
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