import React, { Component } from 'react';
import { Col, Row,InputGroup, InputGroupAddon, Input, Button, Label } from 'reactstrap';
import { AppSwitch } from '@coreui/react';
import { connect } from 'react-redux';
import CustomSelect from './CustomSelect';
import 'react-dates/initialize';
import { DateRangePicker } from 'react-dates';
import ThemedStyleSheet from 'react-with-styles/lib/ThemedStyleSheet';
import aphroditeInterface from 'react-with-styles-interface-aphrodite';
import DefaultTheme from 'react-dates/lib/theme/DefaultTheme';
import esLocale from 'moment/locale/es';
import moment from 'moment-timezone';
import {isMobile} from 'react-device-detect';
import { getCountries, getRegions, getCommunes } from '../../actions/geographicsActions';
import { initFilter } from '../../configs/JobsOffers';



class CustomFilterForPublicJobsOffers extends Component {

    constructor(props) {
        super(props);

        ThemedStyleSheet.registerInterface(aphroditeInterface);

        ThemedStyleSheet.registerTheme({
            reactDates: {
                ...DefaultTheme.reactDates,
                zIndex: 9999999,
                sizing: {
                inputWidth: 100,
                inputWidth_small: 97,    
                arrowWidth: 24,
                },
                spacing: {
    
                dayPickerHorizontalPadding: 9,
            
                captionPaddingTop: 22,
            
                captionPaddingBottom: 37,
            
                inputPadding: 0,
            
                displayTextPaddingVertical: undefined,
            
                displayTextPaddingTop: 6,
            
                displayTextPaddingBottom: 7,
            
                displayTextPaddingHorizontal: undefined,
            
                displayTextPaddingLeft: 11,
            
                displayTextPaddingRight: 11,
            
                displayTextPaddingVertical_small: undefined,
            
                displayTextPaddingTop_small: 7,
            
                displayTextPaddingBottom_small: 5,
            
                displayTextPaddingHorizontal_small: undefined,
            
                displayTextPaddingLeft_small: 7,
            
                displayTextPaddingRight_small: 7,
            
                },
                font: {
                size: 14,
                captionSize: 14,
                input: {
                    size: 14,
                    lineHeight: '14px',
                    size_small: 14,
                    lineHeight_small: '14px',
                    letterSpacing_small: '0.2px',
                    styleDisabled: 'italic',
                },
                },
                color: {
                ...DefaultTheme.reactDates.color,
                highlighted: {
                    backgroundColor: '#ff0000',
                    backgroundColor_active: '#ff0000',
                    backgroundColor_hover: '#ff0000',
                    color: '#ff0000',
                    color_active: '#ff0000',
                    color_hover: '#ff0000',
                },
                },
            },
            });

        moment.updateLocale("es", esLocale);

        this.preSelectedCountry = initFilter.idCountry;

        this.initValuesFilter = null;

        this.state = {  

            selectedCountry: this.preSelectedCountry,
            optionsCountries: [],

            selectedRegion: null,
            optionsRegions: [],

            selectedCommune: null,
            optionsCommunes: [],

            /*
            Filter range dates
            */
            searchStartDate: moment().add(-7, 'days'),
            searchEndDate: moment(),
            searchMinDate: moment().add(-365 * 4, 'days'),
            searchMaxDate: moment(),
            bShowDisable: false,
            searchFocusedInput: null, //'startDate' //'endDate'

            keySearch: "",
            bShowDisability: false,
            bShowRemote: true,
        };

        this.onChangeCountry = this.onChangeCountry.bind(this);
        this.onChangeRegion = this.onChangeRegion.bind(this);
        this.onChangeCommune = this.onChangeCommune.bind(this);
        this.onChangeDateRange = this.onChangeDateRange.bind(this);
        this.onClickSearchText = this.onClickSearchText.bind(this);
        this.onChangeShowDisability = this.onChangeShowDisability.bind(this);
        this.onChangeShowRemote = this.onChangeShowRemote.bind(this);
        this.onClickClearFilter = this.onClickClearFilter.bind(this);

        
    }

    /*
    Lifecycle
    */

