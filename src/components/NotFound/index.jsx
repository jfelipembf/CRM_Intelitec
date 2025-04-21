import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, Container, Row, Col } from 'reactstrap';

const NotFound = () => {
  return (
    <div className="page-content">
      <Container fluid>
        <Row className="justify-content-center">
          <Col xl="4" lg="5" md="7">
            <Card>
              <CardBody>
                <div className="text-center">
                  <h1 className="text-danger">404</h1>
                  <h4 className="text-uppercase text-danger mt-3">Página não encontrada</h4>
                  <p className="text-muted mt-3">Desculpe, a página que você está procurando não existe.</p>
                  <Link to="/dashboard" className="btn btn-success waves-effect waves-light mt-3">
                    Voltar para o Dashboard
                  </Link>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default NotFound;
