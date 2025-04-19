import React, { useState, useEffect, useRef } from "react";
import { 
  Card, 
  CardBody, 
  CardHeader, 
  Button, 
  Input, 
  FormGroup, 
  Label, 
  Row, 
  Col, 
  Alert,
  Table,
  Badge,
  InputGroup,
  InputGroupText,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter 
} from "reactstrap";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProposalTab = ({ customer }) => {
  // Dados da empresa do cliente (exemplo)
  const [companyData, setCompanyData] = useState({
    name: customer?.company || "CRM PipeRun",
    address: "Rua Exemplo, 123",
    city: "Porto Alegre",
    state: "RS",
    zipCode: "90000-000",
    contactName: customer?.name || "CEZAR AUGUSTO GEHM FILHO",
    contactPhone: customer?.phone || "(51) 98765-4321",
    contactEmail: customer?.email || "cezar@example.com",
    website: "www.piperun.com.br",
    cnpj: "12.345.678/0001-90",
    industry: "Tecnologia da Informação",
    employees: "50-100",
    annualRevenue: "R$ 5.000.000,00"
  });

  // Estado para armazenar propostas
  const [proposals, setProposals] = useState([
    {
      id: 1,
      title: "Implementação CRM Enterprise",
      description: "Implementação completa de CRM com integrações e automações customizadas",
      value: "18.000,00",
      installments: "12x de R$ 1.500,00",
      status: "Enviada",
      createdAt: "15/04/2025",
      sentAt: "16/04/2025",
      expiresAt: "30/04/2025"
    },
    {
      id: 2,
      title: "CRM Básico + Treinamento",
      description: "Pacote básico de CRM com treinamento para equipe de vendas",
      value: "7.200,00",
      installments: "12x de R$ 600,00",
      status: "Rascunho",
      createdAt: "18/04/2025",
      sentAt: null,
      expiresAt: "02/05/2025"
    }
  ]);

  // Estado para controlar a exibição do formulário de proposta
  const [showForm, setShowForm] = useState(false);
  
  // Estado para armazenar a proposta atual em edição
  const [currentProposal, setCurrentProposal] = useState(null);
  
  // Estado para armazenar o conteúdo personalizado da proposta
  const [customContent, setCustomContent] = useState("");

  // Estado para controlar o modal de visualização de proposta
  const [viewModalOpen, setViewModalOpen] = useState(false);
  
  // Referência para o formulário de proposta
  const proposalFormRef = useRef(null);

  // Função para abrir o formulário com uma nova proposta
  const openNewProposal = () => {
    setCurrentProposal({
      id: Date.now(),
      title: "",
      description: "",
      value: "",
      installments: "",
      status: "Rascunho",
      createdAt: new Date().toLocaleDateString('pt-BR'),
      sentAt: null,
      expiresAt: ""
    });
    setCustomContent(`Prezado(a) ${customer?.name || "Cliente"},

Agradecemos a oportunidade de apresentar nossa proposta comercial. Com base em nossa conversa, entendemos que sua empresa necessita de uma solução de CRM para otimizar os processos de vendas e relacionamento com clientes.

Nossa solução oferece os seguintes benefícios:
- Gestão completa do funil de vendas
- Automação de processos comerciais
- Relatórios e painéis gerenciais
- Integração com ferramentas de marketing

Estamos à disposição para esclarecer quaisquer dúvidas.

Atenciosamente,
Felipe Macedo
InteliTec Sistemas`);
    setShowForm(true);
  };

  // Função para abrir o formulário com uma proposta existente para edição
  const editProposal = (proposal) => {
    setCurrentProposal({...proposal});
    setCustomContent(`Prezado(a) ${customer?.name || "Cliente"},

Agradecemos a oportunidade de apresentar nossa proposta comercial para ${proposal.title}. 

${proposal.description}

Valor total: R$ ${proposal.value}
Forma de pagamento: ${proposal.installments}

Estamos à disposição para esclarecer quaisquer dúvidas.

Atenciosamente,
Felipe Macedo
InteliTec Sistemas`);
    setShowForm(true);
  };

  // Função para visualizar uma proposta
  const viewProposal = (proposal) => {
    setCurrentProposal({...proposal});
    setViewModalOpen(true);
  };

  // Função para fechar o formulário
  const closeForm = () => {
    setShowForm(false);
    setCurrentProposal(null);
  };

  // Função para fechar o modal de visualização
  const closeViewModal = () => {
    setViewModalOpen(false);
  };

  // Função para lidar com a alteração de campos da proposta
  const handleProposalChange = (field, value) => {
    setCurrentProposal({
      ...currentProposal,
      [field]: value
    });
  };

  // Função para salvar a proposta
  const saveProposal = () => {
    // Verificar se o formulário é válido
    if (!proposalFormRef.current.checkValidity()) {
      proposalFormRef.current.reportValidity();
      return;
    }

    // Atualizar a lista de propostas
    const updatedProposals = [...proposals];
    const existingIndex = updatedProposals.findIndex(p => p.id === currentProposal.id);
    
    if (existingIndex >= 0) {
      // Atualizar proposta existente
      updatedProposals[existingIndex] = currentProposal;
    } else {
      // Adicionar nova proposta
      updatedProposals.push(currentProposal);
    }
    
    setProposals(updatedProposals);
    toast.success("Proposta salva com sucesso!");
    closeForm();
  };

  // Função para enviar a proposta
  const sendProposal = () => {
    // Validar se há campos obrigatórios não preenchidos
    if (!proposalFormRef.current.checkValidity()) {
      proposalFormRef.current.reportValidity();
      return;
    }

    // Atualizar o status da proposta para enviada
    const updatedProposal = {
      ...currentProposal,
      status: "Enviada",
      sentAt: new Date().toLocaleDateString('pt-BR')
    };
    
    // Atualizar a lista de propostas
    const updatedProposals = [...proposals];
    const existingIndex = updatedProposals.findIndex(p => p.id === currentProposal.id);
    
    if (existingIndex >= 0) {
      updatedProposals[existingIndex] = updatedProposal;
    } else {
      updatedProposals.push(updatedProposal);
    }
    
    setProposals(updatedProposals);
    toast.success("Proposta enviada com sucesso!");
    closeForm();
  };

  // Função para excluir uma proposta
  const deleteProposal = (id) => {
    if (window.confirm("Tem certeza que deseja excluir esta proposta?")) {
      const updatedProposals = proposals.filter(p => p.id !== id);
      setProposals(updatedProposals);
      toast.success("Proposta excluída com sucesso!");
    }
  };

  // Função para duplicar uma proposta
  const duplicateProposal = (proposal) => {
    const duplicated = {
      ...proposal,
      id: Date.now(),
      title: `${proposal.title} (Cópia)`,
      status: "Rascunho",
      createdAt: new Date().toLocaleDateString('pt-BR'),
      sentAt: null
    };
    
    setProposals([...proposals, duplicated]);
    toast.success("Proposta duplicada com sucesso!");
  };

  // Função para obter a classe CSS do status
  const getStatusBadgeColor = (status) => {
    switch (status) {
      case "Enviada": return "success";
      case "Aceita": return "primary";
      case "Rejeitada": return "danger";
      case "Expirada": return "warning";
      default: return "secondary";
    }
  };

  return (
    <div className="proposal-container">
      {/* Cabeçalho */}
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div className="d-flex align-items-center">
          <i className="mdi mdi-file-chart-outline me-2 h3 mb-0 text-muted"></i>
          <h5 className="mb-0">Propostas Comerciais</h5>
        </div>
        <Button color="success" onClick={openNewProposal}>
          <i className="mdi mdi-plus me-1"></i>
          Nova Proposta
        </Button>
      </div>

      {/* Formulário de Proposta (mostrado diretamente em vez de modal) */}
      {showForm && currentProposal && (
        <Card className="mb-4">
          <CardHeader className="bg-light">
            <h6 className="mb-0">
              {currentProposal?.id && proposals.some(p => p.id === currentProposal.id) 
                ? "Editar Proposta" 
                : "Nova Proposta"}
            </h6>
          </CardHeader>
          <CardBody>
            <form ref={proposalFormRef}>
              <div className="mb-4">
                <h6>Dados da Proposta</h6>
                <Row>
                  <Col md={8}>
                    <FormGroup>
                      <Label for="title">Título da Proposta <span className="text-danger">*</span></Label>
                      <Input
                        id="title"
                        type="text"
                        value={currentProposal?.title || ""}
                        onChange={(e) => handleProposalChange("title", e.target.value)}
                        required
                      />
                    </FormGroup>
                  </Col>
                  <Col md={4}>
                    <FormGroup>
                      <Label for="status">Status</Label>
                      <Input
                        id="title"
                        type="select"
                        value={currentProposal?.status || "Rascunho"}
                        onChange={(e) => handleProposalChange("status", e.target.value)}
                      >
                        <option>Rascunho</option>
                        <option>Enviada</option>
                        <option>Aceita</option>
                        <option>Rejeitada</option>
                        <option>Expirada</option>
                      </Input>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={12}>
                    <FormGroup>
                      <Label for="description">Descrição <span className="text-danger">*</span></Label>
                      <Input
                        id="description"
                        type="textarea"
                        rows={2}
                        value={currentProposal?.description || ""}
                        onChange={(e) => handleProposalChange("description", e.target.value)}
                        required
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="value">Valor (R$) <span className="text-danger">*</span></Label>
                      <InputGroup>
                        <InputGroupText>R$</InputGroupText>
                        <Input
                          id="value"
                          type="text"
                          value={currentProposal?.value || ""}
                          onChange={(e) => handleProposalChange("value", e.target.value)}
                          placeholder="0,00"
                          required
                        />
                      </InputGroup>
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="installments">Condição de Pagamento</Label>
                      <Input
                        id="installments"
                        type="text"
                        value={currentProposal?.installments || ""}
                        onChange={(e) => handleProposalChange("installments", e.target.value)}
                        placeholder="Ex: 12x de R$ 1.000,00"
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="createdAt">Data de Criação</Label>
                      <Input
                        id="createdAt"
                        type="text"
                        value={currentProposal?.createdAt || ""}
                        disabled
                      />
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="expiresAt">Válida até <span className="text-danger">*</span></Label>
                      <Input
                        id="expiresAt"
                        type="date"
                        value={currentProposal?.expiresAt ? currentProposal.expiresAt.split('/').reverse().join('-') : ''}
                        onChange={(e) => {
                          const date = e.target.value 
                            ? new Date(e.target.value).toLocaleDateString('pt-BR') 
                            : '';
                          handleProposalChange("expiresAt", date);
                        }}
                        required
                      />
                    </FormGroup>
                  </Col>
                </Row>
              </div>

              <div className="mb-4">
                <h6>Dados da Empresa</h6>
                <Table bordered size="sm">
                  <tbody>
                    <tr>
                      <th style={{width: "30%"}}>Empresa</th>
                      <td>{companyData.name}</td>
                    </tr>
                    <tr>
                      <th>CNPJ</th>
                      <td>{companyData.cnpj}</td>
                    </tr>
                    <tr>
                      <th>Endereço</th>
                      <td>{companyData.address}, {companyData.city} - {companyData.state}, CEP {companyData.zipCode}</td>
                    </tr>
                    <tr>
                      <th>Contato</th>
                      <td>{companyData.contactName}</td>
                    </tr>
                    <tr>
                      <th>Telefone</th>
                      <td>{companyData.contactPhone}</td>
                    </tr>
                    <tr>
                      <th>Email</th>
                      <td>{companyData.contactEmail}</td>
                    </tr>
                  </tbody>
                </Table>
              </div>

              <div className="mb-4">
                <h6>Conteúdo Personalizado</h6>
                <FormGroup>
                  <Input
                    type="textarea"
                    rows={10}
                    value={customContent}
                    onChange={(e) => setCustomContent(e.target.value)}
                  />
                </FormGroup>
              </div>
            </form>
            <div className="d-flex justify-content-end gap-2">
              <Button color="secondary" onClick={closeForm}>Cancelar</Button>
              <Button color="primary" onClick={saveProposal}>Salvar</Button>
              <Button color="success" onClick={sendProposal}>
                <i className="mdi mdi-send me-1"></i>
                Enviar
              </Button>
            </div>
          </CardBody>
        </Card>
      )}

      {/* Lista de Propostas */}
      {!showForm && (
        <Card className="mb-4">
          <CardBody>
            {proposals.length === 0 ? (
              <Alert color="info" className="text-center">
                Nenhuma proposta encontrada. Clique em "Nova Proposta" para criar uma.
              </Alert>
            ) : (
              <div className="table-responsive">
                <Table className="table-hover">
                  <thead>
                    <tr>
                      <th>Título</th>
                      <th>Valor</th>
                      <th>Status</th>
                      <th>Criada em</th>
                      <th>Enviada em</th>
                      <th>Expira em</th>
                      <th>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {proposals.map(proposal => (
                      <tr key={proposal.id}>
                        <td className="align-middle">
                          <div>
                            <strong>{proposal.title}</strong>
                            <div className="small text-muted">{proposal.description}</div>
                          </div>
                        </td>
                        <td className="align-middle">
                          <div>
                            <strong>R$ {proposal.value}</strong>
                            <div className="small text-muted">{proposal.installments}</div>
                          </div>
                        </td>
                        <td className="align-middle">
                          <Badge color={getStatusBadgeColor(proposal.status)}>
                            {proposal.status}
                          </Badge>
                        </td>
                        <td className="align-middle">{proposal.createdAt}</td>
                        <td className="align-middle">{proposal.sentAt || "-"}</td>
                        <td className="align-middle">{proposal.expiresAt || "-"}</td>
                        <td className="align-middle">
                          <div className="d-flex">
                            <Button color="link" className="p-0 me-2" title="Visualizar" onClick={() => viewProposal(proposal)}>
                              <i className="mdi mdi-eye text-primary"></i>
                            </Button>
                            <Button color="link" className="p-0 me-2" title="Editar" onClick={() => editProposal(proposal)}>
                              <i className="mdi mdi-pencil text-success"></i>
                            </Button>
                            <Button color="link" className="p-0 me-2" title="Duplicar" onClick={() => duplicateProposal(proposal)}>
                              <i className="mdi mdi-content-copy text-info"></i>
                            </Button>
                            <Button color="link" className="p-0" title="Excluir" onClick={() => deleteProposal(proposal.id)}>
                              <i className="mdi mdi-delete text-danger"></i>
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            )}
          </CardBody>
        </Card>
      )}

      {/* Modal para Visualizar Proposta */}
      <Modal isOpen={viewModalOpen} toggle={closeViewModal} size="lg">
        <ModalHeader toggle={closeViewModal}>
          Visualizar Proposta
        </ModalHeader>
        <ModalBody>
          {currentProposal && (
            <div className="proposal-preview">
              <div className="text-center mb-4">
                <h4>Proposta Comercial #{currentProposal.id}</h4>
                <h5>{currentProposal.title}</h5>
              </div>

              <div className="d-flex justify-content-between mb-4">
                <div>
                  <h6>De:</h6>
                  <p className="mb-0"><strong>InteliTec Sistemas Ltda</strong></p>
                  <p className="mb-0">CNPJ: 08.692.236/0001-48</p>
                  <p className="mb-0">Av. Tecnologia, 456</p>
                  <p className="mb-0">Porto Alegre - RS, 91000-000</p>
                  <p className="mb-0">(51) 3333-4444</p>
                  <p className="mb-0">contato@intelitec.com.br</p>
                </div>
                <div>
                  <h6>Para:</h6>
                  <p className="mb-0"><strong>{companyData.name}</strong></p>
                  <p className="mb-0">CNPJ: {companyData.cnpj}</p>
                  <p className="mb-0">{companyData.address}</p>
                  <p className="mb-0">{companyData.city} - {companyData.state}, {companyData.zipCode}</p>
                  <p className="mb-0">Contato: {companyData.contactName}</p>
                  <p className="mb-0">{companyData.contactPhone}</p>
                </div>
              </div>

              <div className="mb-4">
                <h6>Detalhes da Proposta:</h6>
                <p className="mb-0"><strong>Descrição:</strong> {currentProposal.description}</p>
                <p className="mb-0"><strong>Valor:</strong> R$ {currentProposal.value}</p>
                <p className="mb-0"><strong>Condições de Pagamento:</strong> {currentProposal.installments}</p>
                <p className="mb-0"><strong>Data de Criação:</strong> {currentProposal.createdAt}</p>
                <p className="mb-0"><strong>Válida até:</strong> {currentProposal.expiresAt}</p>
                <p className="mb-0">
                  <strong>Status:</strong> 
                  <Badge 
                    color={getStatusBadgeColor(currentProposal.status)} 
                    className="ms-2"
                  >
                    {currentProposal.status}
                  </Badge>
                </p>
              </div>

              <div className="mb-4">
                <div className="proposal-content border p-3" style={{whiteSpace: "pre-line"}}>
                  {customContent}
                </div>
              </div>
            </div>
          )}
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={closeViewModal}>Fechar</Button>
          <Button color="primary" onClick={() => {
            closeViewModal();
            editProposal(currentProposal);
          }}>
            <i className="mdi mdi-pencil me-1"></i>
            Editar
          </Button>
          <Button color="success">
            <i className="mdi mdi-file-pdf-box me-1"></i>
            Gerar PDF
          </Button>
        </ModalFooter>
      </Modal>

      {/* Componente de Toast para notificações */}
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default ProposalTab; 