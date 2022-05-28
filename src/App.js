import React, { Component } from 'react';

import { 
    stateSite, 
    urlRecoveryPassword,
    urlChangePassword
} from './GlobalConfig';

import Loadable from 'react-loadable';
import './App.scss';
import Spinner from "react-spinkit";
import Loader from 'react-loader-advanced';

import { Route, Switch, Redirect,  BrowserRouter as Router } from 'react-router-dom';

// Redux
import { Provider } from 'react-redux';
import store from './store';

const loading = () => 
<div className="container d-flex justify-content-center" style={{height:"100vh"}}>
    <div className="my-auto">
        <Spinner className="text-center text-info" name="ball-scale-multiple" color=""></Spinner>
    </div>
</div>



// Home
const Home = Loadable({
    loader: () => import('./views/Home/Home')
    /*new Promise(resolve =>{
		
		setTimeout(() => {
			resolve(import('./views/Home/Home'))
		}, 100);
		
	})*/
    
    ,
    loading
});

// Login Employer
const LoginEmployer = Loadable({
    loader: () => import('./views/Login/LoginEmployer'),
    loading
});

// Login Admin
const LoginAdmin = Loadable({
    loader: () => import('./views/Login/LoginAdmin'),
    loading
});

// Login Postulant
const LoginPostulant = Loadable({
    loader: () => import('./views/Login/LoginPostulant'),
    loading
});

// Recovery Password
/*const RecoveryPassword = Loadable({
    loader: () => import('./views/RecoveryPassword/RecoveryPassword'),
    loading
});*/

// Error
const Error = Loadable({
    loader: () => import('./views/Error/Error'),
    loading
});

// DefaultLayoutEmployer
const DefaultLayoutEmployer = Loadable({
    loader: () => import('./components/DefaultLayout/Employer/DefaultLayoutEmployer'),
    loading
});

// DefaultLayoutAdmin
const DefaultLayoutAdmin = Loadable({
    loader: () => import('./components/DefaultLayout/Admin/DefaultLayoutAdmin'),
    loading
});

// DefaultLayoutPostulant
const DefaultLayoutPostulant = Loadable({
    loader: () => import('./components/DefaultLayout/Postulant/DefaultLayoutPostulant'),
    loading
});

// const Contenido = (props) => <h2 className="text-danger">{props.children}</h2>

class App extends Component {

    state = {
        isLoading: false,
        percentageUpload: ""
    }

    constructor(props){
        super(props);

        //localStorage.removeItem('tokenResult');
        //cookie.remove(webConfig.cookieNameAuth, { path: '/' })

        stateSite.setLoading = this.setLoading.bind(this);;
        stateSite.getLoading = this.getLoading.bind(this);;

        stateSite.setPercentajeUpload = this.setPercentajeUpload;
        stateSite.getPercentajeUpload = this.getPercentajeUpload;

        
    }
    
    componentDidMount(){

        if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
            // dev code
        } else {
            // production code
           
        }
       
    }

    componentDidUpdate (prevProps, prevState) {
        
    }

    

    setPercentajeUpload = (value) => {
        this.setState({
            percentageUpload: value
        });
    }

    getPercentajeUpload = () => {
        return this.state.percentageUpload;
    }

    setLoading = (value) => {
        this.setState({
            isLoading: value
        });
    }

    getLoading = () => {
        return this.state.isLoading;
    }

    render() {
        
        const spinner = 
            <div>
                <div style={{
                    position: "fixed",
                    width: "100%",
                    top: "30%"
                }} >
                    <span className="text-center text-danger font-weight-bold">{stateSite.getPercentajeUpload()}</span>
                </div>
                    
                <div style={{
                    position: "fixed",
                    left: "50%",
                    top: "50%"
                }}>
                    
                    <div className="text-center text-info">
                        
                        <Spinner className="text-center text-info" name="ball-scale-multiple" color=""></Spinner>
                    </div>
                </div>
            </div>

        return (
            
            <Provider store={store}>
                <Router>
                <Loader 
                    show={stateSite.getLoading()} 
                    message=
                        {spinner}
                       // disableDefaultStyles ={true}
                    /*foregroundStyle={{color: 'white'}}
                    backgroundStyle={{
                        backgroundColor: '#f0f3f5',
                        opacity: "0.3",
                        zIndex: 999999
                    }}*/
                    >


                        <Switch>
                            
                            <Route exact path="/" name="Home" component={Home} />
                            <Route exact path="/lecturas/*" name="Home" component={Home} />
                            <Route exact path="/buscador/oferta/:idJobOffer" name="Home" component={Home} />
                            <Route exact path="/buscador" name="Home" component={Home} />
                            <Route exact path="/validarEmail" name="validarEmail" component={Home} />
                            <Route exact path={urlChangePassword} name="validarEmail" component={Home} />
                            <Route exact path={urlRecoveryPassword} name="validarEmail" component={Home} />
                            <Route exact path="/login/postulante" name="Home" component={LoginPostulant} />
                            <Route exact path="/login/empleador" name="Home" component={LoginEmployer} />
                            <Route exact path="/login/administrador" name="Home" component={LoginAdmin} />
                            <Route exact path="/registrarse/*" name="Home" component={Home} />
                            <Route exact path="/area/postulante/*" name="Postulante" component={DefaultLayoutPostulant} />
                            <Route exact path="/area/empleador/*" name="Empleador" component={DefaultLayoutEmployer} />
                            <Route exact path="/area/admin/*" name="Empleador" component={DefaultLayoutAdmin} />
                            

                            <Route exact path="/error" component={Error}></Route>
                            <Redirect to="/error"></Redirect>
                            {/*<Route exact path="/" component={Home}>
                            </Route>
                            <Route exact path="/login" component={Login}>
                            </Route>
                            <Route exact path="/registrarse" component={Register}>
                            </Route>
                            
                            <PrivateRoute exact path="/register" component={Register} ></PrivateRoute>
                            */}
                                {/*  
                            <Route exact path="/registrarse/postulante" component={RegisterPostulant}>
                            </Route>*/}
                            {/* 
                            <PrivateRoute exact path="/area/postulante" component={AreaPostulant} ></PrivateRoute>
                            
                            <Route exact path="/area/postulante" component={AreaPostulant}></Route>*/}
                            {/*
                            <PrivateRoute exact path="/registrarse/postulante" component={RegisterPostulant} ></PrivateRoute>
                            
                            <Route exact path="/registrarse/empleador" component={RegisterCompany}>
                            </Route>
                            */}
                            
                        </Switch>
                    </Loader>
                </Router>
            </Provider>   
            
        );
    }
}

export default App;

