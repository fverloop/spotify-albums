function getArtists(){
var artist = m.library.artists[1];

  if(artist.uri != null){
    var artistView = m.Artist.fromURI(artist.uri, function(artistView) {
           
      var player = new v.Player();
  		var artistName = artistView.name;
      //player.node.classList.add("sp-image-large");
  		player.context = artistView;
      $(player.node).append(
  			'<a href="'+artistView.uri+'" class="artistName sp-text-truncate"><span>'+artistName+'</span></a>');
      $('#library').append(player.node);
      fillScreen('library');
										
    });
  }
}