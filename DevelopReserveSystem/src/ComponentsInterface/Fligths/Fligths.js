import React, { Component } from 'react';
import TimeConverter from './TimeConverter/TimeConverter.js';
import calculateDistance from './TimeConverter/calculateDistance.js';

class Fligths extends Component {

	/** @constructor */

	constructor(props, context) {

		super(props);
		this.state = {arrayFill: []};

		this.buildingTable = this.buildingTable.bind(this);
		this.goConfirmPurchase = this.goConfirmPurchase.bind(this);
		this.getFavoriteAirline = this.getFavoriteAirline.bind(this);
	}

	componentDidMount(){

		var arrayFill = [];

		this.props.history.location.state.totalFligths.map((image,index)=>{

			var fligthCalculate = {
				airline: image[6],
				port: image[0],
				departure: image[2],
				arrival: image[3],
				origin: image[4],
				destiny: image[5]
			}

			arrayFill.push(fligthCalculate);
			this.setState({arrayToView: arrayFill})

			return null;
		})

		
		TimeConverter.getHoursArray(this.props.history.location.state.totalFligths);
		var distance = calculateDistance.calculateDistance(TimeConverter.arrayTimesFly);
		var min = Math.min.apply(null, distance);
		var minKph = Math.min.apply(null, TimeConverter.arrayKph);
		this.setState({distance: distance, min: min, minKph: minKph});
	}

	render(){

		var priceFly = '';

		if(this.state.distance){
		this.fly = TimeConverter.arrayTimesFly.map((image,index)=>{

			var numberScale = '';
			if(image.stop === 0){
				numberScale = 'Directo';
			}else{
				numberScale = image.stop;
			}

			var timeFly = 0;
			if(image.totalDiference === 0){
				timeFly = 1440
			}else{
				timeFly = image.totalDiference;
			}

			if(this.props.history.location.state.valueFilter === "f0"){

				this.titleFlights = "Encuentra el vuelo más rápido y el más económico";

				for(var i=0; i<this.state.distance.length; i++){
				if(this.state.min === this.state.distance[i]){
					priceFly = 'Precio elevado';
				}else{
					priceFly = 'Económico';
				}
				if(image.totalDiference === this.state.distance[i]){
					return(
						<div key={index} className="col-ms-6 container-table-fly">
							{this.buildingTable(image.airline, image.origin, image.destiny, image.arrival, image.departure, priceFly, timeFly + " minutos", numberScale, image.codFly)}
						</div>
					)
				}
			}

			}else if(this.props.history.location.state.valueFilter === "f1"){

				this.titleFlights = "Encuentra los mejores vuelos directos, al mejor precio";

				if(image.stop === 0){
					return(
						<div key={index} className="col-ms-6 container-table-fly">
							{this.buildingTable(image.airline, image.origin, image.destiny, image.arrival, image.departure, "Precio Elevado", timeFly + " minutos", numberScale, image.codFly)}
						</div>
					)
				}

			}else if(this.props.history.location.state.valueFilter === "f2"){

				this.titleFlights = "Descubre el vuelo más rápido y permace menos tiempo en el aire";

				if(this.state.minKph <= image.kph){

					return(
							<div key={index} className="col-ms-6 container-table-fly">
								{this.buildingTable(image.airline, image.origin, image.destiny, image.arrival, image.departure, "Económico", timeFly + " min", numberScale, image.codFly)}
							</div>
						)
				}

			}else if(this.props.history.location.state.valueFilter === "f3"){

				this.titleFlights = "Escoge el mejor vuelo y llega a tiempo a tu cita " + this.props.history.location.state.valuereturnTime;

				if(this.props.history.location.state.valuereturnTime){

					var timeFilter = this.props.history.location.state.valuereturnTime.split(':');
					var timeArrival = image.arrival.split(':');
					var timeFilterFloat = parseFloat(parseInt(timeFilter[0], 10) + '.' + parseInt((timeFilter[1]/6)*10, 10));
					var timeArrivalFloat = parseFloat(parseInt(timeArrival[0], 10) + '.' + parseInt((timeArrival[1]/6)*10, 10));

					if(timeFilterFloat > timeArrivalFloat){

						return(
							<div key={index} className="col-ms-6 container-table-fly">
								{this.buildingTable(image.airline, image.origin, image.destiny, image.arrival, image.departure, "Económico", timeFly + " minutos", numberScale, image.codFly)}
							</div>
						)
					}
				}

			}else if(this.props.history.location.state.valueFilter === "f4"){

				this.titleFlights = "Escoge el vuelo de tu Aereolínea favorita";

				if(this.props.history.location.state.valueReturnId !== undefined){
					this.props.history.location.state.valueReturnId.map((valueA,index)=>{
						console.log(image.airline === valueA[1]);
						if(image.airline === valueA[1]){
							return(
								<div key={index} className="col-ms-6 container-table-fly">
									{this.buildingTable(image.airline, image.origin, image.destiny, image.arrival, image.departure, "Económico", timeFly + " minutos", numberScale, image.codFly)}
								</div>
							)
						}
					})
				}
			}
			else{
				this.titleFlights = "Reservar y comprar tus vuelos al mejor precio";
				return(
					<div key={index} className="col-ms-6 container-table-fly">
						{this.buildingTable(image.airline, image.origin, image.destiny, image.arrival, image.departure, "Económico", timeFly + " minutos", numberScale, image.codFly)}
					</div>
				)
			}
			return(<div key={index}></div>);
		})

		}

		return(
			<div className="container-fluid">
				<div className="container-pass">
					<h3 className="title-purchase">{this.titleFlights}</h3>
					<div className="col-ms-10">
						{this.fly}
					</div>
				</div>
			</div>
		);
	}


	buildingTable(airline, origin, destiny, arrival, departure, priceFly, totalDiference, stop, codFly){

		return(
			<table className="table-fly">
				<tbody>
					<tr id="title-table">
						<td>Aereolínea</td>
						<td>Ciudad Origen</td>
						<td>Ciudad Destino</td>
						<td>Hora Salida</td>
						<td>Hora Llegada</td>
						<td>Precio</td>
						<td>Tiempo</td>
						<td>Escalas</td>
						<td>Conseguir este vuelo</td>
					</tr>
					<tr>
						<td>{airline}</td>
						<td>{origin}</td>
						<td>{destiny}</td>
						<td>{departure}</td>
						<td>{arrival}</td>
						<td>{priceFly}</td>
						<td>{totalDiference}</td>
						<td>{stop}</td>
						<td id="cell-prize">
							<button id="id-from-db" className="button-purchase" value={codFly} onClick={this.goConfirmPurchase.bind(this)}>Seleccionar</button>
						</td>
					</tr>
				</tbody>
			</table>
		)
	}

	goConfirmPurchase(e){

		console.log(e.target.value);

		this.props.history.push({
			pathname: '/ConfirmPurchase',
			state: {
				valueFly: e.target.value,
			}
		})
	}

	getFavoriteAirline(){
		console.log("NOS JUIMOS");
	}


}

export default Fligths;