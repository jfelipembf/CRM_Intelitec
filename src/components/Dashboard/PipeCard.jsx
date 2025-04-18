import React from "react";
import PropTypes from "prop-types";
import { Card } from "reactstrap";

const PipeCard = ({ opportunity, onDragStart }) => {
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
    backgroundColor: 'rgba(255, 192, 203, 0.15)',  // Rosa claro para cards atrasados
    borderLeft: '3px solid #ff6b81' // Borda rosa à esquerda 
  } : opportunity.sold ? {
    backgroundColor: 'rgba(152, 251, 152, 0.15)', // Verde claro para oportunidades vendidas
    borderLeft: '3px solid #28a745' // Borda verde à esquerda
  } : {
    // Estilo para cards normais (não vencidos, não vendidos)
    backgroundColor: 'rgba(255, 255, 255, 1)',
    borderLeft: '3px solid #17a2b8' // Borda azul para cards normais
  };
  
  // Função para iniciar o arrastar
  const handleDragStart = (e) => {
    // Adicionando a classe de arrastar para estilização
    e.target.classList.add('dragging-card');
    
    // Definindo os dados a serem transferidos
    e.dataTransfer.setData('application/json', JSON.stringify(opportunity));
    
    // Configurar efeito de cópia para melhor compatibilidade
    e.dataTransfer.effectAllowed = 'move';
    
    // Definindo a imagem de arrastar (opcional)
    const dragImage = e.target.cloneNode(true);
    dragImage.style.width = `${e.target.offsetWidth}px`;
    dragImage.style.transform = 'rotate(3deg)';
    dragImage.style.position = 'absolute';
    dragImage.style.top = '-1000px';
    document.body.appendChild(dragImage);
    e.dataTransfer.setDragImage(dragImage, 20, 20);
    
    // Limpeza após um curto atraso
    setTimeout(() => {
      document.body.removeChild(dragImage);
    }, 0);
    
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
  
  return (
    <Card 
      className={`mb-2 border shadow-none pipeline-card ${isOverdue() ? 'overdue-card' : ''} ${opportunity.sold ? 'sold-card' : ''} ${!isOverdue() && !opportunity.sold ? 'normal-card' : ''}`}
      draggable="true"
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      data-opportunity-id={opportunity.id}
      style={cardStyle}
    >
      <div className="p-2">
        {/* Cabeçalho com título e badge de probabilidade */}
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h6 className="mb-0 text-truncate" style={{ maxWidth: "180px" }}>
            {opportunity.name}
          </h6>
          <span className={`badge bg-${opportunity.probability >= 70 ? 'success' : opportunity.probability >= 40 ? 'warning' : 'danger'} rounded-pill fs-10`}>
            {opportunity.probability}%
          </span>
        </div>

        {/* Status de vendida (se aplicável) */}
        {opportunity.sold && (
          <div className="mb-2">
            <span className="badge bg-success rounded-pill w-100 text-center">
              <i className="mdi mdi-check-circle me-1"></i>Vendida
            </span>
          </div>
        )}

        {/* Informações da empresa */}
        <div className="text-muted small d-flex align-items-center mb-2">
          <i className="mdi mdi-office-building-outline me-1"></i>
          <span className="text-truncate" style={{ maxWidth: "200px" }}>
            {opportunity.company}
          </span>
        </div>

        {/* Valor da oportunidade */}
        <div className="small mb-2">
          <div className="d-flex align-items-center">
            <i className="mdi mdi-cash-multiple me-1 text-success"></i>
            <span>{formatCurrency(opportunity.amount)}</span>
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
              {opportunity.dueDate}
            </span>
          </div>
        </div>

        {/* Responsável */}
        <div className="small">
          <div className="d-flex align-items-center">
            <i className="mdi mdi-account me-1"></i>
            <span className="text-truncate" style={{ maxWidth: "200px" }}>
              {opportunity.responsible}
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
    probability: PropTypes.number,
    dueDate: PropTypes.string,
    responsible: PropTypes.string,
    stageId: PropTypes.number.isRequired,
    sold: PropTypes.bool
  }).isRequired,
  onDragStart: PropTypes.func
};

export default PipeCard;
