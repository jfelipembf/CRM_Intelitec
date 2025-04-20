import React from "react";
import PropTypes from "prop-types";
import { Row, Col } from "reactstrap";
import SalesCard from "./SalesCard";
import ClientsCard from "./ClientsCard";
import OpportunitiesCard from "./OpportunitiesCard";
import ConversionRateCard from "./ConversionRateCard";

const DashboardCards = ({ dashboardData }) => {
  return (
    <div className="dashboard-cards-container">
      {/* Row 1: Principais indicadores */}
      <Row className="mb-4">
        {/* Card de Vendas - Destaque principal */}
        <Col xl={6} lg={6} md={12} className="mb-4">
          <SalesCard 
            title="Vendas Totais" 
            value={dashboardData.sales.value.toLocaleString('pt-BR')} 
            percentChange={dashboardData.sales.percentChange}
            period={dashboardData.sales.period}
          />
        </Col>
        
        {/* Card de Taxa de Conversão */}
        <Col xl={6} lg={6} md={12} className="mb-4">
          <ConversionRateCard 
            title="Taxa de Conversão" 
            value={dashboardData.conversionRate.value} 
            percentChange={dashboardData.conversionRate.percentChange}
            period={dashboardData.conversionRate.period}
          />
        </Col>
      </Row>
      
      {/* Row 2: Indicadores secundários */}
      <Row>
        {/* Card de Clientes Ativos */}
        <Col xl={4} md={4} sm={12} className="mb-4">
          <ClientsCard 
            title="Clientes Ativos" 
            value={dashboardData.activeClients.value} 
            percentChange={dashboardData.activeClients.percentChange}
            period={dashboardData.activeClients.period}
            status="active"
            icon="bx-user-check"
          />
        </Col>
        
        {/* Card de Clientes Inativos */}
        <Col xl={4} md={4} sm={12} className="mb-4">
          <ClientsCard 
            title="Clientes Inativos" 
            value={dashboardData.inactiveClients.value} 
            percentChange={dashboardData.inactiveClients.percentChange}
            period={dashboardData.inactiveClients.period}
            status="inactive"
            icon="bx-user-x"
          />
        </Col>
        
        {/* Card de Oportunidades */}
        <Col xl={4} md={4} sm={12} className="mb-4">
          <OpportunitiesCard 
            title="Oportunidades" 
            value={dashboardData.opportunities.value} 
            percentChange={dashboardData.opportunities.percentChange}
            period={dashboardData.opportunities.period}
            openOpportunities={dashboardData.opportunities.openOpportunities}
            closedOpportunities={dashboardData.opportunities.closedOpportunities}
          />
        </Col>
      </Row>
    </div>
  );
};

DashboardCards.propTypes = {
  dashboardData: PropTypes.shape({
    sales: PropTypes.object.isRequired,
    activeClients: PropTypes.object.isRequired,
    inactiveClients: PropTypes.object.isRequired,
    opportunities: PropTypes.object.isRequired,
    conversionRate: PropTypes.object.isRequired
  }).isRequired
};

export default DashboardCards; 