import React, { useState, useEffect } from "react";
import { Card, CardBody, CardHeader, Button, Input, FormGroup, Label, Row, Col, Alert } from "reactstrap";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ContractTab = ({ customer }) => {
  // Dados de exemplo para contratos
  const existingContractData = {
    id: 1,
    contractNumber: "CONT-2025-001",
    contractType: "Prestação de Serviços",
    status: "Rascunho",
    version: "1.0",
    createdAt: "17/04/2025",
    updatedAt: "18/04/2025",
    client: {
      name: "CEZAR AUGUSTO GEHM FILHO",
      company: "CRM PipeRun",
      documentType: "CPF",
      documentNumber: "123.456.789-00",
      address: "Rua Exemplo, 123",
      city: "Porto Alegre",
      state: "RS",
      zipCode: "90000-000",
      phone: "(51) 98765-4321",
      email: "cezar@example.com"
    },
    provider: {
      name: "InteliTec Sistemas Ltda",
      documentType: "CNPJ",
      documentNumber: "08.692.236/0001-48",
      address: "Av. Tecnologia, 456",
      city: "Porto Alegre",
      state: "RS",
      zipCode: "91000-000",
      phone: "(51) 3333-4444",
      email: "contato@intelitec.com.br",
      representative: "Felipe Macedo"
    },
    contract: {
      object: "Fornecimento de sistema de CRM e automação de vendas",
      value: "7.200,00",
      paymentTerms: "Pagamento mensal de R$ 600,00 pelo período de 12 meses",
      startDate: "01/05/2025",
      endDate: "30/04/2026",
      duration: "12 meses",
      renewalTerms: "Renovação automática por períodos iguais e sucessivos, caso não haja manifestação em contrário",
      cancellationTerms: "Mediante aviso prévio de 30 dias",
      confidentiality: "As partes se comprometem a manter sigilo sobre todas as informações", 
      additionalClauses: [
        "Treinamento inicial de 4 horas incluído",
        "Suporte técnico disponível em horário comercial",
        "Backup diário de dados"
      ]
    }
  };

  // Estado para armazenar os dados do contrato
  const [contractData, setContractData] = useState(null);
  
  // Estado para controlar se estamos editando ou visualizando
  const [isEditing, setIsEditing] = useState(false);
  
  // Estado para armazenar cláusulas adicionais temporárias
  const [newClause, setNewClause] = useState("");

  // Inicializar os dados do contrato
  useEffect(() => {
    // Em um cenário real, você verificaria se já existe contrato para este cliente
    if (existingContractData) {
      setContractData(existingContractData);
    } else {
      // Se não existir, criar um modelo padrão com os dados básicos do cliente
      setContractData({
        contractNumber: `CONT-${new Date().getFullYear()}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
        contractType: "Prestação de Serviços",
        status: "Rascunho",
        version: "1.0",
        createdAt: new Date().toLocaleDateString('pt-BR'),
        updatedAt: new Date().toLocaleDateString('pt-BR'),
        client: {
          name: customer?.name || "",
          company: customer?.company || "",
          documentType: "CPF",
          documentNumber: customer?.documentNumber || "",
          address: customer?.address || "",
          city: customer?.city || "",
          state: customer?.state || "",
          zipCode: customer?.zipCode || "",
          phone: customer?.phone || "",
          email: customer?.email || ""
        },
        provider: {
          name: "InteliTec Sistemas Ltda",
          documentType: "CNPJ",
          documentNumber: "08.692.236/0001-48",
          address: "Av. Tecnologia, 456",
          city: "Porto Alegre",
          state: "RS",
          zipCode: "91000-000",
          phone: "(51) 3333-4444",
          email: "contato@intelitec.com.br",
          representative: "Felipe Macedo"
        },
        contract: {
          object: "",
          value: "",
          paymentTerms: "",
          startDate: "",
          endDate: "",
          duration: "",
          renewalTerms: "Renovação automática por períodos iguais e sucessivos, caso não haja manifestação em contrário",
          cancellationTerms: "Mediante aviso prévio de 30 dias",
          confidentiality: "As partes se comprometem a manter sigilo sobre todas as informações",
          additionalClauses: []
        }
      });
      
      // Como é um novo contrato, entrar automaticamente no modo de edição
      setIsEditing(true);
    }
  }, [customer]);

  // Função para alternar entre visualização e edição
  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  // Função para atualizar os dados do cliente no contrato
  const updateClientData = (field, value) => {
    setContractData({
      ...contractData,
      client: {
        ...contractData.client,
        [field]: value
      }
    });
  };

  // Função para atualizar os dados do contrato
  const updateContractData = (field, value) => {
    setContractData({
      ...contractData,
      contract: {
        ...contractData.contract,
        [field]: value
      }
    });
  };

  // Função para adicionar uma nova cláusula adicional
  const addClause = () => {
    if (!newClause.trim()) return;
    
    const updatedClauses = [...contractData.contract.additionalClauses, newClause];
    updateContractData("additionalClauses", updatedClauses);
    setNewClause("");
  };

  // Função para remover uma cláusula adicional
  const removeClause = (index) => {
    const updatedClauses = [...contractData.contract.additionalClauses];
    updatedClauses.splice(index, 1);
    updateContractData("additionalClauses", updatedClauses);
  };

  // Função para salvar o contrato
  const saveContract = () => {
    // Atualizar a data de modificação
    setContractData({
      ...contractData,
      updatedAt: new Date().toLocaleDateString('pt-BR')
    });
    
    // Em um cenário real, você enviaria os dados para o backend
    toast.success("Contrato salvo com sucesso!");
    setIsEditing(false);
  };

  // Função para gerar o PDF do contrato
  const generateContractPDF = () => {
    toast.info("Gerando PDF do contrato...");
    // Em um cenário real, você faria uma requisição para gerar o PDF
    setTimeout(() => {
      toast.success("PDF do contrato gerado com sucesso!");
    }, 1500);
  };

  // Renderizar o componente
  if (!contractData) {
    return <div className="text-center p-5">Carregando dados do contrato...</div>;
  }

  return (
    <div className="contract-container">
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div className="d-flex align-items-center">
          <i className="mdi mdi-file-document-outline me-2 h3 mb-0 text-muted"></i>
          <h5 className="mb-0">Dados para Contrato</h5>
        </div>
        <div className="d-flex gap-2">
          {isEditing ? (
            <>
              <Button color="secondary" onClick={toggleEditing}>
                Cancelar
              </Button>
              <Button color="success" onClick={saveContract}>
                <i className="mdi mdi-content-save me-1"></i>
                Salvar
              </Button>
            </>
          ) : (
            <>
              <Button color="success" onClick={toggleEditing}>
                <i className="mdi mdi-pencil me-1"></i>
                Editar
              </Button>
              <Button color="success" onClick={generateContractPDF}>
                <i className="mdi mdi-file-pdf-box me-1"></i>
                Gerar PDF
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Informações do Contrato */}
      <Card className="mb-4">
        <CardHeader className="bg-light">
          <h6 className="mb-0">Informações do Contrato</h6>
        </CardHeader>
        <CardBody>
          <Row>
            <Col md={3} className="mb-3">
              <FormGroup>
                <Label>Número do Contrato</Label>
                <Input 
                  type="text" 
                  value={contractData.contractNumber}
                  disabled
                />
              </FormGroup>
            </Col>
            <Col md={3} className="mb-3">
              <FormGroup>
                <Label>Tipo de Contrato</Label>
                <Input
                  type="select"
                  value={contractData.contractType}
                  onChange={(e) => setContractData({...contractData, contractType: e.target.value})}
                  disabled={!isEditing}
                >
                  <option>Prestação de Serviços</option>
                  <option>Licenciamento de Software</option>
                  <option>Consultoria</option>
                  <option>Desenvolvimento de Software</option>
                </Input>
              </FormGroup>
            </Col>
            <Col md={3} className="mb-3">
              <FormGroup>
                <Label>Status</Label>
                <Input
                  type="select"
                  value={contractData.status}
                  onChange={(e) => setContractData({...contractData, status: e.target.value})}
                  disabled={!isEditing}
                >
                  <option>Rascunho</option>
                  <option>Em Revisão</option>
                  <option>Enviado</option>
                  <option>Assinado</option>
                  <option>Cancelado</option>
                </Input>
              </FormGroup>
            </Col>
            <Col md={3} className="mb-3">
              <FormGroup>
                <Label>Versão</Label>
                <Input 
                  type="text" 
                  value={contractData.version}
                  disabled
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={6} className="mb-3">
              <FormGroup>
                <Label>Data de Criação</Label>
                <Input 
                  type="text" 
                  value={contractData.createdAt}
                  disabled
                />
              </FormGroup>
            </Col>
            <Col md={6} className="mb-3">
              <FormGroup>
                <Label>Última Atualização</Label>
                <Input 
                  type="text" 
                  value={contractData.updatedAt}
                  disabled
                />
              </FormGroup>
            </Col>
          </Row>
        </CardBody>
      </Card>

      {/* Dados do Cliente */}
      <Card className="mb-4">
        <CardHeader className="bg-light">
          <h6 className="mb-0">Dados do Cliente</h6>
        </CardHeader>
        <CardBody>
          <Row>
            <Col md={6} className="mb-3">
              <FormGroup>
                <Label>Nome</Label>
                <Input 
                  type="text" 
                  value={contractData.client.name}
                  onChange={(e) => updateClientData("name", e.target.value)}
                  disabled={!isEditing}
                />
              </FormGroup>
            </Col>
            <Col md={6} className="mb-3">
              <FormGroup>
                <Label>Empresa</Label>
                <Input 
                  type="text" 
                  value={contractData.client.company}
                  onChange={(e) => updateClientData("company", e.target.value)}
                  disabled={!isEditing}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={3} className="mb-3">
              <FormGroup>
                <Label>Tipo de Documento</Label>
                <Input
                  type="select"
                  value={contractData.client.documentType}
                  onChange={(e) => updateClientData("documentType", e.target.value)}
                  disabled={!isEditing}
                >
                  <option>CPF</option>
                  <option>CNPJ</option>
                  <option>RG</option>
                </Input>
              </FormGroup>
            </Col>
            <Col md={3} className="mb-3">
              <FormGroup>
                <Label>Número do Documento</Label>
                <Input 
                  type="text" 
                  value={contractData.client.documentNumber}
                  onChange={(e) => updateClientData("documentNumber", e.target.value)}
                  disabled={!isEditing}
                />
              </FormGroup>
            </Col>
            <Col md={3} className="mb-3">
              <FormGroup>
                <Label>Telefone</Label>
                <Input 
                  type="text" 
                  value={contractData.client.phone}
                  onChange={(e) => updateClientData("phone", e.target.value)}
                  disabled={!isEditing}
                />
              </FormGroup>
            </Col>
            <Col md={3} className="mb-3">
              <FormGroup>
                <Label>E-mail</Label>
                <Input 
                  type="email" 
                  value={contractData.client.email}
                  onChange={(e) => updateClientData("email", e.target.value)}
                  disabled={!isEditing}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={6} className="mb-3">
              <FormGroup>
                <Label>Endereço</Label>
                <Input 
                  type="text" 
                  value={contractData.client.address}
                  onChange={(e) => updateClientData("address", e.target.value)}
                  disabled={!isEditing}
                />
              </FormGroup>
            </Col>
            <Col md={2} className="mb-3">
              <FormGroup>
                <Label>Cidade</Label>
                <Input 
                  type="text" 
                  value={contractData.client.city}
                  onChange={(e) => updateClientData("city", e.target.value)}
                  disabled={!isEditing}
                />
              </FormGroup>
            </Col>
            <Col md={2} className="mb-3">
              <FormGroup>
                <Label>Estado</Label>
                <Input 
                  type="text" 
                  value={contractData.client.state}
                  onChange={(e) => updateClientData("state", e.target.value)}
                  disabled={!isEditing}
                />
              </FormGroup>
            </Col>
            <Col md={2} className="mb-3">
              <FormGroup>
                <Label>CEP</Label>
                <Input 
                  type="text" 
                  value={contractData.client.zipCode}
                  onChange={(e) => updateClientData("zipCode", e.target.value)}
                  disabled={!isEditing}
                />
              </FormGroup>
            </Col>
          </Row>
        </CardBody>
      </Card>

      {/* Dados do Contrato */}
      <Card className="mb-4">
        <CardHeader className="bg-light">
          <h6 className="mb-0">Detalhes do Contrato</h6>
        </CardHeader>
        <CardBody>
          <Row>
            <Col md={12} className="mb-3">
              <FormGroup>
                <Label>Objeto do Contrato</Label>
                <Input 
                  type="textarea" 
                  rows={3}
                  value={contractData.contract.object}
                  onChange={(e) => updateContractData("object", e.target.value)}
                  disabled={!isEditing}
                  placeholder="Descreva o objeto do contrato"
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={4} className="mb-3">
              <FormGroup>
                <Label>Valor</Label>
                <Input 
                  type="text" 
                  value={contractData.contract.value}
                  onChange={(e) => updateContractData("value", e.target.value)}
                  disabled={!isEditing}
                  placeholder="Ex: 10.000,00"
                />
              </FormGroup>
            </Col>
            <Col md={8} className="mb-3">
              <FormGroup>
                <Label>Termos de Pagamento</Label>
                <Input 
                  type="text" 
                  value={contractData.contract.paymentTerms}
                  onChange={(e) => updateContractData("paymentTerms", e.target.value)}
                  disabled={!isEditing}
                  placeholder="Ex: Pagamento mensal de R$ 1.000,00 pelo período de 10 meses"
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={3} className="mb-3">
              <FormGroup>
                <Label>Data de Início</Label>
                <Input 
                  type="date" 
                  value={contractData.contract.startDate ? contractData.contract.startDate.split('/').reverse().join('-') : ''}
                  onChange={(e) => {
                    const date = e.target.value ? new Date(e.target.value).toLocaleDateString('pt-BR') : '';
                    updateContractData("startDate", date);
                  }}
                  disabled={!isEditing}
                />
              </FormGroup>
            </Col>
            <Col md={3} className="mb-3">
              <FormGroup>
                <Label>Data de Término</Label>
                <Input 
                  type="date" 
                  value={contractData.contract.endDate ? contractData.contract.endDate.split('/').reverse().join('-') : ''}
                  onChange={(e) => {
                    const date = e.target.value ? new Date(e.target.value).toLocaleDateString('pt-BR') : '';
                    updateContractData("endDate", date);
                  }}
                  disabled={!isEditing}
                />
              </FormGroup>
            </Col>
            <Col md={6} className="mb-3">
              <FormGroup>
                <Label>Duração</Label>
                <Input 
                  type="text" 
                  value={contractData.contract.duration}
                  onChange={(e) => updateContractData("duration", e.target.value)}
                  disabled={!isEditing}
                  placeholder="Ex: 12 meses"
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={6} className="mb-3">
              <FormGroup>
                <Label>Termos de Renovação</Label>
                <Input 
                  type="textarea" 
                  rows={2}
                  value={contractData.contract.renewalTerms}
                  onChange={(e) => updateContractData("renewalTerms", e.target.value)}
                  disabled={!isEditing}
                />
              </FormGroup>
            </Col>
            <Col md={6} className="mb-3">
              <FormGroup>
                <Label>Termos de Cancelamento</Label>
                <Input 
                  type="textarea" 
                  rows={2}
                  value={contractData.contract.cancellationTerms}
                  onChange={(e) => updateContractData("cancellationTerms", e.target.value)}
                  disabled={!isEditing}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={12} className="mb-3">
              <FormGroup>
                <Label>Cláusula de Confidencialidade</Label>
                <Input 
                  type="textarea" 
                  rows={2}
                  value={contractData.contract.confidentiality}
                  onChange={(e) => updateContractData("confidentiality", e.target.value)}
                  disabled={!isEditing}
                />
              </FormGroup>
            </Col>
          </Row>
        </CardBody>
      </Card>

      {/* Cláusulas Adicionais */}
      <Card className="mb-4">
        <CardHeader className="bg-light">
          <h6 className="mb-0">Cláusulas Adicionais</h6>
        </CardHeader>
        <CardBody>
          {contractData.contract.additionalClauses.length === 0 ? (
            <Alert color="info" className="mb-3">
              Nenhuma cláusula adicional definida.
            </Alert>
          ) : (
            <ul className="list-group mb-3">
              {contractData.contract.additionalClauses.map((clause, index) => (
                <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                  {clause}
                  {isEditing && (
                    <Button close onClick={() => removeClause(index)} />
                  )}
                </li>
              ))}
            </ul>
          )}

          {isEditing && (
            <div className="d-flex gap-2">
              <Input 
                type="text" 
                placeholder="Nova cláusula adicional" 
                value={newClause}
                onChange={(e) => setNewClause(e.target.value)}
                className="flex-grow-1"
              />
              <Button color="success" onClick={addClause}>
                Adicionar
              </Button>
            </div>
          )}
        </CardBody>
      </Card>

      {/* Visualização de Contrato */}
      <Card className="mb-4">
        <CardHeader className="bg-light">
          <h6 className="mb-0">Prévia do Contrato</h6>
        </CardHeader>
        <CardBody>
          <div className="contract-preview p-3 border rounded mb-3">
            <h5 className="text-center mb-4">CONTRATO DE {contractData.contractType.toUpperCase()}</h5>
            
            <p><strong>Contrato nº:</strong> {contractData.contractNumber}</p>
            
            <p className="mb-4">
              Pelo presente instrumento particular, de um lado <strong>{contractData.provider.name}</strong>, 
              inscrita no {contractData.provider.documentType} sob o nº {contractData.provider.documentNumber}, 
              situada na {contractData.provider.address}, {contractData.provider.city} - {contractData.provider.state}, 
              CEP {contractData.provider.zipCode}, neste ato representada por {contractData.provider.representative}, 
              doravante denominada <strong>CONTRATADA</strong>, e de outro lado <strong>{contractData.client.name}</strong>, 
              {contractData.client.company ? ` representando ${contractData.client.company},` : ''} 
              inscrito no {contractData.client.documentType} sob o nº {contractData.client.documentNumber}, 
              residente e domiciliado na {contractData.client.address}, {contractData.client.city} - {contractData.client.state}, 
              CEP {contractData.client.zipCode}, doravante denominado <strong>CONTRATANTE</strong>, têm entre si justo e 
              contratado o seguinte:
            </p>
            
            <p className="mb-3"><strong>CLÁUSULA PRIMEIRA - DO OBJETO</strong></p>
            <p className="mb-4">{contractData.contract.object}</p>
            
            <p className="mb-3"><strong>CLÁUSULA SEGUNDA - DO PREÇO E PAGAMENTO</strong></p>
            <p className="mb-4">O valor total deste contrato é de R$ {contractData.contract.value}, a ser pago da seguinte forma: {contractData.contract.paymentTerms}.</p>
            
            <p className="mb-3"><strong>CLÁUSULA TERCEIRA - DO PRAZO</strong></p>
            <p className="mb-4">
              O presente contrato terá inicio em {contractData.contract.startDate} e término em {contractData.contract.endDate}, 
              com duração de {contractData.contract.duration}.
            </p>
            
            <p className="mb-3"><strong>CLÁUSULA QUARTA - DA RENOVAÇÃO</strong></p>
            <p className="mb-4">{contractData.contract.renewalTerms}</p>
            
            <p className="mb-3"><strong>CLÁUSULA QUINTA - DA RESCISÃO</strong></p>
            <p className="mb-4">{contractData.contract.cancellationTerms}</p>
            
            <p className="mb-3"><strong>CLÁUSULA SEXTA - DA CONFIDENCIALIDADE</strong></p>
            <p className="mb-4">{contractData.contract.confidentiality}</p>
            
            {contractData.contract.additionalClauses.length > 0 && (
              <>
                <p className="mb-3"><strong>CLÁUSULAS ADICIONAIS</strong></p>
                <ol className="mb-4">
                  {contractData.contract.additionalClauses.map((clause, index) => (
                    <li key={index} className="mb-2">{clause}</li>
                  ))}
                </ol>
              </>
            )}
            
            <p className="mb-4">
              E por estarem assim justas e contratadas, as partes assinam o presente instrumento em 2 (duas) vias de igual 
              teor e forma, na presença das testemunhas abaixo assinadas.
            </p>
            
            <div className="row mt-5 mb-5">
              <div className="col-5 text-center">
                <p className="border-top pt-2">{contractData.provider.name}<br/>CONTRATADA</p>
              </div>
              <div className="col-2"></div>
              <div className="col-5 text-center">
                <p className="border-top pt-2">{contractData.client.name}<br/>CONTRATANTE</p>
              </div>
            </div>
            
            <p className="text-center">{contractData.provider.city}, {new Date().toLocaleDateString('pt-BR')}</p>
          </div>
          
          <p className="text-center mb-0">
            <Button color="success" onClick={generateContractPDF}>
              <i className="mdi mdi-file-pdf-box me-1"></i>
              Gerar PDF do Contrato
            </Button>
          </p>
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

export default ContractTab; 