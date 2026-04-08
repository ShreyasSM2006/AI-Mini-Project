async function hillClimb(f, xStart, xMin, xMax, mode) {
    let x = xStart;
    let step = (xMax-xMin)/200;
    let steps = [];
    let maxSteps = 500;

    for (let i = 0; i < maxSteps; i++) {
        steps.push({x:x, y:f(x)});

        let left = x - step;
        let right = x + step;

        if (left < xMin || right > xMax) break;

        let f0 = f(x), fL = f(left), fR = f(right);

        if (mode==="max") {
            if (fL > f0) x = left;
            else if (fR > f0) x = right;
            else break;
        } else {
            if (fL < f0) x = left;
            else if (fR < f0) x = right;
            else break;
        }
    }

    return steps;
}