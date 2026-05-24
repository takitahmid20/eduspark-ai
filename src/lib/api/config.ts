/**
 * API Configuration
 * Uses VITE_API_BASE_URL from environment variables.
 * - Development: https://5zcs6sz7-8080.asse.devtunnels.ms
 * - Production: Set in .env.production
 */

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://5zcs6sz7-8080.asse.devtunnels.ms";

export const ENDPOINTS = {
  // Auth
  AUTH_SIGNUP: "/auth/signup",
  AUTH_LOGIN: "/auth/login",

  // User Profile
  USER_ME: "/users/me",

  // Students
  STUDENTS: "/students",
  STUDENT: (studentId: string) => `/students/${studentId}`,

  // Assignments
  ASSIGNMENTS: "/assignments",
  ASSIGNMENT: (assignmentId: number) => `/assignments/${assignmentId}`,

  // Questions
  QUESTIONS_UPLOAD: (assignmentId: number) => `/assignments/${assignmentId}/questions/upload`,
  QUESTIONS: (assignmentId: number) => `/assignments/${assignmentId}/questions`,
  QUESTION_UPDATE: (questionId: number) => `/assignments/${questionId}/questions`,

  // Rubrics
  RUBRICS_UPLOAD: (assignmentId: number) => `/assignments/${assignmentId}/rubrics/upload`,
  RUBRICS: (assignmentId: number) => `/assignments/${assignmentId}/rubrics`,
  RUBRIC_UPDATE: (rubricId: number) => `/assignments/${rubricId}/rubrics`,

  // Teacher Solutions
  SOLUTIONS_UPLOAD: (assignmentId: number) => `/assignments/${assignmentId}/solutions/upload`,
  SOLUTIONS: (assignmentId: number) => `/assignments/${assignmentId}/solutions`,
  SOLUTION_UPDATE: (solutionId: number) => `/assignments/${solutionId}/solutions`,
} as const;
