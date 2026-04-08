export function Login() {
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

                    <form>
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label small fw-bold">Username</label>
                            <input 
                                id="username"
                                type="text" 
                                className="form-control bg-dark text-light border-secondary border-opacity-50" 
                                placeholder="ith007" 
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="password" className="form-label small fw-bold">Password</label>
                            <input 
                                id="password"
                                type="password" 
                                className="form-control bg-dark text-light border-secondary border-opacity-50" 
                                placeholder="••••••••" 
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
