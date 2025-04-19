import React, { useState, useEffect } from "react";
import { 
  Container, 
  Row, 
  Col, 
  Card, 
  CardBody, 
  Input, 
  Button, 
  ButtonGroup, 
  UncontrolledDropdown, 
  DropdownToggle, 
  DropdownMenu, 
  DropdownItem,
  Badge
} from "reactstrap";
import { Link } from "react-router-dom";
import { withTranslation } from "react-i18next";
import PropTypes from "prop-types";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import CustomUncontrolledTooltip from "../../components/Common/CustomUncontrolledTooltip";
import { toast } from "react-toastify";

// Importação dos avatares
import avatar1 from "../../assets/images/users/avatar-1.jpg";
import avatar2 from "../../assets/images/users/avatar-2.jpg";
import avatar3 from "../../assets/images/users/avatar-3.jpg";
import avatar4 from "../../assets/images/users/avatar-4.jpg";
import avatar5 from "../../assets/images/users/avatar-5.jpg";
import avatar6 from "../../assets/images/users/avatar-6.jpg";
import avatar7 from "../../assets/images/users/avatar-7.jpg";
import avatar8 from "../../assets/images/users/avatar-8.jpg";

// Dados de exemplo para Colaboradores com avatares atualizados
const employeesData = [
  {
    id: 1,
    name: "João Silva",
    email: "joao.silva@intelitec.com.br",
    phone: "(11) 99999-8888",
    cpf: "123.456.789-00",
    role: "Desenvolvedor Frontend",
    department: "Tecnologia",
    status: "Ativo",
    joinDate: "10/01/2022",
    permissions: "Usuário",
    address: {
      street: "Av. Paulista, 1000",
      city: "São Paulo",
      state: "SP",
      zipCode: "01310-100"
    }
  },
  {
    id: 2,
    name: "Maria Oliveira",
    email: "maria.oliveira@intelitec.com.br",
    phone: "(11) 98888-7777",
    cpf: "987.654.321-00",
    role: "Gerente de Projetos",
    department: "Projetos",
    status: "Ativo",
    joinDate: "15/02/2021",
    permissions: "Administrador",
    address: {
      street: "Rua Augusta, 500",
      city: "São Paulo",
      state: "SP",
      zipCode: "01305-000"
    }
  },
  {
    id: 3,
    name: "Carlos Santos",
    email: "carlos.santos@intelitec.com.br",
    phone: "(11) 97777-6666",
    cpf: "456.789.123-00",
    role: "Desenvolvedor Backend",
    department: "Tecnologia",
    status: "Ativo",
    joinDate: "20/03/2022",
    permissions: "Usuário",
    address: {
      street: "Rua Oscar Freire, 200",
      city: "São Paulo",
      state: "SP",
      zipCode: "01426-000"
    }
  },
  {
    id: 4,
    name: "Ana Souza",
    email: "ana.souza@intelitec.com.br",
    phone: "(11) 96666-5555",
    cpf: "789.123.456-00",
    role: "Designer UX/UI",
    department: "Design",
    status: "Férias",
    joinDate: "05/05/2021",
    permissions: "Usuário",
    address: {
      street: "Alameda Santos, 800",
      city: "São Paulo",
      state: "SP",
      zipCode: "01418-100"
    }
  },
  {
    id: 5,
    name: "Pedro Oliveira",
    email: "pedro.oliveira@intelitec.com.br",
    phone: "(11) 95555-4444",
    cpf: "321.654.987-00",
    role: "Analista de Negócios",
    department: "Comercial",
    status: "Inativo",
    joinDate: "10/07/2021",
    permissions: "Usuário",
    address: {
      street: "Av. Rebouças, 300",
      city: "São Paulo",
      state: "SP",
      zipCode: "05401-000"
    }
  }
];

