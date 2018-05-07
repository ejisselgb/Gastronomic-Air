import React, { Component } from 'react';
import axios from 'axios';

import './ViewReports.css';
import Excel from '../ExportExcel/ExportExcel';


class ViewReports extends Component {

	constructor(props, context) {
		super(props);
		this.state = {disabledLoad: false};

		this.getReport = this.getReport.bind(this);
		this.onValueChanged = this.onValueChanged.bind(this);
		this.getPercentage = this.getPercentage.bind(this);
	}

	componentDidMount(){
		this.setState({
			fligth: this.props.history.location.state.fligthValue
		})
	}

	render(){

		return(
			<div className="container-fluid">
				<div className="container-pass view-check">
					<h3 className="title-home-app">Generar Reportes</h3>
					<div className="col-sm-8">
						<div className="container-form form-check">
							<p className="title-main-report">Seleccione el reporte que más le interese conocer sobre este vuelo</p>
							<div className="title-report">Descargar Reportes de Comidas Especiales</div>
							<select className="input-text select-reports" name="option" defaultValue="" onChange={this.onValueChanged}>
								<option value="" disabled>Seleccione una opción</option>
					            <option value="1">Reporte General Comidas Especiales</option>
					           	<option value="2" >Reporte Dpto Relaciones con los Clientes 1</option>
					           	<option value="5" >Reporte Dpto Relaciones con los Clientes 2</option>
					           	<option value="4">Reporte Proveedor Comidas Bajas en Proteína</option>
					       	</select>
					       	<div className="container-title container-report">
						       	<div className="title-origen">Fecha Inicio</div>
						       	<div className="title-doc title-report-two">Fecha Fin</div>
					       	</div>
					       	<div className="container-input">
					       		<input className="input-text text-check text-reports" name="startDate" placeholder="ej: dd/mm/aaaa" onChange={this.onValueChanged}/>
					       		<input className="input-text text-check text-reports" name="endDate" placeholder="ej: dd/mm/aaaa" onChange={this.onValueChanged}/>
					       	</div>
					       	<div>
					       		<button className="search-btn btn-reports" onClick={this.getReport.bind(this)}>Generar</button>
					       	</div>

					       	<div><Excel arrayDataReport={this.state.arrayDataReport} disabledLoad={this.state.disabledLoad} percentageNLoad={this.state.percentageNLoad} percentageLoad={this.state.percentageLoad} valueGeneral={this.state.valueGeneral} totalValue={this.state.totalValue} fligth={this.state.fligth}/></div>
						</div>
					</div>
				</div>
			</div>
		)
	}

	onValueChanged(e) {

		if(e.target.name === "option"){
			this.setState({
				valueGeneral : e.target.value,
			})
		}
		else if(e.target.name === "startDate"){
			this.setState({
				startDate : e.target.value,
			})
		}
		else if(e.target.name === "endDate"){
			this.setState({
				endDate : e.target.value,
			})
		}
	}


	getReport(e){

		if(this.state.valueGeneral !== undefined && this.state.startDate !== undefined && this.state.endDate !== undefined){

			axios.get("http://localhost:3000/reports?opc="+this.state.valueGeneral+"&numflight="+this.state.fligth+'&startdate='+this.state.startDate+'&enddate='+this.state.endDate)
			.then((response) => {
				if(response.data.length !== 0){

					this.setState({
						arrayDataReport: response.data,
						disabledLoad: true
					})

					this.getPercentage(this.state.arrayDataReport)

				}else{
					alert("Parece que no es posible generar el reporte, verifique el rango de fecha y que el vuelo se encuentre cerrado");
				}
			}).catch(function (err) {
			    console.log(err);
			});

		}else{
			alert("Debe de ingresar todos los campos para generar el reporte");
		}

	}

	getPercentage(totalFood){

		var countLoad = 0;
		var countNLoad = 0;
		var total = totalFood.length;

		totalFood.map((image,index)=>{
			if(image[3] === "N"){
				countNLoad += 1
			}else{
				countLoad += 1
			}

			return(<div></div>);
		})

		var valuePercentageLoad = (countLoad * 100) / total;
		var valuePercentageNLoad = (countNLoad * 100) / total;

		this.setState({percentageLoad: valuePercentageLoad, percentageNLoad: valuePercentageNLoad, totalValue: total});

	}
}

export default ViewReports;