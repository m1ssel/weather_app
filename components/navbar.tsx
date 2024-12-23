import React from 'react';
import { FaSearch } from 'react-icons/fa';
import Image from 'next/image';

const Navbar = () => {
    return (
        <nav className='shadow-sm sticky top-0 left-0 z-50 text-white'>
            <div className='h-20 flex items-center justify-around bg-nav'>
                <div className=''>
                    <Image
                        src='/chill.webp'
                        alt='logo'
                        width={150}
                        height={150}
                    />
                    {/* <img src='chill.jpg' alt='asd' /> */}
                </div>
                <div className='flex items-center bg-primary'>
                    <input
                        type='text'
                        placeholder='Search for your city'
                        className='placeholder:text-gray-400 text-black outline-none pl-2 py-2 rounded-l-lg'
                    />
                    <div className='flex items-center justify-center text-gray-400 p-2 h-10 w-11 border-l-[2px] border-r-0 border-t-0 border-b-0 border-solid cursor-pointer bg-white rounded-r-lg'>
                        <FaSearch />
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
