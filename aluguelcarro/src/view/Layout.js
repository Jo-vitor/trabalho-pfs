import React from "react";
import { Link, Outlet } from "react-router-dom";

const Layout = () => {
    return (
        <React.Fragment>
            <nav class="navbar navbar-expand-lg bg-body-tertiary">
                <div class="container-fluid">
                    <a class="navbar-brand" style={{ width: "2%" }}><img style={{ width: "150%", height: "10%" }} src="https://www.zarla.com/images/zarla-allauto-1x1-2400x2400-20211213-cbvb36gj97y79khvm93r.png?crop=1:1,smart&width=250&dpr=2" /></a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNav" style={{ marginLeft: 50 }}>
                        <ul class="navbar-nav">
                            <li class="nav-item">
                                <Link to="home" class="nav-link" aria-current="page">Home</Link>
                            </li>
                            <li class="nav-item">
                                <Link class="nav-link" to="reservas">Reservas</Link>
                            </li>

                        </ul>
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="logout">
                                    Logout
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <Outlet />
        </React.Fragment>
    )
};

export default Layout;