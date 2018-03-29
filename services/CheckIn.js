var connectionDB = require("../connectionDB");


module.exports = {
  doCheckIn: doCheckIn,
};


function doCheckIn(request, response) {

	var opc = parseInt(request.query.opc);

	switch(opc){
		case 1:

			var identification = request.query.identification;
			var numbereservation = request.query.numbereservation

			var sql = 'SELECT NOMBRE, ROWNUM ' +
				'FROM RESERVAS R, USUARIO U ' + 
				'WHERE R.CODUSUARIO = U.CODUSUARIO ' + 
				'AND R.CODUSUARIO = :identification ' +
				'AND R.VUELOUSUARIO = :numbereservation ' +
				'AND ROWNUM >= 1';

			connectionDB.open(sql,[identification, numbereservation],false,response);

			break;

		case 2:

			var sqlFood = 'SELECT CODTIPCOMIDA, DESCRIPCIONCOMI FROM TIPOCOMIDA';

			connectionDB.open(sqlFood,[],false,response);

			break;

		case 3:

			var typefood = request.query.typefood;

			var sqlmenu = 'SELECT CODTIPCOMIDA, DESCRIPCIONCOMI, DESCRIPCION ' + 
					'FROM TIPOCOMIDA ' +
			        'INNER JOIN ' +
			        'COMIDAS ' +
			       	'ON (CODTIPCOMIDA = TIPOCOMIDA_CODTIPCOMIDA) ' +
			 		'WHERE CODTIPCOMIDA = :typefood';

			 connectionDB.open(sqlmenu,[typefood],false,response);

			break;

		case 4:

			var typefood = request.query.typefood;
			var identification = request.query.identification;
			var flight = request.query.flight;
			var code = request.query.code;
			var chair = request.query.chair;

			var sqlUpdate = 'UPDATE RESERVAS ' +
							'SET CODCOMIDAR= :typefood, ' +
							'NUMSILLA= :chair, ' +
							'CODESTRESERVA= :code ' +
							'WHERE CODUSUARIO= :identification ' +
							'AND  VUELOUSUARIO= :flight';

			connectionDB.open(sqlUpdate,[typefood, chair, code, identification, flight],true,response);

		default:
	}

}


