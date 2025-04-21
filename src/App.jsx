import PropTypes from "prop-types";
import React from "react";

import { Routes, Route } from "react-router-dom";
import { connect } from "react-redux";

import { useSelector } from "react-redux";
import { createSelector } from "reselect";

// Import Routes
import { authProtectedRoutes } from "./routes/index";

// layouts Format
import VerticalLayout from "./components/VerticalLayout/";
import HorizontalLayout from "./components/HorizontalLayout/";

// Import NotFound component
import NotFound from "./components/NotFound";

// Import scss
import "./assets/scss/theme.scss";

// Import Firebase Configuration file
// import { initFirebaseBackend } from "./helpers/firebase_helper"

import fakeBackend from "./helpers/AuthType/fakeBackend"
// Activating fake backend
fakeBackend();



// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_APP_APIKEY,
//   authDomain: import.meta.env.VITE_APP_AUTHDOMAIN,
//   databaseURL: import.meta.env.VITE_APP_DATABASEURL,
//   projectId: import.meta.env.VITE_APP_PROJECTID,
//   storageBucket: import.meta.env.VITE_APP_STORAGEBUCKET,
//   messagingSenderId: import.meta.env.VITE_APP_MESSAGINGSENDERID,
//   appId: import.meta.env.VITE_APP_APPID,
//   measurementId: import.meta.env.VITE_APP_MEASUREMENTID,
// };

// init firebase backend
// initFirebaseBackend(firebaseConfig)

const App = (props) => {
  const LayoutProperties = createSelector(
    (state) => state.Layout,
    (layout) => ({
      layoutType: layout.layoutType,
    })
  );

  const {
    layoutType
  } = useSelector(LayoutProperties);

  function getLayout(layoutType) {
    let layoutCls = VerticalLayout;
    switch (layoutType) {
      case "horizontal":
        layoutCls = HorizontalLayout;
        break;
      default:
        layoutCls = VerticalLayout;
        break;
    }
    return layoutCls;
  }

  const Layout = getLayout(layoutType);

  return (
    <React.Fragment>
      <Routes>
        {authProtectedRoutes.map((route, idx) => (
          <Route
            path={route.path}
            element={
              <Layout>{route.component}</Layout>
            }
            key={idx}
            exact={true}
          />
        ))}
        {/* Rota de fallback para tratar páginas não encontradas */}
        <Route
          path="*"
          element={
            <Layout><NotFound /></Layout>
          }
        />
      </Routes>
    </React.Fragment>
  );
};

App.propTypes = {
  layout: PropTypes.any,
};

const mapStateToProps = (state) => {
  return {
    layout: state.Layout,
  };
};

export default connect(mapStateToProps, null)(App);
