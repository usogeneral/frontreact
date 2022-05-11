import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const TablaOfertas = ({ oferta, metodoCargarDatos }) => {
  const user = JSON.parse(window.localStorage.getItem('user'));

    const eliminarOferta = async () => {
        const requestOptions = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'x-token': user.token
            }
        };
        const response = await fetch('http://localhost:4000/api/oferta/' + oferta._id, requestOptions);
        const data = await response.json();
        metodoCargarDatos()
        // alert(oferta._id)
    }

    return (
        <Fragment>
            <tr>
                <td>{oferta.titulo}</td>
                <td>{oferta.cuerpo}</td>
                <td>${oferta.precio}</td>
                <td>{oferta.tipoPago}</td>
                <td>
                    <Link className="btnLink" to={{ pathname: "/dashboard/visualizar-oferta", state: { oft: oferta } }}><i className='bx bxs-show'></i></Link>
                    <Link className="btnLink" to={{ pathname: "/dashboard/editar-oferta", state: { oft: oferta } }}><i className='bx bx-edit'></i></Link>
                    <button type="button" className="btnDelete" data-bs-toggle="modal" data-bs-target="#confirmDelete">
                        <i className='bx bx-trash delete'></i>
                    </button>
                </td>
            </tr>

            <div className="modal fade" id="confirmDelete" tabIndex={-1}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">ELIMINAR OFERTA DE TRABAJO</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                        </div>
                        <div className="modal-body">
                            <p>Esta seguro de eliminar esta oferta de trabajo?</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={eliminarOferta}>Eliminar</button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
  };

export default TablaOfertas;
