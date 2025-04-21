import React, { useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { 
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button
} from "reactstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./pipeline.css";
import PipeCard from "./PipeCard";
import { opportunities as initialOpportunities, calculatePipelineTotals } from "./mockData";

// Importing avatars
import avatar1 from "../../assets/images/users/avatar-1.jpg";
import avatar2 from "../../assets/images/users/avatar-2.jpg";
import avatar3 from "../../assets/images/users/avatar-3.jpg";
import avatar4 from "../../assets/images/users/avatar-4.jpg";
import avatar5 from "../../assets/images/users/avatar-5.jpg";
import avatar6 from "../../assets/images/users/avatar-6.jpg";
import avatar7 from "../../assets/images/users/avatar-7.jpg";
import avatar8 from "../../assets/images/users/avatar-8.jpg";

const Pipeline = ({ viewMode: externalViewMode, setViewMode: externalSetViewMode, hideControls, stageHeight }) => {
  const scrollContainerRef = useRef(null);
  const [opportunities, setOpportunities] = useState(initialOpportunities);
  const [feedback, setFeedback] = useState(null);
  const [internalViewMode, setInternalViewMode] = useState('pipeline');
  const effectiveViewMode = externalViewMode !== undefined ? externalViewMode : internalViewMode;
  const effectiveSetViewMode = externalSetViewMode || setInternalViewMode;
  const [selectedOpportunities, setSelectedOpportunities] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const { opportunitiesByStage } = calculatePipelineTotals(opportunities);

  // Selection handlers
  const handleOpportunitySelection = (opportunityId) => {
    setSelectedOpportunities(prev =>
      prev.includes(opportunityId)
        ? prev.filter(id => id !== opportunityId)
        : [...prev, opportunityId]
    );
  };
  const handleSelectAll = (isChecked) => {
    setSelectedOpportunities(isChecked ? opportunities.map(opp => opp.id) : []);
  };

  // Delete single opportunity
  const confirmDelete = (opportunityId) => {
    const opp = opportunities.find(o => o.id === opportunityId);
    setItemToDelete(opp);
    setDeleteModal(true);
  };
  const handleDeleteConfirm = () => {
    if (!itemToDelete) return;
    setOpportunities(prev => prev.filter(o => o.id !== itemToDelete.id));
    toast.success(`Oportunidade "${itemToDelete.name}" excluída com sucesso!`);
    setDeleteModal(false);
    setItemToDelete(null);
    setSelectedOpportunities(prev => prev.filter(id => id !== itemToDelete.id));
  };
  const handleDeleteCancel = () => {
    setDeleteModal(false);
    setItemToDelete(null);
  };

  // Utility functions
  const formatCurrency = value =>
    new Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL',minimumFractionDigits:2}).format(value || 0);

  const updateOpportunity = (id, newStageId) => {
    setOpportunities(prev => prev.map(o =>
      o.id === id ? { ...o, stageId: newStageId } : o
    ));
  };
  const handleDrop = (e, stageId) => {
    e.preventDefault();
    const data = JSON.parse(e.dataTransfer.getData('application/json'));
    if (data.stageId !== stageId) updateOpportunity(data.id, stageId);
    document.querySelectorAll('.drag-over').forEach(el => el.classList.remove('drag-over'));
  };
  const handleDragOver = e => { e.preventDefault(); if(e.currentTarget.classList.contains('pipeline-dropzone')) e.currentTarget.classList.add('drag-over'); };
  const handleDragLeave = e => { const rect=e.currentTarget.getBoundingClientRect(), x=e.clientX,y=e.clientY; if(x<=rect.left||x>=rect.right||y<=rect.top||y>=rect.bottom) e.currentTarget.classList.remove('drag-over'); };

  // Setup drag scrolling
  useEffect(() => {
    if (effectiveViewMode !== 'pipeline' || !scrollContainerRef.current) return;
    const slider = scrollContainerRef.current;
    let isDragging = false;
    let scrollInterval;

    const handleScroll = (e) => {
      if (!isDragging) return;

      const containerRect = slider.getBoundingClientRect();
      const containerWidth = containerRect.width;
      const containerScrollWidth = slider.scrollWidth;
      const currentScroll = slider.scrollLeft;
      const x = e.clientX || e.touches[0].clientX;

      const threshold = 20;
      const scrollSpeed = 30;
      const scrollIntervalTime = 15;

      if (scrollInterval) {
        clearInterval(scrollInterval);
      }

      if (x < containerRect.left + threshold) {
        scrollInterval = setInterval(() => {
          slider.scrollLeft = Math.max(0, currentScroll - scrollSpeed);
        }, scrollIntervalTime);
      }
      else if (x > containerRect.right - threshold) {
        scrollInterval = setInterval(() => {
          slider.scrollLeft = Math.min(containerScrollWidth - containerWidth, currentScroll + scrollSpeed);
        }, scrollIntervalTime);
      }
    };

    const handleDragStart = (e) => {
      if (e.target.closest('.pipeline-card')) {
        isDragging = true;
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('application/json', JSON.stringify({
          id: e.target.dataset.id,
          stageId: e.target.dataset.stageId
        }));
      }
    };

    const handleDragEnd = () => {
      isDragging = false;
      if (scrollInterval) {
        clearInterval(scrollInterval);
      }
    };

    slider.addEventListener('mousemove', handleScroll);
    slider.addEventListener('touchmove', handleScroll);
    slider.addEventListener('dragstart', handleDragStart);
    slider.addEventListener('dragend', handleDragEnd);
    slider.addEventListener('drag', handleScroll);

    return () => {
      slider.removeEventListener('mousemove', handleScroll);
      slider.removeEventListener('touchmove', handleScroll);
      slider.removeEventListener('dragstart', handleDragStart);
      slider.removeEventListener('dragend', handleDragEnd);
      slider.removeEventListener('drag', handleScroll);
      if (scrollInterval) {
        clearInterval(scrollInterval);
      }
    };
  }, [effectiveViewMode]);

  // Global drag handlers
  useEffect(() => {
    const onGlobalDragOver=e=>{
      if(e.target.closest('.pipeline-dropzone')){
        const dropzone=e.target.closest('.pipeline-dropzone');
        document.querySelectorAll('.pipeline-dropzone.drag-over').forEach(el=>{if(el!==dropzone)el.classList.remove('drag-over');});
        if(!dropzone.classList.contains('drag-over')) dropzone.classList.add('drag-over');
      } else {
        document.querySelectorAll('.pipeline-dropzone.drag-over').forEach(el=>el.classList.remove('drag-over'));
      }
    };
    const onGlobalDragEnd=() => document.querySelectorAll('.drag-over').forEach(el=>el.classList.remove('drag-over'));
    document.addEventListener('dragover',onGlobalDragOver);
    document.addEventListener('dragend',onGlobalDragEnd);
    document.addEventListener('drop',onGlobalDragEnd);
    return () => {
      document.removeEventListener('dragover',onGlobalDragOver);
      document.removeEventListener('dragend',onGlobalDragEnd);
      document.removeEventListener('drop',onGlobalDragEnd);
    };
  }, []);

  // Pipeline stages definition
  const pipelineStages = [
    { id: 0, title: "Cadastro" },
    { id: 1, title: "Contato" },
    { id: 2, title: "Reunião" },
    { id: 3, title: "Proposta" },
    { id: 4, title: "Follow-Up" },
    { id: 5, title: "Negociação" },
    { id: 6, title: "Fechamento" }
  ];

  // Avatar selector
  const getAvatarForUser = id => {
    const idx = (id % 8) + 1;
    return {1:avatar1,2:avatar2,3:avatar3,4:avatar4,5:avatar5,6:avatar6,7:avatar7,8:avatar8}[idx] || avatar1;
  };

  return (
    <div className="pipeline-container">


      <ToastContainer />

      {effectiveViewMode==='pipeline' && (
        <div ref={scrollContainerRef} className="pipeline-scroll-container" style={{ display:'flex',gap:'4px',overflowX:'scroll',paddingBottom:'15px',height:stageHeight||'calc(100vh-170px)'}}>
          {pipelineStages.map((stage,idx)=>(
            <div key={idx} className="pipeline-stage" style={{flex:'0 0 300px',width:'300px',height:'100%'}}>
              <div className="border h-100 bg-white d-flex flex-column" style={{borderRadius:'6px'}}>
                <div className="p-3 pb-2 border-bottom pipeline-stage-header">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <h6 className="mb-0 fs-6 text-secondary fw-medium">
                      {stage.id===6?<span className="text-success"><i className="mdi mdi-checkbox-marked-circle-outline me-1"></i>{idx+1}. {stage.title}</span>:`${idx+1}. ${stage.title}`}
                    </h6>
                    <span className={`badge ${stage.id===6?'bg-success':'bg-secondary'} rounded-pill`}>{opportunitiesByStage[stage.id]?.length||0}</span>
                  </div>
                  <div className="small text-muted">{formatCurrency(opportunitiesByStage[stage.id]?.reduce((sum,opp)=>sum+opp.amount,0)||0)}</div>
                </div>
                <div className="p-2 flex-grow-1 overflow-auto pipeline-dropzone" onDrop={e=>handleDrop(e,stage.id)} onDragOver={handleDragOver} onDragLeave={handleDragLeave}>
                  <div className="pipeline-dropzone-hint"><i className="mdi mdi-arrow-down-circle me-1"></i>Solte aqui para mover para {stage.title}</div>
                  <div className="pipeline-dropzone-overlay" />
                  {(opportunitiesByStage[stage.id]||[]).length>0 ? (
                    <div className="d-flex flex-column">
                      {opportunitiesByStage[stage.id].map(o=><PipeCard key={o.id} opportunity={o} />)}
                      <div className="pipeline-dropzone-end-spacer" />
                    </div>
                  ) : (
                    <div className="d-flex align-items-center justify-content-center h-100 text-center text-muted pipeline-empty-placeholder">
                      <div><i className="mdi mdi-tray-remove-outline d-block fs-1 mb-3"></i><span className="fs-6">Etapa vazia</span></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {effectiveViewMode==='list' && (
        <div className="table-responsive">
          <table className="table table-hover">
            <thead className="bg-light">
              <tr>
                <th style={{width:'40px'}}><div className="form-check"><input type="checkbox" className="form-check-input" checked={selectedOpportunities.length===opportunities.length} onChange={e=>handleSelectAll(e.target.checked)} /></div></th>
                <th>Usuário</th><th>Etapa</th><th className="text-center">Dias na etapa</th><th className="text-center">Último contato</th><th>Empresa</th><th>Contato</th><th>Valor de P&S</th><th>Valor de MRR</th><th className="text-center">Ações</th>
              </tr>
            </thead>
            <tbody>
              {opportunities.map(o=>{
                const stage = pipelineStages.find(s=>s.id===o.stageId);
                const isSel = selectedOpportunities.includes(o.id);
                return (
                  <tr key={o.id} className={isSel?'table-active':''} onClick={()=>handleOpportunitySelection(o.id)} style={{cursor:'pointer'}}>
                    <td><div className="form-check"><input type="checkbox" className="form-check-input" checked={isSel} onClick={e=>e.stopPropagation()} readOnly /></div></td>
                    <td><div className="d-flex align-items-center"><div className="avatar-circle me-2"><img src={getAvatarForUser(o.id)} alt="" className="rounded-circle" width="32" height="32" /></div><div><div className="fw-medium">{o.responsible}</div></div></div></td>
                    <td><span className="badge bg-light text-dark">{stage?.title}</span></td>
                    <td className="text-center"><span className="badge bg-light text-dark">0 dias</span></td>
                    <td className="text-center text-muted small">Há 2 dias</td>
                    <td className="text-muted">{o.company}</td>
                    <td>{o.companyPhone||"(55) 51 4063-9792"}<i className="mdi mdi-whatsapp text-success ms-2"></i></td>
                    <td>{formatCurrency(o.amount)}</td>
                    <td>{o.recurrent?formatCurrency(o.recurrentAmount):"R$0,00"}</td>
                    <td className="text-center"><Button color="link" className="text-primary p-0 me-2"><i className="mdi mdi-pencil fs-5"></i></Button><Button color="link" className="text-danger p-0" onClick={e=>{e.stopPropagation();confirmDelete(o.id);}}><i className="mdi mdi-trash-can-outline fs-5"></i></Button></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      <Modal isOpen={deleteModal} toggle={handleDeleteCancel}>
        <ModalHeader toggle={handleDeleteCancel}>Confirmar exclusão</ModalHeader>
        <ModalBody>{itemToDelete && <p>Deseja realmente excluir a oportunidade <strong>"{itemToDelete.name}"</strong>?</p>}</ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={handleDeleteCancel}>Cancelar</Button>
          <Button color="danger" onClick={handleDeleteConfirm}>Excluir</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

Pipeline.propTypes = {
  viewMode: PropTypes.string,
  setViewMode: PropTypes.func,
  hideControls: PropTypes.bool,
  stageHeight: PropTypes.string
};

export default Pipeline;


