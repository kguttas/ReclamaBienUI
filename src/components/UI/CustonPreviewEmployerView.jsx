import React, { Component } from 'react';
import moment from 'moment-timezone';
import { webConfig } from '../../GlobalConfig';
import Img from 'react-image';
import loadingImage from '../../assets/img/loading.gif';

export default class CustonPreviewEmployerView extends Component {

    constructor(props) {
        super(props);
        
        this.tz = moment.tz.guess();
        
        this.state = {
            ...this.props.employer
        };
    }
    

    render() {

        const urlLogo = this.state.rutaLogoEmpresa ? `${webConfig.urlImages}/${this.state.rutaLogoEmpresa}` : null;

        return (
        <>
            <div>
                <strong> Id AspNet</strong>: {this.state.frk_AspNetUsers ? this.state.frk_AspNetUsers.id : null}
            </div>
            <div>
            <strong>Id</strong>: {this.state.id}
            </div>
            <div>
            <strong>País</strong>: {this.state.pais}
            </div>
            <div>
            <strong>Región</strong>: {this.state.region}
            </div>
            <div>
            <strong>Comuna</strong>: {this.state.comuna}
            </div>
            <div>
            <strong>Sector Comercial</strong>: {this.state.sectorComercial}
            </div>
            <div>
            <strong>Cantidad Trabajadores</strong>: {this.state.cantidadTrabajadores}
            </div>
            <div>
            <strong>Tipo de Empresa</strong>: {this.state.tipoEmpresa}
            </div>
            <div>
            <strong>Cargo</strong>: {this.state.cargo}
            </div>
            <div>
            <strong>Nombre Comercial Empresa</strong>: {this.state.nombreComercialEmpresa}
            </div>
            <div>
            <strong> Razón Social</strong>: {this.state.razonSocial}
            </div>
            <div>
            <strong> Nombre Persona</strong>: {this.state.nombrePersona}
            </div>
            <div>
            <strong> Apellido Persona</strong>: {this.state.apellidoPersona}
            </div>
            <div>
            <strong> Fecha Nacimiento</strong>: {moment(this.state.fechaNacimiento).tz(this.tz).format('DD/MM/YYYY')}
            </div>
            <div>
            <strong>Fecha Creación</strong>: { moment(this.state.fechaCreacion).tz(this.tz).format('DD/MM/YYYY, HH:mm:ss')}
            </div>
            <div>
            <strong>Fecha Actualización</strong>: { moment(this.state.fechaActualizacion).tz(this.tz).format('DD/MM/YYYY, HH:mm:ss')}
            </div>

            
            <div>
            <strong> Persona Jurídica</strong>: {this.state.bPersonaJuridica ? 'Sí' : 'No'}
            </div>
            <div>
            <strong>RUT</strong>: {this.state.rut}
            </div>
            <div>
            <strong>Ciudad</strong>: {this.state.ciudad}
            </div>
            <div>
            <strong>Dirección</strong>: {this.state.direccion}
            </div>
            <div>
            <strong>Código Postal</strong>: {this.state.codigoPostal}
            </div>
            <div>
            <strong>Teléfono</strong>: {this.state.telefono}
            </div>
            <div>
            <strong>Celular</strong>: {this.state.celular}
            </div>
            <div>
            <strong> Decripción Empresa</strong>: <p>{this.state.descripcionEmpresa}</p>
            </div>
            <div>
            <strong>URL Empresa</strong>: {this.state.urlEmpresa}
            </div>
            <div>
            <strong>Anulado</strong>: {this.state.bAnulado ? 'Sí' : 'No'}
            </div>
            
            <Img 
                className="img-avatar"
                style={{maxHeight:"100px" , borderRadius: "0px"}}
                src={[urlLogo, loadingImage]}
                loader={<img src={loadingImage} className="img-avatar" alt={this.state.nombrePersona + " " + this.state.apellidoPersona}  ></img>}
            ></Img>
        </>
        )
    }
}
