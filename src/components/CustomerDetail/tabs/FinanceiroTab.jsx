import React, { useState } from "react";
import { 
  Card, 
  CardBody, 
  CardHeader, 
  Table, 
  Badge, 
  Row, 
  Col, 
  Button,
  Progress
} from "reactstrap";

const FinanceiroTab = ({ customer }) => {
  // Dados de exemplo do contrato atual
  const [contrato, setContrato] = useState({
    numero: "CONT-2025-001",
    tipo: "Prestação de Serviços",
    valorTotal: "7.200,00",
    valorPago: "1.800,00",
    valorRestante: "5.400,00",
    formaPagamento: "Mensal",
    parcelasTotal: 12,
    parcelasPagas: 3,
    parcelasRestantes: 9,
    dataInicio: "01/05/2025",
    dataTermino: "30/04/2026",
    status: "Ativo"
  });

  // Dados de exemplo dos pagamentos
  const [pagamentos, setPagamentos] = useState([
    {
      id: 1,
      parcela: 1,
      dataVencimento: "01/05/2025",
      dataPagamento: "01/05/2025",
      valor: "600,00",
      status: "Pago",
      metodo: "Cartão de Crédito",
      comprovante: "https://exemplo.com/comprovante1.pdf"
    },
    {
      id: 2,
      parcela: 2,
      dataVencimento: "01/06/2025",
      dataPagamento: "01/06/2025",
      valor: "600,00",
      status: "Pago",
      metodo: "Pix",
      comprovante: "https://exemplo.com/comprovante2.pdf"
    },
    {
      id: 3,
      parcela: 3,
      dataVencimento: "01/07/2025",
      dataPagamento: "01/07/2025",
      valor: "600,00",
      status: "Pago",
      metodo: "Transferência Bancária",
      comprovante: "https://exemplo.com/comprovante3.pdf"
    },
    {
      id: 4,
      parcela: 4,
      dataVencimento: "01/08/2025",
      dataPagamento: null,
      valor: "600,00",
      status: "Pendente",
      metodo: null,
      comprovante: null
    },
    {
      id: 5,
      parcela: 5,
      dataVencimento: "01/09/2025",
      dataPagamento: null,
      valor: "600,00",
      status: "Pendente",
      metodo: null,
      comprovante: null
    },
    {
      id: 6,
      parcela: 6,
      dataVencimento: "01/10/2025",
      dataPagamento: null,
      valor: "600,00",
      status: "Pendente",
      metodo: null,
      comprovante: null
    }
  ]);

  // Função para obter a cor do status
  const getStatusBadgeColor = (status) => {
    switch (status) {
      case "Pago": return "success";
      case "Pendente": return "warning";
      case "Atrasado": return "danger";
      case "Ativo": return "success";
      default: return "secondary";
    }
  };

  // Função para calcular a porcentagem paga
  const calculaPorcentagemPaga = () => {
    return (contrato.parcelasPagas / contrato.parcelasTotal) * 100;
  };
  
  return (
    <div className="financeiro-container">
      {/* Título da aba com ícone */}
      <div className="d-flex align-items-center mb-4">
        <i className="mdi mdi-cash-multiple me-2 h3 mb-0 text-muted"></i>
        <h5 className="mb-0">Financeiro</h5>
      </div>
      
      {/* Resumo financeiro do contrato */}
      <Card className="mb-4">
        <CardHeader className="bg-light">
          <div className="d-flex justify-content-between align-items-center">
            <h6 className="mb-0">Resumo Financeiro - Contrato {contrato.numero}</h6>
            <Badge color={getStatusBadgeColor(contrato.status)} pill>
              {contrato.status}
            </Badge>
          </div>
        </CardHeader>
        <CardBody>
          <Row>
            <Col md={6} className="mb-3">
              <h6 className="text-secondary">Valor Total</h6>
              <h4>R$ {contrato.valorTotal}</h4>
            </Col>
            <Col md={6} className="mb-3">
              <h6 className="text-secondary">Status do Pagamento</h6>
              <div className="d-flex justify-content-between mb-1">
                <span>R$ {contrato.valorPago} pago de R$ {contrato.valorTotal}</span>
                <span>{calculaPorcentagemPaga().toFixed(0)}%</span>
              </div>
              <Progress
                className="mb-3"
                value={calculaPorcentagemPaga()}
                style={{ height: "10px" }}
                color="success"
              />
              <div className="d-flex justify-content-between">
                <span className="text-muted">{contrato.parcelasPagas} de {contrato.parcelasTotal} parcelas pagas</span>
                <span className="text-success">R$ {contrato.valorRestante} restantes</span>
              </div>
            </Col>
          </Row>
          
          <Row className="mt-2">
            <Col md={4} className="mb-3">
              <h6 className="text-secondary">Forma de Pagamento</h6>
              <p>{contrato.formaPagamento}</p>
            </Col>
            <Col md={4} className="mb-3">
              <h6 className="text-secondary">Data de Início</h6>
              <p>{contrato.dataInicio}</p>
            </Col>
            <Col md={4} className="mb-3">
              <h6 className="text-secondary">Data de Término</h6>
              <p>{contrato.dataTermino}</p>
            </Col>
          </Row>
        </CardBody>
      </Card>

      {/* Lista de Pagamentos */}
      <div className="mb-4">
        <h6 className="mb-3">Histórico de Pagamentos</h6>
        <Card>
          <CardHeader className="bg-light">
            <div className="d-flex justify-content-between align-items-center">
              <h6 className="mb-0">Pagamentos</h6>
              <Button color="success" size="sm">
                <i className="mdi mdi-plus me-1"></i>
                Registrar Pagamento
              </Button>
            </div>
          </CardHeader>
          <CardBody>
            <div className="table-responsive">
              <Table className="table-striped table-hover">
                <thead>
                  <tr>
                    <th>Parcela</th>
                    <th>Vencimento</th>
                    <th>Pagamento</th>
                    <th>Valor</th>
                    <th>Status</th>
                    <th>Método</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {pagamentos.map(pagamento => (
                    <tr key={pagamento.id}>
                      <td>{pagamento.parcela}/{contrato.parcelasTotal}</td>
                      <td>{pagamento.dataVencimento}</td>
                      <td>{pagamento.dataPagamento || "-"}</td>
                      <td>R$ {pagamento.valor}</td>
                      <td>
                        <Badge color={getStatusBadgeColor(pagamento.status)}>
                          {pagamento.status}
                        </Badge>
                      </td>
                      <td>{pagamento.metodo || "-"}</td>
                      <td>
                        <div className="d-flex">
                          {pagamento.status === "Pago" && (
                            <Button color="link" className="p-0 me-2" title="Ver Comprovante">
                              <i className="mdi mdi-file-document-outline text-primary"></i>
                            </Button>
                          )}
                          {pagamento.status !== "Pago" && (
                            <Button color="link" className="p-0 me-2" title="Registrar Pagamento">
                              <i className="mdi mdi-currency-usd text-success"></i>
                            </Button>
                          )}
                          <Button color="link" className="p-0" title="Mais Opções">
                            <i className="mdi mdi-dots-vertical text-secondary"></i>
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
      </div>
    </div>
  );
};

export default FinanceiroTab; 