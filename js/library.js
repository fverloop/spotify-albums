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
    var view = new v.Player();
    view.context = album;
    view.track = m.Track.fromURI(album.tracks[1].uri);
    $(view.node).append("<a href='"+album.uri+"' class='albumName'>"+album.name+"</a><a href='"+album.artist.uri+"' class='artistName'>"+album.artist.name+"</div>");
    $('#library').append(view.node);
    fillScreen();
  });
}