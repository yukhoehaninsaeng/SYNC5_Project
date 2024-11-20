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
            console.log( '건희건희 바보 ');
            var oModel = new sap.ui.model.odata.v2.ODataModel("/sap/opu/odata/sap/ZC302MMCDS0006_CDS/"); 
      
            oModel.read("/PurchaseOrderItem", { 
                success: function(oData) {
                    console.log("데이터 읽기 성공:", oData);
                },
                error: function(oError) {
                    console.error("오류 발생:", oError);
                }
            }); 
            this.getView()
          .setModel(oModel, "orderitem"); 
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