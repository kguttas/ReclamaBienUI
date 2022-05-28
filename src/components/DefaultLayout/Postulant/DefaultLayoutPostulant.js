import React, { Component, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Container } from 'reactstrap';
import Spinner from "react-spinkit";
import cookie from 'react-cookies';
import { urlLoginPostulant, webConfig, stateSite } from '../../../GlobalConfig';
import PropTypes from "prop-types";

import {
  //AppAside,
  AppBreadcrumb,
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppSidebarNav,
} from '@coreui/react';
// sidebar nav config
import navigation from '../../../_navAreaPostulant';
// routes config
import routes from '../../../routes';

import Loading from 'react-loading-bar';
import 'react-loading-bar/dist/index.css';

// Redux
import { connect } from 'react-redux';
import { getPostulant, resetReducer as resetReducerUsers } from '../../../actions/usersActions';
import { resetReducer as resetReducerParameters } from '../../../actions/parametersActions';
import { resetReducer as resetReducerGeographics } from '../../../actions/geographicsActions';

//const DefaultAside = React.lazy(() => import('./DefaultAside'));
const DefaultFooter = React.lazy(() => import('./DefaultFooter'));
const DefaultHeader = React.lazy(() => import('./DefaultHeader'));

const nameComponent = 'DefaultLayoutPostulant';

class DefaultLayoutPostulant extends Component{

    static propTypes = {
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
      };

    constructor(props){
        super(props);

        const tokenResult = cookie.load(webConfig.cookieNameAuth);
        
        this.state = {
            dataEmployer: null,
            showTopProgressBar: true,
            tokenResult: tokenResult
        };

        this.signOut = this.signOut.bind(this);
        this.setDataPostulant = this.setDataPostulant.bind(this);
        this.getDataPostulant = this.getDataPostulant.bind(this);   
        
    }   

    componentDidMount() {

        /*this.unlisten = this.props.history.listen((location, action) => {
            //console.log(location);
            //console.log(action);
            console.log("on route change");
        });*/
        
        this.props.getPostulant();
        
    }

    componentDidUpdate(prevProps, prevState) {
        //console.log(this.props.location.pathname);
        if (this.props.location !== prevProps.location) {
            //console.log(this.props.location.pathname);
            if(!this.state.showTopProgressBar){
                this.setState({showTopProgressBar:true});
            }else{
                this.setState({showTopProgressBar:false});
            }
        }else{
            if(this.state.showTopProgressBar){
                setTimeout(() => {
                    this.setState({showTopProgressBar:false});
                }, Math.random()*500 + 500);
            }
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps, nextState) {

        if(this.props.postulant !== nextProps.postulant){
        
            const { postulant } = nextProps;
            
            if(!postulant){

                cookie.remove(webConfig.cookieNameAuth, { path: '/' });
        
                this.props.history.push(urlLoginPostulant);
            }
            stateSite.postulant = nextProps.postulant;
            this.setState({postulant: postulant});
        }
    }

    /*onRouteChanged() {
        //console.log("ROUTE CHANGED");
    }*/

    /*componentWillUnmount() {
        
        //this.unlisten();
    }*/

    loading = () => 
    <div className="container d-flex justify-content-center" style={{height:"100vh"}}>
        <div className="my-auto">
            <Spinner className="text-center text-info" name="ball-scale-multiple" color=""></Spinner>
        </div>
    </div>

    signOut = (e) => {
        e.preventDefault();

        /** 
         * Reset to initial state
         */
        this.props.resetReducerUsers();
        this.props.resetReducerParameters();
        this.props.resetReducerGeographics();
        
        cookie.remove(webConfig.cookieNameAuth, { path: '/' });
        
        this.props.history.push(urlLoginPostulant);
    }

    getDataPostulant = () =>{
        console.log("getDataPostulant");
        return this.state.postulant;
    }

    setDataPostulant = value => {
        
        this.setState({postulant: value});

    }
   
    render() {
        return (
            
        <div className="animated fadeIn">

            <Loading
                show={this.state.showTopProgressBar}
                color="#f86c6b"
                change={true}
                showSpinner={true}
                />
            
            <div className="app"  >
            
                <AppHeader fixed>
                <Suspense  fallback={this.loading()}>
                    <DefaultHeader 
                        signOut={e=>this.signOut(e)}
                         postulant={this.state.postulant}
                    ></DefaultHeader>
                </Suspense>
                </AppHeader>
                <div className="app-body" >
                    <AppSidebar fixed display="lg">
                        <AppSidebarHeader />
                        <AppSidebarForm />
                        <Suspense>
                            <AppSidebarNav navConfig={navigation} {...this.props} />
                        </Suspense>
                        <AppSidebarFooter />
                        <AppSidebarMinimizer />
                    </AppSidebar>
                   
                    <main className="main" >
                    
                        <AppBreadcrumb appRoutes={routes} />
                        <Container fluid className="p-0 px-md-5">
                            <Suspense fallback={ this.loading()}>
                            
                                <Switch >
                                    
                                {routes.map((route, idx) => {
                                    

                                    const isContaint = route.layout.includes(nameComponent);

                                    
                                    /*let resultFn = {};

                                    resultFn = function (props, me) {
                                        return (<route.component 
                                            {...props} 
                                            signOut={me.signOut}
                                            data={"Mis Datos"} ></route.component>)
                                    }*/
                                    const { params } = route;

                                    return route.component && isContaint  ? (
                                    <Route 
                                        key={idx}
                                        path={route.path}
                                        exact={route.exact}
                                        name={route.name}
                                        myProps={this.props}
                                        render={props => {

                                            let claimsToken = null;

                                            if(this.state.tokenResult){
                                                const jwtParts = this.state.tokenResult.split('.');
                                                const decodedString = atob(jwtParts[1]);
                                                claimsToken = JSON.parse(decodedString);
                                            }

                                            if(this.state.tokenResult && claimsToken && claimsToken.role && claimsToken.role.includes("Postulant")){
                                                return(
                                                    <route.component 
                                                    {...props} 
                                                    signOut={this.signOut}
                                                    params={params ? params : null}    
                                                    postulant={this.state.postulant}
                                                    setDataPostulant={this.setDataPostulant}
                                                    getDataPostulant={this.getDataPostulant}                                              
                                                    ></route.component>
                                                )
                                            }else{
                                                return(
                                                    <Redirect to={{ pathname: `/login/postulante`/*, search: "?q=react"*/, state: { from: this.props.match.url } }} 
                                                    preserveQueryString
                                                    ></Redirect>
                                                )
                                            }
                                        }}
                                        //component={ props => (resultFn(this.props, this))}
                                        ></Route>
                                    ) : (null);
                                })}
                                 <Route exact path="/error" component={Error}></Route>
                            <Redirect to="/error"></Redirect>
                                </Switch>
                                
                            </Suspense>
                        </Container>
                        
                    </main>
                    
               {/*  <AppAside fixed>
                    <Suspense fallback={this.loading()}>
                    <DefaultAside />
                    </Suspense>
                </AppAside> */}
                </div>
                <AppFooter>
                    <Suspense fallback={this.loading()}>
                        <DefaultFooter />
                    </Suspense>
                </AppFooter>
                
            </div>
            
        </div>
        
        );
    }
}
const mapStateToProps = state => ({
    postulant: state.userAuth.postulant,
    //saveDataEmployer: state.userAuth.resultDataEmployer
})

export default connect(mapStateToProps, { 
    getPostulant,
    resetReducerUsers,
    resetReducerParameters,
    resetReducerGeographics,
})(DefaultLayoutPostulant);