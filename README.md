# vue-calculator
**CS 480 Lab 3 - Scientific Calculator**

This project (as of October 3rd 2021) is hosted on Vercel and can be found [here](https://vue-calculator-9oyj3amwz-rodriguezlui002.vercel.app/)

## Functionality
Using the interface compiled to HTML by Vue.js, this calculator runs like any general purpose calculator.
Operations include:
- Simple arithmetic (addition, substraction, multiplication, and divison)
- Trigonometric operations (sin, cos, tan, cot, etc.)
- Others include log and ln as well as power and square root

## Implementation
Using the given buttons, clicks are entered onto the screen as a string concatenating the previous entry (initally empty).
Once the desired expression is completed the user clicks the equals sign. This is where the evaluation process begins.
the given string is now run through an implementation of the shunting algorithm [Wiki](https://en.wikipedia.org/wiki/Shunting-yard_algorithm).
After the string has been parsed into an array as a reverse polish notation expression it is then placed into a tree for evaluation.

## Installation
This project uses Node.js for its JavaScript runtime environment and NPM to bundle dependencies
### Requirements
- Nodes.js 12.0.0 and above
- Web browser

After cloning the git repo
```sh
cd vue-calculator
npm install
npm run build
```