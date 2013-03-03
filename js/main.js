// Generated by CoffeeScript 1.4.0

/* --------------------------------------------
     Begin utils.coffee
--------------------------------------------
*/


(function() {
  var application, getAlbums, library, m, player, sp, track, ui, v;

  sp = getSpotifyApi(1);

  m = sp.require('sp://import/scripts/api/models');

  v = sp.require("sp://import/scripts/api/views");

  ui = sp.require("sp://import/scripts/ui");

  player = m.player;

  track = player.track;

  library = m.library;

  application = m.application;

  /* --------------------------------------------
       Begin albums.coffee
  --------------------------------------------
  */


  getAlbums = function() {
    var albums, source, sourceLength;
    source = m.library.starredPlaylist;
    sourceLength = source.tracks.length;
    return albums = new Array;
  };

  getAlbums();

}).call(this);
