import React, { useState } from "react";
import PropTypes from "prop-types";
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
  Container
} from "reactstrap";

const FilterOpportunities = ({ isOpen, toggle }) => {
  // Estado para armazenar os valores dos filtros
  const [filterData, setFilterData] = useState({
    title: "",
    status: "Aberto",
    situation: "",
    origin: "",
    company: "",
    person: "",
    segment: "",
    tags: "",
    state: "",
    city: "",
    product: "",
    lossReasons: "",
    valuePnS: { min: "", max: "" },
    valueMRR: { min: "", max: "" },
    registrationDate: { min: "", max: "" },
    closingDate: { min: "", max: "" },
    expectedClosingDate: { min: "", max: "" },
    proposalRegistrationDate: { min: "", max: "" },
    proposalClosingDate: { min: "", max: "" },
    lastContactDate: { min: "", max: "" },
    funnelStage: "",
    region: "",
    microregion: "",
    activities: "",
    temperature: "",
    probability: "",
    sector: "",
    showStagedOnly: false,
    showUnreadEmailsOnly: false
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
      situation: "",
      origin: "",
      company: "",
      person: "",
      segment: "",
      tags: "",
      state: "",
      city: "",
      product: "",
      lossReasons: "",
      valuePnS: { min: "", max: "" },
      valueMRR: { min: "", max: "" },
      registrationDate: { min: "", max: "" },
      closingDate: { min: "", max: "" },
      expectedClosingDate: { min: "", max: "" },
      proposalRegistrationDate: { min: "", max: "" },
      proposalClosingDate: { min: "", max: "" },
      lastContactDate: { min: "", max: "" },
      funnelStage: "",
      region: "",
      microregion: "",
      activities: "",
      temperature: "",
      probability: "",
      sector: "",
      showStagedOnly: false,
      showUnreadEmailsOnly: false
    });
  };

  if (!isOpen) return null;

  return (
    <div className="filter-screen">
      <div className="page-content">
        <Container fluid>
          <Card>
            <CardHeader className="bg-light">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h4 className="mb-0">Filtrar oportunidades</h4>
                  <div className="small text-muted">Defina os critérios para filtrar as oportunidades no funil</div>
                </div>
                <button type="button" className="btn-close" onClick={toggle} aria-label="Fechar"></button>
              </div>
            </CardHeader>
            <CardBody>
              <Row>
                <Col md={3}>
                  <FormGroup>
                    <Label className="form-label">Título</Label>
                    <Input
                      type="text"
                      name="title"
                      value={filterData.title}
                      onChange={handleInputChange}
                      placeholder="Título da oportunidade"
                      className="form-control"
                    />
                  </FormGroup>
                </Col>
                <Col md={3}>
                  <FormGroup>
                    <Label className="form-label">Status</Label>
                    <div>
                      <Badge color="light" className="px-3 py-2 me-2 mb-2">
                        <i className="mdi mdi-check-circle me-1 text-success"></i> Aberto
                      </Badge>
                      {/* Outros status poderiam ser adicionados aqui */}
                    </div>
                  </FormGroup>
                </Col>
                <Col md={3}>
                  <FormGroup>
                    <Label className="form-label">Situação</Label>
                    <Input
                      type="select"
                      name="situation"
                      value={filterData.situation}
                      onChange={handleInputChange}
                      className="form-select"
                    >
                      <option value="">Selecione a situação do negócio</option>
                      <option value="Novo">Novo</option>
                      <option value="Em andamento">Em andamento</option>
                      <option value="Estagnado">Estagnado</option>
                      <option value="Vencido">Vencido</option>
                    </Input>
                  </FormGroup>
                </Col>
                <Col md={3}>
                  <FormGroup>
                    <Label className="form-label">Origem</Label>
                    <Input
                      type="select"
                      name="origin"
                      value={filterData.origin}
                      onChange={handleInputChange}
                      className="form-select"
                    >
                      <option value="">Selecione uma origem</option>
                      <option value="Indicação">Indicação</option>
                      <option value="Website">Website</option>
                      <option value="Redes Sociais">Redes Sociais</option>
                      <option value="Evento">Evento</option>
                    </Input>
                  </FormGroup>
                </Col>
              </Row>

              <Row>
                <Col md={3}>
                  <FormGroup>
                    <Label className="form-label">Empresa</Label>
                    <Input
                      type="select"
                      name="company"
                      value={filterData.company}
                      onChange={handleInputChange}
                      className="form-select"
                    >
                      <option value="">Selecione uma empresa</option>
                    </Input>
                  </FormGroup>
                </Col>
                <Col md={3}>
                  <FormGroup>
                    <Label className="form-label">Pessoa</Label>
                    <Input
                      type="select"
                      name="person"
                      value={filterData.person}
                      onChange={handleInputChange}
                      className="form-select"
                    >
                      <option value="">Selecione uma pessoa</option>
                    </Input>
                  </FormGroup>
                </Col>
                <Col md={3}>
                  <FormGroup>
                    <Label className="form-label">Segmento</Label>
                    <Input
                      type="select"
                      name="segment"
                      value={filterData.segment}
                      onChange={handleInputChange}
                      className="form-select"
                    >
                      <option value="">Selecione um segmento</option>
                    </Input>
                  </FormGroup>
                </Col>
                <Col md={3}>
                  <FormGroup>
                    <Label className="form-label">Tags</Label>
                    <Input
                      type="select"
                      name="tags"
                      value={filterData.tags}
                      onChange={handleInputChange}
                      className="form-select"
                    >
                      <option value="">Selecione uma tag</option>
                    </Input>
                  </FormGroup>
                </Col>
              </Row>

              <Row>
                <Col md={3}>
                  <FormGroup>
                    <Label className="form-label">Estado</Label>
                    <Input
                      type="select"
                      name="state"
                      value={filterData.state}
                      onChange={handleInputChange}
                      className="form-select"
                    >
                      <option value="">Selecione um estado</option>
                      <option value="SP">São Paulo</option>
                      <option value="RJ">Rio de Janeiro</option>
                      <option value="MG">Minas Gerais</option>
                      {/* Outros estados poderiam ser adicionados aqui */}
                    </Input>
                  </FormGroup>
                </Col>
                <Col md={3}>
                  <FormGroup>
                    <Label className="form-label">Cidade</Label>
                    <Input
                      type="select"
                      name="city"
                      value={filterData.city}
                      onChange={handleInputChange}
                      className="form-select"
                    >
                      <option value="">Selecione uma cidade</option>
                    </Input>
                  </FormGroup>
                </Col>
                <Col md={3}>
                  <FormGroup>
                    <Label className="form-label">Produto</Label>
                    <Input
                      type="select"
                      name="product"
                      value={filterData.product}
                      onChange={handleInputChange}
                      className="form-select"
                    >
                      <option value="">Selecione um produto</option>
                    </Input>
                  </FormGroup>
                </Col>
                <Col md={3}>
                  <FormGroup>
                    <Label className="form-label">Motivos de perda</Label>
                    <Input
                      type="select"
                      name="lossReasons"
                      value={filterData.lossReasons}
                      onChange={handleInputChange}
                      className="form-select"
                    >
                      <option value="">Selecione um motivo de perda</option>
                    </Input>
                  </FormGroup>
                </Col>
              </Row>

              <Row>
                <Col md={3}>
                  <FormGroup>
                    <Label className="form-label">Valor (P&S)</Label>
                    <div className="d-flex">
                      <Input
                        type="number"
                        value={filterData.valuePnS.min}
                        onChange={(e) => handleRangeChange(e, "valuePnS", "min")}
                        placeholder="0"
                        className="form-control"
                      />
                      <div className="mx-2 d-flex align-items-center">até</div>
                      <Input
                        type="number"
                        value={filterData.valuePnS.max}
                        onChange={(e) => handleRangeChange(e, "valuePnS", "max")}
                        placeholder="0"
                        className="form-control"
                      />
                    </div>
                  </FormGroup>
                </Col>
                <Col md={3}>
                  <FormGroup>
                    <Label className="form-label">Valor (MRR)</Label>
                    <div className="d-flex">
                      <Input
                        type="number"
                        value={filterData.valueMRR.min}
                        onChange={(e) => handleRangeChange(e, "valueMRR", "min")}
                        placeholder="0"
                        className="form-control"
                      />
                      <div className="mx-2 d-flex align-items-center">até</div>
                      <Input
                        type="number"
                        value={filterData.valueMRR.max}
                        onChange={(e) => handleRangeChange(e, "valueMRR", "max")}
                        placeholder="0"
                        className="form-control"
                      />
                    </div>
                  </FormGroup>
                </Col>
                <Col md={3}>
                  <FormGroup>
                    <Label className="form-label">Data de cadastro (oportunidade)</Label>
                    <div className="d-flex">
                      <Input
                        type="date"
                        value={filterData.registrationDate.min}
                        onChange={(e) => handleRangeChange(e, "registrationDate", "min")}
                        className="form-control"
                      />
                      <div className="mx-2 d-flex align-items-center">até</div>
                      <Input
                        type="date"
                        value={filterData.registrationDate.max}
                        onChange={(e) => handleRangeChange(e, "registrationDate", "max")}
                        className="form-control"
                      />
                    </div>
                  </FormGroup>
                </Col>
                <Col md={3}>
                  <FormGroup>
                    <Label className="form-label">Data de fechamento (oportunidade)</Label>
                    <div className="d-flex">
                      <Input
                        type="date"
                        value={filterData.closingDate.min}
                        onChange={(e) => handleRangeChange(e, "closingDate", "min")}
                        className="form-control"
                      />
                      <div className="mx-2 d-flex align-items-center">até</div>
                      <Input
                        type="date"
                        value={filterData.closingDate.max}
                        onChange={(e) => handleRangeChange(e, "closingDate", "max")}
                        className="form-control"
                      />
                    </div>
                  </FormGroup>
                </Col>
              </Row>

              <Row>
                <Col md={3}>
                  <FormGroup>
                    <Label className="form-label">Data de previsão de fechamento (oportunidade)</Label>
                    <div className="d-flex">
                      <Input
                        type="date"
                        value={filterData.expectedClosingDate.min}
                        onChange={(e) => handleRangeChange(e, "expectedClosingDate", "min")}
                        className="form-control"
                      />
                      <div className="mx-2 d-flex align-items-center">até</div>
                      <Input
                        type="date"
                        value={filterData.expectedClosingDate.max}
                        onChange={(e) => handleRangeChange(e, "expectedClosingDate", "max")}
                        className="form-control"
                      />
                    </div>
                  </FormGroup>
                </Col>
                <Col md={3}>
                  <FormGroup>
                    <Label className="form-label">Data de cadastro (proposta)</Label>
                    <div className="d-flex">
                      <Input
                        type="date"
                        value={filterData.proposalRegistrationDate.min}
                        onChange={(e) => handleRangeChange(e, "proposalRegistrationDate", "min")}
                        className="form-control"
                      />
                      <div className="mx-2 d-flex align-items-center">até</div>
                      <Input
                        type="date"
                        value={filterData.proposalRegistrationDate.max}
                        onChange={(e) => handleRangeChange(e, "proposalRegistrationDate", "max")}
                        className="form-control"
                      />
                    </div>
                  </FormGroup>
                </Col>
                <Col md={3}>
                  <FormGroup>
                    <Label className="form-label">Data de fechamento (proposta)</Label>
                    <div className="d-flex">
                      <Input
                        type="date"
                        value={filterData.proposalClosingDate.min}
                        onChange={(e) => handleRangeChange(e, "proposalClosingDate", "min")}
                        className="form-control"
                      />
                      <div className="mx-2 d-flex align-items-center">até</div>
                      <Input
                        type="date"
                        value={filterData.proposalClosingDate.max}
                        onChange={(e) => handleRangeChange(e, "proposalClosingDate", "max")}
                        className="form-control"
                      />
                    </div>
                  </FormGroup>
                </Col>
                <Col md={3}>
                  <FormGroup>
                    <Label className="form-label">Data do último contato (oportunidade)</Label>
                    <div className="d-flex">
                      <Input
                        type="date"
                        value={filterData.lastContactDate.min}
                        onChange={(e) => handleRangeChange(e, "lastContactDate", "min")}
                        className="form-control"
                      />
                      <div className="mx-2 d-flex align-items-center">até</div>
                      <Input
                        type="date"
                        value={filterData.lastContactDate.max}
                        onChange={(e) => handleRangeChange(e, "lastContactDate", "max")}
                        className="form-control"
                      />
                    </div>
                  </FormGroup>
                </Col>
              </Row>

              <Row>
                <Col md={3}>
                  <FormGroup>
                    <Label className="form-label">Etapa do funil</Label>
                    <Input
                      type="select"
                      name="funnelStage"
                      value={filterData.funnelStage}
                      onChange={handleInputChange}
                      className="form-select"
                    >
                      <option value="">Selecione uma etapa</option>
                      <option value="Cadastro">Cadastro</option>
                      <option value="Contato">Contato</option>
                      <option value="Reunião">Reunião</option>
                      <option value="Proposta">Proposta</option>
                      <option value="Follow-Up">Follow-Up</option>
                      <option value="Fechamento">Fechamento</option>
                    </Input>
                  </FormGroup>
                </Col>
                <Col md={3}>
                  <FormGroup>
                    <Label className="form-label">Região</Label>
                    <Input
                      type="select"
                      name="region"
                      value={filterData.region}
                      onChange={handleInputChange}
                      className="form-select"
                    >
                      <option value="">Selecione uma região</option>
                    </Input>
                  </FormGroup>
                </Col>
                <Col md={3}>
                  <FormGroup>
                    <Label className="form-label">Microrregião</Label>
                    <Input
                      type="select"
                      name="microregion"
                      value={filterData.microregion}
                      onChange={handleInputChange}
                      className="form-select"
                    >
                      <option value="">Selecione uma microrregião</option>
                    </Input>
                  </FormGroup>
                </Col>
                <Col md={3}>
                  <FormGroup>
                    <Label className="form-label">Atividades</Label>
                    <Input
                      type="select"
                      name="activities"
                      value={filterData.activities}
                      onChange={handleInputChange}
                      className="form-select"
                    >
                      <option value="">Selecione a relação com atividade</option>
                    </Input>
                  </FormGroup>
                </Col>
              </Row>

              <Row>
                <Col md={4}>
                  <FormGroup>
                    <Label className="form-label">Temperatura</Label>
                    <Input
                      type="select"
                      name="temperature"
                      value={filterData.temperature}
                      onChange={handleInputChange}
                      className="form-select"
                    >
                      <option value="">Selecione a temperatura</option>
                      <option value="Frio">Frio</option>
                      <option value="Morno">Morno</option>
                      <option value="Quente">Quente</option>
                    </Input>
                  </FormGroup>
                </Col>
                <Col md={4}>
                  <FormGroup>
                    <Label className="form-label">Probabilidade</Label>
                    <Input
                      type="select"
                      name="probability"
                      value={filterData.probability}
                      onChange={handleInputChange}
                      className="form-select"
                    >
                      <option value="">Selecione a probabilidade</option>
                      <option value="Baixa">Baixa</option>
                      <option value="Média">Média</option>
                      <option value="Alta">Alta</option>
                    </Input>
                  </FormGroup>
                </Col>
                <Col md={4}>
                  <FormGroup>
                    <Label className="form-label">Setor</Label>
                    <Input
                      type="select"
                      name="sector"
                      value={filterData.sector}
                      onChange={handleInputChange}
                      className="form-select"
                    >
                      <option value="">Selecione um setor</option>
                    </Input>
                  </FormGroup>
                </Col>
              </Row>

              <Row className="mt-2">
                <Col md={6}>
                  <FormGroup check className="mb-3">
                    <Input
                      type="checkbox"
                      name="showStagedOnly"
                      id="showStagedOnly"
                      checked={filterData.showStagedOnly}
                      onChange={handleInputChange}
                    />
                    <Label check for="showStagedOnly" className="form-check-label">
                      Exibir somente oportunidades estagnadas
                    </Label>
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup check className="mb-3">
                    <Input
                      type="checkbox"
                      name="showUnreadEmailsOnly"
                      id="showUnreadEmailsOnly"
                      checked={filterData.showUnreadEmailsOnly}
                      onChange={handleInputChange}
                    />
                    <Label check for="showUnreadEmailsOnly" className="form-check-label">
                      Exibir somente oportunidades com e-mails não lidos
                    </Label>
                  </FormGroup>
                </Col>
              </Row>
            </CardBody>
            <CardFooter className="bg-light d-flex justify-content-end">
              <Button color="light" className="me-2" onClick={handleClearFilters}>
                Limpar filtros
              </Button>
              <Button color="primary" onClick={handleApplyFilter}>
                Aplicar filtros
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