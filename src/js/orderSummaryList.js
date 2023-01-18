import { removeChildren, createListItemEl, createSpan, addIcon } from "./utils/DOMutils.js";

const createOrderList = function(orderList, orderListValsArr, delListener) {
    orderListValsArr.forEach(orderListVals => {
	    const orderListItem = createOrderListItem(orderListVals, delListener);
        orderList.appendChild(orderListItem);
	}); 
};

const removeOrderList = function(orderList) {
    removeChildren(orderList);
};

const createOrderListItem = function(orderListVals, delListener) {
    const li = document.createElement("li");

    const listHdr = createOrderListHdr(orderListVals.name, delListener);
    li.appendChild(listHdr);

    const listBody = createOrderListBody(orderListVals.ingredients);
    li.appendChild(listBody);

    const listFoot = createOrderListFoot(orderListVals.qty, orderListVals.totals);
    li.appendChild(listFoot);

    return li;
}

const createOrderListHdr = function(recipe_name, delListener) {
    const ul = document.createElement("ul");
    ul.setAttribute("class", "order-list-hdr");

    const span = createSpan(recipe_name);	
    ul.appendChild(createListItemEl(span));

    const iconLI = document.createElement("li");
    addIcon(iconLI, "xmark");
    iconLI.setAttribute("class", "order-list-delete");
    iconLI.addEventListener("click", delListener)
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
