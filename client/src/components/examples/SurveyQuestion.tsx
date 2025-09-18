import SurveyQuestion from '../SurveyQuestion';

export default function SurveyQuestionExample() {
  const sampleQuestion = {
    id: 'energy-tasks',
    type: 'multiple-choice' as const,
    title: 'Welke taken geven je energie?',
    description: 'Kies het antwoord dat het beste bij jou past.',
    options: [
      'Creatief werk en brainstormsessies',
      'Klantcontact en overleg',
      'Strategisch denken en plannen',
      'Technische uitdagingen oplossen',
      'Teamwork en samenwerking'
    ],
    required: true
  };

  return (
    <SurveyQuestion 
      question={sampleQuestion}
      onAnswer={(answer) => console.log('Answer:', answer)}
      onNext={() => console.log('Next question')}
      onPrevious={() => console.log('Previous question')}
      showPrevious={true}
      isLastQuestion={false}
    />
  );
}