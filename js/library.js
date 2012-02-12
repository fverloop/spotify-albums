//Current album key
var albumKey = 0;
var ticker = 0;

//Sort albums by artist name
var albums = m.library.albums.sort(function(album1, album2) {
  var name1 = album1.artist.name || "";
  var name2 = album2.artist.name || "";
  return name1.toLocaleLowerCase().localeCompare(name2.toLocaleLowerCase());
});

//Load the amount of albums set in the interval variable
function getLibrary(){
  
  $('#switch').html(albums.length+' albums');
    
  //Loop trough every album    
  for(var k=0;k < 50;k++){
      
    var album = albums[albumKey];
    
    if(album.uri != null  && ticker <= albums.length){
      var albumView = m.Album.fromURI(album.uri, function(albumView) {
        
				var track;
				var length = albumView.length;
				
				//Select first starred track
				for(var i=0;i <= length;i++){
					var starred = albumView.data.tracks[i].starred;
					if(starred){
						track = albumView.get(i);;
						break;
					}
				}
				   
        var player = new v.Player();
				var artistName = albumView.artist.name;
				var albumName = albumView.name;
        //player.node.classList.add("sp-image-large");
				player.track = track;
				albumView.get = function(){
					
					return track;
					
				}
				player.context = albumView;
	      $(player.node).append(
					'<a href="'+albumView.uri+'" class="albumName sp-text-truncate">'+albumName+'</a><a href="'+albumView.artist.uri+'" class="artistName sp-text-truncate"><span>'+artistName+'</span></a>');
        $('#library').append(player.node);
        fillScreen('library');
								
				
      });
    }
  
  albumKey++;
           
  }
          
}