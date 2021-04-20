import { expressionType } from '@angular/compiler/src/output/output_ast';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title:string = 'Angular calculator';
  mainText:any = "0.";
  isAfterEquals:boolean = false;  // Flag to indicate when '=' has been pressed

  pressKey = (key:string):void => {
    if(this.mainText !== "0." && this.mainText !== "Error") {
      if(!this.isAfterEquals || key === '+' || key === '-' || key === '*' || key === '/') {
        // Allow keys to tag on before pressing the '=', but only allow the arithmetic
        // keys to tag on after '=' has been pressed.
        this.mainText += key;
        this.isAfterEquals = false;
      }
      else {
        // After '=' has been pressed, keys other than arithmetic keys will cleared the
        // calculator and start from stretch.
        this.allClear();
        this.pressKey(key);
      }
    }
    else {
      // this.mainText = 0. or Error right now, numbers will be displayed, arithmetic
      // signs will be ignored
      if(key !== '+' && key !== '-' && key !== '*' && key !== '/') {
        this.mainText = key;
      }
    }

    //console.log("You pressed " + key);
  }

  allClear = ():void => {
    this.mainText = "0.";
    this.isAfterEquals = false;
    //console.log("All Clear");
  }

  toggleNeg = ():void => {

    //  Will convert number or a number string to a number, but return NaN
    // if it's anything else
    let testNumber = new Number(this.mainText);

    if(Number.isNaN(testNumber.valueOf())) {
      let last = this.mainText.substring(this.mainText.length - 1);
      // If this.mainText[0] is not a number
      if(last < '0' || last > '9') {
        this.backspace();
      }

      for(var i = this.mainText.length - 1; i >= 0; i--) {
        if(this.mainText[i] === '-') {
          // Convert '-' to a '+'
          this.mainText = this.mainText.substring(0, i) + '+' + this.mainText.substring(i + 1);
          break;
        }
        else if(this.mainText[i] === '+') {
          // Convert '+' to '-'
          this.mainText = this.mainText.substring(0, i) + '-' + this.mainText.substring(i + 1);
          break;
        }
        else if (!(this.mainText[i] >= '0' && this.mainText[i] <= '9') && this.mainText[i] !== '.') {
          // Add a '-' if no sign is present (e.g. turns 3*6 into 3*-6)
          this.mainText = this.mainText.substring(0, i + 1) + '-' + this.mainText.substring(i + 1);
          break;
        }
      }
    }
    else {
      testNumber = -testNumber;
      this.mainText = testNumber.toString();
    }
  }

  backspace = ():void => {
    let temp = this.mainText.toString();
    this.mainText = temp.substring(0, temp.length - 1);
    if(this.mainText === '') {
      this.mainText = "0.";
    }
    //console.log("BACK");
  }

  evalAnswer = () => {
    try {
      this.mainText = eval(this.mainText);
      this.isAfterEquals = true;
    }
    catch(e) {
      this.mainText = "Error";
    }
    //console.log("Get Answer");
  }
}
