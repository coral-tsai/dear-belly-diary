'use client';

import { useState } from 'react';
import { RestaurantInfo } from './RestaurantModal';
import { motion } from 'framer-motion';

interface CalendarViewProps {
    restaurants: RestaurantInfo[];
    onRestaurantClick: (restaurant: RestaurantInfo) => void;
}

export default function CalendarView({ restaurants, onRestaurantClick }: CalendarViewProps) {
    // Group restaurants by month
    const groupedRestaurants = restaurants.reduce((acc, restaurant) => {
        if (!restaurant.date) return acc;
        const date = new Date(restaurant.date);
        const monthYear = date.toLocaleString('default', { month: 'long', year: 'numeric' });

        if (!acc[monthYear]) {
            acc[monthYear] = [];
        }
        acc[monthYear].push(restaurant);
        return acc;
    }, {} as Record<string, RestaurantInfo[]>);

    // Sort dates within months
    Object.keys(groupedRestaurants).forEach(month => {
        groupedRestaurants[month].sort((a, b) =>
            new Date(b.date!).getTime() - new Date(a.date!).getTime()
        );
    });

    // Get sorted months (assuming we want chronological order)
    const sortedMonths = Object.keys(groupedRestaurants).sort((a, b) => {
        const dateA = new Date(groupedRestaurants[a][0].date!);
        const dateB = new Date(groupedRestaurants[b][0].date!);
        return dateB.getTime() - dateA.getTime();
    });

    return (
        <div className="w-full max-w-4xl mx-auto px-4 pt-32 pb-20">
            <div className="space-y-12">
                {sortedMonths.map((month) => (
                    <div key={month} className="relative">
                        {/* Month Header */}
                        <h2 className="text-3xl font-serif font-bold text-neutral-800 dark:text-white mb-6 sticky top-24 bg-white/80 dark:bg-black/80 backdrop-blur-md py-2 z-10 w-fit px-4 rounded-full border border-neutral-200 dark:border-neutral-800">
                            {month}
                        </h2>

                        {/* Timeline */}
                        <div className="relative pl-8 border-l-2 border-neutral-200 dark:border-neutral-800 space-y-8 ml-4">
                            {groupedRestaurants[month].map((restaurant, index) => (
                                <motion.div
                                    key={restaurant.name}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="relative group cursor-pointer"
                                    onClick={() => onRestaurantClick(restaurant)}
                                >
                                    {/* Timeline Dot */}
                                    <div className="absolute -left-[39px] top-4 w-4 h-4 rounded-full bg-neutral-300 dark:bg-neutral-700 group-hover:bg-blue-500 transition-colors" />

                                    <div className="flex flex-col sm:flex-row gap-4 p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-900/50 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all border border-transparent hover:border-neutral-200 dark:hover:border-neutral-700">
                                        {/* Date Badge */}
                                        <div className="flex flex-col items-center justify-center p-3 bg-white dark:bg-black rounded-xl border border-neutral-200 dark:border-neutral-800 h-fit min-w-[70px]">
                                            <span className="text-xs font-medium text-neutral-500 uppercase">
                                                {new Date(restaurant.date!).toLocaleString('default', { month: 'short' })}
                                            </span>
                                            <span className="text-2xl font-bold font-mono">
                                                {new Date(restaurant.date!).getDate()}
                                            </span>
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h3 className="text-lg font-bold text-neutral-900 dark:text-white group-hover:text-blue-500 transition-colors">
                                                        {restaurant.name}
                                                    </h3>
                                                    <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
                                                        {restaurant.type}
                                                    </p>
                                                </div>
                                                <div className="hidden sm:block">
                                                    <img
                                                        src={restaurant.image}
                                                        alt={restaurant.name}
                                                        className="w-16 h-16 rounded-lg object-cover"
                                                    />
                                                </div>
                                            </div>
                                            <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300 line-clamp-2">
                                                {restaurant.description}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
