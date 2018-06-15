function totalStop(totalFligths){

	this.time = totalFligths.map((image,index)=>{
		if(image[8] > 0){
			var fligthCalculate = {
				airline: image[7],
				port: image[0],
				origin: image[1],
				destiny: image[2],
				departure: mediumHourD,
				arrival: mediumHourA,
				totalDiference: totalDiference
			}
		}
	})
}

module.exports = {
  totalStop: totalStop,
};