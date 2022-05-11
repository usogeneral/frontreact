import { URL_SERVICIOS } from '../config/config';
import React, { Fragment, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Sidebar from './sidebar';

const EditarOferta = ({ location, setLogeado, setCargar }) => {
  const history = useHistory();
  const user = JSON.parse(window.localStorage.getItem('user'));
  const oft = location.state.oft;
  const [oferta, setOferta] = useState(oft);
  if (user === null) {
    history.push('/login');
  }

  // const [oferta, setOferta] = useState({
  //     _id: oft._id,
  //     titulo: oft.titulo,
  //     cuerpo: oft.cuerpo,
  //     precio: oft.precio,
  //     tipoPago: oft.tipoPago,
  //     categoria: oft.categoria,
  //     nombreUsuario: user.usuarioDB.nombres,
  //     uid: user.usuarioDB.uid
  // })
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOferta({ ...oferta, [name]: value });
  };

  const editarOferta = async () => {
    const requestOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-token': user.token,
      },
      body: JSON.stringify(oferta),
    };
    const response = await fetch(
      URL_SERVICIOS+'/api/oferta/' + oft._id,
      requestOptions
    );
    const data = await response.json();
    if (data.ok) {
      alert('Sus datos han sido actualizados');
    } else {
      alert('Error al actualizar los datos');
    }
    // console.log(oft.titulo);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    editarOferta();
    setCargar(true);
    setTimeout(function () {
      history.push('/dashboard');
    }, 500);
  };

  return (
    <Fragment>
      <Sidebar setLogeado={setLogeado} />
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-2'></div>
          <div className='col-10'>
            <div className='container main-añadir-oferta'>
              <form className='añadir-oferta-form' onSubmit={handleSubmit}>
                <div className='form-group needs-validation'>
                  <label>Titulo</label>
                  <input
                    type='text'
                    className='form-control'
                    placeholder='Enter title'
                    defaultValue={oferta.titulo}
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
                    placeholder='Enter description'
                    name='cuerpo'
                    defaultValue={oferta.cuerpo}
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
                    defaultValue={oferta.precio}
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
                    required
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
                    required
                  >
                    <option selected>Seleccione una categoría</option>
                    <option value='Construcción'>
                      Albañilería / Construcción
                    </option>
                    <option value='Trabajos Domésticos'>
                      Trabajos Domésticos
                    </option>
                    <option value='Carpintería'>Carpintería</option>
                    <option value='Plomería'>Plomería</option>
                    <option value='Electricidad'>Electricidad</option>
                    <option value='Atención al cliente'>
                      Atención al cliente
                    </option>
                    <option value='Vendedor'>Vendedor/a</option>
                    <option value='Servicios Informáticos'>
                      Servicios Informáticos
                    </option>
                    <option value='Servicios Profesionales'>
                      Servicios Profesionales
                    </option>
                    <option value='Otros'>Otros</option>
                  </select>
                </div>
                <button className='btn-submit'>Guardar Cambios</button>
                <button className='btn-cancel' onClick={()=>{history.goBack()}}>Cancelar</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default EditarOferta;
