$( document ).ready(function() {


    $(".btn").click(function(){
        var searchvalue = $("#searchplace").val();
        var apiURL = 'https://itunes.apple.com/search?term=';
        $.ajax({
            url : apiURL + searchvalue + '&entity=song',
            dataType : 'jsonp',
            success: function(data){
               var res = data['results'];
               for (var i=0; i<res.length && i<9; i++){
                    
                    var cards = `   <div class=" col-lg-4">
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

                    
               }
            }
        });
    });
});
