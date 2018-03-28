import React, { Component } from 'react';
import Modal from 'react-modal';

import './ViewStewardess.css';
import ViewModal from './SeeFood/ViewModal/ViewModal'
import PassRegistry from './PassRegistry/PassRegistry'

Modal.setAppElement('body')

/**

 * @version			1.0

 * @author			Erika Gutierrez, Manuel Vasquez

 * @description 	Contain the avalaible options for the uer of type stewardess

*/

class ViewStewardess extends Component {

	/** @constructor */

	constructor(props, context) {

		super(props);
		this.state = {
					disabledFood: false,  
					disabledRegistry: false
				};

		this.getValueButtons = this.getValueButtons.bind(this);
	}

	render(){

		return(
			<div>
				<div className="container-fluid">
					<h1 className="title-home-app">Bienvenido a tu perfil de tripulante</h1>
					<center><h5>Selecciona una opción</h5></center>
					<form>
						<div className="row container-buttons-home">
							<div className="col-sm-2"></div>
							<div className=" col-sm-10 ">
								<div className="container-row-buttons">
									<div className="col-sm-2">
										<button type="button" className="buttons-home button-passenger" id="seeFood" onClick={this.getValueButtons.bind(this)}><p className="title-buttons-home">Ver comidas</p></button>
									</div>
    								<div className="col-sm-2">
    									<button type="button" className="buttons-home button-passenger" id="registry" onClick={this.getValueButtons.bind(this)}><p className="title-buttons-home">Registrar Pasajero</p></button>
    								</div>
    								<div className="col-sm-2">
    									<button type="button" className="buttons-home button-passenger" id="generate" onClick={this.getValueButtons.bind(this)}><p className="title-buttons-home">Generar Reporte</p></button>
    								</div>
    								<div className="col-sm-2">
    									<button type="button" className="buttons-home button-passenger" id="send" onClick={this.getValueButtons.bind(this)}><p className="title-buttons-home">Enviar Encuesta</p></button>
    								</div>
    							</div>
    						</div>
						</div>
					</form>
					<div>
						{ this.state.disabledFood ? <ViewModal disabled={this.state.disabledFood} history={this.props.history}/> : null }
					</div>
					<div>
						{ this.state.disabledRegistry ? <PassRegistry disabled={this.state.disabledRegistry}/> : null }
					</div>
				</div>
			</div>
		)
	}

	/**

	 * Pass between components and send email depending on value id of button

	 * @param  {e} capture the value of button object

	*/

	getValueButtons(e){

		if(e.target.id === "seeFood"){
			this.setState( {disabledFood: true, disabledRegistry: false} )
		}

		else if(e.target.id === "registry"){
			this.setState( {disabledRegistry: true, disabledFood: false} )
			
		}
	}

}

export default ViewStewardess;