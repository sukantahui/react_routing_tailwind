import { createInterface } from 'readline';

const rl = createInterface({
    input: process.stdin,
    output: process.stdout
});

function ask(question) {
    return new Promise(resolve => rl.question(question, resolve));
}

async function main() {

    let name = await ask("Enter your name: ");
    let age = await ask("Enter your age: ");
    

    // stored in variables
    console.log("Stored name:", name);
    console.log("Stored age:", age);

    rl.close();
}

main();