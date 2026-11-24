// Funções de leitura da camada mock.
// As assinaturas são idênticas às que terão quando usarem o Supabase (Capítulo 9).
import type { Student } from "@/types/domain";
import { MOCK_STUDENTS } from "./students";

// Simula um atraso de rede para exercitar estados de carregamento.
function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Lista todos os estudantes. Simula latência de rede entre 500 e 1000 ms.
export async function listStudents(): Promise<Student[]> {
  await delay(750);
  return MOCK_STUDENTS.map((student) => ({ ...student }));
}

// Busca um estudante por id. Retorna uma cópia ou null se não encontrado.
export async function getStudent(id: string): Promise<Student | null> {
  await delay(550);
  const student = MOCK_STUDENTS.find((item) => item.id === id);
  return student ? { ...student } : null;
}
