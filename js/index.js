var baseURL = "https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=";
var urlEndPoint = "&format=json&callback=?";
var redirectURL = "http://en.wikipedia.org/?curid=";
$("input").on("keydown", function(e){
  if(e.keyCode == 13) {
    var value = $(this).val();
    var encodedURL = baseURL + encodeURIComponent(value.trim()) + urlEndPoint;
    $("input").css("width","91%");
    $.getJSON(encodedURL, function(json) {
      $(".text-center").animate({ 'margin-top' : '10px' }, "fast", "swing");
      for ( var index = 0; index < 10; index++ ){
        var div = document.createElement('div');
        var toRedirectURL = redirectURL + JSON.stringify(json.query.search[index].pageid);
        var title = JSON.stringify(json.query.search[index].title).slice(1,JSON.stringify(json.query.search[index].title).length - 1) ;
        div.className = "well";      
        div.innerHTML = "<h1>" + title + "</h1>" + "<h3><a href='" + toRedirectURL + "' target='_blank'>" + JSON.stringify(json.query.search[index].snippet) + "</a></h3>";
        document.getElementById("displayResults").appendChild(div);  
      }   
    });
  }
});