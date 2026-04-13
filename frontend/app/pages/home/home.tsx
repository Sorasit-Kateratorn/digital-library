export function Home() {
    return (
        <>
            <nav className="navbar bg-black navbar-expand-lg border-bottom border-body" data-bs-theme="dark">
                <div className="container-fluid">
                    <a className="navbar-brand d-flex align-items-center fw-bold" href="#">
                        <i className="bi bi-book fs-2 me-2 text-success"></i>
                        BookTracker
                    </a>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <div className="ms-auto">
                            <a href="/signup" className="btn btn-success me-2">Sign up</a>
                            <a href="/login" className="btn btn-outline-success">
                                <i className="bi bi-box-arrow-in-right me-2"></i>
                                Login
                            </a>
                        </div>
                    </div>
                </div>
            </nav>
            <main>
                <section id="hero">
                    <div className="container">
                        <div className="row">
                            <div className="col-12 text-center">
                                <h1 className="mb-2">Track Your Reading Journey</h1>
                                <p className="fs-5 text-secondary mb-4">Monitor your reading progress, rate your favorite books, and achieve your reading goals.</p>
                                <div>
                                    <a href="/login" className="btn btn-success me-2 px-4 rounded-pill">Get Started</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section id="service" className="py-5">
                    <div className="container">
                        <div className="row g-4">
                            <div className="col-md-4">
                                <div 
                                    className="card text-light border-0 shadow-sm h-100"
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
                                    <div className="card-body p-4">
                                        <i className="bi bi-book-half fs-1 text-success mb-3 d-block"></i>
                                        <h5 className="fw-bold mb-3">Track Progress</h5>
                                        <p className="text-secondary">Monitor your reading progress with detailed tracking for each book you're reading.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div 
                                    className="card text-light border-0 shadow-sm h-100"
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
                                    <div className="card-body p-4">
                                        <i className="bi bi-bookshelf fs-1 text-success mb-3 d-block"></i>
                                        <h5 className="fw-bold mb-3">Manage Library</h5>
                                        <p className="text-secondary">Organize your books with ratings, notes and filter categories for easy access.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div 
                                    className="card text-light border-0 shadow-sm h-100"
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
                                    <div className="card-body p-4">
                                        <i className="bi bi-graph-up fs-1 text-success mb-3 d-block"></i>
                                        <h5 className="fw-bold mb-3">Set Goals</h5>
                                        <p className="text-secondary">Set reading goals and track your achievements to stay motivated and consistent.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}
