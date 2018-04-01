import React, { Component } from 'react';

import './ViewReports.css';


class ViewReports extends Component {

	constructor(props, context) {
		super(props);
		this.state = {};
	}

	render(){

		console.log(this.props.history.location.state.fligthValue);
		return(
			<div className="container-fluid">
				<div className="container-pass view-check">
					<h3 className="title-home-app">Generar Reportes</h3>
					<div className="col-sm-8">
						<div className="container-form form-check">
							<p className="title-main-report">Seleccione el reporte que más le interese conocer sobre este vuelo</p>
							<div className="title-report">Descargar Reportes de Comidas Especiales</div>
							<select className="input-text select-reports" defaultValue="">
								<option value="" disabled>Seleccione una opción</option>
					            <option value="">Reporte General Comidas Especiales</option>
					           	<option value="">Reporte Dpto Relaciones con los Clientes</option>
					           	<option value="">Reporte Proveedor Comidas Bajas en Proteína</option>
					           	<option value="">Descargar Todos los Reportes</option>
					       	</select>
					       	<div>
					       		<button className="search-btn btn-report" >Descargar</button>
					       	</div>
						</div>
					</div>
				</div>
			</div>
		)
	}

}

export default ViewReports;