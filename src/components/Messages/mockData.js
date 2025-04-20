// Importação de avatares
import avatar1 from "../../assets/images/users/avatar-1.jpg";
import avatar2 from "../../assets/images/users/avatar-2.jpg";
import avatar3 from "../../assets/images/users/avatar-3.jpg";
import avatar4 from "../../assets/images/users/avatar-4.jpg";
import avatar5 from "../../assets/images/users/avatar-5.jpg";
import avatar6 from "../../assets/images/users/avatar-6.jpg";
import avatar7 from "../../assets/images/users/avatar-7.jpg";
import avatar8 from "../../assets/images/users/avatar-8.jpg";

// Contatos com canais de comunicação
export const contacts = [
  {
    id: 1,
    name: "Marcos Silva",
    avatar: avatar2,
    lastMessage: "Quando estará disponível o novo produto?",
    lastMessageTime: "2023-07-05T14:30:00",
    lastMessagePlatform: "whatsapp",
    online: true,
    company: "TechBrasil Ltda",
    role: "Gerente de Compras",
    department: "Suprimentos",
    email: "marcos.silva@techbrasil.com.br",
    phone: "5511987654321",
    location: "São Paulo, SP",
    status: "active",
    customerSince: "Janeiro 2022",
    lastContact: "05/07/2023",
    owner: "Ana Paula",
    channels: [
      { type: "whatsapp", read: false, handle: "+55 11 98765-4321" },
      { type: "email", read: true, handle: "marcos.silva@techbrasil.com.br" },
      { type: "facebook", read: true, handle: "marcosSilva" }
    ]
  },
  {
    id: 2,
    name: "Carla Mendes",
    avatar: avatar3,
    lastMessage: "Obrigada pelo excelente atendimento!",
    lastMessageTime: "2023-07-04T09:45:00",
    lastMessagePlatform: "instagram",
    online: false,
    company: "Moda Express",
    role: "Diretora de Marketing",
    department: "Marketing",
    email: "carla.mendes@modaexpress.com.br",
    phone: "5521976543210",
    location: "Rio de Janeiro, RJ",
    status: "active",
    customerSince: "Março 2021",
    lastContact: "04/07/2023",
    owner: "Rafael Santos",
    channels: [
      { type: "instagram", read: false, handle: "@carlamendes" },
      { type: "whatsapp", read: true, handle: "+55 21 97654-3210" },
      { type: "email", read: true, handle: "carla.mendes@modaexpress.com.br" }
    ]
  },
  {
    id: 3,
    name: "Pedro Almeida",
    avatar: avatar4,
    lastMessage: "Podemos agendar uma reunião para amanhã?",
    lastMessageTime: "2023-07-03T16:20:00",
    lastMessagePlatform: "email",
    online: true,
    company: "Construções Almeida",
    role: "Diretor Executivo",
    department: "Diretoria",
    email: "pedro@construcoesalmeida.com.br",
    phone: "5541965432109",
    location: "Curitiba, PR",
    status: "active",
    customerSince: "Dezembro 2020",
    lastContact: "03/07/2023",
    owner: "Carlos Eduardo",
    channels: [
      { type: "email", read: false, handle: "pedro@construcoesalmeida.com.br" },
      { type: "whatsapp", read: true, handle: "+55 41 96543-2109" }
    ]
  },
  {
    id: 4,
    name: "Juliana Costa",
    avatar: avatar5,
    lastMessage: "Vou analisar sua proposta e retorno em breve",
    lastMessageTime: "2023-07-02T11:15:00",
    lastMessagePlatform: "facebook",
    online: false,
    company: "Consultoria JC",
    role: "Consultora Sênior",
    department: "Consultoria",
    email: "juliana@consultoriajc.com.br",
    phone: "5531954321098",
    location: "Belo Horizonte, MG",
    status: "inactive",
    customerSince: "Maio 2023",
    lastContact: "02/07/2023",
    owner: "Fernanda Lima",
    channels: [
      { type: "facebook", read: false, handle: "julianaCostaOficial" },
      { type: "whatsapp", read: true, handle: "+55 31 95432-1098" },
      { type: "email", read: true, handle: "juliana@consultoriajc.com.br" }
    ]
  },
  {
    id: 5,
    name: "Roberto Ferreira",
    avatar: avatar6,
    lastMessage: "Preciso de um orçamento atualizado",
    lastMessageTime: "2023-07-01T10:05:00",
    lastMessagePlatform: "whatsapp",
    online: true,
    company: "Supermercados RF",
    role: "Proprietário",
    department: "Diretoria",
    email: "roberto@superrf.com.br",
    phone: "5551943210987",
    location: "Porto Alegre, RS",
    status: "active",
    customerSince: "Fevereiro 2019",
    lastContact: "01/07/2023",
    owner: "Mariana Silva",
    channels: [
      { type: "whatsapp", read: true, handle: "+55 51 94321-0987" },
      { type: "email", read: true, handle: "roberto@superrf.com.br" }
    ]
  },
  {
    id: 6,
    name: "Daniela Santos",
    avatar: avatar7,
    lastMessage: "As imagens do nosso produto estão ótimas!",
    lastMessageTime: "2023-06-30T14:50:00",
    lastMessagePlatform: "instagram",
    online: false,
    company: "DS Fotografia",
    role: "Fotógrafa",
    department: "Criação",
    email: "daniela@dsfotografia.com.br",
    phone: "5512932109876",
    location: "São José dos Campos, SP",
    status: "active",
    customerSince: "Julho 2022",
    lastContact: "30/06/2023",
    owner: "Lucas Pereira",
    channels: [
      { type: "instagram", read: true, handle: "@danisantosfotografia" },
      { type: "whatsapp", read: true, handle: "+55 12 93210-9876" },
      { type: "email", read: false, handle: "daniela@dsfotografia.com.br" }
    ]
  }
];

