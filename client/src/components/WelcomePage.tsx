import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface WelcomePageProps {
  onStart: () => void;
}

export default function WelcomePage({ onStart }: WelcomePageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-twofeetup-dark-purple to-twofeetup-blue flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl p-8 bg-white/95 backdrop-blur-sm">
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-twofeetup-dark-purple to-twofeetup-blue rounded-lg flex items-center justify-center">
            <span className="text-2xl font-bold text-white">2FU</span>
          </div>
          <h1 className="text-3xl font-semibold text-twofeetup-black mb-2">
            Welkom bij het AI-automatiseringstraject
          </h1>
        </div>
        
        <div className="space-y-6 text-twofeetup-black/80 leading-relaxed">
          <p className="text-lg">
            <strong>Beste collega,</strong>
          </p>
          
          <p>
            De komende tijd gaan we als TwoFeetUP samen aan de slag met AI en automatisering 
            om onze eigen werkprocessen te optimaliseren.
          </p>
          
          <p>
            We weten dat verandering vragen oproept. Daarom starten we met deze anonieme 
            vragenlijst om ieders perspectief te horen.
          </p>
          
          <div className="bg-twofeetup-grey/50 p-6 rounded-lg">
            <p className="font-medium text-twofeetup-black mb-2">Onze filosofie:</p>
            <p className="text-sm">
              AI is er om het repetitieve werk over te nemen, zodat wij ons kunnen richten op 
              waar we écht goed in zijn - creativiteit, strategie, klantcontact en innovatie. 
              We bouwen tools die ons werk leuker maken, niet die ons vervangen.
            </p>
          </div>
          
          <div>
            <p className="font-medium mb-3">Via deze vragenlijst willen we graag weten:</p>
            <ul className="space-y-2 text-sm ml-4">
              <li className="flex items-start">
                <span className="w-2 h-2 bg-twofeetup-purple rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Welke taken je energie geven vs. kosten
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-twofeetup-purple rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Waar je tegenaan loopt in je dagelijks werk
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-twofeetup-purple rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Wat volgens jou beter kan
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-twofeetup-purple rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Welke "AI-collega" jij zou willen hebben
              </li>
            </ul>
          </div>
          
          <p className="text-sm">
            Jouw input is anoniem en helpt ons om de juiste prioriteiten te stellen. 
            Zo bouwen we samen aan een efficiëntere, leukere werkplek.
          </p>
          
          <p className="text-sm font-medium">
            Groet,<br/>
            [Management Team TwoFeetUp]
          </p>
        </div>
        
        <div className="mt-8 text-center">
          <Button 
            onClick={onStart}
            className="bg-gradient-to-r from-twofeetup-dark-purple to-twofeetup-blue text-white px-8 py-3 text-lg"
            data-testid="button-start-survey"
          >
            Start enquête
          </Button>
          <p className="text-xs text-twofeetup-black/60 mt-3">
            Deze enquête duurt ongeveer 5 minuten en is volledig anoniem
          </p>
        </div>
      </Card>
    </div>
  );
}