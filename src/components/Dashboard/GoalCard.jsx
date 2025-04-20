import React from "react";
import PropTypes from "prop-types";
import { Card, CardBody, CardTitle, Row, Col, Progress } from "reactstrap";

const GoalCard = ({ title, goals }) => {
  return (
    <Card className="h-100 shadow-sm border-0" style={{ borderRadius: "12px" }}>
      <CardBody>
        <CardTitle tag="h5" className="text-muted mb-3">
          {title || "Metas do Período"}
        </CardTitle>
        
        <div className="goals-container">
          {goals && goals.length > 0 ? (
            goals.map((goal, index) => (
              <div key={index} className="goal-item mb-4">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <div>
                    <h6 className="mb-1">{goal.title}</h6>
                    <div className="d-flex align-items-center">
                      <div className={`avatar-xs bg-soft-${goal.color} rounded-circle d-inline-flex align-items-center justify-content-center me-2`}>
                        <i className={`bx ${goal.icon} text-${goal.color} font-size-14`}></i>
                      </div>
                      <span className="text-muted font-size-12">{goal.period}</span>
                    </div>
                  </div>
                  <div className="text-end">
                    <span className={`badge bg-soft-${goal.color} text-${goal.color} rounded-pill px-3 py-2 font-size-14`}>
                      <span className="fw-medium">{goal.percentage}%</span>
                    </span>
                  </div>
                </div>
                
                <div className="progress-info">
                  <div className="d-flex justify-content-between mb-1">
                    <span className="text-muted font-size-13">Progresso</span>
                    <div>
                      <span className="font-weight-semibold me-2">R$ {goal.current.toLocaleString('pt-BR')}</span>
                      <span className="text-muted">/ R$ {goal.target.toLocaleString('pt-BR')}</span>
                    </div>
                  </div>
                  <Progress
                    className="progress-sm"
                    color={goal.color}
                    value={goal.percentage}
                    style={{ height: "8px", borderRadius: "5px" }}
                  />
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-4">
              <p className="text-muted mb-0">Nenhuma meta definida.</p>
            </div>
          )}
        </div>
      </CardBody>
    </Card>
  );
};

GoalCard.propTypes = {
  title: PropTypes.string,
  goals: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      period: PropTypes.string,
      current: PropTypes.number.isRequired,
      target: PropTypes.number.isRequired,
      percentage: PropTypes.number.isRequired,
      color: PropTypes.string,
      icon: PropTypes.string
    })
  )
};

GoalCard.defaultProps = {
  goals: []
};

export default GoalCard; 