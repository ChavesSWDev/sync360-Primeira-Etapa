import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaUserPlus, FaUsers } from 'react-icons/fa';

const Header = () => {
    const location = useLocation();

    const navItems = [
        { to: '/home', label: 'Home', icon: <FaHome /> },
        { to: '/profile/create', label: 'Novo Usuário', icon: <FaUserPlus /> },
    ];

    return (
        <header className="bg-white shadow-md sticky top-0 z-50">
            <nav className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex flex-wrap justify-center sm:justify-between items-center">
                <h1 className="text-xl font-bold text-green-600 hidden sm:block">
                    Sistema de Usuários
                </h1>
                <ul className="flex flex-wrap gap-4 sm:gap-6 justify-center">
                    {navItems.map(({ to, label, icon }) => (
                        <li key={to}>
                            <Link
                                to={to}
                                className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm sm:text-base transition-all font-medium ${location.pathname === to
                                        ? 'bg-green-100 text-green-700 shadow'
                                        : 'text-gray-600 hover:text-green-600 hover:bg-gray-100'
                                    }`}
                            >
                                {icon}
                                {label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    );
};

export default Header;
