import { API_BASE_URL } from "@/services/api";

export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
};

export const validateRegister = (email, nome, password) => {
  if (!email.trim()) {
    return "Email obrigatório";
  }
  // if (!isValidEmail(email)) {
  //   return "Digite um email válido";
  // }
  if (!nome.trim() || nome.trim().split(/\s+/).length < 2) {
    return "Digite um nome e sobrenome (mínimo duas palavras)";
  }
  if (!password.trim()) {
    return "Digite uma senha";
  }
  if (password.length < 4) {
    return "A senha deve ter pelo menos 4 caracteres";
  }
  return null; // sem erros
};

export const validateEditUser = (changes) => {
  if (!changes.email?.trim()) {
    return "Digite um email";
  }
  if (!changes.nome?.trim() || changes.nome.trim().split(/\s+/).length < 2) {
    return "Digite pelo menos um sobrenome ";
  }
  if (
    changes.phone?.trim() &&
    ![10, 11].includes(changes.phone.trim().length)
  ) {
    return "O telefone deve ter exatamente 10 ou 11 caracteres";
  }

  return null; // sem erros
};

export const validateLogin = (email, password) => {
  if (!email.trim()) {
    return "Digite seu email";
  }
  if (!password.trim()) {
    return "Digite sua senha";
  }
  //   if (password.length < 6) {
  //     return "A senha deve ter pelo menos 6 caracteres";
  //   }
  return null; // sem erros
};


/**
 * Validação assíncrona para verificar se email ou nome já existem no backend
 * @param {string} field - "email" ou "nome"
 * @param {string} value - valor a ser verificado
 * @returns {boolean} - true se já existe, false se não existe
 */
export const checkIfExists = async (field, value) => {
  try {
    const response = await fetch(`${API_BASE_URL}/check-user`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ field, value }),
    });
    const data = await response.json();
    return data.exists || false;
  } catch (err) {
    console.error("Erro ao verificar existência:", err);
    return false; // em caso de erro, não bloqueia o usuário
  }
};
