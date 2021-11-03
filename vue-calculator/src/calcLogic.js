let type_op = 'o';
let type_const = 'c';
let type_func = 'f';
let type_else = 'e';
let type_leftpara = '(';
let type_rightpara = ')';

function genFunc(evalu, type = type_func, prec = 0, left = true) {
    return {
        evalu: evalu,
        t: type,
        prec: prec,
        left: left
    }
}

function Node(val, func = true, unary = true) {
    return {
        val: val,
        func: func,
        unary: unary,
        right: null,
        left: null,
        name: ''
    }
}

let UNARY_FUNCS = {
    sin: genFunc((x) => Math.sin(x)),
    cos: genFunc((x) => Math.cos(x)),
    tan: genFunc((x) => Math.tan(x)),
    cot: genFunc((x) => 1 / Math.tan(x)),
    arcsin: genFunc((x) => Math.asin(x)),
    arccos: genFunc((x) => Math.acos(x)),
    arctan: genFunc((x) => Math.atan(x)),
    arcctg: genFunc((x) => Math.PI / 2 - Math.atan(x)),
    ln: genFunc((x) => Math.log(x)),
    log: genFunc((x) => Math.log10(x)),
    sqrt: genFunc((x) => Math.sqrt(x)),
    negative: genFunc((x) => -x)
};

let BINARY_FUNCS = {
    '+': genFunc((x, y) => x + y, type_op, 2),
    '-': genFunc((x, y) => x - y, type_op, 2),
    '*': genFunc((x, y) => x * y, type_op, 3),
    '/': genFunc((x, y) => x / y, type_op, 3),
    '^': genFunc((x, y) => Math.pow(x, y), type_op, 4, false),
}

let functions = Object.keys(UNARY_FUNCS).concat(Object.keys(BINARY_FUNCS));
let operators = '+-*/^';
let left_para = '({[';
let right_para = ')}]';

function isNumber(x) {
    if (typeof x === 'number') {
        return true;
    }

    return !isNaN(x) || x === '.';
}

function getNumVal(x) {
    if (typeof x === 'number') {
        return x;
    } else {
        return parseFloat(x);
    }
}

function findElement(i, eqn, list) {
    for (let k = 0; k < list.length; k++) {
        let len = list[k].length;
        if (eqn.substring(i, i + len) === list[k]) {
            return [true, list[k], len];
        }
    }

    return [false, '', 1];
}

function getPrecedence(op) {
    if (Object.keys(BINARY_FUNCS).includes(op)) {
        return BINARY_FUNCS[op].prec;
    }

    return 0;
}

function isLeftAssociative(op) {
    if (Object.keys(BINARY_FUNCS).includes(op)) {
        return BINARY_FUNCS[op].left;
    }

    return true;
}

function rpn(eqn) {
    let queue = [];
    let stack = [];

    let obj = '';
    let type = '';

    if (eqn.charAt(0) === '-') {
        eqn = eqn.substring(1);
        eqn = 'negative' + eqn;
    }

    // Evaluate each token
    for (let i = 0; i < eqn.length; i++) {
        let token = eqn[i];

        if (token === ' ' || token === ',') {
            continue;
        }

        // Determine if the token is a number, function, or operator
        if (isNumber(token)) {
            type = type_const;

            obj = token;
            if (i < eqn.length - 1) {
                while (isNumber(eqn[i + 1])) {
                    obj += eqn[i + 1];
                    i++;
                    if (i >= eqn.length - 1) {
                        break;
                    }
                }
            }

            obj = getNumVal(obj);
        } else {
            let data = findElement(i, eqn, functions);
            let found = data[0];
            obj = data[1];
            let len = data[2];
            if (found) {
                type = operators.includes(obj) ? type_op : type_func;
            } else {
                if (left_para.includes(token)) {
                    type = type_leftpara;
                } else if (right_para.includes(token)) {
                    type = type_rightpara;
                } else {
                    type = type_else;
                }
            }
            i += len - 1;
        }

        let last_stack = stack[stack.length - 1];
        switch (type) {
            case type_const:
                queue.push(obj);
                break;
            case type_func:
                stack.push(obj);
                break;
            case type_op:
                if (stack.length != 0) {
                    while (((functions.includes(last_stack) && !operators.includes(last_stack)) || getPrecedence(last_stack) > getPrecedence(obj) || (getPrecedence(last_stack) === getPrecedence(obj) && isLeftAssociative(last_stack))) && !left_para.includes(last_stack)) {
                        queue.push(stack.pop());
                        if (stack.length === 0) {
                            break;
                        }
                        last_stack = stack[stack.length - 1];
                    }
                }
                stack.push(obj);
                break;
            case type_leftpara:
                stack.push('(');
                break;
            case type_rightpara:
                while (last_stack !== '(') {
                    queue.push(stack.pop());
                    last_stack = stack[stack.length - 1];
                }
                stack.pop();
                break;
            default:
                return null;
        }
    }

    while (stack.length > 0) {
        queue.push(stack.pop());
    }

    return queue;
};

function parse(rpn) {
    let stack = [];

    Array.from(rpn).forEach((token) => {
        let tree = null;

        if (isNumber(token)) {
            tree = Node(token, false);
        } else {
            if (Object.keys(BINARY_FUNCS).includes(token)) {
                tree = Node(BINARY_FUNCS[token], true, false);

                let a = stack.pop();
                let b = stack.pop();

                if (typeof a === 'number') {
                    tree.right = Node(a, false);
                } else {
                    tree.right = a;
                }

                if (typeof b === 'number') {
                    tree.left = Node(b, false);
                } else {
                    tree.left = b;
                }
            } else if (Object.keys(UNARY_FUNCS).includes(token)) {
                tree = Node(UNARY_FUNCS[token]);

                let a = stack.pop();

                if (typeof a === 'number') {
                    tree.left = Node(a, false);
                } else {
                    tree.left = a;
                }
            }
        }
        tree.name = token;
        stack.push(tree);
    });

    return stack.pop();
};

function evalu(tree) {
	if (tree.func) {
		if (tree.unary) {
			return tree.val.evalu(evalu(tree.left));
		} else {
			return tree.val.evalu(evalu(tree.left), evalu(tree.right));
		}
	} else {
        return tree.val;
	}
}

export {rpn, parse, evalu};