import * as _ from 'lodash';
import * as Q from 'q';

export class Greeter {
  constructor(public greeting: string) { }
  greet() {
      
      _.times(3, () => console.log('<h1>' + this.greeting + '</h1>'));
      console.log(Q)
      console.log(fetch);
      
  }
};

var greeter = new Greeter("Hello, world!");
  
greeter.greet();

export const theGreeter = greeter;
