import React, { Component } from 'react';
import Modal from 'react-modal';
import axios from 'axios';

import './ViewModal.css';

/**

 * @version			1.0

 * @author			Erika Gutierrez, Manuel Vasquez

 * @description 	Receive the information related to the fligth of that moment

*/

class ViewModal extends Component { 

	/** @constructor */

	constructor(props, context) {

		super(props);
		this.state = {showModalClick: ""};
   		this.handleCloseModal = this.handleCloseModal.bind(this);
   		this.searchFly = this.searchFly.bind(this);
   		this.onValueChanged = this.onValueChanged.bind(this);
	}


	/** 
		*@description			update the value of component if this is update

	  	* @param  {nextProps} 	value of props from component SeedFood
	*/

	componentWillReceiveProps(nextProps){
		this.setState({ showModalClick: true });
	}

	/** 

		* @description		Change the status of modal for hide of display
	*/

	handleCloseModal () {
	    this.setState({ showModalClick: false });
	}

	render(){

		if(this.props.disabled === true){
			this.showModal = true;
		}
		if(this.state.showModalClick === false){
			this.showModal = false;
		}
		else if(this.state.showModalClick === true){
			this.showModal = true;
		}


		return(
			<div>
			    <Modal 
			        isOpen={this.showModal}
			        contentLabel="Buscar vuelo">
			        <button className="btn-close" onClick={this.handleCloseModal}>cerrar</button>
			        	<center><p>¿Listo para volar?, ingresa los datos de tu vuelo</p></center>
			        	<div className="container-modal">
			        		<p>Código del vuelo</p>
			        		<input name="numberfligth" onChange={this.onValueChanged}></input>
			        		<button onClick={this.searchFly}>Buscar vuelo</button>
			        	</div>
			        	
			   	</Modal>
			</div>
		)
	}


	/**

	 * Get the value of fligth from input when is enter for the user

	 * @param  {e} capture the name, value identificator of input

	*/

	onValueChanged(e) {
		
		if(e.target.name === "numberfligth"){
			this.setState({
				numberfligth: e.target.value
			})
		}
	}

	/**

	 * Validate of data and fligth and pass the view

	*/

	searchFly(){

		console.log(this.state.numberfligth);

		if(this.state.numberfligth !== undefined){
			axios.get("http://localhost:3000/reservation?opc=1&numberfligth="+this.state.numberfligth)
			.then((response) => {
				this.props.history.push({
				    	pathname: '/SeeFood',
				    	state: {
				        	arrayReservation: response.data,
				        	numberfligth: this.state.numberfligth
				    	}
					})
				}).catch(function (err) {
	        	console.log(err);
	    	});
		}else{
			alert("Debe ingresar el codigo del vuelo para continuar");
		}
	}

}


export default ViewModal;