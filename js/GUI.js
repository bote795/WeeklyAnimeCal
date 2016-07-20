var cal;
//takes a name and returns the html for a checkbox
function CreateCheckbox(name)
{
	string=""; 
	string+="<label>"+
		"<input type='checkbox' value='"+ConvertText(name)+"'> "+name+
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
	for (var i = MaxSize; i >= 0; i--) {
		//create table row inside looping through 0-6 and adding the td
		var TableRow="<tr>";
		for(var e=0; e <=6; e++)
		{
			if ( DictAnimesPDay[e].length !=0) 
			{
				temp=DictAnimesPDay[e].pop()
				id_temp =ConvertText(temp["name"]);
				TableRow+= "<td id='"+ id_temp + "'> <div class='image'>"+
				 	"<img height='150' width='150' src='"+temp["pic_src"]+"' align=''> "+
				 		"<p><b>"+temp["name"] +"</b></p>" +
				 	"</div></td>";
			}
			else
			{
				TableRow+= "<td style='visibility:hidden'></td>"
			}
		}
		TableRow+="</tr>";
		TableRows+=TableRow;
	}
	return TableRows;
}
function ConvertText(temp)
{
	/*index=temp.indexOf("(");
	temp=temp.substring(0,index)
	id_temp=temp.replace(/ /g,"_");*/
	id_temp=temp.replace(/\s+/g, '-').replace(/[^a-zA-Z-]/g, '').toLowerCase();
	return id_temp;
}