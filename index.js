#!/usr/bin/env node

const util = require('util');

//Takes local location of json file as command line argument ('./data.json')
const data = require(process.argv[2]);

//creates input and output
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });

//loops input/traversal/output until user types 'quit'
function recursiveReadlineLoop() {
    readline.question(`Choose a selector or type 'quit' to end `, (selector) => {
        if (selector === 'quit') {
            readline.close()    
        }else{
        traverse (data, selector)
        recursiveReadlineLoop();
        }
    })
}

recursiveReadlineLoop();


function traverse(Obj, term) {
    if (typeof Obj == 'object' && Obj !== null) {
        Object.entries(Obj).forEach(([key, value]) => {
            if ((key === 'class') && (value === term)) {
                //shows all nested objects in terminal
                console.log(util.inspect(Obj, { depth: null }))
            } else if ((key === 'classNames') && (term.slice(0, 1) == '.')) {
                term1 = term.slice(1, term.length);
                for (i = 0; i < value.length; i++) {
                    if (term1 == value[i])
                        console.log(util.inspect(Obj, { depth: null }))
                }
            } else if ((key === 'identifier') && (term.slice(0, 1) == '#') && (term.slice(1, term.length) == value)) {
                console.log(util.inspect(Obj, { depth: null }))
            }
            //continue traversing as needed
            traverse(value, term);
        });
    }
}
 