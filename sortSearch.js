const c = [1, 2, 8, 4, 5, 6, 7, 3, 9];
function linearSearch(arr, target) {
    for (let i in arr) {
        if (arr[i] == target) {
            return i;
        }
    }
    return -1;
}
console.log(linearSearch(c, 5));

function binarySearch(arr, target) {
    let left = 0;
    let right = arr.length - 1;
    while (left < right) {
        let mid = Math.floor(left + right / 2);
        if (arr[mid] === target) {
            return mid;
        } else if (arr[mid] < target) {
            left = mid + 1
        } else {
            right = mid - 1;
        }
    }
    return -1;
}
console.log(binarySearch(c, 5));

function bubbleSort(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
        for (let j = 0; j < arr.length - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                let temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
    return arr;
}
console.log(bubbleSort(c));
//------------------------------------
function mergeSort(arr) {
    if (arr.length <= 1) {
        return arr;
    }

    const mid = Math.floor(arr.length / 2);
    const left = arr.slice(0, mid);
    const right = arr.slice(mid);

    const sortedLeft = mergeSort(left);
    const sortedRight = mergeSort(right);

    return merge(sortedLeft, sortedRight);
}

function merge(left, right) {
    let result = [];
    let leftIndex = 0;
    let rightIndex = 0;

    // Compare elements from both arrays and merge them in sorted order
    while (leftIndex < left.length && rightIndex < right.length) {
        if (left[leftIndex] < right[rightIndex]) {
            result.push(left[leftIndex]);
            leftIndex++;
        } else {
            result.push(right[rightIndex]);
            rightIndex++;
        }
    }

    // Add any remaining elements from both arrays (if any)
    return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
}


console.log(mergeSort(c));
//-------------------------------------