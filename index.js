import EventEmitter from 'events';
import colors from 'colors';


let [hour, day, month, year] = process.argv.slice(2);

const timer = {
hour: Number(hour),
day: Number(day),
month: Number(month),
year: Number(year),
};

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
}

const checkTimer = () => {

  let type = null;
  let info = {
    hours: null,
    days: null,
    months: null,
    years: null
  };

  const now = new Date();

  const currentDate = {
    currentHour: now.getHours(),
    currentDay: now.getDate(),
    currentMonth: now.getMonth() + 1,
    currentYear: now.getFullYear(),
  };

    if (currentDate.currentHour > timer.hour) {
      info.hours = 24 - currentDate.currentHour + timer.hour ;
      info.days = timer.day - currentDate.currentDay - 1;
    } else {
      info.hours = timer.hour - currentDate.currentHour;
      info.days = timer.day -currentDate.currentDay;
    }

    info.months = timer.month - currentDate.currentMonth;
    info.years = timer.year - currentDate.currentYear;

  if (currentDate.currentYear > timer.year || 
      timer.month > 12 ||
      timer.month <= 0 || 
      timer.day > 31 ||
      info.days < 0 ||
      timer.day > getDaysInMonth() ||
      currentDate.currentDay > timer.day ||
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
  //   // if (timerInfo.type !== 'inWork') {
  //   //   return;
  //   // }

  //   run();
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

