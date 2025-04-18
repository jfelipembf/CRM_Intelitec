import React, { useRef, useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";
import { withTranslation } from "react-i18next";
import { Alert, Button, ButtonGroup, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./pipeline.css";
import PipeCard from "./PipeCard";
import { opportunities as initialOpportunities, calculatePipelineTotals } from "./mockData";

// Importando os avatares
import avatar1 from "../../assets/images/users/avatar-1.jpg";
import avatar2 from "../../assets/images/users/avatar-2.jpg";
import avatar3 from "../../assets/images/users/avatar-3.jpg";
import avatar4 from "../../assets/images/users/avatar-4.jpg";
import avatar5 from "../../assets/images/users/avatar-5.jpg";
import avatar6 from "../../assets/images/users/avatar-6.jpg";
import avatar7 from "../../assets/images/users/avatar-7.jpg";
import avatar8 from "../../assets/images/users/avatar-8.jpg";

const Pipeline = props => {
  const { t } = props;
  const scrollContainerRef = useRef(null);
  
  // Estado para armazenar as oportunidades
  const [opportunities, setOpportunities] = useState(initialOpportunities);
  
  // Estado para mensagens de feedback
  const [feedback, setFeedback] = useState(null);
  
  // Estado para controlar o tipo de visualização (pipeline ou lista)
  const [viewMode, setViewMode] = useState('list');
  
  // Estado para controlar o tipo de visualização em lista (simplificada, detalhada, cards)
  const [listViewType, setListViewType] = useState('simple');
  
  // Estado para armazenar os IDs das oportunidades selecionadas na visualização em lista
  const [selectedOpportunities, setSelectedOpportunities] = useState([]);
  
  // Estados para modal de confirmação de exclusão
  const [deleteModal, setDeleteModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  
  // Calcular totais e agrupar oportunidades por estágio
  const { 
    totalOpportunities, 
    totalAmount, 
    totalRecurrentAmount, 
    opportunitiesByStage 
  } = calculatePipelineTotals(opportunities);
  
  // Função para alternar o tipo de visualização
  const toggleViewMode = () => {
    setViewMode(viewMode === 'pipeline' ? 'list' : 'pipeline');
    // Limpar seleções ao alternar visualização
    setSelectedOpportunities([]);
  };
  
  // Função para lidar com a seleção de oportunidades na visualização em lista
  const handleOpportunitySelection = (opportunityId) => {
    setSelectedOpportunities(prevSelected => {
      if (prevSelected.includes(opportunityId)) {
        return prevSelected.filter(id => id !== opportunityId);
      } else {
        return [...prevSelected, opportunityId];
      }
    });
  };
  
  // Função para selecionar/desselecionar todas as oportunidades
  const handleSelectAll = (isChecked) => {
    if (isChecked) {
      setSelectedOpportunities(opportunities.map(opp => opp.id));
    } else {
      setSelectedOpportunities([]);
    }
  };
  
  // Função para abrir modal de confirmação de exclusão
  const confirmDelete = (opportunityId) => {
    const opportunity = opportunities.find(opp => opp.id === opportunityId);
    setItemToDelete(opportunity);
    setDeleteModal(true);
  };
  
  // Função para excluir oportunidade após confirmação
  const handleDeleteConfirm = () => {
    if (!itemToDelete) return;
    
    const updatedOpportunities = opportunities.filter(opp => opp.id !== itemToDelete.id);
    setOpportunities(updatedOpportunities);
    
    // Mostrar toast de sucesso
    toast.success(`Oportunidade "${itemToDelete.name}" excluída com sucesso!`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    
    // Fechar modal
    setDeleteModal(false);
    setItemToDelete(null);
    
    // Remover da seleção se estiver selecionada
    if (selectedOpportunities.includes(itemToDelete.id)) {
      setSelectedOpportunities(prev => prev.filter(id => id !== itemToDelete.id));
    }
  };
  
  // Função para fechar modal de confirmação
  const handleDeleteCancel = () => {
    setDeleteModal(false);
    setItemToDelete(null);
  };
  
  // Função para formatar valores monetários
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', { 
      style: 'currency', 
      currency: 'BRL',
      minimumFractionDigits: 2
    }).format(value || 0);
  };

  // Função para atualizar uma oportunidade (após o arrastar)
  const updateOpportunity = (id, newStageId) => {
    const opportunity = opportunities.find(opp => opp.id === id);
    if (!opportunity) return;
    
    // Se a oportunidade está sendo movida para a etapa de Fechamento 
    // e ainda não foi marcada como vendida
    if (newStageId === 6 && !opportunity.sold) {
      // Verificar com o usuário se deseja marcar como vendida
      const shouldMarkAsSold = window.confirm(
        `Deseja marcar a oportunidade "${opportunity.name}" como VENDIDA?`
      );
      
      // Atualizar a oportunidade com o novo estágio e status de venda
      const updatedOpportunities = opportunities.map(opp => {
        if (opp.id === id) {
          return { 
            ...opp, 
            stageId: newStageId,
            sold: shouldMarkAsSold, // Atualiza o status de venda conforme a escolha do usuário
            probability: shouldMarkAsSold ? 100 : opp.probability // Se vendida, probabilidade é 100%
          };
        }
        return opp;
      });
      
      setOpportunities(updatedOpportunities);
      
      // Feedback para o usuário
      const stageName = pipelineStages.find(stage => stage.id === newStageId)?.title;
      toast.success(
        `Oportunidade "${opportunity.name}" movida para etapa "${stageName}"${shouldMarkAsSold ? ' e marcada como VENDIDA!' : ''}`,
        {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        }
      );
    } else {
      // Caso normal - apenas muda o estágio
      const updatedOpportunities = opportunities.map(opp => {
        if (opp.id === id) {
          return { ...opp, stageId: newStageId };
        }
        return opp;
      });
      
      setOpportunities(updatedOpportunities);
      
      // Feedback para o usuário
      const stageName = pipelineStages.find(stage => stage.id === newStageId)?.title;
      toast.success(
        `Oportunidade "${opportunity.name}" movida para etapa "${stageName}"`,
        {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        }
      );
    }
  };

  // Função para lidar com o evento de drop
  const handleDrop = (e, stageId) => {
    e.preventDefault();
    e.stopPropagation(); // Impede a propagação do evento para outros elementos
    
    const currentElement = e.currentTarget;
    // Remove a classe de todos os elementos potenciais
    document.querySelectorAll('.drag-over').forEach(el => {
      el.classList.remove('drag-over');
    });
    
    try {
      const data = e.dataTransfer.getData('application/json');
      const opportunity = JSON.parse(data);
      
      // Verifica se a oportunidade já está nessa etapa
      if (opportunity.stageId === stageId) {
        return;
      }
      
      // Atualiza a oportunidade para a nova etapa
      updateOpportunity(opportunity.id, stageId);
    } catch (error) {
      console.error('Erro ao processar o arrastar e soltar:', error);
    }
  };
  
  // Função para permitir o drop
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation(); // Impede a propagação do evento para outros elementos
    
    // Garante que somente o dropzone principal recebe a classe
    if (!e.currentTarget.classList.contains('pipeline-dropzone')) {
      return;
    }
    
    e.currentTarget.classList.add('drag-over');
  };
  
  // Função para lidar com o evento de saída do cursor
  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation(); // Impede a propagação do evento
    
    // Verifica se o mouse está realmente saindo do elemento (não entrando em um filho)
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX;
    const y = e.clientY;
    
    // Se o cursor estiver fora dos limites do elemento atual
    if (
      x <= rect.left || 
      x >= rect.right || 
      y <= rect.top || 
      y >= rect.bottom
    ) {
      e.currentTarget.classList.remove('drag-over');
    }
  };

  // Função para habilitar a rolagem com arrasto do mouse e touch
  useEffect(() => {
    // Somente configurar o arrasto se estiver na visualização de pipeline e o container existir
    if (viewMode !== 'pipeline' || !scrollContainerRef.current) return;
    
    const slider = scrollContainerRef.current;
    let isDown = false;
    let startX;
    let scrollLeft;

    // Handlers para mouse
    const handleMouseDown = (e) => {
      // Ignorar se o clique for em um card ou em qualquer conteúdo interativo
      if (e.target.closest('.pipeline-card') || 
          e.target.closest('button') || 
          e.target.closest('a') || 
          e.target.closest('input')) {
        return;
      }
      
      isDown = true;
      slider.classList.add('dragging');
      slider.style.cursor = 'grabbing';
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
      
      // Previne eventos padrão para evitar seleção de texto
      e.preventDefault();
    };

    const handleMouseLeave = () => {
      isDown = false;
      slider.classList.remove('dragging');
      slider.style.cursor = 'grab';
    };

    const handleMouseUp = () => {
      isDown = false;
      slider.classList.remove('dragging');
      slider.style.cursor = 'grab';
    };

    const handleMouseMove = (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 2; // Velocidade de rolagem
      slider.scrollLeft = scrollLeft - walk;
    };

    // Handlers para touch
    const handleTouchStart = (e) => {
      // Ignorar se o toque for em um card ou em qualquer conteúdo interativo
      if (e.target.closest('.pipeline-card') || 
          e.target.closest('button') || 
          e.target.closest('a') || 
          e.target.closest('input')) {
        return;
      }
      
      isDown = true;
      slider.classList.add('dragging');
      startX = e.touches[0].pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    };

    const handleTouchEnd = () => {
      isDown = false;
      slider.classList.remove('dragging');
    };

    const handleTouchMove = (e) => {
      if (!isDown) return;
      const x = e.touches[0].pageX - slider.offsetLeft;
      const walk = (x - startX) * 2;
      slider.scrollLeft = scrollLeft - walk;
    };

    // Definir estilo inicial
    slider.style.cursor = 'grab';
    
    // Adicionar atributos para melhorar acessibilidade e UX
    slider.setAttribute('aria-label', 'Pipeline de vendas - arraste para navegar');
    slider.setAttribute('role', 'region');
    slider.setAttribute('tabindex', '0');

    // Adiciona event listeners para mouse
    slider.addEventListener('mousedown', handleMouseDown);
    slider.addEventListener('mouseleave', handleMouseLeave);
    slider.addEventListener('mouseup', handleMouseUp);
    slider.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    
    // Adiciona event listeners para touch
    slider.addEventListener('touchstart', handleTouchStart);
    slider.addEventListener('touchend', handleTouchEnd);
    slider.addEventListener('touchmove', handleTouchMove);

    // Log para debug
    console.log('Eventos de arrasto configurados para o pipeline');

    return () => {
      // Remove event listeners para mouse
      slider.removeEventListener('mousedown', handleMouseDown);
      slider.removeEventListener('mouseleave', handleMouseLeave);
      slider.removeEventListener('mouseup', handleMouseUp);
      slider.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      
      // Remove event listeners para touch
      slider.removeEventListener('touchstart', handleTouchStart);
      slider.removeEventListener('touchend', handleTouchEnd);
      slider.removeEventListener('touchmove', handleTouchMove);
      
      // Log para debug
      console.log('Eventos de arrasto removidos');
    };
  }, [viewMode]); // Adicionar viewMode como dependência para reconfigurar quando mudar

  // Event listener global para drag
  useEffect(() => {
    // Manipulador global de eventos drag para melhorar a experiência
    const handleGlobalDragOver = (e) => {
      if (e.target.closest('.pipeline-dropzone')) {
        // Se estamos sobre uma dropzone, garantir que ela está marcada
        const dropzone = e.target.closest('.pipeline-dropzone');
        
        // Remover classe de todas as outras dropzones
        document.querySelectorAll('.pipeline-dropzone.drag-over').forEach(el => {
          if (el !== dropzone) {
            el.classList.remove('drag-over');
          }
        });
        
        // Adicionar classe à dropzone atual
        if (!dropzone.classList.contains('drag-over')) {
          dropzone.classList.add('drag-over');
        }
      } else {
        // Se não estamos sobre uma dropzone, limpar todas as marcações
        const isDraggingCard = document.querySelector('.dragging-card');
        if (isDraggingCard) {
          // Só limpar se estivermos realmente arrastando um card
          document.querySelectorAll('.pipeline-dropzone.drag-over').forEach(el => {
            el.classList.remove('drag-over');
          });
        }
      }
    };

    // Limpar todas as marcações de drag-over ao término
    const handleGlobalDragEnd = () => {
      document.querySelectorAll('.drag-over').forEach(el => {
        el.classList.remove('drag-over');
      });
    };

    // Adicionar event listeners globais
    document.addEventListener('dragover', handleGlobalDragOver);
    document.addEventListener('dragend', handleGlobalDragEnd);
    document.addEventListener('drop', handleGlobalDragEnd);

    // Limpar listeners ao desmontar
    return () => {
      document.removeEventListener('dragover', handleGlobalDragOver);
      document.removeEventListener('dragend', handleGlobalDragEnd);
      document.removeEventListener('drop', handleGlobalDragEnd);
    };
  }, []);

  // Estágios do funil de vendas
  const pipelineStages = [
    {
      id: 0,
      title: "Cadastro",
      count: opportunitiesByStage[0] ? opportunitiesByStage[0].length : 0,
      percent: "0%",
      totalAmount: formatCurrency(opportunitiesByStage[0]?.reduce((sum, opp) => sum + opp.amount, 0) || 0),
      icon: "mdi-account-plus-outline"
    },
    {
      id: 1,
      title: "Contato",
      count: opportunitiesByStage[1] ? opportunitiesByStage[1].length : 0,
      percent: "0%",
      totalAmount: formatCurrency(opportunitiesByStage[1]?.reduce((sum, opp) => sum + opp.amount, 0) || 0),
      icon: "mdi-phone-outline"
    },
    {
      id: 2,
      title: "Reunião",
      count: opportunitiesByStage[2] ? opportunitiesByStage[2].length : 0,
      percent: "0%",
      totalAmount: formatCurrency(opportunitiesByStage[2]?.reduce((sum, opp) => sum + opp.amount, 0) || 0),
      icon: "mdi-account-group-outline"
    },
    {
      id: 3,
      title: "Proposta",
      count: opportunitiesByStage[3] ? opportunitiesByStage[3].length : 0,
      percent: "0%",
      totalAmount: formatCurrency(opportunitiesByStage[3]?.reduce((sum, opp) => sum + opp.amount, 0) || 0),
      icon: "mdi-file-document-outline"
    },
    {
      id: 4,
      title: "Follow-Up",
      count: opportunitiesByStage[4] ? opportunitiesByStage[4].length : 0,
      percent: "0%",
      totalAmount: formatCurrency(opportunitiesByStage[4]?.reduce((sum, opp) => sum + opp.amount, 0) || 0),
      icon: "mdi-arrow-right-circle-outline"
    },
    {
      id: 5,
      title: "Negociação",
      count: opportunitiesByStage[5] ? opportunitiesByStage[5].length : 0,
      percent: "0%",
      totalAmount: formatCurrency(opportunitiesByStage[5]?.reduce((sum, opp) => sum + opp.amount, 0) || 0),
      icon: "mdi-handshake-outline"
    },
    {
      id: 6,
      title: "Fechamento",
      count: opportunitiesByStage[6] ? opportunitiesByStage[6].length : 0,
      percent: "0%",
      totalAmount: formatCurrency(opportunitiesByStage[6]?.reduce((sum, opp) => sum + opp.amount, 0) || 0),
      icon: "mdi-checkbox-marked-circle-outline"
    }
  ];

  // Função para lidar com a exclusão de oportunidades selecionadas
  const handleDeleteSelected = () => {
    if (selectedOpportunities.length === 0) return;
    
    if (window.confirm(`Deseja excluir ${selectedOpportunities.length} oportunidade(s) selecionada(s)?`)) {
      const updatedOpportunities = opportunities.filter(
        opp => !selectedOpportunities.includes(opp.id)
      );
      
      setOpportunities(updatedOpportunities);
      setSelectedOpportunities([]);
      
      toast.success(`${selectedOpportunities.length} oportunidade(s) excluída(s) com sucesso.`, {
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
  
  // Função para marcar as oportunidades selecionadas como vendidas
  const handleMarkAsSold = () => {
    if (selectedOpportunities.length === 0) return;
    
    if (window.confirm(`Deseja marcar ${selectedOpportunities.length} oportunidade(s) como VENDIDA(S)?`)) {
      const updatedOpportunities = opportunities.map(opp => {
        if (selectedOpportunities.includes(opp.id)) {
          return { ...opp, sold: true, probability: 100 };
        }
        return opp;
      });
      
      setOpportunities(updatedOpportunities);
      
      toast.success(`${selectedOpportunities.length} oportunidade(s) marcada(s) como vendida(s).`, {
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
  
  // Função para mostrar o diálogo de mover oportunidades selecionadas
  const [showMoveDialog, setShowMoveDialog] = useState(false);
  const [targetStageId, setTargetStageId] = useState(null);
  
  const handleMoveSelectedOpen = () => {
    if (selectedOpportunities.length === 0) return;
    setShowMoveDialog(true);
  };
  
  const handleMoveSelectedConfirm = () => {
    if (!targetStageId) return;
    
    const updatedOpportunities = opportunities.map(opp => {
      if (selectedOpportunities.includes(opp.id)) {
        // Se mover para Fechamento e não estiver vendida, perguntar se deseja marcar como vendida
        if (targetStageId === 6 && !opp.sold) {
          return { 
            ...opp, 
            stageId: targetStageId,
            // Não atualiza automaticamente o status de venda ao mover várias oportunidades
          };
        }
        
        return { ...opp, stageId: targetStageId };
      }
      return opp;
    });
    
    setOpportunities(updatedOpportunities);
    setShowMoveDialog(false);
    setTargetStageId(null);
    
    const stageName = pipelineStages.find(stage => stage.id === targetStageId)?.title;
    toast.success(
      `${selectedOpportunities.length} oportunidade(s) movida(s) para etapa "${stageName}".`,
      {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      }
    );
  };
  
  const handleMoveSelectedCancel = () => {
    setShowMoveDialog(false);
    setTargetStageId(null);
  };

  // Função para obter um avatar com base no ID da oportunidade
  const getAvatarForUser = (opportunityId) => {
    // Usando o módulo do ID para escolher um dos 8 avatares disponíveis
    const avatarIndex = (opportunityId % 8) + 1;
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

  // Função para configurar o container do pipeline
  const setupPipelineContainer = useCallback(() => {
    const slider = scrollContainerRef.current;
    if (!slider) return;

    // Definir estilo inicial
    slider.style.cursor = 'grab';
    
    // Adicionar atributos para melhorar acessibilidade e UX
    slider.setAttribute('aria-label', 'Pipeline de vendas - arraste para navegar');
    slider.setAttribute('role', 'region');
    slider.setAttribute('tabindex', '0');
  }, []);

  return (
    <React.Fragment>
      {/* Feedback para o usuário usando Alert */}
      {feedback && (
        <Alert 
          color={feedback.type} 
          className="mb-3 position-absolute top-0 end-0 m-3" 
          style={{ zIndex: 1050, maxWidth: '350px' }}
        >
          {feedback.message}
        </Alert>
      )}
      
      {/* Adiciona o container de toast */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      
      {/* Cabeçalho com título e botão de alternância de visualização */}
      <div className="mb-3 d-flex justify-content-between align-items-center">
        <h5 className="text-muted">
          {t("Funil Vendas")} <small className="text-muted">
            {totalOpportunities} {totalOpportunities === 1 ? 'oportunidade' : 'oportunidades'} | 
            Total de P&S: {formatCurrency(totalAmount)} | 
            Total de MRR: {formatCurrency(totalRecurrentAmount)}
          </small>
        </h5>
        
        {/* Botões de alternância de visualização */}
        <ButtonGroup>
          <Button 
            color={viewMode === 'pipeline' ? 'primary' : 'light'} 
            onClick={() => setViewMode('pipeline')}
            title="Visualização em Pipeline"
          >
            <i className="mdi mdi-view-sequential me-1"></i>
            Pipeline
          </Button>
          <Button 
            color={viewMode === 'list' ? 'primary' : 'light'} 
            onClick={() => setViewMode('list')}
            title="Visualização em Lista"
          >
            <i className="mdi mdi-format-list-bulleted me-1"></i>
            Lista
          </Button>
        </ButtonGroup>
      </div>

      {/* Visualização em Pipeline */}
      {viewMode === 'pipeline' && (
        <div 
          ref={scrollContainerRef}
          className="pipeline-scroll-container"
          style={{ 
            display: 'flex', 
            gap: '8px',
            overflowX: 'scroll', 
            paddingBottom: '15px',
            cursor: 'grab',
            WebkitUserSelect: 'none',
            MozUserSelect: 'none',
            msUserSelect: 'none',
            userSelect: 'none',
            scrollbarWidth: 'none',  /* Firefox */
            msOverflowStyle: 'none',  /* IE and Edge */
            height: 'calc(100vh - 170px)',
          }}
        >
          {pipelineStages.map((stage, index) => (
            <div 
              key={index} 
              className="pipeline-stage"
              style={{ 
                flex: '0 0 260px',
                width: '260px', 
                height: '100%'
              }}
            >
              <div className="border h-100 bg-white d-flex flex-column" style={{ 
                borderRadius: '6px'
              }}>
                <div className="p-3 pb-2 border-bottom border-light pipeline-stage-header">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <h6 className="mb-0 fs-6 text-secondary fw-medium">
                      {stage.id === 6 ? (
                        <span className="text-success">
                          <i className="mdi mdi-checkbox-marked-circle-outline me-1"></i>
                          {index}. {stage.title}
                        </span>
                      ) : (
                        <>{index}. {stage.title}</>
                      )}
                    </h6>
                    <span className={`badge ${stage.id === 6 ? 'bg-success' : 'bg-secondary'} rounded-pill`}>
                      {stage.count}
                    </span>
                  </div>
                  <div className="small text-muted">{stage.totalAmount}</div>
                </div>
                
                {/* Área para os cards de oportunidades (zona de drop) */}
                <div 
                  className="p-2 flex-grow-1 overflow-auto pipeline-dropzone"
                  onDrop={(e) => handleDrop(e, stage.id)}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  data-stage-id={stage.id}
                >
                  {/* Dica de arrastar */}
                  <div className="pipeline-dropzone-hint">
                    <i className="mdi mdi-arrow-down-circle me-1"></i>
                    Solte aqui para mover para {stage.title}
                  </div>
                  
                  {/* Área transparente que cobre toda a zona de drop quando arrastando */}
                  <div className="pipeline-dropzone-overlay" />
                  
                  {/* Cards de oportunidades */}
                  {opportunitiesByStage[stage.id] && opportunitiesByStage[stage.id].length > 0 ? (
                    <div className="d-flex flex-column">
                      {opportunitiesByStage[stage.id].map(opportunity => (
                        <PipeCard key={opportunity.id} opportunity={opportunity} />
                      ))}
                      
                      {/* Espaço extra para permitir soltar no final da lista */}
                      <div className="pipeline-dropzone-end-spacer" />
                    </div>
                  ) : (
                    <div className="d-flex align-items-center justify-content-center h-100 text-center text-muted pipeline-empty-placeholder">
                      <div>
                        <i className="mdi mdi-tray-remove-outline d-block fs-1 mb-3"></i>
                        <span className="fs-6">Etapa vazia</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Visualização em Lista - semelhante à imagem fornecida */}
      {viewMode === 'list' && (
        <div className="table-responsive">
          <table className="table table-hover">
            <thead className="bg-light">
              <tr>
                <th style={{ width: '40px' }}>
                  <div className="form-check">
                    <input 
                      type="checkbox" 
                      className="form-check-input" 
                      id="selectAll"
                      checked={selectedOpportunities.length === opportunities.length}
                      onChange={(e) => handleSelectAll(e.target.checked)}
                    />
                  </div>
                </th>
                <th>Usuário</th>
                <th>Etapa</th>
                <th className="text-center">Dias na etapa</th>
                <th className="text-center">Último contato</th>
                <th>Pessoa</th>
                <th>Pessoa (Telefone)</th>
                <th>Empresa</th>
                <th>Empresa (Telefone)</th>
                <th>Valor de P&S</th>
                <th>Valor de MRR</th>
                <th className="text-center">Ações</th>
              </tr>
            </thead>
            <tbody>
              {opportunities.map(opportunity => {
                const stage = pipelineStages.find(stage => stage.id === opportunity.stageId);
                const isSelected = selectedOpportunities.includes(opportunity.id);
                
                return (
                  <tr 
                    key={opportunity.id}
                    className={isSelected ? 'table-active' : ''}
                    onClick={() => handleOpportunitySelection(opportunity.id)}
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
                            src={getAvatarForUser(opportunity.id)}
                            alt=""
                            className="rounded-circle"
                            width="32"
                            height="32"
                          />
                        </div>
                        <div>
                          <div className="fw-medium">{opportunity.responsible}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="badge bg-light text-dark">
                        {stage?.title}
                      </span>
                    </td>
                    <td className="text-center">
                      <span className="badge bg-light text-dark">0 dias</span>
                    </td>
                    <td className="text-center text-muted small">Há 2 dias</td>
                    <td>{opportunity.responsible}</td>
                    <td>
                      {opportunity.responsiblePhone ? (
                        <div>
                          {opportunity.responsiblePhone}
                          <i className="mdi mdi-whatsapp text-success ms-2"></i>
                        </div>
                      ) : "(55) 51 4063-9792"}
                    </td>
                    <td className="text-muted">{opportunity.company}</td>
                    <td>
                      {opportunity.companyPhone ? (
                        <div>
                          {opportunity.companyPhone}
                          <i className="mdi mdi-whatsapp text-success ms-2"></i>
                        </div>
                      ) : "(55) 51 4063-9792"}
                    </td>
                    <td>{formatCurrency(opportunity.amount)}</td>
                    <td>
                      {opportunity.recurrent 
                        ? formatCurrency(opportunity.recurrentAmount) 
                        : "R$0,00"}
                    </td>
                    <td>
                      <div className="d-flex justify-content-center">
                        <Button 
                          color="link" 
                          className="text-primary p-0 me-2" 
                          title="Editar"
                          onClick={(e) => {
                            e.stopPropagation();
                            // Lógica para editar
                          }}
                        >
                          <i className="mdi mdi-pencil fs-5"></i>
                        </Button>
                        <Button 
                          color="link" 
                          className="text-danger p-0" 
                          title="Excluir"
                          onClick={(e) => {
                            e.stopPropagation();
                            confirmDelete(opportunity.id);
                          }}
                        >
                          <i className="mdi mdi-trash-can-outline fs-5"></i>
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal de confirmação de exclusão */}
      <Modal isOpen={deleteModal} toggle={handleDeleteCancel}>
        <ModalHeader toggle={handleDeleteCancel}>Confirmar exclusão</ModalHeader>
        <ModalBody>
          {itemToDelete && (
            <p>Deseja realmente excluir a oportunidade <strong>"{itemToDelete.name}"</strong>?</p>
          )}
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={handleDeleteCancel} size="lg">Cancelar</Button>
          <Button color="danger" onClick={handleDeleteConfirm} size="lg">Excluir</Button>
        </ModalFooter>
      </Modal>
    </React.Fragment>
  );
};

Pipeline.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation()(Pipeline);