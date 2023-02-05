
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



// ---------------------------- ДЗ 2 - МОЕ РЕШЕНИЕ
// Напишите программу, которая будет принимать на вход несколько аргументов: дату и время в
// формате «час-день-месяц-год». Задача программы — создавать для каждого аргумента
// таймер с обратным отсчётом: посекундный вывод в терминал состояния таймеров (сколько
// осталось). По истечении какого-либо таймера, вместо сообщения о том, сколько осталось,
// требуется показать сообщение о завершении его работы. Важно, чтобы работа программы
// основывалась на событиях.

// ЗДЕСЬ ВВОД ДАТЫ В ВИДЕ 10 10 03 2023

import EventEmitter from 'events';
import colors from 'colors';


let [hour, day, month, year] = process.argv.slice(2);

const timer = {
hour: Number(hour),
day: Number(day),
month: Number(month),
year: Number(year),
};

const timerDate = new Date(timer.year, timer.month-1, timer.day, timer.hour);

class TimerInfo {
  constructor(type, payload) {
    this.type = type;
    this.payload = payload; }
  }

class MyEmitter extends EventEmitter {};
const emitterObject = new MyEmitter();

const delay = () => {
  return new Promise((resolve, reject) => {
  setTimeout(resolve, 1500);
  });
};

const getDaysInMonth = () => {
  return new Date(timer.year, timer.month, 0).getDate();
};

const getDaysInCurrentMonth = (year, month) => {
  return new Date(year, month, 0).getDate();
};

const checkTimer = () => {

  let type = null;
  let info = {
    hours: null,
    days: null,
    months: null,
    years: null
  };

  const now = new Date();
  console.log(now);

  const currentDate = {
    currentHour: now.getHours(),
    currentDay: now.getDate(),
    currentMonth: now.getMonth() + 1,
    currentYear: now.getFullYear(),
  };

    if (currentDate.currentHour > timer.hour) {
      info.hours = 24 - currentDate.currentHour + timer.hour ;
      info.days = timer.day - currentDate.currentDay - 1;
      if (info.days < 0) {
        info.days = getDaysInCurrentMonth(currentDate.currentYear, currentDate.currentMonth) - currentDate.currentDay + timer.day - 1;
        info.months = timer.month - currentDate.currentMonth - 1;
      }
    } else {
      info.hours = timer.hour - currentDate.currentHour;
      info.days = timer.day -currentDate.currentDay;
      info.months = timer.month - currentDate.currentMonth;
    }
    info.years = timer.year - currentDate.currentYear;

  if (currentDate.currentYear > timer.year || 
      timer.month > 12 ||
      timer.month <= 0 || 
      timer.day > 31 ||
      info.days < 0 ||
      timer.day > getDaysInMonth() ||
      now > timerDate ||
      timer.day <= 0) {
      type = 'out';
  } else if (info.hours === 0 &&
             info.days === 0 &&
             info.months === 0 &&
             info.years === 0) {
      type = 'stop';
  } else {
      type = 'inWork';
  }
  console.log(info)

  return delay().then(() => {
    let timerInfo = new TimerInfo(type, info);
    return (timerInfo);
  });

}

class Handler {
  static inWork(payload) {
    console.log(`Time to stop: ${payload.hours} hours - ${payload.days} days - ${payload.months} months - ${payload.years} years`);
  }
  static stop() {
    console.log(colors.bgCyan('Stop'));
  }
  static out() {
  console.log(colors.red('Out of Timer'));
  }
}

emitterObject.on('inWork', Handler.inWork);
emitterObject.once('out', Handler.out);
emitterObject.once('stop', Handler.stop);

// ВОТ В ТАКОМ ВИДЕ НЕ РАБОТАЕТ
  // const run = () => {
  //   checkTimer().then(
  //     (timerInfo) => emitterObject.emit(timerInfo.type, timerInfo.payload)
  //     )
  //   if (timerInfo.type !== 'inWork') {
  //     return;
  //   }

  //   .then(() => run()); НУЖНО ВОТ ТАК, НО ТОГДА БЕЗ ПРЕДЫДУЩЕГО IF
    
  // };

const run = async () => {
  const timerInfo = await checkTimer(); 
  emitterObject.emit(timerInfo.type, timerInfo.payload);
  if (timerInfo.type !== 'inWork') {
    return;
  }
  run(); 
};

run();


// ---------------------------- ДЗ 2 - РЕШЕНИЕ С УРОКА
// НО ДАТУ ВВОДИМ В ВИДЕ 10-10-03-2023
import EventEmitter from "events";

class TimerEmmiter extends EventEmitter {};
const emitter = new TimerEmmiter();

//получаем параметры в массиве  от emitter.emit, и используем деструктивное присваивание
emitter.on('timerTick', ([dateInFuture, timer]) => {
    const dateNow = new Date();
    if (dateNow >= dateInFuture) {
        emitter.emit('timerEnd', timer); // Если некорректная дата - запуск события на стоп и передать туда инфо о setInterval
    } else {
        console.log(getPrettyTime((dateInFuture - dateNow) / 1000), ' left');
    }
});

// А вот здесь происходит остановка и clearinterval
emitter.on('timerEnd', timer => {
    clearInterval(timer)
    console.log('Time is up!')
});


// (dateInFuture - dateNow) / 1000 - это передаем время уже в секундах
// Перевести секунды в часы-дни-месяцы-года
const getPrettyTime = (seconds) => {
    const arr = [
        Math.floor(seconds % 60),
        Math.floor((seconds / 60) % 60),
        Math.floor((seconds / (60 * 60)) % 24),
        Math.floor(seconds / (60 * 60 * 24)),
    ]

    return `${arr.pop()} days ${arr.pop()} hours ${arr.pop()} minutes ${arr.pop()} seconds`;
    // Возвращает результат в виде "54 days 11 hours 15 minutes 12 seconds  left"
}


//Здесь для setInterval используется не стрелочная ф-ция, а обычноая декларация,
// потому что далее используется this, который даст ссылку на эту самую ф-цию,
// чтобы можно было ее заглушить - это вместо clearTimeout, пришлось бы потом кудато-то
//передавать id этого процесса
const start = (dateInFuture) => {
    setInterval(function() {
        emitter.emit('timerTick', [dateInFuture, this]) //передаем параметры в массиве
    }, 1000)
}



for (const arg of  process.argv.slice(2)) {
  const [hour, day, month, year] = arg.split('-')
  const dateInFuture = new Date(year, month - 1, day, hour)
  if (isNaN(dateInFuture)) continue
  start(dateInFuture)
}

//----------------------------

// let y = {
//   name: (String.fromCharCode('e'.charCodeAt(0)+1) + 'a') + "()",
// }
const fancyRobot = () => console.log(111)


// console.log(String.fromCharCode(102))
//let str = "FancyRobot"; str = str[0].toLowerCase() + str.slice(1); eval(str+"(String(398+10))");

const elegantRobot = (arg) => console.log(arg)


// console.log(String.fromCharCode(102))

//let str = "elegantR" + "\x6F" + "b" + "\x6F" + "t";


//str = 'elegantR' + x.toLowerCase() + 'b' + x.toLowerCase() + 't'; eval(str+"('408')");



let str = "elegantR" + "\x6F" + "b" + "\x6F" + "t"; eval(str+"('1')");
console.log(str)
//-----------------------------------