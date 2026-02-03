'use client';

import { X, MapPin, ExternalLink, Star, Phone, Clock, Globe, Calendar } from 'lucide-react';
import { useEffect } from 'react';

export interface RestaurantInfo {
  name: string;
  image: string;
  type: string;
  description: string;
  address: string;
  coralReview: string;
  gabiReview: string;
  cuisine?: string;
  rating?: number;
  priceRange?: string;
  website?: string;
  phone?: string;
  hours?: string;
  date?: string;
}

interface RestaurantModalProps {
  restaurant: RestaurantInfo | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function RestaurantModal({
  restaurant,
  isOpen,
  onClose,
}: RestaurantModalProps) {
  // Handle escape key press
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !restaurant) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Modal Card */}
      <div
        className="relative bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Image */}
        <div className="relative h-48 w-full">
          <img
            src={restaurant.image || "/placeholder.svg"}
            alt={restaurant.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <span className="inline-block px-3 py-1 text-xs font-medium bg-white/20 backdrop-blur-sm text-white rounded-full mb-2">
              {restaurant.type}
            </span>
            <h2 className="text-2xl font-serif text-white font-semibold">
              {restaurant.name}
            </h2>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4">
          {/* Description */}
          <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
            {restaurant.description}
          </p>

          {/* Address with Google Maps link */}
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(restaurant.address)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-2 text-sm text-neutral-600 dark:text-neutral-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors group"
          >
            <MapPin className="w-4 h-4 text-neutral-400 group-hover:text-blue-500 mt-0.5 shrink-0" />
            <span className="underline-offset-2 group-hover:underline">{restaurant.address}</span>
            <ExternalLink className="w-3 h-3 text-neutral-400 group-hover:text-blue-500 mt-0.5 shrink-0" />
          </a>

          {/* Dining Date */}
          {restaurant.date && (
            <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-300">
              <Calendar className="w-4 h-4 text-neutral-400 shrink-0" />
              <span>{restaurant.date}</span>
            </div>
          )}

          {/* Reviews */}
          <div className="space-y-3 pt-2 border-t border-neutral-200 dark:border-neutral-700">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Reviews</h3>

            {/* Coral's Review */}
            <div className="space-y-1">
              <p className="text-xs font-medium text-neutral-500 dark:text-neutral-400">Coral</p>
              <p className="text-sm text-neutral-700 dark:text-neutral-200 leading-relaxed">
                {restaurant.coralReview}
              </p>
            </div>

            {/* Gabi's Review */}
            <div className="space-y-1">
              <p className="text-xs font-medium text-neutral-500 dark:text-neutral-400">Gabi</p>
              <p className="text-sm text-neutral-700 dark:text-neutral-200 leading-relaxed">
                {restaurant.gabiReview}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
