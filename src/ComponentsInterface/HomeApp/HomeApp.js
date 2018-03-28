import React, { Component } from 'react';
import './HomeApp.css';

import Logo from '../../Resources/logogatronomic.PNG';

/**

 * @version			1.0

 * @author			Erika Gutierrez, Manuel Vasquez

 * @description 	Main view of application

*/

class HomeApp extends Component {

	/** @constructor */

	constructor(props, context) {
		super(props);
		this.state = {};
		this.passView = this.passView.bind(this);
	}

	render(){

		return(
			<div className="container-fluid">
					<img className="img-logo" src={Logo} alt=""/>
					<h1 className="title-home-app title-main">Bienvenido a Gastronomic Air</h1>
					<center><h5>¿Qué tipo de persona eres?</h5></center>
				<form>
				<div className="row container-buttons-home container-btn-main">
					<div className="col-sm-4">
						<button type="button" className="buttons-home button-stewardess" id="stewardess" onClick={this.passView.bind(this)}><p className="title-buttons-home">Azafata</p></button>
					</div>
    				<div className="col-sm-2">
    					<button type="button" className="buttons-home button-passenger" id="passenger" onClick={this.passView.bind(this)}><p className="title-buttons-home">Pasajero</p></button>
    				</div>
    				<div className="col-sm-4">
    					<button type="button" className="buttons-home button-passenger" id="provider" onClick={this.passView.bind(this)}><p className="title-buttons-home">Proveedor</p></button>
    				</div>
				</div>
				</form>
			</div>
		);
	}


	/**

	 * This method get value of button for pass of view depending on user type

	 * @param  {e} capture the value of button object

	*/

	passView(e){

		if(e.target.id !== undefined && e.target.id != null){
			if(e.target.id === "stewardess"){
				this.props.history.push("/ViewStewardess");
			}

			else if(e.target.id === "passenger"){
				this.props.history.push("/ViewPassenger");
			}
		}
	}
}


export default HomeApp;