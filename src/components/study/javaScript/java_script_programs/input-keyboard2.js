import { createInterface } from 'readline';

const rl = createInterface({
    input: process.stdin,
    output: process.stdout
});

function ask(question) {
    return new Promise(resolve => rl.question(question, resolve));
}

let num= await ask("Enter a number: ");
console.log(`You entered: ${num}`);
const arr=[4,7,8,9,10,12,78,45,23,56];
const newarr=arr.filter((a)=>{
    if(a%2!=0)
        return a;
}).reduce((acc,cur)=>{acc+cur,5});

console.log(newarr);

rl.close();
