import React from "react";
import { Card, CardBody, CardHeader } from "reactstrap";

const SideDetails = ({ opportunityDetails }) => {
  // Dados de exemplo caso não sejam fornecidos
  const details = opportunityDetails || {
    id: "47122897",
    lastUpdate: "18/04/25 17:15:22",
    valuePS: "R$ 0,00",
    valueMRR: "R$ 0,00",
    opportunityTime: "Menos de 1 dia",
    opportunityDate: "18/04/2025",
    closingForecast: "Não informado",
    city: "Porto Alegre",
    state: "RS",
    origin: "Carteira de Clientes",
    observation: "Não informado"
  };

  return (
    <Card className="mb-4 shadow-sm" style={{ fontSize: "0.85rem" }}>
      <CardHeader className="bg-light d-flex justify-content-between align-items-center py-1 px-3">
        <div className="d-flex align-items-center">
          <i className="mdi mdi-star-outline me-1 text-muted" style={{ fontSize: "0.9rem" }}></i>
          <h5 className="mb-0 text-muted" style={{ fontSize: "0.9rem" }}>Detalhes</h5>
        </div>
        <div>
          <button className="btn btn-sm btn-link p-0 me-2" style={{ lineHeight: 1 }}>
            <i className="mdi mdi-pencil text-muted" style={{ fontSize: "0.8rem" }}></i>
          </button>
          <button className="btn btn-sm btn-link p-0" style={{ lineHeight: 1 }}>
            <i className="mdi mdi-chevron-up text-muted" style={{ fontSize: "0.8rem" }}></i>
          </button>
        </div>
      </CardHeader>
      <CardBody className="px-3 py-2">
        <div className="details-list" style={{ display: "grid", rowGap: "6px" }}>
          <DetailItem 
            label="Última atualização" 
            value={details.lastUpdate} 
          />
          <DetailItem 
            label="ID da oportunidade" 
            value={details.id} 
            valueStyle={{ fontWeight: "500", color: "#495057" }}
          />
          <DetailItem 
            label="Valor de P&S" 
            value={details.valuePS} 
            valueStyle={{ fontWeight: "500", color: "#28a745" }}
          />
          <DetailItem 
            label="Valor de MRR" 
            value={details.valueMRR} 
            valueStyle={{ fontWeight: "500", color: "#28a745" }}
          />
          <DetailItem 
            label="Tempo da oportunidade" 
            value={
              <>
                {details.opportunityTime} <span className="text-muted small">({details.opportunityDate})</span>
              </>
            } 
          />
          <DetailItem 
            label="Previsão de fechamento" 
            value={details.closingForecast} 
          />
          <DetailItem 
            label="Cidade (UF)" 
            value={`${details.city} (${details.state})`} 
          />
          <DetailItem 
            label="Origem" 
            value={
              <>
                » {details.origin}
              </>
            } 
          />
          <DetailItem 
            label="Observação" 
            value={details.observation}
          />
        </div>
      </CardBody>
    </Card>
  );
};

// Componente auxiliar para cada item de detalhe com espaçamento reduzido
const DetailItem = ({ label, value, valueStyle = {} }) => {
  return (
    <div className="py-1">
      <div className="text-muted" style={{ fontSize: "0.75rem", lineHeight: "1.1", marginBottom: "1px" }}>
        {label}
      </div>
      <div style={{ fontSize: "0.85rem", fontWeight: "400", lineHeight: "1.2", ...valueStyle }}>
        {value}
      </div>
    </div>
  );
};

export default SideDetails; 