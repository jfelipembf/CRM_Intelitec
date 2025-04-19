import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import PropTypes from "prop-types";

// Componente Modal personalizado
const CustomModal = (props) => {
  return <Modal {...props} />;
};

// Componente ModalHeader personalizado
const CustomModalHeader = (props) => {
  return <ModalHeader {...props} />;
};

// Componente ModalBody personalizado
const CustomModalBody = (props) => {
  return <ModalBody {...props} />;
};

// Componente ModalFooter personalizado
const CustomModalFooter = (props) => {
  return <ModalFooter {...props} />;
};

// PropTypes
CustomModal.propTypes = {
  isOpen: PropTypes.bool,
  toggle: PropTypes.func,
  className: PropTypes.string,
  children: PropTypes.node
};

CustomModalHeader.propTypes = {
  toggle: PropTypes.func,
  children: PropTypes.node
};

CustomModalBody.propTypes = {
  children: PropTypes.node
};

CustomModalFooter.propTypes = {
  children: PropTypes.node
};

export { CustomModal, CustomModalHeader, CustomModalBody, CustomModalFooter }; 