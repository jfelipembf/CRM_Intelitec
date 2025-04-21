export const SPIN_STEPS = [
  {
    id: 1,
    title: 'Situação',
    description: 'Entenda a situação atual e os desafios do cliente',
    explanation: {
      title: 'Objetivo da Fase',
      content: 'Nesta fase, o objetivo é compreender a situação atual do cliente, seus desafios e dificuldades. É importante construir uma relação de confiança e demonstrar interesse genuíno no negócio do cliente.'
    },
    fields: [
      { id: 'current_situation', label: 'Situação Atual', type: 'textarea' },
      { id: 'challenges', label: 'Principais Desafios', type: 'textarea' },
      { id: 'objections', label: 'Objeções', type: 'textarea' },
      { id: 'objections_response', label: 'Resposta às Objeções', type: 'textarea' }
    ]
  },
  {
    id: 2,
    title: 'Problema',
    description: 'Identifique os problemas específicos e pontos de dor',
    explanation: {
      title: 'Objetivo da Fase',
      content: 'Nesta fase, o objetivo é identificar os problemas específicos que o cliente enfrenta. É importante fazer perguntas que ajudem a descobrir as verdadeiras necessidades do cliente e entender como esses problemas afetam seu negócio.'
    },
    fields: [
      { id: 'specific_problems', label: 'Problemas Específicos', type: 'textarea' },
      { id: 'pain_points', label: 'Pontos de Dor', type: 'textarea' },
      { id: 'objections', label: 'Objeções', type: 'textarea' },
      { id: 'objections_response', label: 'Resposta às Objeções', type: 'textarea' }
    ]
  },
  {
    id: 3,
    title: 'Implicação',
    description: 'Analise as implicações dos problemas',
    explanation: {
      title: 'Objetivo da Fase',
      content: 'Nesta fase, o objetivo é ajudar o cliente a entender as implicações reais dos problemas identificados. É importante mostrar como esses problemas afetam o negócio do cliente e quais são os custos associados.'
    },
    fields: [
      { id: 'implications', label: 'Implicações', type: 'textarea' },
      { id: 'impact', label: 'Impacto no Negócio', type: 'textarea' },
      { id: 'objections', label: 'Objeções', type: 'textarea' },
      { id: 'objections_response', label: 'Resposta às Objeções', type: 'textarea' }
    ]
  },
  {
    id: 4,
    title: 'Necessidade-Pagamento',
    description: 'Apresente a solução e seus benefícios',
    explanation: {
      title: 'Objetivo da Fase',
      content: 'Nesta fase final, o objetivo é apresentar a solução que resolve os problemas identificados e mostrar os benefícios concretos para o negócio do cliente. É importante demonstrar como a solução atende às necessidades específicas do cliente e quais são os resultados esperados.'
    },
    fields: [
      { id: 'solution', label: 'Solução Proposta', type: 'textarea' },
      { id: 'benefits', label: 'Benefícios para o Negócio', type: 'textarea' },
      { id: 'objections', label: 'Objeções', type: 'textarea' },
      { id: 'objections_response', label: 'Resposta às Objeções', type: 'textarea' }
    ]
  },  
];
