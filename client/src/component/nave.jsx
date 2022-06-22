import { Link, NavLink, useNavigate } from "react-router-dom";
import { logout } from "../utils/api";

const Nave = (props) => {
  const navigate = useNavigate();

  const logout = () => {
    props.handleLogout();
    navigate('/')
  }

  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">Home</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink to="/todos" className="nav-link" >Todos</NavLink>
            </li>
          </ul>

          <div className="navbar-nav ms-auto">
          {
            props.currentUser &&

            <div className="navbar-item" href="#">
              <span>{props.currentUser.username}</span>&nbsp;&nbsp;
              <a className="active" onClick={logout}>Logout</a>
            </div> ||

            <NavLink to="/login" className="nav-link">Login</NavLink>
          }
          </div>
        </div>
      </div>
    </nav>
    </>
  )
};

export default Nave;
