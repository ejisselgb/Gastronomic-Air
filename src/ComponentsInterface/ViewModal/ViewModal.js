import React, { Component } from 'react';
import Modal from 'react-modal';
import axios from 'axios';

import './ViewModal.css';


class ViewModal extends Component { 

	/** @constructor */

	constructor(props, context) {

		super(props);

		this.state = {showModalClick: ""};
		this.handleCloseModal = this.handleCloseModal.bind(this);
   		this.searchFly = this.searchFly.bind(this);
   		this.onValueChanged = this.onValueChanged.bind(this);
   		this.refreshView = this.refreshView.bind(this);
   		this.consultFligth = this.consultFligth.bind(this);
   		this.sendEmail = this.sendEmail.bind(this);
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
			        	<center><p>{this.props.messageModal}</p></center>
			        	<div className="container-modal">
			        		<p>{this.props.messageInfo}</p>
			        		<input name={this.props.valueNameInput} onChange={this.onValueChanged}></input>
			        		<button onClick={this.searchFly}>{this.props.valueBtn}</button>
			        	</div>
			        	
			   	</Modal>
			</div>
		);
	}

	/**

	 * Get the value of fligth from input when is enter for the user

	 * @param  {e} capture the name, value identificator of input

	*/

	onValueChanged(e) {
		
		/* Get data of reservation for the fligth selected */

		if(e.target.name === "numberfligth"){

			this.setState({
				numberfligth: e.target.value,
				numberfligthname: e.target.name,
				valueOption: 1
			})
		}

		/* Update status of confirmation of user */

		else if(e.target.name === "numberres"){

			this.setState({
				valueReservation: e.target.value,
				valueReservationname: e.target.name,
				valueOption: 2
			})
		}

		/* Pass view for select the report */

		else if(e.target.name === "reportPro"){

			this.setState({
				valueFligthReport: e.target.value,
				valueFligthReportname: e.target.name,
				valueOption: 2
			})
		}

		else if(e.target.name === "loadFood"){

			this.setState({
				valueFligthReport: e.target.value,
				valueFligthReportname: e.target.name,
				valueOption: 4
			})

		}else if(e.target.name === "inquiry"){

			this.setState({
				valueFligthReport: e.target.value,
				valueFligthReportname: e.target.name,
				valueOption: 6
			})

		}
	}

	/**

	 * Validate of data and fligth and pass the view

	*/

	searchFly(){

		if(this.state.numberfligth !== undefined && this.state.numberfligth !== ""){
			this.consultFligth(this.state.numberfligth, this.state.numberfligthname, this.state.valueOption)
		}

		else if(this.state.valueReservation !== undefined && this.state.valueReservation !== ""){
			this.consultFligth(this.state.valueReservation, this.state.valueReservationname, this.state.valueOption)
		}

		else if(this.state.valueFligthReport !== undefined && this.state.valueFligthReport !== ""){
			this.consultFligth(this.state.valueFligthReport, this.state.valueFligthReportname, this.state.valueOption)
		}

		else{
			alert("Debe ingresar la información solicitada para continuar");
		}
	}


	/**

	 * Pass between components and send email depending on value id of button

	 * @param  {e} capture the value of button object

	*/

	consultFligth(valueFligth, typeData, valueOption){

		console.log("valueFligth ", valueFligth, "typeData ", typeData, "valueOption ", valueOption);

		if(typeData === "reportPro"){
			this.props.history.push({
			pathname: '/ViewReports',
				state: {
				    fligthValue: valueFligth
				}
			})
		}else{

			axios.get("http://localhost:3000/reservation?opc="+valueOption+"&"+typeData+"="+valueFligth)
			.then((response) => {

				if(response.status === 200){
					if(typeData === "numberfligth"){
					this.props.history.push({
				    	pathname: '/SeeFood',
				    	state: {
				        	arrayReservation: response.data,
				        	numberfligth: this.state.numberfligth
				    	}
					})
					}
					else if(typeData === "numberres"){
						alert("Usuario confirmado correctamente");
						if(this.props.numberfligth !== undefined){
							this.refreshView(this.props.numberfligth);
						}	
					}
					
					else if(typeData === "loadFood"){
						this.props.history.push({
					       	pathname: '/ViewLoadFood',
					        state: {
					            foodToLoad: response.data,
					            datafligth: valueFligth
					        }
					    })

					}else if(typeData === "inquiry"){
						this.sendEmail(response.data, valueFligth);
					}

				}

			}).catch(function (err) {
	        	//alert("Se presento un problema, verifique los datos ingresados e intente de nuevo");
	        	console.log(err);
	    	});
		}
	}


	/**

	 * Pass between components and send email depending on value id of button

	 * @param  {e} capture the value of button object

	*/

	refreshView(valueProps){

		axios.get("http://localhost:3000/reservation?opc=1&numberfligth="+valueProps)
			.then((response) => {
				this.props.receiveValueRefresh(response.data);
				}).catch(function (err) {
	        	console.log(err);
	    	});
	}


	/**

	 * Send email

	 * @param  {emails, valueFligth} array of emails user and number fligth

	*/

	sendEmail(emails, valueFligth){

		var countEmails = emails.length;

		emails.map((image,index)=>{
			axios.get("http://localhost:3000/send/"+image[1]+"/Template1/Gracias por comprar en Gastronomic Air")
			.then((response) => {
				countEmails = countEmails - 1;
				if(response.status === 200 && countEmails === 0){
					alert("La encuesta ha sido enviada a los usuarios del vuelo " + valueFligth);
					window.location.reload();
				}
				
			}).catch(function (err) {
		        console.log(err);
		    });

		    return(<div></div>)
		})
	}

}


export default ViewModal;


