//https://app.pluralsight.com/player?course=js4cs&author=shawn-wildermuth&name=js4cs-m1-basics&clip=11&mode=live

//type coalescing
console.log("1 == 1 " + (1 == 1)); //true
console.log("1 == '1' " + (1 == "1")); //true
console.log("1 === '1' " + (1 === "1")); //false
console.log("1 !== '1' " + (1 !== "1")); //true

//special types
var a = null;
console.log("a: " + a);
var b = c;
console.log("b: " + b);

//values types
var a = typeof 1; //"number"
console.log("a: " + a);
var b = typeof 1.0; //"number"
console.log("b: " + b);
var c = typeof true; //"boolean"
console.log("c: " + c);
var d = typeof false; //"boolean"
console.log("d: " + d);
var e = typeof "hello world"; //"string"
console.log("e: " + e);

//number type
var a = 1;   //integer
var b = 1.5; //floating
var c = 070; //integer (in octal) (starts with "0")
var d = 0xffff; //integer in hex (starts with "0x")
var e = 1.34e6; //Scientifc Notation (1340000)
var f = 10.0; //integer optimisation - stores as integer

var a = Number.MIN_VALUE;
var a = Number.MAX_VALUE;
var c = Number.POSITIVE_INFINITY;
var c = Number.NEGATIVE_INFINITY;
var fail = 10 / "zero"; // Not a number (Nan)
var test1 = NaN == NaN;  //false, NaN can't equal it self
var test2 = isNaN(NaN); //true how to check for Not a Number
var test3 = isNaN(fail); //true
var test4 = isNaN(10); //false
var test5 = isNaN("10"); //false
var test6 = isNaN("fail"); //true

//boolean
if (true) { } //true
if (false) { } //false
if ("hello") { } //true as any string with characters in it is return as true
if ("") { } //false as any string with no characters in it is return as false
if (25) { } //true non zero numbers
if (0) { } //false zero numbers
if (10 / 0) { } //NaN returns false

var a = null;
if (a) { }  //null returns false
if (c) { }  //undefined returns false

//String type
var s = "String";   //simple Strings
var t = 'String';   //Either delimiter

//JS String is immutable - unchanging over time - any methods that alter a string actual will create a new String variable to hold the altered value
var u = "One" + "Two";  //Immutable
var single = u[3];      // 'T'

console.log(u.length);   // 6
//js supports unicode - stores each character using 2 bytes
var d = "עברית"; //5 characters
console.log(d.length);   // 10 (count of 10 bytes)

//reference types
var a = new Object();	// "object"
var b = new Array();	// "object"

//anything that can be treated as an Array will return typeof Array

//shortcut for creating data structures
var data = {
	name: "hello",
	"some value": 1 //properties can contain spaces - just need to wrap with spaces
};

var more = {
	"moniker": "more data",
	height: 6.0,
	subData: { //properties can be objects too 
		option: true,
		flavour: "vanilla"
	}
};

//Array
var array = ["hello", "goodbye"]; //array consisting of 2 strings
var coll = [{ // array consisting of 1 element
	"moniker": "more data",
	height: 6.0,
	subData: {
		option: true,
		flavour: "vanilla"
	}
}];

//Arrays are Untyped

var c = [];
c.length; //0
c.push({});			//add element to the end of Array
var obj = c.pop()	//remove from end
c.shift();			//remove from beginning
c.unshift({});		//add to beginning

var where = c.indexOf(obj); //positional access - find position of obj in array
where = c.lastIndexOf(obj);

//etc. slice, splice, concat

//Functions - are data types

//defining
var f = function (arg1, arg2) {

};
//calling
f(1,2)length

//creating functions of objects, sing is a function of o
var o = {
	name: "Tej",
	sing: function (song) {
	}
};
o.sing("happy birthday");
