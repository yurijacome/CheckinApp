import { API_BASE_URL } from "@/services/api";
import { validateEditUser, validateRegister} from "@/utils/validators";

// Pegar usuarios
export const getUsers = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return []; // Return an empty array on error
  }
};

// Pegar usuario especifico
export const getUser = async (userId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

// Adicionar usuario
export const addUser = async (user) => {

      const errorMessage = validateRegister(
        user.email,
        user.nome,
        user.senha
      );
  
      if (errorMessage) {
        alert(errorMessage);
        return;
  }
  
  try {
    const response = await fetch(`${API_BASE_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

// Editar usuario
export const editUser = async (userId, changes) => {

  const errorMessage = validateEditUser( changes );
  if (errorMessage) {
    alert(errorMessage);
    return;
  }
  
  try {
    const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(changes),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

// Mudar senha
export const changePassword = async (userId, currentPassword, newPassword) => {
  try {
    const response = await fetch(`${API_BASE_URL}/user/${userId}/password`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ currentPassword, newPassword }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Erro ao alterar senha");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Deletar usuario
export const deleteUser = async (userId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};
