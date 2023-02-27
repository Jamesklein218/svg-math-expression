let str = 'M69.7018 47V15.704C69.7018 6.104 64.4538 0.471996 55.1098 0.471996H50.6298V8.6H55.1098C59.3338 8.6 61.6378 11.096 61.6378 15.704V47H69.7018Z'
let cmpStr = 'M19.608 47V15.704C19.608 6.104 14.36 0.471996 5.016 0.471996H0.536V8.6H5.016C9.24 8.6 11.544 11.096 11.544 15.704V47H19.608Z'

let arr = []

let min = 100000, max = 0;

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
      if (arr[arr.length - 1] < min) min = arr[arr.length - 1];
      if (arr[arr.length - 1] > max) max = arr[arr.length - 1];
    } else {
      newStr += ` ${s[i]} `;
    }
  }
  return newStr;
}

str = addSpace(str).split(' ').filter((elem) => elem !== '');
cmpStr = addSpace(cmpStr).split(' ').filter((elem) => elem !== '');

console.log(`"${process(str, cmpStr)}"`);
console.log('padding', min)
console.log('width', max - min)
console.log(arr)
