import WelcomePage from '../WelcomePage';

export default function WelcomePageExample() {
  return (
    <WelcomePage 
      onStart={() => console.log('Survey started')}
    />
  );
}