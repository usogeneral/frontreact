import React, { Fragment, useState } from 'react';

const DatosUsuario = ({ userId, nombreUser }) => {
    const [celular, setcelular] = useState("");
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
    const linkwhatsapp = 'https://web.whatsapp.com/send?phone=593';


    const getUsuario = async () => {

        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };
        const response = await fetch(
            'http://localhost:4000/api/usuarios/' + userId,
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


    return (
        <Fragment>
            <a className="link contacto" data-bs-toggle="modal" data-bs-target="#datos" onClick={getUsuario}><h6>{nombreUser}</h6></a>

            {/* <!-- Modal --> */}
            <div class="modal fade" id="datos" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Datos de contacto</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            
                            <span className='contactame'>
                                Contactame por Whatsapp:
                            </span>
                            <a
                                className='telefono-modal'
                                href={linkwhatsapp + celular}
                                target='_blank'
                                rel='noreferrer'
                            >
                               {' '} {usuario.numeroDeCelular} 
                            </a>
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

        </Fragment>
    );
}

export default DatosUsuario