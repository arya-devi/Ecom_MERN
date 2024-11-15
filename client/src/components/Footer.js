import React from "react";

function Footer() {
  return (
    <footer className="bg-dark text-light py-4 mt-5">
      <div className="container text-center">
        <p>
          &copy; {new Date().getFullYear()} Your Website Name. All rights
          reserved.
        </p>
        <ul className="list-inline">
          <li className="list-inline-item">
            <a href="/" className="text-light">
              Home
            </a>
          </li>
          <li className="list-inline-item">
            <a href="/about" className="text-light">
              About
            </a>
          </li>
          <li className="list-inline-item">
            <a href="/contact" className="text-light">
              Contact
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
