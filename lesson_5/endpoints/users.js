// ЭТО КОНТРОЛЛЕР - ОБРАБОТКА РАЗНЫХ ЗАПРОСОВ

const users = [
  { name: "Anton", age: 25, id: 1 },
  { name: "Sergei", age: 34, id: 2 },
  { name: "Elena", age: 30, id: 3 },
];

export default {
  get(params, queries) { // ПОЛУЧИТЬ ДАННЫЕ
    if (params) {
        return (
        users.find((item) => item.id === +params.id) || {
            status: "User not found",
        }
        )
    }
    return users;
  },
  post(params, queries, body) { // ЭТО ДОБАВЛЕНИЕ ПОЛЬЗОВАТЕЛЯ
    if (typeof body === 'object') { console.log(body)
        const id = users.length + 1;
        body.id = id;
        users.push(body);
        console.log(users);
    }
    return {status: 'success'};
  },
  put(params, queries, body) {  // ИЗМЕНИТЬ ДАННЫЕ
    if (params && params.id) {
      const user = users.find((item) => item.id === +params.id)
      if (user) user.name = body.name
    }
    return {status: 'success'}
  }
};
