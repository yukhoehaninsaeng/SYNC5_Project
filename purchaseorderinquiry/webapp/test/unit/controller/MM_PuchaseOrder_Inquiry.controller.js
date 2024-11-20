/*global QUnit*/

sap.ui.define([
	"cl3syncyoungmmpurchaseorder_inquiry/purchaseorderinquiry/controller/MM_PuchaseOrder_Inquiry.controller"
], function (Controller) {
	"use strict";

	QUnit.module("MM_PuchaseOrder_Inquiry Controller");

	QUnit.test("I should test the MM_PuchaseOrder_Inquiry controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
