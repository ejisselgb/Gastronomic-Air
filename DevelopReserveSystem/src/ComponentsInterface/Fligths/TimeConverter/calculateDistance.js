var arrayMinutes = [];
var min = 0;
var max = 0;
var arrayFligths = [];

function calculateDistance(fly){
	if(fly !== undefined){

		fly.map((image,index)=>{

			arrayMinutes.push(image.totalDiference);

			return null;
		})

		min = Math.min.apply(null, arrayMinutes);
		max = Math.max.apply(null, arrayMinutes);
		
		if(!arrayFligths.includes(min) && !arrayFligths.includes(max)){
			arrayFligths.push(min, max);
		}
		
		return arrayFligths;
	}
}

module.exports = {
  calculateDistance: calculateDistance,
};