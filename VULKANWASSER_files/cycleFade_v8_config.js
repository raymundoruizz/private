var xaraSwidgets_cycleFade_v8Templates = {

	entry:	'<img src="{image}" border="0" />',
			
	main:	 '<div id="{component_id}OuterDiv" class="{component_id}cycle1">'
			+ 	'{entryhtml}'
			+ '</div>'
			+ '<div id="{component_id}cycleFade_nav"></div>'
			
			
	        
};

// this is the constructor for a component
// it loops through each 'entry' in the array of data and compiles the entry template for it
// it then applies the resulting HTML to the main template before writing the whole lot to the div on the page
// it then initialises the actual jquery plugin for the div (that now contains the required HTML as a result of writing the template to it)
function xaraSwidgets_cycleFade_v8Constructor(divID, data)
{
	
	
	var entryHTML = '';
	// loop through each entry in the array and compile the entry template for it
	for(var i=0; i<data.length; i++)
	{
		entryHTML += xaraSwidgets_compileTemplate(xaraSwidgets_cycleFade_v8Templates.entry, data[i]);
	}
	
	// now lets compile the 'main' template which acts as a wrapper for each entry
	
	var mainData = {
		component_id:divID,
		entryhtml:entryHTML
	};
	
	var mainTemplate = xaraSwidgets_compileTemplate(xaraSwidgets_cycleFade_v8Templates.main, mainData);
	
	// now lets apply the resulting HTML for the whole component to the main DIV that was exported by XARA
	
	$('#' + divID).html(mainTemplate);
	
	
	// now we have the components DOM on the page - we can use the 'OuterDiv' as the jquery initiation point
	
	
//	1. find the width and height of the parent div 
	
	// work out the required dimensions for width and height.
	var cf_height = $('#' + divID).parent('div').height()
	var cf_width = $('#' + divID).parent('div').width()
	var orig_width = 700;
	var orig_height = 300;
	
	var widthRatio = cf_width / orig_width;
	var heightRatio = cf_height / orig_height;
	
	var useRatio = widthRatio <= heightRatio ? widthRatio : heightRatio;
	if (useRatio < 0.4) { var useRatio = 0.5};  // setting min font size to 1/2 of orig size
	if (useRatio > 1) { var useRatio = 1}; // setting max font size to same as origFontSize
	var originalFontSize = 18; 
	
	var newFontSize = Math.round(originalFontSize * useRatio);

//	2. find the width and height of the parent div 
	
	// write the css for contentimage graphics and the currentimage tab.
	$('head').append("<style>."+ divID +"cycle1 {  margin:0px;  z-index:0; width:" + cf_width +"px; height:" + cf_height +
	"px;} ."+ divID +"cycleFade_slideshow { width:" + cf_width +"px; height:" + cf_height + 
	"px; margin:0px;  z-index:0;  position:relative; } ."+ divID +
	"cycleFade_slideshow img { padding: 15px; border: 1px solid #ccc; background-color: #eee;} #"+ divID +
	"cycleFade_nav {  margin: 0px; position:relative; right:0px; top:-26px; z-index:2; font-family:arial; font-size:"+ newFontSize +"px; }   #"+ divID +
	"cycleFade_nav a { line-height:30px;	border:1px solid #ccc; 	background:#eee; color:#555; margin:1px; padding:0 10px; text-decoration:none; 	} #"+ divID +
	"cycleFade_nav a.activeSlide { background: #ddd; color: #000 } #"+ divID +
	"cycleFade_nav a:focus { outline: none; }</style>");
	
	
	
	
	$('#' + divID + 'OuterDiv').find('img').addClass(divID+"cycleFade_slideshow");
	
	$('#' + divID + 'OuterDiv').cycle({
						
						fx: 'fade', // choose your transition type, ex: fade, scrollUp, shuffle, etc...
						pager:      '#'+divID+'cycleFade_nav'
						
							
							
	});
}