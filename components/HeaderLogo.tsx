import React from 'react'
import Link from 'next/link'
import Image from 'next/image'


const HeaderLogo = () => {
  return (
    <Link
          href='/'
      >
          <div className='item-center hidden lg:flex'> 
            <Image src='/logo.png' alt='logo' width={40} height={40} />
            <p className='font-semibold text-white text-2xl ml-2.5'>Finance Sass</p>
          </div>
    </Link>
  )
}

export default HeaderLogo