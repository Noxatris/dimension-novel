'use client'

import { useState } from 'react'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="w-full bg-zinc-900 shadow-xl z-50">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between px-6 py-4 xl:py-6">
        {/* Logo et titre */}
        <Link href="/" className="flex items-center space-x-3">
          <img src="/logoAlone.png" alt="Logo" className="h-10 xl:h-14" />
          <span className="text-white text-2xl xl:text-3xl font-semibold medievalFont">
            Dimension Novels
          </span>
        </Link>

        {/* Menu burger (mobile) */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white xl:hidden text-2xl focus:outline-none transition-transform duration-300"
        >
          <FontAwesomeIcon icon={faBars} />
        </button>

        {/* Liens desktop */}
        <ul className="hidden xl:flex space-x-6 text-white text-lg font-medium">
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className="hover:text-pink-500 transition-colors border-b-2 border-transparent hover:border-pink-500 pb-1"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Menu mobile */}
      <div
        className={`xl:hidden overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? 'max-h-60 bg-zinc-900/90 backdrop-blur-md' : 'max-h-0'
        }`}
      >
        <ul className="flex flex-col text-white text-center text-lg font-medium divide-y divide-pink-400">
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                onClick={() => setIsOpen(false)}
                className="block py-4 hover:text-pink-400 transition-colors"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  )
}

const navLinks = [
  { href: '/', label: 'Accueil' },
  { href: '/eternalys', label: 'Eternalys' },
  { href: '/actualites', label: 'Actualité' },
  { href: '/informations', label: 'Information' }
]
