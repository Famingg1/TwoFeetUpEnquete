import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

interface ThankYouPageProps {
  onRestart?: () => void;
}

export default function ThankYouPage({ onRestart }: ThankYouPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-twofeetup-dark-purple to-twofeetup-blue flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl p-8 bg-white/95 backdrop-blur-sm text-center">
        <div className="mb-8">
          <div className="w-20 h-20 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-semibold text-twofeetup-black mb-4">
            Bedankt voor je deelname!
          </h1>
        </div>
        
        <div className="space-y-6 text-twofeetup-black/80 leading-relaxed">
          <p className="text-lg">
            Je antwoorden zijn anoniem verzonden en helpen ons om de juiste 
            prioriteiten te stellen voor ons AI-automatiseringstraject.
          </p>
          
          <div className="bg-twofeetup-grey/50 p-6 rounded-lg">
            <h3 className="font-medium text-twofeetup-black mb-3">Wat gebeurt er nu?</h3>
            <ul className="space-y-2 text-sm text-left">
              <li className="flex items-start">
                <span className="w-2 h-2 bg-twofeetup-purple rounded-full mt-2 mr-3 flex-shrink-0"></span>
                We analyseren alle antwoorden om patronen te herkennen
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-twofeetup-purple rounded-full mt-2 mr-3 flex-shrink-0"></span>
                We bepalen welke AI-tools het meeste impact kunnen hebben
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-twofeetup-purple rounded-full mt-2 mr-3 flex-shrink-0"></span>
                We delen de resultaten en volgende stappen met het team
              </li>
            </ul>
          </div>
          
          <p className="font-medium text-twofeetup-black">
            Samen bouwen we aan een efficiëntere, leukere werkplek!
          </p>
          
          <div className="pt-4">
            <p className="text-sm text-twofeetup-black/60 mb-4">
              Heb je nog vragen over dit traject? Neem contact op met het management team.
            </p>
            
            {onRestart && (
              <Button 
                variant="outline" 
                onClick={onRestart}
                data-testid="button-restart"
              >
                Nieuwe enquête starten
              </Button>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}