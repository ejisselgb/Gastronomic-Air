var objoracle = require('oracledb');

cns = {
	user: "GASTRO",
	password: "gastro",
	connectString: "127.0.0.1/XE"
};



function error (err, rs, cn){
	if(err){
		console.log(err.message);
		rs.contentType('application/json').status(500);
		rs.send(err.message);
		if(cn != null) {
			close(cn);
			return -1;
		}
	}
	else 
		return 0;
} 


function open (sql, binds, dml, rs){
	console.log(sql);
	objoracle.getConnection(cns,function(err,cn){
		if(error(err,rs,null) == -1) return;
		cn.execute(sql, binds, {autoCommit: dml}, function(err, result){
			if(error(err,rs,cn) == -1) return;
			rs.contentType('aplication/json').status(200);
			if(dml)
				rs.send(JSON.stringify(result.rowsAffected));
			else{
				rs.send(JSON.stringify(result.rows));
			}

			close(cn);
		});
	})
}

function close(cn){
	cn.release(
		function(err){
			if(err){ console.error(err.message);}
		}
	);
}

exports.open = open;
exports.close = close;