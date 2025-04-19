import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Button,
  FormGroup,
  Label,
  Input,
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Container,
  InputGroup
} from "reactstrap";

const FilterOpportunities = ({ isOpen, toggle }) => {
  // Estado para armazenar os valores dos filtros (simplificado)
  const [filterData, setFilterData] = useState({
    title: "",
    status: "Aberto",
    funnelStage: "",
    company: "",
    responsible: "",
    expectedClosingDate: { min: "", max: "" },
    amount: { min: "", max: "" },
    probability: "",
  });

  // Função para atualizar o estado do formulário
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === "checkbox") {
      setFilterData({
        ...filterData,
        [name]: checked
      });
    } else {
      setFilterData({
        ...filterData,
        [name]: value
      });
    }
  };

  // Função para atualizar valores de intervalo (min/max)
  const handleRangeChange = (e, field, rangePart) => {
    const { value } = e.target;
    setFilterData({
      ...filterData,
      [field]: {
        ...filterData[field],
        [rangePart]: value
      }
    });
  };

  // Função para aplicar o filtro
  const handleApplyFilter = () => {
    console.log("Filtros aplicados:", filterData);
    // Aqui você implementaria a lógica para filtrar as oportunidades
    toggle();
  };

  // Função para limpar todos os filtros
  const handleClearFilters = () => {
    setFilterData({
      title: "",
      status: "Aberto",
      funnelStage: "",
      company: "",
      responsible: "",
      expectedClosingDate: { min: "", max: "" },
      amount: { min: "", max: "" },
      probability: "",
    });
  };

  if (!isOpen) return null;

  return (
    <div className="filter-screen">
      <div className="page-content">
        <Container fluid>
          <Card className="shadow-sm">
            <CardHeader className="bg-light">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h5 className="mb-0 text-primary">Filtrar oportunidades</h5>
                  <div className="small text-muted">Filtre oportunidades por critérios essenciais</div>
                </div>
                <button type="button" className="btn-close" onClick={toggle} aria-label="Fechar"></button>
              </div>
            </CardHeader>
            <CardBody className="pb-2">
              {/* Busca rápida */}
              <div className="mb-4">
                <InputGroup className="search-box">
                  <Input
                    type="text"
                    name="title"
                    value={filterData.title}
                    onChange={handleInputChange}
                    placeholder="Busque por título, empresa ou responsável"
                    className="form-control"
                  />
                  <div className="input-group-text bg-primary text-white">
                    <i className="mdi mdi-magnify"></i>
                  </div>
                </InputGroup>
              </div>

              <Row className="g-3">
                {/* Status */}
                <Col md={6} xl={3}>
                  <FormGroup>
                    <Label className="form-label fw-medium">Status</Label>
                    <div className="d-flex gap-2">
                      <Button 
                        color={filterData.status === "Aberto" ? "success" : "light"} 
                        size="sm" 
                        className="w-50"
                        onClick={() => setFilterData({...filterData, status: "Aberto"})}
                      >
                        <i className="mdi mdi-check-circle me-1"></i> Aberto
                      </Button>
                      <Button 
                        color={filterData.status === "Fechado" ? "danger" : "light"} 
                        size="sm" 
                        className="w-50"
                        onClick={() => setFilterData({...filterData, status: "Fechado"})}
                      >
                        <i className="mdi mdi-close-circle me-1"></i> Fechado
                      </Button>
                    </div>
                  </FormGroup>
                </Col>

                {/* Etapa do funil */}
                <Col md={6} xl={3}>
                  <FormGroup>
                    <Label className="form-label fw-medium">Etapa do funil</Label>
                    <Input
                      type="select"
                      name="funnelStage"
                      value={filterData.funnelStage}
                      onChange={handleInputChange}
                      className="form-select"
                    >
                      <option value="">Todas as etapas</option>
                      <option value="Cadastro">Cadastro</option>
                      <option value="Contato">Contato</option>
                      <option value="Reunião">Reunião</option>
                      <option value="Proposta">Proposta</option>
                      <option value="Follow-Up">Follow-Up</option>
                      <option value="Fechamento">Fechamento</option>
                    </Input>
                  </FormGroup>
                </Col>

                {/* Empresa */}
                <Col md={6} xl={3}>
                  <FormGroup>
                    <Label className="form-label fw-medium">Empresa</Label>
                    <Input
                      type="select"
                      name="company"
                      value={filterData.company}
                      onChange={handleInputChange}
                      className="form-select"
                    >
                      <option value="">Todas as empresas</option>
                      <option value="ABC">ABC Ltda.</option>
                      <option value="XYZ">XYZ Comércio</option>
                      <option value="123">123 Serviços</option>
                    </Input>
                  </FormGroup>
                </Col>

                {/* Responsável */}
                <Col md={6} xl={3}>
                  <FormGroup>
                    <Label className="form-label fw-medium">Responsável</Label>
                    <Input
                      type="select"
                      name="responsible"
                      value={filterData.responsible}
                      onChange={handleInputChange}
                      className="form-select"
                    >
                      <option value="">Todos os responsáveis</option>
                      <option value="Felipe">Felipe Macedo</option>
                      <option value="Ana">Ana Silva</option>
                      <option value="Carlos">Carlos Santos</option>
                    </Input>
                  </FormGroup>
                </Col>

                {/* Probabilidade */}
                <Col md={6} xl={3}>
                  <FormGroup>
                    <Label className="form-label fw-medium">Probabilidade</Label>
                    <Input
                      type="select"
                      name="probability"
                      value={filterData.probability}
                      onChange={handleInputChange}
                      className="form-select"
                    >
                      <option value="">Qualquer probabilidade</option>
                      <option value="alta">Alta (&gt; 70%)</option>
                      <option value="media">Média (30% - 70%)</option>
                      <option value="baixa">Baixa (&lt; 30%)</option>
                    </Input>
                  </FormGroup>
                </Col>

                {/* Valor */}
                <Col md={6} xl={3}>
                  <FormGroup>
                    <Label className="form-label fw-medium">Valor (R$)</Label>
                    <div className="d-flex">
                      <Input
                        type="number"
                        placeholder="Mínimo"
                        value={filterData.amount.min}
                        onChange={(e) => handleRangeChange(e, "amount", "min")}
                        className="form-control me-2"
                      />
                      <Input
                        type="number"
                        placeholder="Máximo"
                        value={filterData.amount.max}
                        onChange={(e) => handleRangeChange(e, "amount", "max")}
                        className="form-control"
                      />
                    </div>
                  </FormGroup>
                </Col>

                {/* Data de previsão de fechamento */}
                <Col md={6} xl={3}>
                  <FormGroup>
                    <Label className="form-label fw-medium">Previsão de fechamento</Label>
                    <div className="d-flex">
                      <Input
                        type="date"
                        value={filterData.expectedClosingDate.min}
                        onChange={(e) => handleRangeChange(e, "expectedClosingDate", "min")}
                        className="form-control me-2"
                      />
                      <Input
                        type="date"
                        value={filterData.expectedClosingDate.max}
                        onChange={(e) => handleRangeChange(e, "expectedClosingDate", "max")}
                        className="form-control"
                      />
                    </div>
                  </FormGroup>
                </Col>
              </Row>
            </CardBody>
            <CardFooter className="bg-light d-flex justify-content-between">
              <Button color="link" className="text-danger p-0" onClick={handleClearFilters}>
                <i className="mdi mdi-refresh me-1"></i> Limpar filtros
              </Button>
              <Button color="primary" onClick={handleApplyFilter}>
                <i className="mdi mdi-filter-outline me-1"></i> Aplicar filtros
              </Button>
            </CardFooter>
          </Card>
        </Container>
      </div>
    </div>
  );
};

FilterOpportunities.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
};

export default FilterOpportunities; 