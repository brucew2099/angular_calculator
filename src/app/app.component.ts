import { expressionType } from '@angular/compiler/src/output/output_ast';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular calculator';

  mainText = "0.";

  pressKey = (key:string):void => {
    if(this.mainText !== "0." && this.mainText !== "Error") {
      this.mainText += key;
    }
    else {
      this.mainText = key;
    }

    console.log("You pressed " + key);
  }

  allClear = ():void => {
    this.mainText = "0.";
    console.log("All Clear");
  }

  toggleNeg = ():void => {
    let period = this.mainText.toString().indexOf('.');
    let originalNumber = 0;

    if(period < 0) {
      originalNumber = parseInt(this.mainText);
    }
    else {
      originalNumber = parseFloat(this.mainText);
    }

    originalNumber = -originalNumber;

    this.mainText = originalNumber.toString();
  }

  backspace = ():void => {
    this.mainText = this.mainText.substring(0, this.mainText.length - 1);
    if(this.mainText === '') {
      this.mainText = "0.";
    }
    console.log("BACK");
  }

  evalAnswer = () => {
    try {
      this.mainText = eval(this.mainText);
    }
    catch(e) {
      this.mainText = "Error";
    }
    console.log("Get Answer");
  }
}
