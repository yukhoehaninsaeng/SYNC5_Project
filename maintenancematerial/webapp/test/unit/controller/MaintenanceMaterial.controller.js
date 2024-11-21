/*global QUnit*/

sap.ui.define([
	"cl3syncyoungmmmtm/maintenancematerial/controller/MaintenanceMaterial.controller"
], function (Controller) {
	"use strict";

	QUnit.module("MaintenanceMaterial Controller");

	QUnit.test("I should test the MaintenanceMaterial controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
