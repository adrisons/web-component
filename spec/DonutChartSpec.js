

describe('Donut Chart', function () {
    // var donutChart = require('../src/DonutChart/DonutChart');

    var c;

    beforeEach(function () {
        // donutChart();
        // donutChartD3(data, this.shadowRoot.querySelector("#donut-chart"));
        
    });

    afterEach(function () {
        d3.selectAll('svg').remove();
    });

    describe('the donut chart', function () {
        it('should be created', function () {
            expect(getSvg()).not.toBeNull();
        });

    });

    function getSvg() {
        return d3.select('svg');
    }

});