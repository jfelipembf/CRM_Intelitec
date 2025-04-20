export const mockActivities = [
  {
    id: 1,
    title: "Reunião com cliente",
    description: "Reunião de apresentação dos serviços",
    type: "Reunião",
    status: "Planejada",
    startDate: "2025-04-20T10:00:00",
    endDate: "2025-04-20T11:00:00",
    participants: [
      { id: 1, name: "Felipe Macedo" }
    ],
    location: "Sala de Reuniões",
    priority: "Alta",
    createdBy: { id: 1, name: "Felipe Macedo" },
    createdAt: "2025-04-20T14:00:00",
    updatedAt: "2025-04-20T14:00:00"
  },
  {
    id: 2,
    title: "Ligação de follow-up",
    description: "Ligação para cliente após reunião",
    type: "Ligação",
    status: "Planejada",
    startDate: "2025-04-21T14:00:00",
    endDate: "2025-04-21T14:30:00",
    participants: [
      { id: 1, name: "Felipe Macedo" }
    ],
    location: "Remoto",
    priority: "Média",
    createdBy: { id: 1, name: "Felipe Macedo" },
    createdAt: "2025-04-20T10:00:00",
    updatedAt: "2025-04-20T10:00:00"
  },
  {
    id: 3,
    title: "Envio de proposta",
    description: "Envio da proposta comercial",
    type: "E-mail",
    status: "Planejada",
    startDate: "2025-04-22T09:00:00",
    endDate: "2025-04-22T09:30:00",
    participants: [
      { id: 1, name: "Felipe Macedo" }
    ],
    location: "Remoto",
    priority: "Alta",
    createdBy: { id: 1, name: "Felipe Macedo" },
    createdAt: "2025-04-20T09:00:00",
    updatedAt: "2025-04-20T09:00:00"
  },
  {
    id: 4,
    title: "Reunião de fechamento",
    description: "Reunião final para fechamento do negócio",
    type: "Reunião",
    status: "Planejada",
    startDate: "2025-04-23T14:00:00",
    endDate: "2025-04-23T15:00:00",
    participants: [
      { id: 1, name: "Felipe Macedo" }
    ],
    location: "Sala de Reuniões",
    priority: "Alta",
    createdBy: { id: 1, name: "Felipe Macedo" },
    createdAt: "2025-04-20T15:00:00",
    updatedAt: "2025-04-20T15:00:00"
  },
  {
    id: 1,
    title: "Reunião com cliente",
    description: "Discussão sobre novas funcionalidades do sistema",
    type: "Reunião",
    status: "Planejada",
    startDate: "2025-04-21T10:00:00",
    endDate: "2025-04-21T11:00:00",
    participants: [
      { id: 1, name: "João Silva" },
      { id: 2, name: "Maria Santos" }
    ],
    location: "Sala de Reuniões 2",
    priority: "Média",
    createdBy: { id: 1, name: "Felipe Macedo" },
    createdAt: "2025-04-20T14:00:00",
    updatedAt: "2025-04-20T14:00:00"
  },
  {
    id: 2,
    title: "Ligação para cliente",
    description: "Follow up sobre proposta enviada",
    type: "Ligação",
    status: "Planejada",
    startDate: "2025-04-19T09:00:00",
    endDate: "2025-04-19T09:30:00",
    participants: [
      { id: 3, name: "Pedro Oliveira" }
    ],
    location: "Remoto",
    priority: "Alta",
    createdBy: { id: 1, name: "Felipe Macedo" },
    createdAt: "2025-04-20T10:00:00",
    updatedAt: "2025-04-20T10:00:00"
  },
  {
    id: 3,
    title: "Tarefa de desenvolvimento",
    description: "Implementação de nova feature",
    type: "Tarefa",
    status: "Em andamento",
    startDate: "2025-04-20T14:00:00",
    endDate: "2025-04-22T18:00:00",
    participants: [
      { id: 4, name: "Ana Souza" }
    ],
    location: "Remoto",
    priority: "Média",
    createdBy: { id: 1, name: "Felipe Macedo" },
    createdAt: "2025-04-20T09:00:00",
    updatedAt: "2025-04-20T14:00:00"
  }
];

export const activityTypes = [
  { id: 1, name: "Reunião" },
  { id: 2, name: "Ligação" },
  { id: 3, name: "E-mail" },
  { id: 4, name: "Tarefa" },
  { id: 5, name: "Visita" },
  { id: 6, name: "Nota" },
  { id: 7, name: "Documento" },
  { id: 8, name: "Lembrete" }
];

export const activityStatuses = [
  { id: 1, name: "Planejada" },
  { id: 2, name: "Em andamento" },
  { id: 3, name: "Concluída" },
  { id: 4, name: "Cancelada" }
];

export const activityPriorities = [
  { id: 1, name: "Baixa" },
  { id: 2, name: "Média" },
  { id: 3, name: "Alta" }
];
