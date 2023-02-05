

const a = 'usercookie=panther1675591347426';
const b = 'usercookie=panther1675591347426; ll=123';


const ip = 'usercookie=';
const regexpSearch = new RegExp(`(${ip})(.)+`);
     // const regexpIp = new RegExp(`${ip}`, 'gm');
      //const logs = chunk.toString().match(regexpSearch)?.toString().replace(regexpIp, `\n${ip}`);

let q = b.search(/\busercookie=(.)+\b/);

let search = b.match(/\busercookie.+;/);
// console.log(search[0].slice(11, -1))


console.log(b.match(/usercookie/))


// console.log(b.match(/;/))

//(`^(${ip}) (.)+`, 'gm');