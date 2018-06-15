var hrD = 0;
var hrA = 0;
var moment = require('moment');
var hours = 0;
var minutes = 0;
var totalDiference = 0;
var arrayTimesFly = [];
var mediumHourA = 0;
var mediumHourD = 0;
var kph = 0;
var arrayKph = [];
const CalculateCoordenates = require('./CalculateCoordenates.js');
let calculateCoor = new CalculateCoordenates();


function getHoursArray(totalFligths){

	if(totalFligths !== undefined){
		this.time = totalFligths.map((image,index)=>{

			getTime(image[3], image[4]);
			var metros = calculateCoor.vectorDistance(image[10], image[11], image[12], image[13]);
			velocity(metros, totalDiference);

			if(hrA === 0){
				mediumHourA = "00:00"
			}else{
				mediumHourA = hrA
			}

			if(hrD === 0){
				mediumHourD = "00:00"
			}
			else{
				mediumHourD = hrD
			}

			var fligthCalculate = {
				airline: image[7],
				port: image[0],
				origin: image[1],
				destiny: image[2],
				departure: mediumHourD,
				arrival: mediumHourA,
				totalDiference: totalDiference,
				stop: image[8],
				codFly: image[9],
				kph: kph,
			}

			arrayTimesFly.push(fligthCalculate);

			return null;
		})
	}
}

function getTime(departure, arrival){

	var sizeDeparture = 0;
	var sizeArrival = 0;

	//console.log(departure + " @@@@ "+ arrival);

	/*Departure Time*/
	if(departure.includes("P")){
		sizeDeparture = departure.indexOf("P");
		var hr = departure.substring(sizeDeparture - sizeDeparture, sizeDeparture - 2);
		var min = departure.substring(sizeDeparture, sizeDeparture - 2);

		if(hr < 12){
			hrD = Number(hr)+12 + ":" + min;
		}
	}

	if(departure.includes("A")){
		sizeDeparture = departure.indexOf("A");
		var hr2 = departure.substring(sizeDeparture - sizeDeparture, sizeDeparture - 2);
		var min2 = departure.substring(sizeDeparture, sizeDeparture - 2);
		if(hr2 === 12){
			hrD = Number(hr2)-12 + ":" + min2;
		}else{
			hrD = Number(hr2) + ":" + min2;
		}
	}

	/*Arrival Time*/
	if(arrival.includes("P")){
		sizeArrival = arrival.indexOf("P");
		var hr3 = arrival.substring(sizeArrival - sizeArrival, sizeArrival - 2);
		var min3 = arrival.substring(sizeArrival, sizeArrival - 2);

		if(hr3 < 12){
			hrA = Number(hr3)+12 + ":" + min3;
		}
	}

	if(arrival.includes("A")){
		sizeArrival = arrival.indexOf("A");
		var hr4 = arrival.substring(sizeArrival - sizeArrival, sizeArrival - 2);
		var min4 = arrival.substring(sizeArrival, sizeArrival - 2);

		if(hr4 === 12){
			hrA = Number(hr4)-12 + ":" + min4;
		}else{
			hrA = Number(hr4) + ":" + min4;
		}
	}

	diferenceTime(hrD, hrA);
}

function diferenceTime(hrD, hrA){

	var startTime=moment(hrD, "HH:mm");
	var endTime=moment(hrA, "HH:mm");
	var duration = moment.duration(endTime.diff(startTime));
	hours = Math.abs(parseInt(duration.asHours()),10);
	minutes = Math.abs(parseInt(duration.asMinutes())%60);
	totalDiference = (hours*60)+minutes; // La comparacion se realizara con los minutos

	return totalDiference;
}

function velocity(metros, distance){

	var hr = distance * 60;
	var m_s = metros / hr;
	var getKph = m_s * 3.6;
	kph = getKph.toFixed(3);

	arrayKph.push(kph);	



	return kph;
	
}

module.exports = {
  getHoursArray: getHoursArray,
  arrayTimesFly: arrayTimesFly,
  getTime: getTime,
  diferenceTime: diferenceTime,
  velocity: velocity,
  arrayKph: arrayKph
};
