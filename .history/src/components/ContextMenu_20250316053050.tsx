import React, { useEffect, useState } from 'react';
import { Search, ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Position {
  x: number;
  y: number;
}

interface ContextMenuProps {
  isOpen: boolean;
  position: Position;
  onClose: () => void;
  selectedText: string;
}

export const ContextMenu: React.FC<ContextMenuProps> = ({
  isOpen,
  position,
  onClose,
  selectedText
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen) {
        onClose();
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSearchMarketplace = () => {
    navigate(`/marketplace?search=${encodeURIComponent(selectedText)}`);
    onClose();
  };

  return (
    <div
      className="fixed z-50 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 w-64"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <button
        onClick={handleSearchMarketplace}
        className="w-full px-4 py-2 flex items-center gap-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
      >
        <div className="flex items-center gap-2">
          <ShoppingBag className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
          <Search className="h-4 w-4" />
        </div>
        <span className="flex-1 text-left">
          Search Marketplace for "{selectedText.length > 20 ? selectedText.substring(0, 20) + '...' : selectedText}"
        </span>
      </button>
    </div>
  );
}; 