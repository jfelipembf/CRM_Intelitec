import PropTypes from "prop-types";
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import {
  Card,
  CardBody,
  CardHeader,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Badge,
  InputGroup,
  InputGroupText
} from 'reactstrap';
import { formatCurrency } from '../../helpers/format';
import { SPIN_STEPS } from '../../config/spin';
import './attendance.css';

//i18n
import { withTranslation } from "react-i18next";

const Attendance = (props) => {
  const { t } = props;
  const { id } = useParams();
  const [opportunity, setOpportunity] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});


  useEffect(() => {
    // Simulação de busca de dados da oportunidade
    import('../../components/Pipeline/mockData').then(({ opportunities }) => {
      const opp = opportunities.find(opp => opp.id === parseInt(id));
      setOpportunity(opp);
    });
  }, [id]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleNextStep = () => {
    if (currentStep < SPIN_STEPS.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implementar lógica de envio do formulário
    console.log('Form submitted:', formData);
  };

  if (!opportunity) return <div>Loading...</div>;

  const currentStepData = SPIN_STEPS.find(step => step.id === currentStep);

  return (
    <div className="page-content">
      <Container fluid={true}>
        {/* Cards explicativos do SPIN */}
        <Row className="mb-4">
          {SPIN_STEPS.map((step) => (
            <Col md="6" key={step.id}>
              <Card className="pipeline-card mb-3">
                <CardHeader className="pipeline-stage-header">
                  <h5 className="mb-0">{step.title}</h5>
                </CardHeader>
                <CardBody>
                  <div className="mb-3">
                    <h6 className="text-muted mb-2">{step.description}</h6>
                    <div className="d-flex align-items-start">
                      <div className="flex-grow-1">
                        <h6 className="text-primary mb-1">{step.explanation.title}</h6>
                        <p className="text-muted mb-0">{step.explanation.content}</p>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Card de informações do cliente */}
        <Card className="pipeline-card mb-4">
          <CardHeader className="pipeline-stage-header d-flex justify-content-between align-items-center">
            <h5 className="mb-0">Informações do Cliente</h5>
            <div className="d-flex align-items-center">
              <Badge color="primary" className="me-2">Método SPIN</Badge>
              <Badge color="info">Etapa {currentStep} de {SPIN_STEPS.length}</Badge>
            </div>
          </CardHeader>
          <CardBody>
            <Row>
              <Col md="6">
                <div className="mb-3">
                  <h6 className="text-muted mb-1">Empresa</h6>
                  <p className="mb-0">{opportunity.company}</p>
                </div>
                <div className="mb-3">
                  <h6 className="text-muted mb-1">Responsável</h6>
                  <p className="mb-0">{opportunity.responsible}</p>
                </div>
                <div className="mb-3">
                  <h6 className="text-muted mb-1">Oportunidade</h6>
                  <p className="mb-0">{opportunity.name}</p>
                </div>
                <div className="mb-3">
                  <h6 className="text-muted mb-1">Valor</h6>
                  <p className="mb-0">{formatCurrency(opportunity.amount)}</p>
                </div>
              </Col>
            </Row>
          </CardBody>
        </Card>

        {/* Formulários SPIN */}
        <Row>
          {SPIN_STEPS.map((step) => (
            <Col md="6" key={step.id}>
              <Card className="pipeline-card mb-4">
                <CardHeader className="pipeline-stage-header d-flex justify-content-between align-items-center">
                  <h5 className="mb-0">{step.title}</h5>

                </CardHeader>
                <CardBody>
                  <Form onSubmit={handleSubmit} className="needs-validation" noValidate>
                    {step.fields.map(field => (
                      <FormGroup key={field.id} className="mb-3">
                        <Label for={field.id}>{field.label}</Label>
                        <InputGroup>
                          <InputGroupText>
                            <i className="mdi mdi-format-text"></i>
                          </InputGroupText>
                          <Input
                            type={field.type}
                            id={field.id}
                            value={formData[field.id] || ''}
                            onChange={handleInputChange}
                            required
                            className="form-control"
                          />
                        </InputGroup>
                      </FormGroup>
                    ))}
                  </Form>
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default withTranslation()(Attendance);

Attendance.propTypes = {
  t: PropTypes.any,
};
