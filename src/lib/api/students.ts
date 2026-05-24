import { apiClient } from "./client";
import { ENDPOINTS } from "./config";

// Types
export type Student = {
  teacher_id: string;
  id: string;
  name: string;
  created_at: string;
};

export type CreateStudentPayload = {
  id: string;
  name: string;
};

export type UpdateStudentPayload = {
  name: string;
};

type StudentsListResponse = {
  message: string;
  count: number;
  data: Student[];
};

type StudentResponse = {
  message: string;
  data: Student;
};

// API calls
export async function getStudents() {
  return apiClient<StudentsListResponse>(ENDPOINTS.STUDENTS);
}

export async function getStudent(studentId: string) {
  return apiClient<StudentResponse>(ENDPOINTS.STUDENT(studentId));
}

export async function createStudent(payload: CreateStudentPayload) {
  return apiClient<StudentResponse>(ENDPOINTS.STUDENTS, {
    method: "POST",
    body: payload as unknown as Record<string, unknown>,
  });
}

export async function updateStudent(studentId: string, payload: UpdateStudentPayload) {
  return apiClient<StudentResponse>(ENDPOINTS.STUDENT(studentId), {
    method: "PATCH",
    body: payload as unknown as Record<string, unknown>,
  });
}

export async function deleteStudent(studentId: string) {
  return apiClient<StudentResponse>(ENDPOINTS.STUDENT(studentId), {
    method: "DELETE",
  });
}
