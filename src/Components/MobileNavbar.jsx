import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import logo from "../assets/Logo.png"
import "../Components/component.scss"

function MobileNavbar() {
    const [active, setActive] = useState("home");
    const [openSideBar, setOpenSidebar] = useState(false);
    return (
        <>
            <div className="position-relative">
                <nav className="d-flex justify-content-between align-items-center py-4 mx-3">
                    <Link to="/">
                        <img src={logo} width="160px" alt="Logo" />
                    </Link>
                    <i class={openSideBar ? "d-none" : " fa-solid fa-bars fa-2x text-white"} onClick={() => { setOpenSidebar(true) }}></i>
                </nav>

                <div className={`sidebar ${openSideBar ? 'open' : ''} d-flex flex-column flex-shrink-0 p-3 text-white bg-dark position-fixed`} style={{ width: "280px", top: "0", zIndex: "99999", height: "100vh" }}>
                    <div className="d-flex justify-content-between align-items-center py-2 mb-md-0 me-md-auto text-white text-decoration-none">
                        <Link to="/">
                            <img src={logo} width="160px" alt="Logo" />
                        </Link>
                        <i class="fa-solid fa-times fa-2x" onClick={() => { setOpenSidebar(false) }}></i>
                    </div>
                    <hr />
                    <ul className="nav nav-pills flex-column mb-auto">
                        <li className="nav-item">
                            <Link to="/" className={active === "home" ? "nav-link active" : "nav-link text-white"} aria-current="page" onClick={() => { setActive("home") }}>
                                {/* <svg className="bi me-2" width="16" height="16"><use xlink:href="#home"></use></svg> */}
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link to="/movies&shows" className={active === "movie" ? "nav-link active" : "nav-link text-white"} onClick={() => { setActive("movie") }}>
                                {/* <svg className="bi me-2" width="16" height="16"><use xlink:href="#speedometer2"></use></svg> */}
                                Movie & Shows
                            </Link>
                        </li>
                        <li>
                            <Link to="/support" className={active === "support" ? "nav-link active" : "nav-link text-white"} onClick={() => { setActive("support") }}>
                                {/* <svg className="bi me-2" width="16" height="16"><use xlink:href="#table"></use></svg> */}
                                Support
                            </Link>
                        </li>
                        <li>
                            <Link to="/subscription" className={active === "subscription" ? "nav-link active" : "nav-link text-white"} onClick={() => { setActive("subscription") }}>
                                {/* <svg className="bi me-2" width="16" height="16"><use xlink:href="#grid"></use></svg> */}
                                Subscription
                            </Link>
                        </li>
                    </ul>
                    <hr />
                    <div className="dropdown">
                        <Link href="#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                            <img src="https://github.com/mdo.png" alt="" width="32" height="32" className="rounded-circle me-2" />
                            <strong>mdo</strong>
                        </Link>
                        <ul className="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">
                            <li><Link className="dropdown-item" href="#">New project...</Link></li>
                            <li><Link className="dropdown-item" href="#">Settings</Link></li>
                            <li><Link className="dropdown-item" href="#">Profile</Link></li>
                            <li><hr className="dropdown-divider" /></li>
                            <li><Link className="dropdown-item" href="#">Sign out</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MobileNavbar