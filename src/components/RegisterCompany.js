import React, { Component } from 'react';

// Redux
import { connect } from 'react-redux';

class RegisterCompany extends Component {
    
    componentDidUpdate(){
        console.log("REGISTER COMPANY");
    }

    render() {

        //const { token } = this.props;


        return (
            <div className="container">
                Register company
            </div>

        )
    }
}

const mapStateToProps = state => ({
    token: state.userAuth.token
})

export default connect(mapStateToProps, {  })(RegisterCompany);
