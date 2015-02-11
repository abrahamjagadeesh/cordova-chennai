angular.module('news', []).directive('newsWidget', function ($http) {
    var feeds,
        newspaper = $http({
            method: 'GET',
            url: 'http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=10&q=http://news.google.com/news/feeds?q=%27chennai%27&output=rss',
            headers: {
                'Content-type': 'application/json'
            }
        });


    return {
        controller: function ($scope) {
            $scope.paper = "link";
        },
        link: function (scope, elem, attr) {
            newspaper.success(function (data) {
                scope.paper = data;
                feeds = data;
                console.log(feeds);
            });
        }
    }
});

//$('#rssdata').ready(function () {
//    $.ajax({
//        url: 'http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=10&q=http://news.google.com/news/feeds?q=%27chennai%27&output=rss',
//        dataType: 'jsonp',
//        success: function (data) {
//            //console.log(data.feed.entries);
//            $(data.responseData.feed.entries).each(function (index, entry) {
//                var item_html = '<li><a target="_blank" href="' + entry.link + '">' + entry.title + '</a></li>';
//                $('#rssdata ul.rss-items').append(item_html);
//            });
//            $('#rssdata div.loading').fadeOut();
//            $('#rssdata ul.rss-items').slideDown();
//        },
//        error: function () {}
//
//    });
//});

//http: //jsfiddle.net/cYFLe/23/
//http://blog.slashpoundbang.com/post/12975232033/google-news-search-parameters-the-missing-manual
//https://developers.google.com/news-search/v1/jsondevguide?csw=1#basic_query
// http://community.phonegap.com/nitobi/topics/how_to_force_ads_to_open_in_external_browser
//http://www.thehindu.com/navigation/?type=rss