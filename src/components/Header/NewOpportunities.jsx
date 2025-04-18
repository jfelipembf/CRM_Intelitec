import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { 
  Modal, 
  ModalHeader, 
  ModalBody, 
  ModalFooter, 
  Button, 
  FormGroup, 
  Label, 
  Input, 
  Row, 
  Col,
  InputGroup,
  Spinner
} from "reactstrap";
import { toast } from "react-toastify";
import { formatCNPJ, validateCNPJ, fetchCompanyByCNPJ, fetchAddressByCEP } from "../../utils/dataFetcher";

const NewOpportunities = ({ isOpen, toggle }) => {
  // Estado para armazenar os dados do formulário
  const [formData, setFormData] = useState({
    title: "",
    funnel: "Funil Vendas",
    owner: "Felipe Macedo",
    company: "",
    companyNickname: "",
    cnpj: "",
    contactPerson: "",
    phone: "",
    email: "",
    source: "",
    stage: "Cadastro" // Definindo a primeira etapa como padrão
  });

  // Estado para controlar o carregamento durante a busca
  const [loading, setLoading] = useState({
    cnpj: false,
    cep: false
  });

  // Estado para controlar o timeout de digitação
  const [cnpjTimeout, setCnpjTimeout] = useState(null);

  // Função para atualizar o estado do formulário
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'cnpj') {
      // Formatar o CNPJ enquanto o usuário digita
      const formattedCNPJ = formatCNPJ(value);
      
      setFormData({
        ...formData,
        [name]: formattedCNPJ
      });

      // Limpar qualquer timeout anterior
      if (cnpjTimeout) clearTimeout(cnpjTimeout);

      // Definir um novo timeout para buscar dados quando o usuário parar de digitar
      if (formattedCNPJ.length === 18) { // CNPJ completo tem 18 caracteres com formatação
        const newTimeout = setTimeout(() => {
          if (validateCNPJ(formattedCNPJ)) {
            handleCnpjSearch(formattedCNPJ);
          }
        }, 1000); // Aguardar 1 segundo após a última digitação
        
        setCnpjTimeout(newTimeout);
      }
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  // Função para buscar informações da empresa pelo CNPJ
  const handleCnpjSearch = async (cnpjValue = formData.cnpj) => {
    // Verifica se o CNPJ é válido
    if (!validateCNPJ(cnpjValue)) {
      toast.error("CNPJ inválido. Verifique o formato.", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    // Evita múltiplas requisições para o mesmo CNPJ
    if (loading.cnpj) return;

    try {
      setLoading(prev => ({ ...prev, cnpj: true }));
      
      // Busca informações da empresa
      const companyData = await fetchCompanyByCNPJ(cnpjValue);
      
      // Atualiza o formulário com os dados obtidos
      setFormData(prev => ({
        ...prev,
        company: companyData.nome,
        companyNickname: companyData.nomeFantasia,
        phone: companyData.telefone || prev.phone,
        email: companyData.email || prev.email,
        title: prev.title || `Proposta para ${companyData.nomeFantasia || companyData.nome}`
      }));
      
      // Notificação mais sutil
      toast.success(`Empresa encontrada: ${companyData.nome}`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false
      });
    } catch (error) {
      console.error("Erro ao buscar CNPJ:", error);
      
      // Mensagem mais amigável para CNPJ não encontrado
      if (error.message.includes('não encontrado')) {
        toast.info("Empresa não encontrada na base de dados pública. Você pode inserir os dados manualmente.", {
          position: "top-right",
          autoClose: 5000,
        });
        
        // Limpar os campos de empresa mas manter o CNPJ
        setFormData(prev => ({
          ...prev,
          company: "",
          companyNickname: ""
        }));
      } else {
        // Para outros erros
        toast.error("Ocorreu um erro ao consultar o CNPJ. Por favor, tente novamente ou insira os dados manualmente.", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    } finally {
      setLoading(prev => ({ ...prev, cnpj: false }));
    }
  };

  // Limpar timeout quando o componente é desmontado
  useEffect(() => {
    return () => {
      if (cnpjTimeout) {
        clearTimeout(cnpjTimeout);
      }
    };
  }, [cnpjTimeout]);

  // Função para salvar a oportunidade
  const handleSave = () => {
    // Verificar se os campos obrigatórios estão preenchidos
    if (!formData.title) {
      toast.error("Por favor, preencha o título da oportunidade", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    // Aqui você implementaria a lógica para salvar os dados
    console.log("Dados salvos:", formData);
    
    // Exibir mensagem de sucesso
    toast.success("Oportunidade adicionada com sucesso!", {
      position: "top-right",
      autoClose: 3000,
    });
    
    // Fechar o modal
    toggle();
  };

  // Função para salvar e ir para a página da oportunidade
  const handleSaveAndGo = () => {
    handleSave();
    // Aqui você implementaria a navegação para a página da oportunidade
    console.log("Navegando para a página da oportunidade");
  };

  // Definição das etapas do funil
  const funnelStages = [
    { id: 0, name: "Cadastro", active: true },
    { id: 1, name: "Contato", active: false },
    { id: 2, name: "Reunião", active: false },
    { id: 3, name: "Proposta", active: false },
    { id: 4, name: "Follow-Up", active: false },
    { id: 5, name: "Fechamento", active: false }
  ];

  return (
    <Modal isOpen={isOpen} toggle={toggle} size="lg" centered className="opportunity-modal">
      <ModalHeader toggle={toggle} className="bg-light">
        <h4 className="mb-0">Adicionar oportunidades</h4>
        <div className="small text-muted">Funil » Funil Vendas</div>
      </ModalHeader>
      <ModalBody>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label className="form-label">
                <span className="text-danger">*</span> Oportunidade » Funil
              </Label>
              <Input
                type="select"
                name="funnel"
                value={formData.funnel}
                onChange={handleInputChange}
                className="form-select"
              >
                <option value="Funil Vendas">Funil Vendas</option>
              </Input>
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label className="form-label">
                <span className="text-danger">*</span> Oportunidade » Dono
              </Label>
              <Input
                type="select"
                name="owner"
                value={formData.owner}
                onChange={handleInputChange}
                className="form-select"
              >
                <option value="Felipe Macedo">Felipe Macedo</option>
              </Input>
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <FormGroup>
              <Label className="form-label">
                Empresa » CNPJ
              </Label>
              <InputGroup>
                <Input
                  type="text"
                  name="cnpj"
                  value={formData.cnpj}
                  onChange={handleInputChange}
                  placeholder="CNPJ"
                  maxLength={18} // XX.XXX.XXX/XXXX-XX (18 caracteres com formatação)
                />
                <Button 
                  color="primary" 
                  style={{ borderRadius: 0 }} 
                  onClick={() => handleCnpjSearch()}
                  disabled={loading.cnpj || !formData.cnpj}
                >
                  {loading.cnpj ? (
                    <Spinner size="sm" />
                  ) : (
                    <i className="mdi mdi-magnify"></i>
                  )}
                </Button>
              </InputGroup>
              <small className="text-muted d-flex align-items-center mt-1">
                <i className="mdi mdi-information-outline me-1"></i>
                Digite o CNPJ completo para buscar automaticamente
              </small>
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label className="form-label">
                Oportunidade » Pessoa de contato
              </Label>
              <Input
                type="select"
                name="contactPerson"
                value={formData.contactPerson}
                onChange={handleInputChange}
                className="form-select"
              >
                <option value="">Busque uma pessoa, ou digite um novo nome</option>
              </Input>
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <FormGroup>
              <Label className="form-label">
                Oportunidade » Empresa (Razão Social)
              </Label>
              <Input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                placeholder="Razão Social da empresa"
                className="form-control"
              />
              {loading.cnpj && (
                <small className="text-muted d-flex align-items-center mt-1">
                  <Spinner size="sm" className="me-1" /> 
                  Carregando dados da empresa...
                </small>
              )}
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label className="form-label">
                Empresa » Nome Fantasia
              </Label>
              <Input
                type="text"
                name="companyNickname"
                value={formData.companyNickname}
                onChange={handleInputChange}
                placeholder="Nome Fantasia (se disponível)"
                className="form-control"
              />
              {formData.company && !formData.companyNickname && (
                <small className="text-muted d-flex align-items-center mt-1">
                  <i className="mdi mdi-information-outline me-1"></i>
                  Nome fantasia não disponível
                </small>
              )}
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <FormGroup>
              <Label className="form-label">
                Pessoa » Telefone
              </Label>
              <Input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Telefone"
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label className="form-label">
                Pessoa » E-mail
              </Label>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="E-mail"
              />
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <FormGroup>
              <Label className="form-label">
                Oportunidade » Origem da negociação
              </Label>
              <Input
                type="select"
                name="source"
                value={formData.source}
                onChange={handleInputChange}
                className="form-select"
              >
                <option value="">Origem da negociação</option>
                <option value="Indicação">Indicação</option>
                <option value="Website">Website</option>
                <option value="Redes Sociais">Redes Sociais</option>
                <option value="Evento">Evento</option>
              </Input>
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label className="form-label">
                <span className="text-danger">*</span> Oportunidade » Etapa do funil: Cadastro
              </Label>
              <div className="bg-light p-2 rounded-0">
                {/* Barra de progresso do funil com a primeira etapa ativa */}
                <div className="d-flex justify-content-between" style={{ height: "40px" }}>
                  {funnelStages.map((stage, index) => (
                    <div 
                      key={stage.id}
                      className={`rounded-0 ${index > 0 ? 'mx-1' : ''}`} 
                      style={{ 
                        width: `${100 / funnelStages.length}%`, 
                        height: "100%",
                        backgroundColor: stage.id === 0 ? '#28a745' : '#6c757d',
                        opacity: stage.id === 0 ? 1 : 0.5,
                        cursor: stage.id === 0 ? 'pointer' : 'not-allowed',
                        position: 'relative'
                      }}
                      title={stage.name}
                    >
                      {/* Número da etapa no centro do bloco */}
                      <div style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: '14px'
                      }}>
                        {stage.id + 1}
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Nomes das etapas abaixo da barra */}
                <div className="d-flex justify-content-between mt-1">
                  {funnelStages.map((stage, index) => (
                    <div 
                      key={`name-${stage.id}`}
                      className="text-center" 
                      style={{ 
                        width: `${100 / funnelStages.length}%`,
                        fontSize: '10px',
                        color: stage.id === 0 ? '#28a745' : '#6c757d',
                        fontWeight: stage.id === 0 ? 'bold' : 'normal'
                      }}
                    >
                      {stage.name}
                    </div>
                  ))}
                </div>
              </div>
            </FormGroup>
          </Col>
        </Row>
      </ModalBody>
      <ModalFooter className="d-flex">
        <div className="w-100 d-flex justify-content-between">
          <Button color="success" size="lg" block className="w-50 me-2 rounded-0" onClick={handleSave}>
            <i className="mdi mdi-content-save me-1"></i> Salvar
          </Button>
          <Button color="success" size="lg" block className="w-50 rounded-0" onClick={handleSaveAndGo}>
            <i className="mdi mdi-arrow-right-circle me-1"></i> Salvar e ir para oportunidade
          </Button>
        </div>
      </ModalFooter>
    </Modal>
  );
};

NewOpportunities.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
};

export default NewOpportunities; 