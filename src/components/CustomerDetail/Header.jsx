import React, { useState } from "react";
import { Row, Col, Card, CardBody, Badge, Button } from "reactstrap";
import { Link } from "react-router-dom";

const CustomerDetailHeader = ({ customer }) => {
  // Dados iniciais do cliente
  const initialCustomerData = customer || {
    name: "Academia",
    currentStage: "Follow-Up",
    funnelName: "Funil Vendas",
    stageHistory: [
      { stage: "Cadastro", days: 1, completed: true },
      { stage: "Contato", days: 1, completed: true },
      { stage: "Reunião", days: 1, completed: true },
      { stage: "Proposta", days: 1, completed: true },
      { stage: "Follow-Up", days: 1, completed: true },
      { stage: "Negociação", days: 1, completed: false },
      { stage: "Fechamento", days: 1, completed: false },
    ],
  };

  // Estado para controlar os dados do cliente e permitir atualizações
  const [customerData, setCustomerData] = useState(initialCustomerData);

  // Funções para ações de botões
  const handleWinButton = () => {
    console.log("Oportunidade marcada como ganha");
    // Adicionar lógica para marcar como ganha
  };

  const handleLoseButton = () => {
    console.log("Oportunidade marcada como perdida");
    // Adicionar lógica para marcar como perdida
  };

  // Função modificada para preencher todas as etapas anteriores
  const toggleStageCompletion = (index) => {
    const updatedStageHistory = [...customerData.stageHistory];
    const isCompleting = !updatedStageHistory[index].completed;
    
    // Se estamos completando uma etapa, preencha todas as anteriores também
    if (isCompleting) {
      // Preenche a etapa atual e todas as anteriores
      for (let i = 0; i <= index; i++) {
        updatedStageHistory[i] = {
          ...updatedStageHistory[i],
          completed: true
        };
      }
    } else {
      // Se estamos desmarcando, apenas desmarca a etapa atual e todas as posteriores
      for (let i = index; i < updatedStageHistory.length; i++) {
        updatedStageHistory[i] = {
          ...updatedStageHistory[i],
          completed: false
        };
      }
    }
    
    // Atualiza também a etapa atual baseada na última etapa concluída
    let currentStage = updatedStageHistory[0].stage;
    for (let i = 0; i < updatedStageHistory.length; i++) {
      if (updatedStageHistory[i].completed) {
        currentStage = updatedStageHistory[i].stage;
      } else {
        break;
      }
    }
    
    setCustomerData({
      ...customerData,
      currentStage: currentStage,
      stageHistory: updatedStageHistory
    });
  };

  return (
    <Card className="mb-4">
      <CardBody>
        <Row className="align-items-center mb-3">
          <Col xs={8}>
            <h4 className="mb-0">{customerData.name}</h4>
            <p className="text-muted mb-2">
              <span className="me-2">Etapa atual: <strong>{customerData.currentStage}</strong></span>
              <span>Funil: <strong>{customerData.funnelName}</strong></span>
            </p>
          </Col>
          <Col xs={4} className="text-end">
            <div className="d-flex justify-content-end align-items-center">
              <div className="me-3">
                <Link to="#" className="btn btn-light btn-sm me-2">
                  <i className="mdi mdi-pencil"></i>
                </Link>
                <Link to="#" className="btn btn-light btn-sm">
                  <i className="mdi mdi-refresh"></i>
                </Link>
              </div>
              <div>
                <Button color="success" className="me-2" onClick={handleWinButton}>
                  <i className="mdi mdi-check-circle me-1"></i> Ganho
                </Button>
                <Button color="danger" onClick={handleLoseButton}>
                  <i className="mdi mdi-close-circle me-1"></i> Perdido
                </Button>
              </div>
            </div>
          </Col>
        </Row>

        {/* Pipeline progress visualization - com funcionalidade de clique em cascata */}
        <div className="d-flex overflow-auto pb-2" style={{ justifyContent: "center" }}>
          {customerData.stageHistory.map((stage, index) => (
            <div 
              key={index} 
              className="position-relative"
              style={{ 
                flex: "0 0 auto",
                marginLeft: index > 0 ? "-12px" : "0"
              }}
            >
              <div 
                className={`progress-step ${stage.completed ? "bg-success" : "bg-light"}`}
                style={{ 
                  width: "180px",
                  padding: "12px 0",
                  position: "relative",
                  clipPath: "polygon(0 0, calc(100% - 18px) 0, 100% 50%, calc(100% - 18px) 100%, 0 100%, 18px 50%)",
                  backgroundColor: stage.completed ? "#21c56b" : "#f0f3f5",
                  color: stage.completed ? "#ffffff" : "#495057",
                  fontWeight: "500",
                  zIndex: customerData.stageHistory.length - index,
                  fontSize: "0.95rem",
                  textAlign: "center",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                  cursor: "pointer",
                  transition: "all 0.3s ease"
                }}
                onClick={() => toggleStageCompletion(index)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-3px)";
                  e.currentTarget.style.boxShadow = "0 4px 8px rgba(0,0,0,0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.1)";
                }}
              >
                {stage.stage}
                <div className="small">Menos de {stage.days} dia</div>
              </div>
            </div>
          ))}
        </div>
      </CardBody>
      <div className="border-top p-3 bg-light">
        <div className="d-flex justify-content-between">
          <div>
            <span className="text-muted">Etapa atual:</span>
            <strong className="ms-2">{customerData.funnelName} » {customerData.currentStage}</strong>
          </div>
          <div>
            <Badge color="success" className="p-2">
              <i className="mdi mdi-check me-1"></i> Ganho
            </Badge>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CustomerDetailHeader; 