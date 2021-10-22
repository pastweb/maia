export default function (stylesArr, ...args) {
  return `${args.map((arg, i) => `${stylesArr[i]}${arg}`).join('')}${stylesArr[args.length]}`;
  
  // return filePath => {
  //   this.filePath = filePath;
  //   return this;
  // };

  // return this.css;
}
