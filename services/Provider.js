var connectionDB = require("../connectionDB");


module.exports = {
  reportGenerator: reportGenerator,
};


function doReservation(request, response) {

	var opc = parseInt(request.query.opc);

	switch(opc){
    	case 1:
    		var NumbFligth = request.query.NumbFligth

    		var sql = 'SELECT DESCRIPCIONCOMI,DESCRIPCION, count (CODCOMIDA) Cantidad ' +
    			'FROM COMIDAS ' +
    			'INNER JOIN RESERVAS ' +
    			'ON (CODCOMIDA = CODCOMIDAR) ' +
    			'INNER JOIN TIPOCOMIDA ' +
    			'ON (CODTIPCOMIDA = TIPOCOMIDA_CODTIPCOMIDA) ' +
    			'WHERE TIPOCOMIDA_CODTIPCOMIDA <> 7 ' +
    			'AND VUELOUSUARIO = :NumbFligth ' +
    			'group by DESCRIPCIONCOMI,DESCRIPCION';

    		connectionDB.open(sql,[NumbFligth],false,response);

    	default:
	}
}