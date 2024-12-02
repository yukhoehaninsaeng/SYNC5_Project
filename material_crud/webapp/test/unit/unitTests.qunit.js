/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"cl3syncyoungmmmaterialcrud/material_crud/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
