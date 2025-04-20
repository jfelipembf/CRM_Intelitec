import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";

// Importar componentes do Dashboard
import { 
  DashboardCards, 
  SalesCard, 
  ClientsCard, 
  OpportunitiesCard, 
  ConversionRateCard,
  RecentActivityCard 
} from "../../components/Dashboard";

//i18n
import { withTranslation } from "react-i18next";

const Dashboard = (props) => {
  const { t } = props;

  // Dados mockados para o dashboard - em produção seriam obtidos de uma API
  const [dashboardData, setDashboardData] = useState({
    sales: {
      value: 124750,
      percentChange: 15.8,
      period: "este mês"
    },
    activeClients: {
      value: 48,
      percentChange: 12.3,
      period: "este mês"
    },
    inactiveClients: {
      value: 12,
      percentChange: -5.2,
      period: "este mês"
    },
    opportunities: {
      value: 27,
      percentChange: 8.4,
      period: "este mês",
      openOpportunities: 18,
      closedOpportunities: 9
    },
    conversionRate: {
      value: 32.5,
      percentChange: 4.7,
      period: "este mês"
    }
  });

  //meta title
  document.title = "Dashboard | InteliTec CRM - Sistema de Gestão de Relacionamento com Clientes";

  // Atividades recentes mockadas
  const recentActivities = [
    {
      id: 1,
      type: "meeting",
      title: "Reunião com TechCorp Solutions",
      description: "Discussão sobre implementação do ERP",
      date: "Hoje, 14:30",
      user: "Felipe Macedo",
      icon: "mdi-calendar-check"
    },
    {
      id: 2,
      type: "call",
      title: "Chamada com Distribuidora Nacional",
      description: "Follow-up sobre proposta de CRM",
      date: "Ontem, 11:15",
      user: "Ana Silva",
      icon: "mdi-phone"
    },
    {
      id: 3,
      type: "task",
      title: "Envio de proposta",
      description: "Envio de orçamento para Global Enterprises",
      date: "Ontem, 09:30",
      user: "Carlos Santos",
      icon: "mdi-file-document-outline"
    },
    {
      id: 4,
      type: "opportunity",
      title: "Nova oportunidade",
      description: "Projeto de IA com TechFuture Inc",
      date: "15/05/2023",
      user: "Felipe Macedo",
      icon: "mdi-lightning-bolt"
    }
  ];

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Cards de métricas principais */}
          <Row className="mb-4">
            <Col>
              <h4 className="mb-4">Visão Geral</h4>
              <DashboardCards dashboardData={dashboardData} />
            </Col>
          </Row>
          
          {/* Atividades recentes */}
          <Row>
            <Col xl={12}>
              <RecentActivityCard 
                title="Atividades Recentes"
                activities={recentActivities}
              />
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

Dashboard.propTypes = {
  t: PropTypes.any,
};

export default withTranslation()(Dashboard);
