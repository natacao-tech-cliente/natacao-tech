// CORREÇÃO: Adicionado '/database' no final e removidos Student/Level que não eram usados
import type { Question as DatabaseQuestion } from "@/core/types/database";

export interface Question {
  id: string;
  text: string;
  category: string;
}

export const MOCK_QUESTIONS: Question[] = [
  { id: "q1", text: "O aluno solta bolhas na água?", category: "Respiração" },
  { id: "q2", text: "O aluno mergulha e pega objeto?", category: "Imersão" },
  { id: "q3", text: "Bate pernas com prancha?", category: "Propulsão" },
];

export const MOCK_STUDENTS_BATCH = [
  { id: "1", name: "Davi Rocha", active: true, status_last_eval: "pending" },
  { id: "2", name: "Maria Silva", active: true, status_last_eval: "done" },
  { id: "3", name: "João Pedro", active: true, status_last_eval: "pending" },
];

export const MOCK_PAYLOAD_SAVE = {
  class_id: "turma-segunda-9h",
  level_id: "touca-laranja",
  answers: [
    { student_id: "1", question_id: "q1", value: true },
    { student_id: "1", question_id: "q2", value: false },
  ],
  feedbacks: [{ student_id: "1", text: "Melhorou muito a respiração!" }],
};
