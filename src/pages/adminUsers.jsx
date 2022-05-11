import { URL_SERVICIOS } from '../config/config';
import React, { Fragment, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';
import Sidebar from '../components/sidebar';
const { SearchBar, ClearSearchButton } = Search;

const AdminUsers = ({ setLogeado }) => {
    const user = JSON.parse(window.localStorage.getItem('user'));
    const [usuarios, setUsuarios] = useState([])
    const imgURL = URL_SERVICIOS+"/uploads/";

    const history = useHistory();
    if (user == null) {
        history.push('/login');
    }

    const estiloBtnDelete = {
        backgroundColor: "#ff6b6b",
        color: "#fafafa",
        borderStyle: "none"
    };
    const estiloAdmin = {
        backgroundColor: "#1d3557",
        color: "#fafafa",
        borderStyle: "none"
    };
    const estiloUser = {
        backgroundColor: "#ffe66d",
        color: "#1d3557",
        borderStyle: "none"
    };


    const columns = [
        {
            dataField: '',
            text: 'Imagen',
            formatter: (cellContent, row) => {
                return (
                    <img className="img-table" alt="imagen de perfil" src={imgURL + row.img} />
                );
            }
        },
        {
            dataField: 'nombres',
            text: 'Nombres'
        },
        {
            dataField: 'apellidos',
            text: 'Apellidos'
        },
        {
            dataField: 'email',
            text: 'Email'
        },
        {
            dataField: "",
            text: 'Estado',
            formatter: (cellContent, row) => {
                if (row.activo) {
                    return (
                        <button style={estiloBtnDelete} onClick={() => desactivar(row)}>Desactivar</button>
                    );
                } else {
                    return (
                        <button style={estiloAdmin} onClick={() => activar(row)}>Activar</button>
                    );
                }
            }
        },
        {
            dataField: "",
            text: "Tipo Usuario",
            formatter: (cellContent, row) => {
                if (row.esAdmin) {
                    return (
                        <button style={estiloAdmin} onClick={() => noHacerAdmin(row)}>Administrador</button>
                    );
                } else {
                    return (
                        <button style={estiloUser} onClick={() => hacerAdmin(row)}>Usuario</button>
                    );
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

    const getUsuarios = async () => {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };
        const response = await fetch(
            URL_SERVICIOS+'/api/usuarios/obtener/usuarios/' + user.usuarioDB.uid,
            requestOptions
        );
        const data = await response.json();
        setUsuarios(data);
    }

    const editarUser = async (useredit) => {
        const requestOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'x-token': user.token,
            },
            body: JSON.stringify(useredit),
        };
        const response = await fetch(
            URL_SERVICIOS+'/api/usuarios/' + useredit.uid,
            requestOptions
        );
        const data = await response.json();
        if (data.ok) {
            buscarOfertas(useredit);
            // alert("usuario");
        } else {
            alert("No se realizarón los cambios");
        }
    };

    const desactivar = (user) => {
        var response = window.confirm("Esta seguro de desactivar este usuario?");
        if (response) {
            user.activo = false;
            editarUser(user);
        } else {
            alert("No se ha realizado ningún cambio");
        }
    }

    const buscarOfertas = async(userBloqueado)=>{
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-token': user.token,
            },
        };
        const response = await fetch(
            URL_SERVICIOS+'/api/oferta/bloquear/usuario/' + userBloqueado.uid,
            requestOptions
        );
        const data = await response.json();

        if (data) {
            data.forEach(oferta => {
                if(userBloqueado.activo){
                    oferta.statusUser = true;
                }else{
                    oferta.statusUser = false;
                }
                editarOferta(oferta);
                // alert("Nice");
            });
            alert("Sus cambios se realizarón correctamente");
            window.location.reload();
        } else {
            alert("No se realizarón los cambios");
        }
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
    };

    const activar = (user) => {
        user.activo = true;
        editarUser(user);
    }

    const hacerAdmin = (usuario) => {
        var response = window.confirm("Esta seguro de convertir en ADMINISTRADOR a este usuario?");
        if (response) {
            usuario.esAdmin = true;
            editarUser(usuario);
            window.location.reload();
        } else {
            alert("No se ha realizado ningún cambio");
        }
    }

    const noHacerAdmin = (usuario) => {
        usuario.esAdmin = false;
        editarUser(usuario);
        window.location.reload();
    }

    useEffect(() => {
        getUsuarios();
        // eslint-disable-next-line
    }, [])
    // eslint-disable-next-line
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
                                    <h2>Administrar Usuarios</h2>
                                    <ToolkitProvider keyField='id'
                                        data={usuarios}
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
};

export default AdminUsers;