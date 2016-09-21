// MISC //

const exec = require('child_process').exec;
const chalk = require('chalk');
const snake = require('to-snake-case');

const kneelingCamelize = (str) => {
  return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(letter, index) {
    return index == 0 ? letter.toLowerCase() : letter.toUpperCase();
  }).replace(/\s+/g, '');
};

const Camelize = (str) => {
  return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(letter) {
    return letter.toUpperCase();
  }).replace(/\s+/g, '');
};

const npmRoot = (callback) => {
  let npmRootPath = Util.exec('npm root -g');
  // Async call to create file
  npmRootPath.stdout.on('data', (data) => {
    callback(data.toString().trim());
  });
};

const iterateName = (name, callback) => {
  let command = `if [ -d ./servers/${name} ]; then echo 'Exists'; else echo ''; fi`;
  let exists = exec(command).stdout.on('data', function(msg){
    if (msg.length > 1){
      let newName = name.split('-');
      if (newName.length === 1) iterateName(`${name}-2`, callback);
      else {
        let num = parseInt(newName[1]) + 1;
        newName = newName[0] + '-' + num.toString();
        iterateName(newName, callback);
      }
    } else callback(name, 'lone');
  });
};

// Export

let Util = {
  exec: exec,
  chalk: chalk,
  snake: snake,
  kneelingCamelize: kneelingCamelize,
  Camelize: Camelize,
  npmRoot: npmRoot,
  iterateName: iterateName
};

module.exports = Util;
