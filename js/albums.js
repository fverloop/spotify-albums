//Load Spotify API components
var sp = getSpotifyApi(1);
var m = sp.require('sp://import/scripts/api/models');
var v = sp.require("sp://import/scripts/api/views");
var ui = sp.require("sp://import/scripts/ui");
var player = m.player; 
var track = player.track;
var library = m.library;
var application = m.application;

//Handle tab arguments
application.observe(m.EVENT.ARGUMENTSCHANGED, handleArgs);
function handleArgs() {
	var active = m.application.arguments;
	$(".section").hide();	// Hide all sections
	$("#"+active[0]).show();	// Show current section
	fillScreen(active[0]);
}

//Lazyloading
$(window).scroll(function(){
	
	//Current active tab
	var active = m.application.arguments;
	
	//Pixels until bottom
	var scrolled = $(window).height() + $(window).scrollTop();
	
  if($('#library').height() <= (scrolled + 600)){
		if(active[0] == 'library'){
			getLibrary();
		} else if(active[0] == 'playlist'){
			//getPlaylist();
		}
  }
		
});

//Calculate Margin
$(window).resize(function(){ 
	var active = m.application.arguments;
	fillScreen(active[0]) 
});

//Calculate margin to make the album fill the screen
function fillScreen(tab){
  //Total width of window min margin
  var windowWidth = $(document).width();
  
  //Width of an album cover
  var albumWidth = 190;
  
  //Calculate extra margin
  var albumExtraMargin;
  
  //Number of albums per row
  var row = Math.floor(windowWidth/albumWidth);
    
  //Calculate remainging pixels after reducing the album width + minimal margin
  var remainingPx = windowWidth - (row*albumWidth);
  var remainingPx = remainingPx/2;
  
  //Calculate total margin
  var albumMargin = Math.floor(remainingPx/row)+20;
  
  //Calculate remaining pixels after all the margin is divided
  var comparison = Math.floor(remainingPx/row)*row;
  var rest = (remainingPx - comparison);
  rest = Math.floor(rest);
    
  $('#'+tab).css('padding-left',rest);
  $('#'+tab+' .sp-player').css({'margin-left':+albumMargin,'margin-right':+albumMargin});
}

sp.core.addEventListener("linksChanged", handleLinks);

function handleLinks() {
	var links = m.application.links;
	
	getPlaylist(links);
	
//	var link = new models.Link(player.context);
	
//	if(links.length) {

//		}		
//	} 
}


$(function(){
	// Run on application load
	getLibrary();
	handleArgs();
	handleLinks();
	
});