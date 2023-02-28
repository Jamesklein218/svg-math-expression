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
console.log(JSON.stringify(process(/* svg string goes here */)));

