import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import withRouter from "../Common/withRouter";

//i18n
import { withTranslation } from "react-i18next";
import SidebarContent from "./SidebarContent";

import { Link } from "react-router-dom";

import logoWhite from "../../assets/images/logoWhite.png";
import inteliIcon from "../../assets/images/inteli_icon.png";

const Sidebar = (props) => {
  return (
    <React.Fragment>
      <div className="vertical-menu">
        <div className="navbar-brand-box text-center">
          <Link to="/" className="logo logo-light" style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%" }}>
            <span className="logo-sm" style={{ textAlign: "center" }}>
              <img src={inteliIcon} alt="" height="30" />
            </span>
            <span className="logo-lg" style={{ textAlign: "center" }}>
              <img src={logoWhite} alt="" height="24" />
            </span>
          </Link>
        </div>
        <div data-simplebar className="h-100">
          {props.type !== "condensed" ? <SidebarContent /> : <SidebarContent />}
        </div>

        <div className="sidebar-background"></div>
      </div>
    </React.Fragment>
  );
};

Sidebar.propTypes = {
  type: PropTypes.string,
};

const mapStatetoProps = (state) => {
  return {
    layout: state.Layout,
  };
};
export default connect(
  mapStatetoProps,
  {}
)(withRouter(withTranslation()(Sidebar)));
