import React, { Component } from 'react';
import axios from 'axios';

import './ViewLoadFood.css';

class ViewLoadFood extends Component {

	/** @constructor */

	constructor(props, context) {
		super(props);
		this.state = {hideButton: false, confirmHere: "Cargar plato"}

		this.updateStatusFood = this.updateStatusFood.bind(this);
		this.refreshView = this.refreshView.bind(this);
	}

	/** @description	Component that render the elements after to load the page */

	componentDidMount(){
		this.setState({
			datafligth: this.props.history.location.state.datafligth,
			arrayDataLoad: this.props.history.location.state.foodToLoad
		}) 
	}

	render(){


		if(this.state.arrayDataLoad !== undefined){
			this.food = this.state.arrayDataLoad.map((image,index)=>{

			if(image[3] === "N"){
				this.statusLoad = "Plato sin cargar";
				this.valueDisplay = "block";
			}else{
				this.statusLoad = "Plato Cargado";
				this.valueDisplay = "none";
			}

			var divStyle = {
				display: this.valueDisplay,
			};

			return(
				<div key={index} className="col-ms-6 container-table-fly">
					<table className="table-fly">
						<tbody>
							<tr id="title-table">
								<td>Número Reserva</td>
								<td>Tipo de Comida</td>
								<td>Descripción Plato</td>
								<td>Estado de Carga</td>
							</tr>
							<tr>
								<td>{image[0]}</td>
								<td>{image[1]}</td>
								<td>{image[2]}</td>
								<td id="cell-load">
									{this.statusLoad}
									<button style={divStyle} className="btn-load" id={image[0]} value={image[0]} onClick={this.updateStatusFood}>{this.state.confirmHere}</button>
								</td>
								</tr>
							</tbody>
						</table>
					</div>
				)
			})
		}

		return(
			<div className="container-fluid">
				<div className="container-pass see-food"> 
					<h3 className="title-purchase">Carga carga comidas especiales del vuelo {this.state.datafligth}</h3>
					<div className="col-ms-10">
						{this.food}
					</div>
				</div>
			</div>
		);
	}

	/**

	 * Update status of load the food in the database

	 * @param  {e} value and id the button for update the information

	*/

	updateStatusFood(e){

		var valueId = e.target.id;

		axios.get("http://localhost:3000/reservation?opc=5&numreserve="+e.target.value)
			.then((response) => {
				if(response.status === 200){
					this.setState({hideButton: true, valueUpdateBtn: valueId, confirmHere: "Plato cargado"})
					this.refreshView(this.state.datafligth);
				}
			}).catch(function (err) {
	        	console.log(err);
	      	});	
	}

	/**

	 * Refresh the value of load food in the interface

	 * @param  {valueProps} corresponding value of fligth enter for load the food

	*/

	refreshView(valueProps){

		axios.get("http://localhost:3000/reservation?opc=4&loadFood="+valueProps)
			.then((response) => {
				
				this.setState({arrayDataLoad: response.data})

				}).catch(function (err) {
	        	console.log(err);
	    	});
	}

}

export default ViewLoadFood;