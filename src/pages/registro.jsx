import React, { Fragment, useState } from 'react';
import image from '../assets/worker.jpg';
import { useHistory } from 'react-router-dom';

const Registro = () => {
  const user = JSON.parse(window.localStorage.getItem('user'));
  const history = useHistory();
  const [usuario, setUsuario] = useState({});

  if (user != null) {
    history.push('/dashboard');
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUsuario({ ...usuario, [name]: value });
  };

  const verificarCedula = (cedula) => {
    //Preguntamos si la cedula consta de 10 digitos
    if (cedula.length === 10) {

      //Obtenemos el digito de la region que sonlos dos primeros digitos
      var digito_region = cedula.substring(0, 2);

      //Pregunto si la region existe ecuador se divide en 24 regiones
      if (digito_region >= 1 && digito_region <= 24) {

        // Extraigo el ultimo digito
        var ultimo_digito = parseInt(cedula.substring(9, 10));

        //Agrupo todos los pares y los sumo
        var pares = parseInt(cedula.substring(1, 2)) + parseInt(cedula.substring(3, 4)) + parseInt(cedula.substring(5, 6)) + parseInt(cedula.substring(7, 8));

        //Agrupo los impares, los multiplico por un factor de 2, si la resultante es > que 9 le restamos el 9 a la resultante
        var numero1 = cedula.substring(0, 1);
        numero1 = (numero1 * 2);
        if (numero1 > 9) { numero1 = (numero1 - 9); }

        var numero3 = cedula.substring(2, 3);
        numero3 = (numero3 * 2);
        if (numero3 > 9) { numero3 = (numero3 - 9); }

        var numero5 = cedula.substring(4, 5);
        numero5 = (numero5 * 2);
        if (numero5 > 9) { numero5 = (numero5 - 9); }

        var numero7 = cedula.substring(6, 7);
        numero7 = (numero7 * 2);
        if (numero7 > 9) { numero7 = (numero7 - 9); }

        var numero9 = cedula.substring(8, 9);
        numero9 = (numero9 * 2);
        if (numero9 > 9) { numero9 = (numero9 - 9); }

        var impares = numero1 + numero3 + numero5 + numero7 + numero9;

        //Suma total
        var suma_total = (pares + impares);

        //extraemos el primero digito
        var primer_digito_suma = String(suma_total).substring(0, 1);

        //Obtenemos la decena inmediata
        var decena = (parseInt(primer_digito_suma) + 1) * 10;

        //Obtenemos la resta de la decena inmediata - la suma_total esto nos da el digito validador
        var digito_validador = decena - suma_total;

        //Si el digito validador es = a 10 toma el valor de 0
        if (digito_validador === 10) {
          digito_validador = 0;
        }
        //Validamos que el digito validador sea igual al de la cedula
        if (digito_validador === ultimo_digito) {
          return true
        } else {
          return 'la cedula:' + cedula + ' es incorrecta'
        }

      } else {
        // imprimimos en consola si la region no pertenece
        return 'Esta cedula no pertenece a ninguna region'
      }
    } else {
      //imprimimos en consola si la cedula tiene mas o menos de 10 digitos
      return 'Esta cedula tiene menos de 10 Digitos'
    }
  }

  const handleSubmit = (e) => {

    e.preventDefault();
    var resp = verificarCedula(usuario.documentoDeIdentidad)
    if (resp === true) {
      if (usuario.password !== usuario.confirmPassword) {
        alert('Las contraseñas no son iguales.');
      } else if (usuario.password.length < 6) {
        alert('La contraseña debe tener como minimo 6 caracteres.');
      } else if (usuario.numeroDeCelular.length !== 10) {
        alert('Por favor ingrese un numero de teléfono valido.');
      } else {
        registrar(usuario);
      }
    } else {
      alert(resp);
    }

  };

  const registrar = async (usuario) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(usuario),
    };
    const response = await fetch(
      'http://localhost:4000/api/usuarios',
      requestOptions
    );
    const data = await response.json();
    if (!data.ok) {
      alert(data.msg);
    } else if (data.ok) {
      alert('El usuario ha sido regitrado con exito.');
      history.push('/login');
    }
  };

  return (
    <Fragment>
      <div className='container main-registro'>
        <div className='row'>
          <div className='col-lg-6 imagen'>
            <img src={image} alt='' />
          </div>
          <div className='col-lg-6 formulario'>
            <form className='login-form' onSubmit={handleSubmit}>
              <h3>Regístrate!</h3>
              <p>* campos obligatorios</p>
              <div className='form-group'>
                <label>Nombres</label>
                <input
                  type='text'
                  className='form-control'
                  placeholder='* Ingresa tu nombre'
                  name='nombres'
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className='form-group'>
                <label>Apellidos</label>
                <input
                  type='text'
                  className='form-control'
                  placeholder='* Ingresa tus apellidos'
                  name='apellidos'
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className='form-group'>
                <label>Cedula</label>
                <input
                  type='text'
                  className='form-control'
                  placeholder='* Ingresa tu cedula de identidad'
                  name='documentoDeIdentidad'
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className='form-group'>
                <label>Telefono</label>
                <input
                  type='text'
                  className='form-control'
                  placeholder='* Ingresa tu número'
                  name='numeroDeCelular'
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className='form-group'>
                <label>Correo Electrónico</label>
                <input
                  type='email'
                  className='form-control'
                  placeholder='* Ingresa tu correo'
                  name='email'
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className='form-group'>
                <label>Contraseña</label>
                <input
                  type='password'
                  className='form-control'
                  placeholder='* Ingresa tu contraseña'
                  name='password'
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className='form-group'>
                <label>Confirmar Contraseña</label>
                <input
                  type='password'
                  className='form-control'
                  placeholder='* Ingresa nuevamente tu contraseña'
                  name='confirmPassword'
                  onChange={handleInputChange}
                  required
                />
              </div>

              <button type='submit'>Registrarse</button>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default Registro;
