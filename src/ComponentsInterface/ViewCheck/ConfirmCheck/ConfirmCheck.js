import React, { Component } from 'react';
import axios from 'axios';

import './ConfirmCheck.css';

/**

 * @version			1.0

 * @author			Erika Gutierrez, Manuel Vasquez

 * @description 	Component for confirm and validate the fligth 

*/

class ConfirmCheck extends Component {

	/** @constructor */

	constructor(props, context) {

		super(props);
		this.state = {};

		this.optionsChairFly = this.optionsChairFly.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.confirmCheck = this.confirmCheck.bind(this);
		this.getValueTypeFood = this.getValueTypeFood.bind(this);
	}

	/** @description	Component that render the elements after to load the page */

	componentDidMount(){

		this.setState({
			nameUser: "Erika Gutiérrez",
			value: 'chair',
			chairFly: ["A1","A3","A4","A5","A6","B1","B2","B3","B4","B5","B6"],
			menu: ["Paella", "Casuela Mariscos", "Vegetales al vapor"],
			valueDisable: true,
			valueDisableMenu: true,
		})

		axios.get("http://localhost:3000/check?opc=2")
			.then((response) => {
				this.setState({
					food: response.data
				})

			}).catch(function (err) {
	        	console.log(err);
	    });	
	}

	/**

	 * Generate the options depending on chairs number of the airplane

	 * @return 		Array of chair items

	*/

	optionsChairFly(){

		let itemsChair = []; 

		if(this.state.chairFly !== undefined){
			for (var i = 0; i < this.state.chairFly.length; i++) {

				 itemsChair.push(<option key={i} value={this.state.chairFly[i]}>{this.state.chairFly[i]}</option>);  
			};
		}

		return itemsChair;
	}

	render(){


		if(this.state.food !== undefined){
			this.typeFood = this.state.food.map((image,index)=>{
				return(
					<option key={index} value={image[0]}>{image[1]}</option>
				);
			})
		}


		if(this.state.menuFood !== undefined){
			this.menu = this.state.menuFood.map((image,index)=>{
				return(
					<option key={index} value={image[0]}>{image[2]}</option>
				);
			})
		}
		

		if(this.props.history.location.state !== undefined){
			this.nameUser = this.props.history.location.state.nameUser;
		}else{
			this.nameUser = "";
		}

		return(
			<div className="container-fluid">
				<h3 className="title-home-app">Confirma tu check-in y preparate para el viaje</h3>
				<div className="col-sm-8">
					<div className="container-form form-check">
						<p>Bienvenido <b>{this.nameUser}</b>, confirma todos los detalles de tu vuelo</p>
							<div className="container-title">
								<div className="title-origen">Seleccionar Silla</div>
								<div className="title-doc title-check-two">Confirmar Comida</div>
							</div>
							<div className="container-input">
								<select className="input-text input-select input-select-check" defaultValue="" onChange={this.handleChange.bind(this)} name="chair">
									<option value="" disabled>Por favor escoja una silla</option>
									{this.optionsChairFly()}
					    		</select>
					    		<select className="input-text input-select input-select-check" defaultValue="no" onChange={this.handleChange.bind(this)}>
					            	<option value="no">No</option>
					           		<option value="si">Si</option>
					        	</select>
							</div>

							<div className="container-title">
								<div className="title-origen">Tipo de Comida</div>
			    				<div className="title-doc title-check-menu">Confirmar Menu</div>
							</div>

			    			<div className="container-input">
			    				<select className="input-text input-select input-select-check" defaultValue="" onChange={this.getValueTypeFood.bind(this)} disabled={this.state.valueDisable}>
			    					{this.typeFood}
					     		</select>

					    		<select className="input-text input-select input-select-check" defaultValue="" onChange={this.handleChange.bind(this)} disabled={this.state.valueDisableMenu} name="menu">
					    			<option value="" disabled>Por favor seleccione un menu</option>
									{this.menu}
					    		</select>
							</div>
			    		<button className="search-btn" onClick={this.confirmCheck.bind(this)}>Confirmar Check-in</button>
					</div>
				</div>
			</div>
		)
	}

	/**

	 * Get code of type food for build the menu

	*/

	getValueTypeFood(e){

		var valueType = e.target.value;

		if(e.target.value !== undefined){
			axios.get("http://localhost:3000/check?opc=3&typefood="+valueType)
			.then((response) => {
				this.setState({menuFood: response.data, valueDisableMenu: false})
			}).catch(function (err) {
	        	console.log(err);
	    	});
		}
	}


	/**

	 * This method get value of inputs and selects

	 * @param  {e} capture the value of input and options object

	*/

	handleChange(e) {


    	if(e.target.value === "si"){
    		console.log("es igual a si");
    		this.setState({valueDisable: false})

    	}else if (e.target.value === "no"){
    		this.setState({valueDisable: true, valueDisableMenu: true, valueMenu: null})
    	}

    	if(e.target.name === "menu"){
    		this.setState({valueMenu: e.target.value})
    	}

    	if(e.target.name === "chair"){
    		this.setState({numberChair: e.target.value})
    	}
  	}


  	/**

	 * Validate and insert the information of user in the database for do the check

	 * @param  {e} capture the value of input and options object

	*/

  	confirmCheck(e){

  		var identificationNumber = this.props.history.location.state.documentNumber;
  		var flightReser = this.props.history.location.state.codeR;

  		axios.get("http://localhost:3000/check?opc=4&typefood="+this.state.valueMenu+'&chair='+this.state.numberChair+'&code=002&identification='+identificationNumber+'&flight='+flightReser)
			.then((response) => {
				
				if(response.status === 200){
					alert("Usted ha realizado su check-in correctamente, recuerde presentarse en el aereopuerto 2 horas antes del viaje");
					this.props.history.push({pathname: '/'});
				}

			}).catch(function (err) {
	        	console.log(err);
	    });
  	}

}

export default ConfirmCheck;