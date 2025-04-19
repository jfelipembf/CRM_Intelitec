import React, { useState } from "react";
import { Card, CardBody, Button, Input, Form, FormGroup, Label, Row, Col, Table } from "reactstrap";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ActivitiesTab = ({ customer }) => {
  const [activities, setActivities] = useState([
    {
      id: 1,
      title: "Reunião de apresentação",
      description: "Apresentação inicial dos serviços",
      type: "Reunião",
      status: "Concluída",
      reminder: "Sem lembrete",
      date: "15/04/2025",
      time: "14:30",
      duration: "01:00",
      responsible: "Felipe Macedo",
      people: ["CEZAR AUGUSTO GEHM FILHO"],
      companies: ["CRM PipeRun"]
    },
    {
      id: 2,
      title: "Envio de proposta comercial",
      description: "Envio da proposta com valores e condições",
      type: "E-mail",
      status: "Planejada",
      reminder: "Sem lembrete",
      date: "18/04/2025",
      time: "09:30",
      duration: "00:30",
      responsible: "Maria Silva",
      people: ["CEZAR AUGUSTO GEHM FILHO"],
      companies: ["CRM PipeRun"]
    }
  ]);

  // Estado para controlar a visualização (lista ou formulário)
  const [showForm, setShowForm] = useState(false);
  
  // Estado para armazenar o filtro de exibição ativo
  const [activeFilter, setActiveFilter] = useState("planejadas");

  // Estado para o novo item de atividade
  const [newActivity, setNewActivity] = useState({
    title: "",
    description: "",
    type: "",
    status: "Planejada",
    reminder: "Sem lembrete",
    date: new Date().toISOString().split('T')[0].split('-').reverse().join('/'),
    time: new Date().toTimeString().split(' ')[0].substring(0, 5),
    duration: "00:30",
    responsible: "Felipe Macedo",
    people: [],
    companies: []
  });

  // Função para alternar entre lista e formulário
  const toggleForm = () => {
    setShowForm(!showForm);
  };

  // Função para criar uma nova atividade
  const createActivity = () => {
    if (!newActivity.title || !newActivity.type) {
      toast.error("Preencha os campos obrigatórios!");
      return;
    }

    const activity = {
      ...newActivity,
      id: Date.now()
    };

    setActivities([activity, ...activities]);
    toast.success("Atividade criada com sucesso!");
    setShowForm(false);
    // Resetar o formulário
    setNewActivity({
      title: "",
      description: "",
      type: "",
      status: "Planejada",
      reminder: "Sem lembrete",
      date: new Date().toISOString().split('T')[0].split('-').reverse().join('/'),
      time: new Date().toTimeString().split(' ')[0].substring(0, 5),
      duration: "00:30",
      responsible: "Felipe Macedo",
      people: [],
      companies: []
    });
  };

  // Função para lidar com a alteração de inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewActivity({
      ...newActivity,
      [name]: value
    });
  };

  // Filtrar atividades com base no filtro selecionado
  const getFilteredActivities = () => {
    switch (activeFilter) {
      case "planejadas":
        return activities.filter(activity => activity.status === "Planejada");
      case "concluidas":
        return activities.filter(activity => activity.status === "Concluída");
      case "no-show":
        return activities.filter(activity => activity.status === "No-show");
      default:
        return activities;
    }
  };

  return (
    <div className="activities-container">
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div className="d-flex align-items-center">
          <i className="mdi mdi-calendar-check me-2 h3 mb-0 text-muted"></i>
          <h5 className="mb-0">Atividades</h5>
        </div>
        <Button color="success" onClick={toggleForm}>
          <i className="mdi mdi-plus me-1"></i>
          Criar atividade
        </Button>
      </div>

      {showForm ? (
        <Card className="mb-4">
          <CardBody>
            <h6 className="border-bottom pb-2 mb-3">Criar atividade</h6>
            <Form>
              <Row>
                <Col md={4} className="mb-3">
                  <FormGroup>
                    <Label for="activityType">Tipo</Label>
                    <Input
                      type="select"
                      name="type"
                      id="activityType"
                      value={newActivity.type}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Selecione uma atividade</option>
                      <option value="Reunião">Reunião</option>
                      <option value="Ligação">Ligação</option>
                      <option value="E-mail">E-mail</option>
                      <option value="Tarefa">Tarefa</option>
                      <option value="Visita">Visita</option>
                    </Input>
                  </FormGroup>
                </Col>
                <Col md={4} className="mb-3">
                  <FormGroup>
                    <Label for="activityReminder">Lembrete</Label>
                    <Input
                      type="select"
                      name="reminder"
                      id="activityReminder"
                      value={newActivity.reminder}
                      onChange={handleInputChange}
                    >
                      <option value="Sem lembrete">Sem lembrete</option>
                      <option value="15 minutos antes">15 minutos antes</option>
                      <option value="30 minutos antes">30 minutos antes</option>
                      <option value="1 hora antes">1 hora antes</option>
                      <option value="1 dia antes">1 dia antes</option>
                    </Input>
                  </FormGroup>
                </Col>
                <Col md={4} className="mb-3">
                  <FormGroup>
                    <Label>Status</Label>
                    <div className="d-flex">
                      <div className="btn-group w-100">
                        <Button 
                          color={newActivity.status === "Planejada" ? "success" : "light"}
                          outline={newActivity.status !== "Planejada"}
                          onClick={() => setNewActivity({...newActivity, status: "Planejada"})}
                          className="flex-grow-1"
                        >
                          Planejada
                        </Button>
                        <Button 
                          color={newActivity.status === "Concluída" ? "success" : "light"}
                          outline={newActivity.status !== "Concluída"}
                          onClick={() => setNewActivity({...newActivity, status: "Concluída"})}
                          className="flex-grow-1"
                        >
                          Concluída
                        </Button>
                      </div>
                    </div>
                  </FormGroup>
                </Col>
              </Row>

              <Row>
                <Col md={12} className="mb-3">
                  <FormGroup>
                    <Label for="activityTitle">Título</Label>
                    <Input
                      type="text"
                      name="title"
                      id="activityTitle"
                      placeholder="Informe o título da atividade"
                      value={newActivity.title}
                      onChange={handleInputChange}
                      required
                    />
                  </FormGroup>
                </Col>
              </Row>

              <Row>
                <Col md={12} className="mb-3">
                  <FormGroup>
                    <Label for="activityDescription">Descrição</Label>
                    <div className="border rounded mb-2">
                      <div className="d-flex border-bottom">
                        <button className="btn border-end rounded-0 py-1 px-2" title="Negrito">
                          <span style={{ fontWeight: "bold" }}>B</span>
                        </button>
                        <button className="btn border-end rounded-0 py-1 px-2" title="Itálico">
                          <span style={{ fontStyle: "italic" }}>I</span>
                        </button>
                        <button className="btn border-end rounded-0 py-1 px-2" title="Sublinhado">
                          <span style={{ textDecoration: "underline" }}>U</span>
                        </button>
                        <button className="btn border-end rounded-0 py-1 px-2" title="Lista">
                          <i className="mdi mdi-format-list-bulleted"></i>
                        </button>
                        <button className="btn border-end rounded-0 py-1 px-2" title="Lista numerada">
                          <i className="mdi mdi-format-list-numbered"></i>
                        </button>
                        <button className="btn rounded-0 py-1 px-2" title="Título">
                          T<i className="mdi mdi-chevron-down"></i>
                        </button>
                      </div>
                      <Input
                        type="textarea"
                        name="description"
                        id="activityDescription"
                        rows={4}
                        value={newActivity.description}
                        onChange={handleInputChange}
                        style={{ border: "none", borderRadius: "0" }}
                      />
                    </div>
                  </FormGroup>
                </Col>
              </Row>

              <Row>
                <Col md={4} className="mb-3">
                  <FormGroup>
                    <Label for="activityDate">Data</Label>
                    <Input
                      type="date"
                      name="date"
                      id="activityDate"
                      value={newActivity.date.split('/').reverse().join('-')}
                      onChange={(e) => {
                        const formattedDate = e.target.value ? new Date(e.target.value).toISOString().split('T')[0].split('-').reverse().join('/') : '';
                        setNewActivity({...newActivity, date: formattedDate});
                      }}
                    />
                  </FormGroup>
                </Col>
                <Col md={4} className="mb-3">
                  <FormGroup>
                    <Label for="activityTime">Hora</Label>
                    <Input
                      type="time"
                      name="time"
                      id="activityTime"
                      value={newActivity.time}
                      onChange={handleInputChange}
                    />
                  </FormGroup>
                </Col>
                <Col md={4} className="mb-3">
                  <FormGroup>
                    <Label for="activityDuration">Duração</Label>
                    <Input
                      type="time"
                      name="duration"
                      id="activityDuration"
                      value={newActivity.duration}
                      onChange={handleInputChange}
                    />
                  </FormGroup>
                </Col>
              </Row>

              <Row>
                <Col md={12} className="mb-3">
                  <FormGroup>
                    <Label for="activityResponsible">Responsável</Label>
                    <Input
                      type="text"
                      name="responsible"
                      id="activityResponsible"
                      value={newActivity.responsible}
                      onChange={handleInputChange}
                      disabled
                    />
                  </FormGroup>
                </Col>
              </Row>

              <Row>
                <Col md={6} className="mb-3">
                  <FormGroup>
                    <Label>Pessoas</Label>
                    <div className="border rounded p-2">
                      <div className="d-flex">
                        <span className="badge bg-light text-dark p-2 me-2">
                          <i className="mdi mdi-account-circle me-1"></i>
                          CEZAR AUGUSTO GEHM FILHO - CRM PipeRun <i className="mdi mdi-close ms-1"></i>
                        </span>
                      </div>
                    </div>
                  </FormGroup>
                </Col>
                <Col md={6} className="mb-3">
                  <FormGroup>
                    <Label>Empresas</Label>
                    <div className="border rounded p-2">
                      <div className="d-flex">
                        <span className="badge bg-light text-dark p-2 me-2">
                          <i className="mdi mdi-domain me-1"></i>
                          CRM PipeRun <i className="mdi mdi-close ms-1"></i>
                        </span>
                      </div>
                    </div>
                  </FormGroup>
                </Col>
              </Row>

              <div className="d-flex mt-3">
                <Button color="secondary" className="me-2" onClick={toggleForm}>Fechar</Button>
                <Button color="success" onClick={createActivity}>Salvar</Button>
              </div>
            </Form>
          </CardBody>
        </Card>
      ) : (
        <div>
          <ul className="nav nav-tabs mb-3">
            <li className="nav-item">
              <Button 
                color="link" 
                className={`nav-link ${activeFilter === 'planejadas' ? 'active' : ''}`}
                onClick={() => setActiveFilter('planejadas')}
              >
                Planejadas
              </Button>
            </li>
            <li className="nav-item">
              <Button 
                color="link" 
                className={`nav-link ${activeFilter === 'concluidas' ? 'active' : ''}`}
                onClick={() => setActiveFilter('concluidas')}
              >
                Concluídas
              </Button>
            </li>
            <li className="nav-item">
              <Button 
                color="link" 
                className={`nav-link ${activeFilter === 'no-show' ? 'active' : ''}`}
                onClick={() => setActiveFilter('no-show')}
              >
                No-show
              </Button>
            </li>
          </ul>

          <Card>
            <CardBody>
              <div className="table-responsive">
                <Table className="table-striped table-hover">
                  <thead>
                    <tr>
                      <th>Status</th>
                      <th>Data Início</th>
                      <th>Duração</th>
                      <th>Tipo</th>
                      <th>Título</th>
                      <th>Resp.</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getFilteredActivities().length === 0 ? (
                      <tr>
                        <td colSpan="6" className="text-center py-4">
                          <p className="text-muted mb-0">Nenhuma atividade encontrada.</p>
                        </td>
                      </tr>
                    ) : (
                      getFilteredActivities().map(activity => (
                        <tr key={activity.id} style={{ cursor: 'pointer' }}>
                          <td>
                            <span 
                              className={`badge ${
                                activity.status === 'Planejada' ? 'bg-success' : 
                                activity.status === 'Concluída' ? 'bg-primary' : 
                                'bg-warning'
                              }`}
                            >
                              {activity.status}
                            </span>
                          </td>
                          <td>{activity.date} {activity.time}</td>
                          <td>{activity.duration}</td>
                          <td>{activity.type}</td>
                          <td>{activity.title}</td>
                          <td>{activity.responsible}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </Table>
              </div>
            </CardBody>
          </Card>
        </div>
      )}

      {/* Componente de Toast para notificações */}
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
      />
    </div>
  );
};

export default ActivitiesTab; 