var connectionDB = require("../connectionDB");

module.exports = {
  generateReport: generateReport,
};

function generateReport(request, response) {
  var opc = parseInt(request.query.opc);

    switch(opc){

      case 1: /*Get Food special for fligth number*/

        var numflight = request.query.numflight;

        var sql = 'SELECT  NUMRESERVA, ' +      
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
            'AND VUELOUSUARIO=:numflight';

          connectionDB.open(sql,[numflight],false,response);
      break;
      case 2: /*Get food no load in the fligth*/

        var numflight = request.query.numflight;
        var startdate = request.query.startdate;
          var enddate = request.query.enddate;

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
            'INNER JOIN ESTADORESERVA ' +
              'ON (CODESTADO = CODESTRESERVA) ' +
            'WHERE TIPOUSUARIO = 3 ' +
            'AND ESTADO_VUELO =2 ' +
            'AND  CARGACOMIDA =' + '\'N\' ' +
            'AND  CODESTRESERVA =' + '\'002\' ' +
            'AND  VUELOUSUARIO=: numflight ' +
            'AND FEC_PARTIDA >= TRUNC (TO_DATE (:startdate,' + '\'DD/MM/YYYY hh12:mi:ss\'' + ')) ' +
              'AND FEC_PARTIDA <= TRUNC (TO_DATE (:enddate,' + '\'DD/MM/YYYY hh12:mi:ss\'' + '))';

            connectionDB.open(sql,[numflight, startdate, enddate],false,response);

      break;

      case 3: /*Get food load in the flight*/

        var numflight = request.query.numflight;
        var startdate = request.query.startdate;
        var enddate = request.query.enddate;

        var sql = 'SELECT NOMBRE, ' +
          'CORREO, ' +
          'DESCESTADO, ' +
          'CARGACOMIDA, ' +
          'VUELOUSUARIO ,FEC_PARTIDA '
          'FROM USUARIO ' +
          'INNER JOIN RESERVAS ' +
          'ON (USUARIO.CODUSUARIO = RESERVAS.CODUSUARIO) ' +
          'INNER JOIN VUELOUSUARIO ' +
          'ON (USUARIO.CODUSUARIO = VUELOUSUARIO.CODUSUARIO) ' +
          'INNER JOIN VUELO ' +
          'ON (CODVUELO = VUELO_CODVUELO) ' +
          'INNER JOIN ESTADORESERVA ' +
          'ON (CODESTADO = CODESTRESERVA) ' 
          'WHERE TIPOUSUARIO = 3 ' +
          'AND ESTADO_VUELO =2 ' +
          'AND  CARGACOMIDA =' + '\'S\' ' +
          'AND  CODESTRESERVA =' + '\'002\' ' +
          'AND  VUELOUSUARIO=: numflight ' +
          'AND FEC_PARTIDA >= TRUNC (TO_DATE (:startdate,' + '\'DD/MM/YYYY hh12:mi:ss\'' + ')) ' +
          'AND FEC_PARTIDA <= TRUNC (TO_DATE (:enddate,' + '\'DD/MM/YYYY hh12:mi:ss\'' + '))';

          connectionDB.open(sql,[numflight, startdate, enddate],false,response);

      break;

      case 4: /*Food low in protein*/

        var numflight = request.query.numflight;

        var sql = 'SELECT distinct VUELOUSUARIO, ' +
          'NOMBRE, ' +
          'CORREO, ' +
          'DESCRIPCIONCOMI, ' +
          'DESCRIPCION, '  +
          'DIRECCION ' +
          'FROM USUARIO ' +
          'INNER JOIN RESERVAS ' +
          'ON (USUARIO.CODUSUARIO = RESERVAS.CODUSUARIO) ' +
          'INNER JOIN COMIDAS ' +
          'ON (CODCOMIDA = CODCOMIDAR) ' +
          'INNER JOIN TIPOCOMIDA ' +
          'ON (CODTIPCOMIDA = TIPOCOMIDA_CODTIPCOMIDA) ' +
          'CROSS JOIN VUELO ' +
          'WHERE CODESTRESERVA =' + '\'002\' ' + 'AND CARGACOMIDA ='+ '\'S\' ' + 'AND ESTADO_VUELO =' + '\'2\' ' +
          'AND CODTIPCOMIDA =' + '\'3\' ' +
          'AND VUELOUSUARIO= CODVUELO ' +
          'AND CODVUELO =:numflight';

        connectionDB.open(sql,[numflight],false,response);

      break;

      case 5:

        var numflight = request.query.numflight;

        var sql = 'SELECT RESERVAS.VUELOUSUARIO CODVUELO, ' +
          'NOMBRE, CORREO, DIRECCION, DESCRIPCIONCOMI, DESCRIPCION, ' +
          'PREGUNTA, CALIFICACION FROM TIPOCOMIDA ' +
          'INNER JOIN COMIDAS ' +
          'ON (CODTIPCOMIDA = TIPOCOMIDA_CODTIPCOMIDA) ' +
          'INNER JOIN RESERVAS ' +
          'ON (CODCOMIDA = CODCOMIDAR) ' +
          'INNER JOIN USUARIO ' +
          'ON (USUARIO.CODUSUARIO = RESERVAS.CODUSUARIO) ' +
          'INNER JOIN ENCUESTA ' +
          'ON (USUARIO.CODUSUARIO = ENCUESUSA) ' +
          'INNER JOIN ENCUEPREGU ' +
          'ON (ENCUESTA.CODENCUESTA = ENCUEPREGU.CODENCUESTA) ' +
          'INNER JOIN PREGUNTAS ' +
          'ON (PREGUNTAS.CODPREGUNTA = ENCUEPREGU.CODPREGUNTA) ' +
          'WHERE RESERVAS.VUELOUSUARIO=:CODVUELO ' +
          'AND ENCUEPREGU.CALIFICACION < 5';

        connectionDB.open(sql,[numflight],false,response);

      break;
      default:
      break;

    } 
}
