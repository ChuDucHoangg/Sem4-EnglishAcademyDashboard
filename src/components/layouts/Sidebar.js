import { Link, NavLink } from "react-router-dom";

function Sidebar() {
    return (
        <nav className="pc-sidebar">
            <div className="navbar-wrapper">
                <div className="m-header">
                    <Link to="/" className="b-brand text-primary">
                        <img src="../assets/images/logo.png" alt="" className="img-fluid" />
                    </Link>
                </div>
                <div className="navbar-content">
                    <div className="card pc-user-card">
                        <div className="card-body">
                            <div className="d-flex align-items-center">
                                <div className="flex-shrink-0">
                                    <img src="../assets/images/user/avatar-1.jpg" alt="" className="user-avtar wid-45 rounded-circle" />
                                </div>
                                <div className="flex-grow-1 ms-3 me-2">
                                    <h6 className="mb-0">Jonh Smith</h6>
                                    <small>Administrator</small>
                                </div>
                                <a className="btn btn-icon btn-link-secondary avtar" data-bs-toggle="collapse" href="#pc_sidebar_userlink">
                                    <svg className="pc-icon">
                                        <use xlinkHref="#custom-sort-outline"></use>
                                    </svg>
                                </a>
                            </div>
                            <div className="collapse pc-user-links" id="pc_sidebar_userlink">
                                <div className="pt-3">
                                    <Link to="profile">
                                        <i className="ti ti-user"></i>
                                        <span>My Account</span>
                                    </Link>
                                    <a href="#!">
                                        <i className="ti ti-settings"></i>
                                        <span>Settings</span>
                                    </a>
                                    <a href="#!">
                                        <i className="ti ti-lock"></i>
                                        <span>Lock Screen</span>
                                    </a>
                                    <a href="#!">
                                        <i className="ti ti-power"></i>
                                        <span>Logout</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <ul className="pc-navbar">
                        <li className="pc-item pc-caption">
                            <label>Dashboard</label>
                        </li>
                        <li className="pc-item pc-hasmenu">
                            <NavLink to="/" className="pc-link">
                                <span className="pc-micon">
                                    <svg className="pc-icon">
                                        <use xlinkHref="#custom-status-up"></use>
                                    </svg>
                                </span>
                                <span className="pc-mtext">Dashboard</span>
                            </NavLink>
                        </li>

                        <li className="pc-item pc-caption">
                            <label>Course & Lesson</label>
                        </li>
                        <li className="pc-item pc-hasmenu">
                            <NavLink to="/course-online" className="pc-link">
                                <span className="pc-micon">
                                    <i className="fas fa-book-reader"></i>
                                </span>
                                <span className="pc-mtext">Course Online</span>
                            </NavLink>
                        </li>
                        <li className="pc-item pc-hasmenu">
                            <NavLink to="/lesson" className="pc-link">
                                <span className="pc-micon">
                                    <i className="fas fa-book-open"></i>
                                </span>
                                <span className="pc-mtext">Lesson</span>
                            </NavLink>
                        </li>

                        <li className="pc-item pc-caption">
                            <label>Exam & Test</label>
                        </li>
                        <li className="pc-item pc-hasmenu">
                            <NavLink to="/exam" className="pc-link">
                                <span className="pc-micon">
                                    <i className="fas fa-scroll"></i>
                                </span>
                                <span className="pc-mtext">Exam</span>
                            </NavLink>
                        </li>
                        <li className="pc-item pc-hasmenu">
                            <NavLink to="/test" className="pc-link">
                                <span className="pc-micon">
                                    <i className="fas fa-edit"></i>
                                </span>
                                <span className="pc-mtext">Test</span>
                            </NavLink>
                        </li>
                        <li className="pc-item pc-hasmenu">
                            <NavLink to="/entrance-test" className="pc-link">
                                <span className="pc-micon">
                                    <i className="fas fa-inbox"></i>
                                </span>
                                <span className="pc-mtext">Entrance Test</span>
                            </NavLink>
                        </li>
                        <li className="pc-item pc-hasmenu">
                            <NavLink to="/question" className="pc-link">
                                <span className="pc-micon">
                                    <i className="fas fa-info-circle"></i>
                                </span>
                                <span className="pc-mtext">Question</span>
                            </NavLink>
                        </li>

                        <li className="pc-item pc-caption">
                            <label>Timetable</label>
                        </li>
                        <li className="pc-item pc-hasmenu">
                            <NavLink to="/timetable" className="pc-link">
                                <span className="pc-micon">
                                    <i className="fas fa-calendar-alt"></i>
                                </span>
                                <span className="pc-mtext">Timetable</span>
                            </NavLink>
                        </li>

                        <li className="pc-item pc-caption">
                            <label>Class & Room</label>
                        </li>
                        <li className="pc-item pc-hasmenu">
                            <NavLink to="/class" className="pc-link">
                                <span className="pc-micon">
                                    <i className="fas fa-chalkboard-teacher"></i>
                                </span>
                                <span className="pc-mtext">Class</span>
                            </NavLink>
                        </li>
                        <li className="pc-item pc-hasmenu">
                            <NavLink to="/classroom" className="pc-link">
                                <span className="pc-micon">
                                    <i className="fas fa-door-open"></i>
                                </span>
                                <span className="pc-mtext">Classroom</span>
                            </NavLink>
                        </li>
                        <li className="pc-item pc-hasmenu">
                            <NavLink to="/device" className="pc-link">
                                <span className="pc-micon">
                                    <i className="fas fa-network-wired"></i>
                                </span>
                                <span className="pc-mtext">Device</span>
                            </NavLink>
                        </li>

                        <li className="pc-item pc-caption">
                            <label>Student</label>
                        </li>
                        <li className="pc-item pc-hasmenu">
                            <NavLink to="/student" className="pc-link">
                                <span className="pc-micon">
                                    <i className="fas fa-user-graduate"></i>
                                </span>
                                <span className="pc-mtext">Student</span>
                            </NavLink>
                        </li>

                        <li className="pc-item pc-caption">
                            <label>Staff</label>
                        </li>
                        <li className="pc-item pc-hasmenu">
                            <NavLink to="/staff" className="pc-link">
                                <span className="pc-micon">
                                    <i className="fas fa-users"></i>
                                </span>
                                <span className="pc-mtext">Staff</span>
                            </NavLink>
                        </li>

                        <li className="pc-item pc-caption">
                            <label>Information</label>
                            <svg className="pc-icon">
                                <use xlinkHref="#custom-user-square"></use>
                            </svg>
                        </li>
                        <li className="pc-item">
                            <NavLink to="/profile" className="pc-link">
                                <span className="pc-micon">
                                    <svg className="pc-icon">
                                        <use xlinkHref="#custom-user-square"></use>
                                    </svg>
                                </span>
                                <span className="pc-mtext">Profile</span>
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Sidebar;
