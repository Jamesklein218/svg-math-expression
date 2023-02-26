let str = 'M63.753 17.432V12.056H27.657V17.432H63.753ZM63.753 34.712V29.336H27.657V34.712H63.753Z'
let cmpStr = 'M36.128 5.432V0.0559998H0.0320001V5.432H36.128ZM36.128 22.712V17.336H0.0320001V22.712H36.128Z'

let arr = []

const addSpace = (str) => {
  let newStr = ''
  for (let i = 0; i < str.length; i++) {
    if (str[i].match(/[A-Z]/i)) {
      newStr += ' ';
      newStr += str[i];
      newStr += ' ';
    } else {
      newStr += str[i];
    }
  }
  return newStr;
}

const process = (s, cmp) => {
  let newStr = '';
  let count = 0;
  for (let i = 0; i < str.length; i++) {
    if (s[i] !== cmp[i]) {
      newStr += ` {} `;
      count++;
      arr.push(Number(cmp[i]));
    } else {
      newStr += ` ${s[i]} `;
    }
  }
  return newStr;
}

str = addSpace(str).split(' ').filter((elem) => elem !== '');
cmpStr = addSpace(cmpStr).split(' ').filter((elem) => elem !== '');

console.log(`"${process(str, cmpStr)}"`);
console.log(arr)
