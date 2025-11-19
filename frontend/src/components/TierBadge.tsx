import React from 'react';
import { Tier } from '../types';
import { getTierColor } from '../constants';

interface TierBadgeProps {
  tier: Tier;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showLabel?: boolean;
}

const TierBadge: React.FC<TierBadgeProps> = ({ tier, size = 'md', showLabel = false }) => {
  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-12 h-12 text-lg',
    lg: 'w-20 h-20 text-3xl',
    xl: 'w-32 h-32 text-5xl',
  };

  return (
    <div className="flex flex-col items-center">
      <div className={`${sizeClasses[size]} ${getTierColor(tier)} rounded-full flex items-center justify-center font-bold shadow-lg border-4 ring-2 ring-white/50`}>
        {tier}
      </div>
      {showLabel && <span className="mt-2 font-bold text-slate-700">{getTierName(tier)}</span>}
    </div>
  );
};

const getTierName = (tier: Tier) => {
  switch (tier) {
    case Tier.S: return '최상급 연인';
    case Tier.A: return '모범 연인';
    case Tier.B: return '양호한 연인';
    case Tier.C: return '평균 연인';
    case Tier.D: return '노력 필요';
    case Tier.F: return '위험 수준';
  }
};

export default TierBadge;