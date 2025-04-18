import PropTypes from "prop-types";
import React from "react";
import { Container } from "reactstrap";

//Import Pipeline
import Pipeline from "../../components/Dashboard/Pipeline";

//i18n
import { withTranslation } from "react-i18next";

const Dashboard = (props) => {
  const { t } = props;

  //meta title
  document.title = "Dashboard | InteliTec CRM - Sistema de Gestão de Relacionamento com Clientes";

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Pipeline de Vendas */}
          <div className="mb-4">
            <Pipeline />
          </div>
        </Container>
      </div>
    </React.Fragment>
  );
};

Dashboard.propTypes = {
  t: PropTypes.any,
  chartsData: PropTypes.any,
  onGetChartsData: PropTypes.func,
};

export default withTranslation()(Dashboard);
