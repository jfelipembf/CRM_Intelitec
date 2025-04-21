import React from 'react';

const NotFound = () => {
  return (
    <div className="d-flex align-items-center justify-content-center" style={{ height: "100vh" }}>
      <div className="text-center">
        <h1 className="display-1 fw-bold">404</h1>
        <p className="fs-3">
          <span className="text-danger">Ops!</span> Página não encontrada.
        </p>
        <p className="lead">A página que você está procurando não existe.</p>
        <a href="/" className="btn btn-primary">Voltar ao início</a>
      </div>
    </div>
  );
};

export default NotFound;
