
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    //reject(new Error('Woops'));
    resolve('done'); // resolve/reject ожидает только один аргумент
  }, 1000);
});

// promise.then(
//   result => console.log(result),
//   error => console.log(error)
//   );

  // или - ЕСЛИ МЫ ЗАИНТЕРЕСОВАНЫ ТОЛЬКО В РЕЗУЛЬТАТЕ УСПЕШНОГО ВЫПОЛНЕНИЯ ЗАДАЧИ:
promise.then(console.log); 