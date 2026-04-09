import { useEffect, useState } from "react";

export function Main() {
    const [userStr, setUserStr] = useState<string | null>(null);

    useEffect(() => {
        setUserStr(localStorage.getItem("user"));
    }, []);

    return (
        <div className="min-vh-100 bg-black d-flex flex-column align-items-center justify-content-center text-light">
            <h1 className="text-success mb-4">
                <i className="bi bi-check-circle me-2"></i>Success!
            </h1>
            <p className="fs-4">Successfully logged in or signed up.</p>
            <a href="/" className="btn btn-outline-success mt-4">
                <i className="bi bi-house me-2"></i>Back to Home
            </a>
        </div>
    );
}
