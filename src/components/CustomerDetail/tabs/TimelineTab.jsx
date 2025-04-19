import React, { useState } from "react";
import { Input, Button } from "reactstrap";

const TimelineTab = ({ customer }) => {
  const [historyFilter, setHistoryFilter] = useState("");
  const [displayCount, setDisplayCount] = useState(10);

  // Dados de exemplo para histórico
  const historyItems = [
    {
      id: 1,
      type: "stage-change",
      title: "Mudou de etapa",
      description: "Esta oportunidade passou da etapa Contato para a etapa Cadastro.",
      date: "18/04/2025 19:38:49",
      user: "Felipe Macedo",
      icon: "arrow-up-circle"
    },
    {
      id: 2,
      type: "stage-change",
      title: "Mudou de etapa",
      description: "Esta oportunidade passou da etapa Cadastro para a etapa Contato.",
      date: "18/04/2025 19:38:46",
      user: "Felipe Macedo",
      icon: "arrow-up-circle"
    },
    {
      id: 3,
      type: "stage-change",
      title: "Mudou de etapa",
      description: "Esta oportunidade passou da etapa Fechamento para a etapa Cadastro.",
      date: "18/04/2025 19:38:35",
      user: "Felipe Macedo",
      icon: "arrow-up-circle"
    },
    {
      id: 4,
      type: "stage-change",
      title: "Mudou de etapa",
      description: "Esta oportunidade passou da etapa Negociação para a etapa Fechamento.",
      date: "18/04/2025 19:38:33",
      user: "Felipe Macedo",
      icon: "arrow-up-circle"
    },
    {
      id: 5,
      type: "stage-change",
      title: "Mudou de etapa",
      description: "Esta oportunidade passou da etapa Reunião para a etapa Negociação.",
      date: "18/04/2025 19:38:30",
      user: "Felipe Macedo",
      icon: "arrow-up-circle"
    }
  ];

  // Filtrar itens do histórico
  const filteredHistoryItems = historyItems.filter(
    item => item.title.toLowerCase().includes(historyFilter.toLowerCase()) || 
            item.description.toLowerCase().includes(historyFilter.toLowerCase())
  );

  // Opções para exibição de número de registros
  const displayOptions = [10, 25, 50, 100, 200, 300];

  return (
    <div>
      <div className="d-flex align-items-center justify-content-between mb-3">
        <div className="d-flex align-items-center">
          <i className="mdi mdi-timeline-outline me-2 h3 mb-0 text-muted"></i>
          <h5 className="mb-0">Timeline</h5>
        </div>
        <div className="d-flex align-items-center">
          <div className="d-flex flex-wrap">
            <div className="d-flex align-items-center flex-wrap">
              <span className="me-2 text-muted" style={{ fontSize: "0.85rem" }}>Registros:</span>
              <div className="d-flex flex-wrap">
                {displayOptions.map(option => (
                  <button 
                    key={option}
                    className={`btn btn-sm ${displayCount === option ? 'btn-success' : 'btn-light'} me-1 mb-1`}
                    style={{ fontSize: "0.85rem", padding: "0.2rem 0.5rem" }}
                    onClick={() => setDisplayCount(option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="d-flex flex-wrap mb-3">
        <div className="flex-grow-1 me-2 mb-2 mb-md-0">
          <Input
            type="text"
            placeholder="Filtrar na timeline..."
            value={historyFilter}
            onChange={(e) => setHistoryFilter(e.target.value)}
            style={{ height: "38px", fontSize: "0.9rem" }}
          />
        </div>
        <div>
          <Button color="light" onClick={() => setHistoryFilter("")} className="me-2" style={{ fontSize: "0.9rem" }}>
            Limpar
          </Button>
          <Button color="success" style={{ fontSize: "0.9rem" }}>
            Buscar
          </Button>
        </div>
      </div>

      <div className="history-timeline position-relative">
        {/* Linha vertical conectando os círculos */}
        <div 
          className="timeline-connector" 
          style={{ 
            position: "absolute", 
            left: "20px", 
            top: "40px", 
            bottom: "0", 
            width: "2px", 
            backgroundColor: "#e9ecef", 
            zIndex: "1" 
          }}
        ></div>
        
        {filteredHistoryItems.map((item, index) => (
          <div key={item.id} className="history-item mb-4 position-relative">
            <div 
              className="timeline-icon bg-success rounded-circle d-flex align-items-center justify-content-center" 
              style={{ 
                width: "40px", 
                height: "40px", 
                marginRight: "15px", 
                position: "absolute",
                left: "0",
                zIndex: "2"
              }}
            >
              <i className={`mdi mdi-${item.icon} text-white`} style={{ fontSize: "1.2rem" }}></i>
            </div>
            <div className="timeline-content" style={{ marginLeft: "55px", paddingBottom: "10px" }}>
              <h6 className="mb-1">{item.title}</h6>
              <p className="mb-1">{item.description}</p>
              <div className="d-flex">
                <small className="text-muted me-2">hoje</small>
                <small className="text-muted">{item.date}</small>
              </div>
              <div className="mt-1">
                <small className="text-muted">{item.user}</small>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimelineTab; 