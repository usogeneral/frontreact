import React, { Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import Sidebar from './sidebar';

const VerPerfil = ({ logeado, setLogeado }) => {
  const history = useHistory();
  const user = JSON.parse(window.localStorage.getItem('user'));

  if (!user) {
    history.push('/');
  }
  const linkwhatsapp = 'https://web.whatsapp.com/send?phone=593';
  const imgURL = 'http://localhost:4000/uploads/';
  const celular = user.usuarioDB.numeroDeCelular.slice(1);

  return (
    <Fragment>
      <Sidebar setLogeado={setLogeado} />
      <div className='container'>
        <div className='row'>
          <div className='col-2'></div>
          <div className='col-10'>
            <div className='container main-perfil'>
              
              <div className='perfil'>
                
                <img src={imgURL + user.usuarioDB.img} alt='' />
                <h1>
                  {user.usuarioDB.nombres} {user.usuarioDB.apellidos}
                </h1>
                <p>{user.usuarioDB.email}</p>
                <a
                  className='contactame'
                  href={linkwhatsapp + celular}
                  target='_blank'
                  rel='noreferrer'
                >
                  {user.usuarioDB.numeroDeCelular} {' '}
                </a>
                <span className='telefono'>
                  Contactame por Whatsapp!
                </span>

                <div className='redes-sociales'>
                  {user.usuarioDB.redesSociales.facebook ? (
                    <a
                      href={user.usuarioDB.redesSociales.facebook}
                      target='_blank'
                      rel='noreferrer'
                    >
                      <i className='bx bxl-facebook-square'></i>
                    </a>
                  ) : (
                    <span></span>
                  )}
                  {user.usuarioDB.redesSociales.instagram ? (
                    <a
                      href={user.usuarioDB.redesSociales.instagram}
                      target='_blank'
                      rel='noreferrer'
                    >
                      <i className='bx bxl-instagram'></i>
                    </a>
                  ) : (
                    <span></span>
                  )}
                  {user.usuarioDB.redesSociales.twitter ? (
                    <a
                      href={user.usuarioDB.redesSociales.twitter}
                      target='_blank'
                      rel='noreferrer'
                    >
                      <i className='bx bxl-twitter'></i>
                    </a>
                  ) : (
                    <span></span>
                  )}
                  {user.usuarioDB.redesSociales.linkedin ? (
                    <a
                      href={user.usuarioDB.redesSociales.linkedin}
                      target='_blank'
                      rel='noreferrer'
                    >
                      <i className='bx bxl-linkedin-square'></i>
                    </a>
                  ) : (
                    <span></span>
                  )}
                </div>
                <div className="row">
                  <div className="col-6">
                    <div className='biografia'>
                      <h2>Biografía</h2>
                      <p>{user.usuarioDB.bio}</p>
                    </div>

                  </div>
                  <div className="col-6">
                    <div className='skills'>
                      <h2>Habilidades</h2>
                      {user.usuarioDB.skills.map((skill) => (
                        <span className='habilidad'>
                          <i className='bx bxs-check-square'></i> {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='container'>
              <div className='row informacion'>
                <div className='col-lg-6 experiencia-perfil'>
                  <div className='marco'>
                    <h1>Experiencia</h1>
                    {user.usuarioDB.experiencia.map((exp) => (
                      <div key={exp._id}>
                        <h5>{exp.titulo}</h5>
                        <small>
                          {exp.fechaInicio} | {exp.fechaFin}
                        </small>
                        <h6>{exp.empresa}</h6>
                        <p>{exp.descripcion}</p>
                        <hr />
                      </div>
                    ))}
                  </div>
                </div>
                <div className='col-lg-6 estudios-perfil'>
                  <div className='marco'>
                    <h1>Estudios</h1>
                    {user.usuarioDB.estudios.map((estudio) => (
                      <div key={estudio._id}>
                        <h5>{estudio.titulo}</h5>
                        <small>
                          {estudio.fechaInicio} | {estudio.fechaFin}
                        </small>
                        <h6>{estudio.nombreInstitucion}</h6>
                        <p>{estudio.descripcion}</p>
                        <hr />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default VerPerfil;
