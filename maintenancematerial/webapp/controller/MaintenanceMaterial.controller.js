sap.ui.define([
    "sap/ui/core/mvc/Controller",
    'sap/ui/model/json/JSONModel',
	'sap/m/Label',
	'sap/ui/model/Filter',
	'sap/ui/model/FilterOperator',
	'sap/ui/comp/smartvariants/PersonalizableInfo',
	"sap/ui/comp/valuehelpdialog/ValueHelpDialog"
],
function (Controller, JSONModel, Label, Filter, FilterOperator, PersonalizableInfo, ValueHelpDialog) {
    "use strict";

    return Controller.extend("cl3.syncyoung.mm.mtm.maintenancematerial.controller.MaintenanceMaterial", {
        onInit: function () {
            this.oTable = this.getView().byId("table");

			let oModel = new sap.ui.model.odata.v2.ODataModel({
                serviceUrl: "/sap/opu/odata/sap/ZGW_C302_MM0002_SRV/", 
                defaultBindingMode: sap.ui.model.BindingMode.TwoWay 
            });
            this.getView().setModel(oModel);
        },

		onSearch: function (oEvent) {
			const oTable = this.byId("table");
			const oBinding = oTable.getBinding("rows");
		
			if (!oBinding) {
				console.error("Table binding is not defined.");
				return;
			}
		
			const aFilters = [];
			const oMtartFilter = this.byId("mtartInput").getValue();
			const oBpcodeFilter = this.byId("bpcodeInput").getValue();
			
			console.log('Filters:', oMtartFilter, oBpcodeFilter);  // 필터 값 확인

			if (oMtartFilter) {
				aFilters.push(new Filter("Mtart", FilterOperator.EQ, oMtartFilter));
				
			}
		
			if (oBpcodeFilter) {
				aFilters.push(new Filter("Bpcode", FilterOperator.EQ, oBpcodeFilter));
			}

			if (aFilters.length > 0) {
				oBinding.filter(aFilters);
				console.log('Binding done', aFilters);
			} else {
				console.log('No filters applied');
			}
			
			// oBinding.filter(aFilters);
			// console.log( 'binding done ', aFilters, oBinding, oTable);
		},

		onReset: function(oEvent) {
			this.byId("mtartInput").setValue("");
            this.byId("bpcodeInput").setValue("");
			this.oTable.getBinding("rows").filter([]);
		},

		

		onMtartValueHelp: function() {
			var oInput = this.byId("mtartInput"); // 입력 필드
            var oValueHelpDialog = new ValueHelpDialog({
                title: "자재유형",
                supportMultiselect: false,
                key: "Mtart",
                descriptionKey: "Description",
                ok: function (oEvent) {
                    var aTokens = oEvent.getParameter("tokens");
                    if (aTokens.length > 0) {
                        oInput.setValue(aTokens[0].getKey());
                    }
                    oValueHelpDialog.close();
                },
                cancel: function () {
                    oValueHelpDialog.close();
                }
            });

            // OData 모델 가져오기
            var oModel = this.getView().getModel(); // 기본 ODataModel 사용
            oValueHelpDialog.setModel(oModel);      // ValueHelpDialog에 ODataModel 설정

            // Table 설정
            var oTable = oValueHelpDialog.getTable();
            oTable.setModel(oModel);
            oTable.bindRows("/MaterialMasterSet");

            // 열 추가
            oTable.addColumn(new sap.ui.table.Column({
                label: new sap.m.Label({ text: "자재유형" }),
                template: new sap.m.Text({ text: "{Mtart}" }),
                sortProperty: "Mtart",
                filterProperty: "Mtart"
            }));
            // oTable.addColumn(new sap.ui.table.Column({
            //     label: new sap.m.Label({ text: "자재명" }),
            //     template: new sap.m.Text({ text: "{Maktx}" }),
            //     sortProperty: "Maktx",
            //     filterProperty: "Maktx"
            // }));

            // 다이얼로그 열기
            oValueHelpDialog.open();
		},
		onBpcodeValueHelp: function() {
			var oInput = this.byId("bpcodeInput"); // 입력 필드
            var oValueHelpDialog = new ValueHelpDialog({
                title: "거래처코드",
                supportMultiselect: false,
                key: "Bpcode",
                descriptionKey: "Description",
                ok: function (oEvent) {
                    var aTokens = oEvent.getParameter("tokens");
                    if (aTokens.length > 0) {
                        oInput.setValue(aTokens[0].getKey());
                    }
                    oValueHelpDialog.close();
                },
                cancel: function () {
                    oValueHelpDialog.close();
                }
            });

            // OData 모델 가져오기
            var oModel = this.getView().getModel(); // 기본 ODataModel 사용
            oValueHelpDialog.setModel(oModel);      // ValueHelpDialog에 ODataModel 설정

            // Table 설정
            var oTable = oValueHelpDialog.getTable();
            oTable.setModel(oModel);
            oTable.bindRows("/MaterialMasterSet");

            // 열 추가
            oTable.addColumn(new sap.ui.table.Column({
                label: new sap.m.Label({ text: "거래처코드" }),
                template: new sap.m.Text({ text: "{Bpcode}" }),
                sortProperty: "Bpcode",
                filterProperty: "Bpcode"
            }));
            oTable.addColumn(new sap.ui.table.Column({
                label: new sap.m.Label({ text: "거래처명" }),
                template: new sap.m.Text({ text: "{Cname}" }),
                sortProperty: "Cname",
                filterProperty: "Cname"
            }));

            // 다이얼로그 열기
            oValueHelpDialog.open();
		}
    });
});
