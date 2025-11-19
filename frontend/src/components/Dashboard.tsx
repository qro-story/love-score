import React from "react";
import { User, Card, Quest, Tier, QuestStatus, CardType } from "../types";
import TierBadge from "./TierBadge";
import {
  ArrowUp,
  ArrowDown,
  Heart,
  AlertCircle,
  CheckCircle2,
  Plus,
  ChevronRight,
} from "lucide-react";

interface DashboardProps {
  currentUser: User;
  partner: User;
  recentCards: Card[];
  activeQuests: Quest[];
  onNavigate: (tab: any) => void;
  onOpenNewCard: () => void;
  onOpenNewQuest: () => void;
  onCardClick: (card: Card) => void;
  onQuestClick: (quest: Quest) => void;
}

const Dashboard: React.FC<DashboardProps> = ({
  currentUser,
  partner,
  recentCards,
  activeQuests,
  onNavigate,
  onOpenNewCard,
  onOpenNewQuest,
  onCardClick,
  onQuestClick,
}) => {
  console.log("currentUser : ", currentUser);
  const nextTierScore = 1500; // Example for B -> A logic
  const progress = Math.min(
    100,
    Math.max(0, ((currentUser.score - 1200) / (1500 - 1200)) * 100)
  );

  return (
    <div className="space-y-6 pb-4">
      {/* Header / Score Overview - Full Width */}
      <section className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-100 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-pink-400 to-blue-400"></div>

        <div className="flex flex-col md:flex-row justify-around items-center gap-6 md:gap-0 mb-6 mt-2">
          <div className="flex flex-col items-center transition-transform hover:scale-105">
            <TierBadge tier={currentUser.tier} size="lg" />
            <span className="mt-3 font-bold text-slate-800 text-lg">
              나 ({currentUser.name})
            </span>
            <span className="text-sm text-slate-500 font-mono bg-slate-50 px-3 py-1 rounded-full mt-1 border border-slate-100">
              {currentUser.score} pts
            </span>
          </div>

          <div className="hidden md:block h-24 w-px bg-slate-200"></div>
          <div className="md:hidden w-full h-px bg-slate-100"></div>

          <div className="flex flex-col items-center opacity-90 transition-transform hover:scale-105">
            <TierBadge tier={partner.tier} size="lg" />
            <span className="mt-3 font-bold text-slate-800 text-lg">
              {partner.name}
            </span>
            <span className="text-sm text-slate-500 font-mono bg-slate-50 px-3 py-1 rounded-full mt-1 border border-slate-100">
              {partner.score} pts
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="max-w-2xl mx-auto space-y-2">
          <div className="flex justify-between text-xs font-bold text-slate-500 uppercase tracking-wider">
            <span>Tier {currentUser.tier}</span>
            <span>Tier {currentUser.tier === Tier.S ? "MAX" : "A"}</span>
          </div>
          <div className="h-4 w-full bg-slate-100 rounded-full overflow-hidden ring-1 ring-slate-100">
            <div
              className="h-full bg-gradient-to-r from-purple-400 to-pink-400 transition-all duration-1000"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-xs text-center text-slate-400 mt-2">
            다음 티어까지{" "}
            <span className="text-pink-500 font-bold">
              {nextTierScore - currentUser.score}점
            </span>{" "}
            남았어요! 힘내세요!
          </p>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Cards Preview */}
        <section className="bg-transparent md:bg-white md:p-6 md:rounded-3xl md:border md:border-slate-100 md:shadow-sm">
          <div className="flex justify-between items-center mb-4 px-2 md:px-0">
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <Heart size={20} className="text-pink-500" />
              최근 받은 카드
            </h3>
            <button
              onClick={() => onNavigate("timeline")}
              className="text-sm text-blue-500 hover:text-blue-700 font-medium flex items-center hover:underline"
            >
              전체보기 <ChevronRight size={14} />
            </button>
          </div>
          <div className="space-y-3">
            {recentCards.length === 0 ? (
              <div className="text-center py-10 bg-white md:bg-slate-50 rounded-xl text-slate-400 border border-dashed border-slate-200">
                아직 받은 카드가 없어요.
              </div>
            ) : (
              recentCards.map((card) => (
                <div
                  key={card.id}
                  onClick={() => onCardClick(card)}
                  className={`p-4 rounded-xl border flex items-start gap-4 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5 cursor-pointer ${
                    card.type === CardType.PRAISE
                      ? "bg-pink-50 border-pink-100 hover:bg-pink-100"
                      : "bg-slate-50 border-slate-100 hover:bg-slate-100"
                  }`}
                >
                  <div
                    className={`p-2.5 rounded-full shrink-0 ${
                      card.type === CardType.PRAISE
                        ? "bg-pink-200 text-pink-600"
                        : "bg-slate-200 text-slate-600"
                    }`}
                  >
                    {card.type === CardType.PRAISE ? (
                      <Heart size={18} fill="currentColor" />
                    ) : (
                      <AlertCircle size={18} />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <h4 className="font-bold text-slate-800 truncate pr-2">
                        {card.title}
                      </h4>
                      <span
                        className={`text-sm font-bold whitespace-nowrap ${
                          card.type === CardType.PRAISE
                            ? "text-pink-600"
                            : "text-blue-600"
                        }`}
                      >
                        {card.type === CardType.PRAISE ? "+" : ""}
                        {card.points}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 mt-1 line-clamp-2">
                      {card.content}
                    </p>
                    <p className="text-xs text-slate-400 mt-2 text-right">
                      {new Date(card.createdAt).toLocaleDateString("ko-KR")}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
          <button
            onClick={onOpenNewCard}
            className="w-full mt-4 py-3 border-2 border-dashed border-slate-200 rounded-xl text-slate-400 font-bold hover:border-pink-300 hover:text-pink-500 hover:bg-pink-50 transition-colors flex items-center justify-center gap-2"
          >
            <Plus size={18} /> 카드 보내기
          </button>
        </section>

        {/* Active Quests Preview */}
        <section className="bg-transparent md:bg-white md:p-6 md:rounded-3xl md:border md:border-slate-100 md:shadow-sm">
          <div className="flex justify-between items-center mb-4 px-2 md:px-0">
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <CheckCircle2 size={20} className="text-indigo-500" />
              진행 중인 퀘스트
            </h3>
            <button
              onClick={() => onNavigate("quests")}
              className="text-sm text-blue-500 hover:text-blue-700 font-medium flex items-center hover:underline"
            >
              전체보기 <ChevronRight size={14} />
            </button>
          </div>
          <div className="space-y-3">
            {activeQuests.length === 0 ? (
              <div className="text-center py-10 bg-white md:bg-slate-50 rounded-xl text-slate-400 border border-dashed border-slate-200">
                진행 중인 퀘스트가 없습니다.
              </div>
            ) : (
              activeQuests.map((quest) => (
                <div
                  key={quest.id}
                  onClick={() => onQuestClick(quest)}
                  className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center justify-between transition-all hover:shadow-md hover:-translate-y-0.5 cursor-pointer"
                >
                  <div className="flex items-center gap-4 overflow-hidden">
                    <div
                      className={`w-1.5 h-12 rounded-full shrink-0 ${
                        quest.status === QuestStatus.COMPLETED
                          ? "bg-green-500"
                          : "bg-indigo-500"
                      }`}
                    ></div>
                    <div className="min-w-0">
                      <h4 className="font-bold text-slate-800 truncate">
                        {quest.title}
                      </h4>
                      <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1">
                        {quest.status === QuestStatus.COMPLETED ? (
                          <span className="text-green-600 font-medium">
                            승인 대기중
                          </span>
                        ) : (
                          <span className="text-indigo-600 font-medium">
                            진행중
                          </span>
                        )}
                        <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                        {quest.category}
                      </p>
                    </div>
                  </div>
                  <div className="bg-indigo-50 px-3 py-1.5 rounded-lg text-indigo-700 font-bold text-sm whitespace-nowrap shrink-0">
                    {quest.rewardPoints} P
                  </div>
                </div>
              ))
            )}
          </div>
          <button
            onClick={onOpenNewQuest}
            className="w-full mt-4 py-3 border-2 border-dashed border-slate-200 rounded-xl text-slate-400 font-bold hover:border-indigo-300 hover:text-indigo-500 hover:bg-indigo-50 transition-colors flex items-center justify-center gap-2"
          >
            <Plus size={18} /> 퀘스트 생성
          </button>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
