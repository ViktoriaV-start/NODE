
module.export = function func() {
  console.log(555);
}







//****************** Lesson 1
// const userName = 'Alex';
// console.log(`Hello, ${userName}`);


//****************** Lesson 1 - homework
// ПОЛУЧИТЬ ВСЕ ПРОСТЫЕ ЧИСЛА В ЗАДАННОМ ИНТЕРВАЛЕ
// И ВЫВЕСИ ИХ С ЧЕРЕДОВАНИЕМ ЦВЕТА - КРАСНЫЙ-ЖЕЛТЫЙ-ЗЕЛЕНЫЙ

// import colors from 'colors';


// const clr = ['red', 'yellow', 'green'];
// let relation = [true, false, false,];

// const args = process.argv.slice(2);
// let min = +args[0];
// let max = +args[1];

// if(min > max) {
//   min = +args[1];
//   max = +args[0]
// }



// function checkValue(el) {
//   if(el) return true;
//   return false;
// }

// function checkNum(num) {
//   for (let i = 2; i <= Math.ceil(num/2); i++) {
//     if (num % i === 0) return false;
//   }
//   return num;
// }

// function getPrime(min, max) {
//   if (isNaN(min) || isNaN(max)) {
//     console.log('No prime numbers');
//     return;
//   }
  
//   let arr = [];

//   for (let i = min; i <= max; i++){
//     if (i <= 1) continue;
//     let result = checkNum(i);
//     if(result) {
//       arr.push(result);
//     }
//   }

//   if (arr.length === 0) {
//     console.log('No prime numbers')
//   } else {
//     arr.forEach((el) => {
//       showWithColor(el);
//     });
//   }
// }

// function showWithColor(el) {

// let idx = relation.findIndex(checkValue);
// console.log(colors[clr[idx]](el), clr[idx]);

// relation[idx] = false;

// if ( idx < (relation.length-1) ) {
//   relation[idx+1] = true;
// } else {
//   relation [0] = true;
// }
// }

// getPrime(min, max);


//****************** Lesson 2 - ЦИКЛ СОБЫТИЙ
console.log('Record 1');

setTimeout(() => { 
  console.log('Record 2');
  Promise.resolve().then(() => {

    setTimeout(() => {

      console.log('Record 3');

      Promise.resolve().then(() => {
      console.log('Record 4');
      });
    }); 
  });
});


console.log('Record 5');
Promise.resolve().then(() => Promise.resolve().then(() => console.log('Record 6')));




//****************** Lesson 2 - new Promise
var promise = new Promise(function(resolve, reject) {
  setTimeout(() => {
    resolve("foo");
  }, 5300);

});

promise
.then(console.log(1)) // задержки нет
.then((val) => console.log(val)); // задержка есть



//****************** Lesson 2 - 

// ЗАДАЧА:
// В МФЦ приходят посетители с разными типами запросов.
// Смоделировать приход посетителей через рандомные промежутки времени с различными рандомными типами запросов.
// Обработать запросы клиента:

import EventEmitter from 'events';


const requestTypes = [ {
  type: 'send',
  payload: 'to send a document' },
  {
  type: 'receive',
  payload: 'to receive a document'
  }, {
  type: 'sign',
  payload: 'to sign a document' }
  ];

class Customer {
  constructor(params) {
    this.type = params.type;
    this.payload = params.payload; }
  }

const generateIntInRange = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const delay = (ms) => {
  return new Promise((resolve, reject) => {
  setTimeout(resolve, ms);
  });
};

const generateNewCustomer = () => {
  const intervalValue = generateIntInRange(1, 5) * 1000;
  const params = requestTypes[generateIntInRange(0, 2)];
  return delay(intervalValue).then(() => new Customer(params));  
  // получить задержку и после - создать нового посетителя с новой задачей
}

class Handler {
  static send(payload) {
    console.log('Send request');
    console.log(`Customer needs ${payload}`);
  }
  static receive(payload) {
    console.log('Receive request');
    console.log(`Customer needs ${payload}`);
  }
  static sign(payload) {
  console.log('Sign request');
  console.log(`Customer needs ${payload}`); 
  }
  static pay() {
    console.log(`Customer needs to pay for the services`);
    }
  static once() {
      console.log('Once');
    }
}
  
//  Для генерации событий и создания их обработчиков используется специальный объект — эмиттер событий.
// Для него требуется создать класс-наследник класса EventEmitter, затем сделать его экземпляр:
class MyEmitter extends EventEmitter {};
const emitterObject = new MyEmitter();

emitterObject.on('send', Handler.send);  //при появлении события send его будет обрабатывать функция send() класса Handler
emitterObject.on('send', Handler.pay);
// Класс EventEmitter также даёт возможность выполнить обработчик один раз,
// а потом автоматически снять его с регистрации.
//Для этого он предоставляет метод once, используемый вместо on:
emitterObject.once('send', Handler.once);

emitterObject.on('receive', Handler.receive);
emitterObject.on('sign', Handler.sign);


//  Для генерации события используем метод emit() объекта-эмиттера событий.
// Первым аргументом в него передадим название события.
// Второй аргумент (необязательный) — это данные, которые мы хотим передать обработчику события.
// Эти данные поступают в соответствующую функцию-обработчик события класса Handler и доступны там в переменной payload.
// Если потребуется, можно передавать не один, а несколько аргументов с данными.
// Они станут доступны в соответствующем обработчике в том же порядке, в каком и переданы.
generateNewCustomer().then(
  customer => emitterObject.emit(customer.type, customer.payload)
  );





