
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

export function formatTime(inputVal = 60000) {
    let remaining = inputVal;
    const minutes = Math.floor(remaining/60000);
    let output = `${minutes}:`;
    remaining -= minutes*60000;
    let tensOfSeconds = Math.floor(remaining/10000);
    output += tensOfSeconds;
    remaining -= tensOfSeconds*10000;
    let seconds = Math.floor(remaining/1000);
    output += `${seconds}.`;
    remaining -= seconds*1000;
    output += Math.floor(remaining/100);
    return output;
}