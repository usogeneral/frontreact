import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import moment from 'moment';
import 'moment/locale/es';

import ListaOfertas from '../components/listaOfertas';
import './pages.css';
import { URL_SERVICIOS } from '../config/config';

const Main = ({ logeado, busqueda }) => {
  moment.locale('es');

  const user = JSON.parse(window.localStorage.getItem('user'));

  const [ofertas, setOfertas] = useState([]);
  const [radio, setRadio] = useState('');

  const cargarOfertas = async () => {
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    };
    if (!logeado) {
      const response = await fetch(
        URL_SERVICIOS+'/api/oferta',
        requestOptions
      );
      const data = await response.json();
      setOfertas(data.ofertas);
    }

    if (logeado) {
      const response = await fetch(
        URL_SERVICIOS+'/api/oferta/usuario/get-ofertas/' +
          user.usuarioDB.uid,
        requestOptions
      );
      const data = await response.json();
      setOfertas(data);
    }
    try {
      if (busqueda.length > 0) {
        setOfertas(busqueda);
      }
    } catch (error) {
      cargarOfertas();
    }
  };

  const postularse = async (oferta) => {
    const interesado = oferta.interesados.find(
      (post) => post.postulante === user.usuarioDB.uid
    );
    if (interesado) {
      alert('Sr. usuario ya se ha postulado a esta oferta');
    } else {
      const resp = window.confirm('Desea postularse a esta oferta');
      if (resp) {
        const interesado = {
          postulante: user.usuarioDB.uid,
          nombres: user.usuarioDB.nombres + ' ' + user.usuarioDB.apellidos,
          foto: user.usuarioDB.img,
        };
        oferta.interesados.push(interesado);
        const requestOptions = {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'x-token': user.token,
          },
          body: JSON.stringify(oferta),
        };
        const response = await fetch(
          URL_SERVICIOS+'/api/postulante/' + oferta._id,
          requestOptions
        );
        const data = await response.json();
        if (data.ok === true) {
          alert('Su postulación se ha realizado correctamente');
          window.location.reload();
        } else {
          alert('Su postulación no pudo procesarse');
        }
      } else {
        alert('No se ha postulado');
      }
    }
  };

  const noLogeado = () => {
    alert('No puede postularse, debe iniciar seision.');
  };

  const presentarListaOfertas = () => {
    if (ofertas.length > 0) {
      return ofertas.map((oferta) => (
        // <ListaOfertas key={oferta._id} oferta={oferta} logeado={logeado}></ListaOfertas>
        <div key={oferta._id} className='oferta'>
          <Link
            className='link'
            to={{ pathname: '/oferta', state: { oferta: oferta } }}
          >
            <h4>{oferta.titulo}</h4>
          </Link>
          <Link
            className='link'
            to={{ pathname: '/perfil', state: { user: oferta.usuario } }}
          >
            <h6>{oferta.nombreUsuario}</h6>
          </Link>
          <p>{oferta.cuerpo}</p>
          <small>
            <strong>Creado: </strong> {moment(oferta.fechaCreacion).fromNow()}
          </small>
          <br />
          <small>
            <strong>Categoria:</strong> {oferta.categoria}
          </small>
          <br />
          <small>
            <strong>Salario:</strong> {oferta.precio}
          </small>
          <br />
          <small>
            <strong>Tipo de Pago:</strong> {oferta.tipoPago}
          </small>
          <br />
          <small>
            <strong>Interesados:</strong> {oferta.interesados.length}
          </small>
          <br />
          {logeado ? (
            <button
              onClick={() => {
                postularse(oferta);
              }}
            >
              Postularse
            </button>
          ) : (
            <button
              onClick={() => {
                noLogeado();
              }}
            >
              Postularse
            </button>
          )}
        </div>
      ));
    } else {
      return <h1>No se ha encontrado información!</h1>;
    }
  };

  const handleRadioSelect = (opcion) => {
    setRadio(opcion);
  };

  const buscarCategoria = async () => {
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    };
    if (logeado) {
      const response = await fetch(
        URL_SERVICIOS+'/api/oferta/usuario/categoria/' +
          radio +
          '/' +
          user.usuarioDB.uid,
        requestOptions
      );
      const data = await response.json();
      setOfertas(data.ofertas);
    }

    if (!logeado) {
      const response = await fetch(
        URL_SERVICIOS+'/api/oferta/busqueda/categoria/' + radio,
        requestOptions
      );
      const data = await response.json();
      setOfertas(data.ofertas);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line
    cargarOfertas();
    // eslint-disable-next-line
  }, [logeado]);

  return (
    <div className='container main-section'>
      <div className='row'>
        <div className='container'>
          <div className='row'>
            <div className='col-3'>
              <div className='listaCategoria'>
                <h3>Categorías</h3>
                <br />
                <div>
                  <div class='form-check'>
                    <input
                      class='form-check-input'
                      type='radio'
                      name='flexRadioDefault'
                      id='flexRadioDefault1'
                      onChange={() => handleRadioSelect('Construcción')}
                    />
                    <label class='form-check-label' for='flexRadioDefault1'>
                      Albañilería / Construcción
                    </label>
                  </div>

                  <div class='form-check'>
                    <input
                      class='form-check-input'
                      type='radio'
                      name='flexRadioDefault'
                      id='flexRadioDefault1'
                      onChange={() => handleRadioSelect('Trabajos Domesticos')}
                    />
                    <label class='form-check-label' for='flexRadioDefault1'>
                      Trabajos Domésticos
                    </label>
                  </div>

                  <div class='form-check'>
                    <input
                      class='form-check-input'
                      type='radio'
                      name='flexRadioDefault'
                      id='flexRadioDefault1'
                      onChange={() => handleRadioSelect('Carpinteria')}
                    />
                    <label class='form-check-label' for='flexRadioDefault1'>
                      Carpintería
                    </label>
                  </div>

                  <div class='form-check'>
                    <input
                      class='form-check-input'
                      type='radio'
                      name='flexRadioDefault'
                      id='flexRadioDefault1'
                      onChange={() => handleRadioSelect('Plomeria')}
                    />
                    <label class='form-check-label' for='flexRadioDefault1'>
                      Plomería
                    </label>
                  </div>

                  <div class='form-check'>
                    <input
                      class='form-check-input'
                      type='radio'
                      name='flexRadioDefault'
                      id='flexRadioDefault1'
                      onChange={() => handleRadioSelect('Electricidad')}
                    />
                    <label class='form-check-label' for='flexRadioDefault1'>
                      Electricidad
                    </label>
                  </div>

                  <div class='form-check'>
                    <input
                      class='form-check-input'
                      type='radio'
                      name='flexRadioDefault'
                      id='flexRadioDefault1'
                      onChange={() => handleRadioSelect('Atencion al cliente')}
                    />
                    <label class='form-check-label' for='flexRadioDefault1'>
                      Atención al cliente
                    </label>
                  </div>

                  <div class='form-check'>
                    <input
                      class='form-check-input'
                      type='radio'
                      name='flexRadioDefault'
                      id='flexRadioDefault1'
                      onChange={() => handleRadioSelect('Vendedor')}
                    />
                    <label class='form-check-label' for='flexRadioDefault1'>
                      Vendedor/a
                    </label>
                  </div>

                  <div class='form-check'>
                    <input
                      class='form-check-input'
                      type='radio'
                      name='flexRadioDefault'
                      id='flexRadioDefault1'
                      onChange={() =>
                        handleRadioSelect('Servicios Informaticos')
                      }
                    />
                    <label class='form-check-label' for='flexRadioDefault1'>
                      Servicios Informáticos
                    </label>
                  </div>

                  <div class='form-check'>
                    <input
                      class='form-check-input'
                      type='radio'
                      name='flexRadioDefault'
                      id='flexRadioDefault1'
                      onChange={() =>
                        handleRadioSelect('Servicios Profesionales')
                      }
                    />
                    <label class='form-check-label' for='flexRadioDefault1'>
                      Servicios Profesionales
                    </label>
                  </div>

                  <div class='form-check'>
                    <input
                      class='form-check-input'
                      type='radio'
                      name='flexRadioDefault'
                      id='flexRadioDefault1'
                      onChange={() => handleRadioSelect('Otros')}
                    />
                    <label class='form-check-label' for='flexRadioDefault1'>
                      Otros
                    </label>
                  </div>

                  <div>
                    <button
                      className='btn btn-submit'
                      onClick={buscarCategoria}
                    >
                      Filtrar
                    </button>
                    <button
                      className='btn'
                      onClick={() => {
                        window.location.reload();
                      }}
                    >
                      Limpiar Filtro
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className='col-9 listaOfertasMain'>
              {logeado ? (
                ''
              ) : (
                <p>
                  Recuerde que para poder postularse a un trabajo debe tener una
                  cuenta e iniciar sesión
                </p>
              )}
              {presentarListaOfertas()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Main;
