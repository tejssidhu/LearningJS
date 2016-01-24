//main.js
require(["Order"], function (Order) {
	var o = new Order(1, "A Customer");
	alert(o.id);
	alert(o.customer.name);
});