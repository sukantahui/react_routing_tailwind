//find most frequent element 
const arr=[12,2,4,2,5,2,6,8,3,5,8,4,9,46,9,5,11];
const freq=arr.reduce((acc,n)=>{
    acc[n]=(acc[n] || 0)+1
    return acc;
},{});
console.log(freq);
/*
    When you don’t provide an initial value:
    JavaScript automatically does this:
        acc = first element of the array
        curr = second element
        Loop starts from index 1
        Index 0 is used as the initial accumulator
*/

const mostFrequency = Object.keys(freq).reduce((a,b)=>freq[a]>freq[b]?a:b);

/*
    When reduce() HAS an initial value
    Now:
        acc = initialValue
        curr = element at index 0
        Loop starts from index 0
*/

console.log(mostFrequency);