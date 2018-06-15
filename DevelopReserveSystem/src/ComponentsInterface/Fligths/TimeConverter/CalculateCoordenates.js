class CalculateCoordenates{


	vectorDistance(originX, originY, destinyX, destinyY){
		// Aplicacion de la formula haversine 

		console.log(originX + "-" + originY + "-" + destinyX + "-" + destinyY);

		var radiusEarth = 6371;
		var m = 0.001;

		var originVector = [originX,originY];
		var destinyVector = [destinyX, destinyY];

		var dLat = (destinyVector[0]-originVector[0]) * (Math.PI/180);
	  	var dLon = (destinyVector[1]-originVector[1]) * (Math.PI/180);

	  	var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(originVector[0] * (Math.PI/180)) * Math.cos(originVector[1] * (Math.PI/180)) * Math.sin(dLon/2) * Math.sin(dLon/2);
	  	var c = 2 * Math.atan2(Math.sqrt(Math.abs(a)), Math.sqrt(Math.abs(1-a)));

	  	var d = radiusEarth * c;
	  	var km = d.toFixed(2);

	  	var converterKm = km / m;

	  	return converterKm;
	}
}

module.exports = CalculateCoordenates;