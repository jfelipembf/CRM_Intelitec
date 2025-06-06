import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import { Container, ButtonGroup, Button } from "reactstrap";

// Importando o componente Pipeline
import Pipeline from "../../components/Pipeline/Pipeline";

//i18n
import { withTranslation } from "react-i18next";

// Estilos para a página de Pipeline
const styles = {
  pipelineContainer: {
    height: "calc(100vh - 100px)",
    overflow: "hidden"
  }
};

const PipelinePage = (props) => {
  const { t } = props;
  const [activeFunnel, setActiveFunnel] = useState(null);
  const [viewMode, setViewMode] = useState('pipeline');
  
  // Detectar parâmetros de URL para novo funil
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const isNewFunnel = urlParams.get('newFunnel') === 'true';
    const funnelId = urlParams.get('funnelId');
    
    // Se for um novo funil ou tiver o ID do funil na URL
    if (funnelId) {
      setActiveFunnel({
        id: funnelId,
        name: isNewFunnel ? "Novo Funil" : "Funil Personalizado",
        isNew: isNewFunnel
      });
    } else {
      // Funil padrão
      setActiveFunnel({
        id: 1,
        name: "Funil Padrão",
        isNew: false
      });
    }
  }, []);

  //meta title
  document.title = "Pipeline | InteliTec CRM - Sistema de Gestão de Relacionamento com Clientes";

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid className="p-0">
          <div className="d-flex justify-content-end mb-3">
            <ButtonGroup>
              <Button 
                color="secondary" 
                onClick={() => setViewMode('pipeline')}
                active={viewMode === 'pipeline'}
                className="me-1"
              >
                <i className="mdi mdi-view-dashboard-outline me-1"></i>
                Pipeline
              </Button>
              <Button 
                color="secondary" 
                onClick={() => setViewMode('list')}
                active={viewMode === 'list'}
              >
                <i className="mdi mdi-format-list-bulleted me-1"></i>
                Lista
              </Button>
            </ButtonGroup>
          </div>
          <div style={styles.pipelineContainer}>
            <Pipeline 
              t={t} 
              activeFunnel={activeFunnel} 
              setActiveFunnel={setActiveFunnel}
              viewMode={viewMode}
              setViewMode={setViewMode}
            />
          </div>
        </Container>
      </div>
    </React.Fragment>
  );
};

PipelinePage.propTypes = {
  t: PropTypes.any,
};

export default withTranslation()(PipelinePage);
