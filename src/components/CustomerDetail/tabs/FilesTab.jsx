import React, { useState, useRef } from "react";
import { Card, CardBody, Button, Input, FormGroup, Label, Table, Progress, Badge } from "reactstrap";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FilesTab = ({ customer }) => {
  // Referência para o input de arquivo oculto
  const fileInputRef = useRef(null);
  
  // Estado para armazenar arquivos
  const [files, setFiles] = useState([
    {
      id: 1,
      name: "Proposta_Comercial_v1.pdf",
      type: "application/pdf",
      size: "1.2 MB",
      uploadDate: "15/04/2025",
      uploadedBy: "Felipe Macedo",
      category: "Proposta"
    },
    {
      id: 2,
      name: "Contrato_Preliminar.docx",
      type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      size: "847 KB",
      uploadDate: "16/04/2025",
      uploadedBy: "Maria Silva",
      category: "Contrato"
    },
    {
      id: 3,
      name: "Apresentacao_Servicos.pptx",
      type: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
      size: "3.5 MB",
      uploadDate: "16/04/2025",
      uploadedBy: "Felipe Macedo",
      category: "Apresentação"
    },
    {
      id: 4,
      name: "Logo_Cliente.png",
      type: "image/png",
      size: "450 KB",
      uploadDate: "17/04/2025",
      uploadedBy: "Felipe Macedo",
      category: "Imagem"
    }
  ]);

  // Estado para armazenar arquivos sendo carregados
  const [uploading, setUploading] = useState([]);
  
  // Estado para filtro de arquivos
  const [searchTerm, setSearchTerm] = useState("");

  // Função para abrir o seletor de arquivos
  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  // Função para lidar com a seleção de arquivos
  const handleFileSelect = (e) => {
    const selectedFiles = Array.from(e.target.files);
    
    if (selectedFiles.length === 0) return;
    
    // Criar objetos de upload em progresso
    const uploadsInProgress = selectedFiles.map(file => ({
      id: Date.now() + Math.random().toString(36).substring(7),
      file: file,
      name: file.name,
      type: file.type,
      size: formatFileSize(file.size),
      progress: 0,
      uploadDate: new Date().toLocaleDateString('pt-BR'),
      uploadedBy: "Felipe Macedo", // Usuário atual (hardcoded para o exemplo)
      category: getCategoryFromFileType(file.type)
    }));
    
    setUploading([...uploading, ...uploadsInProgress]);
    
    // Simular o progresso de upload para cada arquivo
    uploadsInProgress.forEach(upload => {
      simulateUpload(upload);
    });
    
    // Limpar o input de arquivo para permitir selecionar os mesmos arquivos novamente
    e.target.value = null;
  };

  // Função para simular o upload de um arquivo
  const simulateUpload = (uploadItem) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 10) + 5; // Incremento aleatório entre 5 e 15
      
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        
        // Após o "upload" ser concluído, adicionar à lista de arquivos
        setTimeout(() => {
          setUploading(current => 
            current.filter(item => item.id !== uploadItem.id)
          );
          
          setFiles(current => [
            {
              id: Date.now(),
              name: uploadItem.name,
              type: uploadItem.file.type,
              size: uploadItem.size,
              uploadDate: new Date().toLocaleDateString('pt-BR'),
              uploadedBy: "Felipe Macedo",
              category: getCategoryFromFileType(uploadItem.file.type)
            },
            ...current
          ]);
          
          toast.success(`Arquivo ${uploadItem.name} enviado com sucesso!`);
        }, 500);
      }
      
      // Atualizar o progresso no estado
      setUploading(current => 
        current.map(item => 
          item.id === uploadItem.id 
            ? { ...item, progress } 
            : item
        )
      );
    }, 300);
  };

  // Função para formatar o tamanho do arquivo
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Função para determinar a categoria com base no tipo de arquivo
  const getCategoryFromFileType = (fileType) => {
    if (fileType.includes('image')) return 'Imagem';
    if (fileType.includes('pdf')) return 'Documento';
    if (fileType.includes('word')) return 'Documento';
    if (fileType.includes('excel') || fileType.includes('spreadsheet')) return 'Planilha';
    if (fileType.includes('presentation')) return 'Apresentação';
    if (fileType.includes('video')) return 'Vídeo';
    if (fileType.includes('audio')) return 'Áudio';
    return 'Outro';
  };

  // Função para excluir um arquivo
  const deleteFile = (id) => {
    if (window.confirm('Tem certeza que deseja excluir este arquivo?')) {
      setFiles(files.filter(file => file.id !== id));
      toast.success('Arquivo excluído com sucesso!');
    }
  };

  // Função para cancelar um upload em andamento
  const cancelUpload = (id) => {
    setUploading(uploading.filter(item => item.id !== id));
    toast.info('Upload cancelado');
  };

  // Função para baixar um arquivo (simulado)
  const downloadFile = (file) => {
    toast.info(`Baixando ${file.name}...`);
    // Em uma implementação real, você faria uma requisição para baixar o arquivo
  };

  // Filtrar arquivos com base na busca
  const filteredFiles = files.filter(file => 
    file.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    file.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    file.uploadedBy.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Função para renderizar o ícone adequado para o tipo de arquivo
  const renderFileIcon = (fileType) => {
    if (fileType.includes('image')) return <i className="mdi mdi-file-image text-info h3 mb-0"></i>;
    if (fileType.includes('pdf')) return <i className="mdi mdi-file-pdf text-danger h3 mb-0"></i>;
    if (fileType.includes('word')) return <i className="mdi mdi-file-word text-primary h3 mb-0"></i>;
    if (fileType.includes('excel') || fileType.includes('spreadsheet')) return <i className="mdi mdi-file-excel text-success h3 mb-0"></i>;
    if (fileType.includes('presentation')) return <i className="mdi mdi-file-powerpoint text-warning h3 mb-0"></i>;
    if (fileType.includes('video')) return <i className="mdi mdi-file-video text-danger h3 mb-0"></i>;
    if (fileType.includes('audio')) return <i className="mdi mdi-file-music text-success h3 mb-0"></i>;
    return <i className="mdi mdi-file text-muted h3 mb-0"></i>;
  };

  return (
    <div className="files-container">
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div className="d-flex align-items-center">
          <i className="mdi mdi-file-document-outline me-2 h3 mb-0 text-muted"></i>
          <h5 className="mb-0">Arquivos</h5>
        </div>
        <div className="d-flex gap-2">
          <Input
            type="file"
            multiple
            hidden
            ref={fileInputRef}
            onChange={handleFileSelect}
          />
          <Button color="success" onClick={triggerFileInput}>
            <i className="mdi mdi-upload me-1"></i>
            Enviar Arquivos
          </Button>
        </div>
      </div>

      {/* Área de pesquisa */}
      <div className="d-flex mb-4">
        <Input
          type="text"
          placeholder="Buscar por nome, categoria ou responsável..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="me-2"
        />
        <Button color="primary" outline>
          <i className="mdi mdi-magnify"></i>
        </Button>
      </div>

      {/* Arquivos em upload */}
      {uploading.length > 0 && (
        <Card className="mb-4">
          <CardBody>
            <h6 className="mb-3">Uploads em andamento ({uploading.length})</h6>
            {uploading.map(item => (
              <div key={item.id} className="mb-3">
                <div className="d-flex justify-content-between align-items-center mb-1">
                  <div>
                    <span className="me-2">{renderFileIcon(item.type)}</span>
                    <span>{item.name}</span>
                  </div>
                  <Button color="danger" size="sm" onClick={() => cancelUpload(item.id)}>
                    <i className="mdi mdi-close"></i>
                  </Button>
                </div>
                <Progress value={item.progress} className="mb-1" />
                <small className="text-muted">{item.progress}% concluído • {item.size}</small>
              </div>
            ))}
          </CardBody>
        </Card>
      )}

      {/* Lista de arquivos */}
      <Card>
        <CardBody>
          {filteredFiles.length === 0 ? (
            <div className="text-center py-5">
              <i className="mdi mdi-file-outline text-muted display-4"></i>
              <p className="text-muted mt-2">Nenhum arquivo encontrado. Envie novos arquivos usando o botão acima.</p>
            </div>
          ) : (
            <div className="table-responsive">
              <Table className="table-striped table-hover">
                <thead>
                  <tr>
                    <th style={{ width: "40%" }}>Nome</th>
                    <th style={{ width: "15%" }}>Categoria</th>
                    <th style={{ width: "10%" }}>Tamanho</th>
                    <th style={{ width: "15%" }}>Data</th>
                    <th style={{ width: "15%" }}>Responsável</th>
                    <th style={{ width: "5%" }}>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredFiles.map(file => (
                    <tr key={file.id}>
                      <td>
                        <div className="d-flex align-items-center">
                          {renderFileIcon(file.type)}
                          <span className="ms-2">{file.name}</span>
                        </div>
                      </td>
                      <td>
                        <Badge color="info" className="bg-light text-dark">
                          {file.category}
                        </Badge>
                      </td>
                      <td>{file.size}</td>
                      <td>{file.uploadDate}</td>
                      <td>{file.uploadedBy}</td>
                      <td>
                        <div className="d-flex">
                          <Button color="link" className="p-0 me-2" title="Baixar" onClick={() => downloadFile(file)}>
                            <i className="mdi mdi-download text-primary"></i>
                          </Button>
                          <Button color="link" className="p-0" title="Excluir" onClick={() => deleteFile(file.id)}>
                            <i className="mdi mdi-delete text-danger"></i>
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          )}
        </CardBody>
      </Card>

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

export default FilesTab; 