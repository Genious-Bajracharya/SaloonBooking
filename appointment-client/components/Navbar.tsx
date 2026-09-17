'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path 
      ? 'text-blue-600 font-bold border-b-2 border-blue-600 pb-2' 
      : 'text-gray-600 hover:text-blue-600 pb-2 transition';
  };

  return (
    <nav className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/">
            <h1 className="text-2xl font-bold  cursor-pointer hover:text-blue-700">
              Salon Booking
            </h1>
          </Link>

          {/* Navigation Links */}
          <div className="flex space-x-6">
            <Link href="/" className={isActive('/')}>
              Home
            </Link>
            <Link href="/services" className={isActive('/services')}>
              Services
            </Link>
            <Link href="/appointments" className={isActive('/appointments')}>
              Appointments
            </Link>
            <Link href="/bookings" className={isActive('/booking')}>
              Book
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}