import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Button,
  FormGroup,
  Label,
  Row,
  Col,
  Form
} from "reactstrap";

// Valor padrão para os dados de atividade
const defaultActivityData = {
  title: "",
  description: "",
  date: new Date().toISOString().split("T")[0],
  startTime: "08:00",
  endTime: "09:00",
  type: "",
  responsible: "",
  reminder: "",
  opportunity: "",
  company: "",
  person: "",
  participants: []
};

const ActivityModal = ({
  isOpen,
  toggle,
  onSave,
  initialData
}) => {
  console.log("ActivityModal renderizado. isOpen:", isOpen);
  console.log("initialData:", initialData);

  // Garante que formData sempre tenha um valor válido
  const [formData, setFormData] = useState(initialData || defaultActivityData);

  // Atualiza formData quando initialData muda
  useEffect(() => {
    console.log("useEffect executado. isOpen:", isOpen);
    console.log("initialData no useEffect:", initialData);
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData(defaultActivityData);
    }
  }, [initialData, isOpen]);

  // Função para formatar a data para o formato YYYY-MM-DD para usar no input type="date"
  const formatDateForInput = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  // Manipulador para alterações nos campos do formulário
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Função para limpar o formulário
  const handleCancel = () => {
    toggle();
  };

  // Função para salvar a atividade
  const handleSave = () => {
    onSave(formData);
    toggle();
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle} centered size="md" className="activity-modal">
      <div className="modal-header bg-light py-3">
        <h5 className="modal-title mt-0">Adicionar atividade agenda</h5>
        <button 
          type="button" 
          onClick={() => {
            console.log("Botão de fechar clicado");
            toggle();
          }} 
          className="btn-close"
          aria-label="Close"
        ></button>
      </div>
      <ModalBody className="p-4">
        <Form>
          {/* Assunto da atividade */}
          <FormGroup className="mb-4">
            <Input
              type="text"
              className="form-control"
              name="title"
              value={formData.title || ""}
              onChange={handleInputChange}
              placeholder="Assunto da atividade"
            />
          </FormGroup>

          {/* Descrição */}
          <FormGroup className="mb-4">
            <Input
              type="textarea"
              className="form-control"
              name="description"
              value={formData.description || ""}
              onChange={handleInputChange}
              placeholder="Descrição"
              rows="3"
            />
          </FormGroup>

          <Row className="mb-4">
            {/* Data */}
            <Col md={4}>
              <FormGroup>
                <Input
                  type="date"
                  className="form-control"
                  name="date"
                  value={formData.date || new Date().toISOString().split("T")[0]}
                  onChange={handleInputChange}
                />
              </FormGroup>
            </Col>

            {/* Hora de início */}
            <Col md={4}>
              <FormGroup>
                <Input
                  type="time"
                  className="form-control"
                  name="startTime"
                  value={formData.startTime || "08:00"}
                  onChange={handleInputChange}
                />
              </FormGroup>
            </Col>

            {/* Hora de término */}
            <Col md={4}>
              <FormGroup>
                <Input
                  type="time"
                  className="form-control"
                  name="endTime"
                  value={formData.endTime || "09:00"}
                  onChange={handleInputChange}
                />
              </FormGroup>
            </Col>
          </Row>

          {/* Tipo de atividade */}
          <FormGroup className="mb-3">
            <Input
              type="select"
              className="form-control"
              name="type"
              value={formData.type || ""}
              onChange={handleInputChange}
            >
              <option value="" disabled>Selecione um tipo de atividade</option>
              <option value="Reunião">Reunião</option>
              <option value="Ligação">Ligação</option>
              <option value="E-mail">E-mail</option>
              <option value="Tarefa">Tarefa</option>
              <option value="Visita">Visita</option>
            </Input>
          </FormGroup>

          {/* Responsável */}
          <FormGroup className="mb-3">
            <Input
              type="select"
              className="form-control"
              name="responsible"
              value={formData.responsible || ""}
              onChange={handleInputChange}
            >
              <option value="">Felipe Macedo</option>
              <option value="maria">Maria Silva</option>
              <option value="joao">João Costa</option>
            </Input>
          </FormGroup>

          {/* Lembrete */}
          <FormGroup className="mb-3">
            <Input
              type="select"
              className="form-control"
              name="reminder"
              value={formData.reminder || ""}
              onChange={handleInputChange}
            >
              <option value="">Lembrete</option>
              <option value="15min">15 minutos antes</option>
              <option value="30min">30 minutos antes</option>
              <option value="1h">1 hora antes</option>
              <option value="1dia">1 dia antes</option>
            </Input>
          </FormGroup>

          {/* Oportunidade */}
          <FormGroup className="mb-3">
            <Input
              type="select"
              className="form-control"
              name="opportunity"
              value={formData.opportunity || ""}
              onChange={handleInputChange}
            >
              <option value="" disabled>Selecione a oportunidade</option>
              <option value="opp1">Projeto Website - ABC Ltda.</option>
              <option value="opp2">Consultoria SEO - XYZ Comércio</option>
              <option value="opp3">Desenvolvimento de App - 123 Serviços</option>
            </Input>
          </FormGroup>

          {/* Empresa */}
          <FormGroup className="mb-3">
            <Input
              type="select"
              className="form-control"
              name="company"
              value={formData.company || ""}
              onChange={handleInputChange}
            >
              <option value="" disabled>Selecione a empresa</option>
              <option value="comp1">ABC Ltda.</option>
              <option value="comp2">XYZ Comércio</option>
              <option value="comp3">123 Serviços</option>
            </Input>
          </FormGroup>

          {/* Pessoa */}
          <FormGroup className="mb-3">
            <Input
              type="select"
              className="form-control"
              name="person"
              value={formData.person || ""}
              onChange={handleInputChange}
            >
              <option value="" disabled>Selecione a pessoa</option>
              <option value="person1">Carlos Silva - ABC Ltda.</option>
              <option value="person2">Ana Paula - XYZ Comércio</option>
              <option value="person3">Ricardo Santos - 123 Serviços</option>
            </Input>
          </FormGroup>

          {/* Participantes */}
          <FormGroup className="mb-3">
            <Input
              type="select"
              className="form-control"
              name="participants"
              value={formData.participants || []}
              onChange={handleInputChange}
              multiple
            >
              <option value="" disabled>Selecione os envolvidos</option>
              <option value="part1">João Silva - Marketing</option>
              <option value="part2">Maria Souza - Vendas</option>
              <option value="part3">Pedro Teixeira - TI</option>
              <option value="part4">Ana Castro - Financeiro</option>
            </Input>
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter className="border-top-0 d-flex justify-content-between">
        <Button color="danger" outline onClick={() => {
          console.log("Botão de excluir clicado");
          toggle();
        }}>
          <i className="mdi mdi-trash-can-outline me-1"></i>
        </Button>
        <div>
          <Button 
            color="success" 
            className="px-4" 
            onClick={() => {
              console.log("Botão de salvar clicado");
              handleSave();
            }}
          >
            <i className="mdi mdi-content-save me-1"></i> Salvar
          </Button>
        </div>
      </ModalFooter>
    </Modal>
  );
};

ActivityModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  initialData: PropTypes.object
};

export default ActivityModal; 