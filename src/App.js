import Navbar from './components/nabvar';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Login from './pages/login';
import Main from './pages/main';
import Perfil from './pages/perfil';
import Dashboard from './pages/dashboard';
import Oferta from './pages/oferta';
import Registro from './pages/registro';
import EditarOferta from './components/editOferta';
import PageNotFound from './pages/notFound';
import { useState } from 'react';
import VisualizarOferta from './pages/visualizarOferta';
import EditarPerfil from './pages/editarPerfil';
import ReseteoPassword from './pages/reseteoPassword';
import AddExperiencia from './components/modales/addExperiencia';
import AddEstudios from './components/modales/addEstudios';
import VerPerfil from './components/verPerfil';
import AdminUsers from './pages/adminUsers';
import Contratos from './components/contratos';
import AdminOfertas from './pages/adminOfertas';
import EditarExperiencia from './components/modales/editarExperiencia';
import EditarEstudios from './components/modales/editarEstudios';
import MisContratos from './pages/misContratos';

const App = () => {
  const user = JSON.parse(window.localStorage.getItem('user'));

  const [logeado, setLogeado] = useState(false);
  const [busqueda, setBusqueda] = useState({});
  const [cargar, setCargar] = useState(false)

  const editarUser = async (useredit) => {
    const requestOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-token': useredit.token
      },
      body: JSON.stringify(useredit.usuarioDB)
    };
    const response = await fetch('http://localhost:4000/api/usuarios/' + useredit.usuarioDB.uid, requestOptions);
    const data = await response.json();
    if (data.ok) {
      window.localStorage.setItem('user', JSON.stringify(data));
      alert("Se actualizarón los datos");
    } else {
      alert("No se pudo actualizar la información");
    }
  }

  const buscarOfertas = async (texto) => {
    if (texto.length > 0) {
      const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      };
      if (logeado) {
        const response = await fetch(
          'http://localhost:4000/api/oferta//usuario/busqueda/' + texto + '/' + user.usuarioDB.uid,
          requestOptions
        );
        const data = await response.json();
        setBusqueda(data.ofertas);
      }

      if (!logeado) {
        const response = await fetch(
          'http://localhost:4000/api/oferta/busqueda/' + texto,
          requestOptions
        );
        const data = await response.json();
        setBusqueda(data.ofertas);
      }
    }
  }

  return (
    <Router>
      <div className='container-fluid'>
        <Navbar logeado={logeado} metodoBusqueda={buscarOfertas} setLogeado={setLogeado}></Navbar>
      </div>
      <Switch>
        <Route path='/' component={(routeProps) => (
          <Main {...routeProps} logeado={logeado} busqueda={busqueda} />
        )} exact></Route>
        <Route
          path='/login' render={() => {
            return user ? <Redirect to="/dashboard" /> : <Login setLogeado={setLogeado} />
          }}
          exact
        />
        <Route path='/perfil' component={Perfil} exact />

        {/* <Route
          path='/dashboard'
          component={(routeProps) => (
            <Dashboard {...routeProps} setLogeado={setLogeado} logeado={logeado} />
          )}
          exact
        /> */}
        <Route path='/dashboard'
          render={() => {
            return user ?
              <Dashboard setLogeado={setLogeado} logeado={logeado} cargar={cargar} />
              : <Redirect to="/" />
          }}
          exact />

        <Route path='/dashboard/mis-contratos'
          render={() => {
            return user ?
              <MisContratos setLogeado={setLogeado} logeado={logeado}/>
              : <Redirect to="/" />
          }}
          exact />


        <Route path='/oferta' component={(routeProps) => (
          <Oferta {...routeProps} logeado={logeado} />
        )} exact />

        <Route path='/registro' render={() => {
          return user ? <Redirect to="/dashboard" /> : <Registro />
        }} exact />

        <Route path='/reseteo-password' render={() => {
          return user ? <Redirect to="/dashboard" /> : <ReseteoPassword />
        }} exact />

        {/* <Route path='/dashboard/editar-oferta'
          render={() => {
            return user ?
              <EditarOferta setLogeado={setLogeado} />
              : <Redirect to="/" />
          }}
          exact /> */}

        <Route path="/dashboard/editar-oferta" component={(routeProps) => (
          <EditarOferta {...routeProps} setLogeado={setLogeado} setCargar={setCargar} />
        )} exact />

        {/* <Route
          path='/dashboard/visualizar-oferta'
          render={() => {
            return user ?
              <VisualizarOferta setLogeado={setLogeado} />
              : <Redirect to="/" />
          }}
          exact
        /> */}

        <Route path="/dashboard/visualizar-oferta" component={(routeProps) => (
          <VisualizarOferta {...routeProps} setLogeado={setLogeado} />
        )} exact />


        <Route
          path='/dashboard/editar-perfil'
          render={() => {
            return user ?
              <EditarPerfil setLogeado={setLogeado} cargar={cargar} />
              : <Redirect to="/" />
          }}
          exact
        />

        {/* <Route path="/dashboard/perfil/experiencia"
          render={() => {
            return user ?
              <AddExperiencia editarUser={editarUser} setLogeado={setLogeado} setCargar={setCargar} />
              : <Redirect to="/" />
          }}
          exact /> */}

        <Route path="/dashboard/perfil/experiencia" component={(routeProps) => (
          <AddExperiencia {...routeProps} editarUser={editarUser} setLogeado={setLogeado} setCargar={setCargar} />
        )} exact />

        <Route path="/dashboard/perfil/editar-experiencia" component={(routeProps) => (
          <EditarExperiencia {...routeProps} editarUser={editarUser} setLogeado={setLogeado} setCargar={setCargar} />
        )} exact />

        <Route path="/dashboard/perfil/editar-estudios" component={(routeProps) => (
          <EditarEstudios {...routeProps} editarUser={editarUser} setLogeado={setLogeado} setCargar={setCargar} />
        )} exact />

        <Route path="/dashboard/perfil/estudios" component={(routeProps) => (
          <AddEstudios {...routeProps} editarUser={editarUser} setLogeado={setLogeado} setCargar={setCargar} />
        )} exact />

        {/* <Route path="/dashboard/perfil/estudios"
          render={() => {
            return user ?
              <AddEstudios editarUser={editarUser} setLogeado={setLogeado} setCargar={setCargar} />
              : <Redirect to="/" />
          }}
          exact /> */}

        <Route
          path='/dashboard/ver-perfil'
          render={() => {
            return user ?
              <VerPerfil logeado={logeado} setLogeado={setLogeado} />
              : <Redirect to="/" />
          }}
          exact
        />

        <Route
          path='/dashboard/admin/usuarios'
          render={() => {
            return user ?
              <AdminUsers setLogeado={setLogeado} />
              : <Redirect to="/" />
          }}
          exact
        />
        <Route
          path='/dashboard/admin/ofertas'
          render={() => {
            return user ? <AdminOfertas setLogeado={setLogeado} /> : <Redirect to="/" />
          }}
          exact
        />
        <Route
          path='/dashboard/contratos'
          render={() => {
            return user ? <Contratos setLogeado={setLogeado} /> : <Redirect to="/" />
          }}
          exact
        />

        <Route component={PageNotFound} />
      </Switch>
    </Router>
  );
};

export default App;
