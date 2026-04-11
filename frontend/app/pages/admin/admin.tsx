import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";

export function Admin() {
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    // Modal state
    const [showAddModal, setShowAddModal] = useState(false);
    const [newUsername, setNewUsername] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newRole, setNewRole] = useState("User");
    const [submittingUser, setSubmittingUser] = useState(false);
    const [currentUser, setCurrentUser] = useState<any>(null);

    const fetchUsers = async () => {
        try {
            const token = localStorage.getItem("access_token");
            if (!token) {
                navigate("/login");
                return;
            }

            const response = await fetch(`http://localhost:8000/user/`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            
            if (response.ok) {
                const data = await response.json();
                setUsers(data);
            } else if (response.status === 403) {
                setError("Forbidden. Admin access required.");
            } else {
                setError("Failed to fetch user accounts.");
            }
        } catch (err) {
            console.error(err);
            setError("An error occurred while fetching data.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const userStr = localStorage.getItem("user");
        const user = userStr ? JSON.parse(userStr) : null;
        
        if (!user || user.role !== 'Admin') {
            navigate("/main");
            return;
        }
        
        setCurrentUser(user);
        fetchUsers();
    }, [navigate]);

    const handleAddUser = async () => {
        if (!newUsername || !newPassword) {
            alert("Username and password are required.");
            return;
        }

        setSubmittingUser(true);
        try {
            const token = localStorage.getItem("access_token");
            const response = await fetch(`http://localhost:8000/user/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: newUsername,
                    password: newPassword,
                    role: newRole
                })
            });

            if (response.ok || response.status === 201) {
                fetchUsers();
                setShowAddModal(false);
                setNewUsername("");
                setNewPassword("");
                setNewRole("User");
            } else {
                const errData = await response.json();
                alert(`Failed to add user: ${JSON.stringify(errData)}`);
            }
        } catch (err) {
            console.error(err);
            alert("Error trying to process the request.");
        } finally {
            setSubmittingUser(false);
        }
    };

    const handleDelete = async (userId: number) => {
        if (!confirm("Are you sure you want to delete this user? This action cannot be undone.")) return;

        try {
            const token = localStorage.getItem("access_token");
            const response = await fetch(`http://localhost:8000/user/${userId}/`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok || response.status === 204) {
                setUsers(users.filter(u => u.id !== userId));
            } else {
                alert("Failed to delete the user. You may not have administrative privileges.");
            }
        } catch (err) {
            console.error(err);
            alert("An error occurred while attempting to delete.");
        }
    };

    const getRoleColor = (role: string) => {
        switch (role) {
            case 'Admin': return 'text-danger';
            case 'Librarian': return 'text-primary';
            default: return 'text-light';
        }
    };

    const formatDate = (dateString: string) => {
        if (!dateString) return "N/A";
        const date = new Date(dateString);
        return date.toISOString().split('T')[0]; // Format as YYYY-MM-DD
    };

    return (
        <div className="min-vh-100 bg-black text-light p-4 font-monospace" style={{ backgroundColor: '#0f0f0f' }}>
            <div className="d-flex justify-content-between align-items-center mb-5 pb-3 border-bottom" style={{ borderColor: '#222 !important' }}>
                <div className="d-flex align-items-center">
                    <i className="bi bi-book text-success fs-3 me-2"></i>
                    <h4 className="text-success m-0 fw-bold">BookTracker</h4>
                </div>
                <div>
                    <Link to="/" className="btn btn-outline-secondary text-light me-2 rounded-pill px-3 py-1 border-secondary">Home</Link>
                    <Link to="/main" className="btn btn-outline-secondary text-light me-2 rounded-pill px-3 py-1 border-secondary">My Library</Link>
                    <Link to="/catalog" className="btn btn-outline-secondary text-light me-2 rounded-pill px-3 py-1 border-secondary">Browse Books</Link>
                    {(currentUser?.role === 'Librarian' || currentUser?.role === 'Admin') && (
                        <Link to="/librarian" className="btn btn-outline-secondary text-light rounded-pill px-3 py-1 border-secondary"><i className="bi bi-person-lines-fill me-1"></i> Librarian</Link>
                    )}
                </div>
            </div>

            <div className="container-fluid px-md-5">
                <div className="d-flex justify-content-between align-items-start mb-4">
                    <div>
                        <div className="d-flex align-items-center mb-1">
                            <div className="border border-success rounded d-flex align-items-center justify-content-center me-3" style={{ width: '40px', height: '40px', backgroundColor: 'rgba(25, 135, 84, 0.1)' }}>
                                <i className="bi bi-shield text-success fs-4"></i>
                            </div>
                            <h2 className="fw-bold m-0">Admin Panel</h2>
                        </div>
                        <p className="text-secondary ms-5 ps-2">Manage user accounts and permissions</p>
                    </div>
                    <button className="btn btn-success rounded-pill px-4" onClick={() => setShowAddModal(true)}>
                        <i className="bi bi-person-plus me-2"></i> Add User
                    </button>
                </div>

                <div className="card text-light border-0 shadow-sm mt-4" style={{ backgroundColor: '#161616', borderRadius: '12px' }}>
                    <div className="card-header border-0 bg-transparent pt-4 pb-0 px-4">
                        <h6 className="fw-bold mb-1">User Accounts</h6>
                        <p className="text-secondary small mb-3">View and manage all user accounts in the system</p>
                    </div>
                    <div className="card-body p-0">
                        {loading ? (
                            <div className="text-center py-5">
                                <div className="spinner-border text-success" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div>
                        ) : error ? (
                            <div className="text-center py-5">
                                <p className="text-danger fs-5">{error}</p>
                            </div>
                        ) : (
                            <div className="table-responsive">
                                <table className="table table-dark table-hover table-borderless align-middle m-0" style={{ backgroundColor: 'transparent' }}>
                                    <thead style={{ borderBottom: '1px solid #2a2a2a' }}>
                                        <tr>
                                            <th className="px-4 py-3 text-secondary small fw-normal">Username</th>
                                            <th className="py-3 text-secondary small fw-normal">Role</th>
                                            <th className="py-3 text-secondary small fw-normal">Joined Date</th>
                                            <th className="px-4 py-3 text-secondary small fw-normal text-end">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.length === 0 ? (
                                            <tr>
                                                <td colSpan={4} className="text-center py-4 text-secondary">No users found.</td>
                                            </tr>
                                        ) : (
                                            users.map(user => (
                                                <tr key={user.id} style={{ borderBottom: '1px solid #222' }}>
                                                    <td className="px-4 py-3">{user.username}</td>
                                                    <td className="py-3">
                                                        <span className={getRoleColor(user.role)}>
                                                            {user.role}
                                                        </span>
                                                    </td>
                                                    <td className="py-3">{formatDate(user.date_joined)}</td>
                                                    <td className="px-4 py-3 text-end">
                                                        <button 
                                                            className="btn btn-link text-danger p-0 border-0"
                                                            onClick={() => handleDelete(user.id)}
                                                            title="Delete User"
                                                        >
                                                            <i className="bi bi-trash"></i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {showAddModal && (
                <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.8)' }} tabIndex={-1}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content border-secondary shadow-lg" style={{ backgroundColor: '#1a1a1a' }}>
                            <div className="modal-header border-0 pb-0">
                                <h5 className="modal-title text-success fw-bold">Add New User</h5>
                                <button type="button" className="btn-close btn-close-white" onClick={() => setShowAddModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label className="form-label text-secondary small">Username *</label>
                                    <input 
                                        type="text" 
                                        className="form-control text-light border-secondary" 
                                        style={{ backgroundColor: '#222' }}
                                        value={newUsername}
                                        onChange={(e) => setNewUsername(e.target.value)}
                                        placeholder="Enter username"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label text-secondary small">Password *</label>
                                    <input 
                                        type="password" 
                                        className="form-control text-light border-secondary" 
                                        style={{ backgroundColor: '#222' }}
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        placeholder="Enter solid password"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label text-secondary small">Role</label>
                                    <select 
                                        className="form-select text-light border-secondary" 
                                        style={{ backgroundColor: '#222' }}
                                        value={newRole}
                                        onChange={(e) => setNewRole(e.target.value)}
                                    >
                                        <option value="User">User</option>
                                        <option value="Librarian">Librarian</option>
                                        <option value="Admin">Admin</option>
                                    </select>
                                </div>
                            </div>
                            <div className="modal-footer border-0 pt-0">
                                <button type="button" className="btn btn-outline-secondary rounded-pill px-4" onClick={() => setShowAddModal(false)}>Cancel</button>
                                <button 
                                    type="button" 
                                    className="btn btn-success rounded-pill px-4" 
                                    onClick={handleAddUser}
                                    disabled={submittingUser}
                                >
                                    {submittingUser ? 'Adding...' : 'Add User'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
