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