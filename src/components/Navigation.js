import { Link, useLocation } from "react-router-dom"

function Navigation() {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <nav>
      <h1>Smoothie Shop</h1>
      <Link className={currentPath === '/' ? 'activeLink' : 'Link'} to="/">Home</Link>
      <Link className={currentPath === '/create' ? 'activeLink' : 'Link'} to="/create">Create New Smoothie</Link>
    </nav>
  );
}

export default Navigation