// Mensagens por contato
export const conversations = [
  // Conversas do Marcos Silva
  {
    id: "msg-1",
    contactId: 1,
    sender: 1,
    content: "Olá, gostaria de saber quando o novo modelo de servidor estará disponível",
    timestamp: "2023-07-05T14:00:00",
    platform: "whatsapp",
    read: true
  },
  {
    id: "msg-2",
    contactId: 1,
    sender: "me",
    content: "Olá Marcos! Nosso novo servidor estará disponível a partir do dia 15 deste mês. Posso te incluir na lista de pré-venda?",
    timestamp: "2023-07-05T14:15:00",
    platform: "whatsapp",
    read: true
  },
  {
    id: "msg-3",
    contactId: 1,
    sender: 1,
    content: "Sim, por favor. Quando estará disponível o novo produto para testes?",
    timestamp: "2023-07-05T14:30:00",
    platform: "whatsapp",
    read: false
  },

  // Conversas da Carla Mendes
  {
    id: "msg-4",
    contactId: 2,
    sender: 2,
    content: "Acabei de receber os materiais de marketing, ficaram excelentes!",
    timestamp: "2023-07-04T09:30:00",
    platform: "instagram",
    read: true
  },
  {
    id: "msg-5",
    contactId: 2,
    sender: "me",
    content: "Que ótimo, Carla! Ficamos felizes que tenha gostado. Se precisar de mais alguma coisa é só falar.",
    timestamp: "2023-07-04T09:40:00",
    platform: "instagram",
    read: true
  },
  {
    id: "msg-6",
    contactId: 2,
    sender: 2,
    content: "Obrigada pelo excelente atendimento!",
    timestamp: "2023-07-04T09:45:00",
    platform: "instagram",
    read: false
  },

  // Conversas do Pedro Almeida
  {
    id: "msg-7",
    contactId: 3,
    sender: 3,
    content: "Prezados, analisei a proposta enviada e tenho algumas dúvidas.",
    timestamp: "2023-07-03T15:50:00",
    platform: "email",
    read: true
  },
  {
    id: "msg-8",
    contactId: 3,
    sender: "me",
    content: "Olá Pedro, podemos agendar uma call para esclarecimento das dúvidas. Qual seria o melhor horário para você?",
    timestamp: "2023-07-03T16:10:00",
    platform: "email",
    read: true
  },
  {
    id: "msg-9",
    contactId: 3,
    sender: 3,
    content: "Podemos agendar uma reunião para amanhã às 14h?",
    timestamp: "2023-07-03T16:20:00",
    platform: "email",
    read: false
  },

  // Conversas da Juliana Costa
  {
    id: "msg-10",
    contactId: 4,
    sender: 4,
    content: "Recebi a proposta comercial para os serviços de consultoria",
    timestamp: "2023-07-02T11:00:00",
    platform: "facebook",
    read: true
  },
  {
    id: "msg-11",
    contactId: 4,
    sender: "me",
    content: "Olá Juliana, qualquer dúvida sobre a proposta estou à disposição. Podemos personalizar os serviços conforme sua necessidade.",
    timestamp: "2023-07-02T11:10:00",
    platform: "facebook",
    read: true
  },
  {
    id: "msg-12",
    contactId: 4,
    sender: 4,
    content: "Vou analisar sua proposta e retorno em breve",
    timestamp: "2023-07-02T11:15:00",
    platform: "facebook",
    read: false
  },

  // Conversas do Roberto Ferreira
  {
    id: "msg-13",
    contactId: 5,
    sender: 5,
    content: "Bom dia, o contrato de fornecimento está para vencer",
    timestamp: "2023-07-01T09:45:00",
    platform: "whatsapp",
    read: true
  },
  {
    id: "msg-14",
    contactId: 5,
    sender: "me",
    content: "Bom dia Roberto, sim, já estamos preparando a renovação. Houve alguns ajustes nos valores devido à inflação do período.",
    timestamp: "2023-07-01T09:55:00",
    platform: "whatsapp",
    read: true
  },
  {
    id: "msg-15",
    contactId: 5,
    sender: 5,
    content: "Preciso de um orçamento atualizado",
    timestamp: "2023-07-01T10:05:00",
    platform: "whatsapp",
    read: true
  },

  // Conversas da Daniela Santos
  {
    id: "msg-16",
    contactId: 6,
    sender: 6,
    content: "Vi que vocês publicaram as fotos da nossa última sessão",
    timestamp: "2023-06-30T14:30:00",
    platform: "instagram",
    read: true
  },
  {
    id: "msg-17",
    contactId: 6,
    sender: "me",
    content: "Sim, Daniela! As fotos ficaram incrível e estão gerando bastante engajamento nas nossas redes.",
    timestamp: "2023-06-30T14:40:00",
    platform: "instagram",
    read: true
  },
  {
    id: "msg-18",
    contactId: 6,
    sender: 6,
    content: "As imagens do nosso produto estão ótimas!",
    timestamp: "2023-06-30T14:50:00",
    platform: "instagram",
    read: true
  }
];

// Contas de redes sociais conectadas
export const socialAccounts = {
  whatsapp: {
    connected: true,
    phone: "+5511999999999",
    status: "active"
  },
  facebook: {
    connected: true,
    pageId: "intelitec",
    pageName: "InteliTec CRM",
    status: "active"
  },
  instagram: {
    connected: true,
    username: "inteliteccrm",
    businessAccount: true,
    status: "active"
  },
  telegram: {
    connected: false
  },
  email: {
    connected: true,
    email: "atendimento@intelitec.com.br",
    status: "active"
  }
}; 