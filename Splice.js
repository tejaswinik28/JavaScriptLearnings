// we monkey-patch the original splice with our implementation
Array.prototype.splice = function(start, deleteCount, ...items) {
    const data = this

    // we collect the splice array here
    let resultArray = []
    var stop = data.length

    // this function copies array to the this array. Since we cannot directly re-assign the this array.
    function copy(source, self) {
        for (let index = 0; index < source.length; index++) {
            self[index] = source[index]
        }
        self.length = source.length
    }


    // if start is a negative number
    if (start < 0) {
        // we add the negative start index to the array length to get the positive index
        start = start + data.length
    }

    // if deleteCount is defined
    if (deleteCount) {
        // we add it to start. This gives us the index we will stop in the data array.
        stop = start + deleteCount

        // if deleteCount is negative, we splice no array
        if (deleteCount < 0)
            stop = 0
    }

    // we loop cut the array
    for (let i = start; i < stop; i++) {
        const elem = data[i]
        resultArray.push(elem)
    }

    // if deleteCount is defined but items is empty
    if (deleteCount && items.length <= 0) {
        var deleteArr = []
        // we get elements before the start index and after the stop index, these elements. We use the 'copy' function to set them to 'this' array
        for (let i = 0; i < data.length; i++) {
            var elem = data[i]
            if (i === start) {
                i = stop-1
            } else {
                deleteArr.push(elem)
            }
        }
        // we set the elements collected in the deleteArr array to this this array. Direct assignment 'this = deleteArr' would throw error
        copy(deleteArr, this)
    }

    // if there is something in the items array
    if (items.length > 0) {
        var gatherArr = []
        // we get the elements before start index and elements after the stop index, then we push the elements in items array in between them.
        for (let i = 0; i < data.length; i++) {
            var elem = data[i]
            if (i === start) {
                gatherArr = [...gatherArr, ...items]
                i = stop-1
            } else {
                gatherArr.push(elem)
            }
        }
        copy(gatherArr, this)
    }
    // we return the spliced elements
    return resultArray
}
