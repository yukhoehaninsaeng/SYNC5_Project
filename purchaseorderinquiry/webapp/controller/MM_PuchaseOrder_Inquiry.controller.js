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
            var oModel = new sap.ui.model.odata.v2.ODataModel("/sap/opu/odata/sap/ZC302MMCDS0006_CDS/");         // Item 정보 가져오기
            var oModel_count = new sap.ui.model.odata.v2.ODataModel("/sap/opu/odata/sap/ZC302MMCDS0004_CDS/");   // Icon tab bar count를 위한 oModel 선언

            let oView = this.getView();
            oView.setModel(new sap.ui.model.json.JSONModel({ PuchaseOrder: { ALL: 0, A: 0, B: 0 } }),"statusCounts");  // 각 상태별 구매 오더의 카운트 데이터를 저장하는 모델
           
                //Odata 읽기
                oModel_count.read("/PurchaseOrder", {
                    success: (oData) => {
                        let aOrders = oData.results;
                        let oStatusCounts = { ALL: 0, A: 0, B: 0 };

                // PuchaseOrder 상태별 카운트 계산
                        aOrders.forEach(order => {
                            oStatusCounts.ALL++;
                            if (order.stostat === "A") {
                                oStatusCounts.A++;
                            } else if (order.stostat === "B") {
                                oStatusCounts.B++;
                            }
                        });

            oView.getModel("statusCounts").setProperty("/PurchaseOrder", oStatusCounts);   //계산된 값을 statusCounts 모델에 업데이트
        },
        error: (oError) => {
            console.error("PurchaseOrder 데이터 로드 오류:", oError);
        }
            }); 

            //OData 모델 설정
            this.getView().setModel(oModel, "orderitem"); 
        },

        onFilterSelect: function (oEvent) {                         //IconTabBar에서 필터를 선택하면 호출,  선택된 키(sKey)에 따라 Table 데이터를 필터링
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