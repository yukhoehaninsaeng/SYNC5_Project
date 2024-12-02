/*global QUnit*/

sap.ui.define([
	"cl3syncyoungpi/purchaseorderinquiry01/controller/purchaseorderinquiry_v.controller"
], function (Controller) {
	"use strict";

	QUnit.module("purchaseorderinquiry_v Controller");

	QUnit.test("I should test the purchaseorderinquiry_v controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
