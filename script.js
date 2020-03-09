const sunday = 0;
const friday = 5;
const evening = 17;

setInterval(function(){
	const now = moment(new Date());
	const day = now.day();
	const hour = now.hour();

	let endTime;

	if (day > friday || (day === friday && hour >= evening)) {
		// it's weekend
		endTime = moment().day(12).set('hour', evening).set('minute', 0).set('second', 0).set('millisecond', 0);
	} else {
		// friday is
		endTime = moment().day(5).set('hour', evening).set('minute', 0).set('second', 0).set('millisecond', 0);
	}

	const remainingTime = calculateRemaining(now, endTime);

	setTimeView(day, hour, remainingTime);
}, 1000);

function calculateRemaining(now, endTime) {
	return moment.duration(endTime.diff(now));
}

function setTimeView(currentDay, currentHour, remainingTime) {
	const isWeekend = (currentDay === sunday || currentDay > friday || (currentDay === friday && currentHour >= evening));

	if (isWeekend) {
		renderViewUpdate(isWeekend)
	} else {
		renderTimeUpdate(remainingTime);
		renderViewUpdate(isWeekend)
	}
}

function renderViewUpdate(weekend = false) {
	if (weekend) {
		document.querySelectorAll('.weekend')[0].style.display = 'flex';
		document.querySelectorAll('.week')[0].style.display = 'none';
	} else {
		document.querySelectorAll('.weekend')[0].style.display = 'none';
		document.querySelectorAll('.week')[0].style.display = 'flex';
	}
}

function renderTimeUpdate(remainingTime) {
	const second = parseInt(remainingTime.asSeconds()) % 60;
	const minute = parseInt(remainingTime.asMinutes()) % 60;
	const hour = parseInt(remainingTime.asHours()) % 24;
	const day = parseInt(remainingTime.asDays()) % 7;

	document.querySelectorAll('.seconds .remaining')[0].innerHTML = second;
	document.querySelectorAll('.minutes .remaining')[0].innerHTML = minute;
	document.querySelectorAll('.hours .remaining')[0].innerHTML = hour;
	document.querySelectorAll('.days .remaining')[0].innerHTML = day;
}