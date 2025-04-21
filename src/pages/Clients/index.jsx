import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, CardBody, Button, Input, Badge, ButtonGroup, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import { Link } from "react-router-dom";
import { withTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CustomUncontrolledTooltip from "../../components/Common/CustomUncontrolledTooltip";
import { CustomModal, CustomModalHeader, CustomModalBody, CustomModalFooter } from "../../components/Common/CustomModal";

// Importação dos dados mockados
import { clients as initialClients, formatCurrency, calculateClientStats } from "./mockData";

// Importação dos avatares para os clientes
import avatar1 from "../../assets/images/users/avatar-1.jpg";
import avatar2 from "../../assets/images/users/avatar-2.jpg";
import avatar3 from "../../assets/images/users/avatar-3.jpg";
import avatar4 from "../../assets/images/users/avatar-4.jpg";
import avatar5 from "../../assets/images/users/avatar-5.jpg";
import avatar6 from "../../assets/images/users/avatar-6.jpg";
import avatar7 from "../../assets/images/users/avatar-7.jpg";
import avatar8 from "../../assets/images/users/avatar-8.jpg";

const Clients = (props) => {
  const { t } = props;
  
  // Estado para os clientes
  const [clients, setClients] = useState(initialClients);
  const [selectedClients, setSelectedClients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [itemToDelete, setItemToDelete] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [actionsDropdown, setActionsDropdown] = useState(false);
  const [filterDropdown, setFilterDropdown] = useState(false);
  const [activeFilter, setActiveFilter] = useState("Todos");
  const [viewType, setViewType] = useState("todos"); // 'todos', 'pessoas', 'empresas'
  
  // Estados para paginação
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [itemsPerPageDropdown, setItemsPerPageDropdown] = useState(false);
  
  // Estatísticas calculadas
  const stats = calculateClientStats(clients);
  
  // Efeito para filtrar clientes com base na pesquisa
  const filteredClients = clients.filter(client => {
    // Filtro de pesquisa
    const searchMatch = 
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.phone.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filtro por tipo de visualização
    let viewMatch = true;
    if (viewType === "pessoas") {
      viewMatch = client.type === "Pessoa";
    } else if (viewType === "empresas") {
      viewMatch = client.type === "Empresa";
    }
    
    // Filtro de status
    if (activeFilter === "Todos") return searchMatch && viewMatch;
    if (activeFilter === "Ativos") return searchMatch && viewMatch && client.status === "Ativo";
    if (activeFilter === "Inativos") return searchMatch && viewMatch && client.status === "Inativo";
    if (activeFilter === "Em negociação") return searchMatch && viewMatch && client.status === "Em negociação";
    if (activeFilter === "Leads") return searchMatch && viewMatch && client.type === "Lead";
    if (activeFilter === "Prospects") return searchMatch && viewMatch && client.type === "Prospect";
    if (activeFilter === "Clientes") return searchMatch && viewMatch && client.type === "Cliente";
    
    return searchMatch && viewMatch;
  });
  
  // Lógica de paginação
  const indexOfLastClient = currentPage * itemsPerPage;
  const indexOfFirstClient = indexOfLastClient - itemsPerPage;
  const currentClients = filteredClients.slice(indexOfFirstClient, indexOfLastClient);
  const totalPages = Math.ceil(filteredClients.length / itemsPerPage);
  
  // Função para mudar a página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  
  // Função para lidar com a seleção de um cliente
  const handleClientSelection = (clientId) => {
    setSelectedClients(prevSelected => {
      if (prevSelected.includes(clientId)) {
        return prevSelected.filter(id => id !== clientId);
      } else {
        return [...prevSelected, clientId];
      }
    });
  };
  
  // Função para lidar com a seleção de todos os clientes
  const handleSelectAll = (isChecked) => {
    if (isChecked) {
      setSelectedClients(currentClients.map(client => client.id));
    } else {
      setSelectedClients([]);
    }
  };
  
  // Função para confirmar a exclusão de um cliente
  const confirmDelete = (clientId) => {
    const client = clients.find(c => c.id === clientId);
    setItemToDelete(client);
    setDeleteModal(true);
  };
  
  // Função para executar a exclusão do cliente confirmada
  const handleDeleteConfirm = () => {
    if (!itemToDelete) return;
    
    const updatedClients = clients.filter(client => client.id !== itemToDelete.id);
    setClients(updatedClients);
    
    // Remover da seleção, se estiver selecionado
    if (selectedClients.includes(itemToDelete.id)) {
      setSelectedClients(selectedClients.filter(id => id !== itemToDelete.id));
    }
    
    setDeleteModal(false);
    setItemToDelete(null);
    
    toast.success(`Cliente "${itemToDelete.name}" excluído com sucesso.`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  
  // Função para cancelar a exclusão
  const handleDeleteCancel = () => {
    setDeleteModal(false);
    setItemToDelete(null);
  };
  
  // Função para obter um avatar com base no ID do cliente
  const getAvatarForClient = (clientId) => {
    // Usando o módulo do ID para escolher um dos 8 avatares disponíveis
    const avatarIndex = (clientId % 8) + 1;
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
  
  // Função para lidar com a exclusão de clientes selecionados
  const handleDeleteSelected = () => {
    if (selectedClients.length === 0) return;
    
    if (window.confirm(`Deseja excluir ${selectedClients.length} cliente(s) selecionado(s)?`)) {
      const updatedClients = clients.filter(
        client => !selectedClients.includes(client.id)
      );
      
      setClients(updatedClients);
      setSelectedClients([]);
      
      toast.success(`${selectedClients.length} cliente(s) excluído(s) com sucesso.`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
  
  // Função para mudar itens por página
  const changeItemsPerPage = (number) => {
    setItemsPerPage(number);
    setCurrentPage(1); // Reset para a primeira página quando muda o número de itens
  };
  
  // Badge de status dinamicamente colorida
  const getStatusBadge = (status) => {
    switch (status) {
      case "Ativo":
        return <Badge color="success" className="rounded-pill">Ativo</Badge>;
      case "Inativo":
        return <Badge color="danger" className="rounded-pill">Inativo</Badge>;
      case "Em negociação":
        return <Badge color="warning" className="rounded-pill">Em negociação</Badge>;
      default:
        return <Badge color="secondary" className="rounded-pill">{status}</Badge>;
    }
  };
  
  // Badge de tipo dinamicamente colorida
  const getTypeBadge = (type) => {
    switch (type) {
      case "Cliente":
        return <Badge color="info" className="rounded-pill">Cliente</Badge>;
      case "Lead":
        return <Badge color="secondary" className="rounded-pill">Lead</Badge>;
      case "Prospect":
        return <Badge color="primary" className="rounded-pill">Prospect</Badge>;
      default:
        return <Badge color="light" className="rounded-pill text-dark">{type}</Badge>;
    }
  };
  
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Barra de ferramentas e pesquisa */}
          <Row>
            <Col xs="12">
              <Card>
                <CardBody className="border-bottom">
                  <div className="d-flex align-items-center">
                    <div className="flex-grow-1">
                      <h5 className="font-size-16 mb-3">Lista de Clientes</h5>
                      
                      {/* Dropdown para selecionar itens por página - movido para o lado esquerdo */}
                      <div className="d-flex align-items-center gap-2">
                        <span className="text-muted small">Exibir:</span>
                        <Dropdown isOpen={itemsPerPageDropdown} toggle={() => setItemsPerPageDropdown(!itemsPerPageDropdown)} className="me-3">
                          <DropdownToggle color="light" className="btn-sm">
                            <i className="bx bx-list-ol me-1"></i> {itemsPerPage} por página <i className="mdi mdi-chevron-down"></i>
                          </DropdownToggle>
                          <DropdownMenu>
                            <DropdownItem onClick={() => changeItemsPerPage(5)}>5 por página</DropdownItem>
                            <DropdownItem onClick={() => changeItemsPerPage(10)}>10 por página</DropdownItem>
                            <DropdownItem onClick={() => changeItemsPerPage(15)}>15 por página</DropdownItem>
                            <DropdownItem onClick={() => changeItemsPerPage(20)}>20 por página</DropdownItem>
                            <DropdownItem onClick={() => changeItemsPerPage(50)}>50 por página</DropdownItem>
                            <DropdownItem onClick={() => changeItemsPerPage(100)}>100 por página</DropdownItem>
                          </DropdownMenu>
                        </Dropdown>
                        
                        {/* Botões para alternar entre visualização de pessoas e empresas */}
                        <ButtonGroup className="me-3">
                          <Button 
                            color={viewType === "todos" ? "primary" : "light"} 
                            size="sm" 
                            onClick={() => {
                              // Reset da página para 1 ao mudar o tipo de visualização para evitar erros
                              setCurrentPage(1);
                              setViewType("todos");
                            }}
                          >
                            <i className="bx bx-group me-1"></i> Todos
                          </Button>
                          <Button 
                            color={viewType === "pessoas" ? "primary" : "light"} 
                            size="sm" 
                            onClick={() => {
                              // Reset da página para 1 ao mudar o tipo de visualização para evitar erros
                              setCurrentPage(1);
                              setViewType("pessoas");
                            }}
                          >
                            <i className="bx bx-user me-1"></i> Pessoas
                          </Button>
                          <Button 
                            color={viewType === "empresas" ? "primary" : "light"} 
                            size="sm" 
                            onClick={() => {
                              // Reset da página para 1 ao mudar o tipo de visualização para evitar erros
                              setCurrentPage(1);
                              setViewType("empresas");
                            }}
                          >
                            <i className="bx bx-building me-1"></i> Empresas
                          </Button>
                        </ButtonGroup>
                      </div>
                    </div>
                    <div className="d-flex gap-2">
                      {/* Botão de Adicionar novo cliente */}
                      <Button color="success" className="btn-sm" tag={Link} to={`/clientes/add/${viewType}`}>
                        <i className="bx bx-plus-circle me-1"></i> 
                        {viewType === "pessoas" ? "Adicionar Pessoa" : 
                         viewType === "empresas" ? "Adicionar Empresa" : 
                         "Adicionar Cliente"}
                      </Button>
                      
                      {/* Dropdown de filtros */}
                      <Dropdown isOpen={filterDropdown} toggle={() => setFilterDropdown(!filterDropdown)}>
                        <DropdownToggle color="light" className="btn-sm">
                          <i className="bx bx-filter-alt me-1"></i> {activeFilter} <i className="mdi mdi-chevron-down"></i>
                        </DropdownToggle>
                        <DropdownMenu>
                          <DropdownItem onClick={() => setActiveFilter("Todos")}>Todos</DropdownItem>
                          <DropdownItem divider />
                          <DropdownItem header>Por Status</DropdownItem>
                          <DropdownItem onClick={() => setActiveFilter("Ativos")}>Ativos</DropdownItem>
                          <DropdownItem onClick={() => setActiveFilter("Inativos")}>Inativos</DropdownItem>
                          <DropdownItem onClick={() => setActiveFilter("Em negociação")}>Em negociação</DropdownItem>
                          <DropdownItem divider />
                          <DropdownItem header>Por Tipo</DropdownItem>
                          <DropdownItem onClick={() => setActiveFilter("Clientes")}>Clientes</DropdownItem>
                          <DropdownItem onClick={() => setActiveFilter("Leads")}>Leads</DropdownItem>
                          <DropdownItem onClick={() => setActiveFilter("Prospects")}>Prospects</DropdownItem>
                        </DropdownMenu>
                      </Dropdown>
                      
                      {/* Dropdown de ações em massa */}
                      <Dropdown isOpen={actionsDropdown} toggle={() => setActionsDropdown(!actionsDropdown)}>
                        <DropdownToggle color="primary" className="btn-sm" disabled={selectedClients.length === 0}>
                          Ações <i className="mdi mdi-chevron-down"></i>
                        </DropdownToggle>
                        <DropdownMenu>
                          <DropdownItem onClick={handleDeleteSelected}>
                            <i className="bx bx-trash-alt me-1"></i> Excluir Selecionados
                          </DropdownItem>
                          <DropdownItem>
                            <i className="bx bx-export me-1"></i> Exportar
                          </DropdownItem>
                          <DropdownItem>
                            <i className="bx bx-mail-send me-1"></i> Enviar Email
                          </DropdownItem>
                        </DropdownMenu>
                      </Dropdown>
                    </div>
                  </div>
                  
                  {/* Barra de pesquisa */}
                  <div className="search-box position-relative" style={{ maxWidth: '300px', marginTop: '20px' }}>
                    <div className="position-relative">
                      <Input
                        type="text"
                        className="form-control"
                        placeholder="Pesquisar por nome, empresa, email ou telefone..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{
                          height: '36px',
                          paddingLeft: '38px',
                          paddingRight: '38px'
                        }}
                      />
                      <i className="bx bx-search-alt search-icon text-muted" style={{ fontSize: '1.2rem' }}></i>
                    </div>
                  </div>
                </CardBody>
                
                {/* Tabela de clientes */}
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
                              checked={selectedClients.length === currentClients.length && currentClients.length > 0}
                              onChange={(e) => handleSelectAll(e.target.checked)}
                            />
                          </div>
                        </th>
                        <th style={{ width: "250px" }}>Nome / Empresa</th>
                        <th style={{ width: "220px" }}>Email</th>
                        <th style={{ width: "150px" }}>Telefone</th>
                        <th style={{ width: "120px" }}>Status</th>
                        {viewType === "pessoas" ? (
                          <>
                            <th style={{ width: "120px" }}>Cargo</th>
                            <th style={{ width: "180px" }}>Empresa</th>
                          </>
                        ) : viewType === "empresas" ? (
                          <>
                            <th style={{ width: "350px" }}>Contatos</th>
                          </>
                        ) : (
                          <>
                            <th style={{ width: "120px" }}>Tipo</th>
                            <th style={{ width: "150px" }}>Segmento</th>
                          </>
                        )}
                        <th style={{ width: "120px" }}>Último Contato</th>
                        <th style={{ width: "90px" }} className="text-center">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentClients.length > 0 ? (
                        currentClients.map(client => {
                          const isSelected = selectedClients.includes(client.id);
                          
                          return (
                            <tr 
                              key={client.id}
                              className={isSelected ? 'table-active' : ''}
                              onClick={() => handleClientSelection(client.id)}
                              style={{ cursor: 'pointer' }}
                            >
                              <td>
                                <div className="form-check">
                                  <input 
                                    type="checkbox" 
                                    className="form-check-input" 
                                    checked={isSelected}
                                    onChange={() => {}}
                                    onClick={(e) => e.stopPropagation()}
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="d-flex align-items-center">
                                  <div className="avatar-circle me-2">
                                    <img 
                                      src={getAvatarForClient(client.id)}
                                      alt=""
                                      className="rounded-circle"
                                      width="32"
                                      height="32"
                                    />
                                  </div>
                                  <div>
                                    <div className="fw-medium text-truncate" style={{ maxWidth: "200px" }}>{client.name}</div>
                                    {client.type === "Empresa" ? (
                                      <div className="text-muted small text-truncate" style={{ maxWidth: "200px" }}>
                                        {client.website ? (
                                          <a href={`http://${client.website}`} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                                            {client.website}
                                          </a>
                                        ) : (
                                          client.cnpj || "-"
                                        )}
                                      </div>
                                    ) : (
                                      <div className="text-muted small text-truncate" style={{ maxWidth: "200px" }}>
                                        {client.company}
                                        {client.source && ` • ${client.source}`}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </td>
                              <td>
                                <span className="text-truncate d-inline-block" style={{ maxWidth: "200px" }}>
                                  {client.email}
                                </span>
                              </td>
                              <td>
                                <div className="d-flex align-items-center">
                                  <span className="text-truncate d-inline-block" style={{ maxWidth: "120px" }}>
                                    {client.phone}
                                  </span>
                                  <i className="mdi mdi-whatsapp text-success ms-2"></i>
                                </div>
                              </td>
                              <td>{getStatusBadge(client.status)}</td>
                              {viewType === "pessoas" ? (
                                <>
                                  <td>
                                    <span className="text-truncate d-inline-block" style={{ maxWidth: "100px" }}>
                                      {client.role || "-"}
                                    </span>
                                  </td>
                                  <td>
                                    <span className="text-truncate d-inline-block" style={{ maxWidth: "160px" }}>
                                      {client.company || "-"}
                                    </span>
                                  </td>
                                </>
                              ) : viewType === "empresas" ? (
                                <>
                                  <td>
                                    <div className="d-flex flex-column">
                                      {client.contacts && client.contacts.length > 0 ? (
                                        client.contacts.map((contact, index) => (
                                          <div key={index} className={index > 0 ? "mt-1" : ""}>
                                            <span className="fw-medium">{contact.name}</span>
                                            {contact.role && <span className="text-muted ms-1">({contact.role})</span>}
                                            {contact.phone && <div className="small text-muted">{contact.phone}</div>}
                                          </div>
                                        ))
                                      ) : (
                                        <span className="text-muted">Sem contatos</span>
                                      )}
                                    </div>
                                  </td>
                                </>
                              ) : (
                                <>
                                  <td>{getTypeBadge(client.type)}</td>
                                  <td>
                                    <span className="text-truncate d-inline-block" style={{ maxWidth: "130px" }}>
                                      {client.segment}
                                    </span>
                                  </td>
                                </>
                              )}
                              <td>{client.lastContact}</td>
                              <td>
                                <div className="d-flex justify-content-center">
                                  <Button 
                                    color="link" 
                                    className="text-primary p-0 me-3" 
                                    title="Ver Detalhes"
                                    id={`view-${client.id}`}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      // Navegar para a página de detalhes
                                    }}
                                  >
                                    <i className="mdi mdi-eye-outline fs-5"></i>
                                  </Button>
                                  <CustomUncontrolledTooltip placement="top" target={`view-${client.id}`}>
                                    Ver Detalhes
                                  </CustomUncontrolledTooltip>
                                  
                                  <Button 
                                    color="link" 
                                    className="text-danger p-0" 
                                    title="Excluir"
                                    id={`delete-${client.id}`}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      confirmDelete(client.id);
                                    }}
                                  >
                                    <i className="mdi mdi-trash-can-outline fs-5"></i>
                                  </Button>
                                  <CustomUncontrolledTooltip placement="top" target={`delete-${client.id}`}>
                                    Excluir
                                  </CustomUncontrolledTooltip>
                                </div>
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr>
                          <td colSpan={viewType === "empresas" ? "8" : viewType === "pessoas" ? "9" : "9"} className="text-center py-4">
                            <div>
                              <i className="bx bx-search-alt text-muted fs-1 mb-3 d-block"></i>
                              <h5>Nenhum cliente encontrado</h5>
                              <p className="text-muted">Tente ajustar os filtros ou pesquisar por outro termo.</p>
                            </div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
                
                {/* Paginação */}
                {filteredClients.length > 0 && (
                  <div className="d-flex justify-content-between align-items-center p-3 border-top">
                    <div className="text-muted small">
                      Mostrando {indexOfFirstClient + 1} a {Math.min(indexOfLastClient, filteredClients.length)} de {filteredClients.length} registros
                      {filteredClients.length !== clients.length && (
                        <span> (filtrados de {clients.length} registros totais)</span>
                      )}
                    </div>
                    <ul className="pagination pagination-sm mb-0">
                      <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                        <button 
                          className="page-link" 
                          onClick={() => paginate(1)}
                          disabled={currentPage === 1}
                        >
                          <i className="mdi mdi-chevron-double-left"></i>
                        </button>
                      </li>
                      <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                        <button 
                          className="page-link" 
                          onClick={() => paginate(currentPage - 1)}
                          disabled={currentPage === 1}
                        >
                          <i className="mdi mdi-chevron-left"></i>
                        </button>
                      </li>
                      
                      {/* Páginas */}
                      {Array.from({ length: Math.min(5, totalPages) }).map((_, idx) => {
                        let pageNumber;
                        
                        // Lógica para mostrar as páginas ao redor da página atual
                        if (totalPages <= 5) {
                          pageNumber = idx + 1;
                        } else if (currentPage <= 3) {
                          pageNumber = idx + 1;
                        } else if (currentPage >= totalPages - 2) {
                          pageNumber = totalPages - 4 + idx;
                        } else {
                          pageNumber = currentPage - 2 + idx;
                        }
                        
                        return (
                          <li 
                            key={idx} 
                            className={`page-item ${pageNumber === currentPage ? 'active' : ''}`}
                          >
                            <button 
                              className="page-link" 
                              onClick={() => paginate(pageNumber)}
                            >
                              {pageNumber}
                            </button>
                          </li>
                        );
                      })}
                      
                      <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                        <button 
                          className="page-link" 
                          onClick={() => paginate(currentPage + 1)}
                          disabled={currentPage === totalPages}
                        >
                          <i className="mdi mdi-chevron-right"></i>
                        </button>
                      </li>
                      <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                        <button 
                          className="page-link" 
                          onClick={() => paginate(totalPages)}
                          disabled={currentPage === totalPages}
                        >
                          <i className="mdi mdi-chevron-double-right"></i>
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
      
      {/* Modal de confirmação de exclusão */}
      <CustomModal isOpen={deleteModal} toggle={handleDeleteCancel}>
        <CustomModalHeader toggle={handleDeleteCancel}>Confirmar exclusão</CustomModalHeader>
        <CustomModalBody>
          {itemToDelete && (
            <p>
              {itemToDelete.type === "Empresa" ? (
                <>
                  Deseja realmente excluir a empresa <strong>"{itemToDelete.name}"</strong> (CNPJ: {itemToDelete.cnpj || "Não informado"})?
                </>
              ) : (
                <>
                  Deseja realmente excluir o contato <strong>"{itemToDelete.name}"</strong> 
                  {itemToDelete.company ? ` da empresa "${itemToDelete.company}"` : ""}?
                </>
              )}
            </p>
          )}
        </CustomModalBody>
        <CustomModalFooter>
          <Button color="secondary" onClick={handleDeleteCancel}>Cancelar</Button>
          <Button color="danger" onClick={handleDeleteConfirm}>Excluir</Button>
        </CustomModalFooter>
      </CustomModal>
      
      {/* Contêiner para notificações toast */}
      <ToastContainer />
    </React.Fragment>
  );
};

Clients.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation()(Clients); 