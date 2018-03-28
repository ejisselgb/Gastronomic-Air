import React, { Component } from 'react';
import {Link} from 'react-router-dom';

import './SeeFood.css';

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
			food: {
				name:"Erika Gutierrez",
				booking:"ZRTHUP",
				numberChair: "A5",
				foodType: "Especial",
				menu: "Paella",
				status: "confirmado",
			},
			arrayFood: [],
			nameFly: "A63"
		};

		this.goConfirmPurchase = this.goConfirmPurchase.bind(this);
	}

	/** @description	Component that render the elements after to load the page */
	
	componentDidMount(){
		var arrayFill = []

		if(this.state.food !== undefined){
			arrayFill.push(this.state.food);
		}

		this.setState({
			arrayFood: arrayFill,
		})
	}

	render(){

		if(this.state.arrayFood !== undefined){
			this.food = this.state.arrayFood.map((image,index)=>{
				console.log(image);

				if(image.status != null ){
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

				return(
					<div key={index} className="col-ms-6 container-table-fly">
						<table className="table-fly">
							<tbody>
								<tr id="title-table">
									<td>Nombre Pasajero</td>
									<td>Nro Reserva</td>
									<td>Nro silla</td>
									<td>Tipo Comida</td>
									<td>Menu Seleccionado</td>
									<td>Estado de confirmación</td>
								</tr>
								<tr>
									<td>{image.name}</td>
									<td>{image.booking}</td>
									<td>{image.numberChair}</td>
									<td>{image.foodType}</td>
									<td>{image.menu}</td>
									<td style={divStyle} id="cell-prize">
										{this.statusCon}
										<Link to="/ViewStewardess">{this.confirmHere}</Link>
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
				<h3 className="title-purchase">Menu de comidas para el vuelo {this.state.nameFly}</h3>
				<div className="col-ms-10">
					{this.food}
				</div>

			</div>
		)
	}


	goConfirmPurchase(e){
		//this.props.history.push("/ConfirmPurchase");
	}

}

export default SeeFood;