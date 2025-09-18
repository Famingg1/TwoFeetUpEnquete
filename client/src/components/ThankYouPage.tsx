import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle, Send, CheckSquare, AlertCircle } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface ThankYouPageProps {
  onRestart?: () => void;
  surveyResponseId?: string | null;
}

export default function ThankYouPage({ onRestart, surveyResponseId }: ThankYouPageProps) {
  const { toast } = useToast();
  const [webhookSent, setWebhookSent] = useState(false);

  // Mutation for sending to Make.com webhook
  const sendToMake = useMutation({
    mutationFn: async () => {
      const result = await apiRequest('POST', '/api/survey/send-to-make', { 
        surveyResponseId 
      });
      return result.json();
    },
    onSuccess: () => {
      setWebhookSent(true);
      toast({
        title: "Succesvol verzonden!",
        description: "Je antwoorden zijn verzonden naar Make.com voor verdere verwerking.",
        duration: 5000,
      });
    },
    onError: (error) => {
      console.error('Error sending to Make.com:', error);
      toast({
        title: "Verzending mislukt",
        description: "Er is een probleem opgetreden bij het verzenden naar Make.com. Probeer het opnieuw.",
        variant: "destructive",
        duration: 5000,
      });
    },
  });

  const handleSendToMake = () => {
    if (surveyResponseId) {
      sendToMake.mutate();
    }
  };
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
            <p className="text-sm text-twofeetup-black/60 mb-6">
              Heb je nog vragen over dit traject? Neem contact op met het management team.
            </p>
            
            {/* Make.com webhook button */}
            {surveyResponseId && (
              <div className="mb-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                  <h4 className="font-medium text-twofeetup-black mb-2">Automatische verwerking</h4>
                  <p className="text-sm text-twofeetup-black/70 mb-3">
                    Wil je je antwoorden ook verzenden naar ons Make.com automatiseringssysteem 
                    voor directe verwerking en analyse?
                  </p>
                  
                  {!webhookSent ? (
                    <Button 
                      onClick={handleSendToMake}
                      disabled={sendToMake.isPending}
                      className="bg-twofeetup-purple hover:bg-twofeetup-purple/90"
                      data-testid="button-send-to-make"
                    >
                      {sendToMake.isPending ? (
                        <>
                          <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2" />
                          Verzenden...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          Naar Make.com verzenden
                        </>
                      )}
                    </Button>
                  ) : (
                    <div className="flex items-center text-green-600">
                      <CheckSquare className="w-4 h-4 mr-2" />
                      <span className="text-sm font-medium">Succesvol verzonden naar Make.com!</span>
                    </div>
                  )}
                </div>
              </div>
            )}
            
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