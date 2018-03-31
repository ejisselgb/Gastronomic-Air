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
		this.state = {};

		this.goConfirmPurchase = this.goConfirmPurchase.bind(this);

	}


	render(){


		if(this.props.history.location.state.itemsFligth !== undefined){
			this.fly = this.props.history.location.state.itemsFligth.map((image,index)=>{
				return(
					<div key={index} className="col-ms-6 container-table-fly">
					<table className="table-fly">
					<tbody>
					<tr id="title-table">
						<td>Aereolínea</td>
						<td>Fecha Partida</td>
						<td>Fecha Regreso</td>
						<td>Precio</td>
						<td>Conseguir este vuelo</td>
					</tr>
					<tr>
						<td>{image[0]}</td>
						<td>{image[1]}</td>
						<td>{image[2]}</td>
						<td>{image[3]}</td>
						<td id="cell-prize">
							<button id="id-from-db" className="button-purchase" onClick={this.goConfirmPurchase.bind(this)} value={image[4]}>Seleccionar</button>
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
				<div className="container-pass">
					<h3 className="title-purchase">Reservar y comprar tus vuelos al mejor precio</h3>
					<div className="col-ms-10">
						{this.fly}
					</div>
				</div>
			</div>
		)
	}

	/**

	 * Get value of selected fligth for the user and pass the view for confirm purchase

	 * @param  {e} capture the value of button object

	*/

	goConfirmPurchase(e){

		this.props.history.push({
			pathname: '/ConfirmPurchase',
			state: {
				valueFly: e.target.value,
			}
		})
	}

}

export default Purchase;