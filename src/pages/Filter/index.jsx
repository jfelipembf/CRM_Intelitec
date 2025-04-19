import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  FormGroup,
  Label,
  Input,
  Row,
  Col,
  Badge,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Container,
  Form,
  InputGroup,
  InputGroupText,
  CardTitle
} from "reactstrap";
import Select from "react-select";
import moment from "moment";

// Estilo personalizado para os elementos
const customStyles = {
  control: (provided, state) => ({
    ...provided,
    borderRadius: '0.375rem',
    fontSize: '1rem',
    lineHeight: '1.5',
    borderColor: state.isFocused ? '#86b7fe' : '#ced4da',
    boxShadow: state.isFocused ? '0 0 0 0.25rem rgba(13, 110, 253, 0.25)' : 'none',
    minHeight: '38px',
    minWidth: '100%',
    '&:hover': {
      borderColor: '#adb5bd'
    }
  }),
  fontSize: "14px",
  smallLabel: {
    fontSize: "14px",
    marginBottom: "4px"
  },
  selectStyles: {
    control: (base) => ({
      ...base,
      minHeight: '38px',
      height: '38px',
      fontSize: '14px',
      width: '100%',
      minWidth: '100%',
      borderColor: '#ced4da',
      boxShadow: 'none',
      '&:hover': {
        borderColor: '#adb5bd'
      }
    }),
    valueContainer: (base) => ({
      ...base,
      height: '38px',
      padding: '0 8px',
      fontSize: '14px'
    }),
    input: (base) => ({
      ...base,
      margin: '0px',
      fontSize: '14px'
    }),
    indicatorsContainer: (base) => ({
      ...base,
      height: '38px'
    }),
    option: (base) => ({
      ...base,
      fontSize: '14px'
    }),
    singleValue: (base) => ({
      ...base,
      fontSize: '14px'
    }),
    multiValue: (base) => ({
      ...base,
      fontSize: '14px'
    }),
    multiValueLabel: (base) => ({
      ...base,
      fontSize: '14px'
    }),
    menu: (base) => ({
      ...base,
      width: '100%',
      zIndex: 1000
    })
  },
  dateInputStyle: {
    height: "38px",
    fontSize: "14px",
    borderColor: "#ced4da",
    color: "#495057",
    padding: "0.375rem 0.75rem"
  }
};

