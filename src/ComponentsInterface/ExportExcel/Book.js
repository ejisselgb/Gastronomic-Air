import Workbook from 'react-excel-workbook';
import React, { Component } from 'react';

import './ExportExcel.css';

class Book extends Component {



	render(){

		
		var boolBook1;
		var boolBook2;
		var boolBook3;
		var boolBook4;

		if(this.props.arrayData.length > 0 ){
			this.props.arrayData.find( function( idElement ) { 
				console.log(idElement);
				if((idElement.totalValue !== undefined && idElement.nload !== undefined && idElement.load !== undefined)){
					boolBook1 = true;
				}else if(idElement.Nombre !== undefined && idElement.Correo !== undefined && idElement.PlatoEspecial !== undefined && idElement.NumeroVuelo && idElement.FechaVuelo){
					boolBook2 = true;
				}else if(idElement.flight !== undefined && idElement.name !== undefined && idElement.email !== undefined && idElement.type !== undefined && idElement.menu !== undefined && idElement.address !== undefined){
					boolBook3 = true;
				}else if(idElement.flight !== undefined && idElement.name !== undefined && idElement.email !== undefined && idElement.address !== undefined && idElement.menu !== undefined && idElement.value !== undefined){
					boolBook4 = true;
				}
				return (boolBook1, boolBook2, boolBook3, boolBook4)
			} )
		}

		return(
			<div className="container-book">
				<div className="book-1">
					<Workbook filename="reporte.xlsx" element={ boolBook1 ? <button className="btn btn-lg btn-primary btn-export btn-export-book1" >Informe generado</button> : null }>
				      <Workbook.Sheet data={this.props.arrayData} name="Reporte General">
				        <Workbook.Column label="Numero de vuelo" value="flight" />
				        <Workbook.Column label="Total Comida especial" value="totalValue" />
				        <Workbook.Column label="No cargada" value="nload" />
				        <Workbook.Column label="Cargada" value="load" />
				      </Workbook.Sheet>
				    </Workbook>
				</div>

				<div className="book-2">
					<Workbook filename="reporte.xlsx" element={ boolBook2 ? <button className="btn btn-lg btn-primary btn-export btn-export-book2" >Informe generado</button> : null }>
				      <Workbook.Sheet data={this.props.arrayData} name="Reporte Dpto Clientes">
				        <Workbook.Column label="Nombre" value="Nombre" />
				        <Workbook.Column label="Correo" value="Correo" />
				        <Workbook.Column label="Estado Carga Plato" value="PlatoEspecial" />
				        <Workbook.Column label="Numero Vuelo" value="NumeroVuelo" />
				        <Workbook.Column label="Fecha Vuelo" value="FechaVuelo" />
				      </Workbook.Sheet>
				    </Workbook>
				</div>

				<div className="book-3">
					<Workbook filename="reporte.xlsx" element={ boolBook3 ? <button className="btn btn-lg btn-primary btn-export btn-export-book4" >Informe generado</button> : null }>
				      <Workbook.Sheet data={this.props.arrayData} name="Reporte Proteina">
				        <Workbook.Column label="Nro vuelo" value="flight" />
				        <Workbook.Column label="Nombre Completo" value="name" />
				        <Workbook.Column label="Correo" value="email" />
				        <Workbook.Column label="Direccion" value="address" />
				        <Workbook.Column label="Tipo Comida" value="type" />
				        <Workbook.Column label="Nombre Plato" value="menu" />
				      </Workbook.Sheet>
				    </Workbook>
				</div>

				<div className="book-4">
					<Workbook filename="reporte.xlsx" element={ boolBook4 ? <button className="btn btn-lg btn-primary btn-export btn-export-book5" >Informe generado</button> : null }>
				      <Workbook.Sheet data={this.props.arrayData} name="Reporte Proteina">
				        <Workbook.Column label="Nro vuelo" value="flight" />
				        <Workbook.Column label="Nombre Completo" value="name" />
				        <Workbook.Column label="Correo" value="email" />
				        <Workbook.Column label="Plato" value="menu" />
				        <Workbook.Column label="Calificacion en encuesta" value="value" />
				      </Workbook.Sheet>
				    </Workbook>
				</div>

			</div>
		)
	}
}
export default Book;