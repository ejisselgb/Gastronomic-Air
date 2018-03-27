import React, { Component } from 'react';

import './Purchase.css';

/**

 * @version			1.0

 * @author			Erika Gutierrez, Manuel Vasquez

 * @description 	Show all the available flights be to the purchased the user

*/

class Purchase extends Component {

	/** @constructor */

	constructor(props, context) {

		super(props);
		this.state = {
			fly: {
				name:"avianca",
				time:"5:30",
				timeReturn:"21:00",
				prize:"180.000"
			},

			arrayFly: []

		};

		this.goConfirmPurchase = this.goConfirmPurchase.bind(this);

	}

	/** @description	Component that render the elements after to load the page */

	componentDidMount(){

		var arrayFill = []

		if(this.state.fly !== undefined){
			arrayFill.push(this.state.fly);
		}

		this.setState({
			arrayFly: arrayFill,
		})
	}

	render(){

		if(this.state.arrayFly !== undefined){
			this.fly = this.state.arrayFly.map((image,index)=>{

				return(
					<div key={index} className="col-ms-6 container-table-fly">
					<table className="table-fly">
					<tbody>
					<tr id="title-table">
						<td>Aereolínea</td>
						<td>Hora Ida</td>
						<td>Regreso</td>
						<td>Precio</td>
						<td>Conseguir este vuelo</td>
					</tr>
					<tr>
						<td>{image.name}</td>
						<td>{image.time}</td>
						<td>{image.timeReturn}</td>
						<td>{image.prize}</td>
						<td id="cell-prize">
							<button id="id-from-db" className="button-purchase" onClick={this.goConfirmPurchase.bind(this)}>Seleccionar</button>
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
				<h3 className="title-purchase">Reservar y comprar tus vuelos al mejor precio</h3>
				<div className="col-ms-10">
					{this.fly}
				</div>

			</div>
		)
	}

	/**

	 * Get value of selected fligth for the user and pass the view for confirm purchase

	 * @param  {e} capture the value of button object

	*/

	goConfirmPurchase(e){
		this.props.history.push("/ConfirmPurchase");
	}

}

export default Purchase;