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
                            <button className="btn btn-success me-2">Sign up</button>
                            <button className="btn btn-outline-success">
                                <i className="bi bi-box-arrow-in-right me-2"></i>
                                Login
                            </button>
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
                                    <button className="btn btn-success me-2">Get Started</button>
                                    <button className="btn btn-outline-success">
                                        <i className="bi bi-box-arrow-in-right me-2"></i>
                                        Browse Books
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section id="service">
                    <div className="container">
                        <div className="row">
                            <div className="col-4">
                                <div className="card bg-dark text-light border-success shadow rounded-4 h-100">
                                    <div className="card-body">
                                        <i className="bi bi-book-half fs-1 text-success mb-3 d-block"></i>
                                        <p className="fw-bold">Track Progress</p>
                                        <p className="">Monitor your reading progress with detailed tracking for each book you're reading.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-4">
                                <div className="card bg-dark text-light border-success shadow rounded-4 h-100">
                                    <div className="card-body">
                                        <i className="bi bi-bookshelf fs-1 text-success mb-3 d-block"></i>
                                        <p className="fw-bold">Manage Library</p>
                                        <p className="">Organize your books with ratings, notes, and custom categories for easy access.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-4">
                                <div className="card bg-dark text-light border-success shadow rounded-4 h-100">
                                    <div className="card-body">
                                        <i className="bi bi-graph-up fs-1 text-success mb-3 d-block"></i>
                                        <p className="fw-bold">Set Goals</p>
                                        <p className="">Set reading goals and track your achievements to stay motivated and consistent.</p>
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
