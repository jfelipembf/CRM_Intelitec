import React from "react";
import PropTypes from "prop-types";
import { Card, CardBody, CardTitle, Row, Col } from "reactstrap";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const ConversionRateCard = ({ title, value, percentChange, period }) => {
  // Garantir que o valor está em formato numérico
  const rate = parseFloat(value);
  
  // Definir cores para o gráfico circular
  const primaryColor = "#3498db"; // Azul mais suave
  const trackColor = "#f1f5f9"; // Cinza claro para o traço

  return (
    <Card className="h-100 shadow-sm border-0" style={{ borderRadius: "12px" }}>
      <CardBody>
        <CardTitle tag="h5" className="text-muted mb-3">
          {title || "Taxa de Conversão"}
        </CardTitle>
        <Row className="align-items-center">
          <Col xs="8">
            <div className="mt-2">
              <div className="d-flex align-items-center mb-3">
                <h3 className="font-weight-semibold mb-0">{rate}%</h3>
                <span className={`badge bg-soft-${percentChange >= 0 ? 'success' : 'danger'} text-${percentChange >= 0 ? 'success' : 'danger'} rounded-pill ms-2 py-2 px-3`}>
                  <i className={`bx ${percentChange >= 0 ? 'bx-up-arrow-alt' : 'bx-down-arrow-alt'} align-middle font-size-16 me-1`}></i>
                  <span className="font-size-14 fw-medium">{Math.abs(percentChange)}%</span>
                </span>
              </div>
              <p className="text-muted font-size-13 mb-0">
                {period || "Desde o último mês"}
              </p>
              <p className="text-muted font-size-12 mb-0 mt-2">
                Oportunidades que resultaram em vendas.
              </p>
            </div>
          </Col>
          <Col xs="4" className="text-end">
            <div style={{ width: "85px", height: "85px", margin: "0 0 0 auto" }}>
              <CircularProgressbar
                value={rate}
                text={`${rate}%`}
                strokeWidth={12}
                styles={buildStyles({
                  textSize: '1.5rem',
                  pathColor: primaryColor,
                  textColor: "#495057",
                  trailColor: trackColor,
                })}
              />
            </div>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

ConversionRateCard.propTypes = {
  title: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  percentChange: PropTypes.number,
  period: PropTypes.string
};

export default ConversionRateCard; 