import PropTypes from 'prop-types';
import React, { useState } from "react";

import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { 
  Dropdown, 
  DropdownToggle, 
  DropdownMenu, 
  DropdownItem,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";

import NotificationDropdown from "../CommonForBoth/TopbarDropdown/NotificationDropdown";
import ProfileMenu from "../CommonForBoth/TopbarDropdown/ProfileMenu";
import NewOpportunities from "../Header/NewOpportunities";

import logo from "../../assets/images/logo.svg";
import logoLightSvg from "../../assets/images/logo-light.svg";

//i18n
import { withTranslation } from "react-i18next";

// Redux Store
import {
  showRightSidebarAction,
} from "../../store/actions";

const Header = (props) => {
  const [isNewOpportunityModalOpen, setIsNewOpportunityModalOpen] = useState(false);
  const [funnelDropdownOpen, setFunnelDropdownOpen] = useState(false);
  const [newFunnelModalOpen, setNewFunnelModalOpen] = useState(false);
  const [newFunnelName, setNewFunnelName] = useState("");
  
  // Lista de funis disponíveis (exemplo)
  const [funnels, setFunnels] = useState([
    { id: 1, name: "Funil Padrão", isActive: true },
    { id: 2, name: "Funil de Serviços", isActive: false }
  ]);
  
  // Funnil ativo
  const [activeFunnel, setActiveFunnel] = useState(funnels.find(f => f.isActive) || funnels[0]);

  const toggleNewOpportunityModal = () => {
    setIsNewOpportunityModalOpen(!isNewOpportunityModalOpen);
  };
  
  const toggleFunnelDropdown = () => {
    setFunnelDropdownOpen(!funnelDropdownOpen);
  };
  
  const toggleNewFunnelModal = () => {
    setNewFunnelModalOpen(!newFunnelModalOpen);
    if (!newFunnelModalOpen) {
      setNewFunnelName(""); // Limpar o input quando abrir o modal
    }
  };
  
  // Função para alternar entre os funis
  const handleChangeFunnel = (funnelId) => {
    // Atualizar o funil ativo
    const updatedFunnels = funnels.map(funnel => ({
      ...funnel,
      isActive: funnel.id === funnelId
    }));
    
    setFunnels(updatedFunnels);
    setActiveFunnel(updatedFunnels.find(f => f.id === funnelId));
    setFunnelDropdownOpen(false);
  };
  
  // Função para criar um novo funil
  const handleCreateFunnel = () => {
    if (newFunnelName.trim()) {
      const newFunnel = {
        id: funnels.length + 1,
        name: newFunnelName.trim(),
        isActive: false
      };
      
      setFunnels([...funnels, newFunnel]);
      setNewFunnelModalOpen(false);
      setNewFunnelName("");
      
      // Redirecionar para a tela de edição de funil
      window.location.href = `/pipeline?newFunnel=true&funnelId=${newFunnel.id}`;
    }
  };

  return (
    <React.Fragment>
      <header id="page-topbar">
        <div className="navbar-header">
          <div className="d-flex align-items-center">
            <div className="navbar-brand-box d-lg-none d-md-block">
              <Link to="/" className="logo logo-dark">
                <span className="logo-sm">
                  <img src={logo} alt="" height="22" />
                </span>
              </Link>

              <Link to="/" className="logo logo-light">
                <span className="logo-sm">
                  <img src={logoLightSvg} alt="" height="22" />
                </span>
              </Link>
            </div>
            
            <div className="search-box ms-4 me-2 d-inline-block">
              <div className="position-relative">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Busca global"
                />
                <i className="bx bx-search-alt search-icon"></i>
              </div>
            </div>

            <div className="d-inline-block">
              <button 
                className="btn btn-success" 
                onClick={toggleNewOpportunityModal}
              >
                <i className="bx bx-plus me-1"></i> Oportunidade
              </button>
            </div>
          </div>

          <div className="d-flex align-items-center">
            <div className="dropdown d-inline-block me-2">
              <button type="button" className="btn header-item noti-icon">
                <i className="mdi mdi-view-grid-outline"></i>
              </button>
            </div>

            <div className="dropdown d-inline-block me-2">
              <button type="button" className="btn header-item noti-icon">
                <i className="mdi mdi-filter-outline"></i>
              </button>
            </div>

            <div className="dropdown d-inline-block me-2">
              <button type="button" className="btn header-item noti-icon">
                <i className="mdi mdi-tag-outline"></i>
              </button>
            </div>

            <Dropdown 
              isOpen={funnelDropdownOpen} 
              toggle={toggleFunnelDropdown} 
              className="d-inline-block me-3"
            >
              <DropdownToggle 
                tag="button" 
                className="btn header-item" 
                id="page-header-funnel"
              >
                <span className="d-none d-sm-inline-block me-1">
                  <i className="bx bx-filter-alt me-1"></i>
                  {activeFunnel?.name || "Funil Vendas"}
                </span>
                <i className="mdi mdi-chevron-down"></i>
              </DropdownToggle>
              <DropdownMenu end className="dropdown-menu-lg p-0 shadow border-0">
                <div className="p-3 border-bottom">
                  <h6 className="mb-0 text-primary">Selecionar Funil</h6>
                </div>
                <div className="p-2" style={{ maxHeight: '300px', overflowY: 'auto' }}>
                  {funnels.map(funnel => (
                    <DropdownItem 
                      key={funnel.id} 
                      className={`d-flex align-items-center ${funnel.isActive ? 'bg-light' : ''}`}
                      onClick={() => handleChangeFunnel(funnel.id)}
                    >
                      <div className="flex-grow-1">
                        <div className="mb-0 font-size-14">
                          {funnel.isActive && <i className="mdi mdi-check-circle-outline text-success me-1"></i>}
                          {funnel.name}
                        </div>
                      </div>
                    </DropdownItem>
                  ))}
                </div>
                <div className="p-2 border-top">
                  <div className="d-grid">
                    <Button 
                      color="primary" 
                      size="sm" 
                      className="btn-sm"
                      onClick={toggleNewFunnelModal}
                    >
                      <i className="mdi mdi-plus me-1"></i> Criar Novo Funil
                    </Button>
                  </div>
                </div>
              </DropdownMenu>
            </Dropdown>

            <div className="dropdown d-inline-block me-2">
              <button
                type="button"
                className="btn header-item"
                id="page-header-user"
              >
                <span className="d-none d-sm-inline-block">Usuário</span>
                <i className="mdi mdi-chevron-down"></i>
              </button>
            </div>

            <NotificationDropdown />
            <ProfileMenu />
          </div>
        </div>
      </header>

      {/* Modal de Nova Oportunidade */}
      <NewOpportunities
        isOpen={isNewOpportunityModalOpen}
        toggle={toggleNewOpportunityModal}
      />
      
      {/* Modal para criar novo funil */}
      <Modal isOpen={newFunnelModalOpen} toggle={toggleNewFunnelModal} centered size="md">
        <ModalHeader toggle={toggleNewFunnelModal}>
          Criar Novo Funil de Vendas
        </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="funnelName" className="fw-medium">Nome do Funil</Label>
              <Input
                type="text"
                id="funnelName"
                placeholder="Digite o nome do funil"
                value={newFunnelName}
                onChange={(e) => setNewFunnelName(e.target.value)}
              />
              <small className="text-muted">
                O funil criado poderá ser personalizado com suas próprias etapas
              </small>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="light" onClick={toggleNewFunnelModal}>Cancelar</Button>
          <Button 
            color="primary" 
            onClick={handleCreateFunnel}
            disabled={!newFunnelName.trim()}
          >
            <i className="mdi mdi-plus-circle me-1"></i> Criar Funil
          </Button>
        </ModalFooter>
      </Modal>
    </React.Fragment>
  );
};

Header.propTypes = {
  leftMenu: PropTypes.any,
  leftSideBarType: PropTypes.any,
  showRightSidebar: PropTypes.any,
  showRightSidebarAction: PropTypes.func,
  t: PropTypes.any,
};

const mapStatetoProps = state => {
  const {
    layoutType,
    showRightSidebar,
    leftMenu,
    leftSideBarType,
  } = state.Layout;
  return { layoutType, showRightSidebar, leftMenu, leftSideBarType };
};

export default connect(mapStatetoProps, {
  showRightSidebarAction,
})(withTranslation()(Header));
