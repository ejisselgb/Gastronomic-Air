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
		 		'WHERE CIUD_ORIGEN = :origin AND CIUD_DESTINO = :destiny ' +
		 		'AND  ESTADO_VUELO= 1';

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
   			var address = request.query.address;

   			var slqUsers = 'INSERT INTO USUARIO (CODUSUARIO,TIPOUSUARIO,NOMBRE,CORREO, DIRECCION) ' +
 							'VALUES (:identification,:type,:name,:email,:address) ';

 			connectionDB.open(slqUsers,[identification, type, name, email, address],true,response);

 			break;

 		case 4: 

 			var identification = request.query.identification;
   			var fligthCode = request.query.fligthCode;
   			var status = request.query.status;

 			var slqReser = 'INSERT INTO RESERVAS (CODUSUARIO,CODESTRESERVA,CODVUELOS) ' +
 						'VALUES (:identification,:status,:fligthCode) ';

 			connectionDB.open(slqReser,[identification, status, fligthCode],true,response);

  			break;

  		case 5: 

			var sqlFligth = 'SELECT NAME_CITY_AIRP FROM AEROPUERTO';

			connectionDB.open(sqlFligth,[],false,response);

			break;

		case 6:

			var origin = request.query.origin;
			var destiny = request.query.destiny;

			var sqlFligth = 'SELECT a.AIRPORT_ABBR, ' + 
       		'a.NAME_CITY_AIRP ORIGEN, ' +
       		'(SELECT  a2.NAME_CITY_AIRP ' +
  			'FROM AEROPUERTO a2 ' +
       		'INNER JOIN ' +
          	'VUELOS v2 '+ 
       		'ON a2.AIRPORT_ABBR = v2.DESTINATION_AIRPORT ' + 
          'AND v2.ORIGIN_AIRPORT =:origin ' +
          'AND v2.DESTINATION_AIRPORT =:destiny ' +       
            'AND rownum =1 ' +
          	') destino, ' +
       		'v.DEPARTURE_TIME, '+
       		'v.ARRIVAL_TIME, ' +
       		'v.ORIGIN_AIRPORT, ' +
       		'v.DESTINATION_AIRPORT, ' +
       		'v.AIRLINE,	' +
       		'v.STOPS_FLIGHT, ' +
       		'v.CODVUELOS, ' +
       		'a.COORD_X CX_ORIGEN, ' +
       		'a.COORD_Y CY_ORIGEN, ' +
       		'(SELECT  a2.COORD_X ' +
          	'FROM AEROPUERTO a2 ' +
       		'INNER JOIN ' +
          	'VUELOS v2 ' +
       		'ON a2.AIRPORT_ABBR = v2.DESTINATION_AIRPORT ' +          
            'AND rownum =1 ) CX_DESTINO, ' +
       		'(SELECT  a2.COORD_Y ' +
          	'FROM AEROPUERTO a2 ' +
       		'INNER JOIN ' +
          	'VUELOS v2 ' +
       		'ON a2.AIRPORT_ABBR = v2.DESTINATION_AIRPORT ' +         
            'AND rownum =1 ) CY_DESTINO ' +  
       		'FROM AEROPUERTO a ,VUELOS v ' + 
       		'WHERE v.ORIGIN_AIRPORT = a.AIRPORT_ABBR ' +
       		'AND v.ORIGIN_AIRPORT =:origin ' +
       		'AND v.DESTINATION_AIRPORT =:destiny ';

			connectionDB.open(sqlFligth,[origin, destiny],false,response);

			break;

		case 7:

			var city = request.query.city;

			var sqlFligth = 'SELECT AIRPORT_ABBR FROM AEROPUERTO WHERE NAME_CITY_AIRP = :city';

			connectionDB.open(sqlFligth,[city],false,response);

			break;

		case 8: 

			var cedula = request.query.cedula;

			var sqlFligth = 'SELECT DISTINCT VUELOUSUARIO.CODVUELOS, '+ 
       			'AIRLINE, ' +
       			'NAME_CITY_AIRP CIU_ORIGEN, ' +
       			'(SELECT  a2.NAME_CITY_AIRP ' +
  				'FROM AEROPUERTO a2 ' +
       			'INNER JOIN ' +
          		'VUELOS v2 ' + 
       			'ON a2.AIRPORT_ABBR = v2.DESTINATION_AIRPORT ' +      
            	'AND rownum =1 '+
          		') destino, '    +    
       			'DEPARTURE_TIME, '+
       			'ARRIVAL_TIME, '+
       			'STOPS_FLIGHT, '+
       			'FLIGHT '+
  				'FROM VUELOS '+
       			'INNER JOIN RESERVAS '+
          		'ON (VUELOS.CODVUELOS = RESERVAS.CODVUELOS) '+
       			'INNER JOIN AEROPUERTO '+
          		'ON  (AIRPORT_ABBR = ORIGIN_AIRPORT) '+
       			'INNER JOIN USUARIO '+
          		'ON (USUARIO.CODUSUARIO = RESERVAS.CODUSUARIO) '+
       			'INNER JOIN VUELOUSUARIO '+
          		'ON (USUARIO.CODUSUARIO = VUELOUSUARIO.CODUSUARIO) '+
       			'WHERE USUARIO.CODUSUARIO=:cedula AND CODVUELOS IS NOT NULL';

       		connectionDB.open(sqlFligth,[cedula],false,response);

       		break;

		default:
			response.contentType('application/json').status(200);
			response.send(JSON.stringify("opcion no valida"));
	}

	response.end;
}


