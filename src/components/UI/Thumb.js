import React from 'react';

export default class Thumb extends React.Component {
   
    constructor(props){
        super(props);
        this.state = {
            loading: false,
            thumb: undefined,
            bError: false
        };
    }

    UNSAFE_componentWillReceiveProps(nextProps, nextState) {


        //console.log(this.props.file);
        //console.log(nextProps.file);
        //console.log(this.state.thumb);

        
        
        // Para imagenes en URL
        if((typeof nextProps.file) === 'string'){
            //console.log(nextProps.file);
            if(nextProps.file.includes('http') || nextProps.file.includes('base')){
                //console.log(nextProps.file);
                this.setState({
                    bError: false
                });
                this.setState({ thumb: nextProps.file });
                return;
            }
        }else{


            if (!nextProps.file || nextProps.file === this.props.file) { return; }

            this.setState({ loading: true }, () => {
                let reader = new FileReader();

                reader.onloadend = () => {
                    this.setState({ loading: false, thumb: reader.result });
                };
                //console.log(nextProps.file);
                if(nextProps.file){
                    try{
                        reader.readAsDataURL(nextProps.file);
                        this.setState({
                            bError: false
                        });
                    }catch(error){
                        console.log(error);
                        this.setState({
                            bError: true
                        });
                    }
                    
                }
            });
        }
    }

    render() {
        const { file } = this.props;
        const { loading, thumb } = this.state;

        if (!file) { return null; }

        let contentShow = <div></div>

        if(!this.state.bError){
            if (loading) { contentShow = <p>Cargando imagen...</p> }
            else{
                contentShow = 
                <div className="animated fadeIn">
                    <img src={thumb}
                        alt={file.name}
                        className="img-thumbnail mt-2"
                        height={"auto"}
                        width={200} ></img>
                </div>
            }
        }else{
            contentShow = <p className="text-danger">Error al cargar la imagen...</p>
        }
        

        return (
            <React.Fragment>
                {contentShow}
            </React.Fragment>
           );
    }
}