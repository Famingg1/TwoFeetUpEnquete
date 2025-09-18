import ProgressBar from '../ProgressBar';

export default function ProgressBarExample() {
  return (
    <div className="p-8 bg-white">
      <ProgressBar currentStep={3} totalSteps={6} />
    </div>
  );
}