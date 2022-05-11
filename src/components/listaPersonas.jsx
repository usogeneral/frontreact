import { URL_SERVICIOS } from '../config/config';
import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ListaPersonas = ({ persona, metodoContratar }) => {
    const imgURL = URL_SERVICIOS+"/uploads/";
    const linkwhatsapp = 'https://web.whatsapp.com/send?phone=593';
    const [celular, setcelular] = useState("")

    const [usuario, setUsuario] = useState({
        img: '',
        esAdmin: '',
        fechaCreacion: '',
        nombres: '',
        apellidos: '',
        documentoDeIdentidad: '',
        numeroDeCelular: '',
        email: '',
        bio: '',
        skills: [],
        redesSociales: {
            twitter: '',
            facebook: '',
            linkedin: '',
            instagram: '',
        },
        experiencia: [
            {
                titulo: '',
                empresa: '',
                fechaInicio: '',
                fechaFin: '',
                descripcion: '',
            },
        ],
        estudios: [
            {
                nombreInstitucion: '',
                titulo: '',
                fechaInicio: '',
                fechaFin: '',
                descripcion: '',
            },
        ],
        uid: '',
    })


    const getUsuario = async () => {

        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };
        const response = await fetch(
            URL_SERVICIOS+'/api/usuarios/' + persona.postulante,
            requestOptions
        );
        const data = await response.json();
        if (data.ok) {
            setUsuario(data.usuario);
            setcelular(data.usuario.numeroDeCelular.slice(1));

        } else {
            console.log(data.msg);
        }

    }

    useEffect(() => {
        getUsuario();

    }, [])

    const contratar = () => {
        metodoContratar(persona.postulante)
    }
    return (
        <Fragment>
            <div className="container lista-personas">
                <div className="row">
                    <div className="col-2">
                        <img src={imgURL + usuario.img} alt="" />
                    </div>
                    <div className="col-7 nombres-apellidos">
                        <Link className="link" to={{ pathname: "/perfil", state: { user: persona.postulante } }} >{usuario.nombres} {usuario.apellidos}</Link>

                        <a className="link contacto" data-bs-toggle="modal" data-bs-target="#datos" ><h6>Información de contacto</h6></a>

                        <div class="modal fade" id="datos" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModalLabel">Datos de contacto</h5>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                        
                                        <span className='contactame'>
                                            Contactame por Whatsapp: <a
                                            className='telefono-modal'
                                            href={linkwhatsapp + celular}
                                            target='_blank'
                                            rel='noreferrer'
                                        >
                                            { usuario.numeroDeCelular} {' '}
                                        </a>
                                        </span>

                                        <hr />
                                        <h6>Redes Sociales</h6>
                                        <div className='redes-sociales'>
                                            {usuario.redesSociales.facebook ? (
                                                <a
                                                    href={usuario.redesSociales.facebook}
                                                    target='_blank'
                                                    rel='noreferrer'
                                                >
                                                    <i className='bx bxl-facebook-square social'></i>
                                                </a>
                                            ) : (
                                                <span></span>
                                            )}
                                            {usuario.redesSociales.instagram ? (
                                                <a
                                                    href={usuario.redesSociales.instagram}
                                                    target='_blank'
                                                    rel='noreferrer'
                                                >
                                                    <i className='bx bxl-instagram'></i>
                                                </a>
                                            ) : (
                                                <span></span>
                                            )}
                                            {usuario.redesSociales.twitter ? (
                                                <a
                                                    href={usuario.redesSociales.twitter}
                                                    target='_blank'
                                                    rel='noreferrer'
                                                >
                                                    <i className='bx bxl-twitter'></i>
                                                </a>
                                            ) : (
                                                <span></span>
                                            )}
                                            {usuario.redesSociales.linkedin ? (
                                                <a
                                                    href={usuario.redesSociales.linkedin}
                                                    target='_blank'
                                                    rel='noreferrer'
                                                >
                                                    <i className='bx bxl-linkedin-square'></i>
                                                </a>
                                            ) : (
                                                <span></span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-3">
                        <button className="btn-submit" data-bs-toggle="modal" data-bs-target="#confirmContratar"> Contratar</button>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="confirmContratar" tabIndex={-1}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">CONTRATAR</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                        </div>
                        <div className="modal-body">
                            <p>Esta seguro de contratar a este postulante?</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={contratar}>Contratar</button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default ListaPersonas;