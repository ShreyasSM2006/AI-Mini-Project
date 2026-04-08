async function start() {
    let input = document.getElementById("func").value;
    let xMin = parseFloat(document.getElementById("xmin").value);
    let xMax = parseFloat(document.getElementById("xmax").value);
    let mode = document.getElementById("mode").value;

    if (isNaN(xMin) || isNaN(xMax)) { alert("Enter valid range"); return; }

    let parsed = parseFunction(input);

    let f = x => {
        try { let val = eval(parsed); return isFinite(val)?val:Infinity; } 
        catch { return Infinity; }
    };

    // Generate function graph
    let xs = [];
    let ys = [];
    let step = (xMax-xMin)/1000;
    for (let x=xMin; x<=xMax; x+=step) { 
        xs.push(x); 
        ys.push(f(x)); 
    }

    // Plot function
    let traceFunc = { x: xs, y: ys, mode:'lines', name:'f(x)'};
    let traceDot = { x:[xs[0]], y:[ys[0]], mode:'markers', marker:{color:'red',size:12}, name:'Current'};
    let layout = { title:'Hill Climbing', xaxis:{title:'x'}, yaxis:{title:'f(x)'} };

    Plotly.newPlot('graph', [traceFunc, traceDot], layout);

    // Run hill climbing
    let startX = (xMin+xMax)/2;
    let steps = await hillClimb(f, startX, xMin, xMax, mode);

    // Animate red dot
    for (let p of steps) {
        Plotly.restyle('graph', {'x': [[p.x]], 'y': [[p.y]]}, [1]);
        await new Promise(r=>setTimeout(r,30));
    }

    // Show final result
    let final = steps[steps.length-1];
    let analysis = (mode==='max') 
        ? "Algorithm climbed until no better neighbor." 
        : "Algorithm descended until no smaller neighbor.";
    let resHTML = `
    <b>Final x:</b> ${final.x.toFixed(4)}<br>
    <b>f(x):</b> ${final.y.toFixed(4)}<br>
    <b>Steps:</b> ${steps.length}<br>
    <b>Type:</b> ${mode==='max'?'Local Maximum':'Local Minimum'}<br>
    <b>Analysis:</b> ${analysis}
    `;
    if (final.x===xMin || final.x===xMax) resHTML += "<br><b>Note:</b> Reached boundary (possible unbounded function)";
    document.getElementById("resultText").innerHTML = resHTML;
}