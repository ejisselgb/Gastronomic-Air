
var connectionDB = require("../connectionDB");


module.exports = {
  doReservation: doReservation,
};


function doReservation(request, response) {

  var opc = parseInt(request.query.opc);

  switch(opc){
    case 1:

      var numberfligth = request.query.numberfligth;
      var sql = 'SELECT VUELOUSUARIO, ' +
        'NOMBRE, ' +
        'NUMRESERVA, ' +
        'NUMSILLA,  ' +     
        'DESCRIPCIONCOMI, ' +
        'DESCRIPCION, ' +
        'DESCESTADO, ' +
        'DESCESTADOVUELO ' +
        'FROM USUARIO ' +
        'INNER JOIN RESERVAS ' +
        'ON (USUARIO.CODUSUARIO = RESERVAS.CODUSUARIO) ' +
        'INNER JOIN COMIDAS ' +
        'ON (CODCOMIDA = CODCOMIDAR) ' +
        'INNER JOIN TIPOCOMIDA ' +
        'ON (CODTIPCOMIDA = TIPOCOMIDA_CODTIPCOMIDA) ' +
        'INNER JOIN ESTADORESERVA ' +
        'ON (CODESTADO = CODESTRESERVA) ' +
        'CROSS JOIN ESTADOVUELO ' +
        'INNER JOIN VUELO ' +
        'ON (CODESTVUELO = ESTADO_VUELO) ' +
        'WHERE VUELOUSUARIO = CODVUELO ' +
        'AND VUELOUSUARIO=:numberfligth';      

      connectionDB.open(sql,[numberfligth],false,response);

      break;

    case 2:

      var numberres = request.query.numberres;

      var sqlres = 'UPDATE RESERVAS ' +
            'SET CODESTRESERVA ='+ '\'002\' ' +
            'WHERE CODESTRESERVA =' + '\'001\' ' +
            'AND NUMRESERVA = :numberres';

      connectionDB.open(sqlres,[numberres],true,response);

      break;

    case 3:

      var codefligth = request.query.codefligth;

      var sqlClose = 'UPDATE VUELO ' +
        'SET ESTADO_VUELO = 2 ' +
        'WHERE CODVUELO = :codefligth';    

      connectionDB.open(sqlClose,[codefligth],true,response);   

      break;

    case 4:

      var loadFood = request.query.loadFood;

      var sqlFood = 'SELECT  NUMRESERVA, ' +      
        'DESCRIPCIONCOMI, ' +  
        'DESCRIPCION, ' +
        'CARGACOMIDA ' +
        'FROM USUARIO ' +   
        'INNER JOIN RESERVAS ' + 
        'ON (USUARIO.CODUSUARIO = RESERVAS.CODUSUARIO) ' + 
        'INNER JOIN COMIDAS ' + 
        'ON (CODCOMIDA = CODCOMIDAR) ' + 
        'INNER JOIN TIPOCOMIDA ' +
        'ON (CODTIPCOMIDA = TIPOCOMIDA_CODTIPCOMIDA) ' +  
        'INNER JOIN ESTADORESERVA ' +  
        'ON (CODESTADO = CODESTRESERVA) ' +  
        'CROSS JOIN ESTADOVUELO ' +
        'INNER JOIN VUELO ' + 
        'ON (CODESTVUELO = ESTADO_VUELO) ' +
        'WHERE VUELOUSUARIO = CODVUELO ' +  
        'AND VUELOUSUARIO=:loadFood';

      connectionDB.open(sqlFood,[loadFood],false,response);

      break;

    case 5:

      var numreserve = request.query.numreserve;
      var sqlUpdate = 'UPDATE RESERVAS ' +
        'SET CARGACOMIDA= ' + '\'S\' ' +
        'WHERE NUMRESERVA=:numreserve';

      connectionDB.open(sqlUpdate,[numreserve],true,response);

      break;

    case 6:

      var inquiry = request.query.inquiry;

      var sql = 'SELECT NOMBRE, ' +
        'CORREO, ' +
        'DESCESTADO, ' +
        'CARGACOMIDA, ' +
        'VUELOUSUARIO, FEC_PARTIDA ' +
        'FROM USUARIO ' +
        'INNER JOIN RESERVAS ' +
        'ON (USUARIO.CODUSUARIO = RESERVAS.CODUSUARIO) ' +
        'INNER JOIN VUELOUSUARIO ' +
        'ON (USUARIO.CODUSUARIO = VUELOUSUARIO.CODUSUARIO) ' +
        'INNER JOIN VUELO ' +
        'ON (CODVUELO = VUELO_CODVUELO) ' +
        'INNER JOIN ESTADORESERVA   ' +
        'ON (CODESTADO = CODESTRESERVA) ' +
        'WHERE TIPOUSUARIO = 3 ' +
        'AND  ESTADO_VUELO =2 ' +
        'AND  CARGACOMIDA = ' + '\'S\' ' +
        'AND  CODESTRESERVA = ' + '\'002\' ' +
        'AND  VUELOUSUARIO=:numVuelo ';

      connectionDB.open(sql,[inquiry],false,response);

      break;

    default:

    break;
  }

}
