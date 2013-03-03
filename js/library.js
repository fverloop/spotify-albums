// This will be fired when the play button on an album cover will be clicked.
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

  player.play(album.tracks[t], album);

}

function getAlbums(){
  var source = m.library.starredPlaylist;
  var sourceLength = source.tracks.length
  var albumList = new Array
  
  //Sort albums by artist name
  var sortedTracks = source.tracks.sort(function(track1, track2) {
    var name1 = track1.artists[0].name || "";
    var name2 = track2.artists[0].name || "";
    return name1.toLocaleLowerCase().localeCompare(name2.toLocaleLowerCase());
  });

  //Make albums from seperate tracks
  $.each(sortedTracks, function(key) {
  
    var albumURI  = sortedTracks[key].album.data.uri;
    var albumName = sortedTracks[key].album.name;
    var duplicate = false; 
  
    //compare this album with the albums in the group list
    //if it finds a similar album, 'duplicate' is true and the loop breaks
    $.each(albumList, function(key, group){
      if(albumURI == group){
        duplicate = true;
      }
    });
  
    if (duplicate == false) {
      albumList.push(albumURI);
    };
      
  });

  //Create a view for every album
  for (var i = albumList.length - 1; i >= 0; i--) {
    var uri = albumList[i];
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
