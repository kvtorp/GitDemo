jQuery.sap.declare("com.nnit.demo.scanner.dev.devapp");
jQuery.sap.require("com.nnit.demo.scanner.dev.devlogon");

com.nnit.demo.scanner.dev.devapp = {
	smpInfo: {},
	externalURL: null,

	//Application Constructor
	initialize: function() {
		this.bindEvents();
	},

	//========================================================================
	// Bind Cordova Event Listeners
	//========================================================================
	bindEvents: function() {
		//add an event listener for the Cordova deviceReady event.
		document.addEventListener("deviceready", this.onDeviceReady, false);
	},

	//========================================================================
	//Cordova Device Ready
	//========================================================================
	onDeviceReady: function() {
		var that = com.nnit.demo.scanner.dev.devapp;
		$.getJSON(".project.json", function(data) {
			if (data && data.hybrid && data.hybrid.plugins.kapsel.logon.selected) {
				that.smpInfo.server = data.hybrid.msType === 0 ? data.hybrid.hcpmsServer : data.hybrid.server;
				that.smpInfo.port = data.hybrid.msType === 0 ? "443" : data.hybrid.port;
				that.smpInfo.appID = data.hybrid.appid;

				//external Odata service url
				if (data.hybrid.externalURL && data.hybrid.externalURL.length > 0) {
					that.externalURL = data.hybrid.externalURL;
				}
			}
			if (that.smpInfo.server && that.smpInfo.server.length > 0) {
				var context = {
					"serverHost": that.smpInfo.server,
					"https": data.hybrid.msType === 0 ? "true" : "false",
					"serverPort": that.smpInfo.port
				};
				that.devLogon = new com.nnit.demo.scanner.dev.devlogon();
				that.devLogon.doLogonInit(context, that.smpInfo.appID);
			} else {
				startApp();
			}
		});
	}
};