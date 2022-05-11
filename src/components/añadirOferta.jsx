import React, { Fragment, useState } from 'react';
import { useHistory } from 'react-router-dom';

const AñadirOferta = ({ metodoCrearOferta }) => {
  const user = JSON.parse(window.localStorage.getItem('user'));

  const history = useHistory();

  if (user == null) {
    history.push('/login');
  }

  const [oferta, setOferta] = useState({
    titulo: '',
    cuerpo: '',
    precio: '',
    tipoPago: '',
    categoria: '',
    nombreUsuario: user.usuarioDB.nombres + ' ' + user.usuarioDB.apellidos,
    uid: user.usuarioDB.uid,
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOferta({ ...oferta, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      oferta.titulo === '' ||
      oferta.cuerpo === '' ||
      oferta.precio === '' ||
      oferta.tipoPago === 'Seleccione una opción de pago' ||
      oferta.categoria === ''
    ) {
      alert('Los campos son obligatorios');
    } else {
      metodoCrearOferta(oferta);
    }
  };
  return (
    <Fragment>
      <div
        className='modal fade'
        id='staticBackdrop'
        data-bs-backdrop='static'
        data-bs-keyboard='false'
        tabIndex='-1'
        aria-labelledby='staticBackdropLabel'
        aria-hidden='true'
      >
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title' id='staticBackdropLabel'>
                Añadir Oferta de Trabajo
              </h5>
              <button
                type='button'
                className='btn-close'
                data-bs-dismiss='modal'
                aria-label='Close'
              ></button>
            </div>
            <div className='modal-body'>
              <div className='container main-añadir-oferta'>
                <form className='añadir-oferta-form' onSubmit={handleSubmit}>
                  <div className='form-group'>
                    <label>Titulo</label>
                    <input
                      type='text'
                      className='form-control'
                      placeholder='Ingrese un titulo'
                      name='titulo'
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className='form-group'>
                    <label>Descripción</label>
                    <textarea
                      type='text'
                      className='form-control'
                      placeholder='Ingrese una descripción'
                      name='cuerpo'
                      onChange={handleInputChange}
                      required
                    ></textarea>
                  </div>

                  <div className='form-group'>
                    <label>Precio</label>
                    <input
                      type='number'
                      className='form-control'
                      name='precio'
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className='form-group'>
                    <label>Tipo Pago</label>
                    <select
                      className='form-select'
                      aria-label='Default select example'
                      name='tipoPago'
                      onChange={handleInputChange}
                    >
                      <option selected>Seleccione una opción de pago</option>
                      <option value='Mensual'>Mensual</option>
                      <option value='Quincenal'>Quincenal</option>
                      <option value='Semanal'>Semanal</option>
                      <option value='Hora'>Por Hora</option>
                      <option value='Contrato'>Contrato</option>
                    </select>
                  </div>

                  <div className='form-group'>
                    <label>Categoría</label>
                    <select
                      className='form-select'
                      aria-label='Default select example'
                      name='categoria'
                      onChange={handleInputChange}
                    >
                      <option selected>Seleccione una categoría</option>
                      <option value='Construccion'>
                        Albañilería / Construcción
                      </option>
                      <option value='Trabajos Domesticos'>
                        Trabajos Domésticos
                      </option>
                      <option value='Carpinteria'>Carpintería</option>
                      <option value='Plomeria'>Plomería</option>
                      <option value='Electricidad'>Electricidad</option>
                      <option value='Atencion al cliente'>
                        Atención al cliente
                      </option>
                      <option value='Vendedor'>Vendedor/a</option>
                      <option value='Servicios Informaticos'>
                        Servicios Informáticos
                      </option>
                      <option value='Servicios Profesionales'>
                        Servicios Profesionales
                      </option>
                      <option value='Otros'>Otros</option>
                    </select>
                  </div>
                </form>
              </div>
            </div>
            <div className='card-footer'>
              <button
                data-bs-dismiss='modal'
                className='btnAddOferta'
                onClick={handleSubmit}
                type='submit'
              >
                Añadir Oferta
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default AñadirOferta;
