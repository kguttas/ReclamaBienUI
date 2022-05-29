import './App.css'
import './scss/style.scss'

import 'bootstrap/dist/css/bootstrap.min.css';

import { registerLicense, setCulture, setCurrencyCode, loadCldr } from '@syncfusion/ej2-base';
import { createSpinner, showSpinner } from '@syncfusion/ej2-react-popups';

import * as gregorian from 'cldr-data/main/es/ca-gregorian.json';
import * as numbers from 'cldr-data/main/es/numbers.json';
import * as timeZoneNames from 'cldr-data/main/es/timeZoneNames.json';
import * as numberingSystems from 'cldr-data/supplemental/numberingSystems.json';
import * as weekData from 'cldr-data/supplemental/weekData.json';// To load the culture based first day of week



import React, { Component } from 'react';

import { 
    stateSite, 
    urlRecoveryPassword,
    urlChangePassword
} from './GlobalConfig';

import Loadable from 'react-loadable';

import { Route, Navigate,  Routes, BrowserRouter } from 'react-router-dom';

// Redux
import { Provider } from 'react-redux';
import store from './store';

///////////////////////////

// Registering Syncfusion license key
registerLicense('ORg4AjUWIQA/Gnt2VVhhQlFac1hJXGFWfVJpTGpQdk5xdV9DaVZUTWY/P1ZhSXxRdkBhUX9edHZXQGZdVEQ=');

loadCldr(numberingSystems, gregorian, numbers, timeZoneNames, weekData);

setCulture('es');
setCurrencyCode('CLP');

let spinnerInstance = null;

const loading = (props) => {

    createSpinner({
        target: spinnerInstance,
        label: "Cargando...",
        cssClass: "e-spin-overlay"
    });

    showSpinner(spinnerInstance);

    return(
        <div className="container d-flex justify-content-center" style={{ height: "100vh" }}>
            <div className="my-auto">
                
                <div ref={spinner => {
                        spinnerInstance = spinner;
                    }} id="spinner"></div>
            </div>
        </div>
    )
}

// Home
const HomeLayout = Loadable({
    loader: () =>  import('./views/Layouts/HomeLayout')
    // new Promise(resolve =>{
		
	// 	setTimeout(() => {
	// 		resolve(import('./views/Layouts/HomeLayout'))
	// 	}, 100);
		
	// })
    , loading
});

// Error
const Error = Loadable({
    loader: () => import('./views/Error/Error'),
    loading
});

// Login Employer
const Login = Loadable({
    loader: () => import('./views/Home/Content/Login'),
    loading
});

// // Login Employer
// const LoginEmployer = Loadable({
//     loader: () => import('./views/Login/LoginEmployer'),
//     loading
// });

// // Login Admin
// const LoginAdmin = Loadable({
//     loader: () => import('./views/Login/LoginAdmin'),
//     loading
// });

// // Login Postulant
// const LoginPostulant = Loadable({
//     loader: () => import('./views/Login/LoginPostulant'),
//     loading
// });

// // Recovery Password
// /*const RecoveryPassword = Loadable({
//     loader: () => import('./views/RecoveryPassword/RecoveryPassword'),
//     loading
// });*/



// // DefaultLayoutEmployer
// const DefaultLayoutEmployer = Loadable({
//     loader: () => import('./components/DefaultLayout/Employer/DefaultLayoutEmployer'),
//     loading
// });

// // DefaultLayoutAdmin
// const DefaultLayoutAdmin = Loadable({
//     loader: () => import('./components/DefaultLayout/Admin/DefaultLayoutAdmin'),
//     loading
// });

// // DefaultLayoutPostulant
// const DefaultLayoutPostulant = Loadable({
//     loader: () => import('./components/DefaultLayout/Postulant/DefaultLayoutPostulant'),
//     loading
// });

// const Contenido = (props) => <h2 className="text-danger">{props.children}</h2>

class App extends Component {

    // state = {
    //     isLoading: false,
    //     percentageUpload: ""
    // }

    // constructor(props){
    //     super(props);

        
    //     //localStorage.removeItem('tokenResult');
    //     //cookie.remove(webConfig.cookieNameAuth, { path: '/' })

    //     stateSite.setLoading = this.setLoading.bind(this);;
    //     stateSite.getLoading = this.getLoading.bind(this);;

    //     stateSite.setPercentajeUpload = this.setPercentajeUpload;
    //     stateSite.getPercentajeUpload = this.getPercentajeUpload;

        
    // }
    
    UNSAFE_componentWillMount(prevProps) {

        if (this.spinnerInstance) {
            createSpinner({
                target: this.spinnerInstance
            });
            showSpinner(this.spinnerInstance);
        }
       
        if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
            // dev code
        } else {
            // production code
           
        }
       
    }
    

    // setPercentajeUpload = (value) => {
    //     this.setState({
    //         percentageUpload: value
    //     });
    // }

    // getPercentajeUpload = () => {
    //     return this.state.percentageUpload;
    // }

    // setLoading = (value) => {
    //     this.setState({
    //         isLoading: value
    //     });
    // }

    // getLoading = () => {
    //     return this.state.isLoading;
    // }

    render() {
        
        return (
            
            <Provider store={store}>
                <BrowserRouter>
                <Routes>
                    <Route exact path="*" name="Home" element={<HomeLayout />} />
                    
                        {/* 404 rounte */}
                    {/* <Route exact path="*" element={<Error />} /> */}
                    
                            { /*<Route exact path="/lecturas/*" name="Home" component={Home} />
                            
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
                        <Redirect to="/error"></Redirect> */}

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
                        
                    </Routes>
                </BrowserRouter>
            </Provider> 
        );
    }
}

export default App;

