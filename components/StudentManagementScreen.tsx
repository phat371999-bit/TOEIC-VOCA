
import React, { useState, useEffect, useCallback } from 'react';
import { User, TestResult, UserProgress } from '../types';
import { getProgress, getLatestActivity } from '../services/progressService';
import { LoadingIcon, RefreshIcon } from './icons';

interface StudentManagementScreenProps {
    users: User[];
    onViewStudentProgress: (user: User) => void;
}

interface UserActivity extends User {
    latestActivity: TestResult | null;
}

const StudentManagementScreen: React.FC<StudentManagementScreenProps> = ({ users, onViewStudentProgress }) => {
    const [studentData, setStudentData] = useState<UserActivity[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchActivities = useCallback(async () => {
        try {
            setError(null);
            const standardUsers = users.filter(u => u.username !== 'admin');
            
            // A more robust backend would have a single endpoint for this.
            // Here, we fetch for each user in parallel to simulate.
            const activitiesPromises = standardUsers.map(async (user) => {
                const progress: UserProgress = await getProgress(user.username);
                const latestActivity = getLatestActivity(progress);
                return { ...user, latestActivity };
            });

            const data = await Promise.all(activitiesPromises);

            data.sort((a, b) => {
                if (!a.latestActivity) return 1;
                if (!b.latestActivity) return -1;
                return b.latestActivity.date - a.latestActivity.date;
            });

            setStudentData(data);
        } catch (e) {
            console.error("Failed to fetch student activities:", e);
            setError("Could not load student data. Please try refreshing the page.");
        }
    }, [users]);

    useEffect(() => {
        const loadData = async () => {
            setIsLoading(true);
            await fetchActivities();
            setIsLoading(false);
        }
        loadData();
    }, [fetchActivities]);

    const handleRefresh = useCallback(async () => {
        setIsRefreshing(true);
        await fetchActivities();
        setIsRefreshing(false);
    }, [fetchActivities]);

    useEffect(() => {
        const handleFocusAndVisibility = () => {
            if (document.visibilityState === 'visible') {
                handleRefresh();
            }
        };

        window.addEventListener('focus', handleFocusAndVisibility);
        document.addEventListener('visibilitychange', handleFocusAndVisibility);

        return () => {
            window.removeEventListener('focus', handleFocusAndVisibility);
            document.removeEventListener('visibilitychange', handleFocusAndVisibility);
        };
    }, [handleRefresh]);


    if (isLoading) {
        return (
            <div className="flex justify-center items-center p-12">
                <LoadingIcon className="animate-spin h-10 w-10 text-blue-600" />
                <span className="ml-4 text-lg">Loading Student Data...</span>
            </div>
        );
    }
    
    const formatResult = (result: TestResult) => {
        const percentage = result.total > 0 ? Math.round((result.score / result.total) * 100) : 0;
        return `${result.score}/${result.total} (${percentage}%)`;
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-6xl mx-auto">
                 <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-8 gap-4">
                    <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white sm:text-5xl">Quản lý học viên</h2>
                    <button
                        onClick={handleRefresh}
                        disabled={isRefreshing}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 font-semibold rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isRefreshing ? (
                            <LoadingIcon className="h-5 w-5 animate-spin" />
                        ) : (
                            <RefreshIcon className="h-5 w-5" />
                        )}
                        Sync Latest Activities
                    </button>
                </div>

                {error && (
                    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6" role="alert">
                        <p className="font-bold">Error</p>
                        <p>{error}</p>
                    </div>
                )}

                <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-x-auto">
                    <table className="w-full text-sm text-left text-slate-500 dark:text-slate-400">
                        <thead className="text-xs text-slate-700 dark:text-slate-300 uppercase bg-slate-100 dark:bg-slate-700">
                            <tr>
                                <th scope="col" className="px-6 py-3">Học viên</th>
                                <th scope="col" className="px-6 py-3">Hoạt động gần nhất</th>
                                <th scope="col" className="px-6 py-3">Thời gian</th>
                                <th scope="col" className="px-6 py-3">Kết quả</th>
                                <th scope="col" className="px-6 py-3 text-center">Chi tiết</th>
                            </tr>
                        </thead>
                        <tbody>
                            {studentData.length > 0 ? studentData.map(student => (
                                <tr key={student.username} className="bg-white dark:bg-slate-800 border-b dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-600/50">
                                    <th scope="row" className="px-6 py-4 font-medium text-slate-900 dark:text-white whitespace-nowrap">
                                        {student.username}
                                    </th>
                                    <td className="px-6 py-4">
                                        {student.latestActivity ? student.latestActivity.title : 'No activity'}
                                    </td>
                                    <td className="px-6 py-4">
                                        {student.latestActivity ? new Date(student.latestActivity.date).toLocaleString() : 'N/A'}
                                    </td>
                                    <td className="px-6 py-4 font-semibold">
                                        {student.latestActivity ? formatResult(student.latestActivity) : 'N/A'}
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <button
                                            onClick={() => onViewStudentProgress(student)}
                                            className="font-medium text-blue-600 dark:text-blue-400 hover:underline disabled:text-slate-400 disabled:no-underline"
                                            disabled={!student.latestActivity}
                                            aria-label={`View details for ${student.username}`}
                                        >
                                            Details
                                        </button>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan={5} className="text-center py-10 text-slate-500 dark:text-slate-400">No student data to display.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default StudentManagementScreen;
