/**
 * Utilitários para buscar e validar dados de CNPJ e CEP
 */

/**
 * Formata o CNPJ para o padrão XX.XXX.XXX/XXXX-XX
 * @param {string} cnpj - CNPJ sem formatação
 * @returns {string} CNPJ formatado
 */
export const formatCNPJ = (cnpj) => {
  if (!cnpj) return '';
  
  // Remove caracteres não numéricos
  const numericCNPJ = cnpj.replace(/\D/g, '');
  
  // Aplica a formatação
  return numericCNPJ.replace(
    /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
    '$1.$2.$3/$4-$5'
  );
};

/**
 * Formata o CEP para o padrão XXXXX-XXX
 * @param {string} cep - CEP sem formatação
 * @returns {string} CEP formatado
 */
export const formatCEP = (cep) => {
  if (!cep) return '';
  
  // Remove caracteres não numéricos
  const numericCEP = cep.replace(/\D/g, '');
  
  // Aplica a formatação
  return numericCEP.replace(/^(\d{5})(\d{3})$/, '$1-$2');
};

/**
 * Valida se o CNPJ está no formato correto
 * @param {string} cnpj - CNPJ com ou sem formatação
 * @returns {boolean} true se válido, false caso contrário
 */
export const validateCNPJ = (cnpj) => {
  if (!cnpj) return false;

  // Remove caracteres não numéricos
  const numericCNPJ = cnpj.replace(/\D/g, '');
  
  // Verifica se tem 14 dígitos
  if (numericCNPJ.length !== 14) return false;
  
  // Verifica se todos os dígitos são iguais (CNPJ inválido)
  if (/^(\d)\1+$/.test(numericCNPJ)) return false;
  
  // Validação do dígito verificador
  let tamanho = numericCNPJ.length - 2;
  let numeros = numericCNPJ.substring(0, tamanho);
  const digitos = numericCNPJ.substring(tamanho);
  let soma = 0;
  let pos = tamanho - 7;
  
  // Validação do primeiro dígito
  for (let i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--;
    if (pos < 2) pos = 9;
  }
  
  let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  if (resultado !== parseInt(digitos.charAt(0), 10)) return false;
  
  // Validação do segundo dígito
  tamanho = tamanho + 1;
  numeros = numericCNPJ.substring(0, tamanho);
  soma = 0;
  pos = tamanho - 7;
  
  for (let i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--;
    if (pos < 2) pos = 9;
  }
  
  resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  if (resultado !== parseInt(digitos.charAt(1), 10)) return false;
  
  return true;
};

/**
 * Valida se o CEP está no formato correto
 * @param {string} cep - CEP com ou sem formatação
 * @returns {boolean} true se válido, false caso contrário
 */
export const validateCEP = (cep) => {
  if (!cep) return false;
  
  // Remove caracteres não numéricos
  const numericCEP = cep.replace(/\D/g, '');
  
  // Verifica se tem 8 dígitos
  return numericCEP.length === 8;
};

/**
 * Busca informações da empresa com base no CNPJ
 * @param {string} cnpj - CNPJ com ou sem formatação
 * @returns {Promise} Promise com os dados da empresa
 */
export const fetchCompanyByCNPJ = async (cnpj) => {
  try {
    // Remove caracteres não numéricos para a consulta
    const numericCNPJ = cnpj.replace(/\D/g, '');
    
    console.log('CNPJ sendo consultado:', cnpj);
    console.log('CNPJ formatado para consulta:', numericCNPJ);
    
    if (!validateCNPJ(numericCNPJ)) {
      console.log('CNPJ inválido na validação estrutural');
      throw new Error('CNPJ inválido');
    }

    // Usando API pública para buscar dados de CNPJ
    console.log('Consultando API:', `https://brasilapi.com.br/api/cnpj/v1/${numericCNPJ}`);
    const response = await fetch(`https://brasilapi.com.br/api/cnpj/v1/${numericCNPJ}`);
    
    console.log('Status da resposta API:', response.status);
    
    if (!response.ok) {
      throw new Error('CNPJ não encontrado na base de dados pública. Empresas novas podem ainda não estar cadastradas.');
    }
    
    const data = await response.json();
    console.log('Dados retornados da API:', JSON.stringify(data).substring(0, 100) + '...');
    
    // Formatando os dados retornados para o formato esperado pela aplicação
    return {
      nome: data.razao_social,
      nomeFantasia: data.nome_fantasia || data.razao_social,
      email: '',
      telefone: data.ddd_telefone_1 || '',
      endereco: {
        logradouro: data.logradouro || '',
        numero: data.numero || '',
        complemento: data.complemento || '',
        bairro: data.bairro || '',
        cidade: data.municipio || '',
        estado: data.uf || '',
        cep: data.cep || ''
      },
      atividade: data.cnae_fiscal_descricao || '',
      dataAbertura: data.data_inicio_atividade || ''
    };
  } catch (error) {
    console.error('Erro ao buscar CNPJ:', error);
    throw error;
  }
};

/**
 * Busca informações de endereço com base no CEP
 * @param {string} cep - CEP com ou sem formatação
 * @returns {Promise} Promise com os dados do endereço
 */
export const fetchAddressByCEP = async (cep) => {
  try {
    // Remove caracteres não numéricos para a consulta
    const numericCEP = cep.replace(/\D/g, '');
    
    if (!validateCEP(numericCEP)) {
      throw new Error('CEP inválido');
    }
    
    // Usando API pública para buscar dados de CEP (para desenvolvimento)
    const response = await fetch(`https://viacep.com.br/ws/${numericCEP}/json/`);
    
    if (!response.ok) {
      throw new Error('Falha ao buscar dados do CEP');
    }
    
    const data = await response.json();
    
    if (data.erro) {
      throw new Error('CEP não encontrado');
    }
    
    return {
      logradouro: data.logradouro || '',
      bairro: data.bairro || '',
      cidade: data.localidade || '',
      estado: data.uf || '',
      cep: numericCEP,
      complemento: data.complemento || ''
    };
  } catch (error) {
    console.error('Erro ao buscar CEP:', error);
    throw error;
  }
}; 