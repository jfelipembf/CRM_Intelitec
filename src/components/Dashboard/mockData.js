// Dados fictícios para as oportunidades de venda
export const opportunities = [
  {
    id: 1,
    name: "Sistema ERP Completo",
    company: "Academia Inteli",
    amount: 15000,
    recurrent: true,
    recurrentAmount: 1500,
    probability: 75,
    dueDate: "25/05/2023",
    responsible: "Felipe Macedo",
    stageId: 0,
    sold: false
  },
  {
    id: 2,
    name: "Consultoria Business Intelligence",
    company: "TechCorp Solutions",
    amount: 8500,
    recurrent: false,
    recurrentAmount: 0,
    probability: 60,
    dueDate: "10/06/2023",
    responsible: "Ana Silva",
    stageId: 1,
    sold: false
  },
  {
    id: 3,
    name: "Licenciamento Software RH",
    company: "Global Enterprises",
    amount: 12000,
    recurrent: true,
    recurrentAmount: 2000,
    probability: 90,
    dueDate: "15/05/2023",
    responsible: "Carlos Santos",
    stageId: 2,
    sold: true
  },
  {
    id: 4,
    name: "Infraestrutura Cloud",
    company: "FutureTech Inc",
    amount: 35000,
    recurrent: true,
    recurrentAmount: 3000,
    probability: 40,
    dueDate: "30/12/2023",
    responsible: "Felipe Macedo",
    stageId: 3,
    sold: false
  },
  {
    id: 5,
    name: "Desenvolvimento App Mobile",
    company: "Startup Inovadora",
    amount: 25000,
    recurrent: false,
    recurrentAmount: 0,
    probability: 30,
    dueDate: "20/12/2023",
    responsible: "Márcia Oliveira",
    stageId: 4,
    sold: false
  },
  {
    id: 6,
    name: "Treinamento Equipe TI",
    company: "Mega Corporation",
    amount: 5000,
    recurrent: false,
    recurrentAmount: 0,
    probability: 100,
    dueDate: "05/06/2023",
    responsible: "Ana Silva",
    stageId: 5,
    sold: true
  },
  {
    id: 7,
    name: "Consultoria Segurança",
    company: "Banco Financeiro",
    amount: 18000,
    recurrent: true,
    recurrentAmount: 1200,
    probability: 65,
    dueDate: "12/12/2023",
    responsible: "Roberto Menezes",
    stageId: 1,
    sold: false
  },
  // Novas oportunidades com datas futuras
  {
    id: 8,
    name: "Implementação CRM Premium",
    company: "Distribuidora Nacional",
    amount: 22000,
    recurrent: true,
    recurrentAmount: 1800,
    probability: 85,
    dueDate: "25/12/2024",
    responsible: "Felipe Macedo",
    stageId: 2,
    sold: false
  },
  {
    id: 9,
    name: "Migração Sistema Legacy",
    company: "Indústrias Paulista",
    amount: 48000,
    recurrent: false,
    recurrentAmount: 0,
    probability: 70,
    dueDate: "10/01/2025",
    responsible: "Ana Silva",
    stageId: 3,
    sold: false
  },
  {
    id: 10,
    name: "Automação Marketing Digital",
    company: "E-commerce Brasil",
    amount: 15500,
    recurrent: true,
    recurrentAmount: 1350,
    probability: 65,
    dueDate: "15/03/2025",
    responsible: "Márcia Oliveira",
    stageId: 0,
    sold: false
  },
  {
    id: 11,
    name: "Segurança Corporativa",
    company: "Banco Investimentos",
    amount: 32000,
    recurrent: true,
    recurrentAmount: 2500,
    probability: 80,
    dueDate: "30/05/2025",
    responsible: "Roberto Menezes",
    stageId: 4,
    sold: false
  },
  {
    id: 12,
    name: "Consultoria DevOps",
    company: "Tech Solutions SA",
    amount: 18500,
    recurrent: false,
    recurrentAmount: 0,
    probability: 75,
    dueDate: "22/02/2025",
    responsible: "Carlos Santos",
    stageId: 5,
    sold: false
  },
  // Oportunidades na etapa de Fechamento
  {
    id: 13,
    name: "Solução BI Enterprise",
    company: "Grupo Industrial ABC",
    amount: 65000,
    recurrent: true,
    recurrentAmount: 4500,
    probability: 95,
    dueDate: "10/12/2023",
    responsible: "Felipe Macedo",
    stageId: 6,
    sold: true
  },
  {
    id: 14,
    name: "Licenciamento Suite Fiscal",
    company: "Contabilidade Express",
    amount: 28000,
    recurrent: true,
    recurrentAmount: 2200,
    probability: 100,
    dueDate: "05/01/2024",
    responsible: "Ana Silva",
    stageId: 6,
    sold: true
  },
  {
    id: 15,
    name: "Projeto Inteligência Artificial",
    company: "TechFuture Inc",
    amount: 120000,
    recurrent: false,
    recurrentAmount: 0,
    probability: 90,
    dueDate: "15/01/2025",
    responsible: "Carlos Santos",
    stageId: 6,
    sold: false
  }
];

// Cálculo dos totais para os estágios do pipeline
export const calculatePipelineTotals = (opportunities) => {
  // Agrupar oportunidades por estágio
  const opportunitiesByStage = opportunities.reduce((acc, opp) => {
    if (!acc[opp.stageId]) {
      acc[opp.stageId] = [];
    }
    acc[opp.stageId].push(opp);
    return acc;
  }, {});

  // Calcular totais
  const totalOpportunities = opportunities.length;
  const totalAmount = opportunities.reduce((sum, opp) => sum + opp.amount, 0);
  const totalRecurrentAmount = opportunities.reduce((sum, opp) => sum + (opp.recurrent ? opp.recurrentAmount : 0), 0);

  return {
    totalOpportunities,
    totalAmount,
    totalRecurrentAmount,
    opportunitiesByStage
  };
}; 