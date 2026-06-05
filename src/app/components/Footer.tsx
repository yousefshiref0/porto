import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Mail, Phone } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-[#F8F5EC] border-t-8 border-primary mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-3xl font-black mb-4">
              PORTFOLIO
            </h3>
            <p className="text-[#F8F5EC]/80 mb-4">
              Building Hardware, Software & Connected Systems
            </p>
            <div className="handwritten text-[#FFD93D] text-lg">
              Let's build something amazing!
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-bold mb-4 border-b-2 border-[#FF6B35] inline-block pb-1">
              QUICK LINKS
            </h4>
            <ul className="space-y-2">
              {['Home', 'About', 'Skills', 'Projects', 'Experience', 'Contact'].map((item) => (
                <li key={item}>
                  <Link
                    to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                    className="hover:text-[#FFD93D] transition-colors inline-flex items-center group"
                  >
                    <span className="border-b-2 border-transparent group-hover:border-[#FFD93D]">
                      {item}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-xl font-bold mb-4 border-b-2 border-[#FF6B35] inline-block pb-1">
              GET IN TOUCH
            </h4>
            <div className="space-y-3">
              <a
                href="mailto:yousefshirefbusiness@gmail.com"
                className="flex items-center gap-2 hover:text-[#FFD93D] transition-colors"
              >
                <Mail size={20} />
                <span>yousefshirefbusiness@gmail.com</span>
              </a>
              <a
                href="tel:+201555578913"
                className="flex items-center gap-2 hover:text-[#FFD93D] transition-colors"
              >
                <Phone size={20} />
                <span>+20 155 557 8913</span>
              </a>
              <div className="flex gap-4 mt-4">
                <a
                  href="https://github.com/yousefshiref0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-[#FF6B35] border-2 border-[#F8F5EC] flex items-center justify-center hover:bg-[#FFD93D] transition-colors"
                >
                  <Github size={20} />
                </a>
                <a
                  href="https://linkedin.com/in/yousefshiref"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-[#FF6B35] border-2 border-[#F8F5EC] flex items-center justify-center hover:bg-[#FFD93D] transition-colors"
                >
                  <Linkedin size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t-2 border-[#F8F5EC]/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-[#F8F5EC]/60 text-sm">
            © {currentYear} Portfolio. All rights reserved.
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link to="/admin" className="text-[#F8F5EC]/60 hover:text-[#FFD93D] text-sm transition-colors">
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
