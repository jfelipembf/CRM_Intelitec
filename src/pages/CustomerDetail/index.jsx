import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";

// Importando componentes
import CustomerDetailHeader from "../../components/CustomerDetail/Header";
import SideDetails from "../../components/CustomerDetail/SideDetails";
import CompanyDetails from "../../components/CustomerDetail/CompanyDetails";
import MainContent from "../../components/CustomerDetail/MainContent";
import "../../components/CustomerDetail/styles.css";

const CustomerDetail = () => {
  const { id } = useParams();
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);

  // Placeholder para simular carregamento de dados do cliente
  useEffect(() => {
    // Aqui você carregaria os dados reais do cliente da API
    // baseado no ID da URL (useParams)
    setTimeout(() => {
      setCustomer({
        id: id || "1",
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
        company: "Academia Fitness",
        email: "contato@academiafitness.com.br",
        phone: "(11) 99999-8888",
        address: "Rua da Academia, 123 - São Paulo/SP",
        segment: "Saúde e Fitness",
        tags: ["VIP", "Cliente Potencial"],
        responsible: "João Silva",
        opportunityDetails: {
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
        },
        companyData: {
          name: "CRM PipeRun",
          isClient: false,
          corporateName: "ODIG - SOLUCOES DIGITAIS LTDA",
          cnpj: "08.692.236/0001-48",
          situation: "Lead",
          sector: "Serviços",
          segment: "Serviços",
          city: "Porto Alegre",
          state: "RS",
          website: "https://crmpiperun.com/",
          phones: [
            {
              number: "+55 (51) 4063-9792",
              type: "Principal"
            },
            {
              number: "+55 (51) 4063-9792",
              type: "Principal"
            }
          ],
          emails: [
            "adm@odig.net",
            "adm@odig.net"
          ]
        }
      });
      setLoading(false);
    }, 1000);
  }, [id]);

  // Título da página
  document.title = "Detalhes do Cliente | InteliTec CRM";

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {loading ? (
            <div className="text-center p-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Carregando...</span>
              </div>
              <p className="mt-3">Carregando informações do cliente...</p>
            </div>
          ) : (
            <>
              {/* Cabeçalho com funil de vendas */}
              <CustomerDetailHeader customer={customer} />
              
              {/* Conteúdo principal com sidebar de detalhes */}
              <Row>
                {/* Coluna lateral com detalhes - md-3 */}
                <Col md={3}>
                  <SideDetails opportunityDetails={customer.opportunityDetails} />
                  <CompanyDetails companyData={customer.companyData} />
                </Col>
                
                {/* Coluna principal - md-9 */}
                <Col md={9}>
                  <MainContent customer={customer} />
                </Col>
              </Row>
            </>
          )}
        </Container>
      </div>
    </React.Fragment>
  );
};

export default CustomerDetail; 