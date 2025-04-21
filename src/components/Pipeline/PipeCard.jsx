import React, { useState } from "react";
import PropTypes from "prop-types";
import { Card, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import { useNavigate } from "react-router-dom";

const PipeCard = ({ opportunity, onDragStart }) => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Formatação de valores monetários
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', { 
      style: 'currency', 
      currency: 'BRL',
      minimumFractionDigits: 2
    }).format(value || 0);
  };
  
  // Verificar se a oportunidade está atrasada
  const isOverdue = () => {
    if (!opportunity.dueDate || opportunity.sold) return false; // Não considerar atrasada se já foi vendida
    
    try {
      // Converter a data no formato brasileiro (DD/MM/YYYY) para o formato Date
      const parts = opportunity.dueDate.split('/');
      if (parts.length !== 3) return false;
      
      const dueDate = new Date(parts[2], parts[1] - 1, parts[0]); // ano, mês (0-11), dia
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Resetar horas para comparação apenas de data
      
      return dueDate < today;
    } catch (error) {
      console.error("Erro ao verificar data de vencimento:", error);
      return false;
    }
  };
  
  // Determinar o estilo do card com base no status de atraso
  const cardStyle = isOverdue() ? { 
    borderLeft: '3px solid #ff6b81' // Borda rosa à esquerda para cards atrasados
  } : {
    // Estilo para cards normais (não vencidos, não vendidos)
    borderLeft: '3px solid #17a2b8' // Borda azul para cards normais
  };
  
  // Função para iniciar o arrastar
  const handleDragStart = (e) => {
    // Adicionando a classe de arrastar para estilização
    e.target.classList.add('dragging-card');
    
    // Definindo os dados a serem transferidos
    e.dataTransfer.setData('application/json', JSON.stringify({
      id: opportunity.id,
      stageId: opportunity.stageId
    }));
    
    // Configurar efeito de cópia para melhor compatibilidade
    e.dataTransfer.effectAllowed = 'move';
    
    // Callback para o componente pai (opcional)
    if (onDragStart) {
      onDragStart(opportunity);
    }
  };
  
  // Função para finalizar o arrastar
  const handleDragEnd = (e) => {
    e.target.classList.remove('dragging-card');
    
    // Limpar qualquer elemento com a classe drag-over
    document.querySelectorAll('.drag-over').forEach(el => {
      el.classList.remove('drag-over');
    });
  };
  
  // Prevenir eventos de drag sobre o próprio card
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };
  
  // Função para navegar para a página de detalhes do cliente
  const handleCardClick = (e) => {
    // Não navegar se o usuário está arrastando o card
    if (e.target.classList.contains('dragging-card')) return;
    
    // Evitar navegação se o clique foi em um elemento interativo dentro do card
    if (e.target.closest('button, a, [role="button"]')) return;
    
    // Navegar para a página de detalhes do cliente
    navigate(`/cliente/${opportunity.id}`);
  };
  
  return (
    <Card 
      className={`mb-2 border shadow-sm pipeline-card ${isOverdue() ? 'overdue-card' : ''} ${!isOverdue() ? 'normal-card' : ''} d-flex flex-column`}
      draggable="true"
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      onClick={handleCardClick}
      data-opportunity-id={opportunity.id}
      style={{...cardStyle, cursor: 'pointer'}}
    >
      <div className="p-2">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h6 className="mb-0 text-truncate fw-medium" style={{ maxWidth: "210px" }}>
            {opportunity.name}
          </h6>
          <div className="d-flex align-items-center">
            <Dropdown isOpen={dropdownOpen} toggle={() => setDropdownOpen(!dropdownOpen)}>
              <DropdownToggle tag="button" className="btn btn-link p-0" style={{ border: 'none', background: 'none' }}>
                <i className="mdi mdi-dots-vertical"></i>
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem onClick={() => navigate(`/cliente/${opportunity.id}`)}>
                  <i className="mdi mdi-information-outline"></i> Info
                </DropdownItem>
                <DropdownItem onClick={() => navigate(`/atendimento/${opportunity.id}`)}>
                  <i className="mdi mdi-headset"></i> Atendimento
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>

        {/* Informações da empresa */}
        <div className="text-muted small d-flex align-items-center mb-2">
          <i className="mdi mdi-office-building-outline me-1"></i>
          <span className="text-truncate" style={{ maxWidth: "240px" }}>
            {opportunity.company}
          </span>
        </div>

        {/* Linha separadora */}
        <hr className="my-2" style={{ opacity: 0.1 }} />

        {/* Valor da oportunidade */}
        <div className="small mb-2">
          <div className="d-flex align-items-center">
            <i className="mdi mdi-cash-multiple me-1 text-success"></i>
            <span className="fw-medium">{formatCurrency(opportunity.amount)}</span>
          </div>
          {opportunity.recurrent && (
            <div className="d-flex align-items-center mt-1">
              <i className="mdi mdi-refresh me-1 text-info"></i>
              <span>{formatCurrency(opportunity.recurrentAmount)}/mês</span>
            </div>
          )}
        </div>

        {/* Data de vencimento */}
        <div className="small mb-2">
          <div className="d-flex align-items-center">
            <i className={`mdi mdi-calendar me-1 ${isOverdue() ? 'text-danger' : ''}`}></i>
            <span className={isOverdue() ? 'text-danger fw-medium' : ''}>
              {opportunity.dueDate} {isOverdue() && <small>(Atrasado)</small>}
            </span>
          </div>
        </div>


      </div>
    </Card>
  );
};

PipeCard.propTypes = {
  opportunity: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    company: PropTypes.string.isRequired,
    amount: PropTypes.number,
    recurrent: PropTypes.bool,
    recurrentAmount: PropTypes.number,
    dueDate: PropTypes.string,
    stageId: PropTypes.number.isRequired
  }).isRequired,
  onDragStart: PropTypes.func
};

export default PipeCard;
