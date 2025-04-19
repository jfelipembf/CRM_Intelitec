import React from "react";
import { UncontrolledTooltip } from "reactstrap";
import PropTypes from "prop-types";

const CustomUncontrolledTooltip = (props) => {
  // Definimos uma constante fixa para o timeout
  const TOOLTIP_TIMEOUT = 0;
  
  return (
    <UncontrolledTooltip 
      {...props} 
      transition={{ timeout: TOOLTIP_TIMEOUT }}
    />
  );
};

CustomUncontrolledTooltip.propTypes = {
  target: PropTypes.string.isRequired,
  placement: PropTypes.string,
  children: PropTypes.node
};

export default CustomUncontrolledTooltip; 