    componentDidMount() {
        
        if(this.props.dataFilter){

            const auxProps = {...this.props.dataFilter};

            this.dataFilter = {
                id: null, 
                pageSize: auxProps.pageSize, 
                pageIndex: auxProps.pageIndex + 1, 
                keySearch: auxProps.keySearch, 
                startDate: auxProps.startDate,
                endDate: auxProps.endDate,
                sortField: null, 
                sortOrder: null,
                idCountry: auxProps.idCountry,
                idRegion: auxProps.idRegion,
                idCommune: auxProps.idCommune,
                bShowDisability: auxProps.bShowDisability,
                bShowRemote: auxProps.bShowRemote,
                initFilteridCountry: auxProps.initFilteridCountry
            };

            this.initValuesFilter = {...this.dataFilter};

            this.setState({  
                selectedCountry: auxProps.selectedCountry,
                optionsCountries: [],
                selectedRegion: auxProps.selectedRegion,
                optionsRegions: [],
                selectedCommune: auxProps.selectedCommune,
                optionsCommunes: [],
                /*
                Filter range dates
                */
                searchStartDate: this.dataFilter.startDate,
                searchEndDate: this.dataFilter.endDate,
                searchMinDate: moment().add(-365 * 4, 'days'),
                searchMaxDate: moment().add(5,'days'),
                searchFocusedInput: null, //'startDate' //'endDate'
                keySearch: this.dataFilter.keySearch,
                bShowDisability: this.dataFilter.bShowDisability,
                bShowRemote: this.dataFilter.bShowRemote,
            });
        }

        this.props.getCountries();
            
        this.props.getRegions({ idPais: this.preSelectedCountry.value });

        //this.props.getCommunes({ idRegion: null });

    }

    static getDerivedStateFromProps(nextProps, prevState) {

        if(nextProps.countries !== prevState.countries){
            return { countries: nextProps.countries};
        }
       
        if(nextProps.regions !== prevState.regions){
            return { regions: nextProps.regions};
        }

        if(nextProps.communes !== prevState.communes){
            return { communes: nextProps.communes};
        }

        else return null;
    }

    componentDidUpdate(prevProps, prevState) {

        if (prevState.countries !== this.state.countries) {
        
            if(this.state.countries && !this.state.countries.error){
               
                let auxCountriesList = this.state.countries.map((item) => {
                    return  {value: item.id, label: item.nombre };
                });

                auxCountriesList = auxCountriesList.sort((a, b) => a.label > b.label ? 1 : b.label > a.label ? -1 : 0);

                this.setState({
                    optionsCountries: auxCountriesList
                });

            }
        }

        if (prevState.regions !== this.state.regions) {
        
            if(this.state.regions && !this.state.regions.error){
               
                let auxRegionesList = this.state.regions.map((item) => {
                    return  {value: item.id, label: item.nombre };
                });

                auxRegionesList = auxRegionesList.sort((a, b) => a.label > b.label ? 1 : b.label > a.label ? -1 : 0);

                this.setState({
                    optionsRegions: auxRegionesList
                });
            }
        }

        if (prevState.communes !== this.state.communes) {
        
            if(this.state.communes && !this.state.communes.error){
               
                let auxCommunesList = this.state.communes.map((item) => {
                    return  {value: item.id, label: item.nombre };
                });

                auxCommunesList = auxCommunesList.sort((a, b) => a.label > b.label ? 1 : b.label > a.label ? -1 : 0);

                this.setState({
                    optionsCommunes: auxCommunesList
                });
            }
        }
    }

    /*
    Events Inputs
    */

    onChangeCountry = (value) => {
        
        this.setState({selectedCountry: value});

        this.dataFilter.selectedCountry = value;

        if(value){
            this.props.getRegions({ idPais: value.value });
        }else{
            this.setState({
                optionsRegions: []
            });
        }

        if(this.props.onClickSearchText){
            
            this.dataFilter.idCountry = value ? value.value : null;

            this.props.onClickSearchText(this.dataFilter);
        }
    }

    onChangeRegion = (value) => {

        this.setState({selectedRegion: value});
        
        this.dataFilter.selectedRegion = value;

        if(value){
            this.props.getCommunes({ idRegion: value.value });
        }else{
            this.setState({
                optionsCommunes: []
            });
        }

        if(this.props.onClickSearchText){
            
            this.dataFilter.idRegion = value ? value.value : null;

            this.props.onClickSearchText(this.dataFilter);
        }
    }

