const c = [1, 2, 8, 4, 5, 6, 7, 3, 9];
function getEven(c) {
    let sum = 0;
    for (let i of c) {
        if (i % 2 == 0) {
            sum += i;
        }
    }

    console.log(sum);
}
getEven(c);



