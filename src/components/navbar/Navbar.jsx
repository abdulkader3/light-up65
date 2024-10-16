import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
// import { IoIosLogIn } from "react-icons/io5"; // Updated import path for Io5
import { useSelector, useDispatch } from 'react-redux';
import { BsPersonVcardFill, BsPersonCheckFill } from "react-icons/bs";
import { AiFillMessage } from "react-icons/ai";
import { IoNotificationsCircleSharp } from "react-icons/io5";
// import { IoMdPersonAdd } from "react-icons/io5"; // Updated to Io5
import { FiMenu, FiX } from "react-icons/fi"; // Menu and Close icons
import '../navbar/navbar.css';
import { IoIosLogIn, IoMdPersonAdd } from 'react-icons/io';

export const Navbar = () => {
    // State to manage sidebar visibility
    const [isOpen, setIsOpen] = useState(false);
   
    // Function to toggle sidebar
    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    // Close sidebar when a link is clicked (useful for mobile)
    const handleLinkClick = () => {
        if (isOpen) setIsOpen(false);
    };

    // =========== get data from slices
    const sliceUser = useSelector((state)=>state.counter.value);

    // ========== logout
    const handleLogout = () => {
        // clear the token and redirect to login page
        localStorage.removeItem('sliceUser');
        // You might also want to dispatch a logout action or use a logout function from your auth provider
    };

    return (
        <>
            {/* Toggle Button for Mobile */}
            <button
                className="text-white text-2xl md:hidden fixed top-4 left-4 z-50"
                onClick={toggleSidebar}
                aria-label="Toggle Sidebar"
            >
                {isOpen ? <FiX /> : <FiMenu />}
            </button>

            {/* Sidebar */}
            <nav className={`bg-[#074173] absolute top-0 left-0 h-full px-3 w-64 transform mr-10 ${
                isOpen ? 'translate-x-0' : '-translate-x-full'
            } transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:w-[200px]`}>
                <div className="mt-5 px-5">
                    <h1 className='text-white text-2xl md:text-3xl font-sevillana font-bold '>Chatify</h1>
                </div>
                <div className="main px-5 mt-10 mb-5">
                    <ul className="flex-col flex gap-4">
                        <li>
                            <NavLink 
                                to="/" 
                                onClick={handleLinkClick}
                                className={({ isActive }) => isActive ? "text-[18px] text-white font-medium bg-slate-400 px-3 py-1 rounded-lg flex items-center gap-2" : "text-[18px] px-3 py-1 text-white font-normal flex items-center gap-2"}
                            >
                                <BsPersonVcardFill /> Profile
                            </NavLink>
                        </li>
                        <li>
                            <NavLink 
                                to="/friendPage" 
                                onClick={handleLinkClick}
                                className={({ isActive }) => isActive ? "text-[18px] text-white font-medium bg-slate-400 px-3 py-1 rounded-lg flex items-center gap-2" : "text-[18px] px-3 py-1 text-white font-normal flex items-center gap-2"}
                            >
                                <BsPersonCheckFill /> Friends
                            </NavLink>
                        </li>
                        <li>
                            <NavLink 
                                to="/userPage" 
                                onClick={handleLinkClick}
                                className={({ isActive }) => isActive ? "text-[18px] text-white font-medium bg-slate-400 px-3 py-1 rounded-lg flex items-center gap-2" : "text-[18px] px-3 py-1 text-white font-normal flex items-center gap-2"}
                            >
                                <IoMdPersonAdd /> All User
                            </NavLink>
                        </li>
                        <li>
                            <NavLink 
                                to="/blockPage" 
                                onClick={handleLinkClick}
                                className={({ isActive }) => isActive ? "text-[18px] text-white font-medium bg-slate-400 px-3 py-1 rounded-lg flex items-center gap-2" : "text-[18px] px-3 py-1 text-white font-normal flex items-center gap-2"}
                            >
                                <IoMdPersonAdd /> Blocked
                            </NavLink>
                        </li>
                        <li>
                            <NavLink 
                                to="/chatPage" 
                                onClick={handleLinkClick}
                                className={({ isActive }) => isActive ? "text-[18px] text-white font-medium bg-slate-400 px-3 py-1 rounded-lg flex items-center gap-2" : "text-[18px] px-3 py-1 text-white font-normal flex items-center gap-2"}
                            >
                                <AiFillMessage /> Messages
                            </NavLink>
                        </li>
                        <li>
                            <NavLink 
                                to="/notificationPage" 
                                onClick={handleLinkClick}
                                className={({ isActive }) => isActive ? "text-[18px] text-white font-medium bg-slate-400 px-3 py-1 rounded-lg flex items-center gap-2" : "text-[18px] px-3 py-1 text-white font-normal flex items-center gap-2"}
                            >
                                <IoNotificationsCircleSharp /> Notification
                            </NavLink>
                        </li>
                    </ul>
                </div>
                <div className="mb-5 px-5 flex flex-col gap-5 items-center">
                    <div className="div flex flex-col items-center gap-1">
                        <div className="w-20 h-20 md:w-20 md:h-20 rounded-full overflow-hidden">
                            <img 
                                className='w-full h-full object-cover rounded-full' 
                                src={sliceUser?.photoURL || "https://via.placeholder.com/80"} 
                                alt="User Profile" 
                            />
                        </div>
                        <h4 className="text-white">{sliceUser?.displayName || "User Name"}</h4>
                    </div>
                    <Link 
                        onClick={handleLogout} 
                        to="/loginPage" 
                        className='text-white flex items-center gap-2' 
                        aria-label="Log Out"
                    >
                        Log Out <IoIosLogIn />
                    </Link>
                </div>
            </nav>

            {/* Overlay for Mobile when Sidebar is Open */}
            {isOpen && (
                <div 
                    className="fixed inset-0 bg-black opacity-50 z-40 md:hidden"
                    onClick={toggleSidebar}
                    aria-hidden="true"
                ></div>
            )}
        </>
    );
};
