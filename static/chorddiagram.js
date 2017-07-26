function drawChordDiagram(data) {
  var rotation = 0;
  var textgap = 10;
  var gnames = ['web', 'mobile', 'social', 'media', 'content', 'video'];
  var offset = Math.PI * rotation;
  var width = 900;
  var height = 900;

  function fade(opacity) {
    return function(d, i) {
      d3.selectAll("g.ribbons path")
          .filter(function(d) {
            return d.source.index != i && d.target.index!= i;
          })
        .transition()
          .style("opacity", opacity);
    };
  }

  // var svg = d3.select("svg"),
  //     width = +svg.attr("width"),
  //     height = +svg.attr("height"),
  //     outerRadius = Math.min(width, height) * 0.5 - 40,
  //     innerRadius = outerRadius - 30;

  var svg = d3.select("#chorddiagram")
              .append("svg")
              .attr("width", width)
              .attr("height", height);

  var outerRadius = Math.min(width, height) * 0.5 - 80,
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
      .attr("transform", "translate(" + width / 2 + "," + (height / 2 - 20) + ")")
      .datum(chord(data));

  var group = g.append("g")
      .attr("class", "groups")
    .selectAll("g")
    .data(function(chords) { return chords.groups; })
    .enter().append("g");

  group.append("path")
      .style("fill", function(d) { return color(d.index); })
      .style("stroke", function(d) { return d3.rgb(color(d.index)).darker(); })
      .attr("d", arc)
      .on("mouseover", fade(.1))
      .on("mouseout", fade(1));

  group.append("text")
       .each(function(d) {d.angle = ((d.startAngle + d.endAngle) / 2) + offset; })
       .attr("dy", ".35em")
       .attr("text-anchor", function(d) { return d.angle > Math.PI ? "end" : null; })
       .attr("transform", function(d) {
                return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")"
                    + "translate(" + (outerRadius + textgap) + ")"
                    + (d.angle > Math.PI ? "rotate(180)" : "");
              })
       .text(function(d) { return gnames[d.index]; });

  function startAngle(d) {
    return d.startAngle + offset;
  }

  function endAngle(d) {
    return d.endAngle + offset;
  }

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
}

d3.json('/chorddiagram.json', function(data) {
  drawChordDiagram(data);
  $('#loading').empty();
});
