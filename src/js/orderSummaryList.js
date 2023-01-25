import { removeChildren, createListItemEl, createSpan, addIcon } from "./utils/DOMutils.js";
import { priceFormatter } from "./utils/priceFormatter.js";

const createOrderList = function(orderList, orderListValsArr, orderTblValsArr) {
    orderListValsArr.forEach(orderListVals => {
	    let priceList = [];
	    if(orderTblValsArr)
		   orderTblValsArr.forEach(orderTblVals => {
			   if(orderListVals.ingredients.includes(orderTblVals.item))
				  priceList = [...priceList, orderTblVals.price];
		   });
	    
	    const orderListItem = createOrderListItem(orderListVals, priceList);
        orderList.appendChild(orderListItem);
	}); 
};

const removeOrderList = function(orderList) {
    removeChildren(orderList);
};

const createOrderListItem = function(orderListVals, priceList) {
    const li = document.createElement("li");

    const listHdr = createOrderListHdr(orderListVals.name);
    li.appendChild(listHdr);

    const listBody = createOrderListBody(orderListVals.ingredients);
    li.appendChild(listBody);

    const listTotal = priceList.reduce((acc, item) => +acc + +item, 0);
    const listFoot = createOrderListFoot(orderListVals.qty, priceFormatter.format(listTotal));
    li.appendChild(listFoot);

    return li;
}

const createOrderListHdr = function(recipe_name) {
    const ul = document.createElement("ul");
    ul.setAttribute("class", "order-list-hdr");

    const span = createSpan(recipe_name);	
    ul.appendChild(createListItemEl(span));

    const iconLI = document.createElement("li");
    addIcon(iconLI, "xmark");
    iconLI.setAttribute("class", "order-list-delete");
    ul.appendChild(iconLI)

    return ul;
};

const createOrderListBody = function(ingredients) {
    const ul = document.createElement("ul");
    ul.setAttribute("class", "order-list-body")

	ingredients.forEach(ingredient => {
		const li = document.createElement("li");
		li.appendChild(createSpan(ingredient));
		ul.appendChild(li);
	});

    return ul;
};

const createOrderListFoot = function(qty, totals) {
    const ul = document.createElement("ul");
    ul.setAttribute("class", "order-list-foot");

    ul.appendChild(createListItemEl(createSpan("Qty")));
    ul.appendChild(createListItemEl(createSpan(qty)));
    ul.appendChild(createListItemEl(createSpan("Total")));
    ul.appendChild(createListItemEl(createSpan(totals)));

    return ul;
};

export { createOrderList, removeOrderList };
