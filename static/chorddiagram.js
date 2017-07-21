// var mmap = {
//             'web': {name: 'web',
//                     id: 0,
//                     data: 'word'},
//             'mobile': {name: 'mobile',
//                        id: 1,
//                        data: 'word'},
//             'social': {name: 'social',
//                        id: 2,
//                        data: 'word'},
//             'media': {name: 'media',
//                       id: 3,
//                       data: 'word'},
//             'content': {name: 'content',
//                         id: 4,
//                         data: 'word'},
//             'video': {name: 'video',
//                       id: 5,
//                       data: 'word'}
// };

// var matrix = [
//               [0, 50, 20, 15, 10, 25],
//               [50, 0, 25, 10, 15, 25],
//               [20, 25, 0, 40, 20, 15],
//               [15, 10, 40, 0, 25, 30],
//               [10, 15, 20, 25, 0, 25],
//               [25, 25, 15, 30, 25, 0]
// ];

d3.json('/chorddiagram.json', function(data) {

  var svg = d3.select("svg"),
      width = +svg.attr("width"),
      height = +svg.attr("height"),
      outerRadius = Math.min(width, height) * 0.5 - 40,
      innerRadius = outerRadius - 30;

  var chord = d3.chord()
      .padAngle(0.05)
      .sortSubgroups(d3.descending);

  var arc = d3.arc()
      .innerRadius(innerRadius)
      .outerRadius(outerRadius);

  var ribbon = d3.ribbon()
      .radius(innerRadius);

  var color = d3.scaleOrdinal(d3.schemeCategory10);

  var g = svg.append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")
      .datum(chord(data));

  var group = g.append("g")
      .attr("class", "groups")
    .selectAll("g")
    .data(function(chords) { return chords.groups; })
    .enter().append("g");

  group.append("path")
      .style("fill", function(d) { return color(d.index); })
      .style("stroke", function(d) { return d3.rgb(color(d.index)).darker(); })
      .attr("d", arc);

  // var groupTick = group.selectAll(".group-tick")
  //   .data(function(d) { return groupTicks(d, 1e3); })
  //   .enter().append("g")
  //     .attr("class", "group-tick")
  //     .attr("transform", function(d) { return "rotate(" + (d.angle * 180 / Math.PI - 90) + ") translate(" + outerRadius + ",0)"; });

  // groupTick.append("line")
  //     .attr("x2", 6);

  // groupTick
  //   .filter(function(d) { return d.value % 5e3 === 0; })
  //   .append("text")
  //     .attr("x", 8)
  //     .attr("dy", ".35em")
  //     .attr("transform", function(d) { return d.angle > Math.PI ? "rotate(180) translate(-16)" : null; })
  //     .style("text-anchor", function(d) { return d.angle > Math.PI ? "end" : null; })
  //     .text(function(d) { return d.value; });

  g.append("g")
      .attr("class", "ribbons")
    .selectAll("path")
    .data(function(chords) { return chords; })
    .enter().append("path")
      .attr("d", ribbon)
      .style("fill", function(d) { return color(d.target.index); })
      .style("stroke", function(d) { return d3.rgb(color(d.target.index)).darker(); });

  // Returns an array of tick angles and values for a given group and step.
  // function groupTicks(d, step) {
  //   var k = (d.endAngle - d.startAngle) / d.value;
  //   return d3.range(0, d.value, step).map(function(value) {
  //     return {value: value, angle: value * k + d.startAngle};
  //   });
  // }
});
