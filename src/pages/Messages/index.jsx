import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Container, Row, Col, Card, CardBody, Nav, NavItem, NavLink, TabContent, TabPane, Input, InputGroup, Button, Badge, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import { withTranslation } from "react-i18next";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";

// Componentes
import MessageList from "./MessageList";
import Conversation from "./Conversation";
import ContactSidebar from "./ContactSidebar";

// Mock data (será substituído por API endpoints reais)
import { contacts, conversations, socialAccounts } from "./mockData";

// Avatar padrão para mensagens do usuário
import avatar1 from "../../assets/images/users/avatar-1.jpg";

const Messages = props => {
  const { t } = props;

  const [activeTab, setActiveTab] = useState("1");
  const [activeChannel, setActiveChannel] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedContact, setSelectedContact] = useState(contacts[0]);
  const [currentMessages, setCurrentMessages] = useState([]);
  const [showContactInfo, setShowContactInfo] = useState(false);
  const [linked, setLinked] = useState({
    whatsapp: true,
    facebook: true,
    instagram: true,
    telegram: false,
    email: true
  });

  // Buscar as mensagens do contato selecionado
  useEffect(() => {
    if (selectedContact) {
      const contactConversations = conversations.filter(
        msg => msg.contactId === selectedContact.id
      );
      setCurrentMessages(contactConversations);
      // O perfil não é mais mostrado automaticamente ao selecionar um contato
    }
  }, [selectedContact]);

  // Gerencia o fechamento do painel lateral
  const handleCloseSidebar = () => {
    setShowContactInfo(false);
  };

  // Filtrar contatos por termo de busca e canal ativo
  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.lastMessage.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesChannel = activeChannel === "all" || 
                          contact.channels.some(channel => channel.type === activeChannel);
    
    return matchesSearch && matchesChannel;
  });

  // Alternar entre as abas
  const toggleTab = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  // Enviar nova mensagem
  const sendMessage = (content, platform) => {
    // Em um caso real, isso enviaria para a API correspondente
    const newMessage = {
      id: `msg-${Date.now()}`,
      contactId: selectedContact.id,
      content,
      sender: "me",
      timestamp: new Date().toISOString(),
      platform,
      read: true
    };
    
    setCurrentMessages(prev => [...prev, newMessage]);

    // Aqui entraria a lógica de envio para APIs diferentes dependendo da plataforma
    console.log(`Enviando mensagem para ${platform}:`, content);

    // Simulando uma resposta para demonstração
    setTimeout(() => {
      const autoReply = {
        id: `msg-${Date.now() + 1}`,
        contactId: selectedContact.id,
        content: `Resposta automática via ${platform}`,
        sender: selectedContact.id,
        timestamp: new Date().toISOString(),
        platform,
        read: false
      };
      setCurrentMessages(prev => [...prev, autoReply]);
    }, 1000);
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid className="p-0">
          <Row className="g-0">
            <Col lg={12} className="p-0">
              <Card className="m-0 border-0 rounded-0">
                <CardBody className="p-0">
                  <Row className="g-0">
                    {/* Sidebar de contatos */}
                    <Col lg={3}>
                      <div className="p-3 border-bottom">
                        <InputGroup>
                          <Input
                            type="text"
                            className="form-control"
                            placeholder="Buscar contatos..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                          />
                          <div className="input-group-text bg-primary text-white">
                            <i className="bx bx-search"></i>
                          </div>
                        </InputGroup>
                      </div>

                      <div className="p-3 border-bottom">
                        <Nav pills className="nav-pills-custom d-flex justify-content-between">
                          <NavItem>
                            <NavLink
                              className={activeChannel === "all" ? "active text-center" : "text-center"}
                              onClick={() => setActiveChannel("all")}
                              title="Todos os canais"
                              style={{ width: "42px", height: "42px", display: "flex", alignItems: "center", justifyContent: "center" }}
                            >
                              <i className="bx bx-layer fs-5"></i>
                            </NavLink>
                          </NavItem>
                          <NavItem>
                            <NavLink
                              className={activeChannel === "whatsapp" ? "active text-center" : "text-center"}
                              onClick={() => setActiveChannel("whatsapp")}
                              title="WhatsApp"
                              style={{ width: "42px", height: "42px", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}
                            >
                              <i className="bx bxl-whatsapp fs-5"></i>
                              {contacts.filter(c => c.channels.some(ch => ch.type === "whatsapp" && !ch.read)).length > 0 && (
                                <Badge pill color="success" className="position-absolute top-0 end-0" style={{fontSize: "8px"}}>
                                  {contacts.filter(c => c.channels.some(ch => ch.type === "whatsapp" && !ch.read)).length}
                                </Badge>
                              )}
                            </NavLink>
                          </NavItem>
                          <NavItem>
                            <NavLink
                              className={activeChannel === "facebook" ? "active text-center" : "text-center"}
                              onClick={() => setActiveChannel("facebook")}
                              title="Facebook"
                              style={{ width: "42px", height: "42px", display: "flex", alignItems: "center", justifyContent: "center" }}
                            >
                              <i className="bx bxl-facebook-square fs-5"></i>
                            </NavLink>
                          </NavItem>
                          <NavItem>
                            <NavLink
                              className={activeChannel === "instagram" ? "active text-center" : "text-center"}
                              onClick={() => setActiveChannel("instagram")}
                              title="Instagram"
                              style={{ width: "42px", height: "42px", display: "flex", alignItems: "center", justifyContent: "center" }}
                            >
                              <i className="bx bxl-instagram fs-5"></i>
                            </NavLink>
                          </NavItem>
                          <NavItem>
                            <NavLink
                              className={activeChannel === "email" ? "active text-center" : "text-center"}
                              onClick={() => setActiveChannel("email")}
                              title="Email"
                              style={{ width: "42px", height: "42px", display: "flex", alignItems: "center", justifyContent: "center" }}
                            >
                              <i className="bx bx-envelope fs-5"></i>
                            </NavLink>
                          </NavItem>
                        </Nav>
                      </div>

                      <div>
                        <div className="px-3 py-2 border-bottom">
                          <h5 className="font-size-16 mb-0">Contatos</h5>
                        </div>
                        
                        <PerfectScrollbar style={{ height: "calc(100vh - 230px)" }}>
                          <MessageList 
                            contacts={filteredContacts}
                            selectedContact={selectedContact}
                            onContactSelect={setSelectedContact}
                          />
                        </PerfectScrollbar>
                      </div>
                    </Col>

                    {/* Área de conversa */}
                    <Col lg={showContactInfo ? 6 : 9} className="border-start">
                      <div className="w-100 user-chat">
                        <div className="p-3 border-bottom">
                          <Row>
                            <Col md={4} className="d-flex align-items-center">
                              <div className="d-flex align-items-center">
                                <div className="me-3">
                                  <img 
                                    src={selectedContact?.avatar} 
                                    className="rounded-circle avatar-sm" 
                                    alt="Avatar" 
                                  />
                                  <span className={`user-status bg-${selectedContact?.online ? 'success' : 'warning'}`}></span>
                                </div>
                                <div>
                                  <h5 className="font-size-15 mb-1">{selectedContact?.name}</h5>
                                  <p className="text-muted mb-0">
                                    {selectedContact?.online ? "Online" : "Offline há 10min"}
                                  </p>
                                </div>
                              </div>
                            </Col>
                            <Col md={8} className="d-flex align-items-center justify-content-end">
                              {/* Canais disponíveis para este contato */}
                              <div className="d-flex align-items-center">
                                {selectedContact?.channels.map(channel => (
                                  <span key={channel.type} className="me-2" title={`Canal ${channel.type}`}>
                                    <i className={`bx bxl-${channel.type} fs-4 ${!channel.read ? 'text-danger' : ''}`}></i>
                                  </span>
                                ))}
                              </div>
                              
                              <UncontrolledDropdown className="ms-2">
                                <DropdownToggle className="btn-sm" color="light" tag="button">
                                  <i className="bx bx-dots-vertical-rounded"></i>
                                </DropdownToggle>
                                <DropdownMenu className="dropdown-menu-end">
                                  <DropdownItem onClick={() => {setShowContactInfo(true);}}>Ver perfil</DropdownItem>
                                  <DropdownItem>Adicionar à agenda</DropdownItem>
                                  <DropdownItem>Bloquear</DropdownItem>
                                  <DropdownItem divider />
                                  <DropdownItem className="text-danger">Apagar conversa</DropdownItem>
                                </DropdownMenu>
                              </UncontrolledDropdown>
                            </Col>
                          </Row>
                        </div>

                        <Conversation 
                          messages={currentMessages}
                          contact={selectedContact}
                          onSendMessage={sendMessage}
                          avatarMe={avatar1}
                        />
                      </div>
                    </Col>

                    {/* Painel lateral com dados do contato */}
                    {showContactInfo && (
                      <Col lg={3} className="border-start">
                        <ContactSidebar 
                          contact={selectedContact} 
                          onClose={handleCloseSidebar}
                        />
                      </Col>
                    )}
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

Messages.propTypes = {
  t: PropTypes.func
};

export default withTranslation()(Messages); 