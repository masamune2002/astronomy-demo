var mongoose = require('mongoose');
var db = mongoose.connection;
var conString = "mongodb://localhost/astro";
db.on('error', console.error);
var starSchema = new mongoose.Schema({
	StarID: { type: String },
	HIP: { type: String },
	HD: { type: String },
	HR: { type: String },
	Gliese: { type: String },
	BayerFlamsteed: { type: String },
	ProperName: { type: String },
	RA: { type: Number },
	Dec: { type: Number },
	Distance: { type: Number },
	PMRA: { type: Number },
	PMDec: { type: Number },
	RV: { type: Number },
	Mag: { type: Number },
	AbsMag: { type: Number },
	Spectrum: { type: Number },
	ColorIndex: { type: Number }
});
var Stars = mongoose.model('stars', starSchema);
mongoose.connect(conString);

exports.getStars = function(req, res) {
	var filter = {};
	filter[req.query.filter] = 1;
	Stars.find().limit(req.query.limit).skip(req.query.offset).sort( filter ).exec(function(err, star) {
		if (err) return console.error(err);
		res.send(star);
	});
};

exports.searchStars = function(req, res) {
	var filter = {};
	filter[req.query.filter] = 1;
	var query = req.query.query;
	Stars.find().or([{ 'ProperName':  new RegExp(query, "i") }, 
					 { 'BayerFlamsteed':  new RegExp(query, "i") },
					 { 'HD':  new RegExp(query) },
					 { 'HR':  new RegExp(query) },
					 { 'HIP':  new RegExp(query) },
					 { 'Gliese':  new RegExp(query, "i") }]).limit(req.query.limit).skip(req.query.offset).sort( filter ).exec(function(err, star) {
		if (err) return console.error(err);
		res.send(star);
	});
};