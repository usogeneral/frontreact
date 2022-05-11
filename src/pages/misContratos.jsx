import React, { Fragment, useState, useEffect } from 'react';
import Sidebar from '../components/sidebar';
import { useHistory } from 'react-router-dom';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import DatosUsuario from '../components/modales/datosUsuario';
const { SearchBar, ClearSearchButton } = Search;

const MisContratos = ({ setLogeado, logeado }) => {
  const user = JSON.parse(window.localStorage.getItem('user'));
  const [listaOfertas, setListaOfertas] = useState([]);
  let lista = [];
  let data = [
    {
      _id: '',
      titulo: '',
      cuerpo: '',
      precio: '',
      tipoPago: '',
      categoria: '',
      nombreUsuario: '',
      uid: '',
      interesados: [
        {
          postulante: '',
          nombres: '',
          foto: '',
        },
      ],
    },
  ];
  const history = useHistory();
  if (!user) {
    history.push('/');
  }

  const columns = [
    {
      dataField: 'titulo',
      text: 'Titulo',
    },
    {
      dataField: 'cuerpo',
      text: 'Descripción',
    },
    {
      dataField: 'precio',
      text: 'Precio (USD)',
    },
    {
      dataField: 'tipoPago',
      text: 'Tipo Pago',
    },
    {
      dataField: '',
      text: 'Empleador',
      formatter: (cellContent, row) => {
        return (
          // <p>{row.usuario}</p>
          <DatosUsuario userId={row.usuario} nombreUser={row.nombreUsuario}/>
        );
      }
    },
  ];

  const cargarContratos = async () => {
    if (user != null) {
      const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      };
      const response = await fetch(
        'http://localhost:4000/api/oferta/busqueda/contratos/usuario/' +
          user.usuarioDB.uid,
        requestOptions
      );
      const data = await response.json();
      setListaOfertas(data);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line
    cargarContratos();
    // eslint-disable-next-line
  }, []);

  return (
    <Fragment>
      <Sidebar setLogeado={setLogeado}></Sidebar>
      <div className='container-fluid main-dashboard'>
        <div className='row'>
          <div className='col-lg-2'></div>
          <div className='col-lg-10'>
            <h2>Mis Contratos</h2>

            <div className='main-tabla'>
              <ToolkitProvider
                keyField='id'
                data={listaOfertas}
                columns={columns}
                search
              >
                {(props) => (
                  <div>
                    <SearchBar {...props.searchProps} />
                    <ClearSearchButton {...props.searchProps} />
                    <hr />
                    <BootstrapTable
                      {...props.baseProps}
                      // ref={ n => this.node = n }
                      pagination={paginationFactory()}
                    />
                  </div>
                )}
              </ToolkitProvider>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default MisContratos;
