import React, { useState } from "react";
import { Quest, QuestStatus } from "../types";
import { CheckCircle2, Clock, Trophy, Inbox, Send } from "lucide-react";

interface QuestBoardProps {
  quests: Quest[];
  currentUserId: string;
  onUpdateStatus: (questId: string, newStatus: QuestStatus) => void;
  onQuestClick: (quest: Quest) => void;
}

const QuestBoard: React.FC<QuestBoardProps> = ({
  quests,
  currentUserId,
  onUpdateStatus,
  onQuestClick,
}) => {
  const [activeTab, setActiveTab] = useState<"RECEIVED" | "SENT">("RECEIVED");

  const receivedQuests = quests.filter((q) => q.assigneeId === currentUserId);
  const sentQuests = quests.filter((q) => q.requesterId === currentUserId);

  const getStatusBadge = (status: QuestStatus) => {
    switch (status) {
      case QuestStatus.PENDING:
        return (
          <span className="bg-amber-100 text-amber-700 px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1">
            <Clock size={12} /> 대기중
          </span>
        );
      case QuestStatus.IN_PROGRESS:
        return (
          <span className="bg-blue-100 text-blue-700 px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1">
            <Clock size={12} /> 진행중
          </span>
        );
      case QuestStatus.COMPLETED:
        return (
          <span className="bg-purple-100 text-purple-700 px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1">
            <CheckCircle2 size={12} /> 승인 대기
          </span>
        );
      case QuestStatus.APPROVED:
        return (
          <span className="bg-green-100 text-green-700 px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1">
            <Trophy size={12} /> 완료됨
          </span>
        );
    }
  };

  const renderQuestCard = (quest: Quest) => {
    const isReceived = quest.assigneeId === currentUserId;

    return (
      <div
        key={quest.id}
        onClick={() => onQuestClick(quest)}
        className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col transition-all hover:shadow-md hover:-translate-y-1 h-full cursor-pointer"
      >
        <div className="flex justify-between items-start mb-4">
          <span className="text-xs font-bold text-slate-500 bg-slate-50 px-2.5 py-1 rounded-md">
            {quest.category}
          </span>
          {getStatusBadge(quest.status)}
        </div>

        <h3 className="text-xl font-bold text-slate-800 mb-2">{quest.title}</h3>
        <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-1">
          {quest.description}
        </p>

        <div className="mt-auto pt-4 border-t border-slate-50 flex items-center justify-between">
          <div className="font-bold text-indigo-600 text-sm flex items-center gap-1.5 bg-indigo-50 px-3 py-1.5 rounded-lg">
            <span className="text-lg">{quest.rewardPoints}</span> pts
          </div>

          {/* Action Buttons based on Status and Role */}
          <div className="flex gap-2">
            {isReceived && quest.status === QuestStatus.PENDING && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onUpdateStatus(quest.id, QuestStatus.IN_PROGRESS);
                }}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-bold hover:bg-indigo-700 shadow-sm hover:shadow-md transition-all"
              >
                수락하기
              </button>
            )}
            {isReceived && quest.status === QuestStatus.IN_PROGRESS && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onUpdateStatus(quest.id, QuestStatus.COMPLETED);
                }}
                className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-bold hover:bg-green-700 shadow-sm hover:shadow-md transition-all flex items-center gap-1.5"
              >
                <CheckCircle2 size={16} /> 완료 요청
              </button>
            )}
            {!isReceived && quest.status === QuestStatus.COMPLETED && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onUpdateStatus(quest.id, QuestStatus.APPROVED);
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700 shadow-sm hover:shadow-md transition-all flex items-center gap-1.5"
              >
                승인하기
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="pb-4 flex flex-col w-full">
      {/* Header */}
      <div className="sticky top-16 md:top-0 bg-[#f8fafc] z-30 pt-2 pb-6 px-0">
        <h2 className="text-2xl font-bold text-slate-900 mb-6 px-4 md:px-0">
          퀘스트 보드
        </h2>

        {/* Mobile/Tablet Tabs (Hidden on Desktop) */}
        <div className="lg:hidden flex bg-white p-1.5 rounded-xl shadow-sm border border-slate-200 max-w-md mx-4 md:mx-0">
          <button
            className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all ${
              activeTab === "RECEIVED"
                ? "bg-slate-900 text-white shadow-md"
                : "text-slate-500 hover:bg-slate-50"
            }`}
            onClick={() => setActiveTab("RECEIVED")}
          >
            받은 퀘스트 ({receivedQuests.length})
          </button>
          <button
            className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all ${
              activeTab === "SENT"
                ? "bg-slate-900 text-white shadow-md"
                : "text-slate-500 hover:bg-slate-50"
            }`}
            onClick={() => setActiveTab("SENT")}
          >
            보낸 퀘스트 ({sentQuests.length})
          </button>
        </div>
      </div>

      <div className="px-4 md:px-0">
        {/* Desktop Split View (Visible on LG+) */}
        <div className="hidden lg:grid grid-cols-2 gap-8">
          <section className="flex flex-col h-full">
            <h3 className="font-bold text-slate-700 mb-4 flex items-center gap-2 text-lg">
              <span className="bg-indigo-100 text-indigo-700 p-1.5 rounded-lg">
                <Inbox size={20} />
              </span>
              내가 받은 퀘스트{" "}
              <span className="text-slate-400 text-sm font-normal ml-1">
                ({receivedQuests.length})
              </span>
            </h3>
            <div className="space-y-4">
              {receivedQuests.length === 0 ? (
                <div className="py-12 bg-slate-50 rounded-2xl border border-dashed border-slate-200 text-center text-slate-400">
                  받은 퀘스트가 없습니다.
                </div>
              ) : (
                receivedQuests.map(renderQuestCard)
              )}
            </div>
          </section>

          <section className="flex flex-col h-full">
            <h3 className="font-bold text-slate-700 mb-4 flex items-center gap-2 text-lg">
              <span className="bg-pink-100 text-pink-700 p-1.5 rounded-lg">
                <Send size={20} />
              </span>
              내가 보낸 퀘스트{" "}
              <span className="text-slate-400 text-sm font-normal ml-1">
                ({sentQuests.length})
              </span>
            </h3>
            <div className="space-y-4">
              {sentQuests.length === 0 ? (
                <div className="py-12 bg-slate-50 rounded-2xl border border-dashed border-slate-200 text-center text-slate-400">
                  보낸 퀘스트가 없습니다.
                </div>
              ) : (
                sentQuests.map(renderQuestCard)
              )}
            </div>
          </section>
        </div>

        {/* Mobile/Tablet Tab View (Hidden on LG+) */}
        <div className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-4 auto-rows-max">
          {(activeTab === "RECEIVED" ? receivedQuests : sentQuests).length ===
          0 ? (
            <div className="col-span-full text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200">
              <p className="text-slate-400 font-medium">
                해당하는 퀘스트가 없습니다.
              </p>
            </div>
          ) : (
            (activeTab === "RECEIVED" ? receivedQuests : sentQuests).map(
              renderQuestCard
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default QuestBoard;
