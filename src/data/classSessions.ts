export type ClassSessionStatus = "Open" | "Closed";

export type ClassSession = {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  durationDays: number;
  price: number;
  capacity: number;
  status: ClassSessionStatus;
};

export const classSessions: ClassSession[] = [
  {
    id: "cappa-childbirth-educator-training-june-2026",
    title: "CAPPA Childbirth Educator Training",
    description:
      "A structured professional training for birth workers and educators seeking a strong foundation in evidence-based childbirth education, teaching skills, and certification readiness.",
    startDate: "June 12, 2026",
    endDate: "June 14, 2026",
    durationDays: 3,
    price: 895,
    capacity: 24,
    status: "Open",
  },
  {
    id: "cappa-lactation-educator-training-august-2026",
    title: "CAPPA Certified Lactation Educator (CLE®) Training",
    description:
      "A professional development training designed for those supporting feeding families and pursuing lactation education with a calm, practical, and certification-focused learning experience.",
    startDate: "August 21, 2026",
    endDate: "August 23, 2026",
    durationDays: 3,
    price: 925,
    capacity: 20,
    status: "Open",
  },
  {
    id: "postpartum-lactation-support-session-may-2026",
    title: "Postpartum Lactation Support Session",
    description:
      "A family-centered support class for new mothers and parents seeking guidance on breastfeeding, recovery, newborn feeding rhythms, and early postpartum confidence.",
    startDate: "May 9, 2026",
    endDate: "May 10, 2026",
    durationDays: 2,
    price: 249,
    capacity: 18,
    status: "Open",
  },
];

export function getClassSessionById(sessionId: string) {
  return classSessions.find((session) => session.id === sessionId);
}
