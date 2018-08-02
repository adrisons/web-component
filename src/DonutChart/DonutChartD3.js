"use strict";
import * as d3 from "d3";
export default function () {
    var width,
        height,
        margin = {
            top: 10,
            right: 10,
            bottom: 10,
            left: 10
        },
        colour = d3.scaleOrdinal(d3.schemeCategory20c), // colour scheme
        variable, // value in data that will dictate proportions on chart
        category, // compare data by
        percentFormat = d3.format('.0%');

    function chart(selection) {
        selection.each(function (data) {

            // Generate chart
            // creates a new pie generator
            var pie = d3.pie()
                .value(function (d) {
                    return d[variable];
                })
                .sort(null);

            var slices = pie(data);
            // append the svg object to the selection
            var svg = d3.select("body").append('svg')
                .attr('width', width + margin.left + margin.right)
                .attr('height', height + margin.top + margin.bottom)
                .append('g')
                .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');


            var left_legend = svg.append('g')
                .attr("transform", "translate(" + (margin.left) + "," + (height) + ")")
                .attr('class', 'legend')
                .selectAll('text')
                .data(slices)
                .enter()
                .append('text')
                .text(function (d) {
                    return '• ' + d.data.name;
                })
                .attr('fill', function (d) {
                    return colour(d.data.name);
                })
                .attr('y', function (d, i) {
                    return 20 * (i + 1);
                })

            var right_legend = svg.append('g')
                .attr("transform", "translate(" + (width) + "," + (height) + ")")
                .attr('class', 'legend')
                .selectAll('text')
                .data(slices)
                .enter()
                .append('text')
                .text(function (d) {
                    return '• ' + d.data.name;
                })
                .attr('fill', function (d) {
                    return colour(d.data.name);
                })
                .attr('y', function (d, i) {
                    return 20 * (i + 1);
                })

            // contructs and arc generator. This will be used for the donut. The difference between outer and inner
            // radius will dictate the thickness of the donut
            var radius = Math.min(width, height) / 2;
            var arc = d3.arc()
                .outerRadius(radius * 0.6)
                .innerRadius(radius * 0.5);


            // g element to keep elements within svg modular
            svg.append('g').attr('class', 'slices');

            // svg center element
            svg.append('text')
                .attr('class', 'toolCircle')
                .attr('dy', -15) // hard-coded. can adjust this to adjust text vertical alignment in tooltip
                .html(toolTipHTML(data)) // add text to the circle.
                .style('font-size', '.9em')
                .style('text-anchor', 'middle'); // centres text in tooltip

            // add and colour the donut slices
            var path = svg.select('.slices')
                .datum(data).selectAll('path')
                .data(pie)
                .enter().append('path')
                .attr('fill', function (d) {
                    return colour(d.data[category]);
                })
                .attr('d', arc);


            // Functions

            // function to create the HTML string for the tool tip. Loops through each key in data object
            // and returns the html string key: value
            function toolTipHTML(data) {
                var tip = "";
                tip += '<tspan x="0">' + data.title + '</tspan>';
                tip += '<tspan x="0" dy="1.2em">' + data.total + data.currency + '</tspan>';
                return tip;
            }
        })
    }

    // getter and setter functions. See Mike Bostocks post "Towards Reusable Charts" for a tutorial on how this works.
    chart.width = function (value) {
        if (!arguments.length) return width;
        width = value;
        return chart;
    };

    chart.height = function (value) {
        if (!arguments.length) return height;
        height = value;
        return chart;
    };

    chart.margin = function (value) {
        if (!arguments.length) return margin;
        margin = value;
        return chart;
    };

    chart.radius = function (value) {
        if (!arguments.length) return radius;
        radius = value;
        return chart;
    };

    chart.colour = function (value) {
        if (!arguments.length) return colour;
        colour = value;
        return chart;
    };

    chart.variable = function (value) {
        if (!arguments.length) return variable;
        variable = value;
        return chart;
    };

    chart.category = function (value) {
        if (!arguments.length) return category;
        category = value;
        return chart;
    };

    return chart;
}