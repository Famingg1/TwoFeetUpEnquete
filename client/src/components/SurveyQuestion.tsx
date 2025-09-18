import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";

export interface Question {
  id: string;
  type: 'multiple-choice' | 'checkbox' | 'text' | 'rating';
  title: string;
  description?: string;
  options?: string[];
  required?: boolean;
}

interface SurveyQuestionProps {
  question: Question;
  onAnswer: (answer: any) => void;
  onNext: () => void;
  onPrevious?: () => void;
  showPrevious?: boolean;
  isLastQuestion?: boolean;
}

export default function SurveyQuestion({ 
  question, 
  onAnswer, 
  onNext, 
  onPrevious, 
  showPrevious = false,
  isLastQuestion = false 
}: SurveyQuestionProps) {
  const [answer, setAnswer] = useState<any>('');
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const handleAnswer = (value: any) => {
    setAnswer(value);
    onAnswer(value);
  };

  const handleCheckboxChange = (option: string, checked: boolean) => {
    const newSelected = checked 
      ? [...selectedOptions, option]
      : selectedOptions.filter(item => item !== option);
    setSelectedOptions(newSelected);
    onAnswer(newSelected);
  };

  const canProceed = () => {
    if (!question.required) return true;
    if (question.type === 'checkbox') return selectedOptions.length > 0;
    return answer && answer.toString().trim() !== '';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl p-8">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-twofeetup-black mb-4">
            {question.title}
          </h2>
          {question.description && (
            <p className="text-twofeetup-black/70 mb-6">
              {question.description}
            </p>
          )}
        </div>

        <div className="mb-8">
          {question.type === 'multiple-choice' && question.options && (
            <RadioGroup 
              value={answer} 
              onValueChange={handleAnswer}
              data-testid={`radio-group-${question.id}`}
            >
              {question.options.map((option) => (
                <div key={option} className="flex items-center space-x-3 p-3 hover-elevate rounded-md">
                  <RadioGroupItem 
                    value={option} 
                    id={`${question.id}-${option}`}
                    data-testid={`radio-${option.replace(/\s+/g, '-').toLowerCase()}`}
                  />
                  <Label 
                    htmlFor={`${question.id}-${option}`} 
                    className="flex-1 cursor-pointer text-twofeetup-black"
                  >
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          )}

          {question.type === 'checkbox' && question.options && (
            <div className="space-y-3">
              {question.options.map((option) => (
                <div key={option} className="flex items-center space-x-3 p-3 hover-elevate rounded-md">
                  <Checkbox
                    id={`${question.id}-${option}`}
                    checked={selectedOptions.includes(option)}
                    onCheckedChange={(checked) => handleCheckboxChange(option, !!checked)}
                    data-testid={`checkbox-${option.replace(/\s+/g, '-').toLowerCase()}`}
                  />
                  <Label 
                    htmlFor={`${question.id}-${option}`} 
                    className="flex-1 cursor-pointer text-twofeetup-black"
                  >
                    {option}
                  </Label>
                </div>
              ))}
            </div>
          )}

          {question.type === 'text' && (
            <Textarea
              placeholder="Typ hier je antwoord..."
              value={answer}
              onChange={(e) => handleAnswer(e.target.value)}
              className="min-h-32 resize-none"
              data-testid={`textarea-${question.id}`}
            />
          )}

          {question.type === 'rating' && (
            <div className="flex justify-center space-x-2">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((rating) => (
                <Button
                  key={rating}
                  variant={answer === rating ? "default" : "outline"}
                  size="icon"
                  onClick={() => handleAnswer(rating)}
                  className={answer === rating ? "bg-twofeetup-purple" : ""}
                  data-testid={`rating-${rating}`}
                >
                  {rating}
                </Button>
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-between">
          {showPrevious ? (
            <Button 
              variant="outline" 
              onClick={onPrevious}
              data-testid="button-previous"
            >
              Vorige
            </Button>
          ) : (
            <div />
          )}
          
          <Button 
            onClick={onNext}
            disabled={!canProceed()}
            className={canProceed() ? "bg-twofeetup-purple hover:bg-twofeetup-dark-purple" : ""}
            data-testid="button-next"
          >
            {isLastQuestion ? 'Enquête voltooien' : 'Volgende'}
          </Button>
        </div>
      </Card>
    </div>
  );
}