import React, { Component } from 'react';

import './HomeApp.css';

class HomeApp extends Component {

	constructor(props, context) {

		super(props);
		this.state = {};
		this.passView = this.passView.bind(this);
	}

	render(){
		return(
			<div className="container-fluid">
					<h1 className="title-home-app">Bienvenido a Gastronomic Air</h1>
					<center><h5>¿Qué tipo de persona eres?</h5></center>
				<form>
				<div className="row container-buttons-home">
					<div className="col-sm-6">
						<button type="button" className="buttons-home button-stewardess" id="stewardess" onClick={this.passView.bind(this)}><p className="title-buttons-home">Azafata</p></button>
					</div>
    				<div className="col-sm-6">
    					<button type="button" className="buttons-home button-passenger" id="passenger" onClick={this.passView.bind(this)}><p className="title-buttons-home">Pasajero</p></button>
    				</div>
				</div>
				</form>
			</div>
		);
	}



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