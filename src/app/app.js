import React, {Component} from 'react';
// import {render} from 'react-dom';
class App extends Component {

    constructor(){
        super();
        this.state= {
            nombre:"",
            correo:"",
            identificacion:"",
            rol:"",
            usuarios:[],
            _id:''
        };
        this.agregarUsuario = this.agregarUsuario.bind(this);
        this.agregarInfo = this.agregarInfo.bind(this);
    }
    eliminarUsuario(id){
        if(confirm('¿Desea eliminar este usuario?')){
            fetch(`/api/admin/${id}`, {
                method: 'DELETE',
                headers: {'Accept':'application/json', 
                'Content-Type': 'application/json'
            }
            })
            .then(res=> res.json())
            .then(data=> {
                console.log(data);
                alert("Usuario Eliminado");
                this.obtenerUsuarios();
            });
        }
    }
    editarUsuario(id){
        fetch(`/api/admin/${id}`)
        .then( res => res.json())
        .then ( data => {
            this.setState({
                nombre: data.nombre,
                correo: data.correo,
                identificacion: data.identificacion,
                rol: data.rol,
                _id: data._id
            })
        });
    }

    agregarInfo(e){
        const {name,value} = e.target;
        /* Del e.target (TRAE EL INPUT) almaceno el nombre del input y el valor (lo que se escribe en input) */
        this.setState({
            [name]: value
        });
    }

    agregarUsuario(e){
        if(this.state._id){
            fetch(`/api/admin/${this.state._id}`, {
                method: 'PUT',
                body: JSON.stringify(this.state),
                headers: {'Accept':'application/json', 
                'Content-Type': 'application/json'}
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                alert('Usuario Editado');
                this.setState({
                    nombre:"",
                    correo:"",
                    identificacion:"",
                    rol:"",
                    _id:''
                });
                this.obtenerUsuarios();
            })
            

        }else{
            console.log(this.state);
            fetch('/api/admin',{
            method: 'POST',
            body: JSON.stringify(this.state),
            headers: {'Accept':'application/json', 
            'Content-Type': 'application/json'}
            })
            .then(res => res.json())
            .then(data => {
                alert('Usuario Agregado');
                this.setState({
                    nombre:"",
                    correo:"",
                    identificacion:"",
                    rol:""
                });
                this.obtenerUsuarios(); //trae de nuevo la bd
            })
            .catch(err => log.error(err))
        }
        e.preventDefault();
    }

