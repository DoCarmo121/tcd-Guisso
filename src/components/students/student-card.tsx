"use client";

import type { Student, StudentStatus } from "@/types/domain";

// Rótulos legíveis em português para cada situação cadastral do estudante.
const STATUS_LABELS = {
  active: "Ativo",
  inactive: "Inativo",
  transferred: "Transferido",
} satisfies Record<StudentStatus, string>;

// Estilos de contraste WCAG AA (claro e escuro) para cada status.
const STATUS_STYLES = {
  active:
    "border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-200",
  inactive:
    "border-zinc-200 bg-zinc-100 text-zinc-700 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200",
  transferred:
    "border-amber-200 bg-amber-50 text-amber-800 dark:border-amber-800 dark:bg-amber-950/60 dark:text-amber-200",
} satisfies Record<StudentStatus, string>;

// Formata data ISO 8601 em UTC para evitar deslocamento de dia por fuso horário.
function formatBirthDate(birthDate: string | null): string {
  if (birthDate === null) {
    return "Não informada";
  }

  const parsed = new Date(birthDate);
  if (Number.isNaN(parsed.getTime())) {
    return "Não informada";
  }

  return new Intl.DateTimeFormat("pt-BR", { timeZone: "UTC" }).format(parsed);
}

// Props tipadas do cartão de estudante.
export type StudentCardProps = {
  student: Student;
};

// Componente de apresentação para exibir um estudante individual.
export function StudentCard({ student }: StudentCardProps): React.JSX.Element {
  const statusLabel = STATUS_LABELS[student.status];
  const statusStyle = STATUS_STYLES[student.status];

  return (
    <article
      aria-label={`Estudante ${student.name}`}
      className="rounded-lg border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
    >
      <header className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2.5">
          <svg
            role="img"
            aria-label={`Ícone do estudante ${student.name}`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            className="h-5 w-5 shrink-0 text-zinc-500 dark:text-zinc-400"
          >
            <title>{`Estudante ${student.name}`}</title>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
            />
          </svg>
          <h2 className="truncate text-base font-semibold text-zinc-900 dark:text-zinc-100">
            {student.name}
          </h2>
        </div>

        <span
          aria-label={`Status: ${statusLabel}`}
          className={`shrink-0 rounded-full border px-2.5 py-0.5 text-xs font-medium ${statusStyle}`}
        >
          {statusLabel}
        </span>
      </header>

      <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 border-t border-zinc-100 pt-3 text-sm dark:border-zinc-800">
        <div>
          <dt className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
            Matrícula
          </dt>
          <dd className="font-mono text-zinc-900 dark:text-zinc-100">
            {student.registration}
          </dd>
        </div>
        <div>
          <dt className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
            Nascimento
          </dt>
          <dd className="text-zinc-900 dark:text-zinc-100">
            {formatBirthDate(student.birthDate)}
          </dd>
        </div>
      </dl>
    </article>
  );
}
