import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import '../../../styles/Layout.css';

const Sidebar = () => {
    const location = useLocation();
    // get user state
    const { user } = useSelector(state => state.auth);

    return (
        <div className='sidebar'>
            <div className='menu'>
                {user?.role === 'organisation' && (
                    <>
                        <div className={`menu-item ${location.pathname === "/" ?
                             "active" : ""}`}>
                            <i className="fa-solid fa-warehouse"></i>
                            <Link to='/'>Inventory</Link>
                        </div>
                        <div className={`menu-item ${location.pathname === "/donor" ? 
                            "active" : ""}`}>
                            <i className="fa-solid fa-hand-holding-medical"></i>
                            <Link to='/donor'>Donor</Link>
                        </div>
                        <div className={`menu-item ${location.pathname === "/hospitals" ?
                             "active" : ""}`}>
                            <i className="fa-solid fa-hospital"></i>
                            <Link to='/hospitals'>Hospital</Link>
                        </div>
                    </>
                )}

                 {user?.role === 'admin' && (
                    <>
                        <div className={`menu-item ${location.pathname === "/donor-list" ?
                             "active" : ""}`}>
                            <i className="fa-solid fa-warehouse"></i>
                            <Link to='/donor-list'>Donors List</Link>
                        </div>
                        <div className={`menu-item ${location.pathname === "/hospital-list" ? 
                            "active" : ""}`}>
                            <i className="fa-solid fa-hand-holding-medical"></i>
                            <Link to='/hospital-list'>Hospitals List </Link>
                        </div>
                        <div className={`menu-item ${location.pathname === "/org-list" ?
                             "active" : ""}`}>
                            <i className="fa-solid fa-hospital"></i>
                            <Link to='/org-list'>Organisation List</Link>
                        </div>
                    </>
                )}

                {(user?.role === 'donor' || user?.role ==='hospital') && (
                    <div className={`menu-item ${location.pathname === "/organisation" ?
                     "active" : ""}`}>
                        <i className="fa-solid fa-building-ngo"></i>
                        <Link to='/organisation'>Organisation</Link>
                    </div>
                )}

                { user?.role ==='hospital'  && (
                    <div className={`menu-item ${location.pathname === "/consumer" ?
                     "active" : ""}`}>
                        <i className="fa-solid fa-building-ngo"></i>
                        <Link to='/consumer'> Consumer</Link>
                    </div>
                )}

                { user?.role ==='donor'  && (
                    <div className={`menu-item ${location.pathname === "/donations" ?
                     "active" : ""}`}>
                        <i className="fa-solid fa-building-ngo"></i>
                        <Link to='/donations'> Donation</Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Sidebar;

               {/*} {userMenu.map((menu) => {
                    const isActive = location.pathname === menu.path;
                    return (
                        <div key={menu.path} className={`menu-item ${isActive ? 'active' : ''}`}>
                            <i className={menu.icon}></i>
                            <Link to={menu.path}>{menu.name}</Link>
                        </div>
                    );
                })}*/}

