import React, { Component } from 'react';
import Modal from 'react-modal';

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
	}


	/** @description		update the value of component if this is update
	  * @param  {nextProps} Value of props from component SeedFood
	*/
	componentWillReceiveProps(nextProps){
		this.setState({ showModalClick: true });
	}

	/** @description		Change the status of modal for hide of display*/
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
			        		<p>Nro del vuelo</p>
			        		<input></input>
			        		<button onClick={this.searchFly}>Buscar vuelo</button>
			        	</div>
			        	
			   	</Modal>
			</div>
		)
	}

	/**

	 * Validate of data and fligth and pass the view

	*/

	searchFly(){

		this.props.history.push('/SeeFood')
	}

}


export default ViewModal;