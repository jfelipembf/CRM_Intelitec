import React, { useState, useEffect } from "react";
import { 
  Container, 
  Row, 
  Col, 
  Card, 
  CardBody, 
  CardHeader,
  CardFooter,
  Form, 
  FormGroup, 
  Label, 
  Input, 
  Button, 
  Alert,
  InputGroup
} from "reactstrap";
import { useParams, useNavigate } from "react-router-dom";
import { withTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { toast } from "react-toastify";

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
    });
    
    // Redirecionar de volta para a lista
    navigate("/clientes");
  };
  
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Row>
            <Col lg={12}>
              <Card className="shadow-sm">
                <CardHeader className="bg-light">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h5 className="mb-0 text-primary">
                        {clientType === "pessoa" ? "Cadastro de Pessoa" : "Cadastro de Empresa"}
                      </h5>
                      <div className="small text-muted">
                        Preencha os dados {clientType === "pessoa" ? "da pessoa" : "da empresa"}
                      </div>
                    </div>
                    <Button 
                      color="link" 
                      className="text-muted p-0" 
                      onClick={() => navigate("/clientes")}
                    >
                      <i className="mdi mdi-close"></i>
                    </Button>
                  </div>
                </CardHeader>
                
                <CardBody className="pb-2">
                  {error && (
                    <Alert color="danger" className="mb-4">
                      {error}
                    </Alert>
                  )}
                  
                  <Form onSubmit={handleSubmit}>
                    {/* Busca rápida para empresas */}
                    {clientType === "empresa" && (
                      <div className="mb-4">
                        <InputGroup className="search-box">
                          <Input
                            type="text"
                            name="cnpj"
                            value={formData.cnpj}
                            onChange={handleChange}
                            placeholder="Digite o CNPJ da empresa para buscar dados"
                            className="form-control"
                          />
                          <div className="input-group-text bg-primary text-white">
                            <i className="mdi mdi-magnify"></i>
                          </div>
                        </InputGroup>
                        <small className="text-muted">Se a empresa já existir no sistema, seus dados serão preenchidos automaticamente</small>
                      </div>
                    )}
                    
                    {/* Seção: Informações Básicas */}
                    <h6 className="text-primary fw-medium mb-3">
                      <i className="bx bx-user-circle me-1"></i> Informações Básicas
                    </h6>
                    
                    <Row className="g-3">
                      <Col md={6} xl={4}>
                        <FormGroup>
                          <Label className="form-label fw-medium">Nome {clientType === "empresa" ? "da Empresa" : ""} *</Label>
                          <Input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder={`Informe o nome ${clientType === "empresa" ? "da empresa" : "completo"}`}
                            required
                          />
                        </FormGroup>
                      </Col>
                      
                      <Col md={6} xl={4}>
                        <FormGroup>
                          <Label className="form-label fw-medium">Email</Label>
                          <Input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Informe o email"
                          />
                        </FormGroup>
                      </Col>
                      
                      <Col md={6} xl={4}>
                        <FormGroup>
                          <Label className="form-label fw-medium">Telefone</Label>
                          <Input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="Informe o telefone"
                          />
                        </FormGroup>
                      </Col>
                      
                      <Col md={6} xl={4}>
                        <FormGroup>
                          <Label className="form-label fw-medium">Status</Label>
                          <div className="d-flex gap-2">
                            <Button 
                              color={formData.status === "Ativo" ? "success" : "light"} 
                              size="sm" 
                              className="w-50"
                              onClick={() => setFormData({...formData, status: "Ativo"})}
                              type="button"
                            >
                              <i className="mdi mdi-check-circle me-1"></i> Ativo
                            </Button>
                            <Button 
                              color={formData.status === "Inativo" ? "danger" : "light"} 
                              size="sm" 
                              className="w-50"
                              onClick={() => setFormData({...formData, status: "Inativo"})}
                              type="button"
                            >
                              <i className="mdi mdi-close-circle me-1"></i> Inativo
                            </Button>
                          </div>
                        </FormGroup>
                      </Col>
                      
                      <Col md={6} xl={4}>
                        <FormGroup>
                          <Label className="form-label fw-medium">Origem</Label>
                          <Input
                            type="select"
                            name="source"
                            value={formData.source}
                            onChange={handleChange}
                            className="form-select"
                          >
                            <option value="">Selecione a origem</option>
                            <option value="Indicação">Indicação</option>
                            <option value="Site">Site</option>
                            <option value="Redes Sociais">Redes Sociais</option>
                            <option value="Email Marketing">Email Marketing</option>
                            <option value="Evento">Evento</option>
                            <option value="Linkedin">LinkedIn</option>
                            <option value="Outros">Outros</option>
                          </Input>
                        </FormGroup>
                      </Col>
                      
                      <Col md={6} xl={4}>
                        <FormGroup>
                          <Label className="form-label fw-medium">Segmento</Label>
                          <Input
                            type="select"
                            name="segment"
                            value={formData.segment}
                            onChange={handleChange}
                            className="form-select"
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

                    {/* Campos específicos para Pessoa */}
                    {clientType === "pessoa" && (
                      <>
                        <h6 className="text-primary fw-medium mb-3 mt-4">
                          <i className="bx bx-briefcase me-1"></i> Informações Profissionais
                        </h6>
                        
                        <Row className="g-3">
                          <Col md={6} xl={4}>
                            <FormGroup>
                              <Label className="form-label fw-medium">Cargo</Label>
                              <Input
                                type="text"
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                                placeholder="Informe o cargo"
                              />
                            </FormGroup>
                          </Col>
                          
                          <Col md={6} xl={4}>
                            <FormGroup>
                              <Label className="form-label fw-medium">Empresa</Label>
                              <Input
                                type="text"
                                name="company"
                                value={formData.company}
                                onChange={handleChange}
                                placeholder="Informe a empresa"
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                      </>
                    )}

                    {/* Campos específicos para Empresa */}
                    {clientType === "empresa" && (
                      <>
                        <h6 className="text-primary fw-medium mb-3 mt-4">
                          <i className="bx bx-building me-1"></i> Informações da Empresa
                        </h6>
                        
                        <Row className="g-3">
                          <Col md={6} xl={4}>
                            <FormGroup>
                              <Label className="form-label fw-medium">Website</Label>
                              <Input
                                type="text"
                                name="website"
                                value={formData.website}
                                onChange={handleChange}
                                placeholder="Informe o website"
                              />
                            </FormGroup>
                          </Col>
                          
                          <Col md={6} xl={4}>
                            <FormGroup>
                              <Label className="form-label fw-medium">Número de Funcionários</Label>
                              <Input
                                type="number"
                                name="employees"
                                value={formData.employees}
                                onChange={handleChange}
                                placeholder="Informe o número de funcionários"
                              />
                            </FormGroup>
                          </Col>
                          
                          <Col md={6} xl={4}>
                            <FormGroup>
                              <Label className="form-label fw-medium">Faturamento Anual (R$)</Label>
                              <Input
                                type="text"
                                name="revenue"
                                value={formData.revenue}
                                onChange={handleChange}
                                placeholder="Informe o faturamento anual"
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                      </>
                    )}

                    {/* Seção: Endereço */}
                    <h6 className="text-primary fw-medium mb-3 mt-4">
                      <i className="bx bx-map-pin me-1"></i> Endereço
                      <small className="text-muted ms-2 fw-normal">(opcional)</small>
                    </h6>
                    
                    <Row className="g-3">
                      <Col md={8} xl={5}>
                        <FormGroup>
                          <Label className="form-label fw-medium">Logradouro</Label>
                          <Input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            placeholder="Rua, Avenida, etc."
                          />
                        </FormGroup>
                      </Col>
                      
                      <Col md={4} xl={3}>
                        <FormGroup>
                          <Label className="form-label fw-medium">Cidade</Label>
                          <Input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            placeholder="Cidade"
                          />
                        </FormGroup>
                      </Col>
                      
                      <Col md={6} xl={2}>
                        <FormGroup>
                          <Label className="form-label fw-medium">Estado</Label>
                          <Input
                            type="select"
                            name="state"
                            value={formData.state}
                            onChange={handleChange}
                            className="form-select"
                          >
                            <option value="">UF</option>
                            <option value="AC">AC</option>
                            <option value="AL">AL</option>
                            <option value="AP">AP</option>
                            <option value="AM">AM</option>
                            <option value="BA">BA</option>
                            <option value="CE">CE</option>
                            <option value="DF">DF</option>
                            <option value="ES">ES</option>
                            <option value="GO">GO</option>
                            <option value="MA">MA</option>
                            <option value="MT">MT</option>
                            <option value="MS">MS</option>
                            <option value="MG">MG</option>
                            <option value="PA">PA</option>
                            <option value="PB">PB</option>
                            <option value="PR">PR</option>
                            <option value="PE">PE</option>
                            <option value="PI">PI</option>
                            <option value="RJ">RJ</option>
                            <option value="RN">RN</option>
                            <option value="RS">RS</option>
                            <option value="RO">RO</option>
                            <option value="RR">RR</option>
                            <option value="SC">SC</option>
                            <option value="SP">SP</option>
                            <option value="SE">SE</option>
                            <option value="TO">TO</option>
                          </Input>
                        </FormGroup>
                      </Col>
                      
                      <Col md={6} xl={2}>
                        <FormGroup>
                          <Label className="form-label fw-medium">CEP</Label>
                          <Input
                            type="text"
                            name="zipCode"
                            value={formData.zipCode}
                            onChange={handleChange}
                            placeholder="CEP"
                          />
                        </FormGroup>
                      </Col>
                    </Row>

                    {/* Seção: Contatos (apenas para empresas) */}
                    {clientType === "empresa" && (
                      <>
                        <h6 className="text-primary fw-medium mb-3 mt-4">
                          <i className="bx bx-group me-1"></i> Contatos da Empresa
                          <Button
                            color="link"
                            className="ms-2 p-0 text-primary"
                            onClick={addContact}
                            type="button"
                          >
                            <i className="mdi mdi-plus-circle"></i> Adicionar contato
                          </Button>
                        </h6>
                        
                        {formData.contacts.map((contact, index) => (
                          <div key={index} className="border rounded-2 p-3 mb-3 bg-light bg-opacity-50">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                              <h6 className="mb-0 fw-medium">Contato #{index + 1}</h6>
                              {formData.contacts.length > 1 && (
                                <Button
                                  color="danger"
                                  size="sm"
                                  className="btn-sm py-0 px-2"
                                  onClick={() => removeContact(index)}
                                  type="button"
                                >
                                  <i className="mdi mdi-trash-can-outline me-1"></i> Remover
                                </Button>
                              )}
                            </div>
                            
                            <Row className="g-3">
                              <Col md={6} xl={4}>
                                <FormGroup>
                                  <Label className="form-label fw-medium">Nome</Label>
                                  <Input
                                    type="text"
                                    value={contact.name}
                                    onChange={(e) => handleContactChange(index, "name", e.target.value)}
                                    placeholder="Nome do contato"
                                  />
                                </FormGroup>
                              </Col>
                              
                              <Col md={6} xl={4}>
                                <FormGroup>
                                  <Label className="form-label fw-medium">Cargo</Label>
                                  <Input
                                    type="text"
                                    value={contact.role}
                                    onChange={(e) => handleContactChange(index, "role", e.target.value)}
                                    placeholder="Cargo do contato"
                                  />
                                </FormGroup>
                              </Col>
                              
                              <Col md={6} xl={4}>
                                <FormGroup>
                                  <Label className="form-label fw-medium">Email</Label>
                                  <Input
                                    type="email"
                                    value={contact.email}
                                    onChange={(e) => handleContactChange(index, "email", e.target.value)}
                                    placeholder="Email do contato"
                                  />
                                </FormGroup>
                              </Col>
                              
                              <Col md={6} xl={4}>
                                <FormGroup>
                                  <Label className="form-label fw-medium">Telefone</Label>
                                  <Input
                                    type="text"
                                    value={contact.phone}
                                    onChange={(e) => handleContactChange(index, "phone", e.target.value)}
                                    placeholder="Telefone do contato"
                                  />
                                </FormGroup>
                              </Col>
                              
                              <Col md={6} xl={4}>
                                <FormGroup>
                                  <Label className="form-label fw-medium">CPF</Label>
                                  <Input
                                    type="text"
                                    value={contact.cpf}
                                    onChange={(e) => handleContactChange(index, "cpf", e.target.value)}
                                    placeholder="CPF do contato"
                                  />
                                </FormGroup>
                              </Col>
                            </Row>
                          </div>
                        ))}
                      </>
                    )}

                    {/* Seção: Observações */}
                    <h6 className="text-primary fw-medium mb-3 mt-4">
                      <i className="bx bx-chat me-1"></i> Observações
                    </h6>
                    
                    <Row className="g-3">
                      <Col md={12}>
                        <FormGroup>
                          <Input
                            type="textarea"
                            name="notes"
                            rows="3"
                            value={formData.notes}
                            onChange={handleChange}
                            placeholder={`Informações adicionais sobre ${clientType === "pessoa" ? "a pessoa" : "a empresa"}`}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
                
                <CardFooter className="bg-light d-flex justify-content-between">
                  <Button 
                    color="link" 
                    className="text-danger p-0" 
                    onClick={() => navigate("/clientes")}
                  >
                    <i className="mdi mdi-arrow-left me-1"></i> Cancelar
                  </Button>
                  <Button 
                    color="primary" 
                    onClick={handleSubmit}
                  >
                    <i className="mdi mdi-content-save me-1"></i> Cadastrar
                  </Button>
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

ClientForm.propTypes = {
  t: PropTypes.func,
};

export default withTranslation()(ClientForm); 