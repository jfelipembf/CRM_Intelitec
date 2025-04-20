import React from "react";
import { Container, Row, Col, Button } from "reactstrap";
import { Link } from "react-router-dom";

// Componentes
import GoalForm from "./GoalForm";

const NewGoal = () => {
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <div className="page-title-box">
            <Row className="align-items-center mb-2">
              <Col>
                <h4 className="page-title mb-0">Nova Meta</h4>
              </Col>
              <Col className="text-end">
                <Link to="/metas">
                  <Button color="light">
                    <i className="bx bx-arrow-back font-size-16 align-middle me-1"></i>
                    Voltar para Metas
                  </Button>
                </Link>
              </Col>
            </Row>
            <p className="text-muted mt-1">Crie uma nova meta para acompanhar seus objetivos</p>
          </div>

          <Row>
            <Col xl={12}>
              <GoalForm />
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default NewGoal; 