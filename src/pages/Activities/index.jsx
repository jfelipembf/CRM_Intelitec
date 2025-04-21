import React, { useState, useEffect, useRef } from "react";
import { mockActivities } from "./mockData";
import ActivityForm from "../../components/Activities/ActivityForm";
import { getWeekDays, getTimeSlots, formatDateRange } from "../../utils/dateUtils";
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
  DropdownItem
} from "reactstrap";
import { withTranslation } from "react-i18next";

const Activities = ({ t }) => {
  document.title = "Atividades | InteliTec CRM";

  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState('week'); // 'day', 'week', 'month'
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const [showForm, setShowForm] = useState(false);
  const [formPosition, setFormPosition] = useState({ top: 0, left: 0 });
  const [formData, setFormData] = useState(null);
  const formRef = useRef(null);

  // Toggle dropdown menu
  const toggle = () => setDropdownOpen(prev => !prev);

  // Close form when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        formRef.current &&
        !formRef.current.contains(e.target) &&
        !e.target.closest('.calendar-event') &&
        !e.target.closest('.dropdown-item') &&
        !e.target.closest('.calendar-weekly')
      ) {
        setShowForm(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Sample events
  // Navegação do calendário
  const handleGoToPrevious = () => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate);
      if (viewMode === 'week') {
        newDate.setDate(newDate.getDate() - 7);
      } else if (viewMode === 'day') {
        newDate.setDate(newDate.getDate() - 1);
      } else if (viewMode === 'month') {
        newDate.setMonth(newDate.getMonth() - 1);
      }
      return newDate;
    });
  };

  const handleGoToNext = () => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate);
      if (viewMode === 'week') {
        newDate.setDate(newDate.getDate() + 7);
      } else if (viewMode === 'day') {
        newDate.setDate(newDate.getDate() + 1);
      } else if (viewMode === 'month') {
        newDate.setMonth(newDate.getMonth() + 1);
      }
      return newDate;
    });
  };


  // Sample events
  const [events, setEvents] = useState([]);

  // Carrega dados do mock
  useEffect(() => {
    setEvents(mockActivities.map(activity => ({
      ...activity,
      start: new Date(activity.startDate),
      end: new Date(activity.endDate)
    })));
  }, []);

  // Check if an event exists at a specific slot
  const isEventAtTimeSlot = (date, hour, halfHour = false) => {
    const check = new Date(date);
    check.setHours(hour, halfHour ? 30 : 0, 0, 0);

    return events.filter(event => {
      const eventStart = new Date(event.startDate);
      const eventEnd = new Date(event.endDate);
      
      // Verifica se o evento ocorre exatamente neste horário
      return eventStart.getHours() === hour && 
             eventStart.getMinutes() === (halfHour ? 30 : 0) &&
             eventStart.getDate() === check.getDate() &&
             eventStart.getMonth() === check.getMonth() &&
             eventStart.getFullYear() === check.getFullYear();
    });
  };

  // Get events for a specific day (used in month view)
  const getEventsForDay = (date) => {
    const check = new Date(date);
    
    return events.filter(event => {
      const eventStart = new Date(event.startDate);
      return eventStart.getDate() === check.getDate() &&
             eventStart.getMonth() === check.getMonth() &&
             eventStart.getFullYear() === check.getFullYear();
    });
  };

  // Handle form input changes
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Open form on empty slot click
  const handleTimeSlotClick = (day, hour, half, evt) => {
    evt.stopPropagation();

    const rect = document.querySelector('.search-container')?.getBoundingClientRect() || evt.currentTarget.getBoundingClientRect();
    const scrollY = window.scrollY || window.pageYOffset;
    setFormPosition({ top: rect.bottom + scrollY + 10, left: rect.left });

    const start = new Date(day.date);
    start.setHours(hour, half ? 30 : 0);
    const end = new Date(start);
    end.setHours(end.getHours() + 1);

    setFormData({
      id: null,
      title: '',
      description: '',
      date: start.toISOString().split('T')[0],
      startTime: start.toTimeString().slice(0,5),
      endTime: end.toTimeString().slice(0,5),
      type: '',
      responsible: '',
      reminder: '',
      opportunity: '',
      company: '',
      person: '',
      participants: []
    });

    setShowForm(true);
  };

  // Open form on event click
  const handleEventClick = (event, domEvent) => {
    domEvent.stopPropagation();

    const rect = document.querySelector('.search-container')?.getBoundingClientRect() || domEvent.currentTarget.getBoundingClientRect();
    const scrollY = window.scrollY || window.pageYOffset;
    setFormPosition({ top: rect.bottom + scrollY + 10, left: rect.left });

    const start = new Date(event.start);
    const end = new Date(event.end);

    setFormData({
      id: event.id,
      title: event.title,
      description: event.description,
      date: start.toISOString().split('T')[0],
      startTime: start.toTimeString().slice(0,5),
      endTime: end.toTimeString().slice(0,5),
      type: event.type,
      responsible: '',
      reminder: '',
      opportunity: '',
      company: '',
      person: '',
      participants: []
    });

    setShowForm(true);
  };

  // Save or update event
  const saveActivity = () => {
    if (!formData) return;

    const { id, title, description, date, startTime, endTime, type } = formData;
    const start = new Date(`${date}T${startTime}`);
    const end = new Date(`${date}T${endTime}`);

    if (id) {
      setEvents(events.map(ev => ev.id === id ? { ...ev, title, description, start, end, type } : ev));
    } else {
      setEvents([...events, { id: Date.now(), title, description, start, end, type, status: 'Planejada' }]);
    }

    setShowForm(false);
  };

  // Create new activity from dropdown
  const handleCreateActivityType = (type) => {
    const rect = document.querySelector('.search-container')?.getBoundingClientRect() || document.querySelector('.page-content').getBoundingClientRect();
    const scrollY = window.scrollY || window.pageYOffset;
    setFormPosition({ top: rect.bottom + scrollY + 10, left: rect.left });

    const now = new Date();
    const start = now.toTimeString().slice(0,5);
    const end = new Date(now);
    end.setHours(now.getHours() + 1);

    setFormData({
      id: null,
      title: '',
      description: '',
      date: now.toISOString().split('T')[0],
      startTime: start,
      endTime: end.toTimeString().slice(0,5),
      type,
      responsible: '',
      reminder: '',
      opportunity: '',
      company: '',
      person: '',
      participants: []
    });

    setDropdownOpen(false);
    setShowForm(true);
  };

  // Check events across week slots
  const hasAnyEventInSlot = (hour, half) => getWeekDays(currentDate).some(d => isEventAtTimeSlot(d.date, hour, half).length);

  const weekDays = getWeekDays(currentDate);
  const timeSlots = getTimeSlots();

  return (
    <>
      <div className="page-content" style={{ backgroundColor: '#f8f9fa' }}>
        <Container fluid>
          <Row>
            <Col xs={12}>
              <Card className="shadow-sm" style={{ backgroundColor: '#ffffff' }}>
                <CardBody>
                  {/* Controls */}
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <div className="d-flex align-items-center">
                      <ButtonGroup className="me-3">
                        <Button color={viewMode === 'day' ? 'primary' : 'light'} size="sm" onClick={() => setViewMode('day')}>Dia</Button>
                        <Button color={viewMode === 'week' ? 'primary' : 'light'} size="sm" onClick={() => setViewMode('week')}>Semana</Button>
                        <Button color={viewMode === 'month' ? 'primary' : 'light'} size="sm" onClick={() => setViewMode('month')}>Mês</Button>
                      </ButtonGroup>
                      <div className="d-flex align-items-center">
                        <Button color="light" size="sm" onClick={handleGoToPrevious}>
                          <i className="bx bx-chevron-left"></i>
                        </Button>
                        <span className="mx-2 text-muted">{formatDateRange(currentDate, viewMode)}</span>
                        <Button color="light" size="sm" onClick={handleGoToNext}>
                          <i className="bx bx-chevron-right"></i>
                        </Button>
                      </div>
                    </div>
                    <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                      <DropdownToggle color="primary" size="sm" caret>
                        <i className="bx bx-plus me-1"></i> Adicionar Atividade
                      </DropdownToggle>
                      <DropdownMenu>
                        {['Reunião','Ligação','E-mail','Tarefa','Visita'].map(type => (
                          <DropdownItem key={type} onClick={() => handleCreateActivityType(type)}>{type}</DropdownItem>
                        ))}
                      </DropdownMenu>
                    </Dropdown>
                  </div>

                  {/* Quick filter */}
                  <div className="mb-4 d-flex">
                    <div className="search-box position-relative" style={{ maxWidth: '300px', width: '100%' }}>
                      <div className="position-relative">
                        <Input
                          type="text"
                          className="form-control"
                          placeholder="Buscar atividades..."
                          style={{
                            height: '36px',
                            paddingLeft: '38px',
                            paddingRight: '38px'
                          }}
                        />
                        <i className="bx bx-search-alt search-icon text-muted" style={{ fontSize: '1.2rem' }}></i>
                      </div>
                    </div>
                  </div>

                  {/* Day view */}
                  {viewMode === 'day' && (
                    <div className="calendar-day bg-white">
                      <div className="d-flex border-bottom" style={{ minWidth: '800px' }}>
                        <div style={{ width: '80px', backgroundColor: '#f8f9fa' }} />
                        <div className="flex-fill text-center py-2" style={{ backgroundColor: '#e9f7f0' }}>
                          <div className="text-muted">{currentDate.toLocaleDateString('pt-BR', { weekday: 'long' })}</div>
                          <div className={currentDate.toDateString() === new Date().toDateString() ? 'rounded-circle bg-success text-white' : ''} style={{ width: '30px', height: '30px', display: 'inline-flex', justifyContent: 'center', alignItems: 'center', marginTop: '2px' }}>
                            {currentDate.getDate()}
                          </div>
                        </div>
                      </div>
                      <div className="calendar-grid" style={{ minWidth: '800px', backgroundColor: '#ffffff' }}>
                        {timeSlots.map((slot, idx) => (
                          <div key={idx} className="d-flex border-bottom" style={{ height: hasAnyEventInSlot(slot.hour, slot.minute === 30) ? '140px' : '60px', transition: 'height 0.3s' }}>
                            <div className="time-indicator text-muted py-2 px-2" style={{ width: '80px', textAlign: 'right', backgroundColor: '#f8f9fa' }}>
                              {slot.label}
                            </div>
                            <div className="flex-fill position-relative border-start" onClick={e => handleTimeSlotClick(currentDate, slot.hour, slot.minute === 30, e)} style={{ cursor: 'pointer', backgroundColor: '#ffffff' }}>
                              {isEventAtTimeSlot(currentDate, slot.hour, slot.minute === 30).map(ev => (
                                <div key={ev.id} className="calendar-event position-absolute" style={{ top: '10px', margin: '0 6px', width: 'calc(100% - 12px)', height: '120px', backgroundColor: '#fff', borderRadius: '4px', borderLeft: '4px solid #4a6cf7', boxShadow: '0 1px 3px rgba(0,0,0,0.12)', overflow: 'hidden', cursor: 'pointer' }} onClick={e => handleEventClick(ev, e)}>
                                  <div className="p-2">
                                    <div className="d-flex justify-content-between align-items-center">
                                      <div className="badge bg-light text-dark" style={{ fontSize: '11px', padding: '2px 5px', borderRadius: '3px' }}>
                                        {ev.type}
                                      </div>
                                      <div className="badge bg-danger text-white" style={{ fontSize: '11px', padding: '2px 5px', borderRadius: '3px' }}>
                                        {ev.start.getHours().toString().padStart(2, '0')}:{ev.start.getMinutes().toString().padStart(2, '0')}
                                      </div>
                                    </div>
                                    <div className="text-truncate mt-1" style={{ fontSize: '13px', fontWeight: 'bold' }}>
                                      {ev.title}
                                    </div>
                                    <div style={{ fontSize: '12px', height: '40px', overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                                      {ev.description}
                                    </div>
                                    <div className="d-flex justify-content-between align-items-center mt-2">
                                      <div className="d-flex align-items-center text-muted small">
                                        <i className="bx bx-user me-1" style={{ fontSize: '10px' }}></i>
                                        <span style={{ fontSize: '10px' }}>Felipe</span>
                                      </div>
                                      <div className="d-flex align-items-center justify-content-center text-white" style={{ padding: '1px 6px', backgroundColor: '#4e67f8', borderRadius: '3px', fontSize: '11px' }}>
                                        <i className="bx bx-time me-1"></i>
                                        <strong>{ev.end.getHours() - ev.start.getHours()}</strong>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Weekly view */}
                  {viewMode === 'week' && (
                    <div className="calendar-weekly bg-white">
                      <div className="d-flex border-bottom" style={{ minWidth: '800px' }}>
                        <div style={{ width: '80px', backgroundColor: '#f8f9fa' }} />
                        {weekDays.map((d, i) => (
                          <div key={i} className="flex-fill text-center py-2" style={{ backgroundColor: d.isToday ? '#e9f7f0' : '#f8f9fa' }}>
                            <div className="text-muted">{d.dayName}</div>
                            <div className={d.isToday ? 'rounded-circle bg-success text-white' : ''} style={{ width: '30px', height: '30px', display: 'inline-flex', justifyContent: 'center', alignItems: 'center', marginTop: '2px' }}>
                              {d.dayNumber}
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="calendar-grid" style={{ minWidth: '800px', backgroundColor: '#ffffff' }}>
                        {timeSlots.map((slot, idx) => (
                          <div key={idx} className="d-flex border-bottom" style={{ height: hasAnyEventInSlot(slot.hour, slot.minute === 30) ? '140px' : '50px', transition: 'height 0.3s' }}>
                            <div className="time-indicator text-muted py-2 px-2" style={{ width: '80px', textAlign: 'right', backgroundColor: '#f8f9fa' }}>
                              {slot.label}
                            </div>
                            {weekDays.map((d, j) => (
                              <div key={j} className="flex-fill position-relative border-start" onClick={e => handleTimeSlotClick(d, slot.hour, slot.minute === 30, e)} style={{ cursor: 'pointer', backgroundColor: d.isToday ? '#f5f9ff' : '#ffffff' }}>
                                {isEventAtTimeSlot(d.date, slot.hour, slot.minute === 30).map(ev => (
                                  <div key={ev.id} className="calendar-event position-absolute" style={{ top: '10px', margin: '0 6px', width: 'calc(100% - 12px)', height: '120px', backgroundColor: '#fff', borderRadius: '4px', borderLeft: '4px solid #4a6cf7', boxShadow: '0 1px 3px rgba(0,0,0,0.12)', cursor: 'pointer' }} onClick={e => handleEventClick(ev, e)}>
                                  <div className="p-2">
                                    <div className="d-flex justify-content-between align-items-center">
                                      <div className="badge bg-light text-dark" style={{ fontSize: '11px', padding: '2px 5px', borderRadius: '3px' }}>
                                        {ev.type}
                                      </div>
                                      <div className="badge bg-danger text-white" style={{ fontSize: '11px', padding: '2px 5px', borderRadius: '3px' }}>
                                        {ev.start.getHours().toString().padStart(2, '0')}:{ev.start.getMinutes().toString().padStart(2, '0')}
                                      </div>
                                    </div>
                                    <div className="text-truncate mt-1" style={{ fontSize: '13px', fontWeight: 'bold' }}>
                                      {ev.title}
                                    </div>
                                    <div style={{ fontSize: '12px', height: '40px', overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                                      {ev.description}
                                    </div>
                                    <div className="d-flex justify-content-between align-items-center mt-2">
                                      <div className="d-flex align-items-center text-muted small">
                                        <i className="bx bx-user me-1" style={{ fontSize: '10px' }}></i>
                                        <span style={{ fontSize: '10px' }}>Felipe</span>
                                      </div>
                                      <div className="d-flex align-items-center justify-content-center text-white" style={{ padding: '1px 6px', backgroundColor: '#4e67f8', borderRadius: '3px', fontSize: '11px' }}>
                                        <i className="bx bx-time me-1"></i>
                                        <strong>{ev.end.getHours() - ev.start.getHours()}</strong>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                ))}
                              </div>
                            ))}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Month view */}
                  {viewMode === 'month' && (
                    <div className="calendar-month bg-white">
                      <div className="d-flex justify-content-center align-items-center py-2 border-bottom" style={{ backgroundColor: '#f8f9fa' }}>
                        <h5 className="m-0 text-dark">
                          {currentDate.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' }).charAt(0).toUpperCase() + 
                          currentDate.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' }).slice(1)}
                        </h5>
                      </div>
                      
                      <div className="d-flex border-bottom" style={{ minWidth: '800px' }}>
                        {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((dayName, index) => (
                          <div key={index} className="flex-fill text-center py-2" style={{ backgroundColor: '#f8f9fa' }}>
                            <div className="text-muted">{dayName}</div>
                          </div>
                        ))}
                      </div>

                      <div className="calendar-month-grid" style={{ minWidth: '800px' }}>
                        <div className="d-flex flex-wrap">
                          {/* Primeiro dia do mês */}
                          {Array.from({ length: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay() }, (_, i) => (
                            <div key={`empty-${i}`} className="calendar-day-cell position-relative border" style={{ 
                              width: 'calc(100% / 7)', 
                              height: '120px',
                              backgroundColor: '#f8f9fa'
                            }} />
                          ))}
                          
                          {/* Dias do mês */}
                          {Array.from({ length: new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate() }, (_, i) => {
                            const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), i + 1);
                            const dayEvents = getEventsForDay(date).length;
                            
                            return (
                              <div key={i} className="calendar-day-cell position-relative border" style={{ 
                                width: 'calc(100% / 7)', 
                                height: '120px',
                                backgroundColor: '#ffffff',
                                cursor: 'pointer'
                              }} onClick={() => {
                                setCurrentDate(date);
                                setViewMode('day');
                              }}>
                                <div className="p-2">
                                  <div className="d-flex justify-content-between align-items-center">
                                    <div className={`day-number ${date.toDateString() === new Date().toDateString() ? 'rounded-circle bg-success text-white' : ''}`} style={{ 
                                      width: '24px', 
                                      height: '24px', 
                                      display: 'inline-flex', 
                                      justifyContent: 'center', 
                                      alignItems: 'center',
                                      fontWeight: 'normal',
                                      color: '#333'
                                    }}>
                                      {date.getDate()}
                                    </div>
                                    
                                    {dayEvents > 0 && (
                                      <div className="event-count">
                                        <span className="badge rounded-pill bg-primary" style={{ fontSize: '9px' }}>
                                          {dayEvents}
                                        </span>
                                        <div className="events-list" style={{ marginTop: '5px' }}>
                                          {getEventsForDay(date).map((ev, idx) => (
                                            <div key={idx} className="event-item" style={{ 
                                              backgroundColor: '#f8f9fa',
                                              padding: '2px 5px',
                                              borderRadius: '3px',
                                              fontSize: '10px',
                                              color: '#666'
                                            }}>
                                              {ev.title}
                                            </div>
                                          ))}
                                        </div>
                                      </div>
                                    )}
                                  </div>
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
        </Container>

        {/* Activity Form */}
        <ActivityForm
          show={showForm}
          formData={formData}
          onFormChange={handleFormChange}
          onSave={saveActivity}
          onClose={() => setShowForm(false)}
          t={t}
        />


      </div>
    </>
  );
};

export default withTranslation()(Activities);



