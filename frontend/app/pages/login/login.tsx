import { useState } from 'react';
import { useNavigate } from 'react-router';

export function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // 1. Get tokens
            const tokenResponse = await fetch('http://localhost:8000/api/token/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    password
                }),
            });
            
            if (tokenResponse.ok) {
                const tokenData = await tokenResponse.json();
                localStorage.setItem('access_token', tokenData.access);
                localStorage.setItem('refresh_token', tokenData.refresh);
                
                // 2. Get user profile
                const profileResponse = await fetch('http://localhost:8000/user/profile/', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${tokenData.access}`
                    }
                });
                
                if (profileResponse.ok) {
                    const userData = await profileResponse.json();
                    // Store user data to maintain backward compatibility for other components
                    localStorage.setItem('user', JSON.stringify(userData));
                    navigate('/main');
                } else {
                    alert('Could not fetch user profile details');
                }
            } else {
                const errorData = await tokenResponse.json();
                alert(`Login failed: ${errorData.detail || 'Invalid credentials'}`);
            }
        } catch (error) {
            alert(`An error occurred: ${error}`);
        }
    };

    return (
        <div className="min-vh-100 bg-black d-flex flex-column align-items-center justify-content-center py-5 signup-container">
            <div className="mb-4 text-center">
                <a href="/" className="text-decoration-none d-flex align-items-center justify-content-center fw-bold fs-3 text-success">
                    <i className="bi bi-book fs-2 me-2"></i>
                    BookTracker
                </a>
            </div>
            
            <div className="card shadow-lg rounded-4 border border-secondary border-opacity-25 signup-card">
                <div className="card-body p-4 text-light">
                    <h5 className="fw-bold mb-2">Welcome Back</h5>
                    <p className="text-secondary small mb-4">
                        Sign in to your account to continue tracking your reading progress
                    </p>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label small fw-bold">Username</label>
                            <input 
                                id="username"
                                type="text" 
                                className="form-control bg-dark text-light border-secondary border-opacity-50" 
                                placeholder="ith007" 
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="password" className="form-label small fw-bold">Password</label>
                            <input 
                                id="password"
                                type="password" 
                                className="form-control bg-dark text-light border-secondary border-opacity-50" 
                                placeholder="••••••••" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <button type="submit" className="btn btn-success w-100 fw-bold py-2 mt-2 d-flex justify-content-center align-items-center">
                            <i className="bi bi-box-arrow-in-right me-2"></i> Sign In
                        </button>
                    </form>

                    <div className="text-center mt-4 pt-2">
                        <p className="small text-secondary mb-2">
                            Don't have an account? <a href="/signup" className="text-success text-decoration-none">Sign up</a>
                        </p>
                        <a href="/" className="small text-secondary text-decoration-none login-hover-text-light">
                            Back to Home
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
