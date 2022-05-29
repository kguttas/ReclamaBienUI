import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { webConfig } from '../../GlobalConfig';
import { 
    ButtonDropdown, 
    DropdownItem, 
    DropdownMenu, 
    DropdownToggle
 } from 'reactstrap';
import logoHeader from '../../assets/img/logos/Airbnb_Logo_Bélo.svg.png';
 
///////////////////////////////

const styles = {
    divHeader: {
        padding: '12px 15px',
        borderBottom: '1px solid rgb(0,0,0,0.3)'
    }
}

class Header extends Component {

    constructor(props) {
        super(props);
    
        this.toggle = this.toggle.bind(this);
        this.state = {
          dropdownOpen: new Array(1).fill(false),
        };
      }
    
      toggle(i) {
        const newArray = this.state.dropdownOpen.map((element, index) => { return (index === i ? !element : false); });
        this.setState({
          dropdownOpen: newArray,
        });
      }

    render() {
        return (
            <div>
                <div className="pull-left" style={{
                    
                }}>
                    
                        <Link to={`${webConfig.subFolderURL}/`} className="text-light" replace>
                            <img src={logoHeader} alt={webConfig.contactEmail} height="64"></img>
                        </Link>
                    
                </div>
                {/* <div className="pull-right d-xs-block d-sm-block  d-md-block d-lg-none d-xl-none">
                    <div className="form-inline">
                    <ButtonDropdown className="mr-1" isOpen={this.state.dropdownOpen[0]} toggle={() => { this.toggle(0); }}>
                        <DropdownToggle caret color="dark">
                            Opciones
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem header>Seleccione...</DropdownItem>
                            
                            <DropdownItem>
                                <Link to={'/login/postulante'} className="btn btn-primary nuevo-post mr-1  w-100">Postulante</Link>
                            </DropdownItem>
                            
                            <DropdownItem>
                                <Link to={'/login/empleador'} className="btn btn-dark nuevo-post mr-1  w-100">Empleador</Link>
                            </DropdownItem>
                        </DropdownMenu>
                    </ButtonDropdown>
                        
                    </div>
                </div>
                <div className="pull-right d-none d-xs-none d-sm-none  d-md-none d-lg-block d-xl-block">
                    <div className="form-inline">
                        <Link to={'/login/postulante'} className="btn btn-primary nuevo-post mr-1">Postulante</Link>
                        <Link to={'/login/empleador'} className="btn btn-dark nuevo-post mr-1">Empleador</Link>
                    </div>
                </div> */}
            </div>
        )
    }
}

export default Header;