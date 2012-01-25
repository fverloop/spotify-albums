//Load albums from group array
function getPlaylist(uri){
	
	var source = m.Playlist.fromURI(uri[0]);
	var sourceLength = source.tracks.length
	var albumList = new Array
  
  //Change toolbar title
  console.log(source.name);
  $('#toolbar h1').html(source.name);
  
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
	
	$.each(albumList, function(key, uri) {
		
		if(uri != ''){
			var thisAlbum = m.Album.fromURI(uri, function(thisAlbum) {
		
				var player = new v.Player();
				player.context = thisAlbum;
	      $(player.node).append('<a href="'+uri+'" class="albumName sp-text-truncate">'+thisAlbum.name+'</a><a href="'+thisAlbum.artist.uri+'" class="artistName sp-text-truncate"><span>'+thisAlbum.artist.name+'</span></a>');
			  $('#playlist').append(player.node);
				//player.node.classList.add("sp-image-large");
				fillScreen('playlist');
        
			});
		}	
	});
}