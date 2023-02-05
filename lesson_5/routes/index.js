import users from '../endpoints/users.js'

export default {
  "/": () => `<h1>Hello world!</h1>`,
  "/users": users,
  "/users/:id": users,
  "/users/:id/age": users
};
