/**
 * Created by Liam Vovk on 2017-09-22.
 */
let baseArray = Array(10).fill(1)
let scaleUp = baseArray.map((val, i) => val + i)
let scaleDown = Object.assign([], scaleUp).reverse()
let numCircles = 20
let nodes = d3.range(numCircles).map(() => {
  return {
    x: 0 + Math.random() * 500,
    y: 500,
    radius: 12
  }
})

let svg = d3.select(".animation")
  .append("svg")
  .attr("width", 500)
  .attr("height", 500)

let color = d3.scaleOrdinal(d3.schemeCategory20c)

let simulation = d3.forceSimulation()
  .force("charge", d3.forceManyBody().strength(-1))
  .force("position", d3.forceY(0).strength(0.002))
  .alphaDecay(0.0001)

let node = svg
  .selectAll("circle")
  .data(nodes)
  .enter()
  .append("circle")
  .attr("r", d => d.radius)
  .attr("cx", d => d.x)
  .attr("cy", d => d.y)
  .attr("fill", d => color(d.x))

simulation.nodes(nodes)
  .on("tick", () => {
    node
      .attr("cx", d => { return d.x })
      .attr("cy", d => { return d.y })
  })

let scaleUpCircle = () => {
  d3.selectAll("circle")
    .transition()
    .duration(2000)
    .delay((d, i) => i * 50)
    .attr("r", (d, i) => scaleUp[i] * 20)
    .on("end", scaleDownCircle)
}
let scaleDownCircle = () => {
  d3.selectAll("circle")
    .transition()
    .duration(2000)
    .delay((d, i) => i * 50)
    .attr("r", (d, i) => scaleDown[i] * 20)
    .on("end", scaleUpCircle)
}