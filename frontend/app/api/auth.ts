const API_URL = 'http://localhost:8000';

export async function loginUser(data: any) {
    const response = await fetch(`${API_URL}/api/token/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    return response;
}

export async function getUserProfile(token: string) {
    const response = await fetch(`${API_URL}/user/profile/`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return response;
}

export async function signupUser(data: any) {
    const response = await fetch(`${API_URL}/user/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    return response;
}

export async function refreshToken() {
    const refresh = localStorage.getItem('refresh_token');
    if (!refresh) throw new Error("No refresh token");

    const response = await fetch(`${API_URL}/api/token/refresh/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refresh }),
    });
    return response;
}

export function logoutUser() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
}
