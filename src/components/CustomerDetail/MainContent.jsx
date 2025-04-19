import React, { useState } from "react";
import { 
  Card, 
  Nav, 
  NavItem, 
  NavLink, 
  TabContent, 
  TabPane, 
  Row,
  Col,
  CardHeader,
  CardBody,
  Alert
} from "reactstrap";
import classnames from "classnames";

// Importando os subcomponentes das abas
import TimelineTab from "./tabs/TimelineTab";
import NotesTab from "./tabs/NotesTab";
import ActivitiesTab from "./tabs/ActivitiesTab";
import FilesTab from "./tabs/FilesTab";
import ProposalTab from "./tabs/ProposalTab";
import ContractTab from "./tabs/ContractTab";
import FinanceiroTab from "./tabs/FinanceiroTab";


const MainContent = ({ customer }) => {
  const [activeTab, setActiveTab] = useState("timeline");

  // Função para alternar entre as abas
  const toggleTab = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  // Todas as abas
  const allTabs = [
    { id: "timeline", label: "Timeline", icon: "timeline-outline" },
    { id: "notas", label: "Notas", icon: "note-text-outline" },
    { id: "atividades", label: "Atividades", icon: "calendar-check" },
    { id: "arquivos", label: "Arquivos", icon: "file-document-outline" },
    { id: "propostas", label: "Propostas", icon: "file-document-outline" },
    { id: "dadosContrato", label: "Contrato", icon: "file-document-outline" },
    { id: "financeiro", label: "Financeiro", icon: "cash-multiple" }
  ];

  return (
    <Card className="mb-4">
      {/* Navegação unificada */}
      <div className="tabs-container bg-white">
        <div className="main-tabs-wrapper border-bottom">
          <Nav className="d-flex flex-nowrap overflow-auto" style={{ padding: "0" }}>
            {allTabs.map(tab => (
              <NavItem key={tab.id} style={{ flexShrink: 0 }}>
                <NavLink
                  href="#"
                  className={classnames("px-2 py-2 text-center", 
                    { "text-primary fw-bold border-bottom border-primary": activeTab === tab.id,
                      "text-secondary": activeTab !== tab.id })}
                  onClick={(e) => {
                    e.preventDefault();
                    toggleTab(tab.id);
                  }}
                  style={{ 
                    fontSize: "0.85rem", 
                    borderBottomWidth: activeTab === tab.id ? "2px" : "0",
                    borderBottomStyle: "solid",
                    textDecoration: "none",
                    minWidth: "62px",
                    maxWidth: "90px"
                  }}
                >
                  <div className="d-flex align-items-center justify-content-center">
                    <i className={`mdi mdi-${tab.icon} me-1`}></i>
                    <span>{tab.label}</span>
                  </div>
                </NavLink>
              </NavItem>
            ))}
          </Nav>
        </div>
      </div>

      <TabContent activeTab={activeTab}>
        <TabPane tabId="timeline" className="p-3">
          <TimelineTab customer={customer} />
        </TabPane>

        <TabPane tabId="notas" className="p-3">
          <NotesTab customer={customer} />
        </TabPane>

        <TabPane tabId="atividades" className="p-3">
          <ActivitiesTab customer={customer} />
        </TabPane>

        <TabPane tabId="arquivos" className="p-3">
          <FilesTab customer={customer} />
        </TabPane>

        <TabPane tabId="propostas" className="p-3">
          <ProposalTab customer={customer} />
        </TabPane>

        <TabPane tabId="dadosContrato" className="p-3">
          <ContractTab customer={customer} />
        </TabPane>

        <TabPane tabId="financeiro" className="p-3">
          <FinanceiroTab customer={customer} />
        </TabPane>
      </TabContent>
    </Card>
  );
};

export default MainContent; 