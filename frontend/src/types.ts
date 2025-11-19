export enum Tier {
  S = 'S', // 1800+
  A = 'A', // 1500-1799
  B = 'B', // 1200-1499
  C = 'C', // 900-1199
  D = 'D', // 600-899
  F = 'F', // 0-599
}

export enum CardType {
  PRAISE = 'PRAISE',
  PENALTY = 'PENALTY',
}

export enum QuestStatus {
  PENDING = 'PENDING',     // Created, waiting for acceptance
  IN_PROGRESS = 'IN_PROGRESS', // Accepted
  COMPLETED = 'COMPLETED', // Done by assignee, waiting approval
  APPROVED = 'APPROVED',   // Approved by requester (points awarded)
}

export interface User {
  id: string;
  name: string;
  avatar: string;
  score: number;
  tier: Tier;
  isCurrentUser: boolean;
}

export interface Card {
  id: string;
  senderId: string;
  receiverId: string;
  type: CardType;
  title: string;
  content: string;
  points: number;
  category: string;
  createdAt: string;
  reaction?: string;
}

export interface Quest {
  id: string;
  requesterId: string;
  assigneeId: string;
  title: string;
  description: string;
  rewardPoints: number;
  status: QuestStatus;
  category: string;
  dueDate?: string;
}

export type TabView = 'dashboard' | 'timeline' | 'quests' | 'stats' | 'profile';