//takes a name and returns the html for a checkbox
function CreateCheckbox(name)
{
	string=""; 
	string+="<label>"+
		"<input type='checkbox'> "+name+
	"</label>";
	return string;
}
//takes in a dictionary that contains the days of the weeks from 0-6
//which each contains an array of animes for that day
//retruns tables in html
function CreateTableRows(DictAnimesPDay)
{
	TableRows="";
	//find the biggest array in dict
	MaxSize=-1;
	for(key in DictAnimesPDay)
	{
		if(DictAnimesPDay[key].length>MaxSize)
		{
			MaxSize=DictAnimesPDay[key].length;
		}
	}
	//loop that many times
	for (var i = 6; i >= 0; i--) {
		//create table row inside looping through 0-6 and adding the td
		var TableRow="<tr>";
		for(var e=0; e <=6; e++)
		{
			if ( DictAnimesPDay[e].length !=0) 
			{
				temp=DictAnimesPDay[e].pop()
				console.log(temp);
				TableRow+= "<td>"+ temp["name"] +"</td>"
			}
			else
			{
				TableRow+= "<td></td>"
			}
		}
		TableRow+="</tr>";
		TableRows+=TableRow;
	}
	return TableRows;
}
