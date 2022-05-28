import React from 'react';
import { Link } from 'react-router-dom';



class Register extends React.Component {
    render() {
        return (
            <div className="container">
                <div>Registrarse</div>
                <div>
                    <Link to={'/registrarse/postulante'} className="text-dark">POSTULANTE</Link>
                </div>
                <div>
                    <Link to={'/registrarse/empleador'} className="text-dark">EMPRESA</Link>
                </div>
            </div>
            )
    }
}

export default Register;