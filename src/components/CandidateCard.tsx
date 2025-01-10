import React from 'react';
import { Check } from 'lucide-react';

interface CandidateCardProps {
  name: string;
  isVoted: boolean;
  isDisabled: boolean;
  onVote: () => void;
}

export default function CandidateCard({
  name,
  isVoted,
  isDisabled,
  onVote,
}: CandidateCardProps) {
  return (
    <button
      onClick={onVote}
      disabled={isVoted || isDisabled}
      className={`
        relative p-6 bg-gray-50 border rounded-lg transition-all duration-200
        ${
          isVoted
            ? 'bg-blue-50 border-blue-200'
            : 'hover:bg-blue-50 hover:border-blue-200'
        }
        ${isDisabled && !isVoted ? 'opacity-50 cursor-not-allowed' : ''}
      `}
    >
      <h3 className="text-lg font-medium">{name}</h3>
      {isVoted && (
        <div className="absolute top-3 right-3">
          <Check className="w-5 h-5 text-blue-600" />
        </div>
      )}
    </button>
  );
}
