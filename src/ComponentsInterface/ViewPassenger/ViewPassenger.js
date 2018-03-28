import React, { Component } from 'react';
import axios from 'axios';

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
		this.state = {};

		this.getValueOnClick = this.getValueOnClick.bind(this);
		this.onValueChanged = this.onValueChanged.bind(this);

		
	}

	render(){
		return(
			<div className="container-fluid">
				<h3 className="title-home-app">Encuentra tu vuelo, reserva, compra y haz check-in</h3>
				<div className="row container-buttons-home">
					<div className="col-sm-8">
						<div className="container-form">
							<div className="container-title">
								<div className="title-origen">Origen</div>
								<div className="title-destiny">Destino</div>
							</div>
							<div className="container-input">
								<input className="input-text" name="origin" type="text" placeholder="ej: Cali" onChange={this.onValueChanged} />
		              			<input className="input-text" name="destiny" type="text" placeholder="ej: Bogota" onChange={this.onValueChanged} />
							</div>
							<div className="date-form">
								<div className="title-fly-date"><p>Fechas de Viaje</p></div>
								<div className="title-form-date">
									<div className="title-form-date">Partida</div>
			              			<div className="title-form-date return">Regreso</div>
								</div>
			              		<div className="container-input-date">
			              			<input className="input-date" type="date" name="goDate" min="2018-03-27"
	                                  max="2018-12-31" onChange={this.onValueChanged} />
	                           	
				              		<input className="input-date" type="date" name="returnDate" min="2018-03-27"
		                                  max="2018-12-31" onChange={this.onValueChanged} />
			              		</div>
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
		);
	}

	/**

	 * Validate the type of the button for pass of view depending on the option selected

	 * @param  {e} capture the value of button object

	*/

	onValueChanged(e) {

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
	}

	/**

	 * Get value of inputs and get the data from endpoint for flights

	 * @param  {e} capture the value of button object

	 * @endpoint http://localhost:3000/search?opc=1&origin=:origin&destiny=:destiny

	*/

	getValueOnClick(e){
		
		var endPointFlights="http://localhost:3000/search?opc=1&origin="; 

		if(e.target.id === "check"){
			this.props.history.push("/ViewCheck");
		}

		else if(e.target.id === "search"){

			if(this.state.valueOrigin !== undefined && this.state.valueDestiny !== undefined && this.state.valueGoDate !== undefined && this.state.valuereturnDate !== undefined){
				axios.get(endPointFlights+this.state.valueOrigin+"&destiny="+this.state.valueDestiny)
				.then((response) => {
					if(response.status === 200){
						this.props.history.push({
				          pathname: '/Purchase',
				          state: {
				            itemsFligth: response.data,
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