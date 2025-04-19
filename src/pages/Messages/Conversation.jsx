import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { Input, Button, Form, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Row, Col } from "reactstrap";
import PerfectScrollbar from "react-perfect-scrollbar";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const Conversation = ({ messages, contact, onSendMessage, avatarMe }) => {
  const [message, setMessage] = useState("");
  const [activePlatform, setActivePlatform] = useState("whatsapp");
  const messagesEndRef = useRef(null);

  // Cores associadas a cada plataforma
  const platformColors = {
    whatsapp: "#25D366",
    facebook: "#1877F2",
    instagram: "#E1306C",
    telegram: "#0088cc",
    email: "#FFA500"
  };

  // Ícones para cada plataforma
  const platformIcons = {
    whatsapp: "bxl-whatsapp",
    facebook: "bxl-facebook-square",
    instagram: "bxl-instagram",
    telegram: "bxl-telegram",
    email: "bx-envelope"
  };

  // Rolar para a última mensagem quando as mensagens mudarem
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Formatar a data da mensagem
  const formatMessageTime = (timestamp) => {
    return format(new Date(timestamp), "HH:mm", { locale: ptBR });
  };

  // Formatar a data da mensagem completa
  const formatMessageDate = (timestamp) => {
    const today = new Date();
    const messageDate = new Date(timestamp);
    
    if (
      messageDate.getDate() === today.getDate() &&
      messageDate.getMonth() === today.getMonth() &&
      messageDate.getFullYear() === today.getFullYear()
    ) {
      return "Hoje";
    }
    
    return format(messageDate, "dd 'de' MMMM", { locale: ptBR });
  };

  // Agrupar mensagens por data
  const groupMessagesByDate = () => {
    const groups = {};
    
    messages.forEach(msg => {
      const date = formatMessageDate(msg.timestamp);
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(msg);
    });
    
    return groups;
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    
    if (message.trim() !== "") {
      onSendMessage(message, activePlatform);
      setMessage("");
    }
  };

  const messageGroups = groupMessagesByDate();

  return (
    <div className="conversation-container">
      {/* Área de mensagens */}
      <div className="chat-conversation p-3">
        <PerfectScrollbar style={{ height: "calc(100vh - 180px)" }}>
          <ul className="list-unstyled mb-0" style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
            {Object.keys(messageGroups).map((date) => (
              <React.Fragment key={date}>
                <li style={{ marginBottom: "15px", marginTop: "10px" }}>
                  <div className="chat-day-title">
                    <span className="title" style={{ borderRadius: "20px", padding: "5px 15px", backgroundColor: "#f1f1f1", fontSize: "0.8rem" }}>
                      {date}
                    </span>
                  </div>
                </li>
                
                {messageGroups[date].map((msg) => (
                  <li
                    key={msg.id}
                    className={`${msg.sender === "me" ? "right" : ""}`}
                    style={{ marginBottom: "8px" }}
                  >
                    <div className="conversation-list" style={{ display: "flex", alignItems: "flex-start" }}>
                      {msg.sender !== "me" && (
                        <div className="chat-avatar me-2">
                          <img
                            src={contact?.avatar}
                            alt={contact?.name}
                            className="rounded-circle"
                            style={{ width: "36px", height: "36px" }}
                          />
                        </div>
                      )}

                      <div 
                        className="user-chat-content"
                        style={
                          msg.sender === "me" 
                            ? { 
                                borderRight: `3px solid ${platformColors[msg.platform] || "#007bff"}`,
                                backgroundColor: "#f8f9fa",
                                borderRadius: "15px 0 15px 15px",
                                padding: "10px 15px",
                                marginLeft: "auto",
                                maxWidth: "80%"
                              } 
                            : { 
                                borderLeft: `3px solid ${platformColors[msg.platform] || "#ccc"}`,
                                backgroundColor: "#ffffff",
                                borderRadius: "0 15px 15px 15px",
                                padding: "10px 15px",
                                maxWidth: "80%"
                              }
                        }
                      >
                        <div className="chat-message">
                          <div className="ctext-wrap">
                            <div className="ctext-wrap-content">
                              <div 
                                className="d-flex align-items-center mb-1"
                                style={{ color: platformColors[msg.platform] }}
                              >
                                <i className={`bx ${platformIcons[msg.platform]} me-1`}></i>
                                <small>{msg.platform.charAt(0).toUpperCase() + msg.platform.slice(1)}</small>
                              </div>
                              <p className="mb-0">{msg.content}</p>
                              <p className="chat-time mb-0 text-muted mt-1" style={{ fontSize: "0.7rem", textAlign: msg.sender === "me" ? "right" : "left" }}>
                                <i className="bx bx-time-five align-middle me-1"></i>
                                {formatMessageTime(msg.timestamp)}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {msg.sender === "me" && (
                        <div className="chat-avatar ms-2">
                          <img
                            src={avatarMe}
                            alt="Eu"
                            className="rounded-circle"
                            style={{ width: "36px", height: "36px" }}
                          />
                        </div>
                      )}
                    </div>
                  </li>
                ))}
              </React.Fragment>
            ))}
            <div ref={messagesEndRef} />
          </ul>
        </PerfectScrollbar>
      </div>

      {/* Área de entrada de mensagem */}
      <div className="p-3 chat-input-section border-top">
        <Row>
          <Col>
            <Form onSubmit={handleSendMessage}>
              <div className="position-relative d-flex align-items-start">
                <UncontrolledDropdown className="me-2">
                  <DropdownToggle 
                    tag="button" 
                    className="btn btn-light dropdown-toggle" 
                    style={{ 
                      backgroundColor: platformColors[activePlatform],
                      borderColor: platformColors[activePlatform],
                      color: "white"
                    }}
                  >
                    <i className={`bx ${platformIcons[activePlatform]} fs-5 align-middle`}></i>
                  </DropdownToggle>
                  <DropdownMenu>
                    {Object.keys(platformIcons).map(platform => (
                      <DropdownItem 
                        key={platform} 
                        onClick={() => setActivePlatform(platform)}
                        active={activePlatform === platform}
                      >
                        <i className={`bx ${platformIcons[platform]} me-2`}></i>
                        {platform.charAt(0).toUpperCase() + platform.slice(1)}
                      </DropdownItem>
                    ))}
                  </DropdownMenu>
                </UncontrolledDropdown>
                
                <div className="flex-grow-1">
                  <Input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="form-control chat-input"
                    placeholder={`Escrever mensagem via ${activePlatform}...`}
                  />
                </div>
                <div className="chat-input-links ms-2">
                  <ul className="list-inline mb-0">
                    <li className="list-inline-item">
                      <Button
                        type="submit"
                        color="primary"
                        className="font-size-16 btn-lg chat-send waves-effect waves-light"
                      >
                        <i className="bx bx-send align-middle"></i>
                      </Button>
                    </li>
                  </ul>
                </div>
              </div>
            </Form>
          </Col>
        </Row>
      </div>
    </div>
  );
};

Conversation.propTypes = {
  messages: PropTypes.array.isRequired,
  contact: PropTypes.object,
  onSendMessage: PropTypes.func.isRequired,
  avatarMe: PropTypes.string
};

Conversation.defaultProps = {
  avatarMe: ""
};

export default Conversation; 