const Employees = (props) => {
  // Estado para armazenar os dados
  const [employees, setEmployees] = useState(employeesData);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("todos");
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [currentEmployees, setCurrentEmployees] = useState([]);

  // Função para obter o avatar baseado no ID do colaborador
  const getAvatarForEmployee = (employeeId) => {
    // Usando o módulo do ID para escolher um dos 8 avatares disponíveis
    const avatarIndex = (employeeId % 8) + 1;
    switch(avatarIndex) {
      case 1: return avatar1;
      case 2: return avatar2;
      case 3: return avatar3;
      case 4: return avatar4;
      case 5: return avatar5;
      case 6: return avatar6;
      case 7: return avatar7;
      case 8: return avatar8;
      default: return avatar1;
    }
  };

  // Departments disponíveis
  const departments = [
    { value: "todos", label: "Todos os departamentos" },
    { value: "Tecnologia", label: "Tecnologia" },
    { value: "Projetos", label: "Projetos" },
    { value: "Design", label: "Design" },
    { value: "Comercial", label: "Comercial" },
    { value: "Financeiro", label: "Financeiro" },
    { value: "RH", label: "Recursos Humanos" },
    { value: "Marketing", label: "Marketing" }
  ];

  // Filtro de colaboradores baseado no departamento e termo de busca
  useEffect(() => {
    let filteredEmployees = [...employees];
    
    // Filtrar por departamento
    if (selectedDepartment !== "todos") {
      filteredEmployees = filteredEmployees.filter(
        (employee) => employee.department === selectedDepartment
      );
    }
    
    // Filtrar por termo de busca
    if (searchTerm) {
      const searchTermLower = searchTerm.toLowerCase();
      filteredEmployees = filteredEmployees.filter(
        (employee) =>
          employee.name.toLowerCase().includes(searchTermLower) ||
          employee.email.toLowerCase().includes(searchTermLower) ||
          employee.phone.toLowerCase().includes(searchTermLower) ||
          employee.role.toLowerCase().includes(searchTermLower) ||
          employee.department.toLowerCase().includes(searchTermLower)
      );
    }
    
    setCurrentEmployees(filteredEmployees);
  }, [employees, selectedDepartment, searchTerm]);

  // Limpar seleção quando mudar o filtro
  useEffect(() => {
    setSelectedEmployees([]);
  }, [selectedDepartment]);

  // Selecionar ou deselecionar um colaborador
  const handleSelectEmployee = (employeeId) => {
    if (selectedEmployees.includes(employeeId)) {
      setSelectedEmployees(selectedEmployees.filter((id) => id !== employeeId));
    } else {
      setSelectedEmployees([...selectedEmployees, employeeId]);
    }
  };

  // Selecionar ou deselecionar todos os colaboradores
  const handleSelectAll = (checked) => {
    if (checked) {
      const allEmployeeIds = currentEmployees.map((employee) => employee.id);
      setSelectedEmployees(allEmployeeIds);
    } else {
      setSelectedEmployees([]);
    }
  };

  // Excluir colaboradores selecionados
  const handleDeleteSelected = () => {
    if (selectedEmployees.length === 0) return;
    
    const updatedEmployees = employees.filter(
      (employee) => !selectedEmployees.includes(employee.id)
    );
    
    setEmployees(updatedEmployees);
    setSelectedEmployees([]);
    
    toast.success(
      `${selectedEmployees.length} colaborador(es) excluído(s) com sucesso!`
    );
  };

  // Confirmar exclusão de colaboradores
  const confirmDelete = () => {
    if (window.confirm(`Deseja realmente excluir ${selectedEmployees.length} colaborador(es)?`)) {
      handleDeleteSelected();
    }
  };

  // Obter cor do badge de status
  const getStatusBadgeColor = (status) => {
    switch (status) {
      case "Ativo":
        return "success";
      case "Inativo":
        return "danger";
      case "Férias":
        return "warning";
      case "Licença":
        return "info";
      default:
        return "secondary";
    }
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>

          <Row>
            <Col lg={12}>
              <Card>
                <CardBody className="p-0">
                  {/* Cabeçalho com filtros */}
                  <div className="d-flex align-items-center justify-content-between p-3 border-bottom">
                    <div>
                      <h5 className="mb-0 font-size-16">
                        Colaboradores ({currentEmployees.length})
                      </h5>
                      {selectedEmployees.length > 0 && (
                        <small className="text-muted">
                          {selectedEmployees.length} selecionado(s)
                        </small>
                      )}
                    </div>
                    <div className="d-flex align-items-center">
                      {selectedEmployees.length > 0 ? (
                        <Button
                          color="danger"
                          size="sm"
                          onClick={confirmDelete}
                          className="me-2"
                        >
                          <i className="bx bx-trash me-1"></i> Excluir
                        </Button>
                      ) : (
                        <Link
                          to="/colaboradores/add"
                          className="btn btn-primary btn-sm me-2"
                        >
                          <i className="bx bx-plus me-1"></i> Adicionar Colaborador
                        </Link>
                      )}
                      
                      <UncontrolledDropdown>
                        <DropdownToggle
                          className="btn btn-light btn-sm"
                          color="light"
                        >
                          {departments.find(dept => dept.value === selectedDepartment)?.label || "Todos os departamentos"}
                          <i className="mdi mdi-chevron-down ms-1"></i>
                        </DropdownToggle>
                        <DropdownMenu className="dropdown-menu-end">
                          {departments.map((dept, index) => (
                            <DropdownItem
                              key={index}
                              onClick={() => setSelectedDepartment(dept.value)}
                              active={selectedDepartment === dept.value}
                            >
                              {dept.label}
                            </DropdownItem>
                          ))}
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </div>
                  </div>

                  {/* Filtro de busca */}
                  <CardBody>
                    <div className="mt-3 position-relative">
                      <div className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted">
                        <i className="bx bx-search-alt"></i>
                      </div>
                      <Input
                        type="text"
                        className="form-control ps-4"
                        placeholder="Pesquisar por nome, email, cargo ou departamento..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                      {searchTerm && (
                        <div className="position-absolute end-0 top-50 translate-middle-y me-3" style={{ cursor: 'pointer' }}>
                          <i className="bx bx-x text-muted fs-5" onClick={() => setSearchTerm("")}></i>
                        </div>
                      )}
                    </div>
                  </CardBody>
                  
                  {/* Tabela de colaboradores */}
                  <div className="table-responsive">
                    <table className="table table-hover mb-0">
                      <thead className="table-light">
                        <tr>
                          <th style={{ width: "40px" }}>
                            <div className="form-check">
                              <input 
                                type="checkbox" 
                                className="form-check-input" 
                                id="selectAll"
                                checked={selectedEmployees.length === currentEmployees.length && currentEmployees.length > 0}
                                onChange={(e) => handleSelectAll(e.target.checked)}
                              />
                            </div>
                          </th>
                          <th style={{ width: "200px" }}>Nome</th>
                          <th style={{ width: "220px" }}>Email</th>
                          <th style={{ width: "120px" }}>Telefone</th>
                          <th style={{ width: "150px" }}>Departamento</th>
                          <th style={{ width: "150px" }}>Cargo</th>
                          <th style={{ width: "100px" }}>Status</th>
                          <th style={{ width: "120px" }}>Permissões</th>
                          <th style={{ width: "90px" }} className="text-center">Ações</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentEmployees.length > 0 ? (
                          currentEmployees.map((employee) => (
                            <tr key={employee.id}>
                              <td>
                                <div className="form-check">
                                  <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id={`employee-${employee.id}`}
                                    checked={selectedEmployees.includes(employee.id)}
                                    onChange={() => handleSelectEmployee(employee.id)}
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="d-flex align-items-center">
                                  <div className="avatar-circle me-2">
                                    <img 
                                      src={getAvatarForEmployee(employee.id)}
                                      alt={employee.name}
                                      className="rounded-circle"
                                      width="32"
                                      height="32"
                                    />
                                  </div>
                                  <div>
                                    <h5 className="font-size-14 mb-0">
                                      <Link to={`/colaborador/${employee.id}`} className="text-dark">
                                        {employee.name}
                                      </Link>
                                    </h5>
                                    <p className="text-muted mb-0 font-size-12">{employee.cpf}</p>
                                  </div>
                                </div>
                              </td>
                              <td>{employee.email}</td>
                              <td>{employee.phone}</td>
                              <td>{employee.department}</td>
                              <td>{employee.role}</td>
                              <td>
                                <Badge color={getStatusBadgeColor(employee.status)} pill>
                                  {employee.status}
                                </Badge>
                              </td>
                              <td>{employee.permissions}</td>
                              <td className="text-center">
                                <div className="d-flex gap-3 justify-content-center">
                                  <Link
                                    to={`/colaborador/${employee.id}`}
                                    className="text-primary"
                                    id={`view-${employee.id}`}
                                  >
                                    <i className="bx bx-show font-size-18"></i>
                                  </Link>
                                  <CustomUncontrolledTooltip
                                    target={`view-${employee.id}`}
                                    placement="top"
                                  >
                                    Visualizar
                                  </CustomUncontrolledTooltip>
                                  
                                  <Link
                                    to="#"
                                    className="text-danger"
                                    id={`delete-${employee.id}`}
                                    onClick={() => {
                                      if (window.confirm("Deseja realmente excluir este colaborador?")) {
                                        setEmployees(employees.filter(e => e.id !== employee.id));
                                        toast.success("Colaborador excluído com sucesso!");
                                      }
                                    }}
                                  >
                                    <i className="bx bx-trash font-size-18"></i>
                                  </Link>
                                  <CustomUncontrolledTooltip
                                    target={`delete-${employee.id}`}
                                    placement="top"
                                  >
                                    Excluir
                                  </CustomUncontrolledTooltip>
                                </div>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="9" className="text-center py-4">
                              <div>
                                <i className="bx bx-search-alt text-muted fs-1 mb-3 d-block"></i>
                                <h5>Nenhum colaborador encontrado</h5>
                                <p className="text-muted">Tente ajustar os filtros ou pesquisar por outro termo.</p>
                              </div>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

Employees.propTypes = {
  t: PropTypes.func,
};

export default withTranslation()(Employees); 