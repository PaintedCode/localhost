// https://www.w3resource.com/javascript-exercises/javascript-recursion-function-exercise-3.php

// 1. Write a JavaScript program to calculate the factorial of a number.
// https://www.w3resource.com/javascript-exercises/javascript-recursion-function-exercise-1.php

function  factorial (int) {
  
  if (int < 2) {
    return 1   
  } else {
    return int * factorial (int-1)
  }
}


// 2. Write a JavaScript program to find the greatest common divisor (gcd) of two positive numbers.  
// 
// https://www.w3resource.com/javascript-exercises/javascript-recursion-function-exercise-2.php

//  downloaded answer  

var gcd = function(a, b) {
    if ( ! b) {
        return a;
    }
    return gcd(b, a % b);
};


// 3. Write a JavaScript program to get the integers in range (x, y). 
// Example : range(2, 9)
// Expected Output : [3, 4, 5, 6, 7, 8]
// https://www.w3resource.com/javascript-exercises/javascript-recursion-function-exercise-3.php
   

  function range (start_num, end_num) 
  {
    if (end_num - start_num === 2) {return [start_num + 1]}   // base case
    else 
    {
      var list = range(start_num, end_num - 1); // recursive call
      list.push(end_num - 1);                   // executes after base case returns true
      return list;                              // loops to line above until recursion completes
    }
  };
  

// 4. Write a JavaScript program to compute the sum of an array of integers. 
// Example : var array = [1, 2, 3, 4, 5, 6]
// Expected Output : 21 
// https://www.w3resource.com/javascript-exercises/javascript-recursion-function-exercise-4.php

function sumArray (arr) {

if (arr.length === 1) {return arr[0]}
else {return arr[0] + sumArray(arr.slice(1))}
}

// 5. Write a JavaScript program to compute the exponent of a number. 
// Note : The exponent of a number says how many times the base number is used as a factor.
// 82 = 8 x 8 = 64. Here 8 is the base and 2 is the exponent.
// https://www.w3resource.com/javascript-exercises/javascript-recursion-function-exercise-5.php

function exponent (base,exp) {

  if (exp === 1) {return base}
  else {return base * exponent (base,exp-1)}
}


// 6. Write a JavaScript program to get the first n Fibonacci numbers. 
// Note : The Fibonacci Sequence is the series of numbers: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, . . . 
// Each subsequent number is the sum of the previous two.
// https://www.w3resource.com/javascript-exercises/javascript-recursion-function-exercise-6.php


function fibonacciArray (int) {

  if (int < 2) {return 1} 
  if (int === 2) {return [0,1,1]}
  else {
    fib = fibonacciArray (int-1)
    fib.push ( fib[fib.length-2] + fib[fib.length-1] )
    return fib
  }
  }

  // 6a. Write a JavaScript program to get the Fibonacci number at position n. 

  function fibonacci (int) {

    if (int < 2) {return 1} 
    if (int === 2) {return 1}
    else {return fibonacci (int-1) + fibonacci (int-2)}
    }

// 7. Write a JavaScript program to check whether a number is even or not.
// https://www.w3resource.com/javascript-exercises/javascript-recursion-function-exercise-7.php

function even (int) {

  if (int%2 === 0){return true}
  else {return false}
}



// 8. Write a JavaScript program for binary search.
// https://www.w3resource.com/javascript-exercises/javascript-recursion-function-exercise-8.php

function binary (int) {

  if (int%2 === 0){return int}
  else {return int}
}

// 9. Write a merge sort program in JavaScript. Go to the editor
// Sample array : [34,7,23,32,5,62]
// Sample output : [5, 7, 23, 32, 34, 62]
// https://www.w3resource.com/javascript-exercises/javascript-recursion-function-exercise-9.php



function smallestInt(numArray) 
{
    var nums = numArray.slice();                    // preserve original array

    if (nums.length == 1) { return nums[0]; }       // base case
    
    if (nums[0] > nums[1]) { nums.splice(0,1); }    // remove first element if larger
    else { nums.splice(1,1); }                      // or remove second element if larger

    return smallestInt(nums);                         // recursive call
}



function flatten(arr) {

// console.log (arr)

return arr.reduce(function (a,b){return a.concat(b)},[])

//  return Array.isArray(array) ? [].concat.apply([], array.map(flatten)) : array;
 
}

function reverseStr (str) {

  if (str.length <= 1) {return str}
  else {return reverseStr(str.substr(1)) + str.charAt(0);}

}
 

function digitCounter (number,int) {

  var numberStr = number.toString();
  var testStr = int.toString();  
  var counter = 0;

  var digitCounterLoop = function  (numberStr,testStr) {

    if (numberStr.length ===0) {return}
    else {
      if (numberStr[0]===testStr){
        counter++
      }
      digitCounterLoop(numberStr.slice(1),testStr)
    }

  }
  digitCounterLoop(numberStr,testStr)
  return counter
}

function removeChar (str) {

  var char = [];
  var result = [];

  var charLoop = function (str) {

    if (str.length === 0 ) {return}
    else {
      //console.log (char, str[0], char.indexOf(str[0]) )
      if (char.indexOf(str[0]) < 0 ) {
        char.push(str[0]);
        result.push(str[0]);
      } 
      charLoop(str.slice(1))
    }
  }
  charLoop (str)
  return result.join('')
}


function arrayObject (obj){

  return Object.keys(obj).map(function(item){return item + ' = ' + obj[item].first})
 
}









function Admin (name) {
  User.call(this,name) 
  this.admin = true
  //Admin.prototype.users.push(this)

}

Admin.prototype = Object.create(User.prototype);
Admin.prototype.construction = Admin
Admin.prototype.users = [];

Admin.prototype.displayAllUsers = function () {
  this.users.forEach( function (user){
    console.log (user.name)
  });
} 
function User(name) {

  this.name = name ;
  this.company  = '';
  this.arr      = [];
  this.obj      = {};
  Admin.prototype.users.push(this);

}

User.prototype.setUserName = function (name) {
  this.name = name
  return "The user name is set to: " + this.name
}

User.prototype.displayUserName = function () {
  return "displayUser is : " + this.name
}

var jeff = new User();
jeff.setUserName("Jeff");
//jeff.displayUserName()

var ann = new User('ann');
ann.displayUserName()
ann.setUserName("Ann");
//ann.displayUserName()

var jeffadmin = new Admin('jeffAdmin');
jeffadmin.displayAllUsers();
//ann.displayAllUsers();




function sumNums (a,b){
  return a+b;
}

function sum3X (a,b) {
  var result = 0;
  for ( i=0; i< 3; i++){
      result += sumNums(a,b)
  }
  return result
}

var x = sum3X(2,3)


function palindrome (str) {

if (str.length < 2 ) {return str}
else { return  palindrome(str.slice(1)) + str[0]}

}
