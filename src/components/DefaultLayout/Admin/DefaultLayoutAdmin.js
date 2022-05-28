import React, { Component, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Container } from 'reactstrap';
import Spinner from "react-spinkit";
import cookie from 'react-cookies';
import { urlLoginAdmin, webConfig, stateSite } from '../../../GlobalConfig';
import PropTypes from "prop-types";

import {
  AppAside,
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
import navigation from '../../../_navAreaAdmin';
// routes config
import routes from '../../../routes';

import Loading from 'react-loading-bar'
import 'react-loading-bar/dist/index.css'

// Redux
import { connect } from 'react-redux';
import { getEmployer, resetReducer as resetReducerUsers } from '../../../actions/usersActions';
import { resetReducer as resetReducerParameters } from '../../../actions/parametersActions';
import { resetReducer as resetReducerGeographics } from '../../../actions/geographicsActions';

const DefaultAside = React.lazy(() => import('./DefaultAside'));
const DefaultFooter = React.lazy(() => import('./DefaultFooter'));
const DefaultHeader = React.lazy(() => import('./DefaultHeader'));



const nameComponent = 'DefaultLayoutAdmin';

class DefaultLayoutEmployer extends Component{

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
            tokenResult:tokenResult,
            showTopProgressBar: true
        };

        this.signOut = this.signOut.bind(this);
        this.setDataEmployer = this.setDataEmployer.bind(this);
        this.getDataEmployer = this.getDataEmployer.bind(this);
       
    }   

    UNSAFE_componentWillReceiveProps(nextProps, nextState) {

        /*if(this.props.employer !== nextProps.employer){
        
            const {employer, aspnetUser} = nextProps.employer;
            
            if(!employer || !aspnetUser){

                cookie.remove(webConfig.cookieNameAuth, { path: '/' });
        
                this.props.history.push(urlLoginEmployer);
            }
            stateSite.dataEmployer = nextProps.employer;
            this.setState({dataEmployer: nextProps.employer});
        }*/
    }

    
    componentDidMount() {

        /*this.unlisten = this.props.history.listen((location, action) => {
            //console.log(location);
            //console.log(action);
            console.log("on route change");
        });*/
        
        //this.props.getEmployer();
        this.setState({showTopProgressBar:false});
    }
    
    componentDidUpdate(prevProps, prevState) {

        if (this.props.location !== prevProps.location) {
            //console.log(this.props.location.pathname);
            if(!this.state.showTopProgressBar){
                this.setState({showTopProgressBar:true});
            }
        }else{
            if(this.state.showTopProgressBar){
                setTimeout(() => {
                    this.setState({showTopProgressBar:false});
                }, Math.random()*500 + 500);
            }
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
        stateSite.dataEmployer = null;

        cookie.remove(webConfig.cookieNameAuth, { path: '/' });
        
        this.props.history.push(urlLoginAdmin);
    }

    getDataEmployer = () =>{
        console.log("getDataEmployer");
        return this.state.dataEmployer;
    }

    setDataEmployer = value => {
        const dataEmployer = {aspnetUser: this.state.dataEmployer.aspnetUser, employer: value};
        this.setState({dataEmployer: dataEmployer});
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
                    <DefaultHeader signOut={e=>this.signOut(e)}
                        dataEmployer={this.state.dataEmployer}
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

                                                if(this.state.tokenResult && claimsToken && claimsToken.role && claimsToken.role.includes("Admin")){
                                                    return(
                                                        <route.component 
                                                        {...props} 
                                                        signOut={this.signOut}
                                                        dataEmployer={this.state.dataEmployer}
                                                        setDataEmployer={this.setDataEmployer}
                                                        getDataEmployer={this.getDataEmployer}
                                                        ></route.component>
                                                    )
                                                }else{
                                                    return(
                                                        <Redirect to={{ pathname: '/login/administrador', state: { from: props.location } }} ></Redirect>
                                                    )
                                                }
                                            }}
                                            //component={ props => (resultFn(this.props, this))}
                                            ></Route>
                                        ) : (null);
                                    })}
                                    
                                    </Switch>
                            </Suspense>
                        </Container>
                        
                    </main>
                    
                <AppAside fixed>
                    <Suspense fallback={this.loading()}>
                    <DefaultAside />
                    </Suspense>
                </AppAside>
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
    employer: state.userAuth.employer,
    //saveDataEmployer: state.userAuth.resultDataEmployer
})

export default connect(mapStateToProps, { 
    getEmployer,
    resetReducerUsers,
    resetReducerParameters,
    resetReducerGeographics,
})(DefaultLayoutEmployer);