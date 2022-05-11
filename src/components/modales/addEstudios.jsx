import React, { Fragment, useState } from 'react'
import Sidebar from '../sidebar';
import { useHistory } from 'react-router-dom';


const AddEstudios = ({ location, editarUser, setLogeado, setCargar }) => {
    const history = useHistory();
    const user = JSON.parse(window.localStorage.getItem('user'));
    const [seleccionado, setSeleccionado] = useState(false);
    const [estudios, setEstudios] = useState({});
    
    if(user === null){
        history.push('/');
    }
    
    const handleInputChange = e => {
        const { name, value } = e.target
        setEstudios({ ...estudios, [name]: value })
    }

    const handleSubmit = e => {
        e.preventDefault();
        const est = user.usuarioDB.estudios.find((post) => post._id === estudios._id);
   
        if (est !== undefined) {
            const est = user.usuarioDB.estudios.findIndex((post) => post._id === estudios._id);
            user.usuarioDB.estudios[est] = estudios;
        } else {
            user.usuarioDB.estudios.push(estudios);
        }
        editarUser(user);
        setCargar(true);
        setTimeout(function(){
            history.push("/dashboard/editar-perfil");
        },500);
    }

    const check = e => {
        var checkbox = document.getElementById('flexCheckDefault');
        checkbox.addEventListener('change', function () {
            if (this.checked) {
                setSeleccionado(true);
                // eslint-disable-next-line
                setFechaFin("Estudio Actual");
            } else {
                setSeleccionado(false);
                // eslint-disable-next-line
                setFechaFin(e.target.value);
            }
        });
    }

    const setFechaFin = (valor) => {
        setEstudios({ ...estudios, ["fechaFin"]: valor })
    }

    return (
        <Fragment>
            <Sidebar setLogeado={setLogeado}></Sidebar>
            <div className="container main-añadir-oferta">
                <div className="row">
                    <div className="col-lg-2">
                    </div>
                    <div className="col-lg-10">
                        <div className="container">
                            <div className="row">
                                <form className="añadir-oferta-form needs-validation" onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label>Institución</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Añada el nombre de su institución"
                                            name="nombreInstitucion"
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Titulo</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Añada el nombre de su titulo"
                                            name="titulo"
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Fecha Inicio</label>
                                        <input
                                            type="date"
                                            className="form-control"
                                            placeholder="Añada la fecha de inicio de sus estudios"
                                            name="fechaInicio"
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" onChange={check} />
                                        <label className="form-check-label" htmlFor="flexCheckDefault">
                                            Estudio Actual
                                        </label>
                                    </div>
                                    {
                                        seleccionado ?
                                            ""
                                            :
                                            <div className="form-group">
                                                <label>Fecha Fin</label>
                                                <input
                                                    type="date"
                                                    className="form-control"
                                                    placeholder="Añada la fecha de finalización de sus estudios"
                                                    name="fechaFin"
                                                    onChange={handleInputChange}
                                                    required
                                                />
                                            </div>
                                    }
                                    <div className="form-group">
                                        <label>Descripción</label>
                                        <textarea
                                            className="form-control"
                                            placeholder="Añada una breve descripción de sus estudios"
                                            name="descripcion"
                                            onChange={handleInputChange}
                                            required
                                        ></textarea>
                                    </div>
                                    <button className="btnAddOferta" type="submit">Guardar</button>
                                    <button className="btnCancel" type="submit" onClick={() => { history.goBack()}}>Cancelar</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default AddEstudios;