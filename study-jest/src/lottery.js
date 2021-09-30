export function  draw(min,max,size) {
    let numbers= [];
    let range = max - min + 1;
    while (numbers.length < size){
        let number = Math.floor(Math.random()*range) + min;
        if (!numbers.includes(number)) numbers.push(number);
    }
    numbers.sort((x,y)=>x-y);
    return numbers;
}