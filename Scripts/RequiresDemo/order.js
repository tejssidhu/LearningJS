//order.js
define(["Customer"], //Required scripts (Customer)
	function (Customer) { //get require objects in order
		function Order(id, custName) {
			this.id = id;
			this.customer = new Customer(custName);
		}

		return Order; //return the object that Requires constructoer to allow you to call
	}
);