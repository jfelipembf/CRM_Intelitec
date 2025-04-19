import React, { useState, useEffect } from "react";
import { 
  Container, 
  Row, 
  Col, 
  Card, 
  CardBody, 
  Form, 
  FormGroup, 
  Label, 
  Input, 
  Button, 
  Alert,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane
} from "reactstrap";
import { Link, useParams, useNavigate } from "react-router-dom";
import { withTranslation } from "react-i18next";
import PropTypes from "prop-types";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { toast } from "react-toastify";
import classnames from "classnames";

const ClientForm = (props) => {
  const { t } = props;
  const { type } = useParams();
  const navigate = useNavigate();
  
  // Estados para os campos do formulário
  const [formData, setFormData] = useState({
    // Campos comuns
    name: "",
    email: "",
    phone: "",
    status: "Ativo",
    
    // Campos específicos de pessoa
    role: "",
    company: "",
    source: "",
    
    // Campos específicos de empresa
    cnpj: "",
    website: "",
    employees: "",
    revenue: "",
    contacts: [{ name: "", role: "", phone: "", email: "", cpf: "" }],
    
    // Campos de endereço
    address: "",
    city: "",
    state: "",
    zipCode: "",
    
    // Campos adicionais
    segment: "",
    notes: ""
  });
  
  // Estado para abas
  const [activeTab, setActiveTab] = useState("1");
  
  // Estado para alerta de erro
  const [error, setError] = useState("");
  
  // Normalizando o tipo baseado no parâmetro da URL
  const clientType = type === "pessoas" ? "pessoa" : type === "empresas" ? "empresa" : "cliente";
  
  // Manipulador para alteração de campos
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  // Manipulador para alteração de contatos (para empresas)
  const handleContactChange = (index, field, value) => {
    const updatedContacts = [...formData.contacts];
    updatedContacts[index] = { ...updatedContacts[index], [field]: value };
    setFormData({ ...formData, contacts: updatedContacts });
  };
  
  // Adicionar novo contato (para empresas)
  const addContact = () => {
    setFormData({
      ...formData,
      contacts: [...formData.contacts, { name: "", role: "", phone: "", email: "", cpf: "" }]
    });
  };
  
  // Remover contato (para empresas)
  const removeContact = (index) => {
    const updatedContacts = [...formData.contacts];
    updatedContacts.splice(index, 1);
    setFormData({ ...formData, contacts: updatedContacts });
  };
  
  // Submeter o formulário
  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    
    // Validação básica
    if (!formData.name) {
      setError("Por favor, informe o nome.");
      return;
    }
    
    // Aqui você adicionaria a lógica para salvar os dados
    // Por exemplo, enviando para uma API ou armazenando localmente
    
    // Simular sucesso
    toast.success(`${clientType === "pessoa" ? "Pessoa" : "Empresa"} cadastrada com sucesso!`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    
    // Redirecionar de volta para a lista
    navigate("/clientes");
  };
  
  // Alternar entre abas
  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };
  
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          
          <Row>
            <Col lg={12}>
              <Card>
                <CardBody>
                  <h4 className="card-title mb-4">
                    {clientType === "pessoa" ? "Cadastro de Pessoa" : clientType === "empresa" ? "Cadastro de Empresa" : "Cadastro de Cliente"}
                  </h4>
                  
                  {error && (
                    <Alert color="danger" className="mb-4">
                      {error}
                    </Alert>
                  )}
                  
                  <Form onSubmit={handleSubmit}>
                    <Nav tabs className="nav-tabs-custom">
                      <NavItem>
                        <NavLink
                          className={classnames({ active: activeTab === "1" })}
                          onClick={() => toggle("1")}
                        >
                          <i className="bx bx-user-circle font-size-16 me-2 align-middle"></i>
                          Informações Básicas
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={classnames({ active: activeTab === "2" })}
                          onClick={() => toggle("2")}
                        >
                          <i className="bx bx-map-pin font-size-16 me-2 align-middle"></i>
                          Endereço
                        </NavLink>
                      </NavItem>
                      {clientType === "empresa" && (
                        <NavItem>
                          <NavLink
                            className={classnames({ active: activeTab === "3" })}
                            onClick={() => toggle("3")}
                          >
                            <i className="bx bx-group font-size-16 me-2 align-middle"></i>
                            Contatos
                          </NavLink>
                        </NavItem>
                      )}
                      <NavItem>
                        <NavLink
                          className={classnames({ active: activeTab === "4" })}
                          onClick={() => toggle("4")}
                        >
                          <i className="bx bx-note font-size-16 me-2 align-middle"></i>
                          Anotações
                        </NavLink>
                      </NavItem>
                    </Nav>
                    
                    <TabContent activeTab={activeTab} className="mt-4">
                      {/* Aba de Informações Básicas */}
                      <TabPane tabId="1">
                        <Row>
                          <Col md={6}>
                            <FormGroup>
                              <Label for="name">Nome {clientType === "empresa" ? "da Empresa" : ""} *</Label>
                              <Input
                                type="text"
                                name="name"
                                id="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder={`Informe o nome ${clientType === "empresa" ? "da empresa" : "completo"}`}
                                required
                              />
                            </FormGroup>
                          </Col>
                          <Col md={6}>
                            <FormGroup>
                              <Label for="email">Email</Label>
                              <Input
                                type="email"
                                name="email"
                                id="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Informe o email"
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                        
                        <Row>
                          <Col md={6}>
                            <FormGroup>
                              <Label for="phone">Telefone</Label>
                              <Input
                                type="text"
                                name="phone"
                                id="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="Informe o telefone"
                              />
                            </FormGroup>
                          </Col>
                          <Col md={6}>
                            <FormGroup>
                              <Label for="status">Status</Label>
                              <Input
                                id="title"
                                type="select"
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                              >
                                <option value="Ativo">Ativo</option>
                                <option value="Inativo">Inativo</option>
                                <option value="Em negociação">Em negociação</option>
                              </Input>
                            </FormGroup>
                          </Col>
                        </Row>
                        
                        {clientType === "pessoa" && (
                          <Row>
                            <Col md={6}>
                              <FormGroup>
                                <Label for="role">Cargo</Label>
                                <Input
                                  type="text"
                                  name="role"
                                  id="role"
                                  value={formData.role}
                                  onChange={handleChange}
                                  placeholder="Informe o cargo"
                                />
                              </FormGroup>
                            </Col>
                            <Col md={6}>
                              <FormGroup>
                                <Label for="company">Empresa</Label>
                                <Input
                                  type="text"
                                  name="company"
                                  id="company"
                                  value={formData.company}
                                  onChange={handleChange}
                                  placeholder="Informe a empresa"
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                        )}
                        
                        {clientType === "pessoa" && (
                          <Row>
                            <Col md={6}>
                              <FormGroup>
                                <Label for="source">Origem</Label>
                                <Input
                                  type="select"
                                  name="source"
                                  id="source"
                                  value={formData.source}
                                  onChange={handleChange}
                                >
                                  <option value="">Selecione a origem</option>
                                  <option value="Site">Site</option>
                                  <option value="Indicação">Indicação</option>
                                  <option value="LinkedIn">LinkedIn</option>
                                  <option value="Evento">Evento</option>
                                  <option value="Feira">Feira</option>
                                  <option value="Anúncio">Anúncio</option>
                                </Input>
                              </FormGroup>
                            </Col>
                            <Col md={6}>
                              <FormGroup>
                                <Label for="segment">Segmento</Label>
                                <Input
                                  type="select"
                                  name="segment"
                                  id="segment"
                                  value={formData.segment}
                                  onChange={handleChange}
                                >
                                  <option value="">Selecione o segmento</option>
                                  <option value="Tecnologia">Tecnologia</option>
                                  <option value="Educação">Educação</option>
                                  <option value="Saúde">Saúde</option>
                                  <option value="Financeiro">Financeiro</option>
                                  <option value="Indústria">Indústria</option>
                                  <option value="Varejo">Varejo</option>
                                  <option value="Serviços">Serviços</option>
                                  <option value="Consultoria">Consultoria</option>
                                  <option value="Construção">Construção</option>
                                  <option value="Logística">Logística</option>
                                </Input>
                              </FormGroup>
                            </Col>
                          </Row>
                        )}
                        
                        {clientType === "empresa" && (
                          <Row>
                            <Col md={6}>
                              <FormGroup>
                                <Label for="cnpj">CNPJ</Label>
                                <Input
                                  type="text"
                                  name="cnpj"
                                  id="cnpj"
                                  value={formData.cnpj}
                                  onChange={handleChange}
                                  placeholder="Informe o CNPJ"
                                />
                              </FormGroup>
                            </Col>
                            <Col md={6}>
                              <FormGroup>
                                <Label for="website">Website</Label>
                                <Input
                                  type="text"
                                  name="website"
                                  id="website"
                                  value={formData.website}
                                  onChange={handleChange}
                                  placeholder="Informe o website"
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                        )}
                        
                        {clientType === "empresa" && (
                          <Row>
                            <Col md={6}>
                              <FormGroup>
                                <Label for="employees">Número de Funcionários</Label>
                                <Input
                                  type="number"
                                  name="employees"
                                  id="employees"
                                  value={formData.employees}
                                  onChange={handleChange}
                                  placeholder="Informe o número de funcionários"
                                />
                              </FormGroup>
                            </Col>
                            <Col md={6}>
                              <FormGroup>
                                <Label for="revenue">Faturamento Anual (R$)</Label>
                                <Input
                                  type="text"
                                  name="revenue"
                                  id="revenue"
                                  value={formData.revenue}
                                  onChange={handleChange}
                                  placeholder="Informe o faturamento anual"
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                        )}
                        
                        {clientType === "empresa" && (
                          <Row>
                            <Col md={6}>
                              <FormGroup>
                                <Label for="segment">Segmento</Label>
                                <Input
                                  type="select"
                                  name="segment"
                                  id="segment"
                                  value={formData.segment}
                                  onChange={handleChange}
                                >
                                  <option value="">Selecione o segmento</option>
                                  <option value="Tecnologia">Tecnologia</option>
                                  <option value="Educação">Educação</option>
                                  <option value="Saúde">Saúde</option>
                                  <option value="Financeiro">Financeiro</option>
                                  <option value="Indústria">Indústria</option>
                                  <option value="Varejo">Varejo</option>
                                  <option value="Serviços">Serviços</option>
                                  <option value="Consultoria">Consultoria</option>
                                  <option value="Construção">Construção</option>
                                  <option value="Logística">Logística</option>
                                </Input>
                              </FormGroup>
                            </Col>
                            <Col md={6}>
                              <FormGroup>
                                <Label for="source">Origem</Label>
                                <Input
                                  type="select"
                                  name="source"
                                  id="source"
                                  value={formData.source}
                                  onChange={handleChange}
                                >
                                  <option value="">Selecione a origem</option>
                                  <option value="Site">Site</option>
                                  <option value="Indicação">Indicação</option>
                                  <option value="LinkedIn">LinkedIn</option>
                                  <option value="Evento">Evento</option>
                                  <option value="Feira">Feira</option>
                                  <option value="Anúncio">Anúncio</option>
                                </Input>
                              </FormGroup>
                            </Col>
                          </Row>
                        )}
                      </TabPane>
                      
                      {/* Aba de Endereço */}
                      <TabPane tabId="2">
                        <Row>
                          <Col md={12}>
                            <FormGroup>
                              <Label for="address">Endereço</Label>
                              <Input
                                type="text"
                                name="address"
                                id="address"
                                value={formData.address}
                                onChange={handleChange}
                                placeholder="Rua, número, complemento"
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                        
                        <Row>
                          <Col md={4}>
                            <FormGroup>
                              <Label for="city">Cidade</Label>
                              <Input
                                type="text"
                                name="city"
                                id="city"
                                value={formData.city}
                                onChange={handleChange}
                                placeholder="Informe a cidade"
                              />
                            </FormGroup>
                          </Col>
                          <Col md={4}>
                            <FormGroup>
                              <Label for="state">Estado</Label>
                              <Input
                                  type="select"
                                  name="state"
                                  id="state"
                                  value={formData.state}
                                  onChange={handleChange}
                                >
                                <option value="">Selecione o estado</option>
                                <option value="AC">Acre</option>
                                <option value="AL">Alagoas</option>
                                <option value="AP">Amapá</option>
                                <option value="AM">Amazonas</option>
                                <option value="BA">Bahia</option>
                                <option value="CE">Ceará</option>
                                <option value="DF">Distrito Federal</option>
                                <option value="ES">Espírito Santo</option>
                                <option value="GO">Goiás</option>
                                <option value="MA">Maranhão</option>
                                <option value="MT">Mato Grosso</option>
                                <option value="MS">Mato Grosso do Sul</option>
                                <option value="MG">Minas Gerais</option>
                                <option value="PA">Pará</option>
                                <option value="PB">Paraíba</option>
                                <option value="PR">Paraná</option>
                                <option value="PE">Pernambuco</option>
                                <option value="PI">Piauí</option>
                                <option value="RJ">Rio de Janeiro</option>
                                <option value="RN">Rio Grande do Norte</option>
                                <option value="RS">Rio Grande do Sul</option>
                                <option value="RO">Rondônia</option>
                                <option value="RR">Roraima</option>
                                <option value="SC">Santa Catarina</option>
                                <option value="SP">São Paulo</option>
                                <option value="SE">Sergipe</option>
                                <option value="TO">Tocantins</option>
                              </Input>
                            </FormGroup>
                          </Col>
                          <Col md={4}>
                            <FormGroup>
                              <Label for="zipCode">CEP</Label>
                              <Input
                                type="text"
                                name="zipCode"
                                id="zipCode"
                                value={formData.zipCode}
                                onChange={handleChange}
                                placeholder="Informe o CEP"
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                      </TabPane>
                      
                      {/* Aba de Contatos (apenas para empresas) */}
                      {clientType === "empresa" && (
                        <TabPane tabId="3">
                          <div className="mb-3">
                            <h5 className="mb-3">Contatos da Empresa</h5>
                            <p className="text-muted">Adicione os contatos das pessoas que trabalham nesta empresa</p>
                          </div>
                          
                          {formData.contacts.map((contact, index) => (
                            <div key={index} className="border rounded p-3 mb-3">
                              <div className="d-flex justify-content-between align-items-center mb-3">
                                <h5 className="mb-0">Contato #{index + 1}</h5>
                                {formData.contacts.length > 1 && (
                                  <Button
                                    color="danger"
                                    size="sm"
                                    onClick={() => removeContact(index)}
                                  >
                                    <i className="bx bx-trash"></i> Remover
                                  </Button>
                                )}
                              </div>
                              
                              <Row>
                                <Col md={6}>
                                  <FormGroup>
                                    <Label>Nome</Label>
                                    <Input
                                      type="text"
                                      value={contact.name}
                                      onChange={(e) => handleContactChange(index, "name", e.target.value)}
                                      placeholder="Nome do contato"
                                    />
                                  </FormGroup>
                                </Col>
                                <Col md={6}>
                                  <FormGroup>
                                    <Label>CPF</Label>
                                    <Input
                                      type="text"
                                      value={contact.cpf}
                                      onChange={(e) => handleContactChange(index, "cpf", e.target.value)}
                                      placeholder="CPF do contato"
                                    />
                                  </FormGroup>
                                </Col>
                              </Row>
                              
                              <Row>
                                <Col md={6}>
                                  <FormGroup>
                                    <Label>Cargo</Label>
                                    <Input
                                      type="text"
                                      value={contact.role}
                                      onChange={(e) => handleContactChange(index, "role", e.target.value)}
                                      placeholder="Cargo do contato"
                                    />
                                  </FormGroup>
                                </Col>
                                <Col md={6}>
                                  <FormGroup>
                                    <Label>Email</Label>
                                    <Input
                                      type="email"
                                      value={contact.email}
                                      onChange={(e) => handleContactChange(index, "email", e.target.value)}
                                      placeholder="Email do contato"
                                    />
                                  </FormGroup>
                                </Col>
                              </Row>
                              
                              <Row>
                                <Col md={6}>
                                  <FormGroup>
                                    <Label>Telefone</Label>
                                    <Input
                                      type="text"
                                      value={contact.phone}
                                      onChange={(e) => handleContactChange(index, "phone", e.target.value)}
                                      placeholder="Telefone do contato"
                                    />
                                  </FormGroup>
                                </Col>
                              </Row>
                            </div>
                          ))}
                          
                          <Button color="primary" onClick={addContact}>
                            <i className="bx bx-plus me-1"></i> Adicionar Contato
                          </Button>
                        </TabPane>
                      )}
                      
                      {/* Aba de Anotações */}
                      <TabPane tabId="4">
                        <FormGroup>
                          <Label for="notes">Anotações</Label>
                          <Input
                            type="textarea"
                            name="notes"
                            id="notes"
                            rows="6"
                            value={formData.notes}
                            onChange={handleChange}
                            placeholder="Adicione anotações importantes sobre este cliente"
                          />
                        </FormGroup>
                      </TabPane>
                    </TabContent>
                    
                    <div className="d-flex justify-content-end mt-4">
                      <Button color="light" className="me-2" onClick={() => navigate("/clientes")}>
                        Cancelar
                      </Button>
                      <Button color="success" type="submit">
                        <i className="bx bx-save me-1"></i> Salvar
                      </Button>
                    </div>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

ClientForm.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation()(ClientForm); 