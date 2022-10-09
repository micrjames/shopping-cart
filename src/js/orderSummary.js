const createTblBody = function(data) {
   const tblRow = createTblBodyRow(data);

   return tblRow;
};

const createTblBodyRow = function(data) {
   const tblRow = document.createElement("tr");
   tblRow.id = "order-summary-tbl-body-row";

   const tblRowQty = createTblBodyRowQty(data.qty);
   tblRow.appendChild(tblRowQty);  

   const tblRowItem = createTblBodyRowItem(data.item);
   tblRow.appendChild(tblRowItem);

   const tblRowPrice = createTblBodyRowPrice(data.price);
   tblRow.appendChild(tblRowPrice);
   
   return tblRow;
};

const createTblBodyRowQty = function(qty) {
   const tblRowQty = document.createElement("th");
   tblRowQty.id = "order-summary-tbl-body-row-qty";
   tblRowQty.setAttribute("scope", "row");
   tblRowQty.textContent = qty;

   return tblRowQty;
};

const createTblBodyRowItem = function(item) {
   const tblRowItem = document.createElement("td");
   tblRowItem.id = "order-summary-tbl-body-row-item";
   tblRowItem.textContent = item;

   return tblRowItem;
};

const createTblBodyRowPrice = function(price) {
   const tblRowPrice = document.createElement("td");                                         
   tblRowPrice.id = "order-summary-tbl-body-row-price";
   tblRowPrice.textContent = price;

   return tblRowPrice;
};

const createTblFoot = function(tblFoot, total) {
   const tblFootRow = tblFoot.children.namedItem("order-summary-tbl-foot-row");
   const tblFootRowTotal = tblFootRow.children.namedItem("order-summary-tbl-foot-row-total");
   tblFootRowTotal.textContent = total;
};

export { createTblBody, createTblFoot };
