import { removeChildren } from "./DOMutils.js";

const createTblBody = function(tblBody, tblRowValsArr) {
    tblRowValsArr.forEach(tblRowVals => {
	   const tblBodyRow = createTblBodyRow(tblRowVals);
	   tblBody.appendChild(tblBodyRow);
	});
};

const removeTblBody = function(tblBody) {
    for(const tblRow of tblBody.children) {
	   removeTblBodyRow(tblRow);
	}

    removeChildren(tblBody);
};

const createTblBodyRow = function(data) {
   const tblRow = document.createElement("tr");
   tblRow.id = "order-summary-tbl-body-row";

   const tblRowItem = createTblBodyRowItem(data.item);
   tblRow.appendChild(tblRowItem);

   const tblRowQty = createTblBodyRowQty(data.qty);
   tblRow.appendChild(tblRowQty);  

   const tblRowPrice = createTblBodyRowPrice(data.price);
   tblRow.appendChild(tblRowPrice);
   
   return tblRow;
};

const removeTblBodyRow = function(tblBodyRow) {
   removeChildren(tblBodyRow);
};

const createTblBodyRowItem = function(item) {
   const tblRowItem = document.createElement("th");
   tblRowItem.id = "order-summary-tbl-body-row-item";
   tblRowItem.setAttribute("scope", "row");
   tblRowItem.textContent = item;

   return tblRowItem;
};

const createTblBodyRowQty = function(qty) {
   const tblRowQty = document.createElement("td");
   tblRowQty.id = "order-summary-tbl-body-row-qty";
   tblRowQty.textContent = qty;

   return tblRowQty;
};

const createTblBodyRowPrice = function(price) {
   const tblRowPrice = document.createElement("td");                                         
   tblRowPrice.id = "order-summary-tbl-body-row-price";
   tblRowPrice.textContent = price;

   return tblRowPrice;
};

const createTblFoot = function(tblFoot, qty, total) {
   const tblFootRow = tblFoot.children.namedItem("order-summary-tbl-foot-row");

   const tblFootRowQty = tblFootRow.children.namedItem("order-summary-tbl-foot-row-qty");
   tblFootRowQty.textContent = qty;
   const tblFootRowTotal = tblFootRow.children.namedItem("order-summary-tbl-foot-row-total");
   tblFootRowTotal.textContent = total;
};

export { createTblBody, createTblBodyRow, removeTblBody, createTblFoot };
