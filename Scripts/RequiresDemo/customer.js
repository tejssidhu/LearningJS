//customer.js
define([], //Required scripts (None)
	function () { //get require objects in order
		function Customer(name) {
			this.name = name;
		}

		return Customer; //return the object that Requires constructoer to allow you to call
	}
);