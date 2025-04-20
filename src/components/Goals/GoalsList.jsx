import React from "react";
import PropTypes from "prop-types";
import { 
  Table, 
  Badge, 
  Progress, 
  Button, 
  UncontrolledDropdown, 
  DropdownToggle, 
  DropdownMenu, 
  DropdownItem 
} from "reactstrap";
import { Link } from "react-router-dom";

const GoalsList = ({ goals, activeTab }) => {
  // Filtrar metas por status se não for "todos"
  const filteredGoals = activeTab === "todos" 
    ? goals 
    : goals.filter(goal => goal.status === activeTab);
  
  // Mapear status para badges
  const getStatusBadge = (status) => {
    switch (status) {
      case "completed":
        return <Badge color="success" className="rounded-pill px-2 py-1">Concluída</Badge>;
      case "in-progress":
        return <Badge color="info" className="rounded-pill px-2 py-1">Em Andamento</Badge>;
      case "upcoming":
        return <Badge color="warning" className="rounded-pill px-2 py-1">Futura</Badge>;
      default:
        return <Badge color="secondary" className="rounded-pill px-2 py-1">Indefinida</Badge>;
    }
  };
  
  // Mapear períodos para exibição amigável
  const getPeriodLabel = (periodType, period) => {
    switch (periodType) {
      case "month":
        return `Mensal - ${period}`;
      case "quarter":
        return `Trimestre ${period}`;
      case "semester":
        return `Semestre ${period}`;
      case "year":
        return `Anual - ${period}`;
      default:
        return period;
    }
  };
  
  // Formatar valor financeiro
  const formatCurrency = (value) => {
    return `R$ ${value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
  };

  return (
    <div className="table-responsive">
      <Table className="align-middle table-nowrap mb-0">
        <thead className="table-light">
          <tr>
            <th style={{ width: "25%" }}>Meta</th>
            <th style={{ width: "12%" }}>Tipo</th>
            <th style={{ width: "15%" }}>Período</th>
            <th style={{ width: "15%" }}>Valor</th>
            <th style={{ width: "18%" }}>Progresso</th>
            <th style={{ width: "8%" }}>Status</th>
            <th style={{ width: "7%" }}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {filteredGoals.length > 0 ? (
            filteredGoals.map((goal, index) => (
              <tr key={goal.id || index}>
                <td>
                  <div>
                    <h5 className="font-size-14 mb-1">
                      <Link to={`/metas/${goal.id}`} className="text-dark">
                        {goal.title}
                      </Link>
                    </h5>
                    <p className="text-muted mb-0">{goal.description}</p>
                  </div>
                </td>
                <td>
                  <div className="d-flex align-items-center">
                    <div className="avatar-xs me-2 bg-soft-primary rounded-circle d-inline-flex align-items-center justify-content-center">
                      <i className={`bx ${goal.icon} text-primary font-size-14`}></i>
                    </div>
                    <span>{goal.type}</span>
                  </div>
                </td>
                <td>{getPeriodLabel(goal.periodType, goal.period)}</td>
                <td>
                  <div>
                    <h6 className="mb-1">{formatCurrency(goal.currentValue)}</h6>
                    <p className="text-muted mb-0">
                      {goal.type === "Financeira" 
                        ? `Meta: ${formatCurrency(goal.targetValue)}` 
                        : `Meta: ${goal.targetValue} ${goal.unit || "unid."}`}
                    </p>
                  </div>
                </td>
                <td>
                  <div className="progress-info">
                    <div className="d-flex justify-content-between mb-1">
                      <span className={`text-${goal.completion >= 70 ? "success" : goal.completion >= 40 ? "warning" : "danger"} font-size-12`}>
                        {goal.completion}%
                      </span>
                    </div>
                    <Progress
                      className="progress-sm"
                      color={goal.completion >= 70 ? "success" : goal.completion >= 40 ? "warning" : "danger"}
                      value={goal.completion}
                      style={{ height: "5px" }}
                    />
                  </div>
                </td>
                <td>
                  {getStatusBadge(goal.status)}
                </td>
                <td>
                  <UncontrolledDropdown>
                    <DropdownToggle
                      href="#"
                      className="card-drop"
                      tag="a"
                    >
                      <i className="bx bx-dots-horizontal-rounded font-size-18 text-muted"></i>
                    </DropdownToggle>
                    <DropdownMenu className="dropdown-menu-end">
                      <Link to={`/metas/${goal.id}`} className="dropdown-item">
                        <i className="bx bx-show-alt font-size-16 me-2 text-muted vertical-middle"></i>
                        Ver Detalhes
                      </Link>
                      <Link to={`/metas/editar/${goal.id}`} className="dropdown-item">
                        <i className="bx bx-edit-alt font-size-16 me-2 text-muted vertical-middle"></i>
                        Editar
                      </Link>
                      <DropdownItem>
                        <i className="bx bx-chart font-size-16 me-2 text-muted vertical-middle"></i>
                        Atualizar Progresso
                      </DropdownItem>
                      <DropdownItem divider />
                      <DropdownItem className="text-danger">
                        <i className="bx bx-trash font-size-16 me-2 vertical-middle"></i>
                        Excluir
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center py-4">
                <div className="py-4">
                  <i className="bx bx-folder-open text-primary font-size-24 d-block mb-2"></i>
                  <h5 className="text-muted mb-1">Nenhuma meta encontrada</h5>
                  <p className="text-muted mb-3">Não foram encontradas metas com os filtros selecionados.</p>
                  <Link to="/metas/nova">
                    <Button color="primary" className="btn-sm">
                      <i className="bx bx-plus me-1"></i> Criar Meta
                    </Button>
                  </Link>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

GoalsList.propTypes = {
  goals: PropTypes.array.isRequired,
  activeTab: PropTypes.string.isRequired
};

export default GoalsList; 