export function crossingArrays(arr1: Array<any>, arr2: Array<any>): Boolean {
    for (let i = 0; i <= arr1.length; i++) {
        if (arr2.includes(arr1[i])) {
            return true;
        } 
    }
    
    return false;

}