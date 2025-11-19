import { Tier, User } from "./types";

export const calculateTier = (score: number): Tier => {
  if (score >= 1800) return Tier.S;
  if (score >= 1500) return Tier.A;
  if (score >= 1200) return Tier.B;
  if (score >= 900) return Tier.C;
  if (score >= 600) return Tier.D;
  return Tier.F;
};

export const getTierColor = (tier: Tier): string => {
  switch (tier) {
    case Tier.S:
      return "bg-gradient-to-br from-purple-500 to-indigo-600 text-white border-purple-300";
    case Tier.A:
      return "bg-gradient-to-br from-emerald-400 to-teal-600 text-white border-emerald-300";
    case Tier.B:
      return "bg-gradient-to-br from-blue-400 to-cyan-600 text-white border-blue-300";
    case Tier.C:
      return "bg-gradient-to-br from-gray-400 to-slate-500 text-white border-gray-300";
    case Tier.D:
      return "bg-gradient-to-br from-orange-400 to-amber-500 text-white border-orange-300";
    case Tier.F:
      return "bg-gradient-to-br from-red-500 to-rose-600 text-white border-red-300";
    default:
      return "bg-gray-200 text-gray-700";
  }
};

export const INITIAL_USERS: User[] = [
  {
    id: "u1",
    name: "기창",
    avatar: "https://picsum.photos/seed/minjun/200/200",
    score: 1230,
    tier: Tier.B,
    isCurrentUser: true,
  },
  {
    id: "u2",
    name: "경현",
    avatar: "https://picsum.photos/seed/jiwoo/200/200",
    score: 1550,
    tier: Tier.A,
    isCurrentUser: false,
  },
];

export const CATEGORIES = [
  { id: "date", label: "데이트", icon: "💑" },
  { id: "housework", label: "집안일", icon: "🧹" },
  { id: "gift", label: "선물", icon: "🎁" },
  { id: "conversation", label: "대화", icon: "💬" },
  { id: "surprise", label: "서프라이즈", icon: "🎉" },
  { id: "habit", label: "생활습관", icon: "📝" },
];
