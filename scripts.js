$( document ).ready(function() {


    $(".btn").click(function(){
        var searchvalue = $("#searchplace").val();
        var apiURL = 'https://itunes.apple.com/search?term=';
        $.ajax({
            url : apiURL + searchvalue + '&entity=song',
            dataType : 'jsonp',
            success: function(data){
               $(data.results).each(function(index,value){
                   console.log(value.artistName);
               })
            }
        });
    });
});