const Filter = () => {
  document.title = "Filtrar Oportunidades | InteliTec CRM";

  const navigate = useNavigate();
  const [filterValues, setFilterValues] = useState({
    title: "",
    status: null,
    situation: null,
    origin: null,
    company: "",
    person: "",
    segment: null,
    tags: [],
    state: null,
    city: "",
    product: null,
    lossReasons: null,
    valuePs: { min: "", max: "" },
    valueMrr: { min: "", max: "" },
    registrationDate: { from: null, to: null },
    closingDate: { from: null, to: null },
    expectedClosingDate: { from: null, to: null },
    proposalRegistrationDate: { from: null, to: null },
    proposalClosingDate: { from: null, to: null },
    lastContactDate: { from: null, to: null },
    funnelStage: null,
    region: null,
    microregion: null,
    activities: null,
    temperature: null,
    probability: null,
    sector: null,
    showOnlyStaged: false,
    showUnreadEmails: false,
  });

  const statusOptions = [
    { value: "active", label: "Ativo" },
    { value: "inactive", label: "Inativo" },
    { value: "all", label: "Todos" },
  ];

  const situationOptions = [
    { value: "open", label: "Aberto" },
    { value: "won", label: "Ganho" },
    { value: "lost", label: "Perdido" },
    { value: "all", label: "Todos" },
  ];

  const originOptions = [
    { value: "website", label: "Website" },
    { value: "networking", label: "Networking" },
    { value: "social_media", label: "Redes Sociais" },
    { value: "referral", label: "Indicação" },
    { value: "cold_call", label: "Ligação a Frio" },
    { value: "all", label: "Todos" },
  ];

  const segmentOptions = [
    { value: "retail", label: "Varejo" },
    { value: "industry", label: "Indústria" },
    { value: "services", label: "Serviços" },
    { value: "government", label: "Governo" },
    { value: "health", label: "Saúde" },
    { value: "education", label: "Educação" },
    { value: "all", label: "Todos" },
  ];

  const tagOptions = [
    { value: "hot_lead", label: "Lead Quente" },
    { value: "premium", label: "Premium" },
    { value: "priority", label: "Prioridade" },
    { value: "cold_lead", label: "Lead Frio" },
    { value: "follow_up", label: "Acompanhamento" },
  ];

  const stateOptions = [
    { value: "SP", label: "São Paulo" },
    { value: "RJ", label: "Rio de Janeiro" },
    { value: "MG", label: "Minas Gerais" },
    { value: "RS", label: "Rio Grande do Sul" },
    { value: "PR", label: "Paraná" },
    { value: "SC", label: "Santa Catarina" },
    { value: "BA", label: "Bahia" },
    { value: "all", label: "Todos" },
  ];

  const productOptions = [
    { value: "crm", label: "CRM" },
    { value: "erp", label: "ERP" },
    { value: "ecommerce", label: "E-commerce" },
    { value: "analytics", label: "Analytics" },
    { value: "all", label: "Todos" },
  ];

  const lossReasonOptions = [
    { value: "price", label: "Preço" },
    { value: "competition", label: "Concorrência" },
    { value: "timing", label: "Timing" },
    { value: "feature", label: "Funcionalidade" },
    { value: "all", label: "Todos" },
  ];

  const funnelStageOptions = [
    { value: "prospecting", label: "Prospecção" },
    { value: "qualification", label: "Qualificação" },
    { value: "proposal", label: "Proposta" },
    { value: "negotiation", label: "Negociação" },
    { value: "closing", label: "Fechamento" },
    { value: "all", label: "Todos" },
  ];

  const regionOptions = [
    { value: "southeast", label: "Sudeste" },
    { value: "south", label: "Sul" },
    { value: "northeast", label: "Nordeste" },
    { value: "north", label: "Norte" },
    { value: "midwest", label: "Centro-Oeste" },
    { value: "all", label: "Todos" },
  ];

  const microregionOptions = [
    { value: "grande_sp", label: "Grande São Paulo" },
    { value: "litoral_sp", label: "Litoral de São Paulo" },
    { value: "interior_sp", label: "Interior de São Paulo" },
    { value: "all", label: "Todos" },
  ];

  const activityOptions = [
    { value: "call", label: "Ligação" },
    { value: "meeting", label: "Reunião" },
    { value: "email", label: "Email" },
    { value: "demo", label: "Demonstração" },
    { value: "all", label: "Todos" },
  ];

  const temperatureOptions = [
    { value: "hot", label: "Quente" },
    { value: "warm", label: "Morno" },
    { value: "cold", label: "Frio" },
    { value: "all", label: "Todos" },
  ];

  const probabilityOptions = [
    { value: "high", label: "Alta" },
    { value: "medium", label: "Média" },
    { value: "low", label: "Baixa" },
    { value: "all", label: "Todos" },
  ];

  const sectorOptions = [
    { value: "technology", label: "Tecnologia" },
    { value: "finance", label: "Financeiro" },
    { value: "healthcare", label: "Saúde" },
    { value: "education", label: "Educação" },
    { value: "retail", label: "Varejo" },
    { value: "manufacturing", label: "Manufatura" },
    { value: "all", label: "Todos" },
  ];

  const handleInputChange = (field, value) => {
    setFilterValues({
      ...filterValues,
      [field]: value,
    });
  };

  const handleRangeInputChange = (field, subfield, value) => {
    setFilterValues({
      ...filterValues,
      [field]: {
        ...filterValues[field],
        [subfield]: value,
      },
    });
  };

  const handleDateRangeChange = (field, subfield, date) => {
    setFilterValues({
      ...filterValues,
      [field]: {
        ...filterValues[field],
        [subfield]: date,
      },
    });
  };

  const applyFilters = () => {
    // Implementar a lógica para aplicar os filtros
    console.log("Filtros aplicados:", filterValues);
    // Aqui seria possível fazer uma chamada à API ou atualizar o estado global
    navigate("/dashboard");
  };

  const clearFilters = () => {
    setFilterValues({
      title: "",
      status: null,
      situation: null,
      origin: null,
      company: "",
      person: "",
      segment: null,
      tags: [],
      state: null,
      city: "",
      product: null,
      lossReasons: null,
      valuePs: { min: "", max: "" },
      valueMrr: { min: "", max: "" },
      registrationDate: { from: null, to: null },
      closingDate: { from: null, to: null },
      expectedClosingDate: { from: null, to: null },
      proposalRegistrationDate: { from: null, to: null },
      proposalClosingDate: { from: null, to: null },
      lastContactDate: { from: null, to: null },
      funnelStage: null,
      region: null,
      microregion: null,
      activities: null,
      temperature: null,
      probability: null,
      sector: null,
      showOnlyStaged: false,
      showUnreadEmails: false,
    });
  };

  // Adicionar estilo para inputs de data
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      input[type="date"]::-webkit-calendar-picker-indicator {
        filter: invert(80%);
        opacity: 0.6;
      }
      input[type="date"]::-webkit-datetime-edit-fields-wrapper {
        color: #495057;
      }
      input[type="date"]::-webkit-datetime-edit-text {
        color: #ced4da;
        padding: 0 4px;
      }
      input[type="date"]::-webkit-datetime-edit-day-field,
      input[type="date"]::-webkit-datetime-edit-month-field,
      input[type="date"]::-webkit-datetime-edit-year-field {
        color: #495057;
      }
      /* Ajusta o estilo para campos select */
      .select__control {
        min-width: 100% !important;
        border-color: #ced4da !important;
      }
      input[type="date"] {
        border-color: #ced4da !important;
      }
      .select__control--is-focused {
        border-color: #86b7fe !important;
        box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25) !important;
      }
      input[type="date"]:focus {
        border-color: #86b7fe !important;
        box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25) !important;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Card className="mt-3">
            <CardBody className="p-3">
              <CardTitle tag="h5" className="mb-3">Filtrar Oportunidades</CardTitle>
              <Form>
                <Row className="g-3 mb-2">
                  <Col md={3}>
                    <FormGroup className="mb-3">
                      <Label className="form-label" style={{ fontSize: "14px" }}>Título</Label>
                      <Input
                        type="text"
                        id="title"
                        bsSize="sm"
                        className="form-control"
                        style={{ height: "38px", fontSize: "14px", width: "100%" }}
                        value={filterValues.title}
                        onChange={(e) => handleInputChange("title", e.target.value)}
                        placeholder="Título da oportunidade"
                      />
                    </FormGroup>
                  </Col>
                  <Col md={3}>
                    <FormGroup className="mb-3">
                      <Label className="form-label" style={{ fontSize: "14px" }}>Status</Label>
                      <Select
                        id="title"
                        options={statusOptions}
                        value={filterValues.status}
                        onChange={(option) => handleInputChange("status", option)}
                        placeholder="Selecione o status"
                        styles={customStyles.selectStyles}
                        className="react-select select-sm"
                        classNamePrefix="select"
                        isClearable
                      />
                    </FormGroup>
                  </Col>
                  <Col md={3}>
                    <FormGroup className="mb-3">
                      <Label className="form-label" style={{ fontSize: "14px" }}>Situação</Label>
                      <Select
                        id="situation"
                        options={situationOptions}
                        value={filterValues.situation}
                        onChange={(option) => handleInputChange("situation", option)}
                        placeholder="Selecione a situação do negócio"
                        className="react-select select-sm"
                        classNamePrefix="select"
                        isClearable
                        styles={customStyles.selectStyles}
                      />
                    </FormGroup>
                  </Col>
                  <Col md={3}>
                    <FormGroup className="mb-3">
                      <Label className="form-label" style={{ fontSize: "14px" }}>Origem</Label>
                      <Select
                        id="origin"
                        options={originOptions}
                        value={filterValues.origin}
                        onChange={(option) => handleInputChange("origin", option)}
                        placeholder="Selecione uma origem"
                        className="react-select select-sm"
                        classNamePrefix="select"
                        isClearable
                        styles={customStyles.selectStyles}
                      />
                    </FormGroup>
                  </Col>
                </Row>

                <Row className="g-3 mb-2">
                  <Col md={3}>
                    <FormGroup className="mb-3">
                      <Label className="form-label" style={{ fontSize: "14px" }}>Empresa</Label>
                      <Input
                        type="text"
                        id="company"
                        bsSize="sm"
                        className="form-control"
                        style={{ height: "38px", fontSize: "14px" }}
                        value={filterValues.company}
                        onChange={(e) => handleInputChange("company", e.target.value)}
                        placeholder="Selecione uma empresa"
                      />
                    </FormGroup>
                  </Col>
                  <Col md={3}>
                    <FormGroup className="mb-3">
                      <Label className="form-label" style={{ fontSize: "14px" }}>Pessoa</Label>
                      <Input
                        type="text"
                        id="person"
                        bsSize="sm"
                        className="form-control"
                        style={{ height: "38px", fontSize: "14px" }}
                        value={filterValues.person}
                        onChange={(e) => handleInputChange("person", e.target.value)}
                        placeholder="Selecione uma pessoa"
                      />
                    </FormGroup>
                  </Col>
                  <Col md={3}>
                    <FormGroup className="mb-3">
                      <Label className="form-label" style={{ fontSize: "14px" }}>Segmento</Label>
                      <Select
                        id="segment"
                        options={segmentOptions}
                        value={filterValues.segment}
                        onChange={(option) => handleInputChange("segment", option)}
                        placeholder="Selecione um segmento"
                        className="react-select select-sm"
                        classNamePrefix="select"
                        isClearable
                        styles={customStyles.selectStyles}
                      />
                    </FormGroup>
                  </Col>
                  <Col md={3}>
                    <FormGroup className="mb-3">
                      <Label className="form-label" style={{ fontSize: "14px" }}>Tags</Label>
                      <Select
                        id="tags"
                        options={tagOptions}
                        value={filterValues.tags}
                        onChange={(options) => handleInputChange("tags", options)}
                        placeholder="Selecione tags"
                        className="react-select select-sm"
                        classNamePrefix="select"
                        isMulti
                        styles={customStyles.selectStyles}
                      />
                    </FormGroup>
                  </Col>
                </Row>

                <Row className="g-3 mb-2">
                  <Col md={3}>
                    <FormGroup className="mb-3">
                      <Label className="form-label" style={{ fontSize: "14px" }}>Estado</Label>
                      <Select
                        id="state"
                        options={stateOptions}
                        value={filterValues.state}
                        onChange={(option) => handleInputChange("state", option)}
                        placeholder="Selecione um estado"
                        className="react-select select-sm"
                        classNamePrefix="select"
                        isClearable
                        styles={customStyles.selectStyles}
                      />
                    </FormGroup>
                  </Col>
                  <Col md={3}>
                    <FormGroup className="mb-3">
                      <Label className="form-label" style={{ fontSize: "14px" }}>Cidade</Label>
                      <Input
                        type="text"
                        id="city"
                        bsSize="sm"
                        className="form-control"
                        style={{ height: "38px", fontSize: "14px" }}
                        value={filterValues.city}
                        onChange={(e) => handleInputChange("city", e.target.value)}
                        placeholder="Selecione uma cidade"
                      />
                    </FormGroup>
                  </Col>
                  <Col md={3}>
                    <FormGroup className="mb-3">
                      <Label className="form-label" style={{ fontSize: "14px" }}>Produto</Label>
                      <Select
                        id="product"
                        options={productOptions}
                        value={filterValues.product}
                        onChange={(option) => handleInputChange("product", option)}
                        placeholder="Selecione um produto"
                        className="react-select select-sm"
                        classNamePrefix="select"
                        isClearable
                        styles={customStyles.selectStyles}
                      />
                    </FormGroup>
                  </Col>
                  <Col md={3}>
                    <FormGroup className="mb-3">
                      <Label className="form-label" style={{ fontSize: "14px" }}>Motivos de perda</Label>
                      <Select
                        id="lossReasons"
                        options={lossReasonOptions}
                        value={filterValues.lossReasons}
                        onChange={(option) => handleInputChange("lossReasons", option)}
                        placeholder="Selecione um motivo de perda"
                        className="react-select select-sm"
                        classNamePrefix="select"
                        isClearable
                        styles={customStyles.selectStyles}
                      />
                    </FormGroup>
                  </Col>
                </Row>

                <Row className="g-3 mb-2">
                  <Col md={3}>
                    <FormGroup className="mb-3">
                      <Label className="form-label" style={{ fontSize: "14px" }}>Valor P&S</Label>
                      <Row className="g-1">
                        <Col xs={6}>
                          <Input
                            bsSize="sm"
                            className="form-control"
                            style={{ height: "38px", fontSize: "14px" }}
                            type="number"
                            value={filterValues.valuePs.min}
                            onChange={(e) => handleRangeInputChange("valuePs", "min", e.target.value)}
                            placeholder="De"
                          />
                        </Col>
                        <Col xs={6}>
                          <Input
                            bsSize="sm"
                            className="form-control"
                            style={{ height: "38px", fontSize: "14px" }}
                            type="number"
                            value={filterValues.valuePs.max}
                            onChange={(e) => handleRangeInputChange("valuePs", "max", e.target.value)}
                            placeholder="até"
                          />
                        </Col>
                      </Row>
                    </FormGroup>
                  </Col>
                  <Col md={3}>
                    <FormGroup className="mb-3">
                      <Label className="form-label" style={{ fontSize: "14px" }}>Valor MRR</Label>
                      <Row className="g-1">
                        <Col xs={6}>
                          <Input
                            bsSize="sm"
                            className="form-control"
                            style={{ height: "38px", fontSize: "14px" }}
                            type="number"
                            value={filterValues.valueMrr.min}
                            onChange={(e) => handleRangeInputChange("valueMrr", "min", e.target.value)}
                            placeholder="De"
                          />
                        </Col>
                        <Col xs={6}>
                          <Input
                            bsSize="sm"
                            className="form-control"
                            style={{ height: "38px", fontSize: "14px" }}
                            type="number"
                            value={filterValues.valueMrr.max}
                            onChange={(e) => handleRangeInputChange("valueMrr", "max", e.target.value)}
                            placeholder="até"
                          />
                        </Col>
                      </Row>
                    </FormGroup>
                  </Col>
                  <Col md={3}>
                    <FormGroup className="mb-3">
                      <Label className="form-label" style={{ fontSize: "14px" }}>Data de cadastro (oportunidade)</Label>
                      <Row className="g-1">
                        <Col xs={6}>
                          <Input
                            bsSize="sm"
                            className="form-control"
                            style={customStyles.dateInputStyle}
                            type="date"
                            value={filterValues.registrationDate.from ? moment(filterValues.registrationDate.from).format('YYYY-MM-DD') : ''}
                            onChange={(e) => handleDateRangeChange("registrationDate", "from", e.target.value ? new Date(e.target.value) : null)}
                            placeholder="De"
                          />
                        </Col>
                        <Col xs={6}>
                          <Input
                            bsSize="sm"
                            className="form-control"
                            style={customStyles.dateInputStyle}
                            type="date"
                            value={filterValues.registrationDate.to ? moment(filterValues.registrationDate.to).format('YYYY-MM-DD') : ''}
                            onChange={(e) => handleDateRangeChange("registrationDate", "to", e.target.value ? new Date(e.target.value) : null)}
                            placeholder="até"
                          />
                        </Col>
                      </Row>
                    </FormGroup>
                  </Col>
                  <Col md={3}>
                    <FormGroup className="mb-3">
                      <Label className="form-label" style={{ fontSize: "14px" }}>Data de fechamento (oportunidade)</Label>
                      <Row className="g-1">
                        <Col xs={6}>
                          <Input
                            bsSize="sm"
                            className="form-control"
                            style={customStyles.dateInputStyle}
                            type="date"
                            value={filterValues.closingDate.from ? moment(filterValues.closingDate.from).format('YYYY-MM-DD') : ''}
                            onChange={(e) => handleDateRangeChange("closingDate", "from", e.target.value ? new Date(e.target.value) : null)}
                            placeholder="De"
                          />
                        </Col>
                        <Col xs={6}>
                          <Input
                            bsSize="sm"
                            className="form-control"
                            style={customStyles.dateInputStyle}
                            type="date"
                            value={filterValues.closingDate.to ? moment(filterValues.closingDate.to).format('YYYY-MM-DD') : ''}
                            onChange={(e) => handleDateRangeChange("closingDate", "to", e.target.value ? new Date(e.target.value) : null)}
                            placeholder="até"
                          />
                        </Col>
                      </Row>
                    </FormGroup>
                  </Col>
                </Row>

                <Row className="g-3 mb-2">
                  <Col md={3}>
                    <FormGroup className="mb-3">
                      <Label className="form-label" style={{ fontSize: "14px" }}>Data de previsão de fechamento </Label>
                      <Row className="g-1">
                        <Col xs={6}>
                          <Input
                            bsSize="sm"
                            style={customStyles.dateInputStyle}
                            type="date"
                            value={filterValues.expectedClosingDate.from ? moment(filterValues.expectedClosingDate.from).format('YYYY-MM-DD') : ''}
                            onChange={(e) => handleDateRangeChange("expectedClosingDate", "from", e.target.value ? new Date(e.target.value) : null)}
                            placeholder="De"
                          />
                        </Col>
                        <Col xs={6}>
                          <Input
                            bsSize="sm"
                            style={customStyles.dateInputStyle}
                            type="date"
                            value={filterValues.expectedClosingDate.to ? moment(filterValues.expectedClosingDate.to).format('YYYY-MM-DD') : ''}
                            onChange={(e) => handleDateRangeChange("expectedClosingDate", "to", e.target.value ? new Date(e.target.value) : null)}
                            placeholder="até"
                          />
                        </Col>
                      </Row>
                    </FormGroup>
                  </Col>
                  <Col md={3}>
                    <FormGroup className="mb-3">
                      <Label className="form-label" style={{ fontSize: "14px" }}>Data de cadastro (proposta)</Label>
                      <Row className="g-1">
                        <Col xs={6}>
                          <Input
                            bsSize="sm"
                            style={customStyles.dateInputStyle}
                            type="date"
                            value={filterValues.proposalRegistrationDate.from ? moment(filterValues.proposalRegistrationDate.from).format('YYYY-MM-DD') : ''}
                            onChange={(e) => handleDateRangeChange("proposalRegistrationDate", "from", e.target.value ? new Date(e.target.value) : null)}
                            placeholder="De"
                          />
                        </Col>
                        <Col xs={6}>
                          <Input
                            bsSize="sm"
                            style={customStyles.dateInputStyle}
                            type="date"
                            value={filterValues.proposalRegistrationDate.to ? moment(filterValues.proposalRegistrationDate.to).format('YYYY-MM-DD') : ''}
                            onChange={(e) => handleDateRangeChange("proposalRegistrationDate", "to", e.target.value ? new Date(e.target.value) : null)}
                            placeholder="até"
                          />
                        </Col>
                      </Row>
                    </FormGroup>
                  </Col>
                  <Col md={3}>
                    <FormGroup className="mb-3">
                      <Label className="form-label" style={{ fontSize: "14px" }}>Data de fechamento (proposta)</Label>
                      <Row className="g-1">
                        <Col xs={6}>
                          <Input
                            bsSize="sm"
                            style={customStyles.dateInputStyle}
                            type="date"
                            value={filterValues.proposalClosingDate.from ? moment(filterValues.proposalClosingDate.from).format('YYYY-MM-DD') : ''}
                            onChange={(e) => handleDateRangeChange("proposalClosingDate", "from", e.target.value ? new Date(e.target.value) : null)}
                            placeholder="De"
                          />
                        </Col>
                        <Col xs={6}>
                          <Input
                            bsSize="sm"
                            style={customStyles.dateInputStyle}
                            type="date"
                            value={filterValues.proposalClosingDate.to ? moment(filterValues.proposalClosingDate.to).format('YYYY-MM-DD') : ''}
                            onChange={(e) => handleDateRangeChange("proposalClosingDate", "to", e.target.value ? new Date(e.target.value) : null)}
                            placeholder="até"
                          />
                        </Col>
                      </Row>
                    </FormGroup>
                  </Col>
                  <Col md={3}>
                    <FormGroup className="mb-3">
                      <Label className="form-label" style={{ fontSize: "14px" }}>Data do último contato (oportunidade)</Label>
                      <Row className="g-1">
                        <Col xs={6}>
                          <Input
                            bsSize="sm"
                            style={customStyles.dateInputStyle}
                            type="date"
                            value={filterValues.lastContactDate.from ? moment(filterValues.lastContactDate.from).format('YYYY-MM-DD') : ''}
                            onChange={(e) => handleDateRangeChange("lastContactDate", "from", e.target.value ? new Date(e.target.value) : null)}
                            placeholder="De"
                          />
                        </Col>
                        <Col xs={6}>
                          <Input
                            bsSize="sm"
                            style={customStyles.dateInputStyle}
                            type="date"
                            value={filterValues.lastContactDate.to ? moment(filterValues.lastContactDate.to).format('YYYY-MM-DD') : ''}
                            onChange={(e) => handleDateRangeChange("lastContactDate", "to", e.target.value ? new Date(e.target.value) : null)}
                            placeholder="até"
                          />
                        </Col>
                      </Row>
                    </FormGroup>
                  </Col>
                </Row>

                <Row className="g-3 mb-2">
                  <Col md={3}>
                    <FormGroup className="mb-3">
                      <Label className="form-label" style={{ fontSize: "14px" }}>Etapa do funil</Label>
                      <Select
                        id="funnelStage"
                        options={funnelStageOptions}
                        value={filterValues.funnelStage}
                        onChange={(option) => handleInputChange("funnelStage", option)}
                        placeholder="Selecione uma etapa"
                        className="react-select select-sm"
                        classNamePrefix="select"
                        isClearable
                        styles={customStyles.selectStyles}
                      />
                    </FormGroup>
                  </Col>
                  <Col md={3}>
                    <FormGroup className="mb-3">
                      <Label className="form-label" style={{ fontSize: "14px" }}>Região</Label>
                      <Select
                        id="region"
                        options={regionOptions}
                        value={filterValues.region}
                        onChange={(option) => handleInputChange("region", option)}
                        placeholder="Selecione uma região"
                        className="react-select select-sm"
                        classNamePrefix="select"
                        isClearable
                        styles={customStyles.selectStyles}
                      />
                    </FormGroup>
                  </Col>
                  <Col md={3}>
                    <FormGroup className="mb-3">
                      <Label className="form-label" style={{ fontSize: "14px" }}>Microrregião</Label>
                      <Select
                        id="microregion"
                        options={microregionOptions}
                        value={filterValues.microregion}
                        onChange={(option) => handleInputChange("microregion", option)}
                        placeholder="Selecione uma microrregião"
                        className="react-select select-sm"
                        classNamePrefix="select"
                        isClearable
                        styles={customStyles.selectStyles}
                      />
                    </FormGroup>
                  </Col>
                  <Col md={3}>
                    <FormGroup className="mb-3">
                      <Label className="form-label" style={{ fontSize: "14px" }}>Atividades</Label>
                      <Select
                        id="activities"
                        options={activityOptions}
                        value={filterValues.activities}
                        onChange={(option) => handleInputChange("activities", option)}
                        placeholder="Selecione a relação com atividade"
                        className="react-select select-sm"
                        classNamePrefix="select"
                        isClearable
                        styles={customStyles.selectStyles}
                      />
                    </FormGroup>
                  </Col>
                </Row>

                <Row className="g-3 mb-2">
                  <Col md={4}>
                    <FormGroup className="mb-3">
                      <Label className="form-label" style={{ fontSize: "14px" }}>Temperatura</Label>
                      <Select
                        id="temperature"
                        options={temperatureOptions}
                        value={filterValues.temperature}
                        onChange={(option) => handleInputChange("temperature", option)}
                        placeholder="Selecione a temperatura"
                        className="react-select select-sm"
                        classNamePrefix="select"
                        isClearable
                        styles={customStyles.selectStyles}
                      />
                    </FormGroup>
                  </Col>
                  <Col md={4}>
                    <FormGroup className="mb-3">
                      <Label className="form-label" style={{ fontSize: "14px" }}>Probabilidade</Label>
                      <Select
                        id="probability"
                        options={probabilityOptions}
                        value={filterValues.probability}
                        onChange={(option) => handleInputChange("probability", option)}
                        placeholder="Selecione a probabilidade"
                        className="react-select select-sm"
                        classNamePrefix="select"
                        isClearable
                        styles={customStyles.selectStyles}
                      />
                    </FormGroup>
                  </Col>
                  <Col md={4}>
                    <FormGroup className="mb-3">
                      <Label className="form-label" style={{ fontSize: "14px" }}>Setor</Label>
                      <Select
                        id="sector"
                        options={sectorOptions}
                        value={filterValues.sector}
                        onChange={(option) => handleInputChange("sector", option)}
                        placeholder="Selecione um setor"
                        className="react-select select-sm"
                        classNamePrefix="select"
                        isClearable
                        styles={customStyles.selectStyles}
                      />
                    </FormGroup>
                  </Col>
                </Row>

                <Row className="g-3 mb-2">
                  <Col md={6}>
                    <FormGroup check className="mb-3">
                      <Label check className="form-label" style={{ fontSize: "14px" }}>
                        <Input
                          type="radio"
                          name="showOnlyStaged"
                          checked={!filterValues.showOnlyStaged}
                          onChange={() => handleInputChange("showOnlyStaged", false)}
                        />
                        Não
                      </Label>
                      <Label check className="form-label ms-3" style={{ fontSize: "14px" }}>
                        <Input
                          type="radio"
                          name="showOnlyStaged"
                          checked={filterValues.showOnlyStaged}
                          onChange={() => handleInputChange("showOnlyStaged", true)}
                        />
                        Sim
                      </Label>
                      <span className="ms-2" style={{ fontSize: "14px" }}>Exibir somente oportunidades estagnadas</span>
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup check className="mb-3">
                      <Label check className="form-label" style={{ fontSize: "14px" }}>
                        <Input
                          type="radio"
                          name="showUnreadEmails"
                          checked={!filterValues.showUnreadEmails}
                          onChange={() => handleInputChange("showUnreadEmails", false)}
                        />
                        Não
                      </Label>
                      <Label check className="form-label ms-3" style={{ fontSize: "14px" }}>
                        <Input
                          type="radio"
                          name="showUnreadEmails"
                          checked={filterValues.showUnreadEmails}
                          onChange={() => handleInputChange("showUnreadEmails", true)}
                        />
                        Sim
                      </Label>
                      <span className="ms-2" style={{ fontSize: "14px" }}>Exibir somente oportunidades com e-mails não lidos</span>
                    </FormGroup>
                  </Col>
                </Row>

                <Row className="mt-3">
                  <Col>
                    <div className="d-flex justify-content-end">
                      <Button color="light" size="md" className="me-2" onClick={clearFilters} style={{ fontSize: "14px" }}>
                        Limpar Filtros
                      </Button>
                      <Button color="primary" size="md" onClick={applyFilters} style={{ fontSize: "14px" }}>
                        Aplicar Filtros
                      </Button>
                    </div>
                  </Col>
                </Row>
              </Form>
            </CardBody>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Filter; 