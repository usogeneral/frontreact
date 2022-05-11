import React, { Fragment } from 'react'

const ConfirmarEliminar = ({data}) => {
    console.log(data);
    const eliminar = () =>{
        console.log(data._titulo);
    }
    return (
        <Fragment>
            <div className="modal fade" id="eliminar" tabIndex={-1}>
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

export default ConfirmarEliminar;