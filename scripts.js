$( document ).ready(function() {
var alldata;
var page =0;

    $("#searchsongs").click(function(){
        var searchvalue = $("#searchplace").val();
        var apiURL = 'https://itunes.apple.com/search?term=';
        $.ajax({
            url : apiURL + searchvalue + '&entity=song',
            dataType : 'jsonp',
            success: function(data){
                alldata = data;
                reload();
                resultcount();
            }
        });
    });

    $('#next').click(function(){
        $("#newcard").children().remove();
        page=page+1;
        reload();
    })

    $('#prev').click(function(){
        $("#newcard").children().remove();
        page=page-1;
        reload();
        
    })

    function reload(){
        $("#newcard").children().remove();
        var res = alldata['results'];
        for (var i=page*9; i<res.length && i<9*page+9; i++){
        var cards = `<div class=" col-lg-4 col-md-4 col-sm-6 col-xs-12">
                    <div class="card">
                    <div class="logo_song">
                        <img src="`+res[i]['artworkUrl100']+`">
                    </div>
                    <div class="title">
                    <div class="song">
                        <p>`+ res[i]['trackName']+`</p>
                    </div>
                    <div class="line">
                    </div>
                    <div class="author">
                        <p>`+ res[i]['artistName'] +`</p>
                    </div>
                    </div>
                    </div>
                    </div>`;
        var html = $.parseHTML(cards);
        $('#newcard').append(html);
        if(page===0){
            $('#prev').css("display", "none");
        }
        else{XMLSerializer
            $('#prev').css("display", "inline-block");
        }    
        var count = alldata['resultCount'];   
        if(page >= Math.floor(count/9)){
            $('#next').css("display", "none");
            
        }
        else{
            $('#next').css("display", "inline-block");   
        };    
        }
    }

    
    function resultcount(){
        $("#resultcount").children().remove();
        var count = alldata['resultCount'];
        if(count >= 1){
            var sentence = `<div class="row">
                            <p style="text-align: center; color:black; padding-top:14px">`+'Found '+count+' songs'+`</p>
                            </div>`;
            var html =  $.parseHTML(sentence);
            $('#resultcount').append(html);
        }else{
            var nomatches = `<div class="row">
                            <p style="text-align: center; color:black; padding-top:14px">`+`Sorry, no matches found`+`</p>
                            </div>`;
            var html =  $.parseHTML(nomatches);
            $('#resultcount').append(html);
            $('#next').css("display", "none");
            $('#prev').css("display", "none")

        }
    }
    
});


