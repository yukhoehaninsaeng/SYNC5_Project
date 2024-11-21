sap.ui.define([
    "sap/ui/core/mvc/Controller",
    'sap/ui/model/json/JSONModel',
	'sap/m/Label',
	'sap/ui/model/Filter',
	'sap/ui/model/FilterOperator',
	'sap/ui/comp/smartvariants/PersonalizableInfo'
],
function (Controller, JSONModel, Label, Filter, FilterOperator, PersonalizableInfo) {
    "use strict";

    return Controller.extend("cl3.syncyoung.mm.mtm.maintenancematerial.controller.MaintenanceMaterial", {
        onInit: function () {
            this._oTable = this.getView().byId("table");
        },

        onSearch: function(oEvent) {
			var aSelectionSet = oEvent.getParameter("selectionSet");

			var oFilter = new sap.ui.model.Filter(
				aSelectionSet
				.map(function(oItem) {
					if (oItem.getValue) {
						var sValue = oItem.getValue();
						return new Filter("Mtart", FilterOperator.Contains, sValue);
					}
					if (oItem.getSelectedKey) {
						var sValue = oItem.getSelectedKey();
						if (oItem.getId().indexOf("Bpcode") > 0) {
							return new Filter("Bpcode", FilterOperator.Contains, sValue);
						} 
                        // else {
						// 	return new Filter("ContactTitle", FilterOperator.Contains, sValue);
						// }
					}
				}), true);

			this._oTable.getBinding("items").filter(oFilter, true);
		},

		onReset: function(oEvent) {
			this._oTable.getBinding("items").filter([]);
		}

    });
});
