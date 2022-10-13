import { createListItemEl, createSpan, addIcon } from "./DOMutils.js";

const createOrderList = function() {
    const li = document.createElement("li");

    const listHdr = createOrderListHdr();
    li.appendChild(listHdr);

    const listBody = createOrderListBody();
    li.appendChild(listBody);

    const listFoot = createOrderListFoot();
    li.appendChild(listFoot);

    return li;
}

const createOrderListHdr = function() {
    const ul = document.createElement("ul");
    ul.setAttribute("class", "order-list-hdr")

    const span = createSpan("Recipe Name");	
    ul.appendChild(createListItemEl(span));

    const iconLI = document.createElement("li");
    iconLI.addEventListener("click", function() {
	    alert("clicked");
	});
    addIcon(iconLI, "xmark");
    ul.appendChild(iconLI)

    return ul;
};

const createOrderListBody = function() {
    const ul = document.createElement("ul");
    ul.setAttribute("class", "order-list-body")

	const ingredientsArr = ["egg", "bread", "butter"];
    	ingredientsArr.forEach(ingredient => {
		    const li = document.createElement("li");
		    li.appendChild(createSpan(ingredient));
		    ul.appendChild(li);
		});

    return ul;
};

const createOrderListFoot = function() {
    const ul = document.createElement("ul");
    ul.setAttribute("class", "order-list-foot");

    ul.appendChild(createListItemEl(createSpan("Qty")));
    ul.appendChild(createListItemEl(createSpan("2")));
    ul.appendChild(createListItemEl(createSpan("Total")));
    ul.appendChild(createListItemEl(createSpan("5.35")));

    return ul;
};

export { createOrderList };
