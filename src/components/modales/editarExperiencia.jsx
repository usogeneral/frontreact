import React, { Fragment, useState } from 'react'
import Sidebar from '../sidebar';
import { useHistory } from 'react-router-dom';


const EditarExperiencia = ({ location, editarUser, setLogeado, setCargar}) => {
    const history = useHistory();
    const user = JSON.parse(window.localStorage.getItem('user'));
    const exp = location.state.experienciaa;
    const [seleccionado, setSeleccionado] = useState(false);
    const [experiencia, setExperiencia] = useState({
        _id: exp._id,
        titulo: exp.titulo,
        empresa: exp.empresa,
        fechaInicio: exp.fechaInicio,
        fechaFin: exp.fechaFin,
        descripcion: exp.descripcion
    })

    
    if(user === null){
        history.push('/login');
    }

    const handleInputChange = e => {
        const { name, value } = e.target
        setExperiencia({ ...experiencia, [name]: value })
    }

    const handleSubmit = e => {
        e.preventDefault();
        const expp = user.usuarioDB.experiencia.find((post) => post._id === experiencia._id);
   
        if (expp !== undefined) {
            const expp = user.usuarioDB.experiencia.findIndex((post) => post._id === experiencia._id);
            user.usuarioDB.experiencia[expp] = experiencia;
        } else {
            user.usuarioDB.experiencia.push(experiencia);
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
                setFechaFin("Trabajo Actual");
            } else {
                setSeleccionado(false);
                // eslint-disable-next-line
                setFechaFin(e.target.value);
            }
        });
    }

    const setFechaFin = (valor) => {
        setExperiencia({ ...experiencia, ["fechaFin"]: valor })
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
                                        <label>Titulo</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Añada el titulo de su trabajo"
                                            name="titulo"
                                            defaultValue={exp.titulo}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Empresa</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Añada el nombre de la empresa"
                                            name="empresa"
                                            defaultValue={exp.empresa}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Fecha Inicio</label>
                                        <input
                                            type="date"
                                            className="form-control"
                                            placeholder="Añada la fecha de inicio en su trabajo"
                                            name="fechaInicio"
                                            defaultValue={exp.fechaInicio}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" onChange={check} />
                                        <label className="form-check-label" htmlFor="flexCheckDefault">
                                            Trabajo Actual
                                        </label>
                                    </div>
                                    {
                                        seleccionado ?
                                            ""
                                            :
                                            <div className="form-group">
                                                <label>Fecha final</label>
                                                <input
                                                    type="date"
                                                    className="form-control"
                                                    placeholder="Añada la fecha de finalización de su trabajo"
                                                    name="fechaFin"
                                                    defaultValue={exp.fechaFin}
                                                    onChange={handleInputChange}
                                                    required
                                                />
                                            </div>
                                    }

                                    <div className="form-group">
                                        <label>Descripción</label>
                                        <textarea
                                            className="form-control"
                                            placeholder="Añada una breve descripción de su puesto laboral"
                                            name="descripcion"
                                            defaultValue={exp.descripcion}
                                            onChange={handleInputChange}
                                            required
                                        ></textarea>
                                    </div>
                                    <button className="btnAddOferta" type="submit">Guardar</button>
                                    <button className='btnCancel' onClick={()=>{history.goBack()}}>Cancelar</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default EditarExperiencia;