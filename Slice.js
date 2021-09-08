// we monkey-patch the slice method with our implementation
Array.prototype.slice = function(start, end) {
    // we set the array 'this' to data.
    const data = this

    // our stop index, for now we set it to stop at the last index of the data array
    var stop = data.length - 1

    // we collect the sliced elements here
    var resultArr = []

    // if no argument is passed in, we return an emoty array
    if (start === undefined) {
        return resultArr
    }

    // if the start index is negative, we convert it to its positive equivalence.
    if (start < 0)
        start = start + data.length

    // if the end index is defined and not negative, we set the stop index to be the end index, decreasing it by one. Remember, slice stops at index short of the end index.
    if (end !== undefined && end > 0) {
        stop = end - 1
    }

    // we gather the elements from the start index to the stop index to the 'resultArr' array.
    for (var index = start; index <= stop; index++) {
        var element = data[index];
        resultArr.push(element)
    }

    // we return the 'resultArr' array.
    return resultArr
}
