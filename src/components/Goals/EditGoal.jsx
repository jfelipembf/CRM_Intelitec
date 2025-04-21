import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Spinner } from "reactstrap";
import { Link, useParams } from "react-router-dom";

// Componentes
import GoalForm from "./GoalForm";

// Dados mock (simulação de API)
import { goalsMockData } from "./mockData";

const EditGoal = () => {
  const { id } = useParams();
  const [goal, setGoal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    // Simulando uma chamada de API para buscar a meta pelo ID
    const fetchGoal = () => {
      setLoading(true);
      
      try {
        // Simulação de busca no banco de dados
        setTimeout(() => {
          const foundGoal = goalsMockData.find(g => g.id.toString() === id);
          
          if (foundGoal) {
            setGoal(foundGoal);
            setLoading(false);
          } else {
            setError("Meta não encontrada.");
            setLoading(false);
          }
        }, 800); // Simulação de delay de rede
      } catch (err) {
        setError("Erro ao carregar os dados da meta. Tente novamente.");
        setLoading(false);
      }
    };
    
    fetchGoal();
  }, [id]);

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
          {!loading && !error && goal && (
            <p className="text-muted mt-1">Editando: {goal.title}</p>
          )}

          <Row>
            <Col xl={12}>
              {loading ? (
                <div className="text-center p-5">
                  <Spinner color="primary" />
                  <p className="mt-3 text-muted">Carregando dados da meta...</p>
                </div>
              ) : error ? (
                <div className="text-center p-5">
                  <i className="bx bx-error-circle text-danger font-size-64 d-block mb-3"></i>
                  <h5 className="text-muted mb-3">{error}</h5>
                  <Link to="/metas" className="btn btn-primary">
                    Voltar para Metas
                  </Link>
                </div>
              ) : (
                <GoalForm goal={goal} isEditing={true} />
              )}
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default EditGoal; 