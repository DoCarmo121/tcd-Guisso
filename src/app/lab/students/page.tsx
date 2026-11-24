"use client";

import { useEffect, useState } from "react";
import { StudentCard } from "@/components/students/student-card";
import { listStudents } from "@/lib/data";
import type { Student } from "@/types/domain";

// União discriminada dos estados de carregamento da listagem.
// O estado vazio é derivado durante a renderização (`students.length === 0`).
type StudentsLoadState =
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "success"; students: Student[] };

// Verifica integridade dos campos obrigatórios de Student retornados pela camada de dados.
function hasValidStudentFields(student: Student): boolean {
  return (
    student !== null &&
    typeof student === "object" &&
    typeof student.id === "string" &&
    student.id.trim().length > 0 &&
    typeof student.classroomId === "string" &&
    student.classroomId.trim().length > 0 &&
    typeof student.name === "string" &&
    student.name.trim().length > 0 &&
    typeof student.registration === "string" &&
    student.registration.trim().length > 0 &&
    (student.status === "active" ||
      student.status === "inactive" ||
      student.status === "transferred") &&
    (student.birthDate === null ||
      (typeof student.birthDate === "string" &&
        student.birthDate.trim().length > 0)) &&
    typeof student.createdAt === "string" &&
    student.createdAt.trim().length > 0 &&
    typeof student.updatedAt === "string" &&
    student.updatedAt.trim().length > 0
  );
}

// Página de listagem de estudantes usando a camada mock.
// No Capítulo 6, esta busca será convertida em Server Component sem useEffect.
export default function StudentsPage(): React.JSX.Element {
  const [loadState, setLoadState] = useState<StudentsLoadState>({
    status: "loading",
  });

  useEffect(() => {
    let cancelled = false;

    async function load(): Promise<void> {
      try {
        const data = await listStudents();

        if (!data.every(hasValidStudentFields)) {
          throw new Error(
            "Os dados de estudantes retornados estão incompletos ou inválidos.",
          );
        }

        if (!cancelled) {
          setLoadState({ status: "success", students: data });
        }
      } catch (err: unknown) {
        if (!cancelled) {
          const message =
            err instanceof Error
              ? err.message
              : "Não foi possível carregar a lista de estudantes.";
          setLoadState({ status: "error", message });
        }
      }
    }

    void load();

    // Limpeza: impede atualização de estado caso o componente seja desmontado.
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <main className="mx-auto w-full max-w-5xl px-6 py-8">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
          Estudantes
        </h1>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
          Listagem de estudantes acompanhados no Sistema de Avaliação
          Atitudinal.
        </p>
      </header>

      {loadState.status === "loading" && (
        <p
          role="status"
          className="rounded-lg border border-zinc-200 bg-white p-6 text-sm text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300"
        >
          Carregando estudantes...
        </p>
      )}

      {loadState.status === "error" && (
        <div
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 p-6 text-sm text-red-800 dark:border-red-900 dark:bg-red-950/60 dark:text-red-200"
        >
          <p className="font-semibold">Erro ao carregar estudantes</p>
          <p className="mt-1">{loadState.message}</p>
        </div>
      )}

      {loadState.status === "success" && loadState.students.length === 0 && (
        <p
          role="status"
          className="rounded-lg border border-zinc-200 bg-white p-6 text-sm text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300"
        >
          Nenhum estudante cadastrado no momento.
        </p>
      )}

      {loadState.status === "success" && loadState.students.length > 0 && (
        <section aria-label="Lista de estudantes">
          <p className="mb-4 text-sm text-zinc-600 dark:text-zinc-400">
            {loadState.students.length}{" "}
            {loadState.students.length === 1
              ? "estudante encontrado"
              : "estudantes encontrados"}
          </p>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {loadState.students.map((student) => (
              <li key={student.id}>
                <StudentCard student={student} />
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  );
}
