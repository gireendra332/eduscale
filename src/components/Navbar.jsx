import { NavLink } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-md navbar-dark sticky-top es-navbar px-4">
      <NavLink to="/" className="navbar-brand es-brand">EduScale.</NavLink>

      <button
        className="navbar-toggler border-0"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navMenu"
        aria-controls="navMenu"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse justify-content-end" id="navMenu">
        <ul className="navbar-nav gap-3">
          <li className="nav-item">
            <NavLink to="/" className={({ isActive }) => `nav-link es-nav-link ${isActive ? 'es-active' : ''}`}>Home</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/about" className={({ isActive }) => `nav-link es-nav-link ${isActive ? 'es-active' : ''}`}>About</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/blog" className={({ isActive }) => `nav-link es-nav-link ${isActive ? 'es-active' : ''}`}>Blog</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/contact" className={({ isActive }) => `nav-link es-nav-link ${isActive ? 'es-active' : ''}`}>Contact</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  )
}
