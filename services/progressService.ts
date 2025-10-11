import { UserProgress, TestResult, ProgressCategory, API_BASE_URL } from '../types';
import { mockFetch } from './apiMock';

/*
--- BACKEND API NOTE ---
The following functions simulate calls to a backend API. The backend should be responsible for:
1.  Authenticating users via a token (e.g., JWT).
2.  Storing user progress in a persistent database (e.g., PostgreSQL, MongoDB).
3.  Ensuring that users can only access and modify their own data.

Example Database Schema (Progress): A table where each row represents a single test result.
- id (PK)
- user_id (FK to users table, linking to the user)
- category (string, e.g., 'reading', 'grammar')
- test_id (string, a unique identifier for the test instance)
- title (string)
- score (integer)
- total (integer)
- date (timestamp)

API Endpoints:
- GET /api/progress/:username -> Returns all progress for a user, grouped by category.
- POST /api/progress/result -> Adds a new test result for the authenticated user.
- DELETE /api/progress/:username -> Deletes all progress for a user (admin-only or user-confirmed).
*/

const getAuthToken = (): string | null => {
    try {
        return localStorage.getItem('authToken');
    } catch {
        return null;
    }
}

const initialProgress: UserProgress = {
    vocabulary: [],
};

export const getProgress = async (username: string): Promise<UserProgress> => {
    const token = getAuthToken();
    if (!token) return { ...initialProgress };

    // In a real app, the username would be derived from the token on the backend.
    // We pass it here to simulate the correct backend logic.
    try {
        console.log(`[CLIENT] Fetching progress for ${username}`);
        const response = await mockFetch(`${API_BASE_URL}/api/progress/${username}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (!response.ok) {
            console.error(`API Error fetching progress: ${response.status}`);
            return { ...initialProgress };
        }
        const progress = await response.json();
        // The backend should return data in the UserProgress format.
        return { ...initialProgress, ...progress };
    } catch (error) {
        console.error("[CLIENT] Network error fetching progress. This is expected in a simulated environment. Returning initial progress.", error);
        return { ...initialProgress };
    }
};

export const addTestResult = async (username: string, category: ProgressCategory, result: TestResult): Promise<void> => {
    const token = getAuthToken();
    if (!token) return;

    try {
        console.log(`[CLIENT] Adding test result for ${username} in category ${category}`);
        const response = await mockFetch(`${API_BASE_URL}/api/progress/result`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ username, category, result })
        });
        if (!response.ok) {
            console.error(`API Error adding test result: ${response.status}`);
        }
    } catch (error) {
        console.error("[CLIENT] Network error adding test result. This is expected in a simulated environment.", error);
    }
};

export const clearProgress = async (username: string): Promise<void> => {
    const token = getAuthToken();
    if (!token) return;

    try {
        console.log(`[CLIENT] Clearing all progress for ${username}`);
        const response = await mockFetch(`${API_BASE_URL}/api/progress/${username}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (!response.ok) {
            console.error(`API Error clearing progress: ${response.status}`);
        }
    } catch (error) {
        console.error("[CLIENT] Network error clearing progress. This is expected in a simulated environment.", error);
    }
};

// This function is now intended for client-side use after data has been fetched,
// primarily in the admin dashboard.
export const getLatestActivity = (progress: UserProgress): TestResult | null => {
    if (!progress) {
        return null;
    }

    const allResults: TestResult[] = Object.values(progress).flat();

    if (allResults.length === 0) {
        return null;
    }

    allResults.sort((a, b) => b.date - a.date);

    return allResults[0];
};