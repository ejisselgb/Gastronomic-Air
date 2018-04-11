import React, { Component } from 'react';
import axios from 'axios';

import './Inquiry.css';

class Inquiry extends Component {

	/** @constructor */

	constructor(props) {
	    super(props);
	    this.state = {};

	    this.getQuestion = this.getQuestion.bind(this);
	    this.handleChange = this.handleChange.bind(this);
	    this.updateValueInquiry = this.updateValueInquiry.bind(this); 
  	}

  	componentDidMount(){
  		this.getQuestion();		
  	}


	render(){

		if(this.state.question !== undefined){
			this.questions = this.state.question.map((image,index)=>{
				
				return(
					<div key={index}>
							<div className="container-title">
								<div className="title-origen-inquiry">{image[1]}</div>
								<select className="input-text input-select-inquiry" defaultValue="" onChange={this.handleChange} name={image[0]}>
									<option value="" disabled></option>
					            	<option value="1">1</option>
					            	<option value="2">2</option>
					            	<option value="3">3</option>
					            	<option value="4">4</option>
					            	<option value="5">5</option>
					        	</select>
							</div>
					</div>
				)
			})
		}

		return(
			<div className="container-fluid">
				<div className="container-pass view-check">
					<h3 className="title-home-app">Encuesta de satisfacción al cliente</h3>
					<center><p>Califica de 1 a 5 la comida especial y ayudanos a mejorar</p></center>
					<div className="col-sm-12 container-form form-purchase form-inquiry">
						<div className="container-title">
							<div className="title-origen">Nro documento</div>
							<input className="input-text" name="document" type="text" onChange={this.handleChange}/>
						</div>
						<div>
							{this.questions}
						</div>
						<div>
					       	<button className="search-btn btn-reports" onClick={this.updateValueInquiry}>Enviar</button>
					    </div>
					</div>
				</div>
			</div>
		)
	}

	getQuestion(){
		axios.get("http://localhost:3000/inquiry?opc=1")
		.then((response) => {
			this.setState({
				question: response.data
			})
		}).catch(function (err) {
			console.log(err);
		});
	}

	handleChange(e) {

		var arrayValues = [];

		if(e.target.name === "1"){
			this.value1 = e.target.value;
			this.name1 = e.target.name;
			arrayValues.push(this.value1);

		}else if(e.target.name === "2"){
			this.value2 = e.target.value;
			this.name2 = e.target.name;
			arrayValues.push(this.value2);

		}else if(e.target.name === "3"){
			this.value3 = e.target.value;
			this.name3 = e.target.name;
			arrayValues.push(this.value3);

		}else if(e.target.name === "4"){
			this.value4 = e.target.value;
			this.name4 = e.target.name;
			arrayValues.push(this.value4);
			this.contactValues = [
				{"id": this.name1, "value": this.value1},
				{"id": this.name2, "value": this.value2},
				{"id": this.name3, "value": this.value3},
				{"id": this.name4, "value": this.value4}
			]
			
		}else if(e.target.name === "document"){
			this.nroDocument = e.target.value;

		}


		this.setState({
			contactValues: this.contactValues, nroDocument: this.nroDocument
		})		
	}

	updateValueInquiry(){

		if(this.state.contactValues !== undefined && this.state.nroDocument !== undefined){

			var countValues = this.state.contactValues.length;

			this.state.contactValues.map((image,index)=>{
				var imageId = image["id"];
				var imageValue = image["value"];

				axios.get("http://localhost:3000/inquiry?opc=2&usernumber="+this.state.nroDocument+"&codequestion="+imageId+"&valuequestion="+imageValue)
				.then((response) => {
					countValues = countValues - 1;
					if(response.status === 200 && countValues === 0){
						alert("Gracias por realizar la encuesta y por elegir Gastronimic Air, vuelva pronto!");
						window.location.reload();
					}

				}).catch(function (err) {
		        	console.log(err);
		    	});

				return(<div></div>)
			})

			

		}else{
			alert("No puede dejar campos vacios");
		}

	}

}


export default Inquiry;