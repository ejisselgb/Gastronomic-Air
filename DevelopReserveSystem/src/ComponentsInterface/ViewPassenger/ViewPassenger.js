import "react-select/dist/react-select.css";
import "react-virtualized/styles.css";
import "react-virtualized-select/styles.css";

import React, { Component } from 'react';
import axios from 'axios';
import createFilterOptions from "react-select-fast-filter-options";
import Select from "react-virtualized-select";

import './ViewPassenger.css';

/**

 * @version			1.0

 * @author			Erika Gutierrez, Manuel Vasquez

 * @description 	Show the avalaible options for the passenger

*/

class ViewPassenger extends Component {

	/** @constructor */

	constructor(props, context) {

		super(props);
		this.state = {
			disableOpt: true,
			disableNum: true
		};

		this.getValueOnClick = this.getValueOnClick.bind(this);
		this.onValueChanged = this.onValueChanged.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	componentDidMount(){

		var listCities="http://172.17.2.226:3000/search?opc=5";

		axios.get(listCities)
			.then((response) => {
				if(response.status === 200){
					this.setState({itemsCities: response.data})
				}
			}).catch(function (err) {
	        	console.log(err);
	      	});	
	}

	render(){

		if(this.state.itemsCities !== undefined){
			var options = this.state.itemsCities.map((image,index)=>({
					label: image.toString(),
					value: "originCity"
			}));

			var optionsDes = this.state.itemsCities.map((image,index)=>({
					label: image.toString(),
					value: "destinyCity"
			}));
		}

		const filterOptions = createFilterOptions({options});
		const filterOptionsDes = createFilterOptions({optionsDes});

		return(
			<div className="container-fluid">
				<div className="container-pass">
					<h3 className="title-home-app">Encuentra tu vuelo, reserva, compra y haz check-in</h3>
					<div className="row container-buttons-home">
						<div className="col-sm-8">
							<div className="container-form">
								<div className="container-title">
									<div className="title-origen"><i className="fa fa-map-marker"></i> Origen: <p><b>{this.state.originCity}</b></p></div>
									<div className="title-destiny"><i className="fa fa-map-marker"></i> Destino: <p><b>{this.state.destinyCity}</b></p></div>
								</div>
								<div className="container-input">
									<Select
								        name="originCity"
								        options={options}
								        filterOptions={filterOptions}
								        onChange={this.onValueChanged.bind(this)}
								    />
									<Select
								        name="citiesOptions"
								        options={optionsDes}
								        filterOptionsDes={filterOptionsDes}
								        value={this.state.destinyCity}
								        onChange={this.onValueChanged.bind(this)}
								    />
								</div>
								<div className="date-form">
									<div className="title-fly-date"><p>Fechas de Viaje</p></div>
									<div className="title-form-date">
										<div className="title-form-date">Partida</div>
				              			<div className="title-form-date return">Regreso</div>
									</div>
				              		<div className="container-input-date">
				              			<input className="input-date" type="date" name="goDate" min="2018-03-27"
		                                  max="2018-12-31" onChange={this.onValueChanged} disabled/>
		                           	
					              		<input className="input-date" type="date" name="returnDate" min="2018-03-27"
			                                  max="2018-12-31" onChange={this.onValueChanged} disabled/>
				              		</div>
				              		<div className="title-form-date">
										<div className="title-form-date"><i className="fa fa-search"></i>  Filtro</div>
									</div>
				              		<div className="container-input-date">
				              			<select className="input-text input-select input-select-check" defaultValue="" onChange={this.handleChange.bind(this)}>
				              				<option value="" disabled>Seleccionar filtro</option>
				              				<option value="f0">Minimización tiempo</option>
							            	<option value="f1">Minimización escalas</option>
							           		<option value="f2">Minimización distancia recorrida</option>
							           		<option value="f3">Optimización hora</option>
							           		<option value="f4">Viajero Frecuente</option>
							        	</select>
				              			<div className="input-date"><b>Mejora tu busqueda</b></div>
				              		</div>
				              		<div className="title-form-date">
										<div className="title-form-date">Hora Cita: </div>
				              			<div className="title-form-date return label-doc">Número Documento</div>
									</div>
				              		<div className="container-input-date">
				              			<input className="input-date" type="text" name="goTime" placeholder="HH:mm" onChange={this.onValueChanged} disabled={this.state.disableOpt}/>
				              			<input className="input-date" type="text" name="goNumber" placeholder="ej: 1100191243" onChange={this.onValueChanged} disabled={this.state.disableNum}/>				              		</div>
								</div>
								<button className="search-btn" id="search" onClick={this.getValueOnClick.bind(this)}>Buscar vuelos</button>
		              		</div>
						</div>
						<div className="container-check col-sm-4">
							<p>¿Necesitar hacer check-in?, hazlo aquí</p>
							<button className="search-btn" id="check" onClick={this.getValueOnClick.bind(this)}>Hacer check-in</button>
						</div>
					</div>
				</div>
			{/*<TimeConverter totalFligths={this.state.totalFligths}/>*/}
			</div>
		);
	}


	handleChange(e){

		switch(e.target.value){
			case "f0":
				this.setState({disableNum: true, disableOpt: true, valueFilter: "f0"});
			break;

			case "f1":
				this.setState({disableNum: true, disableOpt: true, valueFilter: "f1"});
			break;

			case "f2":
				this.setState({disableNum: true, disableOpt: true, valueFilter: "f2"});
			break;

			case "f3":
				this.setState({disableOpt: false, disableNum: true, valueFilter: "f3"});
			break;

			case "f4":
				this.setState({disableNum: false, disableOpt: true, valueFilter: "f4"});
			break;
			default:
			break;
		}
	}


	/**

	 * Validate the type of the button for pass of view depending on the option selected

	 * @param  {e} capture the value of button object

	*/

	onValueChanged(e) {

		var endponintAirport="http://172.17.2.226:3000/search?opc=7&city="; 
		axios.get(endponintAirport+e.label)
		.then((response) => {
			if(response.status === 200){
				if(e.value === "originCity"){
					this.setState({
						originCity: e.label,
						originSub: response.data[0]
					})
				}
				if (e.value === "destinyCity") {
					this.setState({
						destinyCity: e.label,
						destinySub: response.data[0]
					})
				}
			}
		}).catch(function (err) {
	        console.log(err);
	    });

		if(e.target !== undefined){
			if(e.target.name === "origin"){
				this.setState({
					valueOrigin: e.target.value
				})
			}else if(e.target.name === "destiny"){
				this.setState({
					valueDestiny: e.target.value
				})
			}
			else if(e.target.name === "goDate"){
				this.setState({
					valueGoDate: e.target.value
				})
			}
			else if(e.target.name === "returnDate"){
				this.setState({
					valuereturnDate: e.target.value
				})		
			}
			else if(e.target.name === "goTime"){
				this.setState({
					valuereturnTime: e.target.value
				})
			}else if(e.target.name === "goNumber"){
				this.setState({
					valueIdentification: e.target.value
				})
			}
		}
	}

	/**

	 * Get value of inputs and get the data from endpoint for flights

	 * @param  {e} capture the value of button object

	 * @endpoint http://172.17.2.226:3000/search?opc=1&origin=:origin&destiny=:destiny

	*/

	getValueOnClick(e){

		console.log(this.state.originSub+"&destiny="+this.state.destinySub);
		
		var endPointFlights="http://172.17.2.226:3000/search?opc=6&origin="; 

		if(e.target.id === "check"){
			this.props.history.push("/ViewCheck");
		}

		else if(e.target.id === "search"){

			if(this.state.originSub !== undefined && this.state.destinySub){

				if(this.state.valueIdentification !== null){
					console.log("este campo no es nulo");
					axios.get("http://172.17.2.226:3000/search?opc=8&cedula="+this.state.valueIdentification)
					.then((response) => {
						if(response.status === 200){
							this.setState({valueReturnId: response.data})
						}
					}).catch(function (err) {
		        		console.log(err);
		      		});	
				}

				axios.get(endPointFlights+this.state.originSub+"&destiny="+this.state.destinySub)
				.then((response) => {
					if(response.status === 200){
						console.log(response.data);
						this.props.history.push({
				          pathname: '/Fligths',
				          state: {
				            totalFligths: response.data,
				            valuereturnTime: this.state.valuereturnTime,
				            valueFilter: this.state.valueFilter,
				            valueReturnId: this.state.valueReturnId,
				          }
				        })
					}
				}).catch(function (err) {
	        		console.log(err);
	      		});	
			}else{
				alert("No puedes dejar ningún campo vacio, ingresa todos los datos para continuar la búsqueda")
			}
		}
	}
}


export default ViewPassenger;