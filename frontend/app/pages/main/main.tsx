import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";

export function Main() {
    const [readings, setReadings] = useState<any[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [genreFilter, setGenreFilter] = useState("All Genres");
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Modal state
    const [updatingReading, setUpdatingReading] = useState<any | null>(null);
    const [newPage, setNewPage] = useState<number | "">("");
    const [summary, setSummary] = useState("");
    const [newRating, setNewRating] = useState<number>(0);
    const [submittingProgress, setSubmittingProgress] = useState(false);
    const [currentUser, setCurrentUser] = useState<any>(null);

    useEffect(() => {
        const userStr = localStorage.getItem("user");
        if (!userStr) {
            navigate("/login");
            return;
        }

        const user = JSON.parse(userStr);
        setCurrentUser(user);
        fetchReadings(user.id);
    }, [navigate]);

    const fetchReadings = async (userId: number) => {
        try {
            const token = localStorage.getItem("access_token");
            const response = await fetch(`http://localhost:8000/reading/?user_id=${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.ok) {
                const data = await response.json();
                setReadings(data);
            }
        } catch (error) {
            console.error("Failed to fetch readings:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateProgress = async () => {
        if (!updatingReading) return;
        const pageNum = parseInt(newPage as string, 10);
        if (isNaN(pageNum) || pageNum < 0 || pageNum > updatingReading.book.page) {
            alert(`Please enter a valid page number between 0 and ${updatingReading.book.page}.`);
            return;
        }

        setSubmittingProgress(true);
        try {
            const token = localStorage.getItem("access_token");

            // 1. Update Progress Note & Page Number
            const progressResponse = await fetch(`http://localhost:8000/readingprogress/`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    reading: updatingReading.id,
                    page_number: pageNum,
                    summarize: summary,
                }),
            });

            // 2. Update Reading Rating
            const ratingResponse = await fetch(`http://localhost:8000/reading/${updatingReading.id}/`, {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    rating: newRating,
                }),
            });

            if ((progressResponse.ok || progressResponse.status === 201) && ratingResponse.ok) {
                const user = JSON.parse(localStorage.getItem("user") || "{}");
                fetchReadings(user.id);
                setUpdatingReading(null);
                setNewPage("");
                setSummary("");
                setNewRating(0);
            } else {
                alert("Failed to update progress and rating.");
            }
        } catch (error) {
            console.error(error);
            alert("Error updating progress.");
        } finally {
            setSubmittingProgress(false);
        }
    };

    const filteredReadings = readings.filter((r) => {
        const matchesSearch = r.book.name.toLowerCase().includes(searchTerm.toLowerCase()) || r.book.author.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesGenre = genreFilter === "All Genres" || r.book.genre === genreFilter;
        return matchesSearch && matchesGenre;
    });

    const renderStars = (rating: number) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
                stars.push(<i key={i} className="bi bi-star-fill text-success me-1 fs-5"></i>);
            } else {
                stars.push(<i key={i} className="bi bi-star text-secondary me-1 fs-5"></i>);
            }
        }
        return stars;
    };

    const renderInteractiveStars = () => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <i
                    key={i}
                    className={`bi ${i <= newRating ? "bi-star-fill text-success" : "bi-star text-secondary"} me-1 fs-4`}
                    style={{ cursor: "pointer", transition: "color 0.2s" }}
                    onClick={() => setNewRating(i)}
                ></i>,
            );
        }
        return stars;
    };

    const genres = ["All Genres", ...Array.from(new Set(readings.map((r) => r.book.genre)))];

    return (
        <div className="min-vh-100 bg-black text-light p-4 font-monospace" style={{ backgroundColor: "#0f0f0f" }}>
            <div className="d-flex justify-content-between align-items-center mb-5 pb-3 border-bottom" style={{ borderColor: "#222 !important" }}>
                <div className="d-flex align-items-center">
                    <i className="bi bi-book text-success fs-3 me-2"></i>
                    <h4 className="text-success m-0 fw-bold">BookTracker</h4>
                </div>
                <div>
                    <Link to="/" className="btn btn-outline-secondary text-light me-2 rounded-pill px-3 py-1 border-secondary">
                        Home
                    </Link>
                    <Link to="/catalog" className="btn btn-outline-secondary text-light me-2 rounded-pill px-3 py-1 border-secondary">
                        Browse Books
                    </Link>
                    {currentUser?.role === "Admin" && (
                        <Link to="/admin" className="btn btn-outline-secondary text-light rounded-pill px-3 py-1 me-2 border-secondary">
                            <i className="bi bi-shield me-1"></i> Admin
                        </Link>
                    )}
                    {(currentUser?.role === "Librarian" || currentUser?.role === "Admin") && (
                        <Link to="/librarian" className="btn btn-outline-secondary text-light rounded-pill px-3 py-1 border-secondary">
                            <i className="bi bi-person-lines-fill me-1"></i> Librarian
                        </Link>
                    )}
                </div>
            </div>

            <div className="container-fluid px-md-5">
                <h2 className="fw-bold mb-1">My Library</h2>
                <p className="text-secondary mb-4">Manage your books and track your reading progress</p>

                <div className="d-flex mb-4 gap-3 align-items-center">
                    <div className="position-relative" style={{ minWidth: "300px" }}>
                        <i className="bi bi-search position-absolute text-secondary" style={{ left: "12px", top: "50%", transform: "translateY(-50%)" }}></i>
                        <input
                            type="text"
                            className="form-control text-light ps-5 py-2 border-0"
                            placeholder="Search books or authors..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{ backgroundColor: "#1a1a1a", borderRadius: "6px" }}
                        />
                    </div>
                    <div>
                        <select
                            className="form-select text-light py-2 border-0"
                            value={genreFilter}
                            onChange={(e) => setGenreFilter(e.target.value)}
                            style={{ backgroundColor: "#1a1a1a", borderRadius: "6px", minWidth: "150px" }}
                        >
                            {genres.map((g) => (
                                <option key={g as string} value={g as string}>
                                    {g as string}
                                </option>
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
                        {filteredReadings.map((reading) => {
                            const current = reading.current_page || 0;
                            const total = reading.book.page || 1;
                            const progressPercent = Math.min(100, Math.round((current / total) * 100));

                            return (
                                <div key={reading.id} className="col-12 col-md-6 col-lg-4">
                                    <div
                                        className="card text-light border-0 h-100 position-relative shadow-sm"
                                        style={{
                                            backgroundColor: "#161616",
                                            borderRadius: "12px",
                                            transition: "all 0.3s ease",
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.transform = "translateY(-5px)";
                                            e.currentTarget.style.backgroundColor = "#1e1e1e";
                                            e.currentTarget.style.boxShadow = "0 10px 20px rgba(0,0,0,0.5)";
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.transform = "none";
                                            e.currentTarget.style.backgroundColor = "#161616";
                                            e.currentTarget.style.boxShadow = "none";
                                        }}
                                    >
                                        <div className="card-body p-4">
                                            <i
                                                className="bi bi-pencil position-absolute text-success"
                                                style={{ top: "24px", right: "24px", cursor: "pointer", zIndex: 10 }}
                                                onClick={() => {
                                                    setUpdatingReading(reading);
                                                    setNewPage(current);
                                                    setSummary("");
                                                    setNewRating(reading.rating || 0);
                                                }}
                                            ></i>

                                            <div className="d-flex h-100 gap-3">
                                                <div className="flex-shrink-0" style={{ width: "80px" }}>
                                                    <img
                                                        src={reading.book.cover_image || "https://placehold.co/150x225/222/999?text=No+Cover&font=monospace"}
                                                        alt={`${reading.book.name} cover`}
                                                        style={{ width: "100%", objectFit: "cover", aspectRatio: "2/3", borderRadius: "6px", border: "1px solid #333" }}
                                                        onError={(e) => {
                                                            e.currentTarget.src = "https://placehold.co/150x225/222/999?text=No+Cover&font=monospace";
                                                        }}
                                                    />
                                                </div>

                                                <div className="d-flex flex-column flex-grow-1">
                                                    <h6 className="card-title fw-bold mb-1 pe-4">{reading.book.name}</h6>
                                                    <p className="card-subtitle text-secondary mb-3" style={{ fontSize: "0.9rem" }}>
                                                        {reading.book.author}
                                                    </p>

                                                    <div className="d-flex justify-content-between mb-1">
                                                        <span className="text-secondary" style={{ fontSize: "0.85rem" }}>
                                                            Rating
                                                        </span>
                                                        <span className="text-secondary" style={{ fontSize: "0.85rem" }}>
                                                            {reading.book.genre}
                                                        </span>
                                                    </div>
                                                    <div className="mb-3 d-flex">{renderStars(reading.rating)}</div>

                                                    <div className="mb-4">
                                                        <span className="text-secondary d-block mb-1" style={{ fontSize: "0.85rem" }}>
                                                            Latest Note
                                                        </span>
                                                        <p
                                                            className="text-light fst-italic m-0"
                                                            style={{ fontSize: "0.9rem", opacity: 0.8, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}
                                                        >
                                                            {reading.latest_note ? `"${reading.latest_note}"` : "No notes yet"}
                                                        </p>
                                                    </div>

                                                    <div className="mt-auto pt-2">
                                                        <div className="d-flex justify-content-between mb-2">
                                                            <span className="text-secondary" style={{ fontSize: "0.85rem" }}>
                                                                Progress
                                                            </span>
                                                            <span className="text-light fw-bold" style={{ fontSize: "0.85rem" }}>
                                                                {current} / {reading.book.page} pages
                                                            </span>
                                                        </div>
                                                        <div className="progress" style={{ height: "6px", borderRadius: "3px", backgroundColor: "#333" }}>
                                                            <div
                                                                className="progress-bar bg-success"
                                                                role="progressbar"
                                                                style={{ width: `${progressPercent}%`, borderRadius: "3px" }}
                                                                aria-valuenow={progressPercent}
                                                                aria-valuemin={0}
                                                                aria-valuemax={100}
                                                            ></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}

                        {filteredReadings.length === 0 && (
                            <div className="col-12 py-5">
                                <p className="text-secondary fs-5 text-center">No books found in your library. Visit the Catalog to add some!</p>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {updatingReading && (
                <div className="modal d-block" style={{ backgroundColor: "rgba(0,0,0,0.8)" }} tabIndex={-1}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content border-secondary shadow-lg" style={{ backgroundColor: "#1a1a1a" }}>
                            <div className="modal-header border-0 pb-0">
                                <h5 className="modal-title text-success fw-bold">Update Progress</h5>
                                <button type="button" className="btn-close btn-close-white" aria-label="Close" onClick={() => setUpdatingReading(null)}></button>
                            </div>
                            <div className="modal-body">
                                <p className="text-light mb-4">
                                    <strong>{updatingReading.book.name}</strong>
                                </p>

                                <div className="mb-4">
                                    <label className="form-label text-secondary small d-block">Your Rating</label>
                                    <div className="d-flex align-items-center">{renderInteractiveStars()}</div>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="currentPageInput" className="form-label text-secondary small">
                                        Current Page
                                    </label>
                                    <input
                                        id="currentPageInput"
                                        type="number"
                                        className="form-control text-light border-secondary"
                                        style={{ backgroundColor: "#222" }}
                                        value={newPage}
                                        onChange={(e) => setNewPage(e.target.value === "" ? "" : Number(e.target.value))}
                                        min="0"
                                        max={updatingReading.book.page}
                                    />
                                    <div className="form-text text-secondary">Out of {updatingReading.book.page} pages</div>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label text-secondary small">Summary / Notes</label>
                                    <textarea
                                        className="form-control text-light border-secondary"
                                        style={{ backgroundColor: "#222" }}
                                        rows={3}
                                        value={summary}
                                        onChange={(e) => setSummary(e.target.value)}
                                        placeholder="Add a quick note or summary of what you read..."
                                    ></textarea>
                                </div>
                            </div>
                            <div className="modal-footer border-0 pt-0">
                                <button type="button" className="btn btn-outline-secondary rounded-pill px-4" onClick={() => setUpdatingReading(null)}>
                                    Cancel
                                </button>
                                <button type="button" className="btn btn-success rounded-pill px-4" onClick={handleUpdateProgress} disabled={submittingProgress}>
                                    {submittingProgress ? "Saving..." : "Save Progress"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
