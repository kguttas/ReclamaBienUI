import React, { Component } from "react";
import { 
    //Badge, 
    Card,
    CardBody,
} from 'reactstrap';
import { Link } from 'react-router-dom';

class Dashboard extends Component{
    render() {
        return(<div className="animated fadeIn">
            <Card>
                <CardBody>
                <p><span role="img" aria-label="Check">➡️</span>Antes de postular a una oferta de empleo primero complete su perfil en <Link to="/area/postulante/perfil" className="btn btn-info">Datos Personales</Link> y a continuación complete su curriculum vitae en <Link to="/area/postulante/miCV" className="btn btn-info">Mi CV</Link>.</p>
                </CardBody>
            </Card>
        </div>);
    }
}
export default Dashboard;