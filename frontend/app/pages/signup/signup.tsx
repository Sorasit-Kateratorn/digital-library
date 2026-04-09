import { useState } from "react";
import { useNavigate } from "react-router";
import { signupUser } from "../../api/auth";

export function Signup() {
    const navigate = useNavigate();
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [gender, setGender] = useState("Male");
    const [role, setRole] = useState("User");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await signupUser({
                first_name: firstname,
                last_name: lastname,
                username,
                password,
                gender,
                role,
            });
            if (response.ok) {
                navigate("/main");
            } else {
                const errorData = await response.json();
                alert(`Registration failed: ${JSON.stringify(errorData)}`);
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
                    <h5 className="fw-bold mb-2">Create Account</h5>
                    <p className="text-secondary small mb-4">Sign up to continue tracking your reading progress</p>

                    <form onSubmit={handleSubmit}>
                        <div className="row mb-3">
                            <div className="col-6">
                                <label htmlFor="firstname" className="form-label small fw-bold">
                                    First Name
                                </label>
                                <input
                                    id="firstname"
                                    type="text"
                                    className="form-control bg-dark text-light border-secondary border-opacity-50"
                                    placeholder="Sorasit"
                                    value={firstname}
                                    onChange={(e) => setFirstname(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="col-6">
                                <label htmlFor="lastname" className="form-label small fw-bold">
                                    Last Name
                                </label>
                                <input
                                    id="lastname"
                                    type="text"
                                    className="form-control bg-dark text-light border-secondary border-opacity-50"
                                    placeholder="Kateratorn"
                                    value={lastname}
                                    onChange={(e) => setLastname(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="username" className="form-label small fw-bold">
                                Username
                            </label>
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

                        <div className="mb-3">
                            <label htmlFor="password" className="form-label small fw-bold">
                                Password
                            </label>
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

                        <div className="row mb-4">
                            <div className="col-6">
                                <label htmlFor="gender" className="form-label small fw-bold">
                                    Gender
                                </label>
                                <select id="gender" className="form-select bg-dark text-light border-secondary border-opacity-50" value={gender} onChange={(e) => setGender(e.target.value)}>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            </div>
                            <div className="col-6">
                                <label htmlFor="role" className="form-label small fw-bold">
                                    Role
                                </label>
                                <select id="role" className="form-select bg-dark text-light border-secondary border-opacity-50" value={role} onChange={(e) => setRole(e.target.value)}>
                                    <option value="User">User</option>
                                    <option value="Admin">Admin</option>
                                    <option value="Librarian">Librarian</option>
                                </select>
                            </div>
                        </div>

                        <button type="submit" className="btn btn-success w-100 fw-bold py-2 mt-2 d-flex justify-content-center align-items-center">
                            <i className="bi bi-box-arrow-in-right me-2"></i> Register
                        </button>
                    </form>

                    <div className="text-center mt-4 pt-2">
                        <p className="small text-secondary mb-2">
                            Already have an account?{" "}
                            <a href="/login" className="text-success text-decoration-none">
                                Sign in
                            </a>
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
