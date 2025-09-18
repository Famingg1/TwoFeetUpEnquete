interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export default function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  const progress = (currentStep / totalSteps) * 100;
  
  return (
    <div className="w-full bg-twofeetup-grey rounded-full h-2 mb-8">
      <div 
        className="bg-gradient-to-r from-twofeetup-dark-purple to-twofeetup-blue h-2 rounded-full transition-all duration-300"
        style={{ width: `${progress}%` }}
        data-testid="progress-bar"
      />
      <div className="flex justify-between mt-2 text-sm text-twofeetup-black/60">
        <span>Stap {currentStep} van {totalSteps}</span>
        <span>{Math.round(progress)}% voltooid</span>
      </div>
    </div>
  );
}