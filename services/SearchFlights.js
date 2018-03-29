var connectionDB = require("../connectionDB");

module.exports = {
  getFligths: getFligths,
};


function getFligths(request, response) {

	var opc = parseInt(request.query.opc);

	switch(opc){
		case 1:
			var sql = 'SELECT NOMAEROLINEA, ' + 
		       	'TO_CHAR (FEC_PARTIDA, ' + '\'dd/mm/yyyy\'), ' +
		       	'TO_CHAR (FEC_REGRESO, ' + '\'dd/mm/yyyy\'), ' +       
		       	'PRECIO, ' +
		       	'CODVUELO ' +
		  		'FROM AEROLINEA INNER JOIN VUELO ON (NITAERO = AEROLINEA_NITAERO) ' +
		 		'WHERE CIUD_ORIGEN = :origin AND CIUD_DESTINO = :destiny';

		    var origin = request.query.origin;
			var destiny = request.query.destiny;
			connectionDB.open(sql,[origin, destiny],false,response);
			break;

		case 2:

			var identification = request.query.identification;

 			var sqlGetUser = 'SELECT ROWNUM ' +
 							'FROM USUARIO ' +
 							'WHERE CODUSUARIO = :identification'	

   			connectionDB.open(sqlGetUser,[identification],false,response);

   			break;

   		case 3:

   			var identification = request.query.identification;
 			var type = request.query.type;
   			var name = request.query.name;
   			var email = request.query.email;

   			var slqUsers = 'INSERT INTO USUARIO (CODUSUARIO,TIPOUSUARIO,NOMBRE,CORREO) ' +
 							'VALUES (:identification,:type,:name,:email) ';

 			connectionDB.open(slqUsers,[identification, type, name, email],true,response);

 			break;

 		case 4: 

 			var identification = request.query.identification;
   			var fligthCode = request.query.fligthCode;
   			var status = request.query.status;

 			var slqReser = 'INSERT INTO RESERVAS (CODUSUARIO,VUELOUSUARIO,CODESTRESERVA) ' +
 						'VALUES (:identification,:fligthCode,:status) ';

 			connectionDB.open(slqReser,[identification, fligthCode, status],true,response);

  			break;

		default:
			response.contentType('application/json').status(200);
			response.send(JSON.stringify("opcion no valida"));
	}

	response.end;
}


