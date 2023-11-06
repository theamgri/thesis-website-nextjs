import React from 'react';
import Image from 'next/image';
import SearchBar from '../components/Searchbar';
// import logo from '/public/icon.png';
// import SearchBar from './Searchbar';

 

  const Navbar = () => {
    
    return ( // Add a return statement to return the JSX
      <nav className="fixed w-full h-24 shadow-xl">
        <div className="flex justify-between items-center h-full w-full px-4 2xl:px-16">

        <a href="/" className="flex items-center">
          <a>
          
            <Image
              src="/icon.png"
              alt="Gecko Logo"
              className="rounded-full"
              width={40}
              height={40}
              priority
            />
          </a>
          {/* <img src= "/public/icon.png" className="h-8 mr-3 rounded-xl" alt="Logo" /> */}
          <span className="ml-5 self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Gecko</span>
        </a>
       <ul className="hidden sm:flex ">
        <li className="ml-10 uppercase text-xl p-2">
          {/* <SearchBar /> */}
          <SearchBar /> 
        </li>
        <li className="ml-10 uppercase hover:border-b p-2">
        <a>
          
            <Image
              src="/bellbutton.png"
              alt="Gecko Logo"
              className="rounded-full"
              width={40}
              height={40}
              priority
            />
          </a>
        </li>
        <li className="ml-10 uppercase hover:border-b text-md p-4 ">
          Create
        </li>
        <li className="ml-10 uppercase hover:border rounded-full text-xl p-2">
        <a>
          
            <Image
              src="/user.jpg"
              alt="Gecko Logo"
              className="rounded-full"
              width={40}
              height={40}
              priority
            />
          </a>
        </li>
       </ul>
        </div>
       
      </nav>
    );
  };
  
  

export default Navbar;