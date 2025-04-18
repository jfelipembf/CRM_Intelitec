import PropTypes from 'prop-types';
import React, { useState } from "react";

import { connect } from "react-redux";
import { Link } from "react-router-dom";

import NotificationDropdown from "../CommonForBoth/TopbarDropdown/NotificationDropdown";
import ProfileMenu from "../CommonForBoth/TopbarDropdown/ProfileMenu";

import logo from "../../assets/images/logo.svg";
import logoLightSvg from "../../assets/images/logo-light.svg";

//i18n
import { withTranslation } from "react-i18next";

// Redux Store
import {
  showRightSidebarAction,
} from "../../store/actions";

const Header = (props) => {
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
              <Link to="/oportunidades/nova" className="btn btn-success">
                <i className="bx bx-plus me-1"></i> Oportunidade
              </Link>
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

            <div className="dropdown d-inline-block me-3">
              <button
                type="button"
                className="btn header-item"
                id="page-header-funnel"
              >
                <span className="d-none d-sm-inline-block me-1">Funil Vendas</span>
                <i className="mdi mdi-chevron-down"></i>
              </button>
            </div>

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
