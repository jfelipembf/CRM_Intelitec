import React from 'react';
import { Button, ButtonGroup, Card, CardBody, Container, Row, Col, Input, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { withTranslation } from 'react-i18next';

const ActivityForm = ({ show, formData, onFormChange, onSave, onClose, t }) => {
  if (!show || !formData) return null;

  return (
    <div style={{ position: 'absolute', top: '50px', left: '50%', transform: 'translateX(-50%)', zIndex: 1050, width: '350px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 4px 16px rgba(0,0,0,0.2)', border: '1px solid #e0e0e0' }}>
      <div className="p-3 bg-light border-bottom d-flex justify-content-between align-items-center" style={{ borderTopLeftRadius: '8px', borderTopRightRadius: '8px', borderBottom: '1px solid #e9e9e9' }}>
        <h6 className="m-0 text-dark fw-bold">
          <i className="bx bx-calendar-edit me-1 text-primary" />
          {formData.id ? 'Editar atividade' : 'Nova atividade'}
        </h6>
        <button type="button" className="btn-close" onClick={onClose} />
      </div>
      <div className="p-3">
        <form>
          <div className="form-group mb-2">
            <input type="text" className="form-control form-control-sm" placeholder="Assunto da atividade" name="title" value={formData.title} onChange={onFormChange} />
          </div>
          <div className="form-group mb-2">
            <textarea className="form-control form-control-sm" placeholder="Descrição" rows={2} name="description" value={formData.description} onChange={onFormChange} style={{ minHeight: '60px' }} />
          </div>
          <div className="form-group mb-2">
            <Input type="date" name="date" value={formData.date} onChange={onFormChange} className="form-control-sm" />
          </div>
          <div className="form-group mb-2">
            <div className="row g-2">
              <div className="col-6">
                <Input type="time" name="startTime" value={formData.startTime} onChange={onFormChange} className="form-control-sm" />
              </div>
              <div className="col-6">
                <Input type="time" name="endTime" value={formData.endTime} onChange={onFormChange} className="form-control-sm" />
              </div>
            </div>
          </div>
          <div className="form-group mb-2">
            <Dropdown isOpen={formData.typeDropdownOpen} toggle={() => onFormChange({ target: { name: 'typeDropdownOpen', value: !formData.typeDropdownOpen } })}>
              <DropdownToggle caret className="btn-sm">
                {formData.type || 'Selecione o tipo'}
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem onClick={() => onFormChange({ target: { name: 'type', value: 'Reunião' } })}>Reunião</DropdownItem>
                <DropdownItem onClick={() => onFormChange({ target: { name: 'type', value: 'Ligação' } })}>Ligação</DropdownItem>
                <DropdownItem onClick={() => onFormChange({ target: { name: 'type', value: 'E-mail' } })}>E-mail</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
          <div className="form-group mb-2">
            <Input type="text" name="responsible" placeholder="Responsável" value={formData.responsible} onChange={onFormChange} className="form-control-sm" />
          </div>
          <div className="form-group mb-2">
            <Input type="text" name="reminder" placeholder="Lembrete" value={formData.reminder} onChange={onFormChange} className="form-control-sm" />
          </div>
          <div className="form-group mb-2">
            <Input type="text" name="opportunity" placeholder="Oportunidade" value={formData.opportunity} onChange={onFormChange} className="form-control-sm" />
          </div>
          <div className="form-group mb-2">
            <Input type="text" name="company" placeholder="Empresa" value={formData.company} onChange={onFormChange} className="form-control-sm" />
          </div>
          <div className="form-group mb-2">
            <Input type="text" name="person" placeholder="Pessoa" value={formData.person} onChange={onFormChange} className="form-control-sm" />
          </div>
          <div className="form-group mb-2">
            <Input type="text" name="participants" placeholder="Participantes" value={formData.participants} onChange={onFormChange} className="form-control-sm" />
          </div>
          <div className="d-flex justify-content-end">
            <Button color="secondary" onClick={onClose} className="me-2">Cancelar</Button>
            <Button color="primary" onClick={onSave}>Salvar</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default withTranslation()(ActivityForm);
