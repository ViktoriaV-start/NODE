import colors from 'colors';


const clr = ['red', 'yellow', 'green'];
let relation = [true, false, false,];

const args = process.argv.slice(2);
let min = +args[0];
let max = +args[1];

if(min > max) {
  min = +args[1];
  max = +args[0]
}



function checkValue(el) {
  if(el) return true;
  return false;
}

function checkNum(num) {
  for (let i = 2; i <= Math.ceil(num/2); i++) {
    if (num % i === 0) return false;
  }
  return num;
}

function getPrime(min, max) {
  if (isNaN(min) || isNaN(max)) {
    console.log('No prime numbers');
    return;
  }
  
  let arr = [];

  for (let i = min; i <= max; i++){
    if (i <= 1) continue;
    let result = checkNum(i);
    if(result) {
      arr.push(result);
    }
  }

  if (arr.length === 0) {
    console.log('No prime numbers')
  } else {
    arr.forEach((el) => {
      showWithColor(el);
    });
  }
}

function showWithColor(el) {

let idx = relation.findIndex(checkValue);
console.log(colors[clr[idx]](el), clr[idx]);

relation[idx] = false;

if ( idx < (relation.length-1) ) {
  relation[idx+1] = true;
} else {
  relation [0] = true;
}
}

getPrime(min, max);







