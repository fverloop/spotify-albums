function getLibrary(){
  //Sort albums by name
  var albums = m.library.albums.sort(function(album1, album2) {
    var name1 = album1.artist.name || "";
    var name2 = album2.artist.name || "";
    return name1.toLocaleLowerCase().localeCompare(name2.toLocaleLowerCase());
  });

  //Create a view for every album
  for (var i = albums.length - 1; i >= 0; i--) {
    var uri = albums[i].uri;
    if(uri != null){ renderAlbumView(uri); }
  }
}

function renderAlbumView(source){
  

  var a = m.Album.fromURI(source, function(album) {
    
    //Default Track
    var t = 0;

    //If there's a starred track. Select that one, otherwise play first track
    for (var i=0; i <= album.tracks.length; i++) {
      if(album.tracks[i].starred == true){
        t = i;
        break;
      }
    }

    //Set track and album context
    var player = new v.Player();
    player.track = album.tracks[t];
    album.get = function() {
        return album.tracks[t];
    }
    player.context = album;

    //Append node to document
    $(player.node).append("<a href='"+album.uri+"' class='albumName'>"+album.name+"</a><a href='"+album.artist.uri+"' class='artistName'>"+album.artist.name+"</div>");
    $('#library').append(player.node);
    fillScreen();
  });
}