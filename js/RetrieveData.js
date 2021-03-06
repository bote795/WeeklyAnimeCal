//use phantomjs to retrieve data from animenewsnetwork
//use yql to parse that data and return only the first table
//select * from html where url="http://www.animenewsnetwork.com/encyclopedia/anime/upcoming/tv" and xpath='//table[@class="datalist"]'
function RetrieveData(callback)
{
  apikey="0e9bb2bd65868488844a1d5c2e34c7362d5790de";
  url="http://www.animenewsnetwork.com/encyclopedia/anime/upcoming/tv";
	query ='select * from html where url="'+ url+'" and xpath="//table[@class=\'upcoming-anime\']"';
	var yqlAPI = 'https://query.yahooapis.com/v1/public/yql?q=' + encodeURIComponent(query) + ' &format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=?';
  
	$.getJSON(yqlAPI, function(){
	  })
	.success(function(r){
	  console.log("sucess"); //.results.table[0]
	  tablerows= r.query.results.table[0].tbody.tr;
     dict=ParseNewAnimeTable(tablerows); 
      callback(dict);
	})  
	.fail(function(r){
	  console.log("fail");
	  console.log(r);
	});

}

//retrieve the information needed from the html in json
//takes in html in json
//retruns a dictionary of animes with anime name as key and a dictionary of pic_src, name,src url,dateReleased
function ParseNewAnimeTable(tablerows)
{
   dict={};
      $.each(tablerows, function(){
        temp = {};
        if(IsUndefined(this.td[0].img))
          temp["pic_src"]= "http://www.animenewsnetwork.com"+this.td[0].img.src;
        temp["name"] = this.td[1].a.content.replace(/\(([^\)]*)\)/,""); //remove infomration inside "("* *")"
        temp["src"] = "http://www.animenewsnetwork.com"+this.td[1].a.href;
        temp["date"] = this.td[2].p || this.td[2];
        dict[ConvertText(this.td[1].a.content.replace(/\(([^\)]*)\)/,""))]=temp;
      });
  return dict;
}
function IsUndefined(item)
{
  if (item === undefined)
      return false;
  else
      return true;
}
