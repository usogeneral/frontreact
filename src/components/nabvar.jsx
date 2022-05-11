import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ logeado, metodoBusqueda, setLogeado }) => {
  const user = JSON.parse(window.localStorage.getItem('user'));
  const [text, setText] = useState({
    text: ""
  });

  const handleBusqueda = (e) => {
    const { name, value } = e.target;
    setText({ ...text, [name]: value });
  }

  const buscar = () => {
    if (text.text.length > 0) {
      metodoBusqueda(text.text);
    } else {
      window.location.reload();
    }
  }

  useEffect(() => {
    if (user) {
      setLogeado(true);
    }
    // eslint-disable-next-line
  }, [logeado]);

  return (
    <nav className='navbar navbar-expand-lg menu-bar'>
      <div className='container-fluid'>
        <Link className='navbar-brand' to='/'>
          Trabajos 24/7
        </Link>
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarSupportedContent'
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'>
            <i className='bx bx-menu'></i>
          </span>
        </button>
        <div className='collapse navbar-collapse' id='navbarSupportedContent'>
          <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
            {logeado ? (
              <li className='nav-item'>
                <Link className='nav-link usuario-nombre' to='/dashboard'>
                  {user.usuarioDB.nombres} {user.usuarioDB.apellidos}
                </Link>
              </li>
            ) : (
              <>
                <li className='nav-item'>
                  <Link className='nav-link' to='/login'>
                    Iniciar Sesión
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/registro">Registrarse</Link>
                </li>
              </>
            )}

            {/* <li><button onClick={props.test()}>Ola</button></li> */}
          </ul>
          <div className="d-flex">
            <input className="form-control me-2 txtBusqueda" type="search" name="text" placeholder="Buscar Oferta" aria-label="Buscar Oferta" onChange={handleBusqueda} />
            <button className="btn btnSearch" onClick={buscar}><i className='bx bx-search-alt-2'></i></button>
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
