//list of values, may be dulicate   
const arr=[1,212,55,6,3,7,4,56,3,6,7,3,8,6,6,34,6];
const freq=arr.reduce((acc,num)=>{
    acc[num]=(acc[num] || 0)+1;
    return acc;
},{});

console.log(freq);
console.log(Object.values(freq));