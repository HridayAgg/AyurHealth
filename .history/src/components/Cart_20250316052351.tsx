import React from 'react';
import { ShoppingCart, Plus, Minus, X } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { Button } from './Button';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Cart: React.FC<CartProps> = ({ isOpen, onClose }) => {
  const { items, removeFromCart, updateQuantity, totalItems, totalAmount } = useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white dark:bg-gray-900 shadow-xl">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-2">
              <ShoppingCart className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Shopping Cart ({totalItems})
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            >
              <X className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            {items.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500 dark:text-gray-400">Your cart is empty</p>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
                  >
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 dark:text-white">{item.name}</h3>
                      <p className="text-emerald-600 dark:text-emerald-400">₹{item.price.toLocaleString()}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors"
                      >
                        <Minus className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                      </button>
                      <span className="w-8 text-center text-gray-900 dark:text-white">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors"
                      >
                        <Plus className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                      </button>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-1 hover:bg-red-100 dark:hover:bg-red-900/30 rounded transition-colors"
                      >
                        <X className="h-4 w-4 text-red-600 dark:text-red-400" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="p-4 border-t border-gray-200 dark:border-gray-800">
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-600 dark:text-gray-300">Total Amount:</span>
              <span className="text-xl font-bold text-emerald-600 dark:text-emerald-400">
                ₹{totalAmount.toLocaleString()}
              </span>
            </div>
            <Button
              onClick={() => alert('Checkout functionality coming soon!')}
              disabled={items.length === 0}
              className="w-full"
            >
              Proceed to Checkout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}; 