sap.ui.define([
    "sap/ui/core/mvc/Controller",
    'sap/ui/model/json/JSONModel',
	'sap/m/Label',
	'sap/ui/model/Filter',
	'sap/ui/model/FilterOperator',
	'sap/ui/comp/smartvariants/PersonalizableInfo',
	"sap/ui/comp/valuehelpdialog/ValueHelpDialog",
     "sap/m/MessageToast",
     "sap/m/MessageBox"
],
function (Controller, JSONModel, Label, Filter, FilterOperator, PersonalizableInfo, ValueHelpDialog, MessageToast, MessageBox) {
    "use strict";
	
    return Controller.extend("cl3.syncyoung.mm.materialcrud.materialcrud.controller.Material_CRUD", {
		// formatObj: formatter,
		onInit: function () {
			const bpcodeJson = new JSONModel ({
				"Bpcode" : [
					{"Bpcode" : "PO0001", "Cname": "BST" },
					{"Bpcode" : "PO0002", "Cname": "ezcos" },
					{"Bpcode" : "PO0003", "Cname": "ebiospectrum" },
					{"Bpcode" : "PO0004", "Cname": "모던테크" },
					{"Bpcode" : "PO0005", "Cname": "신영" },
					{"Bpcode" : "PO0005", "Cname": "upackage" },
				]
			},);
			const mtartJson = new JSONModel({
				"Mtart" : [
					{"Mtart" : "01", "Maktx" : "원자재"},
					{"Mtart" : "02", "Maktx" : "반제품"},
					{"Mtart" : "03", "Maktx" : "완제품"}
				]
			})
			this.getView().setModel(bpcodeJson, "Bpcode");
			this.getView().setModel(mtartJson, "Mtart");
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
            var oModel = this.getView().getModel("Mtart"); // 기본 ODataModel 사용
            oValueHelpDialog.setModel(oModel);      // ValueHelpDialog에 ODataModel 설정

            // Table 설정
            var oTable = oValueHelpDialog.getTable();
            oTable.setModel(oModel);
            oTable.bindRows("/Mtart");

            // 열 추가
            oTable.addColumn(new sap.ui.table.Column({
                label: new sap.m.Label({ text: "자재유형" }),
                template: new sap.m.Text({ text: "{Mtart}" }),
                sortProperty: "Mtart",
                filterProperty: "Mtart"
            }));
            oTable.addColumn(new sap.ui.table.Column({
                label: new sap.m.Label({ text: "자재명" }),
                template: new sap.m.Text({ text: "{Maktx}" }),
                sortProperty: "Maktx",
                filterProperty: "Maktx"
            }));

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
            var oModel = this.getView().getModel("Bpcode"); // 기본 ODataModel 사용
            oValueHelpDialog.setModel(oModel);      // ValueHelpDialog에 ODataModel 설정

            // Table 설정
            var oTable = oValueHelpDialog.getTable();
            oTable.setModel(oModel);
            oTable.bindRows("/Bpcode");

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
		},

        currentButton: null,

        //  Create문
        onCreate: function () {
            let oModel = this.getView().getModel();

            // 현재 버튼 정보 업데이트
            this.currentButton = "onCreate";

           
            if (!this.oItemDialog) {
                this.oItemDialog = sap.ui.xmlfragment("cl3.syncyoung.mm.materialcrud.materialcrud.view.DialogC", this); 
         
                this.getView().addDependent(this.oItemDialog);
            }

            // Clear input field
            sap.ui.getCore().byId("Maktx").setValue('');
            sap.ui.getCore().byId("Mtart").setValue('');
            sap.ui.getCore().byId("Bpcode").setValue('');
            sap.ui.getCore().byId("Weight").setValue('');
            sap.ui.getCore().byId("Gewei").setValue('');
            sap.ui.getCore().byId("Netwr").setValue('');
            sap.ui.getCore().byId("Waers").setValue('');
            sap.ui.getCore().byId("Matlt").setValue('');
            sap.ui.getCore().byId("Matmlt").setValue('');

            this.oItemDialog.open();
        },

        // 현재 클릭된 버튼 정보를 반환하는 함수
        getCurrentButton: function () {
            return this.currentButton;
        },

        onConfirmDialog: function () {
            let oMtart = sap.ui.getCore().byId("Mtart").getValue(); // 자재유형 가져오기
            
            if (this.getCurrentButton() !== "onCreate") {
                MessageBox.error("자재수정 버튼을 눌러주세요.");
                return;
            }
            else if (oMtart === "03" && (!sap.ui.getCore().byId("Maktx").getValue() || !sap.ui.getCore().byId("Weight").getValue() || !sap.ui.getCore().byId("Gewei").getValue() || 
                                         !sap.ui.getCore().byId("Netwr").getValue() || !sap.ui.getCore().byId("Waers").getValue() || !sap.ui.getCore().byId("Matmlt").getValue())) {
                MessageBox.error("자재유형이 완제품일 경우 자재명, 무게, 단위, 금액, 통화, 생산리드타임을 입력해야 합니다.");
                return;
            } else if ((oMtart === "01" || oMtart === "02") && (!sap.ui.getCore().byId("Maktx").getValue() || !sap.ui.getCore().byId("Weight").getValue() || !sap.ui.getCore().byId("Gewei").getValue() ||  
                                                                !sap.ui.getCore().byId("Netwr").getValue() || !sap.ui.getCore().byId("Waers").getValue() || !sap.ui.getCore().byId("Matlt").getValue())) {
                MessageBox.error("자재유형이 원자재, 반제품일 경우 자재명, 무게, 단위, 금액, 통화, 구매리드타임을 입력해야 합니다.");
                return;
            } else if (!sap.ui.getCore().byId("Maktx").getValue() || !sap.ui.getCore().byId("Mtart").getValue() || !sap.ui.getCore().byId("Weight").getValue() || 
                                                                     !sap.ui.getCore().byId("Gewei").getValue() || !sap.ui.getCore().byId("Netwr").getValue() || !sap.ui.getCore().byId("Waers").getValue()) {
                MessageBox.error("자재명, 자재유형, 무게, 단위, 금액, 통화는 필수 입력 필드입니다.");
                return;
            }    


            let oModel = this.getView().getModel();
            console.log(oModel);
            let vNetwr  = sap.ui.getCore().byId("Netwr").getValue();
            let oData = {
                Maktx:  sap.ui.getCore().byId("Maktx").getValue(),
                Mtart:  sap.ui.getCore().byId("Mtart").getValue(),
                Bpcode: sap.ui.getCore().byId("Bpcode").getValue(),
                Weight: sap.ui.getCore().byId("Weight").getValue(),
                Gewei:  sap.ui.getCore().byId("Gewei").getValue(),
                Netwr:  vNetwr,
                Waers:  sap.ui.getCore().byId("Waers").getValue(),
                Matlt:  sap.ui.getCore().byId("Matlt").getValue(),
                Matmlt: sap.ui.getCore().byId("Matmlt").getValue(),
            };
        
            oModel.create("/MaterialMasterSet", oData,{
                    method: 'POST',
                    success: function (){
                        oModel.refresh();
                        MessageToast.show("신규 자재정보가 등록되었습니다.");
                    },
                    error: function (){
                        MessageToast.show("등록에 실패하였습니다.");
                    }
            });
            this.oItemDialog.close();
        },

        onCloseDialog: function () {
            this.oItemDialog.close();
        },

        //  Delete문
        onDelete: function () {
            let oModel = this.getView().getModel(),
                oTable = this.byId("table"),
                aIndex = oTable.getSelectedIndices(),
                oContext,
                oData;
        
            if (aIndex.length === 0) {
                MessageToast.show("삭제할 행을 선택하세요.");
                return;
            }
        
            oContext = oTable.getContextByIndex(aIndex[0]);
            oData = oContext.getObject();
        
            MessageBox.confirm(
                "삭제하시겠습니까?",
                {
                    actions: [MessageBox.Action.YES, MessageBox.Action.NO],
                    onClose: function (sAction) {
                        if (sAction === MessageBox.Action.YES) {
                            oModel.remove("/MaterialMasterSet(Matnr='" + oData.Matnr + "')",
                                {
                                    method: 'DELETE',
                                    success: function () {
                                        oModel.refresh();
                                        MessageToast.show("Delete Successfully!!");
                                    },
                                    error: function () {
                                        MessageToast.show("Delete Failure!!");
                                    }
                                });
                        }
                    }
                }
            );
        },


        // 
        onDisplay: function () {
            let oTable = this.byId("table"),
                aIndex = oTable.getSelectedIndices(),
                oContext = oTable.getContextByIndex(aIndex[0]),
                oData = oContext.getObject(),
                oModel = this.getView().getModel(); // 모델 가져오기
            
                 // 현재 버튼 정보 업데이트
                this.currentButton = "onDisplay";

            if (aIndex.length === 0) {
                MessageToast.show("수정할 행을 선택하세요.");
                return;
            }
        
            console.log(oData);

            if (!this.oItemDialog) {
                this.oItemDialog = sap.ui.xmlfragment("cl3.syncyoung.mm.materialcrud.materialcrud.view.DialogC", this);
                this.getView().addDependent(this.oItemDialog);
            }
        
            oModel.read("/MaterialMasterSet(Matnr='" + oData.Matnr + "')", { // oData.Matnr 사용
                success: function (oData2) {
                    // oData2를 사용하여 Dialog의 Input 필드에 값을 설정합니다.
                    this.oItemDialog.setModel(new JSONModel(oData2), "dialog");
                }.bind(this),
                error: function () {
                    MessageToast.show("Get entity error!!");
                }
            });
        
            this.oItemDialog.open();
        },
        
        onUpdate: function () {
            // onDisplay 버튼이 클릭되었는지 확인
            if (this.getCurrentButton() !== "onDisplay") {
                MessageBox.error("자재생성 버튼을 눌러주세요.");
                return;
            }

            let oModel = this.getView().getModel();
            let oDialogModel = this.oItemDialog.getModel("dialog");
            let oData = oDialogModel.getData();
        
            oModel.update("/MaterialMasterSet(Matnr='" + oData.Matnr + "')", 
                oData, {
                method: 'MERGE',
                success: function () {
                    oModel.refresh();
                    MessageToast.show("자재 정보가 수정되었습니다.");
                },
                error: function () {
                    MessageToast.show("수정에 실패했습니다.");
                }
            });
            this.oItemDialog.close();
        },

        onSearch: function() {
            let oTable   = this.getView().byId("table"),
                oBinding = oTable.getBinding("rows"),    // rows 정보를 가져옴
                aFilter  = [],                           // aFilter = arrayFilter  -> 2. 이 배열에 넣는다.
                oFilter  = null;                         // oFilter = objectFilter -> 1. oFilter를 통해 WA 형태로 검색 조건을 Making해서


            var vMtart = this.getView().byId("mtartInput").getValue(),
                vBpcode   = this.getView().byId("bpcodeInput").getValue();

            if (!vMtart && !vBpcode) {
                MessageToast.show("자재유형 혹은 거래처코드를 입력하세요.");
                exit;
            };
            
            /** 검색조건 Making */
            if (vMtart != '') {

                // 생성자를 이용해서 검색조건을 Making 한다. (중괄호이기 때문에 Work Area로 Making 한다.)
                oFilter = new Filter({
                    path: "Mtart",
                    operator: FilterOperator.EQ,
                    value1: vMtart
                });

                aFilter.push(oFilter); // aFilter에 담아준다.
                oFilter = null;        // oFilter 초기화

            };

            if (vBpcode != '') {

                oFilter = new Filter({
                    path: "Bpcode",
                    operator: FilterOperator.EQ,
                    value1: vBpcode
                });

                aFilter.push(oFilter);
                oFilter = null;
                
            };

            oBinding.filter(aFilter); // Making한 검색 조건들을 Entityset에 날려준다.
        },

        onReset: function() {

            let oTable   = this.getView().byId("table"),
                oBinding = oTable.getBinding("rows"),    // rows 정보를 가져옴
                aFilter  = [],                           // aFilter = arrayFilter  -> 2. 이 배열에 넣는다.
                oFilter  = null;                         // oFilter = objectFilter -> 1. oFilter를 통해 WA 형태로 검색 조건을 Making해서

            this.byId("mtartInput").setValue("");
            this.byId("bpcodeInput").setValue("");

            var vMtart    = this.getView().byId("mtartInput").getValue(),
                vBpcode   = this.getView().byId("bpcodeInput").getValue();

            /** 검색조건 Making */
            if (vMtart != '') {

                // 생성자를 이용해서 검색조건을 Making 한다. (중괄호이기 때문에 Work Area로 Making 한다.)
                oFilter = new Filter({
                    path: "Mtart",
                    operator: FilterOperator.EQ,
                    value1: vMtart
                });

                aFilter.push(oFilter); // aFilter에 담아준다.
                oFilter = null;        // oFilter 초기화

            };

            if (vBpcode != '') {

                oFilter = new Filter({
                    path: "Bpcode",
                    operator: FilterOperator.EQ,
                    value1: vBpcode
                });

                aFilter.push(oFilter);
                oFilter = null;
                
            };

            oBinding.filter(aFilter); // Making한 검색 조건들을 Entityset에 날려준다.

        },


		 
    });
});
