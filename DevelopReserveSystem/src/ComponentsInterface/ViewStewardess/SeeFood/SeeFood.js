import React, { Component } from 'react';
import axios from 'axios';

import './SeeFood.css';
import ViewModal from '../../ViewModal/ViewModal';

/**

 * @version			1.0

 * @author			Erika Gutierrez, Manuel Vasquez

 * @description 	Show in table the menu select for the passengers 

*/

class SeeFood extends Component {

	/** @constructor */

	constructor(props, context) {

		super(props);
		this.state = {
			arrayFood: [],
			disabledRegistry: false,
			valueTest: false,
			disabledButton: false
		};

		this.goConfirmPurchase = this.goConfirmPurchase.bind(this);
		this.receiveValueRefresh = this.receiveValueRefresh.bind(this);
	}

	/** @description	Component that render the elements after to load the page */
	
	componentDidMount(){

		this.setState({
			messageModalPass: 'Ingresa los datos del pasajero para continuar',
			valueNameInputPass: 'numberReservation',
			valueBtnPass: 'Registrar Pasajero',
			messageInfoPass: 'Nro Reserva'
		})

		if(this.props.history.location.state.arrayReservation !== undefined){
			this.setState({
				arrayFood: this.props.history.location.state.arrayReservation
			})
		}
	}

	/**

	 * This method is in charge of update the value that is show in the table when one user is confirm

	 * @param  {value} corresponding to new value of arrayFood

	*/

	receiveValueRefresh(value){
		this.setState({
			arrayFood: value,
			disabledRegistry: false
		})
	}


	render(){

		this.food = this.state.arrayFood.map((image,index)=>{
			this.nameFly = image[0];

			if(image[6] !== "Sin Confirmar"){
				this.statusCon = "Pasajero confirmado";
				var divStyle = {
					backgroundColor: "#84A8FB",
	    			color: "white",
	    			border: "#84A8FB"
				};

				this.confirmHere = "";

			}else{

				this.statusCon = "Sin confirmar "
				this.confirmHere = "(Registrar Pasajero aqui)";
			}

			if(image[7] === "Cerrado" || this.state.disabledButton === true){
				this.backColor = "transparent";
			    this.colorFont = "black";
			    this.valueBtnClose = "Vuelo Cerrado";
			    this.statusCon = "Vuelo Cerrado";
				this.confirmHere = ""; 
			}else{
				this.valueBtnClose = "Cerrar Vuelo";
			}

			return(
				<div key={index} className="col-ms-6 container-table-fly">
					<table className="table-fly">
						<tbody>
							<tr id="title-table">
								<td>Número Reserva</td>
								<td>Nombre Pasajero</td>
								<td>Nro silla</td>
								<td>Tipo Comida</td>
								<td>Menu Seleccionado</td>
								<td>Estado de confirmación</td>
							</tr>
							<tr>
								<td>{image[2]}</td>
								<td>{image[1]}</td>
								<td>{image[3]}</td>
								<td>{image[4]}</td>
								<td>{image[5]}</td>
								<td style={divStyle} id="cell-prize">
										{this.statusCon}
										 <button className="registry" id="registry" onClick={this.goConfirmPurchase}>{this.confirmHere}</button>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				)
			})

		
		var divStyle = {
		  	backgroundColor: this.backColor,
    		color: this.colorFont
		};

		return(
			<div className="container-fluid">
				<div className="container-pass see-food"> 
					<button className="btn-close-food" id="closeFlight" onClick={this.goConfirmPurchase} disabled={this.state.disabledButton} style={divStyle}>{this.valueBtnClose}</button>
					<h3 className="title-purchase">Menu de comidas para el vuelo {this.nameFly}</h3>
					<div className="col-ms-10">
						{this.food}
					</div>
					<div>{ this.state.disabledRegistry ? <ViewModal disabled={this.state.disabledRegistry} history={this.props.history} messageModal={this.state.messageModalPass} valueNameInput={this.state.valueNameInputPass} valueBtn={this.state.valueBtnPass} messageInfo={this.state.messageInfoPass} receiveValueRefresh={this.receiveValueRefresh.bind(this)} numberfligth={this.props.history.location.state.numberfligth}/> : null }</div>
				</div>
			</div>
		)
	}

	/**

	 * Close the modal when is update the passenger

	 * @param  {e} value of identification of the modal

	*/

	goConfirmPurchase(e){
		if(e.target.id === "registry"){
			this.setState( {disabledRegistry: true} )			
		}

		if(e.target.id === "closeFlight"){
			axios.get("http://localhost:3000/reservation?opc=3&codefligth="+this.nameFly)
			.then((response) => {
				if(response.status === 200){
					alert("El vuelo fue cerrado, ya no podrá seguir registrando pasajeros");
					this.setState({disabledButton: true})
				}
			}).catch(function (err) {
	        	console.log(err);
	      	});	
		}
	}

}

export default SeeFood;