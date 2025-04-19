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

const EmployeeForm = (props) => {
  const { t } = props;
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Estados para os campos do formulário
  const [formData, setFormData] = useState({
    // Dados pessoais
    name: "",
    email: "",
    phone: "",
    cpf: "",
    birthDate: "",
    gender: "",
    status: "Ativo",
    
    // Dados de endereço
    address: "",
    number: "",
    complement: "",
    neighborhood: "",
    city: "",
    state: "",
    zipCode: "",
    
    // Dados profissionais
    department: "",
    role: "",
    joinDate: "",
    salary: "",
    
    // Dados de acesso e permissões
    username: "",
    password: "",
    confirmPassword: "",
    permissions: "Usuário",
    
    // Observações
    notes: ""
  });
  
  // Estado para alerta de erro
  const [error, setError] = useState("");
  
  // Manipulador para alteração de campos
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  // Manipulador de envio de formulário
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validações básicas
    if (!formData.name || !formData.email || !formData.cpf) {
      setError("Preencha todos os campos obrigatórios");
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setError("As senhas não correspondem");
      return;
    }
    
    // Simulação de sucesso
    toast.success("Colaborador salvo com sucesso!");
    navigate("/employees"); // Redireciona para a lista
  };
  
  // Efeito para carregar dados existentes caso seja edição
  useEffect(() => {
    if (id) {
      // Simulação de carregamento de dados
      // Em um ambiente real, aqui faria uma chamada API
      
      // Mock apenas para demonstração
      if (id === "1") {
        setFormData({
          name: "João Silva",
          email: "joao.silva@intelitec.com.br",
          phone: "(11) 99999-8888",
          cpf: "123.456.789-00",
          birthDate: "1985-05-15",
          gender: "Masculino",
          status: "Ativo",
          
          address: "Av. Paulista",
          number: "1000",
          complement: "Apto 123",
          neighborhood: "Bela Vista",
          city: "São Paulo",
          state: "SP",
          zipCode: "01310-100",
          
          department: "Tecnologia",
          role: "Desenvolvedor Frontend",
          joinDate: "2022-01-10",
          salary: "8000",
          
          username: "joao.silva",
          password: "********",
          confirmPassword: "********",
          permissions: "Usuário",
          
          notes: "Colaborador responsável pelo desenvolvimento frontend."
        });
      }
    }
  }, [id]);

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
                        {id ? "Editar Colaborador" : "Adicionar Novo Colaborador"}
                      </h5>
                      <div className="small text-muted">Preencha os dados do colaborador</div>
                    </div>
                    <Button 
                      color="link" 
                      className="text-muted p-0" 
                      onClick={() => navigate("/employees")}
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
                    {/* Busca rápida de CPF */}
                    <div className="mb-4">
                      <InputGroup className="search-box">
                        <Input
                          type="text"
                          name="cpf"
                          value={formData.cpf}
                          onChange={handleChange}
                          placeholder="Digite o CPF do colaborador para buscar dados"
                          className="form-control"
                        />
                        <div className="input-group-text bg-primary text-white">
                          <i className="mdi mdi-magnify"></i>
                        </div>
                      </InputGroup>
                      <small className="text-muted">Se o colaborador já existir no sistema, seus dados serão preenchidos automaticamente</small>
                    </div>
                    
                    {/* Seção: Dados Pessoais */}
                    <h6 className="text-primary fw-medium mb-3">
                      <i className="bx bx-user-circle me-1"></i> Dados Pessoais
                    </h6>
                    
                    <Row className="g-3">
                      <Col md={6} xl={4}>
                        <FormGroup>
                          <Label className="form-label fw-medium">Nome Completo *</Label>
                          <Input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Informe o nome completo"
                            required
                          />
                        </FormGroup>
                      </Col>
                      
                      <Col md={6} xl={4}>
                        <FormGroup>
                          <Label className="form-label fw-medium">Email *</Label>
                          <Input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Informe o email"
                            required
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
                          <Label className="form-label fw-medium">Data de Nascimento</Label>
                          <Input
                            type="date"
                            name="birthDate"
                            value={formData.birthDate}
                            onChange={handleChange}
                          />
                        </FormGroup>
                      </Col>
                      
                      <Col md={6} xl={4}>
                        <FormGroup>
                          <Label className="form-label fw-medium">Gênero</Label>
                          <Input
                            type="select"
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            className="form-select"
                          >
                            <option value="">Selecione</option>
                            <option value="Masculino">Masculino</option>
                            <option value="Feminino">Feminino</option>
                            <option value="Outro">Outro</option>
                            <option value="Prefiro não informar">Prefiro não informar</option>
                          </Input>
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
                    </Row>

                    {/* Seção: Dados Profissionais */}
                    <h6 className="text-primary fw-medium mb-3 mt-4">
                      <i className="bx bx-briefcase me-1"></i> Dados Profissionais
                    </h6>
                    
                    <Row className="g-3">
                      <Col md={6} xl={4}>
                        <FormGroup>
                          <Label className="form-label fw-medium">Departamento</Label>
                          <Input
                            type="select"
                            name="department"
                            value={formData.department}
                            onChange={handleChange}
                            className="form-select"
                          >
                            <option value="">Selecione</option>
                            <option value="Tecnologia">Tecnologia</option>
                            <option value="Projetos">Projetos</option>
                            <option value="Design">Design</option>
                            <option value="Comercial">Comercial</option>
                            <option value="Financeiro">Financeiro</option>
                            <option value="RH">Recursos Humanos</option>
                            <option value="Marketing">Marketing</option>
                          </Input>
                        </FormGroup>
                      </Col>
                      
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
                          <Label className="form-label fw-medium">Data de Admissão</Label>
                          <Input
                            type="date"
                            name="joinDate"
                            value={formData.joinDate}
                            onChange={handleChange}
                          />
                        </FormGroup>
                      </Col>
                      
                      <Col md={6} xl={4}>
                        <FormGroup>
                          <Label className="form-label fw-medium">Salário (R$)</Label>
                          <Input
                            type="number"
                            name="salary"
                            value={formData.salary}
                            onChange={handleChange}
                            placeholder="Informe o salário"
                          />
                        </FormGroup>
                      </Col>
                    </Row>

                    {/* Seção: Acesso ao Sistema */}
                    <h6 className="text-primary fw-medium mb-3 mt-4">
                      <i className="bx bx-lock-alt me-1"></i> Acesso ao Sistema
                    </h6>
                    
                    <Row className="g-3">
                      <Col md={6} xl={4}>
                        <FormGroup>
                          <Label className="form-label fw-medium">Nome de Usuário</Label>
                          <Input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="Nome de usuário para acesso"
                          />
                        </FormGroup>
                      </Col>
                      
                      <Col md={6} xl={4}>
                        <FormGroup>
                          <Label className="form-label fw-medium">Senha {!id && "*"}</Label>
                          <Input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Digite a senha"
                            required={!id}
                          />
                        </FormGroup>
                      </Col>
                      
                      <Col md={6} xl={4}>
                        <FormGroup>
                          <Label className="form-label fw-medium">Confirmar Senha {!id && "*"}</Label>
                          <Input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="Confirme a senha"
                            required={!id}
                          />
                        </FormGroup>
                      </Col>
                      
                      <Col md={6} xl={4}>
                        <FormGroup>
                          <Label className="form-label fw-medium">Nível de Permissão</Label>
                          <Input
                            type="select"
                            name="permissions"
                            value={formData.permissions}
                            onChange={handleChange}
                            className="form-select"
                          >
                            <option value="Usuário">Usuário</option>
                            <option value="Supervisor">Supervisor</option>
                            <option value="Administrador">Administrador</option>
                          </Input>
                        </FormGroup>
                      </Col>
                    </Row>

                    {/* Seção: Endereço (Opcional) */}
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
                      
                      <Col md={4} xl={2}>
                        <FormGroup>
                          <Label className="form-label fw-medium">Número</Label>
                          <Input
                            type="text"
                            name="number"
                            value={formData.number}
                            onChange={handleChange}
                            placeholder="Número"
                          />
                        </FormGroup>
                      </Col>
                      
                      <Col md={6} xl={5}>
                        <FormGroup>
                          <Label className="form-label fw-medium">Complemento</Label>
                          <Input
                            type="text"
                            name="complement"
                            value={formData.complement}
                            onChange={handleChange}
                            placeholder="Apto, Bloco, etc."
                          />
                        </FormGroup>
                      </Col>
                      
                      <Col md={6} xl={4}>
                        <FormGroup>
                          <Label className="form-label fw-medium">Bairro</Label>
                          <Input
                            type="text"
                            name="neighborhood"
                            value={formData.neighborhood}
                            onChange={handleChange}
                            placeholder="Bairro"
                          />
                        </FormGroup>
                      </Col>
                      
                      <Col md={6} xl={4}>
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
                      
                      <Col md={3} xl={2}>
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
                      
                      <Col md={3} xl={2}>
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
                            placeholder="Informações adicionais sobre o colaborador"
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
                    onClick={() => navigate("/employees")}
                  >
                    <i className="mdi mdi-arrow-left me-1"></i> Cancelar
                  </Button>
                  <Button 
                    color="primary" 
                    onClick={handleSubmit}
                  >
                    <i className="mdi mdi-content-save me-1"></i> {id ? "Atualizar" : "Cadastrar"}
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

EmployeeForm.propTypes = {
  t: PropTypes.func,
};

export default withTranslation()(EmployeeForm); 