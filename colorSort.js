//top color last (array is used as stack)
/**
 * urn = [color1,color2,color3,color4]
 * urns = [
 *          [color1,color2]
 *          [color1,color2,color3]
 *          [..]
 *          [.]
 *        ]
 */
let grid = document.querySelector(".colorSortGrid")
let lightgreen = "lightgreen"
let blue = "blue"
let brown = "brown"
let lightblue = "lightblue"
let green = "green"
let grey = "grey"
let yellow = "yellow"
let pink = "pink"
let purple = "purple"
let darkgreen = "darkgreen"
let red = "red"
let darkblue = "darkblue"
let empty = ""

let urnsArr = [
    [lightgreen, darkblue, brown, brown],
    [lightblue, green, red, grey],
    [yellow, lightblue, pink, darkgreen],
    [yellow, green, pink, yellow],
    [darkblue, pink, purple, lightgreen],
    [purple, darkblue, darkgreen, darkblue],
    [darkgreen, lightblue, pink, blue],
    [blue, lightblue, green, blue],
    [red, grey, brown, lightgreen],
    [darkgreen, purple, grey, red],
    [grey, purple, blue, lightgreen],
    [red, brown, green, yellow],
    [],
    []
]
let loopBreaker = false
document.addEventListener("DOMContentLoaded", () => {
    let urnColorsHTML = document.querySelectorAll(".urnColor");
    let urnColorsSingleArr = [];
    urnsArr.forEach((e) => {
        e.forEach((a) => {
            urnColorsSingleArr.push(a)
        });
    });
    let counter = 0
    urnColorsHTML.forEach((e) => {
        let color = urnColorsSingleArr[counter];
        if (color === "lightgreen") {
            color = "#90EE90"
        }
        e.style.backgroundColor = color
        counter++
    })
    document.getElementById("butt").addEventListener("click", (e) => {
        (randomSolver(newArr))
    })
    document.getElementById("stop").addEventListener("click",()=>{
        loopBreaker = true;
    })

})

let newArr = []
urnsArr.forEach(e => {
    newArr.push(e.reverse())
})

//from,to (array indexes)
function moveToRight(arr, from, to) {
    let newArr = arr;
    if (arr[from].length === 0 || arr[to].length === 4) {
        return;
    }
    let newColor = arr[from].pop()
    if (arr[to].length === 0 ^ (newColor === arr[to][arr[to].length - 1] && arr[to].length < 4)) {
        newArr[to].push(newColor)
        return newArr;
    } else {
        arr[from].push(newColor)
        return false;
    }
}

function checkIfFinished(colorArray) {
    let checkBoolArrInside = []
    let checkBoolArrOutside = []
    let checkBool = true;
    let counter = 0
    colorArray.forEach((e) => {
        counter++
        for (let i = 0; i < e.length - 1; i++) {
            if ((e[i] !== e[i + 1] || e.length < 4) && e.length > 0) {
                checkBoolArrInside.push(false)
                break;
            } else {
                checkBoolArrInside.push(true);
            }
        }
        checkBoolArrOutside.push(!checkBoolArrInside.includes(false))

        // console.log(counter+": "+ e + "  " + checkBoolArrOutside[counter-1] + e.length)
    })
    return !checkBoolArrOutside.includes(false)
}

function randomSolver(arr) {
    let movesArr = []
    let currMove = []
    let resetBool = false
    do {

        let tempArr = arr
        let possibleMoves = calculatePossibleMoves(arr)
        let index = getRandIndexArr(possibleMoves)
        let indexes = possibleMoves[index]
        if (possibleMoves.length < 1) {
            arr = goBack(arr, movesArr, 5)
            for (let i = 0; i < 5; i++) {
               // movesArr.pop()
            }
        } else {
            movesArr.push(indexes)
            moveToRight(arr, indexes[0], indexes[1])
        }
        if(loopBreaker){
            break;
        }
        updateUrns(arr)

    } while (!checkIfFinished(arr))

    console.log(movesArr);
   showMoves(movesArr,arr)
    return arr;
}

function moveRightNoRules(arr, from, to) {
    if (arr[from][arr[from].length - 1] > 0 && arr[to][arr[to].length - 1] < 4) {
        let tempClr = arr[from].pop()
        return arr[to].push(tempClr)
    }
}

function calculatePossibleMoves(arr) {
    let possibleMoveIndexArray = []
    for (let i = 0; i < arr.length; i++) {
        let currFromColor = lastElem(arr[i])
        for (let j = i + 1; j < arr.length; j++) {
            let tempToColor = lastElem(arr[j])
            if ((currFromColor === tempToColor && arr[j].length < 4 && !checkIfFinished(arr[i])) || (arr[j].length === 0 && !checkIfFinished(arr[i]))) {
                possibleMoveIndexArray.push([i, j])
            }
        }
        if (i > 0) {
            for (let k = i - 1; k >= 0; k--) {
                let tempToColor = lastElem(arr[k])
                if ((currFromColor === tempToColor && arr[k].length < 4 & !checkIfFinished(arr[i])) || (arr[k].length === 0 && !checkIfFinished(arr[i]))) {
                    possibleMoveIndexArray.push([i, k])
                }
            }
        }
    }
    return possibleMoveIndexArray
}

function twoRandomIndexes(arrLength) {
    let index1;
    let index2;
    do {
        index1 = Math.floor(Math.random() * (arrLength))
        index2 = Math.floor(Math.random() * (arrLength))
    } while (index1 === index2)
    return [index1, index2]
}

function getRandIndexArr(arr) {
    return Math.floor(Math.random() * arr.length)
}

function lastElem(arr) {
    return arr[arr.length - 1]
}

//n is number of moves to reverse
function goBack(arr, movesArr, n) {
    let movesToReverse = [];
    let minVal = movesArr.length - n - 1
    if (movesArr.length - n - 1 < 0) {
        minVal = 0;
    }
    for (let i = movesArr.length - 1; i > minVal; i--) {
        console.log(i + " " + movesArr[i])
        movesToReverse.push(movesArr[i].reverse())
    }
    for (let i = 0; i < movesToReverse.length; i++) {
        moveRightNoRules(arr, movesToReverse[i][0], movesToReverse[i][1])
    }
    return arr;
}

function updateUrns(arr) {
    let urnColorsHTML = document.querySelectorAll(".urnColor");
    let urnColorsSingleArr = [];
    arr.forEach((e) => {
        e = e.reverse()
        e.forEach((a) => {
            urnColorsSingleArr.push(a)
        });
    });
    let counter = 0
    urnColorsHTML.forEach((e) => {
        let color = urnColorsSingleArr[counter];
        if (color === "lightgreen") {
            color = "#90EE90"
        }

        e.style.backgroundColor = color
        counter++
    })
}
function deleteUnnecessaryMoves(movesArr){
    for(let i = 0; i<movesArr.length-1;i++){
        if(movesArr[i] === movesArr[i+1].reverse){
            movesArr.splice(i+1)
        }
    }
    return movesArr
}
function showMoves(movesArr, arr) {
    for (let i = 0; i < movesArr.length; i++) {
        console.log(movesArr[i])
        deleteUnnecessaryMoves(movesArr)
        moveRightNoRules(arr, movesArr[i][0], movesArr[i][1])
        updateUrns(arr)
        delay()
    }
}
function delay(){
    setTimeout(()=>{},1000)
}
