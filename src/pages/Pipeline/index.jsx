import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import { ButtonGroup, Button } from "reactstrap";

//Import Pipeline
import PipelineComp from "../../components/Pipeline/Pipeline";

//i18n
import { withTranslation } from "react-i18next";

const Pipeline = (props) => {
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

  // Estilo para aumentar a altura das etapas do funil
  const pipelineStyles = {
    stageHeight: 'calc(100vh - 130px)', // Altura maior para as etapas
    containerStyle: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column'
    }
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <div style={pipelineStyles.containerStyle}>
          <div className="d-flex justify-content-end p-2 bg-light border-bottom">
            <ButtonGroup>
              <Button 
                color={viewMode === 'pipeline' ? 'primary' : 'light'} 
                onClick={() => setViewMode('pipeline')}
                className="fw-medium"
              >
                <i className="bx bx-chart me-1"></i> Pipeline
              </Button>
              <Button 
                color={viewMode === 'list' ? 'primary' : 'light'} 
                onClick={() => setViewMode('list')}
                className="fw-medium"
              >
                <i className="bx bx-list-ul me-1"></i> Lista
              </Button>
            </ButtonGroup>
          </div>
          
          {/* Pipeline de Vendas */}
          <div className="flex-grow-1">
            <PipelineComp 
              funnelId={activeFunnel?.id} 
              isEditing={activeFunnel?.isNew || false} 
              funnelName={activeFunnel?.name}
              viewMode={viewMode}
              setViewMode={setViewMode}
              hideControls={true}
              stageHeight={pipelineStyles.stageHeight}
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

Pipeline.propTypes = {
  t: PropTypes.any,
};

export default withTranslation()(Pipeline);
