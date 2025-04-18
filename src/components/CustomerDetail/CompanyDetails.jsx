import React from "react";
import { Card, CardBody, CardHeader } from "reactstrap";

const CompanyDetails = ({ companyData }) => {
  // Dados de exemplo caso não sejam fornecidos
  const company = companyData || {
    name: "CRM PipeRun",
    isClient: false,
    corporateName: "ODIG - SOLUCOES DIGITAIS LTDA",
    cnpj: "08.692.236/0001-48",
    situation: "Lead",
    sector: "Serviços",
    segment: "Serviços",
    city: "Porto Alegre",
    state: "RS",
    website: "https://crmpiperun.com/",
    phones: [
      {
        number: "+55 (51) 4063-9792",
        type: "Principal"
      },
      {
        number: "+55 (51) 4063-9792",
        type: "Principal"
      }
    ],
    emails: [
      "adm@odig.net",
      "adm@odig.net"
    ]
  };

  return (
    <Card className="mb-4 shadow-sm" style={{ fontSize: "0.85rem" }}>
      <CardHeader className="bg-light d-flex justify-content-between align-items-center py-1 px-3">
        <div className="d-flex align-items-center">
          <i className="mdi mdi-domain me-1 text-muted" style={{ fontSize: "0.9rem" }}></i>
          <h5 className="mb-0 text-muted" style={{ fontSize: "0.9rem" }}>Empresa</h5>
        </div>
        <div>
          <button className="btn btn-sm btn-link p-0 me-2" style={{ lineHeight: 1 }}>
            <i className="mdi mdi-eye-outline text-muted" style={{ fontSize: "0.8rem" }}></i>
          </button>
          <button className="btn btn-sm btn-link p-0 me-2" style={{ lineHeight: 1 }}>
            <i className="mdi mdi-pencil text-muted" style={{ fontSize: "0.8rem" }}></i>
          </button>
          <button className="btn btn-sm btn-link p-0" style={{ lineHeight: 1 }}>
            <i className="mdi mdi-chevron-up text-muted" style={{ fontSize: "0.8rem" }}></i>
          </button>
        </div>
      </CardHeader>
      <CardBody className="px-3 py-2">
        <div className="details-list" style={{ display: "grid", rowGap: "6px" }}>
          <DetailItem 
            label="Nome" 
            value={
              <>
                <span style={{ color: "#4285f4", fontWeight: "500" }}>{company.name}</span>
                {!company.isClient && 
                  <div className="text-muted small mt-1">Não é cliente</div>
                }
              </>
            }
          />
          <DetailItem 
            label="Razão social" 
            value={company.corporateName}
          />
          <DetailItem 
            label="CNPJ" 
            value={company.cnpj}
          />
          <DetailItem 
            label="Situação da empresa" 
            value={company.situation}
          />
          <DetailItem 
            label="Setor" 
            value={company.sector}
          />
          <DetailItem 
            label="Segmento" 
            value={company.segment}
          />
          <DetailItem 
            label="Cidade (UF)" 
            value={`${company.city} (${company.state})`} 
          />
          <DetailItem 
            label="Website" 
            value={
              <a href={company.website} target="_blank" rel="noopener noreferrer" 
                 style={{ color: "#4285f4", textDecoration: "none" }}>
                {company.website}
              </a>
            } 
          />
          <DetailItem 
            label="Telefones" 
            value={
              <div className="d-grid" style={{ rowGap: "4px" }}>
                {company.phones.map((phone, index) => (
                  <div key={index} className="d-flex align-items-center">
                    <i className="mdi mdi-phone me-1 text-muted small"></i>
                    <a href={`tel:${phone.number.replace(/\D/g, '')}`} style={{ color: "#4285f4", textDecoration: "none" }}>
                      {phone.number}
                    </a>
                    <span className="ms-1 text-muted small">({phone.type})</span>
                  </div>
                ))}
              </div>
            } 
          />
          <DetailItem 
            label="E-mails" 
            value={
              <div className="d-grid" style={{ rowGap: "4px" }}>
                {company.emails.map((email, index) => (
                  <div key={index}>
                    <a href={`mailto:${email}`} style={{ color: "#4285f4", textDecoration: "none" }}>
                      {email}
                    </a>
                  </div>
                ))}
              </div>
            }
          />
        </div>
      </CardBody>
    </Card>
  );
};

// Componente auxiliar para cada item de detalhe com espaçamento reduzido
const DetailItem = ({ label, value, valueStyle = {} }) => {
  return (
    <div className="py-1">
      <div className="text-muted" style={{ fontSize: "0.75rem", lineHeight: "1.1", marginBottom: "1px" }}>
        {label}
      </div>
      <div style={{ fontSize: "0.85rem", fontWeight: "400", lineHeight: "1.2", ...valueStyle }}>
        {value}
      </div>
    </div>
  );
};

export default CompanyDetails; 