sap.ui.define([
    "sap/ui/core/mvc/Controller",
    'sap/m/MessageToast',
    'sap/ui/core/Fragment',
    'sap/ui/model/Filter',
    'sap/ui/model/FilterOperator',
    "sap/ui/core/syncStyleClass",
	"sap/m/library"
], function (Controller, MessageToast, Fragment, Filter, FilterOperator, syncStyleClass, library) {
    "use strict";


    const SelectDialogInitialFocus = library.SelectDialogInitialFocus;

    return Controller.extend("cl3.syncyoung.mm.purchaseorderinquiry.purchaseorderinquiry.controller.MM_PuchaseOrder_Inquiry", {

        onInit: function () {
            var oModel = new sap.ui.model.odata.v2.ODataModel("/sap/opu/odata/sap/ZC302MMCDS0006_CDS/"); 
            
                    // PuchaseOrder 상태별 카운트 계산
                oModel.read("/PuchaseOrder", {
                    success: (oData) => {
                        let aOrders = oData.results,
                            oStatusCounts = { Total: 0, A: 0, B: 0 };

                        aOrders.forEach(order => {
                            oStatusCounts.Total++;
                            if (order.stostat_txt === "입고 완료") {
                                oStatusCounts.A++;
                            } else if (order.stostat_txt === "입고 예정") {
                                oStatusCounts.B++;
                            }
                        });

            let oView = this.getView();
            oView.setModel(new sap.ui.model.json.JSONModel({ PuchaseOrder: oStatusCounts }), "statusCounts");
        },
        error: (oError) => {
            console.error("PuchaseOrder 데이터 로드 오류:", oError);
        }
            }); 
            this.getView().setModel(oModel, "orderitem"); 
            
        },

        onFilterSelect: function (oEvent) {
			let sKey     = oEvent.getParameter("key"),
                oTable   = this.byId("PurchaseOrder"),
                oBinding = oTable.getBinding("rows"),
				// Array to combine filters
				aFilters = [];

                switch (sKey) {
                    case "A": // "입고 완료" 필터
                        aFilters.push(new Filter("stostat_txt", FilterOperator.EQ, "입고 완료"));
                        break;
                    case "B": // "입고 예정" 필터
                        aFilters.push(new Filter("stostat_txt", FilterOperator.EQ, "입고 예정"));
                        break;
                    default: // 모든 데이터 표시
                        aFilters = [];
                }
                
			oBinding.filter(aFilters);
		},


        onOpenDialog : function(oEvent){
            var oButton = oEvent.getSource();
            var oContext = oButton.getParent().getBindingContext();
            var vAufnr = oContext.getProperty('aufnr');
          
            console.log(oContext);

            if(!this.pDialog){
                this.pDialog = this.loadFragment({
                    name : "cl3.syncyoung.mm.purchaseorderinquiry.purchaseorderinquiry.view.Dialog"
                });
            }
            
            this.pDialog.then(function(oDialog){
                var oTable = oDialog.getContent()[0];       // 다이얼로그 첫 번째 자식이 테이블이어야 함

                if (oTable && oTable.isA("sap.ui.table.Table")) {
                    var oBinding = oTable.getBinding("rows");

                    // 필터 설정
                    var aFilter = [ new Filter("aufnr", FilterOperator.EQ, vAufnr )]
                    oBinding.filter(aFilter);
                }

                oDialog.open();
            });
            
      },
       onCloseDialog : function ( ){
        this.byId("itemDialog").close();
       }
    });
});