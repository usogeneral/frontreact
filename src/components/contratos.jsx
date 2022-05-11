import React, { Fragment, useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';
import Sidebar from './sidebar';
import DatosUsuario from './modales/datosUsuario';
const { SearchBar, ClearSearchButton } = Search;
import { URL_SERVICIOS } from '../config/config';

const Contratos = ({ setLogeado }) => {
  const user = JSON.parse(window.localStorage.getItem('user'));
  const [ofertasContratos, setOfertasContratos] = useState([]);
  const [usuario, setUsuario] = useState({})

  const history = useHistory();

  if (user == null) {
    history.push('/login');
  }

  const getUsuario = async(postulante) => {

    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    };
    const response = await fetch(
      URL_SERVICIOS+'/api/usuarios/' + postulante,
      requestOptions
    );
    const data = await response.json();
    if(data.ok){
        setUsuario(data.usuario);
        console.log(data);
    }else{
        console.log(data.msg);
    }

}

  const estiloBtnDelete = {
    backgroundColor: '#ff6b6b',
    color: '#fafafa',
    borderStyle: 'none',
  };

  const columns = [
    {
      dataField: 'titulo',
      text: 'Titulo',
    },
    {
      dataField: '',
      text: 'Nombres',
      formatter: (cellContent, row) => {
        return (
          // <p>{row.interesados[0].nombres}</p>
          <DatosUsuario userId={row.interesados[0].postulante} nombreUser={row.interesados[0].nombres} />
          // <button onClick={() => getUsuario(row.interesados[0].postulante)}>{row.interesados[0].nombres}</button>
        );
      }
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
      text: 'Acción',
      formatter: (cellContent, row) => {
        return (
          // <p>{row.precio}</p>
          <button style={estiloBtnDelete} onClick={() => finalizar(row)}>
            Finalizar Contrato
          </button>
        );
      },
    },
  ];

  const selectedRow = (row, isSelect, rowIndex) => {
    this.setState((curr) => ({ ...curr, selectedRow: row }));
  };

  const selectRow = {
    mode: 'radio',
    clickToSelect: true,
    hideSelectColumn: true,
    onselect: selectedRow,
  };

  const cargarOfertasContratos = async () => {
    if (user != null) {
      const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      };
      const resp = await fetch(
        URL_SERVICIOS+'/api/oferta/usuario/contratos/' +
          user.usuarioDB.uid,
        requestOptions
      );
      const res = await resp.json();
      setOfertasContratos(res);
    }
  };

  const finalizarContrato = async (oferta) => {
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
      alert('Se ha actualizado correctamente');
    } else {
      alert('No se logro actualizar el registro');
    }
    cargarOfertasContratos();
  };

  const finalizar = (oferta) => {
    var response = window.confirm('Esta seguro de finalizar el contrato?');
    if (response === true) {
      oferta.disponible = 'contrato finalizado';
      finalizarContrato(oferta);
    } else {
      alert('Su contrato no ha sido finalizado');
    }
  };

  useEffect(() => {
    cargarOfertasContratos();
    // eslint-disable-next-line
  }, []);
  return (
    <Fragment>
      <Sidebar setLogeado={setLogeado} />
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-2'></div>
          <div className='col-10'>
            <div className='container main-contratos main-tabla'>
              <h2>Tus Contratos</h2>
              <ToolkitProvider
                keyField='id'
                data={ofertasContratos}
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
                      selectRow={selectRow}
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

export default Contratos;
