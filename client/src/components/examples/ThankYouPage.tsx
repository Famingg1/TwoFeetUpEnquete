import ThankYouPage from '../ThankYouPage';

export default function ThankYouPageExample() {
  return (
    <ThankYouPage 
      onRestart={() => console.log('Restart survey')}
    />
  );
}