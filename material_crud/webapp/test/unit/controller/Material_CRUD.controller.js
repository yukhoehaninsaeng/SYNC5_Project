/*global QUnit*/

sap.ui.define([
	"cl3syncyoungmmmaterialcrud/material_crud/controller/Material_CRUD.controller"
], function (Controller) {
	"use strict";

	QUnit.module("Material_CRUD Controller");

	QUnit.test("I should test the Material_CRUD controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
