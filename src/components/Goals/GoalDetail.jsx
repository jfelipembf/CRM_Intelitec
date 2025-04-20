import React, { useState, useEffect } from "react";
import { 
  Container, 
  Row, 
  Col, 
  Card, 
  CardBody, 
  Breadcrumb, 
  BreadcrumbItem, 
  Badge, 
  Progress, 
  Button,
  Spinner,
  Table
} from "reactstrap";
import { Link, useParams, useNavigate } from "react-router-dom";

// Dados mock (simulação de API)
import { goalsMockData } from "./mockData";

const GoalDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [goal, setGoal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Dados fictícios de histórico de atualizações
  const updateHistory = [
    { date: "2023-10-12", value: 75000, percentage: 30, user: "Ana Silva" },
    { date: "2023-10-25", value: 125000, percentage: 50, user: "Carlos Mendes" },
    { date: "2023-11-08", value: 165000, percentage: 66, user: "Maria Souza" },
    { date: "2023-11-20", value: 185000, percentage: 74, user: "João Lima" }
  ];
  
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
  
  // Mapear status para badges
  const getStatusBadge = (status) => {
    switch (status) {
      case "completed":
        return <Badge color="success" className="rounded-pill px-3 py-2">Concluída</Badge>;
      case "in-progress":
        return <Badge color="info" className="rounded-pill px-3 py-2">Em Andamento</Badge>;
      case "upcoming":
        return <Badge color="warning" className="rounded-pill px-3 py-2">Futura</Badge>;
      default:
        return <Badge color="secondary" className="rounded-pill px-3 py-2">Indefinida</Badge>;
    }
  };
  
  // Mapear períodos para exibição amigável
  const getPeriodLabel = (periodType, period) => {
    switch (periodType) {
      case "month":
        return `Mensal - ${period}`;
      case "quarter":
        return `Trimestre ${period}`;
      case "semester":
        return `Semestre ${period}`;
      case "year":
        return `Anual - ${period}`;
      default:
        return period;
    }
  };
  
  // Formatar valor financeiro
  const formatCurrency = (value) => {
    if (!value && value !== 0) return '-';
    return `R$ ${Number(value).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
  };
  
  // Formatar data
  const formatDate = (dateStr) => {
    if (!dateStr) return '-';
    const date = new Date(dateStr);
    return date.toLocaleDateString('pt-BR');
  };
  
  // Redirecionar para a página de edição
  const handleEdit = () => {
    navigate(`/metas/editar/${id}`);
  };

  if (loading) {
    return (
      <div className="page-content">
        <Container fluid>
          <div className="text-center p-5">
            <Spinner color="primary" />
            <p className="mt-3 text-muted">Carregando dados da meta...</p>
          </div>
        </Container>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="page-content">
        <Container fluid>
          <div className="text-center p-5">
            <i className="bx bx-error-circle text-danger font-size-64 d-block mb-3"></i>
            <h5 className="text-muted mb-3">{error}</h5>
            <Link to="/metas" className="btn btn-primary btn-sm">
              Voltar para Metas
            </Link>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Row className="mb-4">
            <Col>
              <div className="d-flex align-items-center">
                <div>
                  <h4 className="font-weight-bold mb-1">Detalhes da Meta</h4>
                  <Breadcrumb className="mb-0 p-0 bg-transparent">
                    <BreadcrumbItem>
                      <Link to="/dashboard">Dashboard</Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                      <Link to="/metas">Metas</Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem active>{goal.title}</BreadcrumbItem>
                  </Breadcrumb>
                </div>
              </div>
            </Col>
          </Row>

          <Row>
            <Col xl={8}>
              <Card className="shadow-sm border-0 mb-4" style={{ borderRadius: "12px" }}>
                <CardBody>
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <div>
                      <h4 className="mb-1">{goal.title}</h4>
                      <div className="d-flex align-items-center">
                        <div className={`avatar-xs bg-soft-primary rounded-circle d-inline-flex align-items-center justify-content-center me-2`}>
                          <i className={`bx ${goal.icon} text-primary font-size-14`}></i>
                        </div>
                        <span className="text-muted">{goal.type} • {getPeriodLabel(goal.periodType, goal.period)}</span>
                      </div>
                    </div>
                    <div>
                      {getStatusBadge(goal.status)}
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <h6 className="text-muted mb-3">Descrição</h6>
                    <p className="text-muted">{goal.description || "Nenhuma descrição disponível."}</p>
                  </div>
                  
                  <div className="mt-4">
                    <h6 className="text-muted mb-3">Progresso</h6>
                    <div className="d-flex justify-content-between mb-2">
                      <span>{goal.completion}% concluído</span>
                      <span className="text-muted">
                        Meta: {goal.type === "Financeira" 
                          ? formatCurrency(goal.targetValue) 
                          : `${goal.targetValue} ${goal.unit || "unidades"}`}
                      </span>
                    </div>
                    <Progress
                      className="progress-lg"
                      color={goal.completion >= 70 ? "success" : goal.completion >= 40 ? "warning" : "danger"}
                      value={goal.completion}
                      style={{ height: "10px", borderRadius: "5px" }}
                    />
                    
                    <div className="d-flex justify-content-between align-items-center mt-3">
                      <div>
                        <h5 className="mb-1">{goal.type === "Financeira" 
                          ? formatCurrency(goal.currentValue) 
                          : `${goal.currentValue} ${goal.unit || "unidades"}`}</h5>
                        <span className="text-muted small">Valor atual</span>
                      </div>
                      <div className="text-end">
                        <h5 className="mb-1">{formatCurrency(goal.targetValue - goal.currentValue)}</h5>
                        <span className="text-muted small">Faltando para concluir</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <h6 className="text-muted mb-3">Histórico de Atualizações</h6>
                    <div className="table-responsive">
                      <Table className="table-centered table-nowrap mb-0">
                        <thead className="table-light">
                          <tr>
                            <th>Data</th>
                            <th>Valor</th>
                            <th>Progresso</th>
                            <th>Atualizado por</th>
                          </tr>
                        </thead>
                        <tbody>
                          {updateHistory.map((update, index) => (
                            <tr key={index}>
                              <td>{formatDate(update.date)}</td>
                              <td>{formatCurrency(update.value)}</td>
                              <td>
                                <div className="d-flex align-items-center">
                                  <div style={{ width: "50px" }}>
                                    <Progress
                                      color={update.percentage >= 70 ? "success" : update.percentage >= 40 ? "warning" : "danger"}
                                      value={update.percentage}
                                      style={{ height: "5px" }}
                                    />
                                  </div>
                                  <span className="ms-2">{update.percentage}%</span>
                                </div>
                              </td>
                              <td>{update.user}</td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
            
            <Col xl={4}>
              <Card className="shadow-sm border-0 mb-4" style={{ borderRadius: "12px" }}>
                <CardBody>
                  <h5 className="mb-4">Informações da Meta</h5>
                  
                  <div className="mb-4">
                    <h6 className="text-muted mb-3">Período</h6>
                    <div className="d-flex justify-content-between mb-2">
                      <span className="text-muted">Tipo</span>
                      <span>{(() => {
                        switch (goal.periodType) {
                          case "month": return "Mensal";
                          case "quarter": return "Trimestral";
                          case "semester": return "Semestral";
                          case "year": return "Anual";
                          default: return goal.periodType;
                        }
                      })()}</span>
                    </div>
                    <div className="d-flex justify-content-between mb-2">
                      <span className="text-muted">Período</span>
                      <span>{goal.period}</span>
                    </div>
                    <div className="d-flex justify-content-between mb-2">
                      <span className="text-muted">Data de Início</span>
                      <span>{formatDate(goal.startDate)}</span>
                    </div>
                    <div className="d-flex justify-content-between">
                      <span className="text-muted">Data de Término</span>
                      <span>{formatDate(goal.endDate)}</span>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <h6 className="text-muted mb-3">Responsáveis</h6>
                    <div className="d-flex justify-content-between mb-2">
                      <span className="text-muted">Responsável</span>
                      <span>{goal.responsible || "-"}</span>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <h6 className="text-muted mb-3">Observações</h6>
                    <p className="text-muted">{goal.notes || "Nenhuma observação adicionada."}</p>
                  </div>
                  
                  <div className="d-grid gap-2 mt-4">
                    <Button color="primary" onClick={handleEdit}>
                      <i className="bx bx-edit-alt me-1"></i> Editar Meta
                    </Button>
                    <Button color="success" outline>
                      <i className="bx bx-refresh me-1"></i> Atualizar Progresso
                    </Button>
                    <Button color="danger" outline>
                      <i className="bx bx-trash me-1"></i> Excluir Meta
                    </Button>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default GoalDetail; 