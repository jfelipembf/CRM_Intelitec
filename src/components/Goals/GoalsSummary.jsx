import React from "react";
import PropTypes from "prop-types";
import { 
  Row, 
  Col, 
  Card, 
  CardBody,
  Progress
} from "reactstrap";

const GoalsSummary = ({ 
  totalGoals, 
  completedGoals, 
  inProgressGoals, 
  upcomingGoals, 
  averageCompletion 
}) => {
  return (
    <Row>
      <Col xl={3} md={6}>
        <Card className="mini-stats-wid shadow-sm border-0 mb-3" style={{ borderRadius: "10px" }}>
          <CardBody>
            <div className="d-flex">
              <div className="flex-grow-1">
                <p className="text-muted fw-medium">Total de Metas</p>
                <h4 className="mb-0">{totalGoals}</h4>
              </div>
              <div className="avatar-sm rounded-circle bg-primary mini-stat-icon align-self-center">
                <span className="avatar-title rounded-circle bg-primary">
                  <i className="bx bx-list-check font-size-24"></i>
                </span>
              </div>
            </div>
            <div className="mt-3">
              <Progress value={100} color="primary" className="progress-sm" style={{ height: "5px" }} />
            </div>
          </CardBody>
        </Card>
      </Col>
      
      <Col xl={3} md={6}>
        <Card className="mini-stats-wid shadow-sm border-0 mb-3" style={{ borderRadius: "10px" }}>
          <CardBody>
            <div className="d-flex">
              <div className="flex-grow-1">
                <p className="text-muted fw-medium">Metas Concluídas</p>
                <h4 className="mb-0">{completedGoals}</h4>
              </div>
              <div className="avatar-sm rounded-circle bg-success mini-stat-icon align-self-center">
                <span className="avatar-title rounded-circle bg-success">
                  <i className="bx bx-check-circle font-size-24"></i>
                </span>
              </div>
            </div>
            <div className="mt-3">
              <div className="d-flex">
                <span className="text-muted font-size-12 me-2">
                  {totalGoals ? Math.round((completedGoals / totalGoals) * 100) : 0}%
                </span>
              </div>
              <Progress value={totalGoals ? (completedGoals / totalGoals) * 100 : 0} color="success" className="progress-sm" style={{ height: "5px" }} />
            </div>
          </CardBody>
        </Card>
      </Col>
      
      <Col xl={3} md={6}>
        <Card className="mini-stats-wid shadow-sm border-0 mb-3" style={{ borderRadius: "10px" }}>
          <CardBody>
            <div className="d-flex">
              <div className="flex-grow-1">
                <p className="text-muted fw-medium">Em Andamento</p>
                <h4 className="mb-0">{inProgressGoals}</h4>
              </div>
              <div className="avatar-sm rounded-circle bg-info mini-stat-icon align-self-center">
                <span className="avatar-title rounded-circle bg-info">
                  <i className="bx bx-refresh font-size-24"></i>
                </span>
              </div>
            </div>
            <div className="mt-3">
              <div className="d-flex">
                <span className="text-muted font-size-12 me-2">
                  {totalGoals ? Math.round((inProgressGoals / totalGoals) * 100) : 0}%
                </span>
              </div>
              <Progress value={totalGoals ? (inProgressGoals / totalGoals) * 100 : 0} color="info" className="progress-sm" style={{ height: "5px" }} />
            </div>
          </CardBody>
        </Card>
      </Col>
      
      <Col xl={3} md={6}>
        <Card className="mini-stats-wid shadow-sm border-0 mb-3" style={{ borderRadius: "10px" }}>
          <CardBody>
            <div className="d-flex">
              <div className="flex-grow-1">
                <p className="text-muted fw-medium">Progresso Médio</p>
                <h4 className="mb-0">{averageCompletion}%</h4>
              </div>
              <div className={`avatar-sm rounded-circle bg-${averageCompletion >= 70 ? "success" : averageCompletion >= 40 ? "warning" : "danger"} mini-stat-icon align-self-center`}>
                <span className={`avatar-title rounded-circle bg-${averageCompletion >= 70 ? "success" : averageCompletion >= 40 ? "warning" : "danger"}`}>
                  <i className="bx bx-trending-up font-size-24"></i>
                </span>
              </div>
            </div>
            <div className="mt-3">
              <Progress 
                value={averageCompletion} 
                color={averageCompletion >= 70 ? "success" : averageCompletion >= 40 ? "warning" : "danger"} 
                className="progress-sm" 
                style={{ height: "5px" }} 
              />
            </div>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

GoalsSummary.propTypes = {
  totalGoals: PropTypes.number.isRequired,
  completedGoals: PropTypes.number.isRequired,
  inProgressGoals: PropTypes.number.isRequired,
  upcomingGoals: PropTypes.number.isRequired,
  averageCompletion: PropTypes.number.isRequired
};

export default GoalsSummary; 