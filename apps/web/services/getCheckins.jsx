import { API_BASE_URL } from "@/services/api";

// Pegar todos os checkins
export const getCheckins = async (turmaId = null) => {
  try {
    const url = turmaId
      ? `${API_BASE_URL}/checkins?turma_id=${turmaId}`
      : `${API_BASE_URL}/checkins`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Erro ao buscar checkins");
    }
    return await response.json();
  } catch (error) {
    console.error("Erro ao buscar checkins:", error);
    throw error;
  }
};

// Pegar checkins de um usuário
export const getCheckinsByUser = async (userId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/checkins/user/${userId}`);
    if (!response.ok) {
      throw new Error("Erro ao buscar checkins do usuário");
    }
    return await response.json();
  } catch (error) {
    console.error("Erro ao buscar checkins do usuário:", error);
    throw error;
  }
};

// User Criar checkin
export const CreateCheckin = async (checkinData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/checkin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(checkinData),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Erro ao criar checkin");
    }
    return await response.json();
  } catch (error) {
    console.error("Erro ao criar checkin:", error);
    throw error;
  }
};

// ADM Confirmar checkin
export const ConfirmCheckin = async (checkinId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/checkins/${checkinId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ checkinstatus: "Confirmado" }),
    });
    if (!response.ok) throw new Error("Erro ao confirmar checkin");
    return await response.json();
  } catch (error) {
    console.error("Erro ao confirmar checkin:", error);
    throw error;
  }
};

// Delete Checkin
export const DeleteCheckin = async (checkinId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/checkins/${checkinId}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Erro ao deletar checkin");
    return await response.json();
  } catch (error) {
    console.error("Erro ao deletar checkin:", error);
    throw error;
  }
};

// Cancelar checkin
export const CancelCheckin = async (checkinId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/checkins/${checkinId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ checkinstatus: "Cancelado" }),
    });
    if (!response.ok) throw new Error("Erro ao cancelar checkin");
    return await response.json();
  } catch (error) {
    console.error("Erro ao cancelar checkin:", error);
    throw error;
  }
};

// Solicitar checkin cancelado
export const RedeployCheckin = async (checkinId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/checkins/${checkinId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ checkinstatus: "Solicitado" }),
    });
    if (!response.ok) throw new Error("Erro ao solicitar checkin");
    return await response.json();
  } catch (error) {
    console.error("Erro ao solicitar checkin:", error);
    throw error;
  }
};
