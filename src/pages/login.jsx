import React from 'react';
import { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import image from '../assets/worker.jpg';
import { URL_SERVICIOS } from '../config/config';


const LoginPage = ({ setLogeado }) => {
  const user = JSON.parse(window.localStorage.getItem('user'));
  const history = useHistory();
  const [usuario, setusuario] = useState({});
  const [values, setValues] = useState({
    showPassword: false,
    icon: "bx bx-show"
  });

  if (user != null) {
    history.push('/dashboard');
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setusuario({ ...usuario, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(usuario);
  };


  const seePassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const login = async (user) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    };
    const response = await fetch(
      URL_SERVICIOS+'/api/login',
      requestOptions
    );
    const data = await response.json();
    if (data.ok === true) {
      window.localStorage.setItem('user', JSON.stringify(data));
      setLogeado(true);

      if (data.usuarioDB.esAdmin === true) {
        history.push('/');
      } else {
        history.push('/');
      }
    } else {
      alert(data.msg);
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
            <h3>Iniciar sesión</h3>

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

            {/* <div className='form-group'>
              <label>Contraseña</label>
              <input
                type='password'
                className='form-control'
                placeholder='Ingresa tu contraseña'
                name='password'
                onChange={handleInputChange}
                required
              />
            </div> */}
            <div class="form-group">
              <label>Contraseña</label>
              <div class="input-group" id="show_hide_password">
                <input class="form-control"
                  id="txtPassword"
                  name='password'
                  type={values.showPassword ? "text" : "password"}
                  onChange={handleInputChange} />
                <div class="input-group-addon eye">
                  <a onClick={seePassword}><i class={values.showPassword ? "bx bx-show" : "bx bx-low-vision"} id="seeBtn"></i></a>
                </div>
              </div>
            </div>
            <div id='msj-error' className='mensaje-error disable'>
              <p>
                LO SIENTO EL USUARIO NO HA SIDO ENCONTRADO EN NUESTROS REGISTROS
              </p>
            </div>
            {/* <div className='form-group'>
              <div className='custom-control custom-checkbox'>
                <input
                  type='checkbox'
                  className='custom-control-input'
                  id='customCheck1'
                />
                <label className='custom-control-label' htmlFor='customCheck1'>
                  Recuerdame
                </label>
              </div>
            </div> */}

            <button type='submit'>Ingresar</button>
            <Link to='/reseteo-password'>
              <p className='forgot-password text-right'>
                Has olvidado tu contraseña?
              </p>
            </Link>
            {/* <Link className='link' to='/registro'>
              Regístrate!
            </Link> */}
          </form>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
