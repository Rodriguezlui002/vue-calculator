<template>
  <div class="min-w-full w-screen min-h-full h-screen flex justify-center place-items-center">
    <div class="grid grid-cols-1 w-96 pt-9 bg-gray-700">

      <div class="h-16 pr-4 flex justify-end items-center text-3xl text-ivory whitespace-nowrap overflow-auto">{{ output }}</div>

      <div class="h-96 bg-gray-900 flex flex-col p-4 rounded-t-2xl">
        <div class="h-36 grid grid-cols-4 gap-1 mb-4">
          <button class="bg-cwu-red text-ivory rounded text-lg" @click="appendExpression('^')">&#94;</button>
          <button class="bg-cwu-red text-ivory rounded text-lg" @click="appendExpression('sin(')">Sin</button>
          <button class="bg-cwu-red text-ivory rounded text-lg" @click="appendExpression('cos(')">Cos</button>
          <button class="bg-cwu-red text-ivory rounded text-lg" @click="appendExpression('tan(')">Tan</button>
          <button class="bg-cwu-red text-ivory rounded text-lg" @click="appendExpression('cot(')">Cot</button>
          <button class="bg-cwu-red text-ivory rounded text-lg" @click="appendExpression('arcsin(')">ArcSin</button>
          <button class="bg-cwu-red text-ivory rounded text-lg" @click="appendExpression('arccos(')">ArcCos</button>
          <button class="bg-cwu-red text-ivory rounded text-lg" @click="appendExpression('arctan(')">ArcTan</button>
          <button class="bg-cwu-red text-ivory rounded text-lg" @click="appendExpression('arcctg(')">ArcCtg</button>
          <button class="bg-cwu-red text-ivory rounded text-lg" @click="appendExpression('ln(')">Ln</button>
          <button class="bg-cwu-red text-ivory rounded text-lg" @click="appendExpression('log(')">Log</button>
          <button class="bg-cwu-red text-ivory rounded text-lg" @click="appendExpression('sqrt(')">&#8730;</button>
        </div>

        <div class="flex-1 flex gap-1">
          <div class="flex-1 grid grid-cols-3 gap-1 text-center">
            <button class="bg-ivory text-gray-800 rounded-md font-semibold text-xl" @click="appendExpression('1')">1</button>
            <button class="bg-ivory text-gray-800 rounded-md font-semibold text-xl" @click="appendExpression('2')">2</button>
            <button class="bg-ivory text-gray-800 rounded-md font-semibold text-xl" @click="appendExpression('3')">3</button>
            <button class="bg-ivory text-gray-800 rounded-md font-semibold text-xl" @click="appendExpression('4')">4</button>
            <button class="bg-ivory text-gray-800 rounded-md font-semibold text-xl" @click="appendExpression('5')">5</button>
            <button class="bg-ivory text-gray-800 rounded-md font-semibold text-xl" @click="appendExpression('6')">6</button>
            <button class="bg-ivory text-gray-800 rounded-md font-semibold text-xl" @click="appendExpression('7')">7</button>
            <button class="bg-ivory text-gray-800 rounded-md font-semibold text-xl" @click="appendExpression('8')">8</button>
            <button class="bg-ivory text-gray-800 rounded-md font-semibold text-xl" @click="appendExpression('9')">9</button>
            <button class="bg-ivory text-gray-800 rounded-md font-semibold text-xl" @click="appendExpression('0')">0</button>
            <button class="bg-ivory text-gray-800 rounded-md font-semibold text-xl" @click="appendExpression('.')">.</button>
            <button class="bg-ivory text-gray-800 rounded-md font-semibold text-xl" @click="clearOut()">&#x0186;</button>
          </div>

          <div class="w-24 grid grid-cols-2 gap-1">
            <button class="bg-blue-ncs text-ivory rounded-md font-semibold text-xl" @click="appendExpression('[')">[</button>
            <button class="bg-blue-ncs text-ivory rounded-md font-semibold text-xl" @click="appendExpression(']')">]</button>
            <button class="bg-blue-ncs text-ivory rounded-md font-semibold text-xl" @click="appendExpression('{')">{</button>
            <button class="bg-blue-ncs text-ivory rounded-md font-semibold text-xl" @click="appendExpression('}')">}</button>
            <button class="bg-blue-ncs text-ivory rounded-md font-semibold text-xl" @click="appendExpression('(')">(</button>
            <button class="bg-blue-ncs text-ivory rounded-md font-semibold text-xl" @click="appendExpression(')')">)</button>
            <button class="bg-blue-ncs text-ivory rounded-md font-semibold text-xl" @click="appendExpression('*')">&#215;</button>
            <button class="bg-blue-ncs text-ivory rounded-md font-semibold text-xl" @click="appendExpression('-')">&#8722;</button>
            <button class="bg-blue-ncs text-ivory rounded-md font-semibold text-xl" @click="appendExpression('+')">&#43;</button>
            <button class="bg-blue-ncs text-ivory rounded-md font-semibold text-xl" @click="appendExpression('/')">&#247;</button>
            <button class="col-span-2 bg-red-orange text-ivory rounded-md font-semibold text-xl" @click="solution">&#61;</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { rpn, parse, evalu } from './calcLogic.js';

export default {
  data() {
    return {
      output: ''
    }
  },
  watch: {
    output: function () {
      this.output = this.output.replace(/--/g, "+");
      this.output = this.output.replace(/\+-/g, "-");
      this.output = this.output.replace(/-\+/g, "-");
      this.output = this.output.replace(/-\(-/g, "");
    }
  },
  methods: {
    appendExpression(char) {
      if (this.output === '' && char === '-') {
        char = '-(';
      }
      this.output = this.output + char;
    },
    clearOut() {
      this.output = '';
    },
    solution() {
      try {
        let arr = rpn(this.output);
        let tree = parse(arr);
        this.output = evalu(tree);
      } catch (e) {
        console.log(e);
        this.output = 'Syntax ERROR';
      }
    }
  }
}
</script>