import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

const Navbar = () => {

    const navLinks = [
        {
          title: "Donation Requests",
          url: "/donation-requests",
        },
        {
          title: "Blog",
          url: "/blog",
        },
        
      ];

  return (
    <div className="navbar bg-base-100 dark:bg-white ">
      <div className="navbar-start">
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost lg:hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-primary text-white rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {navLinks.map((link) => (
              <li key={link.url}>
                <Link href={link.url}>{link.title}</Link>
              </li>
            ))}
          </ul>
        </div>
        <Link href={"/"}>
          <Image
            src={"/bloodBridge-logo2.png"}
            // layout='responsive'
            objectFit="contain"
            width={150}
            height={100}
            className="cursor-pointer"
            alt="Blood Bridge Website Logo"
          />
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="text-sm  menu-horizontal gap-x-16 px-1 transition-all duration-300">
          {navLinks.map((link) => (
            <li
              key={link.url}
              className=" hover:bg-primary hover:text-primary-content p-3 rounded-lg transition-all duration-150"
            >
              <Link href={link.url}>{link.title}</Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="navbar-end">
        <a className="hover:bg-primary hover:text-primary-content p-3 rounded-lg transition-all duration-150">
          Login
        </a>
      </div>
    </div>
  );
}

export default Navbar