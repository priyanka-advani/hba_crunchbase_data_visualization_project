// var width = 900;
// var height = 400;

// var dataNodes=[
//               {name: 'New York, New York',
//                 r: 69.16},
//               {name: 'San Francisco, California',
//                 r: 52.03},
//               {name: 'Los Angeles, California',
//                 r: 21.27},
//               {name: 'Chicago, Illinois',
//                 r: 20.65}
// ];

var dataNodes = []

d3.json('/bubblechart.json', function(data) {
  var width = 1000;
  var height = 1000;
  var word, mentions, node;
    for (var key in data) {
      word = key;
      mentions = data[key];
      node = {name: word, mentions: mentions};
      dataNodes.push(node);
    }
  var svg = d3.select('body')
            .append('svg')
            .attr('width', width)
            .attr('height', height);

  var force = d3.forceSimulation(d3.values(dataNodes))
                .force("center", d3.forceCenter(width / 2, height/ 2))
                .force("charge", d3.forceManyBody())
                .force("collide",d3.forceCollide( function(d){return d.mentions/60 + 10;}) )
                .force("y", d3.forceY(0))
                .force("x", d3.forceX(0))
                .on("tick", tick);

  var node = svg.selectAll('.node')
                .data(force.nodes())
                .enter()
                .append('g')
                .attr('class', 'node')
                .call(d3.drag()
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end", dragended));

  // var color = d3.scaleOrdinal(d3.schemeCategory10);

  node.append("circle")
      .attr("r", function (d) {
        return d.mentions/60;
      })
      .style("opacity", function (d) {
        return d.mentions/5000;
      });

  node.append("text")
      .text(function (d) {
        return d.name;
      });

  force.on('end', function () {
      node.attr("transform", function (d) {
        return "translate(" + d.x + "," + d.y + ")";
      });
  });

  node.on('mouseover', function () {
    d3.select(this)
      .select("text")
      .text(function (d) {
        return d.mentions;
      });
  });

  node.on('mouseout', function () {
    d3.select(this)
      .select("text")
      .text(function (d) {
        return d.name;
      });
  });

  function tick() {
      node.attr("transform", function (d) {
            return "translate(" + d.x + "," + d.y + ")";
      });
  }
        
  function dragstarted(d) {
    if (!d3.event.active) {
      force.alphaTarget(0.3).restart();
    }
  }
      
  function dragged(d) {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
  }
      
  function dragended(d) {
    if (!d3.event.active) {
      force.alphaTarget(0);
    }

    d.fx = null;
    d.fy = null;
  } 

});

// d3.json('/bubblechart.json', function(data) {
//   var width = 1000;
//   var height = 1000;
//   var city, state, companies, node;
//     for (var key in data) {
//       citystate = data[key]['citystate'];
//       companies = data[key]['companies'];
//       radius = data[key]['radius'];
//       node = {name: citystate, companies: companies, radius: radius};
//       dataNodes.push(node);
//     }
//   var svg = d3.select('body')
//             .append('svg')
//             .attr('width', width)
//             .attr('height', height);

//   var force = d3.forceSimulation(d3.values(dataNodes))
//                 .force("center", d3.forceCenter(width / 2, height/ 2))
//                 .force("charge", d3.forceManyBody())
//                 .force("collide",d3.forceCollide( function(d){return d.radius - 1;}) )
//                 .force("y", d3.forceY(0))
//                 .force("x", d3.forceX(0));

//   var node = svg.selectAll('.node')
//                 .data(force.nodes())
//                 .enter()
//                 .append('g')
//                 .attr('class', 'node');

//   // var color = d3.scaleOrdinal(d3.schemeCategory10);

//   node.append("circle")
//       .attr("r", function (d) {
//         return d.radius;
//       });
//       // .style("fill", function (d) {
//       //   return color(d.source);
//       // });

//   node.append("text")
//       .text(function (d) {
//         return d.companies;
//       });

//   force.on('end', function () {
//       node.attr("transform", function (d) {
//         return "translate(" + d.x + "," + d.y + ")";
//       });
//   });

//   node.on('mouseover', function () {
//     d3.select(this)
//       .select("text")
//       .text(function (d) {
//         return d.name;
//       });
//   });

//   node.on('mouseout', function () {
//     d3.select(this)
//       .select("text")
//       .text(function (d) {
//         return d.companies;
//       });
//   });

// });

// var svg = d3.select('body')
//             .append('svg')
//             .attr('width', width)
//             .attr('height', height);

// var force = d3.forceSimulation(d3.values(dataNodes))
//               .force("center", d3.forceCenter(width / 2, height/ 2))
//               .force("charge", d3.forceManyBody())
//               .force("collide",d3.forceCollide(function(d) { return d.r / 2; }));

// var node = svg.selectAll('.node')
//               .data(force.nodes())
//               .enter()
//               .append('g')
//               .attr('class', 'node');

// // var color = d3.scaleOrdinal(d3.schemeCategory10);

// node.append("circle")
//     .attr("r", function (d) {
//       return d.r;
//     });
//     // .style("fill", function (d) {
//     //   return color(d.source);
//     // });

// node.append("text")
//     .text(function (d) {
//       return d.name;
//     });

// force.on('end', function () {
//     node.attr("transform", function (d) {
//       return "translate(" + d.x + "," + d.y + ")";
//     });
//   });
