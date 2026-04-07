let canvas = document.getElementById("graph");
let ctx = canvas.getContext("2d");

let global = {
    xMin: -10,
    xMax: 10,
    yMin: -10,
    yMax: 10
};

function mapX(x) {
    return (x - global.xMin) * canvas.width / (global.xMax - global.xMin);
}

function mapY(y) {
    return canvas.height - (y - global.yMin) * canvas.height / (global.yMax - global.yMin);
}

function drawGraph(f, xMin, xMax) {
    canvas.width = window.innerWidth * 0.9;
    canvas.height = 500;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    global.xMin = xMin;
    global.xMax = xMax;

    let step = (xMax - xMin) / 1000;
    let points = [];

    let MAX_Y = 1000;
    let yMin = Infinity, yMax = -Infinity;

    for (let x = xMin; x <= xMax; x += step) {
        let y;
        try {
            y = f(x);
            if (!isFinite(y)) continue;

            if (y > MAX_Y) y = MAX_Y;
            if (y < -MAX_Y) y = -MAX_Y;

        } catch {
            continue;
        }

        points.push({x, y});
        yMin = Math.min(yMin, y);
        yMax = Math.max(yMax, y);
    }

    global.yMin = yMin;
    global.yMax = yMax;

    ctx.beginPath();

    points.forEach((p, i) => {
        let px = mapX(p.x);
        let py = mapY(p.y);

        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
    });

    ctx.stroke();
}

function drawPointer(x, y) {
    ctx.beginPath();
    ctx.arc(mapX(x), mapY(y), 6, 0, 2 * Math.PI);
    ctx.fillStyle = "red";
    ctx.fill();
}