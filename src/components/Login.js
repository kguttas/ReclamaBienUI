import React from 'react';
import { stateSite } from '../GlobalConfig';
import { Link } from 'react-router-dom';

// Redux
import { connect } from 'react-redux';
import { loginUser } from '../actions/usersActions';


class Login extends React.Component {

    state = {
        error: false,
        msjAuth : ''
    }

    emailRef = React.createRef();
    passwordRef = React.createRef();

    componentDidMount() {

        this.emailRef.current.value = "usertest11@mail.com";
        this.passwordRef.current.value = "usertest11";
    }

    UNSAFE_componentWillReceiveProps(nextProps, nextState) {

        const { token } = nextProps;
        //console.log(token);
        if(token !== null && token !== undefined && !token.error && token.access_token !== '') {
            
            if(token.claimsToken.role.includes("Postulant")){
                this.props.history.push('/area/postulante');
            }
            
        }
        
    }
    

    componentDidUpdate(prevProp, nextProp) {
        //console.log(stateSite.isAuthenticate);
        if(stateSite.isAuthenticate){
           // this.props.history.push('/');
        }
    }

    loginUser = e => {
        e.preventDefault();

        const email = this.emailRef.current.value;
        const password = this.passwordRef.current.value;

        if (email === '' || password === '') {
            this.setState({ error: true });
            return;
        } else {
            this.setState({ error: false });
        }

        const usercredential = { email, password };
        
        //console.log(usercredential);

        this.props.loginUser(usercredential);

        //e.target.reset();
    }

    render() {

        const { error } = this.state;

        const { token } = this.props;

        let msjAuth = '';

        if (token !== null && token !== undefined && token.error) {
            // Mensaje Autenticación fallida
            msjAuth = <div className="font-weight-bold alert alert-danger text-center mt-4">Autenticación fallida <span role="img" aria-labelledby="Awesome">😁</span></div>; 
        }

        let msjErrorForm = '';
        
        if (error) {
            // Mensaje Autenticación fallida
            msjErrorForm = <div className="font-weight-bold alert alert-danger text-center mt-4">Todos los Campos son Obligartorios.</div>; 
        }

        return (
            <React.Fragment>
                <div className="container">
                    <div className="row justify-content-center mt-5">
                        <div className="col-md-8">
                            <div className="card">
                                <div className="card-body">
                                    { msjAuth }   
                                    <h2 className="text-center">Estimado Usuario</h2>
                                    <form onSubmit={this.loginUser}>
                                        <div className="form-group">
                                        
                                            <label htmlFor="email">Email:</label>
                                            <input ref={this.emailRef} name="email" id="email" type="text" className="form-control" placeholder="email..."></input>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="password">Password:</label>
                                            <input ref={this.passwordRef} name="password" id="password" type="text" className="form-control" placeholder="password..."></input>
                                        </div>
                                        <button type="submit" className="btn btn-info font-weight-bold text-uppercase d-block w-100">Ingresar</button>
                                        <div className="form-group">
                                            
                                            <div className="pull-left">
                                                <Link to={'/recuperarpassword'} className="text-danger font-weight-bold">Recuperar password <span className="glyphicon glyphicon-lock"></span></Link>
                                            </div>
                                            <div className="pull-right">
                                                <Link to={'/registrarse'} className="text-danger font-weight-bold">Crear una cuenta <span className="glyphicon glyphicon-user"></span></Link>
                                            </div>
                                            <div className="clearfix"></div>

                                        </div>
                                    </form>
                                    { msjErrorForm }
                                    
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
    token: state.userAuth.token
})

export default connect(mapStateToProps, { loginUser })(Login);
