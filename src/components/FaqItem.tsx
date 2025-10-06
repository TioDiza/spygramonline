import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '../lib/utils';

interface FaqItemProps {
  question: string;
  answer: string;
}

const FaqItem: React.FC<FaqItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-700 py-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left text-lg font-semibold text-white focus:outline-none"
      >
        <span>{question}</span>
        <ChevronDown
          className={cn(
            'w-6 h-6 text-purple-400 transform transition-transform duration-300',
            isOpen ? 'rotate-180' : 'rotate-0'
          )}
        />
      </button>
      {isOpen && (
        <div className="mt-3 text-gray-300 text-base">
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
};

export default FaqItem;