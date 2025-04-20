import React from "react";
import PropTypes from "prop-types";
import { Card, CardBody, CardTitle, ListGroup, ListGroupItem, Badge } from "reactstrap";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";

const RecentActivityCard = ({ 
  title = "Atividades Recentes", 
  activities = [], 
  hideTitle = false 
}) => {
  // Mapeamento de tipos para cores e ícones
  const typeConfig = {
    call: { color: "primary", icon: "bx-phone-call" },
    meeting: { color: "info", icon: "bx-calendar-event" },
    email: { color: "success", icon: "bx-envelope" },
    task: { color: "warning", icon: "bx-task" },
    follow: { color: "secondary", icon: "bx-revision" },
    opportunity: { color: "danger", icon: "bx-money" }
  };

  // Renderização de um item de atividade
  const renderActivityItem = (activity, idx) => (
    <ListGroupItem key={idx} className={`px-${hideTitle ? '3' : '0'} py-3 border-0`}>
      <div className="d-flex">
        <div className="flex-shrink-0 me-3">
          <div className={`avatar-xs bg-soft-${typeConfig[activity.type]?.color || "light"} rounded-circle d-inline-flex align-items-center justify-content-center`}>
            <i className={`bx ${typeConfig[activity.type]?.icon || "bx-calendar"} text-${typeConfig[activity.type]?.color || "secondary"} font-size-16`}></i>
          </div>
        </div>
        <div className="flex-grow-1">
          <h5 className="font-size-14 mb-1">
            {activity.title}
            {activity.status && (
              <Badge
                color={activity.status === "completed" ? "success" : activity.status === "upcoming" ? "warning" : "info"}
                className="font-size-10 rounded-pill float-end"
              >
                {activity.status === "completed" ? "Concluído" : activity.status === "upcoming" ? "Pendente" : activity.status}
              </Badge>
            )}
          </h5>
          <p className="text-muted mb-1">{activity.description}</p>
          <div className="font-size-12 text-muted">
            <i className="bx bx-calendar me-1 text-muted"></i> {activity.date}
            {activity.time && (
              <span><i className="bx bx-time-five ms-3 me-1"></i> {activity.time}</span>
            )}
            {activity.responsible && (
              <span><i className="bx bx-user ms-3 me-1"></i> {activity.responsible}</span>
            )}
          </div>
        </div>
      </div>
    </ListGroupItem>
  );

  // Se for parte de outro card e hideTitle for true, renderiza apenas o conteúdo
  if (hideTitle) {
    return (
      <PerfectScrollbar style={{ height: "300px" }}>
        <ListGroup flush>
          {activities && activities.length > 0 ? (
            activities.map((activity, idx) => renderActivityItem(activity, idx))
          ) : (
            <ListGroupItem className="px-3 py-3 text-center border-0">
              <p className="text-muted">Nenhuma atividade recente.</p>
            </ListGroupItem>
          )}
        </ListGroup>
      </PerfectScrollbar>
    );
  }

  // Renderização completa do card (padrão)
  return (
    <Card className="h-100 shadow-sm border-0" style={{ borderRadius: "12px" }}>
      <CardBody>
        <CardTitle tag="h5" className="text-muted mb-3">
          {title}
        </CardTitle>
        <PerfectScrollbar style={{ height: "300px" }}>
          <ListGroup flush>
            {activities && activities.length > 0 ? (
              activities.map((activity, idx) => renderActivityItem(activity, idx))
            ) : (
              <ListGroupItem className="px-0 py-3 text-center border-0">
                <p className="text-muted">Nenhuma atividade recente.</p>
              </ListGroupItem>
            )}
          </ListGroup>
        </PerfectScrollbar>
      </CardBody>
    </Card>
  );
};

RecentActivityCard.propTypes = {
  title: PropTypes.string,
  activities: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.oneOf(["call", "meeting", "email", "task", "follow", "opportunity"]).isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string,
      date: PropTypes.string.isRequired,
      time: PropTypes.string,
      status: PropTypes.string,
      responsible: PropTypes.string
    })
  ),
  hideTitle: PropTypes.bool
};

export default RecentActivityCard; 