/**
 * Central manifest for test personas, group assignments, and role expectations.
 * Single source of truth across preflight, global setup, and E2E specs.
 */

export interface PersonaDefinition {
  key: "member" | "pm" | "coe";
  userName: string;
  label: string;
  groupName: string;
  requiredRole: string;
  email: string;
  firstName: string;
  lastName: string;
}

export const PERSONA_MANIFEST: Record<"member" | "pm" | "coe", PersonaDefinition> = {
  member: {
    key: "member",
    userName: "se_member_test",
    label: "Member",
    groupName: "Skill Evaluation User",
    requiredRole: "x_711398_se.se_user",
    email: "se_member_test@example.com",
    firstName: "SE",
    lastName: "Member Test",
  },
  pm: {
    key: "pm",
    userName: "se_pm_test",
    label: "PM",
    groupName: "Skill Evaluation PM",
    requiredRole: "x_711398_se.se_admin",
    email: "se_pm_test@example.com",
    firstName: "SE",
    lastName: "PM Test",
  },
  coe: {
    key: "coe",
    userName: "se_coe_test",
    label: "CoE Head",
    groupName: "Skill Evaluation COE",
    requiredRole: "x_711398_se.se_admin",
    email: "se_coe_test@example.com",
    firstName: "SE",
    lastName: "CoE Test",
  },
} as const;

export type PersonaKey = keyof typeof PERSONA_MANIFEST;
export const PERSONA_KEYS: PersonaKey[] = ["member", "pm", "coe"];

export const REQUIRED_MODULES = [
  "New Evaluation",
  "My Skill Evaluations",
  "All",
  "Awaiting Approval",
  "Completed",
] as const;
