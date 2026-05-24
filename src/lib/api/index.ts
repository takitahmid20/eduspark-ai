// Config
export { API_BASE_URL, ENDPOINTS } from "./config";

// Client
export { apiClient } from "./client";

// Auth
export { signup, login } from "./auth";
export type { AuthUser, AuthResponse, SignupPayload, LoginPayload } from "./auth";

// User
export { getProfile, updateProfile } from "./user";
export type { UserProfile, UpdateProfilePayload } from "./user";

// Students
export { getStudents, getStudent, createStudent, updateStudent, deleteStudent } from "./students";
export type { Student, CreateStudentPayload, UpdateStudentPayload } from "./students";

// Assignments
export { createAssignment, getAssignment, updateAssignment, deleteAssignment } from "./assignments";
export type { Assignment, CreateAssignmentPayload, UpdateAssignmentPayload } from "./assignments";

// Questions
export { uploadQuestions, getQuestions, updateQuestion } from "./questions";
export type { Question, UpdateQuestionPayload } from "./questions";

// Rubrics
export { uploadRubrics, getRubrics, updateRubric } from "./rubrics";
export type { Rubric, RubricDescription, RubricCriteria, RubricPenalty, UpdateRubricPayload } from "./rubrics";

// Solutions
export { uploadSolutions, getSolutions, updateSolution } from "./solutions";
export type { Solution, UpdateSolutionPayload } from "./solutions";
