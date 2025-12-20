import React from 'react';
import Logo from '../assets/logo.jpg';
import { NavLink } from 'react-router-dom';
import ImageA from '../assets/Image.jpg';
import ImageB from '../assets/Image-1.jpg';

const Footer = () => {
  return (
    <footer className="bg-[#b4832e] mt-8 text-white">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <img src={Logo} alt="logo" width={120} height={40} className="rounded-md object-cover" />
              <span className="font-semibold">Accurate Daily Horse Racing Tips</span>
            </div>
            <p className="text-white/80 text-sm">
              Win, Quinella, Pick 6 — fast, reliable, data‑driven predictions to
              boost your betting strategy.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <NavLink to="/" className={({ isActive }) => `hover:underline ${isActive ? 'text-green-300' : 'text-white/90'}`}>Home</NavLink>
              </li>
              <li>
                <NavLink to="/pricing" className={({ isActive }) => `hover:underline ${isActive ? 'text-green-300' : 'text-white/90'}`}>Pricing</NavLink>
              </li>
              <li>
                <NavLink to="/performance" className={({ isActive }) => `hover:underline ${isActive ? 'text-green-300' : 'text-white/90'}`}>Performance</NavLink>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Resources</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-white/90 hover:underline">Terms & Conditions</a></li>
              <li><a href="#" className="text-white/90 hover:underline">Privacy Policy</a></li>
              <li><a href="#" className="text-white/90 hover:underline">FAQs</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Contact</h4>
            <ul className="space-y-2 text-white/90">
              <li className="flex items-center gap-2">
                <i className="bi bi-envelope"></i>
                <a href="mailto:support@racingtips.app" className="hover:underline">support@racingtips.app</a>
              </li>
              <li className="flex items-center gap-2">
                <i className="bi bi-telephone"></i>
                <a href="tel:+18001234567" className="hover:underline">+1 (800) 123-4567</a>
              </li>
            </ul>
            <div className="mt-4 flex gap-3">
              <img src={ImageA} alt="preview-1" className="w-20 h-14 object-cover rounded-md" />
              <img src={ImageB} alt="preview-2" className="w-20 h-14 object-cover rounded-md" />
            </div>
            <div className="mt-4 flex items-center gap-4">
              <a href="#" className="text-white/90 hover:text-white"><i className="bi bi-twitter"></i></a>
              <a href="#" className="text-white/90 hover:text-white"><i className="bi bi-instagram"></i></a>
              <a href="#" className="text-white/90 hover:text-white"><i className="bi bi-facebook"></i></a>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-white/20 pt-6 text-center text-sm text-white/80">
          <span>© {new Date().getFullYear()} RacingTips. All rights reserved.</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer;
