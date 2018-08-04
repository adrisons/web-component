"use strict";
import * as d3 from "d3";
export default function (data, selector) {
    
    
    let total = 0;
    for (let p of data.parts) {
        total += p.value;
    }
    // Set the dimensions of the canvas / graph
    let margin = {
            top: 30,
            right: 30,
            bottom: 30,
            left: 30
        },
        height = 400 - margin.top - margin.bottom,
        width = 450 - margin.left - margin.right;
    // Create the svg element when donut-chart is specified
    let svg = d3.select(selector)
        .append('svg')
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + 50 + margin.top + margin.bottom);
    let chart = svg.append("g")
        .attr("class", "chart")
        .attr("transform", "translate(" + (width / 2 + margin.left) + "," + ((height / 2) + margin.top) + ")");
    
    let color = d3.scaleOrdinal(d3.schemeCategory20c)
    
    
    let pie = d3.pie()
        .sort(null)
        .startAngle(0)
        .endAngle(2 * Math.PI)
        .value(function (d) {
            return d.value;
        });
    
    
    
    let formatNumber = function (value, currency) {
        return new Intl.NumberFormat('es-ES').format(value) + currency;
    }
    
    let innerRadius = height / 3;
    let outerRadius = innerRadius + 15;
    
    // One arc for each part
    let arc = d3.arc()
        .outerRadius(outerRadius)
        .innerRadius(innerRadius);
    
    // Draw chart
    
    
    let arcs = chart.append("g")
            .attr("class", "donut-arcs")
        .selectAll(".arc")
        .data(pie(data.parts))
        .enter();   
    
    arcs.append("path")
        .style("fill", function (d) {
            return color(d.data.name);
        })
        .transition()
        .attrTween('d', function (d) {
            let i = d3.interpolate(d.startAngle, d.endAngle);
            return function (t) {
                d.endAngle = i(t);
                return arc(d);
            }
        });
    
    
    // Axis
    let radius = d3.scaleLinear().range([innerRadius - 5, innerRadius]);
    
    chart.append("g")
        .attr('class', 'donut-axis')
        .selectAll(".axis")
        .data(d3.range(4))
        .enter().append("line")
        .attr("class", "axis")
        .attr("transform", function (d) {
            return "rotate(" + d * 90 + ")";
        })
        .attr("x1", radius.range()[0])
        .attr("x2", radius.range()[1]);
    
    
    // Midle of the donut
    let center = chart.append("g")
        .attr('class', 'donut-center')
    // Title
    center.append("text")
        .attr('dy', '-1.5em')
        .attr('fill', '#C0C0C0')
        .attr("text-anchor", "middle")
        .attr('class', 'donut-text')
        .text(data.title);
    // Total
    center.append("text")
        .attr('fill', '#505050')
        .attr('dy', '.3em')
        .attr("text-anchor", "middle")
        .attr('class', 'donut-number')
        .text(formatNumber(total, data.currency));
    
    
    
        
    
    
    
    // Legends
    let addLegend = function (part, x, y, right) {
        var legends = svg.append('g')
        let title = legends
            .selectAll('legend.title')
            .data([part])
            .enter();
        // Category name
        title.append('text')
            .text(function (d) {
                return d.name;
            })
            .attr("transform", "translate(" + x + "," + y + ")")
            .attr("text-anchor", right ? "end" : "left")
            .attr('fill', function (d) {
                return color(d.name);
            })
            .attr("class", "legend-name")
    
    
        let percentage = ((part.value / total) * 100) + "%";
        let formattedValue = formatNumber(part.value, data.currency);
    
        if (right) {
            x = width + margin.left;
        }
        let numbers = legends
            .selectAll('legend.numbers')
            .data([part])
            .enter()
            .append('text')
            .attr("transform", "translate(" + x + "," + y + ")")
            .attr('dy', '1.5em')
            .attr("text-anchor", right ? "end" : "left")
    
        // percentage
        numbers.append('tspan')
            .text(percentage)
            .attr("class", "legend-percentage");
        // value
        numbers.append('tspan')
            .text(formattedValue)
            .attr('dx', '1em')
            .attr('fill', '#C0C0C0')
            .attr("class", "legend-value");
    }
    let y = height;
    // Right legend
    addLegend(data.parts[0], (width + margin.left), y, 1)
    // Left legend
    let legend_1 = addLegend(data.parts[1], (margin.left), y, 0);
    
    // BottomLine
    y += 40;
    svg.append("line")
        .attr('stroke', '#C0C0C0')
        .attr("stroke-width", 2)
        .attr("x1", margin.left)
        .attr("y1", y)
        .attr("x2", width + margin.left)
        .attr("y2", y);


}