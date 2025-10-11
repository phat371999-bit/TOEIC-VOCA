import { UserSettings, API_BASE_URL } from '../types';
import { mockFetch } from './apiMock';

/*
--- BACKEND API NOTE ---
The backend should handle storing and retrieving user settings.

Example Database Schema (Settings): A table where each row is a user's settings.
- user_id (PK, FK to users table)
- name (string, nullable)
- email (string, nullable)
- scoreTarget (string, nullable)
- examDate (string, nullable)
- darkMode (boolean, default: false)

API Endpoints:
- GET /api/settings/:username -> Returns the settings object for a user.
- POST /api/settings -> Creates or updates the settings for a user.
*/


const getAuthToken = (): string | null => {
    try {
        return localStorage.getItem('authToken');
    } catch {
        return null;
    }
};

const defaultSettings: UserSettings = {
    name: '',
    email: '',
    scoreTarget: '',
    examDate: '',
    darkMode: false,
};


export const getSettings = async (username: string): Promise<UserSettings> => {
    const token = getAuthToken();
    if (!token) return { ...defaultSettings };
    
    try {
        console.log(`[CLIENT] Fetching settings for ${username}`);
        const response = await mockFetch(`${API_BASE_URL}/api/settings/${username}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!response.ok) {
            console.error(`API Error fetching settings: ${response.status}`);
            return { ...defaultSettings };
        }
        const settings = await response.json();
        return { ...defaultSettings, ...settings };
    } catch (error) {
        console.error("[CLIENT] Network error fetching settings. This is expected in a simulated environment. Returning default settings.", error);
        return { ...defaultSettings };
    }
};

export const saveSettings = async (username: string, settings: UserSettings): Promise<void> => {
    const token = getAuthToken();
    if (!token) return;
    
    try {
        console.log(`[CLIENT] Saving settings for ${username}`);
        const response = await mockFetch(`${API_BASE_URL}/api/settings`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ username, settings })
        });
        if (!response.ok) {
            console.error(`API Error saving settings: ${response.status}`);
        }
    } catch (error) {
        console.error("[CLIENT] Network error saving settings. This is expected in a simulated environment.", error);
    }
};