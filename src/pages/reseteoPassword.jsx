import React from 'react';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';

import image from '../assets/worker.jpg';

function ReseteoPassword() {
  const user = JSON.parse(window.localStorage.getItem('user'));
  const history = useHistory();
  const [usuario, setusuario] = useState({});

    if (user !== null) {
        history.push('/dashboard');
      }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setusuario({ ...usuario, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    resetPassword(usuario);
  };

  const resetPassword = async (user) => {
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    };
    const response = await fetch(
      'http://localhost:4000/api/resetear-password',
      requestOptions
    );
    const data = await response.json();
    if (data.ok === true) {
      alert(data.msg);
      history.push('/login');
    } else {
      alert('Usuario no encontrado, por favor intente de nuevo.');
    }
  };
  return (
    <div className='container mainlogin'>
      <div className='row'>
        <div className='col-lg-6 imagen'>
          <img src={image} alt='' />
        </div>
        <div className='col-lg-6 formulario'>
          <form className='login-form needs-validation' onSubmit={handleSubmit}>
            <h3>Resetear contraseña</h3>
            <br />
            <p>
              Por favor, introduzca la dirección de correo electrónico que
              utilizó para registrarse y se le enviará un correo con la nueva
              contraseña.
            </p>
            <div className='form-group'>
              <label>Correo Electrónico</label>
              <input
                type='email'
                className='form-control'
                placeholder='Ingresa un correo'
                name='email'
                onChange={handleInputChange}
                required
              />
            </div>
            <br />
            <button type='submit'>Enviar</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ReseteoPassword;
