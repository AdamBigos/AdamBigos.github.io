function loadData() {

    var $generateImg = $('#generated_img');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');
    
    $generateImg.text("");
    $wikiElem.text("");
    $nytElem.text("");

    var streetStr = $('#street').val();
    var cityStr = $('#city').val();
    var address = streetStr + ', ' + cityStr;
    
    $greeting.text('Więc podoba ci się ' + address + '?');
    
    var streetviewUrl = 'http://maps.googleapis.com/maps/api/streetview?size=600x400&location=' + address + '';
    
    $generateImg.append('<img src="' + streetviewUrl + '">');

    var nytimesUrl = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + cityStr + '&sort=newest&api-key=ab32caf3cd7c419db3b3df0cdf2d59ad';
    
   $.getJSON(nytimesUrl, function(data){
        
        $nytHeaderElem.text('Artykuły w NYT o lokalizacji: ' + cityStr);
        
        articles = data.response.docs;
        
        for (var i= 0; i < articles.length; i++) {
            var article = articles[i];
            $nytElem.append('<li class="article">' + '<a href="' + article.web_url + '">' + article.headline.main + '</a>' + article.snippet + '</p>' + '</li>');
        };
    }).error(function(e){
       $nytHeaderElem.text('Najwidoczniej NYT nic nie napisał o tej lokacji, a szkoda bo jest tak urocza');
    });
    
    var wikiUrl = 'https://en.wikipedia.org/w/api.php?action=opensearch&search=' + cityStr + '&format=json&callback=wikiCallback';
    
    var wikiRequestTimeout = setTimeout(function(){
        $wikiElem.text("Nie udało się połączyć z Wikipedią, lub nie ma treści dotyczącej okolicy. W drugim wypadku zachęcam do dodania artykułu do Wikipedi");
    }, 10000);

    $.ajax({
        url: wikiUrl,
        dataType: "jsonp",
        jsonp: "callback",
        success: function(response){
            var articleList = response[1];
            
            for (var i=0; i < articleList.length; i++){
                articleStr = articleList[i];
                var url = 'http://en.wikipedia.org/wiki/' + articleStr;
                $wikiElem.append('<li><a href="' + url + '">' + articleStr + '</a></li>');
            };
            
            clearTimeout(wikiRequestTimeout);
        }
    });
    return false;
};

$('#form-container').submit(loadData);
