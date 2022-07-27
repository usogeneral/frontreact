import { URL_SERVICIOS } from '../config/config';
import React, { Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/es';

import ListaPersonas from '../components/listaPersonas';
import Sidebar from '../components/sidebar';

const VisualizarOferta = ({ setLogeado, location }) => {
  moment.locale('es');

  const oferta = location.state.oft;
  const user = JSON.parse(window.localStorage.getItem('user'));
  const history = useHistory();

  if (user == null) {
    history.push('/login');
  }

  const realizarContrato = async (personaID) => {
    const interesadoContratado = oferta.interesados.find(
      (post) => post.postulante === personaID
    );
    interesadoContratado.aceptado = true;
    oferta.interesados = interesadoContratado;
    oferta.disponible = 'con contrato';
    const requestOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-token': user.token,
      },
      body: JSON.stringify(oferta),
    };
    const response = await fetch(
      URL_SERVICIOS+'/api/oferta/' + oferta._id,
      requestOptions
    );
    const data = await response.json();
    if (data.ok) {
      alert('Se ha contratado a la persona exitosamente.');
      enviarNotificacionCrearOfertaContrato(user.usuarioDB.uid, oferta.titulo, 'contrato');
      history.push('/dashboard/contratos');
    } else {
      alert('No se logro contratar a la persona');
    }
  };

  const enviarNotificacionCrearOfertaContrato = async (idUsuario, tituloOferta, tipoNotificacion) => {
    if (ofertId != null) {
      const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      };
      const response = await fetch(
        URL_SERVICIOS+'/api/usuarios/notificacion-contratar/'+idUsuario+'/pushed/'+tituloOferta+'/'+tipoNotificacion,
        requestOptions
      );
      const data = await response.json();
      console.log('RESPUES?tA: '+data.ok)
     
    }
  };

  return (
    <Fragment>
      <Sidebar setLogeado={setLogeado} />
      <div className='container visualizar-oferta'>
        <div className='row'>
          <div className='col-lg-2'></div>
          <div className='col-lg-10'>
            <div className='container'>
              <div className='row'>
                <div className="col-12">
                <button className="btnRegresarDash" onClick={() => { history.goBack()}}> <i class='bx bxs-left-arrow'></i> Regresar</button>
                </div>
                <div className='col-lg-12 body-oferta card'>
                  <div className='card-body'>
                    <h4 className='card-title'>
                      <strong>Titulo: </strong>
                      {oferta.titulo}
                    </h4>
                    <h6 className='usuario'>
                      <strong>Publicado por: </strong>
                      {oferta.nombreUsuario}
                    </h6>
                    <p>
                      <strong>Descripcion: </strong> {oferta.cuerpo}
                    </p>
                    <p>
                      <strong>Creado: </strong>{' '}
                      {moment(oferta.fechaCreacion).fromNow()}
                    </p>
                    <p>
                      <strong>Categoria:</strong> {oferta.categoria}
                    </p>
                    <p>
                      <strong>Salario (USD):</strong> {oferta.precio}
                    </p>
                    <p>
                      <strong>Tipo Pago: </strong>
                      {oferta.tipoPago}
                    </p>
                  </div>
                </div>
                <br />
                <br />
                <div className='col-lg-12 personas card'>
                  <div className='card-body'>
                    <h2 className='card-title'>
                      Personas que estan postulando
                    </h2>
                    <div className='container lista-personas'>
                      {oferta.interesados.map((persona) => (
                        <ListaPersonas
                          key={persona._id}
                          persona={persona}
                          metodoContratar={realizarContrato}
                        />
                      ))}
                    </div>
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

export default VisualizarOferta;
