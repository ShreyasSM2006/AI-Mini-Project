function factorial(n) {
    if (n < 0 || !Number.isInteger(n)) return NaN;
    let res = 1;
    for (let i = 1; i <= n; i++) res *= i;
    return res;
}

function parseFunction(input) {
    return input
        .replace(/(\d)(x)/g, "$1*$2")       // 3x -> 3*x
        .replace(/\)\(/g, ")*(")            // (x+1)(x+2) -> (x+1)*(x+2)
        .replace(/e\^\((.*?)\)/g, "Math.exp($1)")
        .replace(/e\^x/g, "Math.exp(x)")
        .replace(/sin/g, "Math.sin")
        .replace(/cos/g, "Math.cos")
        .replace(/tan/g, "Math.tan")
        .replace(/log10/g, "Math.log10")
        .replace(/log/g, "Math.log")
        .replace(/sqrt/g, "Math.sqrt")
        .replace(/abs/g, "Math.abs")
        .replace(/pi/g, "Math.PI")
        .replace(/(\d+)!/g, "factorial($1)")
        .replace(/\^/g, "**");
}