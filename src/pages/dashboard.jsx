import { URL_SERVICIOS } from '../config/config';
import React, { Fragment, useState, useEffect } from 'react';
import AñadirOferta from '../components/añadirOferta';
import Sidebar from '../components/sidebar';
import { useHistory, Link } from 'react-router-dom';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
const { SearchBar, ClearSearchButton } = Search;


const Dashboard = ({ setLogeado, logeado, cargar }) => {
  const user = JSON.parse(window.localStorage.getItem('user'));

  const verificarToken = async () => {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ token: user.token }),
    };
    const response = await fetch(
      URL_SERVICIOS+'/api/usuarios/validar/token',
      requestOptions
    );
    const resp = await response.json();
    if (!resp.ok) {
      alert("Su token ha expirado, se cerrara sesión");
      localStorage.removeItem('user');
      setLogeado(false);
      history.push("/");
    }
  }
  
  const history = useHistory();
  if (!user) {
    history.push('/');
  } else {
    verificarToken();
  }

  const columns = [
    {
      dataField: 'titulo',
      text: 'Titulo'
    },
    {
      dataField: 'cuerpo',
      text: 'Descripción'
    },
    {
      dataField: 'precio',
      text: 'Precio (USD)'
    },
    {
      dataField: 'tipoPago',
      text: 'Tipo Pago'
    },
    {
      dataField: "",
      text: 'Acción',
      formatter: (cellContent, row) => {
        return (
          // <p>{row.precio}</p>
          <Fragment>
            <Link className="btnLink" to={{ pathname: "/dashboard/visualizar-oferta", state: { oft: row } }}><i className='bx bxs-show'></i></Link>
            <Link className="btnLink" to={{ pathname: "/dashboard/editar-oferta", state: { oft: row } }}><i className='bx bx-edit'></i></Link>
            <button type="button" className="btnDelete" onClick={() => eliminar(row)}>
              <i className='bx bx-trash delete'></i>
            </button>
          </Fragment>
        );
      }
    }
  ];




  const eliminar = async (oferta) => {
    var response = window.confirm("Esta seguro de eliminar la oferta de trabajo");
    if (response) {
      const requestOptions = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'x-token': user.token
        }
      };
      const response = await fetch(URL_SERVICIOS+'/api/oferta/' + oferta._id, requestOptions);
      const data = await response.json();
      if (data.ok) {
        alert("Se ha eliminado exitosamente");
      } else {
        alert("No se logro eliminar")
      }
      cargarOfertasByUser()
    }
  }

  const selectedRow = (row, isSelect, rowIndex) => {
    this.setState(curr => ({ ...curr, selectedRow: row }));
  };

  const selectRow = {
    mode: 'radio',
    clickToSelect: true,
    hideSelectColumn: true,
    onselect: selectedRow
  };

  let lista = [];
  const [listaOfertas, setListaOfertas] = useState([]);

  const crearOferta = async (data) => {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-token': user.token,
      },
      body: JSON.stringify(data),
    };
    const response = await fetch(
      URL_SERVICIOS+'/api/oferta',
      requestOptions
    );
    const dataREs = await response.json();
    if (dataREs.ok) {
      alert("Su Oferta ha sido creada exitosamente");
      //enviarNotificacionCrearOferta();
    } else {
      alert("Su oferta no se pudo crear");
    }
    cargarOfertasByUser();
  };

  const enviarNotificacionCrearOferta = async () => {
    if (user != null) {
      const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      };
      const response = await fetch(
        URL_SERVICIOS+'/api/oferta/notificacion-usuario/'+user.usuarioDB.uid+'/pushed',
        requestOptions
      );
      const data = await response.json();
      if (data.ok) {
        alert("Notificación enviada");
      } else {
        alert("Notificación no enviada");
      }
    }
  };



  const cargarOfertasByUser = async () => {
    if (user != null) {
      const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      };
      const response = await fetch(
        URL_SERVICIOS+'/api/oferta/usuario/' + user.usuarioDB.uid,
        requestOptions
      );
      const data = await response.json();
      setListaOfertas(data);

      lista.push(data);
    }
  };

  if (cargar) {
    window.location.reload();
  }


  useEffect(() => {
    // eslint-disable-next-line
    cargarOfertasByUser()
    // eslint-disable-next-line
  }, []);

  return (
    <Fragment>
      <Sidebar setLogeado={setLogeado}></Sidebar>
      <div className='container-fluid main-dashboard'>
        <div className='row'>
          <div className='col-lg-2'></div>
          <div className='col-lg-10'>
            <h2>Tus Ofertas</h2>
            <button
              type='button'
              className='btn btn-primary'
              data-bs-toggle='modal'
              data-bs-target='#staticBackdrop'
            >
              Añadir
            </button>
            <div className='main-tabla'>
              <ToolkitProvider keyField='id'
                data={listaOfertas}
                columns={columns}
                search
              >
                {
                  props => (
                    <div>
                      <SearchBar {...props.searchProps} />
                      <ClearSearchButton {...props.searchProps} />
                      <hr />
                      <BootstrapTable
                        {...props.baseProps}
                        // ref={ n => this.node = n }
                        selectRow={selectRow}
                        pagination={paginationFactory()}
                      />

                    </div>
                  )
                }
              </ToolkitProvider>
            </div>
            {
              user ?
                <AñadirOferta metodoCrearOferta={crearOferta}></AñadirOferta>
                :
                <span></span>
            }
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Dashboard;
