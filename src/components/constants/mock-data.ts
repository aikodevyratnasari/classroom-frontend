// src/mocks/mock-subjects.ts
import { Subject } from "@/types";

export const MOCK_SUBJECTS: Subject[] = [
  {
    id: 1,
    code: "CS101",
    name: "Introduction to Computer Science",
    department: "Computer Science",
    description:
      "An introductory course covering the fundamental concepts of computer science and programming.",
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    code: "MATH201",
    name: "Calculus II",
    department: "Mathematics",
    description:
      "Advanced study of integration, sequences, series, and power series.",
    createdAt: new Date().toISOString(),
  },
  {
    id: 3,
    code: "PHYS102",
    name: "Physics Fundamentals",
    department: "Physics",
    description:
      "A course covering the basic principles of physics including mechanics, thermodynamics, and electromagnetism.",
    createdAt: new Date().toISOString(),
  },
];
