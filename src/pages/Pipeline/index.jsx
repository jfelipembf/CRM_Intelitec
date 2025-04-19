import PropTypes from "prop-types";
import React from "react";
import { Container } from "reactstrap";

//Import Pipeline
import PipelineComp from "../../components/Pipeline/Pipeline";

//i18n
import { withTranslation } from "react-i18next";

const Pipeline = (props) => {
  const { t } = props;

  //meta title
  document.title = "Pipeline | InteliTec CRM - Sistema de Gestão de Relacionamento com Clientes";

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Pipeline de Vendas */}
          <div className="mb-4">
            <PipelineComp />
          </div>
        </Container>
      </div>
    </React.Fragment>
  );
};

Pipeline.propTypes = {
  t: PropTypes.any,
  chartsData: PropTypes.any,
  onGetChartsData: PropTypes.func,
};

export default withTranslation()(Pipeline);
