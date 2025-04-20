import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { 
  Card, 
  CardBody, 
  CardTitle, 
  Row, 
  Col, 
  Form, 
  FormGroup, 
  Label, 
  Input, 
  Button, 
  Alert,
  InputGroup,
  InputGroupText,
  FormFeedback
} from "reactstrap";
import { Link, useNavigate } from "react-router-dom";

const GoalForm = ({ goal, isEditing }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "Financeira",
    periodType: "month",
    period: "",
    targetValue: "",
    currentValue: "0",
    status: "upcoming",
    startDate: "",
    endDate: "",
    unit: "",
    icon: "bx-money",
    responsible: "",
    team: [],
    notes: ""
  });
  
  const [errors, setErrors] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  
  // Opções para os selects
  const typeOptions = [
    { value: "Financeira", label: "Financeira", icon: "bx-money" },
    { value: "Vendas", label: "Vendas", icon: "bx-store" },
    { value: "Clientes", label: "Clientes", icon: "bx-user-plus" },
    { value: "Produtos", label: "Produtos", icon: "bx-package" },
    { value: "Projetos", label: "Projetos", icon: "bx-task" },
    { value: "Outro", label: "Outro", icon: "bx-target-lock" }
  ];
  
  const periodOptions = [
    { value: "month", label: "Mensal" },
    { value: "quarter", label: "Trimestral" },
    { value: "semester", label: "Semestral" },
    { value: "year", label: "Anual" }
  ];
  
  const statusOptions = [
    { value: "upcoming", label: "Futura", color: "warning" },
    { value: "in-progress", label: "Em Andamento", color: "info" },
    { value: "completed", label: "Concluída", color: "success" }
  ];
  
  // Se estiver editando, preencha o formulário com os dados da meta
  useEffect(() => {
    if (isEditing && goal) {
      setFormData({
        ...goal
      });
    }
  }, [isEditing, goal]);
  
  // Funções auxiliares para gerar opções de períodos
  const generatePeriodOptions = () => {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;
    
    switch (formData.periodType) {
      case "month":
        return Array.from({ length: 12 }, (_, i) => {
          const month = i + 1;
          const monthNames = [
            "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
            "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
          ];
          return {
            value: `${month}/${currentYear}`,
            label: `${monthNames[i]} ${currentYear}`
          };
        });
        
      case "quarter":
        return [
          { value: `Q1/${currentYear}`, label: `1º Trimestre ${currentYear}` },
          { value: `Q2/${currentYear}`, label: `2º Trimestre ${currentYear}` },
          { value: `Q3/${currentYear}`, label: `3º Trimestre ${currentYear}` },
          { value: `Q4/${currentYear}`, label: `4º Trimestre ${currentYear}` }
        ];
        
      case "semester":
        return [
          { value: `S1/${currentYear}`, label: `1º Semestre ${currentYear}` },
          { value: `S2/${currentYear}`, label: `2º Semestre ${currentYear}` }
        ];
        
      case "year":
        return Array.from({ length: 3 }, (_, i) => {
          const year = currentYear + i;
          return {
            value: `${year}`,
            label: `${year}`
          };
        });
        
      default:
        return [];
    }
  };
  
  // Manipular mudanças nos campos do formulário
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Regras especiais para alguns campos
    if (name === "type") {
      // Atualizar o ícone quando o tipo mudar
      const selectedType = typeOptions.find(opt => opt.value === value);
      setFormData(prev => ({
        ...prev,
        [name]: value,
        icon: selectedType ? selectedType.icon : prev.icon
      }));
    } else if (name === "periodType") {
      // Resetar o período quando o tipo de período mudar
      setFormData(prev => ({
        ...prev,
        [name]: value,
        period: ""
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    
    // Limpar erro do campo se houver
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };
  
  // Validar formulário
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) newErrors.title = "O título é obrigatório";
    if (!formData.periodType) newErrors.periodType = "Selecione um tipo de período";
    if (!formData.period) newErrors.period = "Selecione um período";
    if (!formData.targetValue) newErrors.targetValue = "O valor da meta é obrigatório";
    if (formData.targetValue && isNaN(Number(formData.targetValue.replace(/\./g, "").replace(",", ".")))) {
      newErrors.targetValue = "Digite um valor numérico válido";
    }
    if (!formData.startDate) newErrors.startDate = "A data de início é obrigatória";
    if (!formData.endDate) newErrors.endDate = "A data de término é obrigatória";
    
    // Validar se a data de término é posterior à data de início
    if (formData.startDate && formData.endDate && new Date(formData.startDate) >= new Date(formData.endDate)) {
      newErrors.endDate = "A data de término deve ser posterior à data de início";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Manipular envio do formulário
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    
    if (validateForm()) {
      // Simulação de envio para API
      console.log("Dados do formulário enviados:", formData);
      
      // Mostrar mensagem de sucesso
      setShowSuccessAlert(true);
      
      // Redirecionar após 2 segundos
      setTimeout(() => {
        navigate("/metas");
      }, 2000);
    } else {
      // Rolar até o primeiro campo com erro
      const firstError = Object.keys(errors)[0];
      const errorElement = document.querySelector(`[name="${firstError}"]`);
      if (errorElement) {
        errorElement.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  };
  
  // Formatar valores monetários no campo de entrada
  const formatCurrency = (value) => {
    if (!value) return "";
    
    // Remove tudo exceto números e pontos/vírgulas
    const numericValue = value.replace(/[^\d,.]/g, "");
    
    // Converte para número
    const number = parseFloat(numericValue.replace(/\./g, "").replace(",", "."));
    
    if (isNaN(number)) return "0,00";
    
    // Formata para moeda brasileira
    return number.toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  return (
    <Card className="shadow-sm border-0" style={{ borderRadius: "12px" }}>
      <CardBody>
        <CardTitle tag="h5" className="mb-4">
          {isEditing ? "Editar Meta" : "Nova Meta"}
        </CardTitle>
        
        {showSuccessAlert && (
          <Alert color="success" className="my-3">
            <i className="bx bx-check-circle me-2"></i>
            Meta {isEditing ? "atualizada" : "cadastrada"} com sucesso! Redirecionando...
          </Alert>
        )}
        
        <Form onSubmit={handleSubmit}>
          <Row>
            {/* Informações Básicas */}
            <Col md={12}>
              <h6 className="text-primary mb-3">Informações Básicas</h6>
            </Col>
            
            <Col md={6}>
              <FormGroup>
                <Label for="title">Título da Meta *</Label>
                <Input
                  type="text"
                  name="title"
                  id="title"
                  placeholder="Ex: Aumentar vendas totais"
                  value={formData.title}
                  onChange={handleChange}
                  invalid={!!errors.title && formSubmitted}
                />
                <FormFeedback>{errors.title}</FormFeedback>
              </FormGroup>
            </Col>
            
            <Col md={6}>
              <FormGroup>
                <Label for="type">Tipo de Meta *</Label>
                <Input
                  type="select"
                  name="type"
                  id="type"
                  value={formData.type}
                  onChange={handleChange}
                >
                  {typeOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Input>
              </FormGroup>
            </Col>
            
            <Col md={12}>
              <FormGroup>
                <Label for="description">Descrição</Label>
                <Input
                  type="textarea"
                  name="description"
                  id="description"
                  placeholder="Descreva os detalhes e objetivos desta meta"
                  rows="3"
                  value={formData.description}
                  onChange={handleChange}
                />
              </FormGroup>
            </Col>
            
            {/* Período e Valores */}
            <Col md={12} className="mt-4">
              <h6 className="text-primary mb-3">Período e Valores</h6>
            </Col>
            
            <Col md={6}>
              <FormGroup>
                <Label for="periodType">Tipo de Período *</Label>
                <Input
                  type="select"
                  name="periodType"
                  id="periodType"
                  value={formData.periodType}
                  onChange={handleChange}
                  invalid={!!errors.periodType && formSubmitted}
                >
                  {periodOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Input>
                <FormFeedback>{errors.periodType}</FormFeedback>
              </FormGroup>
            </Col>
            
            <Col md={6}>
              <FormGroup>
                <Label for="period">Período *</Label>
                <Input
                  type="select"
                  name="period"
                  id="period"
                  value={formData.period}
                  onChange={handleChange}
                  invalid={!!errors.period && formSubmitted}
                >
                  <option value="">Selecione...</option>
                  {generatePeriodOptions().map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Input>
                <FormFeedback>{errors.period}</FormFeedback>
              </FormGroup>
            </Col>
            
            <Col md={6}>
              <FormGroup>
                <Label for="targetValue">Valor da Meta *</Label>
                <InputGroup>
                  {formData.type === "Financeira" && (
                    <InputGroupText>R$</InputGroupText>
                  )}
                  <Input
                    type="text"
                    name="targetValue"
                    id="targetValue"
                    placeholder={formData.type === "Financeira" ? "0,00" : "Valor numérico"}
                    value={formData.type === "Financeira" ? formatCurrency(formData.targetValue) : formData.targetValue}
                    onChange={handleChange}
                    invalid={!!errors.targetValue && formSubmitted}
                  />
                  {formData.type !== "Financeira" && formData.unit && (
                    <InputGroupText>{formData.unit}</InputGroupText>
                  )}
                  <FormFeedback>{errors.targetValue}</FormFeedback>
                </InputGroup>
              </FormGroup>
            </Col>
            
            <Col md={6}>
              <FormGroup>
                <Label for="currentValue">Valor Atual</Label>
                <InputGroup>
                  {formData.type === "Financeira" && (
                    <InputGroupText>R$</InputGroupText>
                  )}
                  <Input
                    type="text"
                    name="currentValue"
                    id="currentValue"
                    placeholder={formData.type === "Financeira" ? "0,00" : "Valor atual"}
                    value={formData.type === "Financeira" ? formatCurrency(formData.currentValue) : formData.currentValue}
                    onChange={handleChange}
                  />
                  {formData.type !== "Financeira" && formData.unit && (
                    <InputGroupText>{formData.unit}</InputGroupText>
                  )}
                </InputGroup>
              </FormGroup>
            </Col>
            
            {formData.type !== "Financeira" && (
              <Col md={6}>
                <FormGroup>
                  <Label for="unit">Unidade de Medida</Label>
                  <Input
                    type="text"
                    name="unit"
                    id="unit"
                    placeholder="Ex: unidades, clientes, projetos"
                    value={formData.unit}
                    onChange={handleChange}
                  />
                </FormGroup>
              </Col>
            )}
            
            <Col md={formData.type !== "Financeira" ? 6 : 12}>
              <FormGroup>
                <Label for="status">Status</Label>
                <Input
                  type="select"
                  name="status"
                  id="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  {statusOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Input>
              </FormGroup>
            </Col>
            
            {/* Datas e Responsáveis */}
            <Col md={12} className="mt-4">
              <h6 className="text-primary mb-3">Datas e Responsáveis</h6>
            </Col>
            
            <Col md={6}>
              <FormGroup>
                <Label for="startDate">Data de Início *</Label>
                <Input
                  type="date"
                  name="startDate"
                  id="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  invalid={!!errors.startDate && formSubmitted}
                />
                <FormFeedback>{errors.startDate}</FormFeedback>
              </FormGroup>
            </Col>
            
            <Col md={6}>
              <FormGroup>
                <Label for="endDate">Data de Término *</Label>
                <Input
                  type="date"
                  name="endDate"
                  id="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  invalid={!!errors.endDate && formSubmitted}
                />
                <FormFeedback>{errors.endDate}</FormFeedback>
              </FormGroup>
            </Col>
            
            <Col md={6}>
              <FormGroup>
                <Label for="responsible">Responsável</Label>
                <Input
                  type="text"
                  name="responsible"
                  id="responsible"
                  placeholder="Nome do responsável principal"
                  value={formData.responsible}
                  onChange={handleChange}
                />
              </FormGroup>
            </Col>
            
            <Col md={6}>
              <FormGroup>
                <Label for="notes">Observações</Label>
                <Input
                  type="textarea"
                  name="notes"
                  id="notes"
                  placeholder="Notas adicionais, comentários ou referências"
                  rows="2"
                  value={formData.notes}
                  onChange={handleChange}
                />
              </FormGroup>
            </Col>
            
            {/* Botões de Ação */}
            <Col md={12} className="mt-4 text-end">
              <Link to="/metas">
                <Button color="light" className="me-2">
                  Cancelar
                </Button>
              </Link>
              <Button color="primary" type="submit">
                {isEditing ? "Salvar Alterações" : "Cadastrar Meta"}
              </Button>
            </Col>
          </Row>
        </Form>
      </CardBody>
    </Card>
  );
};

GoalForm.propTypes = {
  goal: PropTypes.object,
  isEditing: PropTypes.bool
};

GoalForm.defaultProps = {
  goal: null,
  isEditing: false
};

export default GoalForm; 