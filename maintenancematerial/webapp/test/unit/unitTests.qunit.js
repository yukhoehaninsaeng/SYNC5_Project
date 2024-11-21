/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"cl3syncyoungmmmtm/maintenancematerial/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
