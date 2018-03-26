import React, { Component } from 'react';

import './ConfirmCheck.css';

class ConfirmCheck extends Component {

	constructor(props, context) {

		super(props);
		this.state = {};

		this.optionsChairFly = this.optionsChairFly.bind(this);
		this.optionsMenu = this.optionsMenu.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.confirmCheck = this.confirmCheck.bind(this);

	}

	componentDidMount(){

		this.setState({
			nameUser: "Erika Gutiérrez",
			value: 'chair',
			chairFly: [1,2,3,4,5],
			menu: ["Paella", "Casuela Mariscos", "Vegetales al vapor"],
			valueDisable: true,
			valueDisableMenu: true,
		})
	}


	optionsChairFly(){

		let itemsChair = []; 

		if(this.state.chairFly !== undefined){
			for (var i = 0; i < this.state.chairFly.length; i++) {

				 itemsChair.push(<option key={i} value={i}>{this.state.chairFly[i]}</option>);  
			};
		}
		return itemsChair;
	}

	optionsMenu(){

		let itemsMenu = []; 

		if(this.state.menu !== undefined){
			for (var i = 0; i < this.state.menu.length; i++) {

				 itemsMenu.push(<option key={i} value={i}>{this.state.menu[i]}</option>);  
			};
		}
		return itemsMenu;

	}


	render(){

		return(
			<div className="container-fluid">
				<h3 className="title-home-app">Confirma tu check-in y preparate para el viaje</h3>
				<div className="col-sm-8">
					<div className="container-form form-check">
						<p>Bienvenido <b>{this.state.nameUser}</b>, confirma todos los detalles de tu vuelo</p>
							<div className="container-title">
								<div className="title-origen">Seleccionar Silla</div>
								<div className="title-doc title-check-two">Confirmar Comida</div>
							</div>
							<div className="container-input">
								<select className="input-text input-select input-select-check" defaultValue="" onChange={this.handleChange.bind(this)}>
									<option value="" disabled>Por favor escoja una silla</option>
									{this.optionsChairFly()}
					    		</select>
					    		<select className="input-text input-select input-select-check" defaultValue="no" onChange={this.handleChange.bind(this)}>
					            	<option value="no">No</option>
					           		<option value="si">Si</option>
					        	</select>
							</div>

							<div className="container-title">
								<div className="title-origen">Tipo de Comida</div>
			    				<div className="title-doc title-check-menu">Confirmar Menu</div>
							</div>

			    			<div className="container-input">
			    				<select className="input-text input-select input-select-check" defaultValue="" onChange={this.handleChange.bind(this)} disabled={this.state.valueDisable}>
			    					<option value="" disabled>Escoge tu menu</option>
					        		<option value="normal">Normal</option>
					        		<option value="special">Especial</option>
					     		</select>

					    		<select className="input-text input-select input-select-check" defaultValue="" onChange={this.handleChange.bind(this)} disabled={this.state.valueDisableMenu}>
									{this.optionsMenu()}
					    		</select>
							</div>
			    		<button className="search-btn" onClick={this.confirmCheck.bind(this)}>Confirmar Check-in</button>
					</div>
				</div>
			</div>
		)
	}

	handleChange(e) {

		this.setState({value: e.target.value});

    	if(e.target.value === "si"){
    		console.log("es igual a si");
    		this.setState({valueDisable: false})

    	}else if (e.target.value === "no"){
    		this.setState({valueDisable: true})
    	}

    	if(e.target.value === "special"){
    		this.setState({valueDisableMenu: false})
    	}else if (e.target.value === "normal"){
    		this.setState({valueDisableMenu: true})
    	}
  	}

  	confirmCheck(e){

  		alert("checkRealizado");
  	}

}


export default ConfirmCheck;