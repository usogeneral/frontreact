import React, { Fragment } from 'react';
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom';


const Sidebar = ({ setLogeado }) => {
    const history = useHistory();
    var user = JSON.parse(window.localStorage.getItem('user'));

    if (!user) {
        history.push('/');
        user={usuarioDB : false};
    }


    const cerrarSesion = () => {
        localStorage.removeItem('user');
        setLogeado(false);
        history.push("/");
    }
    return (
        <div className="sidebar">
            <ul className="list-unstyled menu-items">
                <li><Link to="/dashboard"><i className="bx bxs-dashboard"></i> Dashboard</Link></li>
                <li><Link to="/dashboard/contratos"><i className='bx bxs-user-rectangle'></i> Tus Contratos</Link></li>
                <li><Link to="/dashboard/mis-contratos"><i className='bx bxs-user-rectangle'></i> Mis Contratos</Link></li>
                <li><Link to="/dashboard/ver-perfil"><i className='bx bxs-show'></i> Ver Perfil</Link></li>
                <li><Link to="/dashboard/editar-perfil"><i className='bx bxs-user-rectangle'></i> Editar Perfil</Link></li>
                <li><Link onClick={() => { history.goBack()}}><i class='bx bxs-left-arrow'></i> Regresar</Link></li>
                {
                    user.usuarioDB.esAdmin ?
                        <Fragment>
                            <hr />
                            <li><Link to="/dashboard/admin/usuarios"><i className='bx bxs-user-detail'></i> Ver Usuarios</Link></li>
                            <li><Link to="/dashboard/admin/ofertas"><i className='bx bxs-briefcase-alt-2'></i> Ver Ofertas</Link></li>
                        </Fragment>
                        :
                        ""
                }
                <hr />
                <li><button onClick={cerrarSesion} className="cerrar-sesion"><i className='bx bx-power-off'></i> Cerrar Sesión</button></li>
            </ul>
        </div>
    );
}

export default Sidebar