import { Link, Outlet } from "react-router-dom";

export default function Root() {

  return (
    <div className="container">
      <ul className="nav bg-light mb-3 border-bottom">
        <li className="nav-item">
          <Link to="/" className="nav-link">Products</Link>
        </li>
        <li className="nav-item">
          <Link to="/cart" className="nav-link">Cart</Link>
        </li>
      </ul>
      <Outlet/>
    </div>
  )
}