import React from 'react'

import '../Components/NavBar.css'

import {Link} from 'react-router-dom';

const NavBar = () => {
  return (
   <nav className="flex justify-between items-center px-6 py-4 bg-indigo-700 text-white shadow-md sticky top-0 z-50">
<h1 className="text-2xl font-bold tracking-wide">Online Bookstore</h1>
<ul className="flex gap-8 text-lg">
<li className="cursor-pointer hover:text-gray-200 transition"> <Link to="/"> Home </Link></li>
<li className="cursor-pointer hover:text-gray-200 transition"> <Link to="/books"> Books </Link></li>
<li className="cursor-pointer hover:text-gray-200 transition"><Link to="/contact"> Contact </Link></li>
{/* <li className="cursor-pointer hover:text-gray-200 transition"><Link to="/authors"> Authors </Link></li> */}
<li className="cursor-pointer hover:text-gray-200 transition"><Link to="/login"> Login </Link></li>

</ul>
</nav>
  )



}
  export default NavBar
