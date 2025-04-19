import React, { useState, useEffect, useRef } from "react";
import { 
  Container, 
  Row, 
  Col, 
  Card, 
  CardBody, 
  Button,
  ButtonGroup,
  Input,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Form,
  FormGroup
} from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { withTranslation } from "react-i18next";

const Activities = (props) => {
  const { t } = props;
  document.title = "Atividades | InteliTec CRM";

  // Estado para controlar a data atual do calendário
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState('week'); // 'day', 'week', 'month'
  const [dropdownOpen, setDropdownOpen] = useState(false);
  
  // Estado para controlar o formulário de atividade
  const [showForm, setShowForm] = useState(false);
  const [formPosition, setFormPosition] = useState({ top: 0, left: 0 });
  const [formData, setFormData] = useState(null);
  const formRef = useRef(null);

  // Toggle dropdown
  const toggle = () => setDropdownOpen(prevState => !prevState);

  // Função para fechar o formulário quando clicar fora dele
  useEffect(() => {
    function handleClickOutside(event) {
      if (formRef.current && !formRef.current.contains(event.target) && 
          !event.target.closest('.calendar-event') && 
          !event.target.closest('.dropdown-item') && 
          !event.target.closest('.calendar-weekly')) {
        setShowForm(false);
      }
    }

    // Adiciona o evento ao clicar no documento
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Remove o evento quando o componente for desmontado
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [formRef]);

  // Função para formatar a data no formato "DD de MMM de YYYY"
  const formatDateRange = () => {
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    
    // Se estiver na visualização semanal, mostrar intervalo de datas
    if (viewMode === 'week') {
      // Obter o primeiro dia da semana (domingo)
      const firstDay = new Date(currentDate);
      const day = currentDate.getDay();
      const diff = currentDate.getDate() - day;
      firstDay.setDate(diff);
      
      // Obter o último dia da semana (sábado)
      const lastDay = new Date(firstDay);
      lastDay.setDate(lastDay.getDate() + 6);
      
      // Formatar primeiro e último dia
      const firstDayFormatted = firstDay.getDate();
      const lastDayFormatted = lastDay.getDate();
      const monthFormatted = lastDay.toLocaleDateString('pt-BR', { month: 'short' });
      const yearFormatted = lastDay.getFullYear();
      
      return `${firstDayFormatted} – ${lastDayFormatted} de ${monthFormatted} de ${yearFormatted}`;
    } else {
      // Para visualização diária ou mensal
      return currentDate.toLocaleDateString('pt-BR', options);
    }
  };

  // Função para navegar para semana anterior
  const goToPrevious = () => {
    const newDate = new Date(currentDate);
    if (viewMode === 'week') {
      newDate.setDate(newDate.getDate() - 7);
    } else if (viewMode === 'day') {
      newDate.setDate(newDate.getDate() - 1);
    } else if (viewMode === 'month') {
      newDate.setMonth(newDate.getMonth() - 1);
    }
    setCurrentDate(newDate);
  };

  // Função para navegar para semana seguinte
  const goToNext = () => {
    const newDate = new Date(currentDate);
    if (viewMode === 'week') {
      newDate.setDate(newDate.getDate() + 7);
    } else if (viewMode === 'day') {
      newDate.setDate(newDate.getDate() + 1);
    } else if (viewMode === 'month') {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };

  // Função para voltar para a data atual
  const goToToday = () => {
    setCurrentDate(new Date());
  };

  // Gerar os dias da semana atual
  const getWeekDays = () => {
    const days = [];
    const firstDay = new Date(currentDate);
    const day = currentDate.getDay();
    const diff = currentDate.getDate() - day;
    firstDay.setDate(diff);

    for (let i = 0; i < 7; i++) {
      const date = new Date(firstDay);
      date.setDate(date.getDate() + i);
      
      const isToday = new Date().toDateString() === date.toDateString();
      const dayName = date.toLocaleDateString('pt-BR', { weekday: 'short' }).charAt(0).toUpperCase() + 
                     date.toLocaleDateString('pt-BR', { weekday: 'short' }).slice(1);
      const dayNumber = date.getDate();
      
      days.push({
        date,
        dayName,
        dayNumber,
        isToday
      });
    }
    
    return days;
  };

  // Gerar horários para o calendário (de 8h às 18h de 30 em 30 minutos)
  const getTimeSlots = () => {
    const slots = [];
    for (let hour = 8; hour <= 18; hour++) {
      // Adicionando a hora cheia
      slots.push({
        hour,
        minute: 0,
        label: `${hour}:00`
      });
      
      // Adicionando a meia hora, desde que não seja às 18:30
      if (hour < 18) {
        slots.push({
          hour,
          minute: 30,
          label: `${hour}:30`
        });
      }
    }
    return slots;
  };

  // Dados de exemplo de agendamentos
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Reunião de apresentação",
      description: "Apresentação inicial dos serviços",
      start: new Date(2025, 3, 18, 10, 0), // 18/04/2025 10:00
      end: new Date(2025, 3, 18, 11, 0),   // 18/04/2025 11:00
      type: "Reunião",
      status: "Planejada",
      color: "#f8f9fa", // cor mais neutra
      borderColor: "#ffcf5c" // cor de borda
    },
    {
      id: 2,
      title: "Envio de proposta comercial",
      description: "Envio da proposta com valores e condições",
      start: new Date(2025, 3, 18, 14, 0), // 18/04/2025 14:00
      end: new Date(2025, 3, 18, 14, 30),  // 18/04/2025 14:30
      type: "E-mail",
      status: "Concluída",
      color: "#f8f9fa", // cor mais neutra
      borderColor: "#62c1e0" // cor de borda
    },
    {
      id: 3,
      title: "Ligação para cliente",
      description: "Follow up sobre proposta enviada",
      start: new Date(2025, 3, 19, 9, 0),  // 19/04/2025 09:00
      end: new Date(2025, 3, 19, 9, 30),   // 19/04/2025 09:30
      type: "Ligação",
      status: "Planejada",
      color: "#f8f9fa", // cor mais neutra
      borderColor: "#4bde97" // cor de borda
    }
  ]);

  // Verifica se um evento está em uma determinada data e hora
  const isEventAtTimeSlot = (date, hour, isHalfHour = false) => {
    const timeToCheck = new Date(date);
    timeToCheck.setHours(hour);
    timeToCheck.setMinutes(isHalfHour ? 30 : 0);
    timeToCheck.setSeconds(0);
    timeToCheck.setMilliseconds(0);
    
    return events.filter(event => {
      const eventStart = new Date(event.start);
      const eventEnd = new Date(event.end);
      
      // Verifica se o horário está dentro do intervalo do evento
      return timeToCheck >= eventStart && timeToCheck < eventEnd;
    });
  };

  // Função para lidar com mudanças no formulário
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Função para abrir o formulário ao clicar em um horário vazio no calendário
  const handleTimeSlotClick = (day, hour, isHalfHour = false, event) => {
    // Evita a propagação do clique
    event.stopPropagation();
    
    // Define a posição do formulário abaixo da caixa de busca
    const searchBar = document.querySelector('.search-container');
    const scrollY = window.scrollY || window.pageYOffset;
    
    if (searchBar) {
      const rect = searchBar.getBoundingClientRect();
      setFormPosition({
        top: rect.bottom + scrollY + 10,
        left: rect.left
      });
    } else {
      // Fallback para o comportamento anterior se a busca não for encontrada
      const rect = event.currentTarget.getBoundingClientRect();
      setFormPosition({
        top: rect.bottom + scrollY,
        left: rect.left
      });
    }

    // Cria dados da atividade baseados no horário clicado
    const date = new Date(day.date);
    date.setHours(hour);
    date.setMinutes(isHalfHour ? 30 : 0);
    
    // Calcula o horário de término (1 hora depois do início)
    const endDate = new Date(date);
    endDate.setHours(endDate.getHours() + 1);
    
    // Prepara os dados iniciais para o formulário
    const initialData = {
      id: null, // Novo evento
      title: "",
      description: "",
      date: date.toISOString().split("T")[0],
      startTime: `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`,
      endTime: `${endDate.getHours().toString().padStart(2, '0')}:${endDate.getMinutes().toString().padStart(2, '0')}`,
      type: "",
      responsible: "",
      reminder: "",
      opportunity: "",
      company: "",
      person: "",
      participants: []
    };
    
    setFormData(initialData);
    setShowForm(true);
  };

  // Função para abrir o formulário ao clicar em um evento existente
  const handleEventClick = (event, domEvent) => {
    // Evita a propagação do clique
    domEvent.stopPropagation();
    
    // Define a posição do formulário abaixo da caixa de busca
    const searchBar = document.querySelector('.search-container');
    const scrollY = window.scrollY || window.pageYOffset;
    
    if (searchBar) {
      const rect = searchBar.getBoundingClientRect();
      setFormPosition({
        top: rect.bottom + scrollY + 10,
        left: rect.left
      });
    } else {
      // Fallback para o comportamento anterior se a busca não for encontrada
      const rect = domEvent.currentTarget.getBoundingClientRect();
      setFormPosition({
        top: rect.bottom + scrollY,
        left: rect.left
      });
    }

    const start = new Date(event.start);
    const end = new Date(event.end);
    
    // Prepara os dados do evento para o formulário
    const eventData = {
      id: event.id,
      title: event.title,
      description: event.description,
      date: start.toISOString().split("T")[0],
      startTime: `${start.getHours().toString().padStart(2, '0')}:${start.getMinutes().toString().padStart(2, '0')}`,
      endTime: `${end.getHours().toString().padStart(2, '0')}:${end.getMinutes().toString().padStart(2, '0')}`,
      type: event.type,
      responsible: "",
      reminder: "",
      opportunity: "",
      company: "",
      person: "",
      participants: []
    };
    
    setFormData(eventData);
    setShowForm(true);
  };

  // Função para salvar uma nova atividade ou atualizar uma existente
  const saveActivity = () => {
    if (!formData) return;
    
    const { id, title, description, date, startTime, endTime, type } = formData;
    
    // Criar objetos de data para o início e fim
    const startDate = new Date(`${date}T${startTime}`);
    const endDate = new Date(`${date}T${endTime}`);
    
    // Definir cor de borda com base no tipo
    let borderColor = "#4bde97"; // verde (padrão)
    if (type === "Reunião") borderColor = "#ffcf5c"; // amarelo
    else if (type === "E-mail") borderColor = "#62c1e0"; // azul
    else if (type === "Ligação") borderColor = "#4bde97"; // verde
    else if (type === "Tarefa") borderColor = "#f96e6e"; // vermelho
    else if (type === "Visita") borderColor = "#b795e3"; // roxo
    
    // Se estamos atualizando um evento existente
    if (id) {
      const updatedEvents = events.map(event => {
        if (event.id === id) {
          return {
            ...event,
            title,
            description,
            start: startDate,
            end: endDate,
            type,
            color: "#f8f9fa",
            borderColor
          };
        }
        return event;
      });
      
      setEvents(updatedEvents);
    } else {
      // Caso contrário, estamos criando um novo evento
      const newEvent = {
        id: Date.now(), // ID único baseado no timestamp
        title,
        description,
        start: startDate,
        end: endDate,
        type,
        status: "Planejada",
        color: "#f8f9fa",
        borderColor
      };
      
      setEvents([...events, newEvent]);
    }
    
    // Fecha o formulário
    setShowForm(false);
  };

  // Função para lidar com o clique em "Criar" no dropdown
  const handleCreateActivityType = (type) => {
    // Define a posição abaixo da caixa de busca
    const searchBar = document.querySelector('.search-container');
    const scrollY = window.scrollY || window.pageYOffset;
    
    if (searchBar) {
      const rect = searchBar.getBoundingClientRect();
      setFormPosition({
        top: rect.bottom + scrollY + 10,
        left: rect.left
      });
    } else {
      // Fallback para o comportamento anterior
      const headerRect = document.querySelector('.page-content').getBoundingClientRect();
      setFormPosition({
        top: headerRect.top + scrollY + 100,
        left: headerRect.right - 400
      });
    }
    
    // Define a data atual
    const now = new Date();
    const startTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    
    // Adiciona 1 hora para o horário de término
    const endTime = new Date(now);
    endTime.setHours(endTime.getHours() + 1);
    const endTimeStr = `${endTime.getHours().toString().padStart(2, '0')}:${endTime.getMinutes().toString().padStart(2, '0')}`;
    
    // Prepara os dados iniciais para o formulário com o tipo selecionado
    const initialData = {
      id: null, // Novo evento
      title: "",
      description: "",
      date: now.toISOString().split("T")[0],
      startTime,
      endTime: endTimeStr,
      type,
      responsible: "",
      reminder: "",
      opportunity: "",
      company: "",
      person: "",
      participants: []
    };
    
    // Define os dados e exibe o formulário
    setFormData(initialData);
    setDropdownOpen(false);
    setShowForm(true);
  };

  // Função para verificar se há pelo menos um evento em qualquer dia da semana para um horário específico
  const hasAnyEventInSlot = (hour, isHalfHour = false) => {
    // Obter os dias da semana
    const days = getWeekDays();
    
    // Verificar cada dia
    for (let i = 0; i < days.length; i++) {
      const eventsAtSlot = isEventAtTimeSlot(days[i].date, hour, isHalfHour);
      if (eventsAtSlot.length > 0) {
        return true;
      }
    }
    
    return false;
  };

  // Gerar os dias da semana
  const weekDays = getWeekDays();
  const timeSlots = getTimeSlots();

  // Adicionar função auxiliar para gerar os dias do mês
  const getMonthDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    // Primeiro dia do mês
    const firstDay = new Date(year, month, 1);
    // Último dia do mês
    const lastDay = new Date(year, month + 1, 0);
    
    // Dia da semana do primeiro dia (0 = domingo, 6 = sábado)
    const firstDayIndex = firstDay.getDay();
    
    // Quantidade total de dias no grid (até 42 - 6 semanas)
    const daysInGrid = 42;
    
    // Array para armazenar todos os dias
    const days = [];
    
    // Dias do mês anterior
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = firstDayIndex - 1; i >= 0; i--) {
      const date = new Date(year, month - 1, prevMonthLastDay - i);
      days.push({
        date,
        day: prevMonthLastDay - i,
        isCurrentMonth: false,
        isToday: date.toDateString() === new Date().toDateString()
      });
    }
    
    // Dias do mês atual
    for (let i = 1; i <= lastDay.getDate(); i++) {
      const date = new Date(year, month, i);
      days.push({
        date,
        day: i,
        isCurrentMonth: true,
        isToday: date.toDateString() === new Date().toDateString()
      });
    }
    
    // Dias do próximo mês
    const remainingDays = daysInGrid - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      const date = new Date(year, month + 1, i);
      days.push({
        date,
        day: i,
        isCurrentMonth: false,
        isToday: date.toDateString() === new Date().toDateString()
      });
    }
    
    return days;
  };

  // Função para verificar se um dia tem eventos
  const hasDayEvents = (date) => {
    // Clone a data e defina para o início do dia
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    
    // Clone a data e defina para o final do dia
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);
    
    // Verificar se há algum evento neste dia
    return events.some(event => {
      const eventDate = new Date(event.start);
      return eventDate >= startOfDay && eventDate <= endOfDay;
    });
  };

  // Função para obter eventos de um dia específico
  const getDayEvents = (date) => {
    // Clone a data e defina para o início do dia
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    
    // Clone a data e defina para o final do dia
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);
    
    // Filtrar eventos deste dia
    return events.filter(event => {
      const eventDate = new Date(event.start);
      return eventDate >= startOfDay && eventDate <= endOfDay;
    })
    // Ordenar eventos por hora de início
    .sort((a, b) => a.start - b.start);
  };

  return (
    <React.Fragment>
      <div className="page-content" style={{ backgroundColor: "#f8f9fa" }}>
        <Container fluid>
          <Row>
            <Col xs={12}>
              <Card className="shadow-sm" style={{ backgroundColor: "#ffffff" }}>
                <CardBody>
                  {/* Cabeçalho do Calendário */}
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <div className="d-flex align-items-center">
                      <h5 className="mb-0 me-3 text-dark">{formatDateRange()}</h5>
                      <ButtonGroup className="me-3">
                        <Button color="light" size="sm" onClick={goToPrevious}>
                          <i className="bx bx-chevron-left"></i>
                        </Button>
                        <Button color="light" size="sm" onClick={goToNext}>
                          <i className="bx bx-chevron-right"></i>
                        </Button>
                      </ButtonGroup>
                      <Button color="light" size="sm" onClick={goToToday}>Hoje</Button>
                    </div>
                    
                    <div className="d-flex">
                      <ButtonGroup className="me-3">
                        <Button 
                          color={viewMode === 'day' ? 'primary' : 'light'} 
                          size="sm"
                          onClick={() => setViewMode('day')}
                        >
                          Dia
                        </Button>
                        <Button 
                          color={viewMode === 'week' ? 'primary' : 'light'} 
                          size="sm"
                          onClick={() => setViewMode('week')}
                        >
                          Semana
                        </Button>
                        <Button 
                          color={viewMode === 'month' ? 'primary' : 'light'} 
                          size="sm"
                          onClick={() => setViewMode('month')}
                        >
                          Mês
                        </Button>
                      </ButtonGroup>
                      
                      <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                        <DropdownToggle color="primary" size="sm" caret>
                          <i className="bx bx-plus me-1"></i> Adicionar Atividade
                        </DropdownToggle>
                        <DropdownMenu>
                          <DropdownItem onClick={() => handleCreateActivityType("Reunião")}>Reunião</DropdownItem>
                          <DropdownItem onClick={() => handleCreateActivityType("Ligação")}>Ligação</DropdownItem>
                          <DropdownItem onClick={() => handleCreateActivityType("E-mail")}>E-mail</DropdownItem>
                          <DropdownItem onClick={() => handleCreateActivityType("Tarefa")}>Tarefa</DropdownItem>
                          <DropdownItem onClick={() => handleCreateActivityType("Visita")}>Visita</DropdownItem>
                        </DropdownMenu>
                      </Dropdown>
                    </div>
                  </div>

                  {/* Filtro Rápido */}
                  <div className="mb-4 d-flex search-container">
                    <div className="position-relative" style={{ maxWidth: '300px', width: '100%' }}>
                      <div className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted">
                        <i className="bx bx-search-alt"></i>
                      </div>
                      <Input 
                        type="text" 
                        placeholder="Buscar atividades..."
                        className="form-control ps-4"
                        style={{ paddingLeft: '2.5rem' }}
                      />
                      <div className="position-absolute end-0 top-50 translate-middle-y me-3" style={{ cursor: 'pointer' }}>
                        <i className="bx bx-x text-muted"></i>
                      </div>
                    </div>
                  </div>

                  {/* Calendário - Visualização Semanal */}
                  {viewMode === 'week' && (
                    <div className="calendar-weekly bg-white">
                      {/* Cabeçalho com dias da semana */}
                      <div className="d-flex border-bottom" style={{ minWidth: '800px' }}>
                        <div style={{ width: '80px', backgroundColor: "#f8f9fa" }}></div>
                        {weekDays.map((day, index) => (
                          <div 
                            key={index} 
                            className={`flex-fill text-center py-2 ${day.isToday ? 'bg-light' : ''}`}
                            style={{ backgroundColor: day.isToday ? '#e9f7f0' : '#f8f9fa' }}
                          >
                            <div className="text-muted">{day.dayName}</div>
                            <div className={`${day.isToday ? 'rounded-circle bg-success text-white' : ''}`} style={{ 
                              width: '30px', 
                              height: '30px', 
                              display: 'inline-flex', 
                              justifyContent: 'center', 
                              alignItems: 'center', 
                              marginTop: '2px' 
                            }}>
                              {day.dayNumber}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Linhas com horários */}
                      <div className="calendar-grid" style={{ minWidth: '800px', backgroundColor: "#ffffff" }}>
                        {timeSlots.map((slot, slotIndex) => {
                          // Calcular se há eventos para este horário
                          const hasEventsAtSlot = hasAnyEventInSlot(slot.hour, slot.minute === 30);
                          
                          // Ajustar a altura com base no modo de visualização e presença de eventos
                          const slotHeight = () => {
                            if (viewMode === 'day') {
                              return hasEventsAtSlot ? '140px' : '60px';
                            } else if (viewMode === 'week') {
                              return hasEventsAtSlot ? '120px' : '50px';
                            } else { // month
                              return hasEventsAtSlot ? '100px' : '40px';
                            }
                          };
                          
                          return (
                            <div 
                              key={slotIndex} 
                              className="d-flex border-bottom" 
                              style={{ 
                                height: slotHeight(),
                                transition: 'height 0.3s ease'
                              }}
                            >
                              <div className="time-indicator text-muted py-2 px-2" style={{ width: '80px', textAlign: 'right', backgroundColor: "#f8f9fa" }}>
                                {slot.label}
                              </div>
                              
                              {weekDays.map((day, dayIndex) => {
                                const eventsAtSlot = isEventAtTimeSlot(day.date, slot.hour, slot.minute === 30);
                                
                                return (
                                  <div 
                                    key={dayIndex} 
                                    className={`flex-fill position-relative border-start ${day.isToday ? 'bg-light bg-opacity-25' : ''}`}
                                    onClick={(e) => handleTimeSlotClick(day, slot.hour, slot.minute === 30, e)}
                                    style={{ 
                                      cursor: 'pointer',
                                      backgroundColor: day.isToday ? '#f5f9ff' : '#ffffff' 
                                    }}
                                  >
                                    {eventsAtSlot.map(event => {
                                      // Formatar horários para exibição
                                      const startHour = event.start.getHours().toString().padStart(2, '0');
                                      const startMin = event.start.getMinutes().toString().padStart(2, '0');
                                      const endHour = event.end.getHours().toString().padStart(2, '0');
                                      const endMin = event.end.getMinutes().toString().padStart(2, '0');
                                      const timeDisplay = `${startHour}:${startMin}`;
                                      const durationDisplay = `${startHour}:${startMin} - ${endHour}:${endMin}`;
                                      
                                      // Ajustar altura do card com base no modo de visualização
                                      const cardHeight = () => {
                                        if (viewMode === 'day') {
                                          return '120px';
                                        } else if (viewMode === 'week') {
                                          return '100px';
                                        } else { // month
                                          return '80px';
                                        }
                                      };
                                      
                                      // Definir cor da borda com base no tipo de evento
                                      let borderColor = "#4a6cf7"; // azul (padrão)
                                      if (event.type === "Reunião") borderColor = "#ffcf5c"; // amarelo
                                      else if (event.type === "E-mail") borderColor = "#62c1e0"; // azul claro
                                      else if (event.type === "Ligação") borderColor = "#4bde97"; // verde
                                      else if (event.type === "Tarefa") borderColor = "#f96e6e"; // vermelho
                                      else if (event.type === "Visita") borderColor = "#b795e3"; // roxo
                                      
                                      return (
                                        <div 
                                          key={event.id}
                                          className="calendar-event position-absolute"
                                          style={{ 
                                            backgroundColor: "#fff",
                                            height: cardHeight(),
                                            width: 'calc(100% - 12px)',
                                            margin: '0 6px',
                                            top: '10px',
                                            zIndex: 2,
                                            overflow: 'hidden',
                                            cursor: 'pointer',
                                            boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
                                            borderRadius: '4px',
                                            borderLeft: `4px solid ${borderColor}`,
                                            position: 'relative'
                                          }}
                                          onClick={(e) => handleEventClick(event, e)}
                                          onMouseEnter={(e) => {
                                            // Criar tooltip ao passar o mouse
                                            const tooltip = document.createElement('div');
                                            tooltip.className = 'event-tooltip';
                                            
                                            // Formatação de datas
                                            const startDate = new Date(event.start);
                                            const endDate = new Date(event.end);
                                            const startFormatted = startDate.toLocaleTimeString('pt-BR', {hour: '2-digit', minute: '2-digit'});
                                            const endFormatted = endDate.toLocaleTimeString('pt-BR', {hour: '2-digit', minute: '2-digit'});
                                            const dateFormatted = startDate.toLocaleDateString('pt-BR', {day: '2-digit', month: '2-digit', year: 'numeric'});
                                            
                                            // Verificar dimensões da tela e tooltip
                                            const windowWidth = window.innerWidth;
                                            const windowHeight = window.innerHeight;
                                            const tooltipWidth = 320; // Largura estimada do tooltip
                                            const tooltipHeight = 300; // Altura estimada do tooltip
                                            
                                            // Verificar se o tooltip ficaria fora da tela pelas bordas
                                            const isNearRightEdge = (e.clientX + tooltipWidth + 30) > windowWidth;
                                            const isNearBottomEdge = (e.clientY + tooltipHeight + 30) > windowHeight;
                                            
                                            // Definir a posição horizontal conforme a proximidade da borda
                                            const leftPosition = isNearRightEdge ? 
                                              `${e.clientX - tooltipWidth - 20}px` : 
                                              `${e.clientX + 20}px`;
                                            
                                            // Definir a posição vertical conforme a proximidade da borda
                                            const topPosition = isNearBottomEdge ? 
                                              `${e.clientY - tooltipHeight - 20}px` : 
                                              `${e.clientY}px`;
                                            
                                            // Conteúdo do tooltip
                                            tooltip.innerHTML = `
                                              <div style="
                                                position: fixed;
                                                min-width: 300px;
                                                max-width: 320px;
                                                background: white;
                                                border-radius: 6px;
                                                box-shadow: 0 3px 15px rgba(0,0,0,0.3);
                                                padding: 15px;
                                                z-index: 9999;
                                                left: ${leftPosition};
                                                top: ${topPosition};
                                                font-size: 14px;
                                                border: 1px solid #e0e0e0;
                                              ">
                                                <h6 style="font-weight: bold; font-size: 16px; margin-bottom: 12px; color: #4a6cf7; border-bottom: 1px solid #eee; padding-bottom: 8px;">${event.title}</h6>
                                                <div style="margin-bottom: 6px;"><strong>Tipo:</strong> ${event.type}</div>
                                                <div style="margin-bottom: 6px;"><strong>Descrição:</strong> ${event.description}</div>
                                                <div style="margin-bottom: 6px;"><strong>Data:</strong> ${dateFormatted}</div>
                                                <div style="margin-bottom: 6px;"><strong>Horário:</strong> ${startFormatted} - ${endFormatted}</div>
                                                <div style="margin-bottom: 6px;"><strong>Status:</strong> ${event.status}</div>
                                                <div style="margin-bottom: 12px;"><strong>Responsável:</strong> Felipe Macedo</div>
                                                <div style="font-size: 12px; color: #666; text-align: center; margin-top: 10px; background: #f8f9fa; padding: 5px; border-radius: 4px;">Clique para editar</div>
                                              </div>
                                            `;
                                            
                                            // Adicionar ao corpo do documento em vez do card
                                            document.body.appendChild(tooltip);
                                            
                                            // Armazenar referência ao tooltip no elemento atual
                                            e.currentTarget.tooltipElement = tooltip;
                                          }}
                                          onMouseLeave={(e) => {
                                            // Remover tooltip
                                            if (e.currentTarget.tooltipElement) {
                                              document.body.removeChild(e.currentTarget.tooltipElement);
                                              e.currentTarget.tooltipElement = null;
                                            }
                                          }}
                                        >
                                          <div className="d-flex h-100">
                                            {/* Conteúdo principal */}
                                            <div className="p-2" style={{ flex: 1, overflow: 'hidden' }}>
                                              <div className="d-flex justify-content-between align-items-center">
                                                <div className="badge" style={{
                                                  backgroundColor: '#f0f0f0',
                                                  color: '#333',
                                                  fontSize: '11px',
                                                  padding: '2px 5px',
                                                  borderRadius: '3px'
                                                }}>
                                                  {event.type}
                                                </div>
                                                <div className="badge" style={{
                                                  backgroundColor: '#e74c3c',
                                                  color: 'white',
                                                  fontSize: '11px',
                                                  padding: '2px 5px',
                                                  borderRadius: '3px'
                                                }}>
                                                  {viewMode === 'day' ? durationDisplay : timeDisplay}
                                                </div>
                                              </div>
                                              
                                              <div className="text-truncate mt-1" style={{fontSize: '12px', fontWeight: 'bold'}}>
                                                {event.title}
                                              </div>
                                              
                                              <div style={{
                                                fontSize: '11px', 
                                                height: viewMode === 'day' ? '40px' : '30px', 
                                                overflow: 'hidden', 
                                                textOverflow: 'ellipsis', 
                                                display: '-webkit-box', 
                                                WebkitLineClamp: viewMode === 'day' ? 3 : 2, 
                                                WebkitBoxOrient: 'vertical'
                                              }}>
                                                {event.description || "ligar para " + event.title.toLowerCase()}
                                              </div>
                                              
                                              <div className="d-flex justify-content-between align-items-center mt-1">
                                                <div className="d-flex align-items-center text-muted">
                                                  <i className="bx bx-user me-1" style={{fontSize: '10px'}}></i>
                                                  <span style={{fontSize: '10px'}}>Felipe</span>
                                                </div>
                                                
                                                <div 
                                                  className="d-flex align-items-center justify-content-center text-white"
                                                  style={{ 
                                                    padding: '1px 6px',
                                                    backgroundColor: '#4e67f8',
                                                    borderRadius: '3px',
                                                    fontSize: '11px'
                                                  }}
                                                  onClick={(e) => {
                                                    e.stopPropagation();
                                                    alert(`Iniciando atividade: ${event.title}`);
                                                  }}
                                                >
                                                  <i className="bx bx-time me-1"></i>
                                                  <strong>60</strong>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      );
                                    })}
                                  </div>
                                );
                              })}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Visualização Diária (Placeholder) */}
                  {viewMode === 'day' && (
                    <div className="calendar-day bg-white">
                      {/* Cabeçalho com o dia atual */}
                      <div className="d-flex border-bottom" style={{ minWidth: '800px' }}>
                        <div style={{ width: '80px', backgroundColor: "#f8f9fa" }}></div>
                        <div 
                          className="flex-fill text-center py-2"
                          style={{ backgroundColor: '#e9f7f0' }}
                        >
                          <div className="text-muted">{currentDate.toLocaleDateString('pt-BR', { weekday: 'long' })}</div>
                          <div className="rounded-circle bg-success text-white" style={{ 
                            width: '30px', 
                            height: '30px', 
                            display: 'inline-flex', 
                            justifyContent: 'center', 
                            alignItems: 'center', 
                            marginTop: '2px' 
                          }}>
                            {currentDate.getDate()}
                          </div>
                        </div>
                      </div>

                      {/* Linhas com horários para visualização diária */}
                      <div className="calendar-grid" style={{ minWidth: '800px', backgroundColor: "#ffffff" }}>
                        {timeSlots.map((slot, slotIndex) => {
                          // Verificar se há eventos para este horário no dia atual
                          const eventsAtSlot = isEventAtTimeSlot(currentDate, slot.hour, slot.minute === 30);
                          const hasEvents = eventsAtSlot.length > 0;
                          
                          return (
                            <div 
                              key={slotIndex} 
                              className="d-flex border-bottom" 
                              style={{ 
                                height: hasEvents ? '140px' : '60px',
                                transition: 'height 0.3s ease'
                              }}
                            >
                              <div className="time-indicator text-muted py-2 px-2" style={{ width: '80px', textAlign: 'right', backgroundColor: "#f8f9fa" }}>
                                {slot.label}
                              </div>
                              
                              <div 
                                className="flex-fill position-relative border-start"
                                onClick={(e) => handleTimeSlotClick({ date: currentDate }, slot.hour, slot.minute === 30, e)}
                                style={{ 
                                  cursor: 'pointer',
                                  backgroundColor: '#ffffff' 
                                }}
                              >
                                {eventsAtSlot.map(event => {
                                  // Formatar horários para exibição
                                  const startHour = event.start.getHours().toString().padStart(2, '0');
                                  const startMin = event.start.getMinutes().toString().padStart(2, '0');
                                  const endHour = event.end.getHours().toString().padStart(2, '0');
                                  const endMin = event.end.getMinutes().toString().padStart(2, '0');
                                  const timeDisplay = `${startHour}:${startMin}`;
                                  const durationDisplay = `${startHour}:${startMin} - ${endHour}:${endMin}`;
                                  
                                  return (
                                    <div 
                                      key={event.id}
                                      className="calendar-event position-absolute"
                                      style={{ 
                                        backgroundColor: "#fff",
                                        height: '120px',
                                        width: 'calc(100% - 12px)',
                                        margin: '0 6px',
                                        top: '10px',
                                        zIndex: 2,
                                        overflow: 'hidden',
                                        cursor: 'pointer',
                                        boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
                                        borderRadius: '4px',
                                        borderLeft: '4px solid #4a6cf7',
                                        position: 'relative'
                                      }}
                                      onClick={(e) => handleEventClick(event, e)}
                                    >
                                      <div className="d-flex h-100">
                                        <div className="p-2" style={{ flex: 1, overflow: 'hidden' }}>
                                          <div className="d-flex justify-content-between align-items-center">
                                            <div className="badge" style={{
                                              backgroundColor: '#f0f0f0',
                                              color: '#333',
                                              fontSize: '11px',
                                              padding: '2px 5px',
                                              borderRadius: '3px'
                                            }}>
                                              {event.type}
                                            </div>
                                            <div className="badge" style={{
                                              backgroundColor: '#e74c3c',
                                              color: 'white',
                                              fontSize: '11px',
                                              padding: '2px 5px',
                                              borderRadius: '3px'
                                            }}>
                                              {durationDisplay}
                                            </div>
                                          </div>
                                          
                                          <div className="text-truncate mt-2 mb-1" style={{fontSize: '13px', fontWeight: 'bold'}}>
                                            {event.title}
                                          </div>
                                          
                                          <div style={{fontSize: '12px', height: '40px', overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical'}}>
                                            {event.description || "ligar para " + event.title.toLowerCase()}
                                          </div>
                                          
                                          <div className="d-flex justify-content-between align-items-center mt-2">
                                            <div className="d-flex align-items-center text-muted small">
                                              <i className="bx bx-user me-1" style={{fontSize: '10px'}}></i>
                                              <span style={{fontSize: '10px'}}>Felipe</span>
                                            </div>
                                            
                                            <div 
                                              className="d-flex align-items-center justify-content-center text-white"
                                              style={{ 
                                                padding: '1px 6px',
                                                backgroundColor: '#4e67f8',
                                                borderRadius: '3px',
                                                fontSize: '11px'
                                              }}
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                alert(`Iniciando atividade: ${event.title}`);
                                              }}
                                            >
                                              <i className="bx bx-time me-1"></i>
                                              <strong>60</strong>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Visualização Mensal */}
                  {viewMode === 'month' && (
                    <div className="calendar-month bg-white">
                      {/* Título do mês atual */}
                      <div className="d-flex justify-content-center align-items-center py-2 border-bottom" style={{ backgroundColor: '#f8f9fa' }}>
                        <h5 className="m-0 text-dark">
                          {currentDate.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' }).charAt(0).toUpperCase() + 
                          currentDate.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' }).slice(1)}
                        </h5>
                      </div>
                      
                      {/* Cabeçalho com dias da semana */}
                      <div className="d-flex border-bottom" style={{ minWidth: '800px' }}>
                        {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((dayName, index) => (
                          <div 
                            key={index} 
                            className="flex-fill text-center py-2"
                            style={{ backgroundColor: '#f8f9fa' }}
                          >
                            <div className="text-muted">{dayName}</div>
                          </div>
                        ))}
                      </div>

                      {/* Grid do mês */}
                      <div className="calendar-month-grid" style={{ minWidth: '800px' }}>
                        <div className="d-flex flex-wrap">
                          {getMonthDays().map((day, index) => {
                            const dayEvents = getDayEvents(day.date);
                            const hasEvents = dayEvents.length > 0;
                            
                            return (
                              <div 
                                key={index} 
                                className={`calendar-day-cell position-relative border ${index % 7 === 6 ? 'border-end' : ''} ${Math.floor(index / 7) === 5 ? 'border-bottom' : ''}`}
                                style={{ 
                                  width: 'calc(100% / 7)', 
                                  height: '120px',
                                  backgroundColor: day.isToday ? '#e9f7f0' : day.isCurrentMonth ? '#ffffff' : '#f8f9fa',
                                  opacity: day.isCurrentMonth ? 1 : 0.6,
                                  cursor: 'pointer'
                                }}
                                onClick={() => {
                                  setCurrentDate(day.date);
                                  setViewMode('day');
                                }}
                              >
                                <div className="p-2">
                                  <div className="d-flex justify-content-between align-items-center">
                                    <div className={`day-number ${day.isToday ? 'rounded-circle bg-success text-white' : ''}`} style={{ 
                                      width: '24px', 
                                      height: '24px', 
                                      display: 'inline-flex', 
                                      justifyContent: 'center', 
                                      alignItems: 'center',
                                      fontWeight: day.isCurrentMonth ? 'bold' : 'normal'
                                    }}>
                                      {day.day}
                                    </div>
                                    
                                    {hasEvents && (
                                      <div className="event-count">
                                        <span className="badge rounded-pill bg-primary" style={{ fontSize: '9px' }}>
                                          {dayEvents.length}
                                        </span>
                                      </div>
                                    )}
                                  </div>
                                  
                                  {hasEvents && (
                                    <div className="event-list mt-1" style={{ overflow: 'hidden' }}>
                                      {dayEvents.slice(0, 3).map((event, eventIndex) => {
                                        // Definir cor da borda com base no tipo de evento
                                        let borderColor = "#4a6cf7"; // azul (padrão)
                                        if (event.type === "Reunião") borderColor = "#ffcf5c"; // amarelo
                                        else if (event.type === "E-mail") borderColor = "#62c1e0"; // azul claro
                                        else if (event.type === "Ligação") borderColor = "#4bde97"; // verde
                                        else if (event.type === "Tarefa") borderColor = "#f96e6e"; // vermelho
                                        else if (event.type === "Visita") borderColor = "#b795e3"; // roxo
                                        
                                        // Garantindo que temos objetos Date válidos
                                        const startDate = new Date(event.start);
                                        
                                        return (
                                          <div 
                                            key={eventIndex} 
                                            className="event-item mb-1 d-flex align-items-center"
                                            style={{ 
                                              backgroundColor: '#fff',
                                              borderRadius: '3px',
                                              borderLeft: `3px solid ${borderColor}`,
                                              padding: '2px 4px',
                                              fontSize: '10px',
                                              boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
                                              overflow: 'hidden',
                                              whiteSpace: 'nowrap',
                                              textOverflow: 'ellipsis',
                                              height: '18px'
                                            }}
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              handleEventClick(event, e);
                                            }}
                                          >
                                            <span className="event-time me-1" style={{ color: '#e74c3c', fontWeight: 'bold' }}>
                                              {startDate.getHours().toString().padStart(2, '0')}:{startDate.getMinutes().toString().padStart(2, '0')}
                                            </span>
                                            <span className="event-title" style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                              {event.title}
                                            </span>
                                          </div>
                                        );
                                      })}
                                      
                                      {dayEvents.length > 3 && (
                                        <div className="more-events text-center" style={{ fontSize: '10px', color: '#666' }}>
                                          + {dayEvents.length - 3} mais
                                        </div>
                                      )}
                                    </div>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )}
                </CardBody>
              </Card>
            </Col>
          </Row>

          {/* Formulário de atividade flutuante */}
          {showForm && formData && (
            <div 
              ref={formRef}
              style={{
                position: 'absolute',
                top: `${formPosition.top}px`,
                left: `${formPosition.left}px`,
                zIndex: 1050,
                width: '350px',
                backgroundColor: '#fff',
                borderRadius: '8px',
                boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
                border: '1px solid #e0e0e0'
              }}
            >
              <div className="p-3 bg-light border-bottom d-flex justify-content-between align-items-center" 
                   style={{ borderTopLeftRadius: '8px', borderTopRightRadius: '8px', borderBottom: '1px solid #e9e9e9' }}>
                <h6 className="m-0 text-dark fw-bold">
                  <i className="bx bx-calendar-edit me-1 text-primary"></i>
                  {formData.id ? 'Editar atividade' : 'Nova atividade'}
                </h6>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => setShowForm(false)}
                ></button>
              </div>
              <div className="p-3">
                <form>
                  {/* Título */}
                  <div className="form-group mb-2">
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      placeholder="Assunto da atividade"
                      name="title"
                      value={formData.title || ''}
                      onChange={handleFormChange}
                    />
                  </div>

                  {/* Descrição */}
                  <div className="form-group mb-2">
                    <textarea
                      className="form-control form-control-sm"
                      placeholder="Descrição"
                      rows="2"
                      name="description"
                      value={formData.description || ''}
                      onChange={handleFormChange}
                      style={{ minHeight: '60px' }}
                    ></textarea>
                  </div>

                  {/* Data e horário */}
                  <div className="row g-1 mb-2">
                    <div className="col-4">
                      <input
                        type="date"
                        className="form-control form-control-sm"
                        name="date"
                        value={formData.date || ''}
                        onChange={handleFormChange}
                      />
                    </div>
                    <div className="col-4">
                      <input
                        type="time"
                        className="form-control form-control-sm"
                        name="startTime"
                        value={formData.startTime || ''}
                        onChange={handleFormChange}
                      />
                    </div>
                    <div className="col-4">
                      <input
                        type="time"
                        className="form-control form-control-sm"
                        name="endTime"
                        value={formData.endTime || ''}
                        onChange={handleFormChange}
                      />
                    </div>
                  </div>

                  {/* Tipo */}
                  <div className="form-group mb-2">
                    <select
                      className="form-select form-select-sm"
                      name="type"
                      value={formData.type || ''}
                      onChange={handleFormChange}
                    >
                      <option value="" disabled>Selecione um tipo de atividade</option>
                      <option value="Reunião">Reunião</option>
                      <option value="Ligação">Ligação</option>
                      <option value="E-mail">E-mail</option>
                      <option value="Tarefa">Tarefa</option>
                      <option value="Visita">Visita</option>
                    </select>
                  </div>

                  {/* Responsável */}
                  <div className="form-group mb-2">
                    <select
                      className="form-select form-select-sm"
                      name="responsible"
                      value={formData.responsible || ''}
                      onChange={handleFormChange}
                    >
                      <option value="">Felipe Macedo</option>
                      <option value="maria">Maria Silva</option>
                      <option value="joao">João Costa</option>
                    </select>
                  </div>
                  
                  {/* Lembrete */}
                  <div className="form-group mb-2">
                    <select
                      className="form-select form-select-sm"
                      name="reminder"
                      value={formData.reminder || ''}
                      onChange={handleFormChange}
                    >
                      <option value="">Lembrete</option>
                      <option value="15min">15 minutos antes</option>
                      <option value="30min">30 minutos antes</option>
                      <option value="1h">1 hora antes</option>
                      <option value="1dia">1 dia antes</option>
                    </select>
                  </div>
                  
                  {/* Oportunidade */}
                  <div className="form-group mb-2">
                    <select
                      className="form-select form-select-sm"
                      name="opportunity"
                      value={formData.opportunity || ''}
                      onChange={handleFormChange}
                    >
                      <option value="" disabled>Selecione a oportunidade</option>
                      <option value="opp1">Projeto Website - ABC Ltda.</option>
                      <option value="opp2">Consultoria SEO - XYZ Comércio</option>
                      <option value="opp3">Desenvolvimento de App - 123 Serviços</option>
                    </select>
                  </div>
                  
                  {/* Empresa */}
                  <div className="form-group mb-2">
                    <select
                      className="form-select form-select-sm"
                      name="company"
                      value={formData.company || ''}
                      onChange={handleFormChange}
                    >
                      <option value="" disabled>Selecione a empresa</option>
                      <option value="comp1">ABC Ltda.</option>
                      <option value="comp2">XYZ Comércio</option>
                      <option value="comp3">123 Serviços</option>
                    </select>
                  </div>
                  
                  {/* Pessoa */}
                  <div className="form-group mb-2">
                    <select
                      className="form-select form-select-sm"
                      name="person"
                      value={formData.person || ''}
                      onChange={handleFormChange}
                    >
                      <option value="" disabled>Selecione a pessoa</option>
                      <option value="person1">Carlos Silva - ABC Ltda.</option>
                      <option value="person2">Ana Paula - XYZ Comércio</option>
                      <option value="person3">Ricardo Santos - 123 Serviços</option>
                    </select>
                  </div>
                  
                  {/* Participantes */}
                  <div className="form-group mb-2">
                    <select
                      className="form-select form-select-sm"
                      name="participants"
                      value={formData.participants || []}
                      onChange={handleFormChange}
                      multiple
                      style={{ height: '70px' }}
                    >
                      <option value="" disabled>Selecione os envolvidos</option>
                      <option value="part1">João Silva - Marketing</option>
                      <option value="part2">Maria Souza - Vendas</option>
                      <option value="part3">Pedro Teixeira - TI</option>
                      <option value="part4">Ana Castro - Financeiro</option>
                    </select>
                  </div>

                  {/* Botões */}
                  <div className="d-flex justify-content-between mt-3">
                    <button
                      type="button"
                      className="btn btn-sm btn-primary me-2"
                      onClick={saveActivity}
                      style={{ 
                        width: '80%', 
                        fontWeight: 'bold',
                        boxShadow: '0 2px 4px rgba(52, 143, 226, 0.3)',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <i className="bx bx-save me-1"></i> Salvar atividade
                    </button>
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => setShowForm(false)}
                      style={{ width: '20%' }}
                    >
                      <i className="bx bx-trash-alt"></i>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </Container>
      </div>
    </React.Fragment>
  );
};

export default withTranslation()(Activities); 