import React, { Component } from 'react';
import axios from 'axios';

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
		this.onValueChanged = this.onValueChanged.bind(this);
	}

	render(){
		return(
			<div className="container-fluid">
				<div className="container-pass view-check">
					<h3 className="title-home-app">Comienza tu check-in</h3>
					<div className="col-sm-8">
						<div className="container-form form-check">
							<div className="container-title title-check">
								<div className="title-origen">Código de Vuelo</div>
								<div className="title-doc">Nro Documento</div>
							</div>
							<div className="container-input">
								<input className="input-text text-check" name="code" type="text" placeholder="ej: AGK009" onChange={this.onValueChanged}/>
								<input className="input-text text-check" name="number" type="text" onChange={this.onValueChanged}/>
							</div>
							<button className="search-btn" onClick={this.goViewToClick.bind(this)}>Comenzar</button>
						</div>
					</div>
				</div>
			</div>
		)
	}

	/**

	 * This method capture the information enter through the inputs

	 * @param  {e} capture the values of inputs fligth's number and identification user

	*/

	onValueChanged(e) {

		if(e.target.name === "code"){
			this.setState({
				codeReservation: e.target.value 
			})
		}else if(e.target.name === "number"){
			this.setState({
				identification: e.target.value 
			})
		}
	}

	/**

	 * This method validate of data insert through in the form and show the view for confirm check

	 * @param  {e} capture the value of button object

	*/
	goViewToClick(e){

		if(this.state.codeReservation !== undefined && this.state.identification !== undefined){
			axios.get("http://localhost:3000/check?opc=1&identification="+this.state.identification+"&numbereservation="+this.state.codeReservation)
				.then((response) => {
					if(response.data.length >= 1){
						this.props.history.push({
				          pathname: '/ConfirmCheck',
				          state: {
				            nameUser: response.data[0][0],
				            codeR: this.state.codeReservation,
				            documentNumber: this.state.identification,
				          }
				        })
					}else{
						alert("Usted no tiene ninguna reserva");
					}
				}).catch(function (err) {
	        		console.log(err);
	      		});	
		}else{
			alert("Debe ingresar código del vuelo y número de documento para continuar")
		}
	}
}

export default ViewCheck;