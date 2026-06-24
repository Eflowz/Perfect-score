export interface UserProfile {
 id: string;
 email: string;
 name: string;
 role: string;
 xp: number;
 level: number;
 streakDays: number;
 completedLessons: number;
 lastActiveAt: string;
 createdAt: string;
 certificates?: unknown[];
 roadmap?: unknown;
}