    onChangeCommune = (value) => {

        this.setState({selectedCommune: value});
        
        this.dataFilter.selectedCommune = value;

        if(this.props.onClickSearchText){
            
            this.dataFilter.idCommune = value ? value.value : null;

            this.props.onClickSearchText(this.dataFilter);
        }
    }

    onChangeDateRange = (startDate, endDate) => {
        

        this.setState({ searchStartDate: startDate, searchEndDate: endDate });

        this.dataFilter.startDate = startDate;
        this.dataFilter.endDate = endDate;
        
        this.props.onClickSearchText(this.dataFilter);
    }

    onClickSearchText = (text) => {
        
        if(this.props.onClickSearchText){
           
            this.dataFilter.keySearch = text;

            this.props.onClickSearchText(this.dataFilter);
        }
    }

    onChangeShowDisability = (checked) => {
        
        this.setState({ bShowDisability:checked });

        this.dataFilter.bShowDisability = checked;
        this.dataFilter.bShowRemote = this.state.bShowRemote;
        
        this.props.onClickSearchText(this.dataFilter);
    }

    onChangeShowRemote = (checked) => {

        this.setState({ bShowRemote:checked });

        this.dataFilter.bShowRemote = checked;
        this.dataFilter.bShowDisability = this.state.bShowDisability;
        
        this.props.onClickSearchText(this.dataFilter);
    }

    onClickClearFilter = () => {
        
        if(this.props.onClickClearFilter){

            const dataFilter = {...this.props.resetValuesFilter};
            this.dataFilter = {...dataFilter};
            
            const dataInitFilter = (prevState) => ({
                ...prevState,
                ...dataFilter,
                searchStartDate: this.initValuesFilter.startDate,
                searchEndDate: this.initValuesFilter.endDate,
                selectedCountry: this.initValuesFilter.initFilteridCountry
            });

            this.props.onClickClearFilter(dataFilter);

            // Clear inputs
            this.setState(prevState => {
                const ps = dataInitFilter(prevState);
                
                //console.log(ps);
            
                return ps;
            });
        }
    }

    /*
    UI Element 
    */

    renderMonthElement = ({ month, onMonthSelect, onYearSelect }) =>
    <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div>
            <select
                value={month.month()}
                onChange={(e) => onMonthSelect(month, e.target.value)}
            >
                {moment.months().map((label, value) => (
                    <option key={this.randomNumber() } value={value}>{label}</option>
                ))}
            </select>
        </div>
        <div>
            <select value={month.year()} onChange={(e) => onYearSelect(month, e.target.value)}>
                {this.returnYears()}
            </select>
        </div>
    </div>

    randomNumber() {
        const min = 1;
        const max = 100;
        const rand = min + Math.random() * (max - min);
        return rand;
    }

    returnYears = () => {
        let years = []
        for(let i = moment().year() - 4; i <= moment().year(); i++) {
            years.push(<option key={this.randomNumber() } value={i}>{i}</option>);
        }
        return years;
    }

