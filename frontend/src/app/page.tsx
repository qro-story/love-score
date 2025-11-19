"use client";

import React, { useState } from "react";
import Dashboard from "@/components/Dashboard";
import Timeline from "@/components/Timeline";
import QuestBoard from "@/components/QuestBoard";
import Stats from "@/components/Stats";
import Sidebar from "@/components/layout/Sidebar";
import MobileHeader from "@/components/layout/MobileHeader";
import MobileNavigation from "@/components/layout/MobileNavigation";
import Modal from "@/components/common/Modal";
import CardForm from "@/components/forms/CardForm";
import QuestForm from "@/components/forms/QuestForm";
import CardDetailModal from "@/components/CardDetailModal";
import QuestDetailModal from "@/components/QuestDetailModal";

import { User, Card, Quest, TabView, CardType, QuestStatus } from "@/types";
import { INITIAL_USERS, CATEGORIES, calculateTier } from "@/constants";

export default function Home() {
  // --- State Management ---
  const [activeTab, setActiveTab] = useState<TabView>("dashboard");
  const [users, setUsers] = useState<User[]>(INITIAL_USERS);

  // Mock Data State
  const [cards, setCards] = useState<Card[]>([
    {
      id: "c1",
      senderId: "u2",
      receiverId: "u1",
      type: CardType.PRAISE,
      title: "오늘 저녁 최고였어",
      content: "준비해준 파스타 너무 맛있었어! 고마워 ❤️",
      points: 30,
      category: "데이트",
      createdAt: "2024-03-10T12:00:00",
    },
    {
      id: "c2",
      senderId: "u2",
      receiverId: "u1",
      type: CardType.PENALTY,
      title: "양말은 빨래통에...",
      content: "침대 옆에 양말 벗어두지 말아줘 ㅠㅠ",
      points: 15,
      category: "생활습관",
      createdAt: "2024-03-09T12:00:00",
    },
  ]);

  const [quests, setQuests] = useState<Quest[]>([
    {
      id: "q1",
      requesterId: "u2",
      assigneeId: "u1",
      title: "주말 영화 예매하기",
      description: "이번주 토요일 데이트 준비해줘",
      rewardPoints: 30,
      status: QuestStatus.PENDING,
      category: "데이트",
    },
    {
      id: "q2",
      requesterId: "u1",
      assigneeId: "u2",
      title: "설거지 3일 연속 당번",
      description: "내가 요리하니까 설거지는 부탁해",
      rewardPoints: 50,
      status: QuestStatus.IN_PROGRESS,
      category: "집안일",
    },
  ]);

  // Modals State
  const [showCardModal, setShowCardModal] = useState(false);
  const [showQuestModal, setShowQuestModal] = useState(false);
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [selectedQuest, setSelectedQuest] = useState<Quest | null>(null);

  // Helper to get current user
  const currentUser = users.find((u) => u.isCurrentUser) || users[0];
  const partner = users.find((u) => !u.isCurrentUser) || users[1];

  // --- Actions ---

  const handleSendCard = (data: any) => {
    const newCard: Card = {
      id: Date.now().toString(),
      senderId: currentUser.id,
      receiverId: partner.id,
      type: data.type,
      title: data.title,
      content: data.content,
      points: parseInt(data.points),
      category: data.category,
      createdAt: new Date().toISOString(),
    };

    setCards([newCard, ...cards]);

    // Update Partner Score locally for demo
    const pointChange =
      data.type === CardType.PRAISE ? newCard.points : -newCard.points;
    const updatedPartner = { ...partner, score: partner.score + pointChange };
    updatedPartner.tier = calculateTier(updatedPartner.score);

    setUsers(users.map((u) => (u.id === partner.id ? updatedPartner : u)));
    setShowCardModal(false);
  };

  const handleCreateQuest = (data: any) => {
    const newQuest: Quest = {
      id: Date.now().toString(),
      requesterId: currentUser.id,
      assigneeId: partner.id,
      title: data.title,
      description: data.description,
      rewardPoints: parseInt(data.points),
      status: QuestStatus.PENDING,
      category: data.category,
    };
    setQuests([newQuest, ...quests]);
    setShowQuestModal(false);
  };

  const handleQuestStatusUpdate = (questId: string, newStatus: QuestStatus) => {
    if (newStatus === QuestStatus.APPROVED) {
      const quest = quests.find((q) => q.id === questId);
      if (quest) {
        const assignee = users.find((u) => u.id === quest.assigneeId);
        if (assignee) {
          const updatedAssignee = {
            ...assignee,
            score: assignee.score + quest.rewardPoints,
          };
          updatedAssignee.tier = calculateTier(updatedAssignee.score);
          setUsers(
            users.map((u) => (u.id === assignee.id ? updatedAssignee : u))
          );
        }
      }
    }
    setQuests(
      quests.map((q) => (q.id === questId ? { ...q, status: newStatus } : q))
    );
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans flex flex-col md:flex-row">
      {/* Desktop Sidebar */}
      <Sidebar
        currentUser={currentUser}
        activeTab={activeTab}
        onNavigate={setActiveTab}
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-h-screen relative">
        {/* Mobile Header */}
        <MobileHeader currentUser={currentUser} />

        {/* Content Wrapper */}
        <div className="flex-1 pt-16 pb-20 md:py-8 md:px-8">
          <div className="max-w-6xl mx-auto px-4 md:px-0">
            {activeTab === "dashboard" && (
              <Dashboard
                currentUser={currentUser}
                partner={partner}
                recentCards={cards
                  .filter((c) => c.receiverId === currentUser.id)
                  .slice(0, 3)}
                activeQuests={quests.filter(
                  (q) =>
                    q.status === QuestStatus.IN_PROGRESS ||
                    q.status === QuestStatus.COMPLETED
                )}
                onNavigate={setActiveTab}
                onOpenNewCard={() => setShowCardModal(true)}
                onOpenNewQuest={() => setShowQuestModal(true)}
                onCardClick={(card) => setSelectedCard(card)}
                onQuestClick={(quest) => setSelectedQuest(quest)}
              />
            )}
            {activeTab === "timeline" && (
              <Timeline
                cards={cards}
                onCardClick={(card) => setSelectedCard(card)}
              />
            )}
            {activeTab === "quests" && (
              <QuestBoard
                quests={quests}
                currentUserId={currentUser.id}
                onUpdateStatus={handleQuestStatusUpdate}
                onQuestClick={(quest) => setSelectedQuest(quest)}
              />
            )}
            {activeTab === "stats" && <Stats user={currentUser} />}
            {activeTab === "profile" && (
              <div className="p-8 text-center max-w-lg mx-auto bg-white rounded-3xl shadow-sm border border-slate-100 mt-10">
                <div className="w-24 h-24 bg-slate-200 rounded-full mx-auto mb-4 overflow-hidden">
                  <img
                    src={currentUser.avatar}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h2 className="text-2xl font-bold">{currentUser.name}</h2>
                <p className="text-slate-500 mb-8">
                  {currentUser.tier} Tier • {currentUser.score} pts
                </p>
                <button className="w-full py-3 border border-slate-200 rounded-xl text-slate-600 font-medium hover:bg-slate-50 transition-colors">
                  로그아웃
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Bottom Navigation */}
        <MobileNavigation activeTab={activeTab} onNavigate={setActiveTab} />
      </main>

      {/* Modals */}
      {showCardModal && (
        <Modal
          title="칭찬/벌점 카드 보내기"
          onClose={() => setShowCardModal(false)}
        >
          <CardForm onSubmit={handleSendCard} categories={CATEGORIES} />
        </Modal>
      )}

      {showQuestModal && (
        <Modal
          title="새 퀘스트 요청하기"
          onClose={() => setShowQuestModal(false)}
        >
          <QuestForm onSubmit={handleCreateQuest} categories={CATEGORIES} />
        </Modal>
      )}

      {selectedCard && (
        <CardDetailModal
          card={selectedCard}
          onClose={() => setSelectedCard(null)}
        />
      )}

      {selectedQuest && (
        <QuestDetailModal
          quest={selectedQuest}
          currentUserId={currentUser.id}
          onUpdateStatus={handleQuestStatusUpdate}
          onClose={() => setSelectedQuest(null)}
        />
      )}
    </div>
  );
}
