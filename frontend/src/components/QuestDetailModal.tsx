import React from "react";
import { Quest, QuestStatus } from "../types";
import Modal from "./common/Modal";
import { Button, Badge } from "./ui";
import { CheckCircle2, Clock, Trophy, Tag } from "lucide-react";

interface QuestDetailModalProps {
  quest: Quest;
  currentUserId: string;
  onUpdateStatus: (questId: string, newStatus: QuestStatus) => void;
  onClose: () => void;
}

const QuestDetailModal: React.FC<QuestDetailModalProps> = ({
  quest,
  currentUserId,
  onUpdateStatus,
  onClose,
}) => {
  const isReceived = quest.assigneeId === currentUserId;

  const getStatusBadge = (status: QuestStatus) => {
    switch (status) {
      case QuestStatus.PENDING:
        return (
          <Badge variant="warning">
            <Clock size={14} /> 대기중
          </Badge>
        );
      case QuestStatus.IN_PROGRESS:
        return (
          <Badge variant="info">
            <Clock size={14} /> 진행중
          </Badge>
        );
      case QuestStatus.COMPLETED:
        return (
          <Badge variant="primary">
            <CheckCircle2 size={14} /> 승인 대기
          </Badge>
        );
      case QuestStatus.APPROVED:
        return (
          <Badge variant="success">
            <Trophy size={14} /> 완료됨
          </Badge>
        );
    }
  };

  const renderActions = () => {
    if (isReceived && quest.status === QuestStatus.PENDING) {
      return (
        <Button
          onClick={() => {
            onUpdateStatus(quest.id, QuestStatus.IN_PROGRESS);
            onClose();
          }}
          variant="primary"
          size="lg"
          fullWidth
        >
          퀘스트 수락하기
        </Button>
      );
    }
    if (isReceived && quest.status === QuestStatus.IN_PROGRESS) {
      return (
        <Button
          onClick={() => {
            onUpdateStatus(quest.id, QuestStatus.COMPLETED);
            onClose();
          }}
          variant="success"
          size="lg"
          fullWidth
        >
          <CheckCircle2 size={20} /> 완료 요청하기
        </Button>
      );
    }
    if (!isReceived && quest.status === QuestStatus.COMPLETED) {
      return (
        <Button
          onClick={() => {
            onUpdateStatus(quest.id, QuestStatus.APPROVED);
            onClose();
          }}
          variant="primary"
          size="lg"
          fullWidth
        >
          <Trophy size={20} /> 승인 및 포인트 지급
        </Button>
      );
    }

    return (
      <Button onClick={onClose} variant="ghost" size="lg" fullWidth>
        닫기
      </Button>
    );
  };

  return (
    <Modal title="퀘스트 상세 정보" onClose={onClose}>
      <div className="flex flex-col items-center text-center mb-6">
        <div
          className={`w-20 h-20 rounded-full flex items-center justify-center mb-4 ${
            quest.status === QuestStatus.APPROVED
              ? "bg-green-100 text-green-600"
              : "bg-indigo-50 text-indigo-600"
          }`}
        >
          {quest.status === QuestStatus.APPROVED ? (
            <Trophy size={40} />
          ) : (
            <CheckCircle2 size={40} />
          )}
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-1">
          {quest.title}
        </h2>
        <div className="flex flex-wrap justify-center gap-2 mt-3">
          {getStatusBadge(quest.status)}
          <Badge variant="primary">{quest.rewardPoints} pts</Badge>
          <Badge variant="neutral">
            <Tag size={14} /> {quest.category}
          </Badge>
        </div>
      </div>

      <div className="bg-slate-50 rounded-2xl p-5 text-left mb-6 border border-slate-100">
        <h4 className="text-xs font-bold text-slate-400 uppercase mb-2">
          상세 내용
        </h4>
        <p className="text-slate-700 whitespace-pre-wrap leading-relaxed">
          {quest.description}
        </p>
      </div>

      <div className="mt-4">{renderActions()}</div>
    </Modal>
  );
};

export default QuestDetailModal;
