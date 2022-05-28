import React, { Component } from "react";
//import {  Col, Row } from 'reactstrap';
import { 
   // Badge, 
    Card,
    CardBody,
} from 'reactstrap';
import { Link } from 'react-router-dom';
class Dashboard extends Component{
    render() {
        //const {data} = this.props;
        return(
            <div className="animated fadeIn">
                <Card>
                    <CardBody>
                    <p><span role="img" aria-label="Check">➡️</span>Antes de crear una oferta de empleo primero complete su perfil de empresa o persona natural en <Link to="/area/empleador/perfilEmpresa" className="btn btn-info">Perfil Empresa</Link> y a continuación cree ofertas de empleos en <Link to="/area/empleador/ofertas" className="btn btn-info">Ofertas Laborales</Link>.</p>
                    </CardBody>
                </Card>
            </div>
        );
    }
}
export default Dashboard;