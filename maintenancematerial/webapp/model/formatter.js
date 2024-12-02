
  sap.ui.define([], function () {
    "use strict";

    return {MtartText: function (Mtart) {
        var oBundle = this.getView().getModel("row").getResourceBundle();

        console.log("TEST");

        switch(Mtart) {
        case "01" :
            return "원자재";
        case "02" :
            return "반제품";
        case "03" :
            return "완제품";
        default:
            return Mtart;    
        }    
    }

  };
});