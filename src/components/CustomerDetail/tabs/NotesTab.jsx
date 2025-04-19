import React, { useState } from "react";
import { Card, CardBody, Button, Input, Form, Table, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NotesTab = ({ customer }) => {
  const [noteContent, setNoteContent] = useState("");
  const [notes, setNotes] = useState([
    {
      id: 1,
      content: "Cliente demonstrou interesse em nossos serviços premium.",
      date: "15/04/2025 17:30",
      user: "Felipe Macedo"
    },
    {
      id: 2,
      content: "Cliente solicitou detalhes sobre preços e prazos de entrega.",
      date: "16/04/2025 09:45",
      user: "Maria Silva"
    },
    {
      id: 3,
      content: "Esclarecer cláusulas 3 e 4 do contrato padrão na próxima ligação.",
      date: "17/04/2025 14:20",
      user: "Felipe Macedo"
    }
  ]);

  // Estados para o modal de confirmação de exclusão
  const [deleteModal, setDeleteModal] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState(null);
  
  // Estado para controlar edição
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // Adicionar ou atualizar nota
  const saveNote = () => {
    if (!noteContent.trim()) return;
    
    if (isEditing && editingNoteId) {
      // Atualizar nota existente
      const updatedNotes = notes.map(note => 
        note.id === editingNoteId 
          ? {...note, content: noteContent}
          : note
      );
      setNotes(updatedNotes);
      toast.success("Nota atualizada com sucesso!");
      setIsEditing(false);
      setEditingNoteId(null);
    } else {
      // Adicionar nova nota
      const newNote = {
        id: Date.now(),
        content: noteContent,
        date: new Date().toLocaleString('pt-BR', { 
          day: '2-digit', 
          month: '2-digit', 
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }),
        user: "Felipe Macedo" // Usuário atual (hardcoded para exemplo)
      };
      
      setNotes([newNote, ...notes]);
      toast.success("Nota adicionada com sucesso!");
    }
    
    setNoteContent("");
  };

  // Abrir modal de exclusão
  const openDeleteModal = (note) => {
    setNoteToDelete(note);
    setDeleteModal(true);
  };

  // Fechar modal de exclusão
  const closeDeleteModal = () => {
    setNoteToDelete(null);
    setDeleteModal(false);
  };

  // Confirmar exclusão
  const confirmDelete = () => {
    if (noteToDelete) {
      setNotes(notes.filter(note => note.id !== noteToDelete.id));
      toast.success("Nota excluída com sucesso!");
      closeDeleteModal();
    }
  };

  // Iniciar edição de nota
  const startEditing = (note) => {
    setNoteContent(note.content);
    setEditingNoteId(note.id);
    setIsEditing(true);
    // Rolar para cima, para o campo de edição
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cancelar edição
  const cancelEditing = () => {
    setNoteContent("");
    setEditingNoteId(null);
    setIsEditing(false);
  };

  // Aplicar formato ao texto
  const applyFormat = (command, value = null) => {
    document.execCommand(command, false, value);
    // Focar de volta no editor após aplicar o formato
    document.getElementById('noteEditor').focus();
  };

  return (
    <div className="notes-container">
      <div className="d-flex align-items-center mb-4">
        <i className="mdi mdi-note-text-outline me-2 h3 mb-0 text-muted"></i>
        <h5 className="mb-0">Notas</h5>
      </div>

      {/* Adicionar/Editar nota */}
      <div className="mb-4">
        <Card>
          <CardBody>
            <h6 className="mb-3">{isEditing ? "Editar Nota" : "Nova Nota"}</h6>
            <Form className="note-form">
              {/* Barra de ferramentas de formatação estilo imagem */}
              <div className="text-editor-toolbar border rounded bg-white mb-2">
                <div className="d-flex flex-wrap">
                  {/* Botões de estilo de texto */}
                  <button 
                    type="button" 
                    className="btn border-end border-bottom-0 border-top-0 rounded-0 py-2 px-3" 
                    onClick={() => applyFormat('bold')}
                    title="Negrito"
                  >
                    <span style={{ fontWeight: "bold" }}>B</span>
                  </button>
                  <button 
                    type="button" 
                    className="btn border-end border-bottom-0 border-top-0 rounded-0 py-2 px-3" 
                    onClick={() => applyFormat('italic')}
                    title="Itálico"
                  >
                    <span style={{ fontStyle: "italic" }}>I</span>
                  </button>
                  <button 
                    type="button" 
                    className="btn border-end border-bottom-0 border-top-0 rounded-0 py-2 px-3" 
                    onClick={() => applyFormat('underline')}
                    title="Sublinhado"
                  >
                    <span style={{ textDecoration: "underline" }}>U</span>
                  </button>
                  <button 
                    type="button" 
                    className="btn border-end border-bottom-0 border-top-0 rounded-0 py-2 px-3" 
                    onClick={() => applyFormat('strikethrough')}
                    title="Tachado"
                  >
                    <span style={{ textDecoration: "line-through" }}>S</span>
                  </button>
                  
                  {/* Tamanho de fonte */}
                  <div className="dropdown border-end border-bottom-0 border-top-0">
                    <button 
                      type="button" 
                      className="btn dropdown-toggle rounded-0 py-2 px-3" 
                      data-bs-toggle="dropdown" 
                      title="Tamanho da fonte"
                    >
                      13<i className="mdi mdi-chevron-down ms-1"></i>
                    </button>
                    <ul className="dropdown-menu">
                      <li><button className="dropdown-item" onClick={() => applyFormat('fontSize', '1')}>Pequeno</button></li>
                      <li><button className="dropdown-item" onClick={() => applyFormat('fontSize', '3')}>Normal</button></li>
                      <li><button className="dropdown-item" onClick={() => applyFormat('fontSize', '5')}>Grande</button></li>
                      <li><button className="dropdown-item" onClick={() => applyFormat('fontSize', '7')}>Muito Grande</button></li>
                    </ul>
                  </div>
                  
                  {/* Link */}
                  <button 
                    type="button" 
                    className="btn border-end border-bottom-0 border-top-0 rounded-0 py-2 px-3" 
                    onClick={() => applyFormat('createLink', prompt('Insira o URL:'))}
                    title="Inserir link"
                  >
                    <i className="mdi mdi-link-variant"></i>
                  </button>
                  
                  {/* Listas */}
                  <button 
                    type="button" 
                    className="btn border-end border-bottom-0 border-top-0 rounded-0 py-2 px-3" 
                    onClick={() => applyFormat('insertUnorderedList')}
                    title="Lista com marcadores"
                  >
                    <i className="mdi mdi-format-list-bulleted"></i>
                  </button>
                  <button 
                    type="button" 
                    className="btn border-end border-bottom-0 border-top-0 rounded-0 py-2 px-3" 
                    onClick={() => applyFormat('insertOrderedList')}
                    title="Lista numerada"
                  >
                    <i className="mdi mdi-format-list-numbered"></i>
                  </button>
                  
                  {/* Alinhamento */}
                  <div className="dropdown border-end border-bottom-0 border-top-0">
                    <button 
                      type="button" 
                      className="btn dropdown-toggle rounded-0 py-2 px-3" 
                      data-bs-toggle="dropdown" 
                      title="Alinhamento"
                    >
                      <i className="mdi mdi-format-align-left"></i><i className="mdi mdi-chevron-down ms-1"></i>
                    </button>
                    <ul className="dropdown-menu">
                      <li><button className="dropdown-item" onClick={() => applyFormat('justifyLeft')}><i className="mdi mdi-format-align-left me-2"></i>Esquerda</button></li>
                      <li><button className="dropdown-item" onClick={() => applyFormat('justifyCenter')}><i className="mdi mdi-format-align-center me-2"></i>Centro</button></li>
                      <li><button className="dropdown-item" onClick={() => applyFormat('justifyRight')}><i className="mdi mdi-format-align-right me-2"></i>Direita</button></li>
                      <li><button className="dropdown-item" onClick={() => applyFormat('justifyFull')}><i className="mdi mdi-format-align-justify me-2"></i>Justificado</button></li>
                    </ul>
                  </div>
                  
                  {/* Título */}
                  <div className="dropdown border-end border-bottom-0 border-top-0">
                    <button 
                      type="button" 
                      className="btn dropdown-toggle rounded-0 py-2 px-3" 
                      data-bs-toggle="dropdown" 
                      title="Estilo de texto"
                    >
                      T<i className="mdi mdi-chevron-down ms-1"></i>
                    </button>
                    <ul className="dropdown-menu">
                      <li><button className="dropdown-item" onClick={() => applyFormat('formatBlock', 'h1')}>Título 1</button></li>
                      <li><button className="dropdown-item" onClick={() => applyFormat('formatBlock', 'h2')}>Título 2</button></li>
                      <li><button className="dropdown-item" onClick={() => applyFormat('formatBlock', 'h3')}>Título 3</button></li>
                      <li><button className="dropdown-item" onClick={() => applyFormat('formatBlock', 'p')}>Parágrafo</button></li>
                    </ul>
                  </div>
                  
                  {/* Link estendido */}
                  <button 
                    type="button" 
                    className="btn border-end border-bottom-0 border-top-0 rounded-0 py-2 px-3" 
                    onClick={() => applyFormat('unlink')}
                    title="Remover link"
                  >
                    <i className="mdi mdi-link-variant-off"></i>
                  </button>
                  
                  {/* Imagem */}
                  <button 
                    type="button" 
                    className="btn border-end border-bottom-0 border-top-0 rounded-0 py-2 px-3" 
                    onClick={() => applyFormat('insertImage', prompt('Insira o URL da imagem:'))}
                    title="Inserir imagem"
                  >
                    <i className="mdi mdi-image-outline"></i>
                  </button>
                  
                  {/* Gravação de voz */}
                  <button 
                    type="button" 
                    className="btn border-end border-bottom-0 border-top-0 rounded-0 py-2 px-3" 
                    title="Gravação de voz (não implementado)"
                  >
                    <i className="mdi mdi-microphone"></i>
                  </button>
                  
                  {/* Menção */}
                  <button 
                    type="button" 
                    className="btn border-bottom-0 border-top-0 rounded-0 py-2 px-3" 
                    title="Mencionar usuário (não implementado)"
                  >
                    <i className="mdi mdi-at"></i>
                  </button>
                </div>
              </div>

              {/* Editor de texto rico */}
              <div 
                id="noteEditor"
                className="form-control mb-3" 
                style={{ 
                  minHeight: '150px', 
                  maxHeight: '300px', 
                  overflowY: 'auto',
                  padding: '10px'
                }}
                contentEditable="true"
                dangerouslySetInnerHTML={{ __html: noteContent }}
                onInput={(e) => setNoteContent(e.currentTarget.innerHTML)}
              />

              <div className="d-flex justify-content-end gap-2">
                <Button 
                  color="secondary" 
                  onClick={isEditing ? cancelEditing : () => setNoteContent("")} 
                  className="me-2"
                >
                  <i className="mdi mdi-close me-1"></i> 
                  {isEditing ? "Cancelar" : "Limpar"}
                </Button>
                <Button color="success" onClick={saveNote}>
                  <i className="mdi mdi-content-save me-1"></i> 
                  {isEditing ? "Atualizar" : "Salvar"}
                </Button>
              </div>

              {!isEditing && (
                <div className="mt-3">
                  <div className="form-check form-check-inline">
                    <Input 
                      className="form-check-input" 
                      type="checkbox" 
                      id="addToPersonCheckbox"
                    />
                    <label className="form-check-label" htmlFor="addToPersonCheckbox">
                      Adicionar nota também em pessoa
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <Input 
                      className="form-check-input" 
                      type="checkbox" 
                      id="addToCompanyCheckbox"
                    />
                    <label className="form-check-label" htmlFor="addToCompanyCheckbox">
                      Adicionar nota também em empresa
                    </label>
                  </div>
                </div>
              )}
            </Form>
          </CardBody>
        </Card>
      </div>

      {/* Lista de notas em formato de tabela */}
      <div className="notes-table">
        <h6 className="mb-3">Notas Cadastradas</h6>
        {notes.length === 0 ? (
          <div className="text-center p-4 bg-light rounded">
            <p className="mb-0 text-muted">Nenhuma nota cadastrada.</p>
          </div>
        ) : (
          <Card>
            <CardBody>
              <div className="table-responsive">
                <Table className="table-striped table-hover">
                  <thead>
                    <tr>
                      <th style={{ width: "60%" }}>Conteúdo</th>
                      <th style={{ width: "15%" }}>Data</th>
                      <th style={{ width: "15%" }}>Usuário</th>
                      <th style={{ width: "10%" }}>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {notes.map(note => (
                      <tr key={note.id}>
                        <td dangerouslySetInnerHTML={{ __html: note.content }}></td>
                        <td>{note.date}</td>
                        <td>{note.user}</td>
                        <td>
                          <div className="d-flex">
                            <Button color="link" className="p-0 me-2" title="Editar" onClick={() => startEditing(note)}>
                              <i className="mdi mdi-pencil text-primary"></i>
                            </Button>
                            <Button color="link" className="p-0" title="Excluir" onClick={() => openDeleteModal(note)}>
                              <i className="mdi mdi-delete text-danger"></i>
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </CardBody>
          </Card>
        )}
      </div>

      {/* Modal de confirmação de exclusão */}
      <Modal isOpen={deleteModal} toggle={closeDeleteModal}>
        <ModalHeader toggle={closeDeleteModal}>Confirmar Exclusão</ModalHeader>
        <ModalBody>
          Tem certeza que deseja excluir esta nota?
          {noteToDelete && (
            <div className="mt-3 p-3 bg-light rounded">
              <div dangerouslySetInnerHTML={{ __html: noteToDelete.content }}></div>
            </div>
          )}
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={closeDeleteModal}>Cancelar</Button>
          <Button color="danger" onClick={confirmDelete}>Excluir</Button>
        </ModalFooter>
      </Modal>

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

export default NotesTab; 