var express = require('express'), 
      mailer=require('express-mailer');
var app = express();
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var cors = require('cors');
var path = require('path');

var connectionDB = require("./connectionDB");
var sendEmail = require("./services/SendEmail");
var SearchFli = require("./services/SearchFlights");
var checkin = require("./services/CheckIn");
var reservation = require("./services/ConfirmReservation");
var reports = require("./services/GenerateReports");
var inquiry = require("./services/inquiry");


	
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());

var router = express.Router();

app.use(router);

app.listen(3000, function() {
	console.log("Servidor web - localhost:3000");
});

router.get('/', function(request, response){
	response.send("Servicios de Gastronomic Air");
});

router.get('/send/:email/:path/:subject', sendEmail.getSendEmail);
router.get('/search', SearchFli.getFligths);
router.get('/check', checkin.doCheckIn);
router.get('/reservation', reservation.doReservation);
router.get('/reports', reports.generateReport);
router.get('/inquiry', inquiry.generateInquiry);








