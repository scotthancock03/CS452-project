import { Link } from 'react-router-dom'

function NavBar() {
    return (
    <nav className="navbar">
      <div className="nav-logo">
        Inventory Manager
      </div>

      <div className="nav-links">
        <Link to="/inventory">List Items</Link>
        <Link to="/about">About Us</Link>
      </div>
    </nav>
    )
}

export default NavBar;