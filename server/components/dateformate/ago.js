var moment = require('moment');

function getDateDiff(date) {
	var now = new Date();
	var formate = "yyyy-MM-dd HH:mm:ss";
	if (now.getDate() == date.getDate()) {

		formate = "HH:mm"
	}else if(now.getFullYear() == date.getFullYear()) {
		formate = "mm-dd HH:mm:ss";
	}
	return moment(date,formate);
}

module.exports = getDateDiff; 