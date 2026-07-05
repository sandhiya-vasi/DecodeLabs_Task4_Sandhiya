d3.csv("data.csv").then(function(data) {
  data.forEach(d => {
    d.Sales = +d.Sales;
  });

  const width = 700, height = 400, margin = 50;

  const svg = d3.select("#lineChart")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  const x = d3.scalePoint()
    .domain(data.map(d => d.Month))
    .range([margin, width - margin]);

  const y = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.Sales) + 50])
    .range([height - margin, margin]);

  const line = d3.line()
    .x(d => x(d.Month))
    .y(d => y(d.Sales));

  svg.append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("stroke", "#3399ff")
    .attr("stroke-width", 2)
    .attr("d", line);

  svg.selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", d => x(d.Month))
    .attr("cy", d => y(d.Sales))
    .attr("r", 5)
    .attr("fill", "#ff9933");

  svg.selectAll("text.label")
    .data(data)
    .enter()
    .append("text")
    .attr("x", d => x(d.Month))
    .attr("y", d => y(d.Sales) - 10)
    .attr("text-anchor", "middle")
    .text(d => d.Sales);

  svg.append("g")
    .attr("transform", `translate(0,${height - margin})`)
    .call(d3.axisBottom(x));

  svg.append("g")
    .attr("transform", `translate(${margin},0)`)
    .call(d3.axisLeft(y));
});