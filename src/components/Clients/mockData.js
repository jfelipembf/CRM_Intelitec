// Dados fictícios para os clientes
export const clients = [
  // PESSOAS (TYPE = "Pessoa")
  {
    id: 1,
    name: "Felipe Macedo",
    company: "Academia Inteli",
    email: "felipe@academiainteli.com.br",
    phone: "(55) 51 99999-9999",
    address: "Av. Ipiranga, 6681 - Partenon, Porto Alegre - RS",
    status: "Ativo",
    type: "Pessoa",
    role: "CEO",
    lastContact: "25/05/2023",
    segment: "Educação",
    revenue: 2500000,
    employees: 35,
    avatar: null,
    source: "Indicação",
    notes: "Interessado em soluções de CRM para educação"
  },
  {
    id: 2,
    name: "Ana Silva",
    company: "TechCorp Solutions",
    email: "ana.silva@techcorp.com.br",
    phone: "(55) 11 98888-8888",
    address: "Av. Paulista, 1000 - Bela Vista, São Paulo - SP",
    status: "Ativo",
    type: "Pessoa",
    role: "Diretora de Marketing",
    lastContact: "10/06/2023",
    segment: "Tecnologia",
    revenue: 5000000,
    employees: 120,
    avatar: null,
    source: "LinkedIn",
    notes: "Procurando soluções para automatizar marketing"
  },
  {
    id: 3,
    name: "Carlos Santos",
    company: "Global Enterprises",
    email: "carlos@globalenterprises.com",
    phone: "(55) 21 97777-7777",
    address: "Av. Rio Branco, 500 - Centro, Rio de Janeiro - RJ",
    status: "Inativo",
    type: "Pessoa",
    role: "Gerente de TI",
    lastContact: "15/05/2023",
    segment: "Consultoria",
    revenue: 12000000,
    employees: 250,
    avatar: null,
    source: "Evento",
    notes: "Participou do webinar sobre segurança digital"
  },
  {
    id: 4,
    name: "Márcia Oliveira",
    company: "Startup Inovadora",
    email: "marcia@startupinovadora.com.br",
    phone: "(55) 31 96666-6666",
    address: "Rua dos Inventores, 300 - Funcionários, Belo Horizonte - MG",
    status: "Ativo",
    type: "Pessoa",
    role: "Fundadora",
    lastContact: "20/12/2023",
    segment: "Tecnologia",
    revenue: 800000,
    employees: 15,
    avatar: null,
    source: "Site",
    notes: "Startup em fase de captação de investimentos"
  },
  {
    id: 5,
    name: "Roberto Menezes",
    company: "Banco Investimentos",
    email: "roberto@bancoinvestimentos.com.br",
    phone: "(55) 41 95555-5555",
    address: "Rua XV de Novembro, 700 - Centro, Curitiba - PR",
    status: "Ativo",
    type: "Pessoa",
    role: "Analista Financeiro",
    lastContact: "30/05/2023",
    segment: "Financeiro",
    revenue: 50000000,
    employees: 500,
    avatar: null,
    source: "Anúncio",
    notes: "Interesse em automação de processos financeiros"
  },
  {
    id: 6,
    name: "Juliana Costa",
    company: "Mega Corporation",
    email: "juliana@megacorp.com.br",
    phone: "(55) 81 94444-4444",
    address: "Av. Boa Viagem, 2000 - Boa Viagem, Recife - PE",
    status: "Em negociação",
    type: "Pessoa",
    role: "Diretora Comercial",
    lastContact: "05/06/2023",
    segment: "Varejo",
    revenue: 30000000,
    employees: 350,
    avatar: null,
    source: "Indicação",
    notes: "Negociando implementação de sistema ERP completo"
  },
  {
    id: 7,
    name: "André Martins",
    company: "Distribuidora Nacional",
    email: "andre@distribuidoranacional.com.br",
    phone: "(55) 48 93333-3333",
    address: "Rua João Pio Duarte Silva, 100 - Córrego Grande, Florianópolis - SC",
    status: "Ativo",
    type: "Pessoa",
    role: "Diretor de Operações",
    lastContact: "25/12/2023",
    segment: "Logística",
    revenue: 8000000,
    employees: 150,
    avatar: null,
    source: "Feira",
    notes: "Necessita de sistema de gestão logística"
  },
  
  // EMPRESAS (TYPE = "Empresa")
  {
    id: 8,
    name: "Indústrias Paulista",
    company: "Indústrias Paulista LTDA",
    email: "contato@industriaspaulista.com.br",
    phone: "(55) 16 3222-2222",
    address: "Av. Portugal, 1500 - Jardim Botânico, Ribeirão Preto - SP",
    status: "Em negociação",
    type: "Empresa",
    cnpj: "11.222.333/0001-44",
    lastContact: "10/01/2024",
    segment: "Indústria",
    revenue: 15000000,
    employees: 280,
    avatar: null,
    website: "www.industriaspaulista.com.br",
    contacts: [
      { name: "Fernanda Lima", role: "Diretora", phone: "(55) 16 92222-2222" },
      { name: "Paulo Mendes", role: "Gerente TI", phone: "(55) 16 92222-3333" }
    ],
    notes: "Interesse em modernização do parque tecnológico"
  },
  {
    id: 9,
    name: "E-commerce Brasil",
    company: "E-commerce Brasil S.A.",
    email: "contato@ecommercebrasil.com.br",
    phone: "(55) 51 3111-1111",
    address: "Rua 24 de Outubro, 800 - Moinhos de Vento, Porto Alegre - RS",
    status: "Inativo",
    type: "Empresa",
    cnpj: "22.333.444/0001-55",
    lastContact: "15/03/2023",
    segment: "Varejo",
    revenue: 3000000,
    employees: 45,
    avatar: null,
    website: "www.ecommercebrasil.com.br",
    contacts: [
      { name: "Gustavo Mendes", role: "CEO", phone: "(55) 51 91111-1111" }
    ],
    notes: "Plataforma de e-commerce em expansão nacional"
  },
  {
    id: 10,
    name: "Tech Solutions SA",
    company: "Tech Solutions SA",
    email: "contato@techsolutions.com.br",
    phone: "(55) 11 3000-0000",
    address: "Av. Brigadeiro Faria Lima, 3000 - Itaim Bibi, São Paulo - SP",
    status: "Ativo",
    type: "Empresa",
    cnpj: "33.444.555/0001-66",
    lastContact: "22/02/2023",
    segment: "Tecnologia",
    revenue: 7000000,
    employees: 130,
    avatar: null,
    website: "www.techsolutions.com.br",
    contacts: [
      { name: "Patricia Alves", role: "CTO", phone: "(55) 11 90000-0000" },
      { name: "Ricardo Torres", role: "CFO", phone: "(55) 11 90000-1111" }
    ],
    notes: "Empresa de soluções tecnológicas para o mercado financeiro"
  },
  {
    id: 11,
    name: "Grupo Industrial ABC",
    company: "Grupo Industrial ABC",
    email: "contato@grupoabc.com.br",
    phone: "(55) 21 3999-8888",
    address: "Av. das Américas, 4000 - Barra da Tijuca, Rio de Janeiro - RJ",
    status: "Ativo",
    type: "Empresa",
    cnpj: "44.555.666/0001-77",
    lastContact: "10/12/2023",
    segment: "Indústria",
    revenue: 25000000,
    employees: 320,
    avatar: null,
    website: "www.grupoabc.com.br",
    contacts: [
      { name: "Leonardo Borges", role: "Presidente", phone: "(55) 21 99999-8888" },
      { name: "Sandra Vieira", role: "Diretora Financeira", phone: "(55) 21 99999-7777" }
    ],
    notes: "Conglomerado industrial com múltiplas unidades no Brasil"
  },
  {
    id: 12,
    name: "Contabilidade Express",
    company: "Contabilidade Express LTDA",
    email: "contato@contabilidadeexpress.com.br",
    phone: "(55) 31 3888-7777",
    address: "Av. Afonso Pena, 3000 - Funcionários, Belo Horizonte - MG",
    status: "Em negociação",
    type: "Empresa",
    cnpj: "55.666.777/0001-88",
    lastContact: "05/01/2024",
    segment: "Serviços",
    revenue: 1200000,
    employees: 25,
    avatar: null,
    website: "www.contabilidadeexpress.com.br",
    contacts: [
      { name: "Carolina Duarte", role: "Sócia", phone: "(55) 31 98888-7777" }
    ],
    notes: "Escritório de contabilidade especializado em startups"
  },
  {
    id: 13,
    name: "TechFuture Inc",
    company: "TechFuture Tecnologia LTDA",
    email: "contato@techfuture.com.br",
    phone: "(55) 41 3777-6666",
    address: "Rua Nunes Machado, 500 - Batel, Curitiba - PR",
    status: "Ativo",
    type: "Empresa",
    cnpj: "66.777.888/0001-99",
    lastContact: "15/01/2024",
    segment: "Tecnologia",
    revenue: 4000000,
    employees: 70,
    avatar: null,
    website: "www.techfuture.com.br",
    contacts: [
      { name: "Marcelo Ribeiro", role: "CEO", phone: "(55) 41 97777-6666" },
      { name: "Carla Bastos", role: "CMO", phone: "(55) 41 97777-5555" }
    ],
    notes: "Especializada em desenvolvimento de IA para negócios"
  },
  {
    id: 14,
    name: "Construtora Horizonte",
    company: "Construtora Horizonte S.A.",
    email: "contato@construtorahorizonte.com.br",
    phone: "(55) 81 3666-5555",
    address: "Rua do Sol, 200 - Centro, Recife - PE",
    status: "Inativo",
    type: "Empresa",
    cnpj: "77.888.999/0001-00",
    lastContact: "20/11/2023",
    segment: "Construção",
    revenue: 18000000,
    employees: 200,
    avatar: null,
    website: "www.construtorahorizonte.com.br",
    contacts: [
      { name: "Daniela Castro", role: "Diretora", phone: "(55) 81 96666-5555" },
      { name: "João Medeiros", role: "Gerente de Projetos", phone: "(55) 81 96666-4444" }
    ],
    notes: "Construtora com foco em empreendimentos sustentáveis"
  },
  {
    id: 15,
    name: "Supermercados União",
    company: "Supermercados União S.A.",
    email: "contato@supermercadosuniao.com.br",
    phone: "(55) 48 3555-4444",
    address: "Av. Beira Mar Norte, 1000 - Centro, Florianópolis - SC",
    status: "Ativo",
    type: "Empresa",
    cnpj: "88.999.000/0001-11",
    lastContact: "08/03/2024",
    segment: "Varejo",
    revenue: 35000000,
    employees: 420,
    avatar: null,
    website: "www.supermercadosuniao.com.br",
    contacts: [
      { name: "Rafael Souza", role: "Diretor", phone: "(55) 48 95555-4444" },
      { name: "Mariana Costa", role: "Gerente Comercial", phone: "(55) 48 95555-3333" }
    ],
    notes: "Rede de supermercados em expansão no Sul do Brasil"
  }
];

// Função para formatar valores monetários
export const formatCurrency = (value) => {
  return new Intl.NumberFormat('pt-BR', { 
    style: 'currency', 
    currency: 'BRL',
    minimumFractionDigits: 2
  }).format(value || 0);
};

// Função para calcular estatísticas dos clientes
export const calculateClientStats = (clients) => {
  const totalClients = clients.length;
  const activeClients = clients.filter(client => client.status === "Ativo").length;
  const pessoas = clients.filter(client => client.type === "Pessoa").length;
  const empresas = clients.filter(client => client.type === "Empresa").length;
  const inNegotiation = clients.filter(client => client.status === "Em negociação").length;
  
  const totalRevenue = clients.reduce((sum, client) => sum + client.revenue, 0);
  
  return {
    totalClients,
    activeClients,
    pessoas,
    empresas,
    inNegotiation,
    totalRevenue
  };
}; 