import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-dark text-light py-3 mt-auto">
      <div className="container d-flex justify-content-between align-items-center">
        <small>© {new Date().getFullYear()} GreekMyth — Demo</small>
        <div>
          <a className="text-light me-2" href="https://thegreekmythapi.vercel.app/" target="_blank" rel="noreferrer">API</a>
          <a className="text-light" href="#" onClick={(e)=>e.preventDefault()}>Sobre</a>
        </div>
      </div>
    </footer>
  );
}
