import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";

export function Librarian() {
    const [books, setBooks] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    // Modal state
    const [showAddModal, setShowAddModal] = useState(false);
    const [submittingBook, setSubmittingBook] = useState(false);
    
    // Form state
    const [newName, setNewName] = useState("");
    const [newAuthor, setNewAuthor] = useState("");
    const [newGenre, setNewGenre] = useState("Fiction");
    const [newPageCount, setNewPageCount] = useState<number | "">("");
    const [newPublished, setNewPublished] = useState("");
    const [newCover, setNewCover] = useState("");
    const [currentUser, setCurrentUser] = useState<any>(null);

    const fetchBooks = async () => {
        try {
            const token = localStorage.getItem("access_token");
            if (!token) {
                navigate("/login");
                return;
            }

            const response = await fetch(`http://localhost:8000/book/`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            
            if (response.ok) {
                const data = await response.json();
                setBooks(data);
            } else {
                setError("Failed to fetch the book catalog.");
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
        
        if (!user || (user.role !== 'Librarian' && user.role !== 'Admin')) {
            navigate("/main");
            return;
        }
        
        setCurrentUser(user);
        fetchBooks();
    }, [navigate]);

    const handleAddBook = async () => {
        if (!newName || !newAuthor) {
            alert("Title and Author are required fields.");
            return;
        }

        setSubmittingBook(true);
        try {
            const token = localStorage.getItem("access_token");
            
            const payload: any = {
                name: newName,
                author: newAuthor,
                genre: newGenre,
            };

            const pageCountNumber = parseInt(newPageCount as string, 10);
            if (!isNaN(pageCountNumber)) {
                payload.page = pageCountNumber;
            }
            
            if (newPublished !== "") payload.published = newPublished;
            if (newCover !== "") payload.cover_image = newCover;
            

            const response = await fetch(`http://localhost:8000/book/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (response.ok || response.status === 201) {
                fetchBooks();
                setShowAddModal(false);
                // Reset form
                setNewName("");
                setNewAuthor("");
                setNewGenre("Fiction");
                setNewPageCount("");
                setNewPublished("");
                setNewCover("");
            } else {
                const errData = await response.json();
                alert(`Failed to add book: ${JSON.stringify(errData)}`);
            }
        } catch (err) {
            console.error(err);
            alert("Error trying to process the request.");
        } finally {
            setSubmittingBook(false);
        }
    };

    const handleDelete = async (bookId: number) => {
        alert("Delete feature disabled temporarily to maintain referential integrity safety on the main catalog.");
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
                    {currentUser?.role === 'Admin' && (
                        <Link to="/admin" className="btn btn-outline-secondary text-light rounded-pill px-3 py-1 border-secondary"><i className="bi bi-shield me-1"></i> Admin</Link>
                    )}
                </div>
            </div>

            <div className="container-fluid px-md-5">
                <div className="d-flex justify-content-between align-items-start mb-4">
                    <div>
                        <div className="d-flex align-items-center mb-1">
                            <div className="border border-success rounded d-flex align-items-center justify-content-center me-3" style={{ width: '40px', height: '40px', backgroundColor: 'rgba(25, 135, 84, 0.1)' }}>
                                <i className="bi bi-person-lines-fill text-success fs-4"></i>
                            </div>
                            <h2 className="fw-bold m-0">Librarian Panel</h2>
                        </div>
                        <p className="text-secondary ms-5 ps-2">Manage the book catalog and inventory</p>
                    </div>
                    <button className="btn btn-success rounded-pill px-4" onClick={() => setShowAddModal(true)}>
                        <i className="bi bi-plus-lg me-2"></i> Add Book
                    </button>
                </div>

                <div className="card text-light border-0 shadow-sm mt-4" style={{ backgroundColor: '#161616', borderRadius: '12px' }}>
                    <div className="card-header border-0 bg-transparent pt-4 pb-0 px-4">
                        <h6 className="fw-bold mb-1">Book Catalog</h6>
                        <p className="text-secondary small mb-3">View and manage all books in the library catalog</p>
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
                                            <th className="px-4 py-3 text-secondary small fw-normal">Title</th>
                                            <th className="py-3 text-secondary small fw-normal">Author</th>
                                            <th className="py-3 text-secondary small fw-normal">Genre</th>
                                            <th className="py-3 text-secondary small fw-normal">Pages</th>
                                            <th className="py-3 text-secondary small fw-normal">Published</th>
                                            <th className="px-4 py-3 text-secondary small fw-normal text-end">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {books.length === 0 ? (
                                            <tr>
                                                <td colSpan={6} className="text-center py-4 text-secondary">No books found in catalog.</td>
                                            </tr>
                                        ) : (
                                            books.map(book => (
                                                <tr key={book.id} style={{ borderBottom: '1px solid #222' }}>
                                                    <td className="px-4 py-3 text-truncate" style={{ maxWidth: '200px' }}>{book.name}</td>
                                                    <td className="py-3 text-truncate" style={{ maxWidth: '150px' }}>{book.author}</td>
                                                    <td className="py-3">{book.genre}</td>
                                                    <td className="py-3">{book.page}</td>
                                                    <td className="py-3">{book.published || "N/A"}</td>
                                                    <td className="px-4 py-3 text-end">
                                                        <button 
                                                            className="btn btn-link text-danger p-0 border-0"
                                                            onClick={() => handleDelete(book.id)}
                                                            title="Delete Book"
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
                                <h5 className="modal-title text-success fw-bold">Add New Book</h5>
                                <button type="button" className="btn-close btn-close-white" onClick={() => setShowAddModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-12 mb-3">
                                        <label className="form-label text-secondary small">Title *</label>
                                        <input 
                                            type="text" 
                                            className="form-control text-light border-secondary" 
                                            style={{ backgroundColor: '#222' }}
                                            value={newName}
                                            onChange={(e) => setNewName(e.target.value)}
                                            placeholder="Book title"
                                        />
                                    </div>
                                    <div className="col-12 mb-3">
                                        <label className="form-label text-secondary small">Author *</label>
                                        <input 
                                            type="text" 
                                            className="form-control text-light border-secondary" 
                                            style={{ backgroundColor: '#222' }}
                                            value={newAuthor}
                                            onChange={(e) => setNewAuthor(e.target.value)}
                                            placeholder="Author name"
                                        />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label text-secondary small">Genre</label>
                                        <input 
                                            type="text" 
                                            className="form-control text-light border-secondary" 
                                            style={{ backgroundColor: '#222' }}
                                            value={newGenre}
                                            onChange={(e) => setNewGenre(e.target.value)}
                                            placeholder="e.g. Fiction, Fantasy"
                                        />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label text-secondary small">Page Count</label>
                                        <input 
                                            type="number" 
                                            className="form-control text-light border-secondary" 
                                            style={{ backgroundColor: '#222' }}
                                            value={newPageCount}
                                            onChange={(e) =>
    setNewPageCount(
        e.target.value === "" ? "" : Number(e.target.value)
    )
}
                                            placeholder="e.g. 350"
                                        />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label text-secondary small">Published</label>
                                        <input 
                                            type="text" 
                                            className="form-control text-light border-secondary" 
                                            style={{ backgroundColor: '#222' }}
                                            value={newPublished}
                                            onChange={(e) => setNewPublished(e.target.value)}
                                            placeholder="e.g. 2024"
                                        />
                                    </div>
                                    <div className="col-12">
                                        <label className="form-label text-secondary small">Cover Image URL</label>
                                        <input 
                                            type="url" 
                                            className="form-control text-light border-secondary" 
                                            style={{ backgroundColor: '#222' }}
                                            value={newCover}
                                            onChange={(e) => setNewCover(e.target.value)}
                                            placeholder="https://..."
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer border-0 pt-0">
                                <button type="button" className="btn btn-outline-secondary rounded-pill px-4" onClick={() => setShowAddModal(false)}>Cancel</button>
                                <button 
                                    type="button" 
                                    className="btn btn-success rounded-pill px-4" 
                                    onClick={handleAddBook}
                                    disabled={submittingBook}
                                >
                                    {submittingBook ? 'Adding...' : 'Add Book'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
