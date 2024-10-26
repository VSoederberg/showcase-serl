// components/Header.js
import Link from 'next/link'

const Header = () => {
  return (
    <header>
      <div className='container mx-auto flex items-center justify-between'>
        {/* Logo or Brand Name */}
        <div className='text-2xl font-bold'>
          <Link href='/'>ShowCase SERL</Link>
        </div>
        {/* Navigation Links */}
        <nav className='space-x-4'>
          <Link href='/projects'>Projects</Link>
        </nav>
      </div>
    </header>
  )
}

export default Header
