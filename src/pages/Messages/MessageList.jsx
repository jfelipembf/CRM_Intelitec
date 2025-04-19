import React from "react";
import PropTypes from "prop-types";
import { Badge } from "reactstrap";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

const MessageList = ({ contacts, selectedContact, onContactSelect }) => {
  // Função para formatar o horário da última mensagem
  const formatTime = (timestamp) => {
    try {
      return formatDistanceToNow(new Date(timestamp), { 
        addSuffix: true,
        locale: ptBR
      });
    } catch (error) {
      return "agora";
    }
  };

  // Ícones para cada plataforma
  const platformIcons = {
    whatsapp: "bxl-whatsapp text-success",
    facebook: "bxl-facebook-square text-primary",
    instagram: "bxl-instagram text-danger",
    telegram: "bxl-telegram text-info",
    email: "bx-envelope text-warning",
  };

  return (
    <div className="message-list">
      {contacts.length > 0 ? (
        contacts.map((contact) => {
          const isSelected = selectedContact?.id === contact.id;
          const hasUnread = contact.channels.some(ch => !ch.read);
          
          return (
            <div
              key={contact.id}
              className={`p-3 border-bottom d-flex contact-item ${isSelected ? "bg-light" : ""} ${hasUnread ? "fw-bold" : ""}`}
              onClick={() => onContactSelect(contact)}
              style={{ cursor: "pointer" }}
            >
              <div className="me-3 position-relative">
                <img
                  src={contact.avatar}
                  className="rounded-circle avatar-xs"
                  alt={contact.name}
                />
                {contact.online && (
                  <span className="user-status bg-success"></span>
                )}
              </div>
              
              <div className="flex-grow-1 overflow-hidden">
                <div className="d-flex">
                  <h5 className="text-truncate font-size-14 mb-1">
                    {contact.name}
                  </h5>
                  <div className="ms-auto">
                    <span className="font-size-11 text-muted">
                      {formatTime(contact.lastMessageTime)}
                    </span>
                  </div>
                </div>
                
                <div className="d-flex">
                  <p className="text-truncate text-muted mb-0">
                    {/* Ícone da plataforma da última mensagem */}
                    <i className={`bx ${platformIcons[contact.lastMessagePlatform]} me-1`}></i>
                    {contact.lastMessage}
                  </p>
                  
                  <div className="ms-auto">
                    {hasUnread && (
                      <Badge pill color="danger" className="badge-soft-danger">
                        {contact.channels.filter(ch => !ch.read).length}
                      </Badge>
                    )}
                  </div>
                </div>
                
                <div className="mt-1">
                  {contact.channels.map(channel => (
                    <span 
                      key={channel.type} 
                      className={`me-1 ${!channel.read ? 'text-danger' : 'text-muted'}`}
                      title={`${channel.type.charAt(0).toUpperCase() + channel.type.slice(1)} ${!channel.read ? '(não lido)' : ''}`}
                    >
                      <i className={`bx ${platformIcons[channel.type]} small`}></i>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div className="text-center p-4 text-muted">
          <i className="bx bx-search-alt fs-2 mb-2"></i>
          <p>Nenhum contato encontrado</p>
        </div>
      )}
    </div>
  );
};

MessageList.propTypes = {
  contacts: PropTypes.array.isRequired,
  selectedContact: PropTypes.object,
  onContactSelect: PropTypes.func.isRequired
};

export default MessageList; 