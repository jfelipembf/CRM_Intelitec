import React from "react";
import PropTypes from "prop-types";
import { Card, CardBody, CardTitle, Row, Col } from "reactstrap";

const ClientsCard = ({ title, value, percentChange, period, status, icon }) => {
  // Defina uma paleta de cores mais consistente
  const colorScheme = {
    active: {
      bg: "bg-soft-success",
      text: "text-success"
    },
    inactive: {
      bg: "bg-soft-danger",
      text: "text-danger"
    }
  };

  // Usar o esquema de cores baseado no status
  const currentScheme = colorScheme[status] || colorScheme.active;

  return (
    <Card className="h-100 shadow-sm border-0" style={{ borderRadius: "12px" }}>
      <CardBody>
        <CardTitle tag="h5" className="text-muted mb-3">
          {title || "Clientes"}
        </CardTitle>
        <Row>
          <Col xs="8">
            <div className="mt-2">
              <h3 className="font-weight-semibold mb-2">{value}</h3>
              <div className="d-flex align-items-center">
                <span className={`badge bg-soft-${percentChange >= 0 ? 'success' : 'danger'} text-${percentChange >= 0 ? 'success' : 'danger'} rounded-pill me-2 py-2 px-3`}>
                  <i className={`bx ${percentChange >= 0 ? 'bx-up-arrow-alt' : 'bx-down-arrow-alt'} align-middle font-size-16 me-1`}></i>
                  <span className="font-size-14 fw-medium">{Math.abs(percentChange)}%</span>
                </span>
                <span className="text-muted font-size-12">{period || "Desde o último mês"}</span>
              </div>
            </div>
          </Col>
          <Col xs="4">
            <div className="text-end">
              <div className={`avatar-sm ${currentScheme.bg} rounded-circle d-inline-flex align-items-center justify-content-center`}>
                <i className={`bx ${icon || 'bx-user'} ${currentScheme.text} font-size-24`}></i>
              </div>
            </div>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

ClientsCard.propTypes = {
  title: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  percentChange: PropTypes.number,
  period: PropTypes.string,
  status: PropTypes.oneOf(['active', 'inactive']),
  icon: PropTypes.string
};

export default ClientsCard; 