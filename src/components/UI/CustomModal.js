import React, { Component  } from "react";
import { 
    
    Button,
    
    Modal, 
    ModalBody, 
    ModalFooter,
    ModalHeader
 } from 'reactstrap';

class CustomModal extends Component{

    render(){

        return(
            <Modal isOpen={this.props.isOpen} toggle={this.props.toggle} className={this.props.classNameModal}>
                <ModalHeader toggle={this.props.toggle}>{this.props.titleModal}</ModalHeader>
                <ModalBody>
                    { this.props.contentModal  }
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.props.toggle}>Entendido!</Button>{' '}
                </ModalFooter>
            </Modal>
        );

    }
}

export default CustomModal;