    render() {
        
        return (
            <React.Fragment>
                <label htmlFor="datesIdUnique"><strong>Ubicación</strong></label>
                <Row className="mb-2">
                    <Col xs="12">
                        <CustomSelect                 
                            id={"selectCountry"}
                            placeholder={'País...'}
                            nameAttr={'selectCountry'}
                            onChange={(e,a) => {
                                this.onChangeCountry(a);
                            }}
                            value={this.state.selectedCountry}
                            options={this.state.optionsCountries}
                            ></CustomSelect>
                    </Col>
                </Row>
                <Row className="mb-2">
                    <Col xs="12">
                        <CustomSelect                 
                            id={"selectRegion"}
                            placeholder={'Región...'}
                            nameAttr={'selectRegion'}
                            onChange={(e,a) => {
                                this.onChangeRegion(a);
                            }}
                            value={this.state.selectedRegion}
                            options={this.state.optionsRegions}
                            ></CustomSelect>
                    </Col>
                </Row>
                <Row className="mb-2">
                    <Col xs="12">
                        <CustomSelect                 
                            id={"selectCommune"}
                            placeholder={'Comuna...'}
                            nameAttr={'selectCommune'}
                            onChange={(e,a) => {
                                this.onChangeCommune(a);
                            }}
                            value={this.state.selectedCommune}
                            options={this.state.optionsCommunes}
                            ></CustomSelect>
                    </Col>
                </Row>
                <Row className="mb-2">
                    <Col xs="12">
                        <div>
                            <label htmlFor="datesIdUnique"><strong>Rango de fechas</strong></label>
                        </div>
                        <DateRangePicker 
                            key="datesIdUnique"
                            startDatePlaceholderText="Desde..."
                            endDatePlaceholderText="Hasta..."
                            startDate={this.state.searchStartDate} // momentPropTypes.momentObj or null,
                            startDateId="startDate" // PropTypes.string.isRequired,
                            endDate={this.state.searchEndDate} // momentPropTypes.momentObj or null,
                            endDateId="endDate" // PropTypes.string.isRequired,
                            onDatesChange={({ startDate, endDate }) => {

                                this.onChangeDateRange(startDate, endDate);

                                
                            }} // PropTypes.func.isRequired,
                            isOutsideRange={date => date.isBefore(this.state.searchMinDate, 'day') || date.isAfter(this.state.searchMaxDate, 'day')}
                            renderMonthElement={this.renderMonthElement}
                            orientation={isMobile ? "vertical" : "horizontal"}
                            numberOfMonths={2}
                            withFullScreenPortal={true}
                            hideKeyboardShortcutsPanel ={true}
                            withPortal={isMobile}
                            focusedInput={this.state.searchFocusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                            onFocusChange={searchFocusedInput => this.setState({ searchFocusedInput })} // PropTypes.func.isRequired,

                            ></DateRangePicker>
                    </Col>
                </Row>
                <Row className="mb-2">
                    <Col xs="12">
                        <div>
                            <Label htmlFor="buscarTextoInput">
                                <strong>Búsqueda por texto</strong>
                            </Label>
                        </div>
                        <InputGroup>
                                                
                            <Input type="text" id="buscarTextoInput" value={this.state.keySearch} name="input1-group2" placeholder="Palabra clave..." onChange={(e) => { this.setState({ keySearch: e.target.value }); }} />
                            <InputGroupAddon addonType="append">
                                <Button type="button" color="info" onClick={(e) => { this.onClickSearchText(this.state.keySearch); }}><i className="fa fa-search" ></i> Buscar</Button>
                            </InputGroupAddon>
                        </InputGroup>
                    </Col>
                </Row>
                <Row className="mb-2">
                    <Col xs="12">
                        <div>
                        <Label htmlFor="cbShowDisability">
                            <strong>Apto para personas con discapacidad</strong>
                        </Label>
                        </div>
                        <AppSwitch 
                            id="cbShowDisability"
                            defaultChecked={false} 
                            label 
                            dataOn={'Sí'} 
                            dataOff={'No'}
                            color="info" 
                            name="cbShowDisable"
                            checked={this.state.bShowDisability}
                            onChange={(e) => {
                                
                                this.onChangeShowDisability(e.target.checked);
                            }}
                            > 
                        </AppSwitch>
                        
                        
                    </Col>
                </Row>
                <Row className="mb-2">
                    <Col xs="12">
                        <div>
                        <Label htmlFor="cbShowRemote">
                            <strong>Trabajo remoto</strong>
                        </Label>
                        </div>
                        <AppSwitch 
                            id="cbShowRemote"
                            defaultChecked={this.state.bShowRemote} 
                            label 
                            dataOn={'Sí'} 
                            dataOff={'No'}
                            color="info" 
                            name="cbShowRemote"
                            checked={this.state.bShowRemote}
                            onChange={(e) => {
                                this.onChangeShowRemote(e.target.checked);
                            }}
                            > 
                        </AppSwitch>
                        
                        
                    </Col>
                </Row>
                <Row className="mb-2">
                    <Col xs="12" className="ml-auto p-2 text-right">
                        <Button color="info" block={isMobile} onClick={this.onClickClearFilter} className="mt-0"> 
                            <div className="align-self-center">
                                <i className="fa fa-eraser"></i>  &nbsp;                                                    
                                Limpiar Filtro
                            </div>
                        </Button>
                    </Col>
                </Row>
            </React.Fragment>
            
        )
    }
}

const mapStateToProps = state => ({
    regions: state.geographics.regions,
    countries: state.geographics.countries,
    communes: state.geographics.communes
});


export default connect(mapStateToProps, { 
    getCountries,
    getRegions,
    getCommunes
})(CustomFilterForPublicJobsOffers);
