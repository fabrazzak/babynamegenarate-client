'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'

export default function Navbar() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const { user, loading, role,setLoading } = useAuth();

  const links = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
  ]

  const toggleMenu = () => setMenuOpen(!menuOpen)

  return (
    <nav className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-5 flex justify-between items-center">
        {/* Logo */}
        <Link
          href="/"
          className="md:text-3xl text-2xl font-extrabold text-blue-600 tracking-tight"
        >
          BabyName<span className="text-purple-600">Blessing</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`relative text-lg font-medium text-gray-600 hover:text-blue-600 transition duration-300 ${
                pathname === link.href ? 'text-blue-600 font-semibold' : ''
              }`}
            >
              {link.label}
              {pathname === link.href && (
                <span className="block h-0.5 bg-blue-600 absolute -bottom-1 left-0 w-full"></span>
              )}
            </Link>
          ))}
          {(user && !loading && role === 'admin') && 
            <Link
             
              href='/dashboard'
              className={`relative text-lg font-medium text-gray-600 hover:text-blue-600 transition duration-300 ${
                pathname === 'dashboard' ? 'text-blue-600 font-semibold' : ''
              }`}
            >
              Dashboard
              {pathname === '/dashboard' && (
                <span className="block h-0.5 bg-blue-600 absolute -bottom-1 left-0 w-full"></span>
              )}
            </Link>         



          }
             
        </div>

        {/* Mobile Toggle Button */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-gray-700 transition hover:text-blue-600"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        className={`md:hidden bg-white shadow-md px-6 space-y-4 transition-all duration-300 ease-in-out transform origin-top ${
          menuOpen
            ? 'max-h-screen py-4 opacity-100 scale-y-100'
            : 'max-h-0 opacity-0 scale-y-0 overflow-hidden'
        }`}
      >
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => setMenuOpen(false)}
            className={`block text-lg font-medium text-gray-700 hover:text-blue-600 transition ${
              pathname === link.href ? 'text-blue-600 font-semibold' : ''
            }`}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  )
}
