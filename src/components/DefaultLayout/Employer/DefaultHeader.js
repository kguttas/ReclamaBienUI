import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { 
  //Badge,
   Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem, 
   //NavLink 
  } from 'reactstrap';
import PropTypes from 'prop-types';
import Img from 'react-image';
import { webConfig } from '../../../GlobalConfig';

import { 
  //AppAsideToggler, 
  AppHeaderDropdown, AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import logo from '../../../assets/img/logos/Logo-N-Empleos-194x55-px.png'
import sygnet from '../../../assets/img/logos/android-chrome-192x192.png'
import loadingImage from '../../../assets/img/loading.gif'
import avatar1 from '../../../assets/img/avatars/avatar1.png'

const propTypes = { 
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultHeader extends Component {

    constructor(props){
        super(props);

        this.state = {
            urlImgAvatar: '',
			altAvatarImg: '',
			nameContactPerson: '',
			ddAvatar: false,
        };
    }

    UNSAFE_componentWillReceiveProps(nextProps, nextState) {
		
        if(this.props.dataEmployer !== nextProps.dataEmployer){
            //console.log("Header Update Props");

			//console.log(nextProps.dataEmployer);

            const {employer, aspnetUser} = nextProps.dataEmployer;

            if(employer !== null && aspnetUser !== null){

				this.setState({altAvatarImg: aspnetUser.email});
				
                if(employer.bPersonaJuridica){
                    
                    this.setState(
                    {
                        nameContactPerson: employer.nombrePersona + " " + employer.apellidoPersona + " | " + employer.email,
                        urlImgAvatar: `${webConfig.urlImagesNotCache}/${employer.rutaLogoEmpresa}`
					});
					
                }else{
                    this.setState(
                      {
                        nameContactPerson: employer.nombrePersona + " " + employer.apellidoPersona + " | " + employer.email,
                        urlImgAvatar: avatar1
                      });
				}
                
			}
		}else{

			if(this.props.getDataEmployer()){
				const {employer, aspnetUser} = this.props.getDataEmployer();

				if(employer !== null && aspnetUser !== null){
					//console.log("getDataEmployer");
					this.setState({altAvatarImg: aspnetUser.email});
					
					if(employer.bPersonaJuridica){
						
						this.setState(
						{
							nameContactPerson: employer.nombrePersona + " " + employer.apellidoPersona + " | " + employer.email,
							urlImgAvatar: `${webConfig.urlImagesNotCache}/${employer.rutaLogoEmpresa}`
						});
						
					}else{
						this.setState(
							{
							nameContactPerson: employer.nombrePersona + " " + employer.apellidoPersona + " | " + employer.email,
							urlImgAvatar: avatar1
							});
					}
				}
			}

		}
	}

    componentDidMount() {
        //const {employer} = this.props.dataEmployer;
        //this.props.getDataEmployer(this.state.dataEmployer);
        //console.log(this.props.getDataEmployer());
        //this.setState({nameContactPerson: employer.nombrePersona});
	}
	
	toggle_ddAvatar = (e) => {
		this.setState({ddAvatar: !this.state.ddAvatar});
	}

  render() {

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <AppNavbarBrand
          full={{ src: logo, width: 89, height: 25, alt: 'CoreUI Logo' }}
          minimized={{ src: sygnet, width: 30, height: 30, alt: 'CoreUI Logo' }}
        />
        <AppSidebarToggler className="d-md-down-none" display="lg" />

        <Nav className="d-md-down-none" navbar>
          <NavItem className="px-3">
            <Link to="/area/empleador/dashboard">Dashboard</Link>
          </NavItem>
          <NavItem className="px-3">
            <Link to="/area/empleador/perfilEmpresa">Perfil empresa</Link>
          </NavItem>
          <NavItem className="px-3">
            <Link to="/area/empleador/ofertas">Ofertas Laborales</Link>
          </NavItem>
        </Nav>
        <Nav className="ml-auto" navbar>
          <NavItem className="d-md-down-none">
            <p className="mb-0 pb-0">{this.state.nameContactPerson}</p>
          </NavItem>
         {/*  <NavItem className="d-md-down-none">
            <NavLink href="#"><i className="icon-bell"></i><Badge pill color="danger">5</Badge></NavLink>
          </NavItem>
          <NavItem className="d-md-down-none">
            <NavLink href="#"><i className="icon-list"></i></NavLink>
          </NavItem>
          <NavItem className="d-md-down-none">
            <NavLink href="#"><i className="icon-location-pin"></i></NavLink>
          </NavItem> */}
          <AppHeaderDropdown direction="down">
            <Dropdown isOpen={this.state.ddAvatar} toggle={this.toggle_ddAvatar}>
				<DropdownToggle nav>
				{/*
				<img src={this.state.urlImgAvatar} className="img-avatar" alt="admin@bootstrapmaster.com" />
				*/}
					<Img 
						className="img-avatar"
						src={[this.state.urlImgAvatar, loadingImage]}
						loader={<img src={loadingImage} className="img-avatar" alt={this.state.altAvatarImg} ></img>}
					></Img>
				</DropdownToggle>
				<DropdownMenu right>
					{/* <DropdownItem header tag="div" className="text-center"><strong>Account</strong></DropdownItem>
					<DropdownItem><i className="fa fa-bell-o"></i> Updates<Badge color="info">42</Badge></DropdownItem>
					<DropdownItem><i className="fa fa-envelope-o"></i> Messages<Badge color="success">42</Badge></DropdownItem>
					<DropdownItem><i className="fa fa-tasks"></i> Tasks<Badge color="danger">42</Badge></DropdownItem>
					<DropdownItem><i className="fa fa-comments"></i> Comments<Badge color="warning">42</Badge></DropdownItem>
					<DropdownItem header tag="div" className="text-center"><strong>Settings</strong></DropdownItem>
					<DropdownItem><i className="fa fa-user"></i> Profile</DropdownItem>
					<DropdownItem><i className="fa fa-wrench"></i> Settings</DropdownItem>
					<DropdownItem><i className="fa fa-usd"></i> Payments<Badge color="secondary">42</Badge></DropdownItem>
					<DropdownItem><i className="fa fa-file"></i> Projects<Badge color="primary">42</Badge></DropdownItem>
					<DropdownItem divider />
					<DropdownItem><i className="fa fa-shield"></i> Lock Account</DropdownItem> */}
					<DropdownItem onClick={e => this.props.signOut(e)}><i className="fa fa-lock"></i> Salir</DropdownItem>
				</DropdownMenu>
            </Dropdown>
          </AppHeaderDropdown>
        </Nav>
       {/*  <AppAsideToggler className="d-md-down-none" />
        <AppAsideToggler className="d-lg-none" mobile /> */}
      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;
