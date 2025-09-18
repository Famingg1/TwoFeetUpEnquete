import { Question } from '@/components/SurveyQuestion';

export const surveyQuestions: Question[] = [
  {
    id: 'energy-tasks',
    type: 'multiple-choice',
    title: 'Welke taken geven je het meeste energie?',
    description: 'Kies het antwoord dat het beste bij je past.',
    options: [
      'Creatief werk en brainstormsessies',
      'Klantcontact en directe communicatie',
      'Strategisch denken en lange termijn planning',
      'Technische uitdagingen oplossen',
      'Teamwork en samenwerking',
      'Anders, namelijk...'
    ],
    required: true
  },
  {
    id: 'energy-draining',
    type: 'checkbox',
    title: 'Welke taken kosten je juist veel energie?',
    description: 'Selecteer alle antwoorden die van toepassing zijn.',
    options: [
      'Repetitieve administratieve taken',
      'Handmatige data-invoer',
      'Het zoeken naar informatie in verschillende systemen',
      'Rapportages maken',
      'Email management',
      'Plannen en coordinatie',
      'Vergaderingen bijwonen/organiseren'
    ],
    required: true
  },
  {
    id: 'daily-challenges',
    type: 'text',
    title: 'Waar loop je het vaakst tegenaan in je dagelijks werk?',
    description: 'Beschrijf kort de grootste frustraties of knelpunten die je ervaart.',
    required: true
  },
  {
    id: 'improvement-areas',
    type: 'text',
    title: 'Wat zou volgens jou beter kunnen in onze werkprocessen?',
    description: 'Denk aan efficiency, samenwerking, tools, communicatie, etc.',
    required: true
  },
  {
    id: 'ai-enthusiasm',
    type: 'rating',
    title: 'Hoe enthousiast ben je over het gebruik van AI in je werk?',
    description: 'Geef een score van 1 (helemaal niet enthousiast) tot 10 (zeer enthousiast).',
    required: true
  },
  {
    id: 'ai-colleague',
    type: 'text',
    title: 'Welke "AI-collega" zou jij willen hebben?',
    description: 'Beschrijf welke taken deze AI-assistent voor jou zou kunnen uitvoeren om je werk leuker en efficiënter te maken.',
    required: true
  }
];