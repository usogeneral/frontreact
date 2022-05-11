import React, { Fragment } from 'react'
import { Link } from 'react-router-dom';

const TablaEstudios = ({ estudio, user, editarUser }) => {

    const eliminar = () => {
        var response = window.confirm("Esta seguro de eliminar su estudio?");
        if (response === true) {
            const expobj = user.usuarioDB.estudios.findIndex(
                (post) => post._id === estudio._id
              );
              user.usuarioDB.estudios.splice(expobj,1);
              editarUser(user);
        }else{
            alert("No se ha realizado ningún cambio");
        }
    }
    return (
        <Fragment>
            <tr key={estudio._id}>
                <th scope="row">{estudio.titulo}</th>
                <td>{estudio.descripcion}</td>
                <td>{estudio.fechaInicio}</td>
                <td>{estudio.fechaFin}</td>
                <td><Link className="btnLink" to={{
                    pathname: "/dashboard/perfil/editar-estudios", state: { estudio: estudio }
                }}><i className='bx bx-edit'></i></Link>
                    {/* <button type="button" className="btnDelete" data-bs-toggle="modal" data-bs-target="#confirmDelete">
                        <i className='bx bx-trash'></i>
                    </button></td> */}
                    <button type="button" className="btnDelete" onClick={eliminar}>
                        <i className='bx bx-trash'></i>
                    </button></td>
            </tr>

            <div className="modal fade" id="confirmDelete" tabIndex={-1}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">ELIMINAR</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                        </div>
                        <div className="modal-body">
                            <p>Esta seguro de eliminar esto?</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={eliminar}>Eliminar</button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default TablaEstudios;