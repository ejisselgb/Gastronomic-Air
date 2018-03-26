import React, { Component } from 'react';

import './ViewPassenger.css';

class ViewPassenger extends Component {

	constructor(props, context) {

		super(props);
		this.state = {};

		this.getValueOnClick = this.getValueOnClick.bind(this);

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
								<input className="input-text" name="origen" type="text" placeholder="ej: Cali"/>
		              			<input className="input-text" name="destino" type="text" placeholder="ej: Bogota"/>
							</div>
							<div className="date-form">
								<div className="title-fly-date"><p>Fechas de Viaje</p></div>
								<div className="title-form-date">
									<div className="title-form-date">Partida</div>
			              			<div className="title-form-date return">Regreso</div>
								</div>
			              		<div className="container-input-date">
			              			<input className="input-date" type="date" name="date" min="2018-03-25"
	                                  max="2018-05-25" />
	                           	
				              		<input className="input-date" type="date" name="date" min="2018-03-25"
		                                  max="2018-05-25" />
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

	getValueOnClick(e){
		if(e.target.id === "check"){
			this.props.history.push("/ViewCheck");
		}
		else if(e.target.id === "search"){
			this.props.history.push("/Purchase");
		}
	}
}


export default ViewPassenger;