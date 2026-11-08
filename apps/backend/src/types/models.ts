import type { Prisma } from "@prisma/client";
import type {
  ProjectQuoteStatus,
  ProjectType,
  RepairTicketStatus,
  UserRole,
} from "@prisma/client";

export interface User {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: UserRole;
  createdAt: Date;
}

export interface RepairTicket {
  id: string;
  ticketNumber: string;
  customerId: string;
  deviceType: string;
  issueDescription: string;
  status: RepairTicketStatus;
  estimatedCost: Prisma.Decimal | null;
  createdAt: Date;
}

export interface ProjectQuote {
  id: string;
  clientName: string;
  clientEmail: string;
  projectType: ProjectType;
  scopeDetails: string;
  budgetRange: string;
  status: ProjectQuoteStatus;
}

export interface SystemLog {
  id: string;
  ticketId: string;
  updateMessage: string;
  timestamp: Date;
}