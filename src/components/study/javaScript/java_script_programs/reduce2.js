//find most frequent element 
const arr=[12,2,4,2,5,2,6,8,3,5,8,4,9,46,9,5,11];
const freq=arr.reduce((acc,n)=>{
    acc[n]=(acc[n] || 0)+1
    return acc;
},{});
console.log(freq);

const max=Math.max(...Object.values(freq));
console.log(max);

const mostFrequency = Object.keys(freq).filter(key=>freq[key]==max).map(Number);


console.log(mostFrequency);

/*
    Why .map(Number) Works
    map() expects a function.

    When you write:
        .map(Number)
    And you’re saying it looks different from what you usually write, like:
    .map(x => Number(x))
    Let’s clarify this properly.
    When you write:
        .map(Number)
    You are passing the Number function itself.

    JavaScript treats it like:
        .map((value) => Number(value))
    So both are equivalent.
    This Is Just a Shortcut
*/