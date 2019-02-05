import { Factory } from "ember-cli-mirage";



export default Factory.extend({

  id(i) {
   return i+1;
  },
  title(i) {
    let titles=[
      "Viacheslav",
      "Vlad",
      "Vi'acheslav",
      "Pavlo"
      ];
    return titles[i%4];
  },
  description(i) {
    return `Exercise ${i + 1} description`;
  },
  type(i){
    if(i%2==0)return "matching";
    else
    return "texting";
  }
});
