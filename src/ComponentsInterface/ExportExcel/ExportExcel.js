import React, { Component } from 'react';

//import './ExportExcel.css';
import Book from './Book.js';

class ExportExcel extends Component {


	constructor(props, context) {
		super(props);
		this.state = {varValidate: false};

	}

	componentDidMount(){}


	render(){

		var arrayData = [];

		if(this.props.valueGeneral === "1"){
			const data = 
			{
				flight: this.props.fligth,
				totalValue: this.props.totalValue,
				nload: this.props.percentageNLoad  + "%",
				load: this.props.percentageLoad  + "%"
			}

			arrayData.push(data);

		}

		if(this.props.arrayDataReport !== undefined){
			this.props.arrayDataReport.map((image,index)=>{
				if(this.props.valueGeneral === "2"){
					const data = 
					{
						Nombre: image[0],
						Correo: image[1],
						EstadoVuelo: image[2],
						PlatoEspecial: image[3],
						NumeroVuelo: image[4],
						FechaVuelo: image[5]
					}
					
					arrayData.push(data);
				}
				else if(this.props.valueGeneral === "4"){
					const data = 
						{
							flight: image[0],
							name: image[1],
							email: image[2],
							address: image[5],
							type: image[3],
							menu: image[4]
						}

						arrayData.push(data);
				}
				else if(this.props.valueGeneral === "5"){
					const data = 
						{
							flight: image[0],
							name: image[1],
							email: image[2],
							address: image[3],
							menu: image[5],
							value: image[7]
						}
						
					arrayData.push(data);
				}

				return(<div></div>)
			})
		}
		return(

			<div className="row text-center"  >
				<Book arrayData={arrayData} disabledLoad={this.props.disabledLoad} valueGeneral={this.props.valueGeneral}/>
			</div>
		)
		
	}

}



export default ExportExcel;