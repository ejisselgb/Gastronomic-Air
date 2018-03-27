import React, { Component } from 'react';

import './ViewCheck.css';

/**

 * @version			1.0

 * @author			Erika Gutierrez, Manuel Vasquez

 * @description 	This view can the user do the check-in, confirm the flight

*/

class ViewCheck extends Component {

	/** @constructor */

	constructor(props, context) {

		super(props);
		this.state = {};
		this.goViewToClick = this.goViewToClick.bind(this);
	}

	render(){
		return(
			<div className="container-fluid">
				<h3 className="title-home-app">Comienza tu check-in</h3>
				<div className="col-sm-8">
					<div className="container-form form-check">
						<div className="container-title title-check">
							<div className="title-origen">Código de Reserva</div>
							<div className="title-doc">Nro Documento</div>
						</div>
						<div className="container-input">
							<input className="input-text text-check" name="origen" type="text" placeholder="ej: IZHPTV"/>
							<input className="input-text text-check" name="origen" type="text"/>
						</div>
						<button className="search-btn" onClick={this.goViewToClick.bind(this)}>Comenzar</button>
					</div>
				</div>
			</div>
		)
	}

	/**

	 * This method validate of data insert through in the form and show the view for confirm check

	 * @param  {e} capture the value of button object

	*/
	goViewToClick(e){
		this.props.history.push("/ConfirmCheck");
	}

}


export default ViewCheck;