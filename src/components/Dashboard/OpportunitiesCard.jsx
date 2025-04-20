import React from "react";
import PropTypes from "prop-types";
import { Card, CardBody, CardTitle, Row, Col, Progress } from "reactstrap";

const OpportunitiesCard = ({ 
  title, 
  value, 
  percentChange, 
  period, 
  openOpportunities,
  closedOpportunities
}) => {
  // Calcular a porcentagem de oportunidades em cada status
  const total = openOpportunities + closedOpportunities;
  const openPercentage = total > 0 ? Math.round((openOpportunities / total) * 100) : 0;

  return (
    <Card className="h-100 shadow-sm border-0" style={{ borderRadius: "12px" }}>
      <CardBody>
        <CardTitle tag="h5" className="text-muted mb-3">
          {title || "Oportunidades"}
        </CardTitle>
        <Row>
          <Col xs="8">
            <div className="mt-2">
              <h3 className="font-weight-semibold mb-2">{value}</h3>
              <div className="d-flex align-items-center mb-2">
                <span className={`badge bg-soft-${percentChange >= 0 ? 'success' : 'danger'} text-${percentChange >= 0 ? 'success' : 'danger'} rounded-pill me-2 py-2 px-3`}>
                  <i className={`bx ${percentChange >= 0 ? 'bx-up-arrow-alt' : 'bx-down-arrow-alt'} align-middle font-size-16 me-1`}></i>
                  <span className="font-size-14 fw-medium">{Math.abs(percentChange)}%</span>
                </span>
                <span className="text-muted font-size-12">{period || "Desde o último mês"}</span>
              </div>
              <div className="progress-info mt-3">
                <div className="d-flex justify-content-between mb-1">
                  <span className="text-muted font-size-13">Abertas: {openOpportunities}</span>
                  <span className="text-muted font-size-13">Fechadas: {closedOpportunities}</span>
                </div>
                <Progress
                  className="progress-sm"
                  color="info"
                  value={openPercentage}
                  style={{ height: "6px", borderRadius: "5px" }}
                />
                <div className="text-end mt-1">
                  <span className="badge bg-soft-info text-info font-size-12 px-2 py-1 rounded">
                    {openPercentage}% abertas
                  </span>
                </div>
              </div>
            </div>
          </Col>
          <Col xs="4">
            <div className="text-end">
              <div className="avatar-sm bg-soft-info rounded-circle d-inline-flex align-items-center justify-content-center">
                <i className="bx bx-target-lock text-info font-size-24"></i>
              </div>
            </div>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

OpportunitiesCard.propTypes = {
  title: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  percentChange: PropTypes.number,
  period: PropTypes.string,
  openOpportunities: PropTypes.number.isRequired,
  closedOpportunities: PropTypes.number.isRequired
};

export default OpportunitiesCard; 