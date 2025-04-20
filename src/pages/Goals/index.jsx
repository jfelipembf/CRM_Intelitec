import React, { useState } from "react";
import { 
  Container, 
  Row, 
  Col, 
  Card, 
  CardBody, 
  CardTitle, 
  Button, 
  ButtonGroup,
  Badge,
  Progress
} from "reactstrap";
import { Link } from "react-router-dom";

// Componentes
import GoalsList from "../../components/Goals/GoalsList";
import GoalsSummary from "../../components/Goals/GoalsSummary";

// Dados de teste (simulando dados da API)
import { goalsMockData } from "../../components/Goals/mockData";

const Goals = () => {
  // Estados
  const [activeTab, setActiveTab] = useState("todos");
  const [goals, setGoals] = useState(goalsMockData);
  const [selectedPeriod, setSelectedPeriod] = useState("todos");
  
  // Filtragem por período
  const filteredGoals = selectedPeriod === "todos" 
    ? goals 
    : goals.filter(goal => goal.periodType === selectedPeriod);
  
  // Estatísticas rápidas
  const totalGoals = goals.length;
  const completedGoals = goals.filter(goal => goal.status === "completed").length;
  const inProgressGoals = goals.filter(goal => goal.status === "in-progress").length;
  const upcomingGoals = goals.filter(goal => goal.status === "upcoming").length;
  
  // Média de conclusão das metas
  const averageCompletion = goals.length > 0 
    ? Math.round(goals.reduce((sum, goal) => sum + goal.completion, 0) / goals.length) 
    : 0;

  // Lidar com mudança de filtro por status
  const handleStatusFilter = (status) => {
    setActiveTab(status);
  };
  
  // Lidar com mudança de filtro por período
  const handlePeriodFilter = (period) => {
    setSelectedPeriod(period);
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <div className="page-title-box">
            <Row className="align-items-center mb-2">
              <Col>
                <h4 className="page-title mb-0">Metas e Objetivos</h4>
              </Col>
              <Col className="text-end">
                <Link to="/metas/nova">
                  <Button color="primary">
                    <i className="bx bx-plus font-size-16 align-middle me-1"></i>
                    Nova Meta
                  </Button>
                </Link>
              </Col>
            </Row>
            <p className="text-muted mt-1">Gerencie e acompanhe o progresso das suas metas</p>
          </div>
          
          {/* Cards de Resumo */}
          <GoalsSummary 
            totalGoals={totalGoals}
            completedGoals={completedGoals}
            inProgressGoals={inProgressGoals}
            upcomingGoals={upcomingGoals}
            averageCompletion={averageCompletion}
          />
          
          {/* Lista de Metas */}
          <Row>
            <Col xl={12}>
              <Card className="shadow-sm border-0" style={{ borderRadius: "10px" }}>
                <CardBody>
                  <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">
                    <div>
                      <CardTitle tag="h5" className="mb-0">Minhas Metas</CardTitle>
                    </div>
                    <div className="d-flex gap-2 flex-wrap">
                      {/* Filtro por Período */}
                      <ButtonGroup className="me-3">
                        <Button 
                          color="light" 
                          size="sm" 
                          outline={selectedPeriod !== "todos"}
                          onClick={() => handlePeriodFilter("todos")}
                        >
                          Todos
                        </Button>
                        <Button 
                          color="light" 
                          size="sm" 
                          outline={selectedPeriod !== "month"}
                          onClick={() => handlePeriodFilter("month")}
                        >
                          Mensal
                        </Button>
                        <Button 
                          color="light" 
                          size="sm" 
                          outline={selectedPeriod !== "quarter"}
                          onClick={() => handlePeriodFilter("quarter")}
                        >
                          Trimestral
                        </Button>
                        <Button 
                          color="light" 
                          size="sm" 
                          outline={selectedPeriod !== "semester"}
                          onClick={() => handlePeriodFilter("semester")}
                        >
                          Semestral
                        </Button>
                        <Button 
                          color="light" 
                          size="sm" 
                          outline={selectedPeriod !== "year"}
                          onClick={() => handlePeriodFilter("year")}
                        >
                          Anual
                        </Button>
                      </ButtonGroup>
                      
                      {/* Filtro por Status */}
                      <ButtonGroup>
                        <Button 
                          color="light" 
                          size="sm" 
                          outline={activeTab !== "todos"}
                          onClick={() => handleStatusFilter("todos")}
                        >
                          Todos
                        </Button>
                        <Button 
                          color="light" 
                          size="sm" 
                          outline={activeTab !== "in-progress"}
                          onClick={() => handleStatusFilter("in-progress")}
                        >
                          Em Andamento
                        </Button>
                        <Button 
                          color="light" 
                          size="sm" 
                          outline={activeTab !== "completed"}
                          onClick={() => handleStatusFilter("completed")}
                        >
                          Concluídas
                        </Button>
                        <Button 
                          color="light" 
                          size="sm" 
                          outline={activeTab !== "upcoming"}
                          onClick={() => handleStatusFilter("upcoming")}
                        >
                          Futuras
                        </Button>
                      </ButtonGroup>
                    </div>
                  </div>
                  
                  {/* Lista de Metas */}
                  <GoalsList 
                    goals={filteredGoals} 
                    activeTab={activeTab} 
                  />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Goals; 