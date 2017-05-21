/* jshint undef: false, unused: false */
/* globals window, requirejs, $, define */
var property = 'mlbtv';
var version = '2.8.0';
var env = (window.location.hostname.indexOf( 'beta' ) >= 0 ) ? 'beta.' : ( (window.location.hostname.indexOf( 'qa' ) >= 0 || window.location.hostname.indexOf( 'dev' ) >= 0 || window.location.hostname.indexOf( 'local' ) >= 0) ? 'qa.' : '');
var minVal = (env == 'beta.' || env == 'qa.' ) ? '' : '.min';
var path = ( typeof window.mp5Config.videocore.pathOverride !== 'undefined' ) ? window.mp5Config.videocore.pathOverride : 'http://ui.' + env + 'bamstatic.com/fedapp/video/videocore/' + property + '/' + version + '/scripts/videocore' + minVal;

requirejs.config( {
	paths: {
		'core/VideoCore': path,
		'Video': path
	}
} );

define( function( require, exports, module ) {
	var video = require( 'Video' );
	var VC = require( 'core/VideoCore' );
	module = VC;
	$.extend( exports, module );
} );
