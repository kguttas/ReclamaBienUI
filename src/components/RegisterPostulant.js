import React, { Component } from 'react';

// Site config
import { webConfig } from '../GlobalConfig';

// Redux
import { connect } from 'react-redux';
import { createUserPostulant } from '../actions/usersActions';

class RegisterPostulant extends Component {

    state = {
        bTermCondition: false,
        errorForm: false,
        errorPassword: false,
        bRegisterUser: false
    }

    emailRef = React.createRef();
    passwordRef = React.createRef();
    rePasswordRef = React.createRef();

    bShowMsgError = false;

    constructor(props){
        super(props);

        this.bShowMsgError = false;
    }
    
    UNSAFE_componentWillReceiveProps(nextProps, nextState){

        const { newUser } = nextProps;
        
        if(newUser !== undefined && newUser.msgError !== undefined && newUser.msgError !== '' ) {
            
            this.bShowMsgError = true;
        }
        
    }

    

    componentDidUpdate(prevProps,nextProps){
        
        
    }

    aceptedCondition = (e) => {
        this.setState({bTermCondition:e.target.checked});
    }

    registerPostulant = (e) => {
        e.preventDefault();

        this.bShowMsgError = false;

        const email = this.emailRef.current.value;
        const password = this.passwordRef.current.value;
        const rePassword = this.rePasswordRef.current.value;

        let bErrorForm = false, bErrorPassowrd = false;

        if (email === '' || password === '' || rePassword === '' || !this.state.bTermCondition) {
            bErrorForm = true;       
        } else {
            bErrorForm = false;
        }
            
        if (password !== rePassword) {
            bErrorPassowrd = true;
        } else {
            bErrorPassowrd = false;
        }

        this.setState({ errorForm: bErrorForm });
        this.setState({ errorPassword: bErrorPassowrd });

        if(!bErrorForm  && !bErrorPassowrd){

            const postulantRegister = { email, password, rePassword };


            this.props.createUserPostulant(postulantRegister);

        }

    }

    redirectToLogin = (e) => {
        e.preventDefault();
        this.props.history.push('/login');

        const { newUser } = this.props;

        newUser.bUserCreated = false;
    }

    render() {

        const { errorForm, errorPassword } = this.state;

        let msjErrorForm = '';

        if (errorForm) {
            // Mensaje campos requeridos.
            msjErrorForm = <div className="font-weight-bold alert alert-danger text-center mt-4">Todos los campos son requeridos. <span role="img" aria-labelledby="Awesome">😁</span></div>; 
        }

        let msjErrorPassword = '';
        
        if (errorPassword) {
            // Mensaje passwords distintos.
            msjErrorPassword = <div className="font-weight-bold alert alert-danger text-center mt-4">Password y Rescribir Password deben ser iguales.</div>; 
        }

        const { newUser } = this.props;

        let msgErrorCreateUserPostulant = '';

        if(this.bShowMsgError) {
            // Mensaje usuario ya esta registrado u otro error resultado de la llamada del servicio.
            msgErrorCreateUserPostulant = <div className="font-weight-bold alert alert-danger text-center mt-4">{newUser.msgError}</div>; 
        }

        
        let jsfFormShowed = '';
        if(newUser !== undefined && newUser.bUserCreated){
            jsfFormShowed = 
            <React.Fragment>
                <h2 className="text-center">Se ha Registrado Exitosamente</h2>
                <form onSubmit={this.redirectToLogin}>
                    <p className="font-weight-bold alert alert-danger text-center mt-4">
                        Le hemos enviado en email para confirmar que su cuenta ha sido creada de manera correcta. Si el email no ha llegado y no puede ingresar a la plataforma con los datos de Email y Password que usted previamente nos facilitó, por favor escribanos a este email: { webConfig.contactEmail } 
                    </p>; 
                    <div className="form-group">
                        <button type="submit" className="btn btn-info font-weight-bold text-uppercase d-block w-100">Entendido!</button>
                    </div>
                </form>
            </React.Fragment>
        } else {
            jsfFormShowed = 
            <React.Fragment>
                { msjErrorForm }
                { msjErrorPassword }
                { msgErrorCreateUserPostulant }
                <h2 className="text-center">Postulante</h2>
                <form onSubmit={this.registerPostulant}>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input ref={this.emailRef} name="email" id="email" type="text" className="form-control" placeholder="email..."></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input ref={this.passwordRef} name="password" id="password" type="text" className="form-control" placeholder="password..."></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="repassword">Rescribir Password:</label>
                        <input ref={this.rePasswordRef} name="repassword" id="repassword" type="text" className="form-control" placeholder="rescribir password..."></input>
                    </div>
                    <div className="form-group">
                        <div className="custom-control custom-checkbox mb-3">
                            <input type="checkbox" className="custom-control-input" onChange={this.aceptedCondition} id="customCheck" name="example1"></input>
                            <label className="custom-control-label" htmlFor="customCheck">He leído y acepto las Condiciones legales y la Politica de privacidad de {webConfig.siteName}.*</label>
                        </div>
                    </div>
                    <div className="form-group">
                        <button disabled={!this.state.bTermCondition} type="submit" className="btn btn-info font-weight-bold text-uppercase d-block w-100">Registarse</button>
                    </div>
                </form>
            </React.Fragment>
        }

        return (
            <React.Fragment>
                <div className="container">
                    <div className="row justify-content-center mt-5">
                        <div className="col-md-8">
                            <div className="card">
                                <div className="card-body">
                                    { jsfFormShowed }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => ({
    newUser: state.userAuth.newUser
})

export default connect(mapStateToProps, { createUserPostulant })(RegisterPostulant);
