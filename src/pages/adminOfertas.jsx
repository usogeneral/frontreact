import React, { Fragment, useEffect, useState } from 'react'
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { useHistory } from 'react-router-dom';
import Sidebar from '../components/sidebar';
const { SearchBar, ClearSearchButton } = Search;
import { URL_SERVICIOS } from '../config/config';


const AdminOfertas = ({ setLogeado }) => {
    const user = JSON.parse(window.localStorage.getItem('user'));
    const [ofertas, setOfertas] = useState([])

    const history = useHistory();
    if (user === null) {
        history.push('/login');
    }

    const estiloBtnDelete = {
        backgroundColor: "#ff6b6b",
        color: "#fafafa",
        borderStyle: "none"
    };

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
                if (row.status && row.disponible === "sin contrato") {
                    return (
                        <button style={estiloBtnDelete} onClick={() => desactivar(row)}>Desactivar</button>
                    );
                } else if (!row.status && row.disponible === "sin contrato") {
                    return (
                        <button style={estiloBtnDelete} onClick={() => activar(row)}>Activar</button>
                    );
                }else if (row.status && row.disponible === "con contrato") {
                    return (<span>Oferta con contrato</span>);
                }else if (row.status && row.disponible === "contrato finalizado") {
                    return(<span>Contrato Finalizado</span>);
                }
            }
        }
    ];

    const selectedRow = (row, isSelect, rowIndex) => {
        this.setState(curr => ({ ...curr, selectedRow: row }));
    };

    const selectRow = {
        mode: 'radio',
        clickToSelect: true,
        hideSelectColumn: true,
        onselect: selectedRow
    };

    const getOfertas = async () => {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };
        const response = await fetch(
            URL_SERVICIOS+'/api/oferta/admin/ofertas',
            requestOptions
        );
        const data = await response.json();
        setOfertas(data.ofertas);
    }

    const editarOferta = async (oferta) => {
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
            alert("Sus cambios se han guardado satisfactoriamente");
        } else {
            alert("No se realizarón los cambios");
        }
        getOfertas();
    };

    const desactivar = (oferta) => {
        var response = window.confirm("Esta seguro de desactivar esta oferta?");
        if (response) {
            oferta.status = false;
            editarOferta(oferta);
            window.location.reload();
        } else {
            alert("No se ha realizado ningún cambio");
        }
    }

    const activar = (oferta) => {
        oferta.status = true;
        editarOferta(oferta);
        window.location.reload();
    }
    

    useEffect(() => {
        getOfertas();
    }, [])
    return (
        <Fragment>
            <Sidebar setLogeado={setLogeado} />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-2"></div>
                    <div className="col-10">
                        <div className="container main-admin">
                            <div className="row">
                                <div className="col-12 main-tabla">
                                    <h2>Administrar Ofertas</h2>
                                    <ToolkitProvider keyField='id'
                                        data={ofertas}
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default AdminOfertas;