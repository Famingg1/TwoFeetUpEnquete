import { Question } from '@/components/SurveyQuestion';

export const surveyQuestions: Question[] = [
  {
    id: 'automation-dream',
    type: 'text',
    title: 'In een wereld waarin alles mogelijk is. Wat zou je dan het allerliefste automatiseren binnen je huidige werkzaamheden?',
    description: 'Denk groot en ambitieus. Wat zou je werkdag het meest verbeteren?',
    required: true
  },
  {
    id: 'automation-wishlist',
    type: 'text',
    title: 'Wat zijn nog meer dingen die op je wensenlijst staan binnen jouw werkzaamheden op het gebied van AI & automatisering?',
    description: 'Deel al je ideeën, ook de kleinere verbeteringen die je voor je ziet.',
    required: true
  },
  {
    id: 'process-experience',
    type: 'multiple-choice',
    title: 'Hoe ervaar jij de processen binnen je eigen rol?',
    description: 'Kies het niveau dat het beste bij je huidige situatie past.',
    options: [
      'Niveau 1 - Vooral handmatig en veel losse bestanden',
      'Niveau 2 - We gebruiken systemen, maar die werken niet echt samen',
      'Niveau 3 - Systemen die samenwerken, maar weinig automatische processen',
      'Niveau 4 - Processen zijn grotendeels geïntegreerd en goed ingericht'
    ],
    required: true
  },
  {
    id: 'keep-manual',
    type: 'text',
    title: 'Wat zou je, zelfs als het te automatiseren zou zijn, te allen tijde zelf willen blijven doen?',
    description: 'Welke taken geven je energie en zou je nooit uit handen willen geven?',
    required: true
  }
];