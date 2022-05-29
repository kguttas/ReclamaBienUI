import { DatePickerComponent } from '@syncfusion/ej2-react-calendars';

import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import axios from 'axios';
import { webConfig } from '../../../GlobalConfig';

import { 
    //UncontrolledCarousel,
    //Badge,
     Card, 
     CardBody, 
     Col,
     Row,
     Button} from 'reactstrap';

import {isMobile} from 'react-device-detect';


class Principal extends Component {

    constructor(props) {
        super(props);
    
          this.state = {
            uploadStatus: false,
            file:null
          }

          
    
        this.handleUploadImage = this.handleUploadImage.bind(this);
        this.onChange = this.onChange.bind(this);

        this.itemsImages = [
            {
              src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTLb9Q6HYgaVFgxGVQkP17q9aLaGbRco88dyNH0bIJ0Sbcf01S3&usqp=CAU',
              altText: 'Slide 1',
              caption: 'Slide 1',
              header: 'Slide 1 Header',
              key: '1'
            },
            {
              src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTop-3ooTtU_4uu-n0wyPZxtfAzS0isQN5zgka1lXODcBJon45a&usqp=CAU',
              altText: 'Slide 2',
              caption: 'Slide 2',
              header: 'Slide 2 Header',
              key: '2'
            },
            {
              src: 'https://ichef.bbci.co.uk/news/1024/cpsprodpb/ABF0/production/_85961044_mcdonalds.jpg',
              altText: 'Slide 3',
              caption: 'Slide 3',
              header: 'Slide 3 Header',
              key: '3'
            }
          ];
          

    }
    
    get _images(){
        return this.itemsImages;    
    }

    set _images(value){
        this.itemsImages.push(value);
    }

    onChange(e) {
        this.setState({file:e.target.files})
    }

    handleUploadImage(ev) {

        if(!this.state.file) {

            alert("Debe seleccionar el o los archivos!");

            ev.preventDefault();

            return;
        }
        ev.preventDefault();
    
        const fileObj = 
        {
            "Title": "HOLA",
            "Body": "Hola",
            "Tags": ["Chile","Argentina","Perú"]
        };
        const data = new FormData();

        for (var i = 0; i < this.state.file.length; i++)
        {
            data.append("Files", this.state.file[i]);
        }

        //data.append('Files', this.state.file);
        data.append('json',JSON.stringify(fileObj));
    
        axios.post(webConfig.urlBaseAPI + '/api/Files/upload', data,{ 
            //timeout: 1000 * 600,
            //maxContentLength: 50000 * 1024 *1024,
            headers:{crossDomain: true,
                //'Access-Control-Allow-Origin': '*',
            },
            onUploadProgress: function(progressEvent) {

                var percentCompleted = Math.round( (progressEvent.loaded * 100) / progressEvent.total )
          
                console.log(percentCompleted)
          
              }
        })
        .then(function (response) {
            console.log(response.data);
            //this.setState({ imageURL: `http://localhost:8000/${body.file}`, uploadStatus: true });

        })
        .catch(function (error) {
            console.log(error);
        });
    }

    render() {
        return (
           
        <div className="animated fadeIn">
            
            <Row>
                <Col sm="6">
                    <p>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                    </p>
                </Col>

                <Col sm="6">
                    <p>
                    Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
                    </p>
                </Col>
            </Row>
            
            <Row>
                <Col sm="6">
                    <Link to={'/ExperimentoA'} className="text-success font-weight-bold">Experimento A <span className="glyphicon glyphicon-lock"></span></Link>
                </Col>

                <Col sm="6">
                    <Link to={'/ExperimentoB'} className="text-danger font-weight-bold">Experimento B <span className="glyphicon glyphicon-lock"></span></Link>
                </Col>
            </Row>
            
        </div> 
        );
    }
}

export default Principal;