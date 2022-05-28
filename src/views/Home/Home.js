import React, { Component, Suspense } from "react";
import { Row, Col } from 'reactstrap';
import { Route, Switch } from 'react-router-dom';
import Spinner from "react-spinkit";

import backgroundImage from '../../assets/img/logos/background.jpg'

import {
    AppBreadcrumb,
    AppFooter,
    AppHeader
  } from '@coreui/react';

// Modules
import Header from "./Header";
import Footer from "./Footer";
import routes from '../../routes';

const nameComponent = 'home';

class Home extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
            uploadStatus: false,
            file:null
        }

        if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    
        } else {
            // production code
            window.dataLayer = window.dataLayer || [];
        
            function gtag(){
                window.dataLayer.push(arguments);
            }
        
            gtag('js', new Date());
        
            gtag('config', 'G-5Q43P7YZRQ');
        }
    }
    
    loading = () => 
    <div className="container d-flex justify-content-center" style={{height:"100vh"}}>
        <div className="my-auto">
            <Spinner className="text-center text-info" name="ball-scale-multiple" color=""></Spinner>
        </div>
    </div>
    
    render(){
        return(
            <div className="app">
                <AppHeader className="bg-primary-home">
                    <Suspense  fallback={this.loading()}>
                        <Header></Header>
                    </Suspense>
                </AppHeader>
                <div className="app-body" style={{backgroundImage: `url(${backgroundImage})`,
            
           // height: "100%", 
           // width: "100%", 
            backgroundSize: "100%", 
           // backgroundRepeat: "no-repeat", 
          //  backgroundPosition: "center center",
           //  opacity: "0.15",
                    
            // position: "absolute",
                    //zIndex: "-1",
             //       top: "0", bottom: "0", left: "0", right: "0"
            }}>
                    <main className="main ml-0 mr-0">
                        <AppBreadcrumb appRoutes={routes} />
                        
                        
                            <Row className="justify-content-center">
                                <Col xs="0" md="0" sm="0" lg="0" xl="2"></Col>
                                <Col xs="12" md="12" sm="12" lg="12" xl="8">
                                    <Suspense fallback={this.loading()}>
                                        <Switch>
                                            {routes.map((route, idx) => {

                                                const isContaint = route.layout.includes(nameComponent);
                                                
                                                return route.component && isContaint ? (
                                                <Route
                                                    key={idx}
                                                    path={route.path}
                                                    exact={route.exact}
                                                    name={route.name}
                                                    render={props => (
                                                    <route.component {...props} />
                                                    )} />
                                                ) : (null);
                                            })}
                                            
                                        </Switch>
                                    </Suspense>

                                </Col>
                                <Col xs="0" md="0" sm="0" lg="0" xl="2"></Col>
                            </Row>
                       
                       
                    </main>
                </div>
                <AppFooter className="ml-0 mr-0">
                    <Suspense fallback={this.loading()}>
                        <Footer></Footer>
                    </Suspense>
                </AppFooter>
            </div>
        )
    }
}

export default Home;

