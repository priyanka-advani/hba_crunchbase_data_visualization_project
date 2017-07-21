var data
var dataNodes = []

function drawForceDiagram(data) {

  var width = 1000;
  var height = 1000;
  var word, mentions, node;

  for (var key in data) {
    word = key;
    mentions = data[key];
    node = {name: word, mentions: mentions};
    dataNodes.push(node);
  }

  var svg = d3.select('#bubblechart')
            .append('svg')
            .attr('width', width)
            .attr('height', height);

  var force = d3.forceSimulation(d3.values(dataNodes))
                .force("center", d3.forceCenter(width / 2, height/ 2))
                .force("charge", d3.forceManyBody())
                .force("collide",d3.forceCollide(function(d){return d.mentions/60 + 10;}))
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

  node.append("circle")
      .attr("r", function (d) {
        return d.mentions/60;
      })
      .style("fill", function (d) {
        return shadeBlend(d.mentions/9000, "3376b1");
      });
      // .style("opacity", function (d) {
      //   return d.mentions/5000;
      // });

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
      })
      .style("fill", "#ffffff");
    d3.select(this)
      .select("circle")
      .style("fill", "#f28528");
  });

  node.on('mouseout', function () {
    d3.select(this)
      .select("text")
      .text(function (d) {
        return d.name;
      })
      .style("fill", "#ffffff");
    d3.select(this)
      .select("circle")
      .style("fill", function (d) {
        return shadeBlend(d.mentions/10000, "3376b1");
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

  function shadeBlend(p,c0,c1) {
    var n = p<0?p*-1:p;
    var u = Math.round;
    var w = parseInt;

    if (c0.length>7) {
      var f = c0.split(",");
      var t = (c1?c1:p<0?"rgb(0,0,0)":"rgb(255,255,255)").split(",");
      var R = w(f[0].slice(4));
      var G = w(f[1]),B=w(f[2]);
      return "rgb("+(u((w(t[0].slice(4))-R)*n)+R) + "," + (u((w(t[1])-G)*n)+G) + "," + (u((w(t[2])-B)*n)+B) + ")";
    }
    
    else {
      var f = w(c0.slice(1),16);
      var t = w((c1?c1:p<0?"#000000":"#FFFFFF").slice(1),16);
      var R1 = f>>16;
      var G1 = f>>8&0x00FF;
      var B1 = f&0x0000FF;
      return "#"+(0x1000000+(u(((t>>16)-R1)*n)+R1)*0x10000+(u(((t>>8&0x00FF)-G1)*n)+G1)*0x100+(u(((t&0x0000FF)-B1)*n)+B1)).toString(16).slice(1);
    }
  }
}


d3.json('/bubblechart.json', drawForceDiagram);
