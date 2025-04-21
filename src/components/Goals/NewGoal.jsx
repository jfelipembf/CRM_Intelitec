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
          <div className="d-flex justify-content-end align-items-center mb-4">
            <Link to="/metas">
              <Button color="light">
                <i className="bx bx-arrow-back font-size-16 align-middle me-1"></i>
                Voltar para Metas
              </Button>
            </Link>
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