    componentDidMount(){
        this.obtenerUsuarios();
    }
    obtenerUsuarios(){
        fetch('/api/admin')
            .then(res=>res.json())
            .then(data => {

                console.log(data)
                this.setState({usuarios: data});
                console.log(this.state.usuarios);
            })
    }
    render() {
        return (
            
<div class="animsition">
                    <div class="page-wrapper">
                {/* <!-- HEADER MOBILE--> */}
                <header class="header-mobile d-block d-lg-none">
                    <div class="header-mobile__bar">
                        <div class="container-fluid">
                            <div class="header-mobile-inner">
                                <a class="logo" href="index.html">
                                    <img src="images/icon/logo.png" alt="CoolAdmin" />
                                </a>
                                <button class="hamburger hamburger--slider" type="button">
                                    <span class="hamburger-box">
                                        <span class="hamburger-inner"></span>
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <nav class="navbar-mobile">
                        <div class="container-fluid">
                            <ul class="navbar-mobile__list list-unstyled">
                                <li>
                                    <a href="index.html">
                                        <i class="fas fa-tachometer-alt"></i>Inicio</a>
                                </li>
                                <li>
                                    <a href="usuarios.html">
                                        <i class="fas fa-users"></i>Usuarios</a>
                                </li>

                                <li class="active has-sub">
                                    <a class="js-arrow" href="#">
                                        <i class="fas fa-trophy"></i>Campeonatos <i class="fas fa-chevron-down"></i> </a>
                                    <ul class="list-unstyled navbar__sub-list js-sub-list">
                                        <li>
                                            <a href="campeonato.html">Consultar campeonato</a>
                                        </li>
                                        <li>
                                            <a href="crear-campeonato.html">Crear campeonato</a>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <a href="equipo.html">
                                        <i class="fas fa-chess-rook"></i>Equipos</a>
                                </li>

                            </ul>
                        </div>
                    </nav>
                </header>
                {/* <!-- END HEADER MOBILE--> */}

                {/* <!-- MENU SIDEBAR--> */}
                <aside class="menu-sidebar d-none d-lg-block">
                    <div class="logo">
                        <a href="#">
                            <img src="images/icon/logo.png" alt="Cool Admin" />
                        </a>
                    </div>
                    <div class="menu-sidebar__content js-scrollbar1">
                        <nav class="navbar-sidebar">
                            <ul class="list-unstyled navbar__list">

                                <li>
                                    <a href="index.html">
                                        <i class="fas fa-tachometer-alt"></i>Inicio</a>
                                </li>
                                <li>
                                    <a href="usuarios.html">
                                        <i class="fas fa-users"></i>Usuarios</a>
                                </li>

                                <li class="active has-sub">
                                    <a class="js-arrow" href="#">
                                        <i class="fas fa-trophy"></i>Campeonatos <i class="fas fa-chevron-down"></i> </a>
                                    <ul class="list-unstyled navbar__sub-list js-sub-list">
                                        <li>
                                            <a href="campeonato.html">Consultar campeonato</a>
                                        </li>
                                        <li>
                                            <a href="crear-campeonato.html">Crear campeonato</a>
                                        </li>
                                    </ul>
                                </li>


                                <li>
                                    <a href="equipo.html">
                                        <i class="fas fa-chess-rook"></i>Equipos</a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </aside>
                {/* <!-- END MENU SIDEBAR--> */}

                {/* <!-- PAGE CONTAINER--> */}
                <div class="page-container">
                    {/* <!-- HEADER DESKTOP--> */}
                    <header class="header-desktop">
                        <div class="section__content section__content--p30">
                            <div class="container-fluid">
                                <div class="header-wrap">
                                    <form class="form-header" action="" method="POST">
                                        <input class="au-input au-input--xl" type="text" name="search"
                                            placeholder="Search for datas &amp; reports..." />
                                        <button class="au-btn--submit" type="submit">
                                            <i class="zmdi zmdi-search"></i>
                                        </button>
                                    </form>
                                    <div class="header-button">
                                        <div class="noti-wrap">
                                            <div class="noti__item js-item-menu">
                                                <i class="zmdi zmdi-comment-more"></i>
                                                <span class="quantity">1</span>
                                                <div class="mess-dropdown js-dropdown">
                                                    <div class="mess__title">
                                                        <p>You have 2 news message</p>
                                                    </div>
                                                    <div class="mess__item">
                                                        <div class="image img-cir img-40">
                                                            <img src="images/icon/avatar-06.jpg" alt="Michelle Moreno" />
                                                        </div>
                                                        <div class="content">
                                                            <h6>Michelle Moreno</h6>
                                                            <p>Have sent a photo</p>
                                                            <span class="time">3 min ago</span>
                                                        </div>
                                                    </div>
                                                    <div class="mess__item">
                                                        <div class="image img-cir img-40">
                                                            <img src="images/icon/avatar-04.jpg" alt="Diane Myers" />
                                                        </div>
                                                        <div class="content">
                                                            <h6>Diane Myers</h6>
                                                            <p>You are now connected on message</p>
                                                            <span class="time">Yesterday</span>
                                                        </div>
                                                    </div>
                                                    <div class="mess__footer">
                                                        <a href="#">View all messages</a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="noti__item js-item-menu">
                                                <i class="zmdi zmdi-email"></i>
                                                <span class="quantity">1</span>
                                                <div class="email-dropdown js-dropdown">
                                                    <div class="email__title">
                                                        <p>You have 3 New Emails</p>
                                                    </div>
                                                    <div class="email__item">
                                                        <div class="image img-cir img-40">
                                                            <img src="images/icon/avatar-06.jpg" alt="Cynthia Harvey" />
                                                        </div>
                                                        <div class="content">
                                                            <p>Meeting about new dashboard...</p>
                                                            <span>Cynthia Harvey, 3 min ago</span>
                                                        </div>
                                                    </div>
                                                    <div class="email__item">
                                                        <div class="image img-cir img-40">
                                                            <img src="images/icon/avatar-05.jpg" alt="Cynthia Harvey" />
                                                        </div>
                                                        <div class="content">
                                                            <p>Meeting about new dashboard...</p>
                                                            <span>Cynthia Harvey, Yesterday</span>
                                                        </div>
                                                    </div>
                                                    <div class="email__item">
                                                        <div class="image img-cir img-40">
                                                            <img src="images/icon/avatar-04.jpg" alt="Cynthia Harvey" />
                                                        </div>
                                                        <div class="content">
                                                            <p>Meeting about new dashboard...</p>
                                                            <span>Cynthia Harvey, April 12,,2018</span>
                                                        </div>
                                                    </div>
                                                    <div class="email__footer">
                                                        <a href="#">See all emails</a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="noti__item js-item-menu">
                                                <i class="zmdi zmdi-notifications"></i>
                                                <span class="quantity">3</span>
                                                <div class="notifi-dropdown js-dropdown">
                                                    <div class="notifi__title">
                                                        <p>You have 3 Notifications</p>
                                                    </div>
                                                    <div class="notifi__item">
                                                        <div class="bg-c1 img-cir img-40">
                                                            <i class="zmdi zmdi-email-open"></i>
                                                        </div>
                                                        <div class="content">
                                                            <p>You got a email notification</p>
                                                            <span class="date">April 12, 2018 06:50</span>
                                                        </div>
                                                    </div>
                                                    <div class="notifi__item">
                                                        <div class="bg-c2 img-cir img-40">
                                                            <i class="zmdi zmdi-account-box"></i>
                                                        </div>
                                                        <div class="content">
                                                            <p>Your account has been blocked</p>
                                                            <span class="date">April 12, 2018 06:50</span>
                                                        </div>
                                                    </div>
                                                    <div class="notifi__item">
                                                        <div class="bg-c3 img-cir img-40">
                                                            <i class="zmdi zmdi-file-text"></i>
                                                        </div>
                                                        <div class="content">
                                                            <p>You got a new file</p>
                                                            <span class="date">April 12, 2018 06:50</span>
                                                        </div>
                                                    </div>
                                                    <div class="notifi__footer">
                                                        <a href="#">All notifications</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="account-wrap">
                                            <div class="account-item clearfix js-item-menu">
                                                <div class="image">
                                                    <img src="images/icon/avatar-01.jpg" alt="John Doe" />
                                                </div>
                                                <div class="content">
                                                    <a class="js-acc-btn" href="#">john doe</a>
                                                </div>
                                                <div class="account-dropdown js-dropdown">
                                                    <div class="info clearfix">
                                                        <div class="image">
                                                            <a href="#">
                                                                <img src="images/icon/avatar-01.jpg" alt="John Doe" />
                                                            </a>
                                                        </div>
                                                        <div class="content">
                                                            <h5 class="name">
                                                                <a href="#">john doe</a>
                                                            </h5>
                                                            <span class="email">johndoe@example.com</span>
                                                        </div>
                                                    </div>
                                                    <div class="account-dropdown__body">
                                                        <div class="account-dropdown__item">
                                                            <a href="#">
                                                                <i class="zmdi zmdi-account"></i>Account</a>
                                                        </div>
                                                        <div class="account-dropdown__item">
                                                            <a href="#">
                                                                <i class="zmdi zmdi-settings"></i>Setting</a>
                                                        </div>
                                                        <div class="account-dropdown__item">
                                                            <a href="#">
                                                                <i class="zmdi zmdi-money-box"></i>Billing</a>
                                                        </div>
                                                    </div>
                                                    <div class="account-dropdown__footer">
                                                        <a href="#">
                                                            <i class="zmdi zmdi-power"></i>Logout</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </header>
                    {/* <!-- END HEADER DESKTOP--> */}




                    {/* <!-- MAIN CONTENT--> */}
                    <div class="main-content">
                        <div class="section__content section__content--p30">
                            <div class="container-fluid">

                                <div class="row">
                                    <div class="col-lg-12">
                                        {/* <!-- USER DATA--> */}
                                        <div class="user-data m-b-30">
                                            <h3 class="title-3 m-b-30">
                                                <i class="zmdi zmdi-account-calendar"></i>Usuarios
                                            </h3>
                                            <div class="filters m-b-45">
                                                <div class="rs-select2--dark rs-select2--md m-r-10 rs-select2--border">
                                                    <select class="js-select2" name="propiedad">
                                                        <option selected="selected">Todos</option>
                                                        <option value="">Usuarios Internos</option>
                                                        <option value="">Usuarios Externos</option>
                                                       
                                                    </select>
                                                    <div class="dropDownSelect2"></div>
                                                </div>
                                                <div class="rs-select2--dark rs-select2--sm  rs-select2--border">
                                                    <select class="js-select2 au-select-dark" name="order">
                                                        <option selected="selected">Filtros</option>
                                                        <option value="">Registros Recientes</option>
                                                        <option value="">Registros Antiguios</option>
                                                    </select>
                                                    <div class="dropDownSelect2"></div>
                                                </div>
                                                    <div class="m-t-30 mt-30">
                                                        
                                                       
                                                        <button type="button" className="au-btn au-btn-icon au-btn--green au-btn--small" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                                        <i className="zmdi zmdi-plus"></i>Añadir nuevo usuario</button>
                                                        

                                                        
                                                    </div>
                                            </div>
                                            
                                            
                                            <div class="table-responsive table-data">
                                                <table class="table">
                                                    <thead>
                                                        <tr>
                                                            {/* <td>
                                                                <label class="au-checkbox">
                                                                    <input type="checkbox"/>
                                                                    <span class="au-checkmark"></span>
                                                                </label>
                                                            </td> */}
                                                            <td>Nombre</td>
                                                            <td>Identificacion</td>
                                                            <td>Rol</td>
                                                            <td>Acciones</td>
                                                            {/* <!-- <td></td>< --> */}
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                    {
                                                        this.state.usuarios.map(usuario => {
                                                            return(
                                                                
                                                                    <tr key={usuario._id}>
                                                                        <td>
                                                                            <div class="table-data__info">
                                                                                <h6>{usuario.nombre}</h6>
                                                                                <span>
                                                                                    <a href="#">{usuario.correo}</a>
                                                                                </span>
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div class="table-data__info">
                                                                                <h6>{usuario.identificacion}</h6>
                                                                            </div>

                                                                        </td>
                                                                        <td>
                                                                            <span class="role admin">{usuario.rol}</span>
                                                                        </td>


                                                                        <td>
                                                                            <div class="table-data-feature">

                                                                                <button class="item" onClick={() => this.editarUsuario(usuario._id)} data-bs-toggle="modal" data-bs-target="#exampleModal" data-toggle="tooltip"
                                                                                    data-placement="top" title="Edit">
                                                                                    <i className="zmdi zmdi-edit"></i>
                                                                                </button>
                                                                                <button class="item" onClick={() => this.eliminarUsuario(usuario._id)}  data-toggle="tooltip"
                                                                                    data-placement="top" title="Delete">
                                                                                    <i className="zmdi zmdi-delete"></i>
                                                                                </button>
                                                                                {/* <span class="more">
                                                                                    <i className="zmdi zmdi-more"></i>
                                                                                </span> */}

                                                                            </div>
                                                                        </td> 
                                                                    </tr>
                                                            )
                                                                    
                                                            
                                                        })
                                                    }

                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                        {/* <!-- END USER DATA--> */}

                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
     
                </div>
                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Configuración de Usuarios</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
    
      <form onSubmit={this.agregarUsuario}>
            <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Nombre</label>
                <input type="text"  class="form-control" onChange={this.agregarInfo} value={this.state.nombre} name="nombre"/>
            </div>
            <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Correo Electronico</label>
                <input type="email" class="form-control" onChange={this.agregarInfo} value={this.state.correo} id="exampleInputEmail1" name="correo" aria-describedby="emailHelp"/>
                
            </div>

            <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Identificación</label>
                <input type="number" class="form-control" name="identificacion" value={this.state.identificacion} onChange={this.agregarInfo}/>
            </div>
            <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Rol</label>
                <input type="text"  class="form-control" onChange={this.agregarInfo} value={this.state.rol} name="rol"/>
            </div>
            
            <button type="submit" class="btn btn-primary">Enviar</button>
        </form>
        
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
      </div>
    </div>
  </div>
</div>

            </div>
            
            </div>
            
            
            


        )
    }


    
}
export default App;