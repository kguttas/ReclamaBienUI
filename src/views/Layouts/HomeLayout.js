import { Component } from 'react';

import {
    CContainer,
    CHeader,
    CFooter,
    CHeaderBrand,
    CHeaderDivider,
    CHeaderNav,
    CHeaderToggler,
    CNavLink,
    CNavItem,
} from '@coreui/react';

import { Row, Col } from 'reactstrap';
  
import Header from "../Home/Header";

import { AppFooter, AppContent } from '../../components/HomeLayout/Index'


//////////////////////////////

class Home extends Component {



    render() {
        
        return (
            <div className="wrapper d-flex flex-column min-vh-100 bg-light">
                <CHeader position="sticky" className="mb-4">
                    <CContainer fluid style={{padding: '0px'}}>

                        <Header></Header>

                    </CContainer>
                    
                </CHeader>
                <div className="body flex-grow-1 px-3">
                    <main className="main ml-0 mr-0">
                        <Row className="justify-content-center">
                            <Col xs="0" md="0" sm="0" lg="0" xl="2"></Col>
                            <Col xs="12" md="12" sm="12" lg="12" xl="8">
                                <AppContent/>    
                            </Col>
                            <Col xs="0" md="0" sm="0" lg="0" xl="2"></Col>
                        </Row>
                    </main>
                </div>
                <AppFooter>
                </AppFooter>
            </div>
        )
    }
}

export default Home;