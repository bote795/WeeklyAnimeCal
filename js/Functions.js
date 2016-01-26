function DayOfWeek(y, m, d)
{
	//0 sun -6 sat
	// 1700-1-1 = 5 (Friday)
	mo =  [ 0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334 ]; // monthly offset
	var af = m > 2 ? 0 : 1; // after february
	// every fourth year is a leap year, unless it is divisible by 100 unless it is divisible by 400
	var w = 5 + (y-1700)*365 + (y-1700-af)/4 - (y-1700-af)/100 + (y-1600-af)/400 + mo[m-1] + (d-1);
	return Math.floor(w % 7);

}
//formatTimestring('08/09/2010:12:00') //20100908T120000Z
function formatTimestring(s) {
  var b = s.split(/[\/:]/);
  return b[2] + b[1] + b[0] + 'T' + b[3] + b[4] + '00' + 'Z'
}
/*
	create a calender
	@param days
		an object of keys 0-6
		each key with an array of animes inside
		6: <arrayOfAnime>
		<arrayOfAnime> = each slot has an object following fields: (example)
		date: "2016-01-09"
		day: 6
		name: "Fairy Tail Zero "
		pic_src: "http://www.animenewsnetwork.com/thumbnails/fit200x200/encyc/A17834-3754845054.1451501672.jpg"
		src: "http://www.animenewsnetwork.com/encyclopedia/anime.php?id=17834"
	return a calender
*/
function createCalender(days)
{
	cal = ics();
	//cal.addEvent(subject, description, location, begin, end);
	for (var i = 0; i < Object.keys(days).length; i++) {
		for (var j = 0; j < days[i].length; j++) {
			var anime = days[i][j];
			//need to add an extra 0 for new Date js class to pick up date correctly
			/*
				new Date("2016-01-09")
				Fri Jan 08 2016 18:00:00 GMT-0600 (Central Standard Time)
				new Date("2016-01-009")
				Sat Jan 09 2016 00:00:00 GMT-0600 (Central Standard Time)				
			*/
			var temp  = anime["date"];
			var newDate = temp.substring(0,8)+"0"+temp.substring(8,10);

			var date = new Date(newDate);

			for (var z = 0; z < 12; z++) {
				var month = date.getMonth() + 1; //months from 1-12
				var day = date.getDate();
				var year = date.getFullYear();

				var newdate =  month + "/" + day+"/"+ year;
				cal.addEvent(anime["name"],anime["name"]+" will comeout sometime today","Japan",newdate,newdate);
				//add 7 days for next week
				date.setDate(date.getDate()+7);
			};
			
		};
	};
}