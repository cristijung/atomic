'use client';
import React, { useState } from "react"; 
import TextMenu from "../../atoms/textMenu/TextMenu";

import { FaHome, FaScroll, FaBookOpen, FaUsers, FaFilm, FaBars, FaTimes } from "react-icons/fa";

export default function NavBar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); 
    const iconSize = "h-5 w-5"; 

   const menuItems = [
        { href: '/', texto: "Home", icon: <FaHome className={iconSize} /> },
        { href: '/historia', texto: "História", icon: <FaScroll className={iconSize} /> },
        { href: '/livros', texto: "Livros", icon: <FaBookOpen className={iconSize} /> },
        { href: '/personagens', texto: "Personagens", icon: <FaUsers className={iconSize} /> },
        { href: '/wallpapers', texto: "WallPapers", icon: <FaFilm className={iconSize} /> },
        { href: '/formContato', texto: "Contato", icon: <FaFilm className={iconSize} /> },        
    ];

    return (
        <>
            <nav className="bg-gray-800 p-4 text-white">
                <div className="container mx-auto flex items-center justify-between">                  
                    <div className="text-xl font-bold">
                        {/* logoAqui ou <Link href="/">Meu Site</Link> */}
                    </div>

                    {/* menu desktop */}
                    <div className="hidden md:flex space-x-4">
                        {menuItems.map((item) => (
                            <TextMenu
                                key={item.texto}
                                href={item.href}
                                texto={item.texto}
                                iconElement={item.icon}
                            />
                        ))}
                    </div>

                    {/* btn hamburguer mobile */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            aria-label="Abrir menu"
                            className="text-white focus:outline-none"
                        >
                            {isMobileMenuOpen ? (
                                <FaTimes className="h-6 w-6" /> 
                            ) : (
                                <FaBars className="h-6 w-6" /> 
                            )}
                        </button>
                    </div>
                </div>

                {/* menu Mobile Dropdown */}
                {isMobileMenuOpen && (
                    <div className="md:hidden bg-gray-800 py-2"> 
                        {menuItems.map((item) => (
                            <TextMenu
                                key={`${item.texto}-mobile`} 
                                href={item.href}
                                texto={item.texto}
                                iconElement={item.icon}                                
                            />
                        ))}
                    </div>
                )}
            </nav>
        </>
    );
}