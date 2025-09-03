import { Sparkles, Star, PartyPopper, Trophy } from "lucide-react";

export default function getPerformanceMessage(score) {
  if (score >= 20000) return { message: "Outstanding!", icon: Sparkles };
  if (score >= 15000) return { message: "Excellent!", icon: Star };
  if (score >= 10000) return { message: "Great job!", icon: PartyPopper };
  return { message: "Good effort!", icon: Trophy };
};
