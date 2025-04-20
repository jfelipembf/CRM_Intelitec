import React, { useState } from "react";
import PropTypes from "prop-types";
import { Nav, NavItem, NavLink, Button, Card, CardBody, TabContent, TabPane, FormGroup, Label, Input, Badge, UncontrolledAccordion, AccordionItem, AccordionHeader, AccordionBody, Alert } from "reactstrap";
import classnames from "classnames";
import { Link } from "react-router-dom";

const ContactSidebar = ({ contact, onClose }) => {
  const [activeTab, setActiveTab] = useState("1");

  // Verificar se o contato é um cliente registrado no sistema
  // Em uma aplicação real, isso seria determinado pelos dados do contato
  const isRegisteredClient = contact.customerSince !== undefined && contact.customerSince !== null && contact.customerSince !== '';

  // Alternar entre abas
  const toggleTab = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  // Formatação dos números de telefone
  const formatPhone = (phone) => {
    if (!phone) return "-";
    return phone.replace(/(\d{2})(\d{2})(\d{5})(\d{4})/, "+$1 ($2) $3-$4");
  };

  // Função para criar novo cliente (em uma implementação real, isso levaria à página de cadastro)
  const handleCreateClient = () => {
    // Aqui você redirecionaria para o formulário de cadastro de clientes
    // com os dados do contato pré-preenchidos
    window.location.href = `/clientes/add/person?name=${encodeURIComponent(contact.name)}&email=${encodeURIComponent(contact.email || '')}&phone=${encodeURIComponent(contact.phone || '')}`;
  };

  if (!contact) {
    return (
      <div className="d-flex justify-content-center align-items-center h-100">
        <p className="text-muted">Selecione um contato</p>
      </div>
    );
  }

  return (
    <div className="contact-sidebar h-100 d-flex flex-column">
      <div className="p-3 border-bottom d-flex justify-content-between align-items-center">
        <h5 className="font-size-16 mb-0">Informações do Contato</h5>
        <Button 
          color="link" 
          className="p-0 text-muted" 
          title="Fechar" 
          onClick={onClose}
        >
          <i className="bx bx-x fs-4"></i>
        </Button>
      </div>

      <div className="p-3">
        {!isRegisteredClient && (
          <Alert color="warning" className="mb-3 p-2 text-center">
            <i className="bx bx-info-circle me-1"></i> Este contato não está registrado como cliente
          </Alert>
        )}
        
        <div className="text-center mb-4">
          <img
            src={contact.avatar}
            className="rounded-circle avatar-lg img-thumbnail"
            alt={contact.name}
          />

          <h5 className="font-size-15 mt-3 mb-1">{contact.name}</h5>
          <p className="text-muted mb-1">
            {contact.company || "Sem empresa associada"}
          </p>
          <p className="text-muted mb-2">
            <i className="bx bx-map-pin me-1"></i> {contact.location}
          </p>

          <div className="d-flex gap-2 justify-content-center flex-wrap">
            {isRegisteredClient ? (
              <Link to={`/cliente/${contact.id}`}>
                <Button color="primary" outline size="sm">
                  <i className="bx bx-user-circle me-1"></i> Ver Perfil do Cliente
                </Button>
              </Link>
            ) : (
              <Button color="primary" outline size="sm" onClick={handleCreateClient}>
                <i className="bx bx-user-plus me-1"></i> Criar Perfil de Cliente
              </Button>
            )}
            <Button color="success" outline size="sm">
              <i className="bx bx-task me-1"></i> Criar Tarefa
            </Button>
          </div>
        </div>

        <Nav pills className="bg-light rounded mb-3 justify-content-center">
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === "1" })}
              onClick={() => toggleTab("1")}
            >
              Contato
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === "2" })}
              onClick={() => toggleTab("2")}
            >
              Canais
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === "3" })}
              onClick={() => toggleTab("3")}
            >
              Histórico
            </NavLink>
          </NavItem>
        </Nav>

        <TabContent activeTab={activeTab} className="overflow-auto" style={{ height: "calc(100vh - 400px)" }}>
          {/* Aba de informações de contato */}
          <TabPane tabId="1">
            <Card>
              <CardBody className="p-3">
                <UncontrolledAccordion defaultOpen="1">
                  <AccordionItem>
                    <AccordionHeader targetId="1">
                      <i className="bx bx-user me-2"></i> Dados Pessoais
                    </AccordionHeader>
                    <AccordionBody accordionId="1">
                      <div className="mb-2">
                        <small className="text-muted d-block">Nome</small>
                        <p className="mb-0">{contact.name}</p>
                      </div>
                      <div className="mb-2">
                        <small className="text-muted d-block">E-mail</small>
                        <p className="mb-0">{contact.email || "-"}</p>
                      </div>
                      <div className="mb-2">
                        <small className="text-muted d-block">Telefone</small>
                        <p className="mb-0">{formatPhone(contact.phone)}</p>
                      </div>
                      <div className="mb-2">
                        <small className="text-muted d-block">Localização</small>
                        <p className="mb-0">{contact.location}</p>
                      </div>
                    </AccordionBody>
                  </AccordionItem>
                  
                  <AccordionItem>
                    <AccordionHeader targetId="2">
                      <i className="bx bx-building-house me-2"></i> Dados da Empresa
                    </AccordionHeader>
                    <AccordionBody accordionId="2">
                      <div className="mb-2">
                        <small className="text-muted d-block">Empresa</small>
                        <p className="mb-0">{contact.company || "-"}</p>
                      </div>
                      <div className="mb-2">
                        <small className="text-muted d-block">Cargo</small>
                        <p className="mb-0">{contact.role || "-"}</p>
                      </div>
                      <div className="mb-2">
                        <small className="text-muted d-block">Departamento</small>
                        <p className="mb-0">{contact.department || "-"}</p>
                      </div>
                    </AccordionBody>
                  </AccordionItem>
                  
                  <AccordionItem>
                    <AccordionHeader targetId="3">
                      <i className="bx bx-info-circle me-2"></i> Informações CRM
                    </AccordionHeader>
                    <AccordionBody accordionId="3">
                      {isRegisteredClient ? (
                        <>
                          <div className="mb-2">
                            <small className="text-muted d-block">Cliente desde</small>
                            <p className="mb-0">{contact.customerSince || "-"}</p>
                          </div>
                          <div className="mb-2">
                            <small className="text-muted d-block">Último contato</small>
                            <p className="mb-0">{contact.lastContact || "-"}</p>
                          </div>
                          <div className="mb-2">
                            <small className="text-muted d-block">Status</small>
                            <Badge color={contact.status === "active" ? "success" : "warning"}>
                              {contact.status === "active" ? "Ativo" : "Inativo"}
                            </Badge>
                          </div>
                          <div className="mb-2">
                            <small className="text-muted d-block">Responsável</small>
                            <p className="mb-0">{contact.owner || "-"}</p>
                          </div>
                        </>
                      ) : (
                        <div className="text-center py-3">
                          <i className="bx bx-user-plus fs-1 text-muted mb-2"></i>
                          <p>Este contato ainda não é um cliente registrado.</p>
                          <Button color="primary" size="sm" onClick={handleCreateClient}>
                            Criar Perfil de Cliente
                          </Button>
                        </div>
                      )}
                    </AccordionBody>
                  </AccordionItem>
                </UncontrolledAccordion>
              </CardBody>
            </Card>
          </TabPane>

          {/* Aba de canais de comunicação */}
          <TabPane tabId="2">
            <Card>
              <CardBody className="p-3">
                <h6 className="text-muted mb-3">Canais Conectados</h6>
                
                {contact.channels.map(channel => (
                  <div key={channel.type} className="d-flex align-items-center mb-3">
                    <div className="me-3">
                      <div 
                        className="avatar-xs rounded-circle d-flex justify-content-center align-items-center"
                        style={{ 
                          backgroundColor: channel.type === "whatsapp" ? "#25D366" : 
                                          channel.type === "facebook" ? "#1877F2" : 
                                          channel.type === "instagram" ? "#E1306C" : 
                                          channel.type === "telegram" ? "#0088cc" : "#FFA500",
                          color: 'white'
                        }}
                      >
                        <i className={`bx ${
                          channel.type === "whatsapp" ? "bxl-whatsapp" : 
                          channel.type === "facebook" ? "bxl-facebook" : 
                          channel.type === "instagram" ? "bxl-instagram" : 
                          channel.type === "telegram" ? "bxl-telegram" : "bx-envelope"
                        }`}></i>
                      </div>
                    </div>
                    <div className="flex-grow-1">
                      <h5 className="font-size-14 mb-1 text-truncate">
                        {channel.type.charAt(0).toUpperCase() + channel.type.slice(1)}
                      </h5>
                      <p className="text-muted mb-0 font-size-12">
                        {channel.handle || channel.type === "email" ? contact.email : contact.phone}
                      </p>
                    </div>
                    <div>
                      <div className="form-check form-switch me-n2">
                        <Input
                          type="switch"
                          className="form-check-input"
                          id={`channel-switch-${channel.type}`}
                          defaultChecked
                        />
                      </div>
                    </div>
                  </div>
                ))}
                
                <hr />
                
                <h6 className="text-muted mb-3">Adicionar Canal</h6>
                <div className="d-flex flex-wrap gap-2">
                  <Button color="light" size="sm" className="rounded-pill">
                    <i className="bx bxl-twitter me-1"></i> Twitter
                  </Button>
                  <Button color="light" size="sm" className="rounded-pill">
                    <i className="bx bxl-telegram me-1"></i> Telegram
                  </Button>
                  <Button color="light" size="sm" className="rounded-pill">
                    <i className="bx bxl-slack me-1"></i> Slack
                  </Button>
                </div>
              </CardBody>
            </Card>
          </TabPane>

          {/* Aba de histórico */}
          <TabPane tabId="3">
            <Card>
              <CardBody className="p-3">
                <h6 className="text-muted mb-3">Últimas Interações</h6>
                
                <div className="time-list">
                  <div className="activity-item d-flex mb-3">
                    <div className="activity-icon avatar-xs me-2">
                      <span className="avatar-title bg-success-subtle text-success rounded-circle">
                        <i className="bx bxl-whatsapp"></i>
                      </span>
                    </div>
                    <div className="flex-grow-1">
                      <p className="text-muted mb-1">
                        <small>Ontem, 15:32</small>
                      </p>
                      <p className="mb-0">Enviou mensagem via WhatsApp</p>
                    </div>
                  </div>
                  
                  <div className="activity-item d-flex mb-3">
                    <div className="activity-icon avatar-xs me-2">
                      <span className="avatar-title bg-primary-subtle text-primary rounded-circle">
                        <i className="bx bx-phone"></i>
                      </span>
                    </div>
                    <div className="flex-grow-1">
                      <p className="text-muted mb-1">
                        <small>22/05/2023, 11:45</small>
                      </p>
                      <p className="mb-0">Chamada telefônica (8 minutos)</p>
                    </div>
                  </div>
                  
                  <div className="activity-item d-flex mb-3">
                    <div className="activity-icon avatar-xs me-2">
                      <span className="avatar-title bg-danger-subtle text-danger rounded-circle">
                        <i className="bx bxl-instagram"></i>
                      </span>
                    </div>
                    <div className="flex-grow-1">
                      <p className="text-muted mb-1">
                        <small>20/05/2023, 09:30</small>
                      </p>
                      <p className="mb-0">Mensagem via Instagram</p>
                    </div>
                  </div>
                  
                  <div className="activity-item d-flex mb-3">
                    <div className="activity-icon avatar-xs me-2">
                      <span className="avatar-title bg-info-subtle text-info rounded-circle">
                        <i className="bx bx-envelope"></i>
                      </span>
                    </div>
                    <div className="flex-grow-1">
                      <p className="text-muted mb-1">
                        <small>15/05/2023, 14:22</small>
                      </p>
                      <p className="mb-0">Email enviado: "Proposta comercial"</p>
                    </div>
                  </div>
                </div>
                
                <hr />
                
                <div className="text-center">
                  <Button color="light" size="sm">
                    Ver histórico completo
                  </Button>
                </div>
              </CardBody>
            </Card>
          </TabPane>
        </TabContent>
      </div>
    </div>
  );
};

ContactSidebar.propTypes = {
  contact: PropTypes.object,
  onClose: PropTypes.func
};

ContactSidebar.defaultProps = {
  onClose: () => {}
};

export default ContactSidebar; 