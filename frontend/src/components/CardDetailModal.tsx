import React from "react";
import { Card, CardType } from "../types";
import Modal from "./common/Modal";
import { Button, Badge } from "./ui";
import { Heart, AlertCircle, Calendar, Tag } from "lucide-react";

interface CardDetailModalProps {
  card: Card;
  onClose: () => void;
}

const CardDetailModal: React.FC<CardDetailModalProps> = ({ card, onClose }) => {
  const isPraise = card.type === CardType.PRAISE;
  const bgColor = isPraise ? "bg-pink-50" : "bg-blue-50";
  const textColor = isPraise ? "text-pink-600" : "text-blue-600";

  return (
    <Modal
      title={isPraise ? "칭찬 카드 상세" : "벌점 카드 상세"}
      onClose={onClose}
    >
      <div className="flex flex-col items-center text-center mb-6">
        <div
          className={`w-20 h-20 rounded-full flex items-center justify-center mb-4 ${bgColor} ${textColor}`}
        >
          {isPraise ? (
            <Heart size={40} fill="currentColor" />
          ) : (
            <AlertCircle size={40} />
          )}
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-1">{card.title}</h2>
        <div className="flex items-center gap-2 mt-2">
          <Badge variant={isPraise ? "praise" : "penalty"}>
            {isPraise ? "+" : ""}
            {card.points}점
          </Badge>
          <Badge variant="neutral">
            <Tag size={14} /> {card.category}
          </Badge>
        </div>
      </div>

      <div className="bg-slate-50 rounded-2xl p-5 text-left mb-6 border border-slate-100 max-h-60 overflow-y-auto">
        <p className="text-slate-700 whitespace-pre-wrap leading-relaxed">
          {card.content}
        </p>
      </div>

      <div className="flex justify-between items-center text-sm text-slate-400 px-2">
        <div className="flex items-center gap-1.5">
          <Calendar size={16} />
          <span>
            {new Date(card.createdAt).toLocaleDateString("ko-KR")}{" "}
            {new Date(card.createdAt).toLocaleTimeString("ko-KR", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>
        {card.reaction && (
          <span className="flex items-center gap-1">반응: {card.reaction}</span>
        )}
      </div>

      <div className="mt-8">
        <Button onClick={onClose} variant="ghost" size="lg" fullWidth>
          닫기
        </Button>
      </div>
    </Modal>
  );
};

export default CardDetailModal;
