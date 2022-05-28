import React, { Component } from 'react';
import { webConfig } from '../../GlobalConfig';
class Footer extends Component {
    render() {

        let today = new Date();

        return (
            <React.Fragment>
                
                <span><a href="/">{webConfig.siteName}</a> &copy; {today.getFullYear()}</span>
        <span className="ml-auto"><a href = {"mailto:" + webConfig.contactEmail}>{webConfig.contactEmail}</a></span>
                
            </React.Fragment>
        );
    }
}


export default Footer;