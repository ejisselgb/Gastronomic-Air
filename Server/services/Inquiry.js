var connectionDB = require("../connectionDB");

module.exports = {
  generateInquiry: generateInquiry,
};


function generateInquiry(request, response) {
	var opc = parseInt(request.query.opc);

	switch(opc){
	    case 1:
	    	var sql  = 'SELECT codpregunta, pregunta ' +
				'FROM preguntas ' +
				'where CODPREGUNTA in (' + '\'1\' , '+  '\'2\' ,' + '\'3\' ,' + '\'4\'' +')';

			connectionDB.open(sql,[],false,response);
	    break;
	    case 2:

	    	var usernumber = request.query.usernumber;
	    	var codequestion = request.query.codequestion;
	    	var valuequestion = request.query.valuequestion;

	    	var sql = 'update (select calificacion ' +
  				'FROM ENCUESTA ' +
       			'INNER JOIN ENCUEPREGU ' +
          		'ON (ENCUESTA.CODENCUESTA = ENCUEPREGU.CODENCUESTA) ' +
       			'INNER JOIN USUARIO ' +
          		'ON (CODUSUARIO = ENCUESUSA) ' +
       			'INNER JOIN PREGUNTAS ' +
          		'ON (PREGUNTAS.CODPREGUNTA = ENCUEPREGU.CODPREGUNTA) ' +
    			'where CODUSUARIO= :usernumber ' +
    			'and PREGUNTAS.CODPREGUNTA = :codequestion) set calificacion = :valuequestion';
			
			connectionDB.open(sql,[usernumber,codequestion,valuequestion],true,response);

	    break;
	    default:
	    break;
	}
}


 