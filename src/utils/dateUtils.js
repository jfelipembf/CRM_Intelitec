// Função para formatar a data no formato "DD de MMM de YYYY"
export const formatDateRange = (currentDate, viewMode) => {
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
export const goToPrevious = (currentDate, viewMode) => {
  const newDate = new Date(currentDate);
  if (viewMode === 'week') {
    newDate.setDate(newDate.getDate() - 7);
  } else if (viewMode === 'day') {
    newDate.setDate(newDate.getDate() - 1);
  } else if (viewMode === 'month') {
    newDate.setMonth(newDate.getMonth() - 1);
  }
  return newDate;
};

// Função para navegar para semana seguinte
export const goToNext = (currentDate, viewMode) => {
  const newDate = new Date(currentDate);
  if (viewMode === 'week') {
    newDate.setDate(newDate.getDate() + 7);
  } else if (viewMode === 'day') {
    newDate.setDate(newDate.getDate() + 1);
  } else if (viewMode === 'month') {
    newDate.setMonth(newDate.getMonth() + 1);
  }
  return newDate;
};

// Função para voltar para a data atual
export const goToToday = () => {
  return new Date();
};

// Gerar os dias da semana atual
export const getWeekDays = (currentDate) => {
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
export const getTimeSlots = () => {
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