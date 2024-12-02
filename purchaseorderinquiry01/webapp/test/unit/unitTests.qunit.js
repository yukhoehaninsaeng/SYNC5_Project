/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"cl3syncyoungpi/purchaseorderinquiry01/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
