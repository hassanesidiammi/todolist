import { Link, NavLink, useNavigate } from "react-router-dom";
import { getCurrentUser } from "../services/auth.service";

const Nave = () => {
  let navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/");
    window.location.reload();
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

          <ul className="navbar-nav ms-auto">
            
              <li className="nav-item">
                
                {
                  getCurrentUser() ? (
                    <a className="nav-link active link link-danger" onClick={logout}>Logout</a>
                  ) : (
                    <NavLink to="/login" className="nav-link">Login</NavLink>
                  )}
              </li>
          </ul>
        </div>
      </div>
    </nav>
    </>
  )
};

export default Nave;
