sp = getSpotifyApi(1)
m = sp.require('sp://import/scripts/api/models')
v = sp.require("sp://import/scripts/api/views")
ui = sp.require("sp://import/scripts/ui")
player = m.player
track = player.track
library = m.library
application = m.application