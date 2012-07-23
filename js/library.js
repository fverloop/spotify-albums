function startAlbum(e) {
  var album = e.data.album;
  var player = e.data.player;

  //Default Track
  var t = 0;

  //If there's a starred track. Select that one, otherwise play first track
  for (var i=0; i <= album.tracks.length; i++) {
    if(album.tracks[i].starred == true){
      t = i;
      break;
    }
  }

  player.track = album.tracks[t];

  album.get = function() {
    return album.tracks[t];
  }
}

function getLibrary(){
  var albums = _.sortBy(m.library.albums, function(album) {
    return album.data.artist.name.toLowerCase()
  });

  var albums = albums.reverse();

  //Create a view for every album
  for (var i = albums.length - 1; i >= 0; i--) {
    var uri = albums[i].uri;
    if(uri != null){ renderAlbumView(uri); }
  }
}

function renderAlbumView(source){
  var a = m.Album.fromURI(source, function(album) {
    //Set track and album context
    var player = new v.Player();
    player.context = album;
    
    //Append node to document
    $(player.node).append("<a href='"+album.uri+"' class='albumName'>"+album.name+"</a><a href='"+album.artist.uri+"' class='artistName'>"+album.artist.name+"</div>");
    $(player.node).find(".sp-player-button").on("click", {player: player, album: album}, startAlbum);
    $('#library').append(player.node);
    fillScreen();
  });
}