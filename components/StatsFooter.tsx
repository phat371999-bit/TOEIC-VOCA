import React, { useState, useEffect } from 'react';
import { UsersIcon } from './icons';

const StatsFooter: React.FC = () => {
    const [dailyUsers, setDailyUsers] = useState<number>(0);
    const [totalUsers, setTotalUsers] = useState<number>(0);

    useEffect(() => {
        // Use a try-catch block to handle potential localStorage access errors (e.g., in private browsing mode)
        try {
            const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format

            // --- Total Users Logic ---
            let currentTotalUsers = parseInt(localStorage.getItem('toeicAppTotalUsers') || '0', 10);
            const hasVisited = localStorage.getItem('toeicAppHasVisited');

            if (!hasVisited) {
                currentTotalUsers += 1;
                localStorage.setItem('toeicAppTotalUsers', currentTotalUsers.toString());
                localStorage.setItem('toeicAppHasVisited', 'true');
            }
            setTotalUsers(currentTotalUsers);

            // --- Daily Users Logic ---
            const dailyStatsString = localStorage.getItem('toeicAppDailyStats');
            let dailyStats = dailyStatsString ? JSON.parse(dailyStatsString) : {};
            const lastVisitDate = localStorage.getItem('toeicAppLastVisitDate');
            
            if (lastVisitDate !== today) {
                // To keep localStorage clean, let's only store stats for the last 7 days
                const oneWeekAgo = new Date();
                oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
                const oneWeekAgoStr = oneWeekAgo.toISOString().split('T')[0];

                Object.keys(dailyStats).forEach(date => {
                    if (date < oneWeekAgoStr) {
                        delete dailyStats[date];
                    }
                });

                dailyStats[today] = (dailyStats[today] || 0) + 1;
                localStorage.setItem('toeicAppDailyStats', JSON.stringify(dailyStats));
                localStorage.setItem('toeicAppLastVisitDate', today);
            }
            
            setDailyUsers(dailyStats[today] || 0);
        } catch (error) {
            console.warn("Could not access localStorage for stats tracking:", error);
        }
    }, []);

    return (
        <footer className="bg-slate-100 text-slate-800 py-4 border-t border-slate-200">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm">
                <div className="flex justify-center items-center space-x-6">
                    <UsersIcon className="h-8 w-8 text-slate-500" aria-hidden="true" />
                    <div className="flex items-baseline space-x-4 sm:space-x-6">
                        <div>
                            <span className="font-bold text-lg">{dailyUsers.toLocaleString()}</span>
                            <span className="ml-2 text-slate-600">Daily Visitors</span>
                        </div>
                        <div className="border-l border-slate-300 h-6"></div>
                        <div>
                            <span className="font-bold text-lg">{totalUsers.toLocaleString()}</span>
                            <span className="ml-2 text-slate-600">Total Visitors</span>
                        </div>
                    </div>
                </div>
                <div className="mt-4 text-slate-500">
                    © {new Date().getFullYear()} <a href="https://www.facebook.com/phattruong.english" target="_blank" rel="noopener noreferrer" className="font-semibold text-blue-600 hover:underline">Mr.Phat TOEIC</a>. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default StatsFooter;