const addSpace = (str) => {
  let newStr = "";
  for (let i = 0; i < str.length; i++) {
    if (str[i].match(/[A-Z]/i)) {
      if (i !== 0) newStr += " ";
      newStr += str[i];
      if (i !== str.length - 1) newStr += " ";
    } else {
      newStr += str[i];
    }
  }
  return newStr;
};

const process = (stringSVG) => {
  // Split by "
  let stringSVGArray = stringSVG.split('"');

  // Get the path in d value of the <path> tag using pattern " d="
  let path = stringSVGArray.reduce((res, el, index, arr) => {
    if (el.includes(" d=") && index < arr.length - 1) {
      res += arr[index + 1];
    }
    return res;
  }, "");
  // String processing
  path = path.toUpperCase();
  path = addSpace(path);

  // Parsing
  let command = "M",
    index = 0;
  let pathArray = path.split(" ");
  let result = {
    padding: 100000000, // Act as the mininum x values in d attributes
    width: 0, // Full width - padding * 2
    formatString: "",
    formatValues: [],
  };
  for (let i = 0; i < pathArray.length; i++) {
    if (pathArray[i].trim() == '') {
      continue;
    } else if (pathArray[i].match(/[A-Z]/i)) {
      command = pathArray[i];
      if (command === 'V') {
        index = 1;
      } else {
        index = 0;
      }
      result.formatString += (pathArray[i] + ' ');
    } else {
      if (index % 2 === 0) {
        result.formatString += "{} ";
        let x = Number(pathArray[i]);
        result.formatValues.push(x);
        if (x < result.padding) result.padding = x;
        if (x > result.width) result.width = x;
      } else {
        result.formatString += (pathArray[i] + ' ');
      }
      index++;
    }
  }

  result.width -= result.padding;

  // Set precision
  result.padding = Number(result.padding.toFixed(5));
  result.width = Number(result.width.toFixed(5));

  return result;
};
console.log(JSON.stringify(process(`<svg width="35" height="81" viewBox="0 0 35 81" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M17.5018 36.72C16.3498 36.72 15.3684 36.336 14.5578 35.568C13.7898 34.7573 13.4058 33.7973 13.4058 32.688C13.4058 31.536 13.7898 30.576 14.5578 29.808C15.3684 28.9973 16.3498 28.592 17.5018 28.592C18.6538 28.592 19.6138 28.9973 20.3818 29.808C21.1924 30.576 21.5978 31.536 21.5978 32.688C21.5978 33.7973 21.1924 34.7573 20.3818 35.568C19.6138 36.336 18.6538 36.72 17.5018 36.72ZM3.61375 42.416H31.3898V46.896H3.61375V42.416ZM17.5018 60.72C16.3498 60.72 15.3684 60.336 14.5578 59.568C13.7898 58.7573 13.4058 57.776 13.4058 56.624C13.4058 55.5147 13.7898 54.576 14.5578 53.808C15.3684 52.9973 16.3498 52.592 17.5018 52.592C18.6538 52.592 19.6138 52.9973 20.3818 53.808C21.1924 54.576 21.5978 55.5147 21.5978 56.624C21.5978 57.776 21.1924 58.7573 20.3818 59.568C19.6138 60.336 18.6538 60.72 17.5018 60.72Z" fill="black"/>
</svg>
`)));

