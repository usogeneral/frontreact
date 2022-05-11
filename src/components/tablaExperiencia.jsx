import React, { Fragment } from 'react'
import { Link } from 'react-router-dom';


const TabalaExperiencia = ({ experiencia, user, editarUser }) => {
    const eliminar = () => {
        var response = window.confirm("Esta seguro de eliminar su experiencia?");
        if (response === true) {
            const expobj = user.usuarioDB.experiencia.findIndex(
                (post) => post._id === experiencia._id
              );
              user.usuarioDB.experiencia.splice(expobj,1);
              editarUser(user);
        }else{
            alert("No se ha realizado ningún cambio");
        }
    }
    return (
        <Fragment>
            <tr key={experiencia._id}>
                <th scope="row">{experiencia.titulo}</th>
                <td>{experiencia.descripcion}</td>
                <td>{experiencia.fechaInicio}</td>
                <td>{experiencia.fechaFin}</td>
                <td><Link className="btnLink" to={{
                    pathname: "/dashboard/perfil/editar-experiencia", state: { experienciaa: experiencia }
                }}><i className='bx bx-edit'></i></Link>
                    <button type="button" className="btnDelete" onClick={eliminar}>
                        <i className='bx bx-trash'></i>
                    </button></td>
            </tr>

        </Fragment>
    );
}

export default TabalaExperiencia;