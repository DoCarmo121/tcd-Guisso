// Tipos do domínio do Sistema de Avaliação Atitudinal.
// Este arquivo é a fonte da verdade para os tipos do projeto.
// Todo o restante da aplicação importa daqui via "@/types/domain".

// Situação cadastral do estudante na instituição.
export type StudentStatus = "active" | "inactive" | "transferred";

// Classificação qualitativa de uma observação atitudinal.
export type ObservationType = "positive" | "neutral" | "negative";

// Turno de funcionamento da turma.
export type Shift = "morning" | "afternoon" | "full_time";

// Escala numérica de avaliação atitudinal (1 a 5).
export type AttitudeScore = 1 | 2 | 3 | 4 | 5;

// Professor responsável por lecionar em turmas e registrar avaliações.
export type Teacher = {
  id: string;
  name: string;
  email: string;
  // Opcional no banco de dados (NULL no DER).
  specialty: string | null;
  active: boolean;
  // Timestamps em formato ISO 8601 com sufixo Z.
  createdAt: string;
  updatedAt: string;
};

// Turma escolar que agrupa estudantes em um ano letivo e turno.
export type Classroom = {
  id: string;
  name: string;
  grade: string;
  schoolYear: number;
  shift: Shift;
  createdAt: string;
  updatedAt: string;
};

// Associação N-M entre professor e turma (tabela teacher_classrooms).
export type TeacherClassroom = {
  id: string;
  teacherId: string;
  classroomId: string;
  createdAt: string;
};

// Estudante — entidade central do domínio avaliado pelo sistema.
export type Student = {
  id: string;
  classroomId: string;
  name: string;
  registration: string;
  status: StudentStatus;
  // Data de nascimento opcional em formato ISO 8601 com sufixo Z ou nula.
  birthDate: string | null;
  createdAt: string;
  updatedAt: string;
};

// Categoria ou dimensão atitudinal observada (ex.: pontualidade, colaboração).
export type AttitudeCategory = {
  id: string;
  name: string;
  // Opcional no banco de dados (NULL no DER).
  description: string | null;
  active: boolean;
  createdAt: string;
  updatedAt: string;
};

// Período letivo que delimita o intervalo das avaliações (ex.: bimestre, trimestre).
export type AcademicPeriod = {
  id: string;
  name: string;
  // Datas em formato ISO 8601 (YYYY-MM-DD).
  startDate: string;
  endDate: string;
  createdAt: string;
};

// Registro de avaliação atitudinal vinculando estudante, professor, categoria e período.
export type AttitudeEvaluation = {
  id: string;
  studentId: string;
  teacherId: string;
  categoryId: string;
  academicPeriodId: string;
  score: AttitudeScore;
  observationType: ObservationType;
  notes: string | null;
  // Instante da avaliação em formato ISO 8601 com sufixo Z.
  evaluatedAt: string;
  createdAt: string;
  updatedAt: string;
};

// Resultado padronizado de uma Server Action (Capítulo 3, seção 3.4.12).
// União discriminada: `ok: true` indica sucesso; `ok: false` indica erro.
export type ActionResult<T> =
  | { ok: true; data: T }
  | {
      ok: false;
      error: {
        code: string;
        message: string;
        fields?: Record<string, string[]>;
      };
    };
