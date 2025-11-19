import { API_BASE_URL } from "@/services/api";

// Pegar todas as turmas
export async function getTurmas() {
  try {
    const response = await fetch(`${API_BASE_URL}/turmas`);
    const data = await response.json();
    // Ensure data is always an array
    const turmasArray = Array.isArray(data) ? data : [];
    return turmasArray;
  } catch (error) {
    console.error("Erro ao buscar turmas:", error);
    return [];
  }
}

