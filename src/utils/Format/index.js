
export function formatDollars(inputVal = 100000) {
    let lead = inputVal < 0 ? "-$" : "$";
    let intStr = inputVal.toString().split(".")[0];
    let output = "";
    let count = 0;
    for(let i = intStr.length - 1; i > -1; i--) {
        count++;
        output = `${intStr[i]}${output}`;
        if(count%3 === 0) {
            output = `,${output}`;
        }
    }
    return output.charAt(0) === "," ? `${lead}${output.slice(1)}` : `${lead}${output}`;
}

export function formatDate(inputVal = new Date()) {
    return inputVal.toDateString().substring(4);
}