import React, { Component } from "react";
import queryString from 'query-string'
import { webConfig } from '../../GlobalConfig';
// Redux
import { connect } from 'react-redux';
import { validateEmail } from '../../actions/usersActions';

class ValidateEmail extends Component{

    constructor(props){
        super(props);

        this.state = {
            msgValidateEmail: ""
        };

       
    }

    componentDidMount(){
        const values = queryString.parse(this.props.location.search)
        console.log(values.code);
        console.log(values.userId);

        this.props.validateEmail({
            code: values.code,
            userId: values.userId
        });
    }

    UNSAFE_componentWillReceiveProps(nextProps, nextState){
        if(nextProps.validatedEmailResult !== this.props.validatedEmailResult){
            console.log(nextProps.validatedEmailResult.result);
            if(nextProps.validatedEmailResult.result === 'ConfirmedEmail'){

                console.log(nextProps.validatedEmailResult.result);
                this.setState({
                    msgValidateEmail: "Email Validado. Ahora puede autenticarse e ingresar a la plataforma."
                });
            }else if(nextProps.validatedEmailResult.result === "InvalidToken")
            {
               console.log(nextProps.validatedEmailResult.result);
                this.setState({
                    msgValidateEmail: `No ha sido posible validar su email. Contactenos a nuesto email: ${webConfig.supportEmail}`
                });
            }
        }
    }

    render(){

        return(
            <React.Fragment>
                <div className="animated fadeIn">
                    <h2 className="text-center">{this.state.msgValidateEmail}</h2>
                
                </div>
            </React.Fragment>  
        );

    }

}

const mapStateToProps = state => ({
    validatedEmailResult: state.userAuth.validatedEmailResult
})

export default connect(mapStateToProps, { validateEmail })(ValidateEmail);
