import React, { Component } from 'react';

import './ViewStewardess.css';


class ViewStewardess extends Component {

	constructor(props, context) {

		super(props);
		this.state = {};
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
				</div>
			</div>
		)
	}


	getValueButtons(e){

		console.log(e.target.id);

	}

}

export default ViewStewardess;