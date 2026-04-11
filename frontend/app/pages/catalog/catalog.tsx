import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";

export function Catalog() {
    const [books, setBooks] = useState<any[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [genreFilter, setGenreFilter] = useState("All Genres");
    const [loading, setLoading] = useState(true);
    const [addingBooks, setAddingBooks] = useState<{[key: number]: boolean}>({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                // Anyone can view the catalog, but we enforce token for consistency
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
                }
            } catch (error) {
                console.error("Failed to fetch books:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBooks();
    }, [navigate]);

    const handleAddToLibrary = async (bookId: number) => {
        const token = localStorage.getItem("access_token");
        if (!token) return;

        setAddingBooks(prev => ({...prev, [bookId]: true}));
        
        try {
            const response = await fetch(`http://localhost:8000/reading/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ book: bookId })
            });

            if (response.ok || response.status === 201) {
                alert("Book added to your library successfully!");
            } else {
                alert("Failed to add book or it's already in your library.");
            }
        } catch (error) {
            console.error("Failed to add book:", error);
            alert("Error adding book to library.");
        } finally {
            setAddingBooks(prev => ({...prev, [bookId]: false}));
        }
    };

    const filteredBooks = books.filter((b) => {
        const matchesSearch = b.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                              b.author.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesGenre = genreFilter === "All Genres" || b.genre === genreFilter;
        return matchesSearch && matchesGenre;
    });

    const genres = ["All Genres", ...Array.from(new Set(books.map(b => b.genre)))];

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
                </div>
            </div>

            <div className="container-fluid px-md-5">
                <h2 className="fw-bold mb-1">Book Catalog</h2>
                <p className="text-secondary mb-4">Browse and add new books to your personal library.</p>

                <div className="d-flex mb-4 gap-3 align-items-center">
                    <div className="position-relative" style={{ minWidth: '300px' }}>
                        <i className="bi bi-search position-absolute text-secondary" style={{ left: '12px', top: '50%', transform: 'translateY(-50%)' }}></i>
                        <input 
                            type="text" 
                            className="form-control text-light ps-5 py-2 border-0" 
                            placeholder="Search books or authors..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{ backgroundColor: '#1a1a1a', borderRadius: '6px' }}
                        />
                    </div>
                    <div>
                        <select 
                            className="form-select text-light py-2 border-0" 
                            value={genreFilter}
                            onChange={(e) => setGenreFilter(e.target.value)}
                            style={{ backgroundColor: '#1a1a1a', borderRadius: '6px', minWidth: '150px' }}
                        >
                            {genres.map(g => (
                                <option key={g as string} value={g as string}>{g as string}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {loading ? (
                    <div className="text-center py-5">
                        <div className="spinner-border text-success" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                ) : (
                    <div className="row g-4">
                        {filteredBooks.map((book) => {
                            return (
                                <div key={book.id} className="col-12 col-md-6 col-lg-4">
                                    <div 
                                        className="card text-light border-0 h-100 position-relative shadow-sm"
                                        style={{ 
                                            backgroundColor: '#161616',
                                            borderRadius: '12px',
                                            transition: 'all 0.3s ease'
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.transform = 'translateY(-5px)';
                                            e.currentTarget.style.backgroundColor = '#1e1e1e';
                                            e.currentTarget.style.boxShadow = '0 10px 20px rgba(0,0,0,0.5)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.transform = 'none';
                                            e.currentTarget.style.backgroundColor = '#161616';
                                            e.currentTarget.style.boxShadow = 'none';
                                        }}
                                    >
                                        <div className="card-body p-4 d-flex flex-column">
                                            <h6 className="card-title fw-bold mb-1 pe-4 text-success">{book.name}</h6>
                                            <p className="card-subtitle text-secondary mb-3" style={{ fontSize: '0.9rem' }}>{book.author}</p>
                                            
                                            <div className="d-flex justify-content-between mb-4">
                                                <span className="badge bg-secondary">{book.genre}</span>
                                                <span className="text-secondary small">{book.page} pages</span>
                                            </div>
                                            
                                            <div className="mt-auto">
                                                <button 
                                                    className="btn btn-outline-success w-100 rounded-pill"
                                                    onClick={() => handleAddToLibrary(book.id)}
                                                    disabled={addingBooks[book.id]}
                                                >
                                                    {addingBooks[book.id] ? (
                                                        <><span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Adding...</>
                                                    ) : (
                                                        <><i className="bi bi-plus-lg me-2"></i> Add to My Library</>
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}

                        {filteredBooks.length === 0 && (
                            <div className="col-12 py-5">
                                <p className="text-secondary fs-5 text-center">No books match your criteria.</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
