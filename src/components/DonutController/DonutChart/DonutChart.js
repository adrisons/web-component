// DonutChart
// Component for representing data as a donut chart
(function () {
  const currentDocument = document.currentScript.ownerDocument;

  class DonutChart extends HTMLElement {
    constructor() {
      super();

      // Setup a click listener on <donut-chart>
      this.addEventListener('click', e => {
        this.refresh();
      });
    }

    // Called when element is inserted in DOM
    connectedCallback() {
      this.createShadowDom('#donut-chart-template');
      this.getDonutAttributes();
      this.fetchData();
    }

    // Create the shadow dom for the current component
    createShadowDom(element) {
      const shadowRoot = this.attachShadow({
        mode: 'open'
      });

      // Select the template and clone it. Finally attach the cloned node to the shadowDOM's root.
      // Current document needs to be defined to get DOM access to imported HTML
      const template = currentDocument.querySelector(element);
      const instance = template.content.cloneNode(true);
      shadowRoot.appendChild(instance);
    }

    // Extract the attributes from our element
    // Note that we are going to specify our cards like:
    // <donut-chart donut-id="1"></donut-chart>
    getDonutAttributes() {
      this.donutId = this.getAttribute('donut-id');
    }

    // Fetch the data to be shown and call render function
    fetchData() {
      // Fetch the data for that user Id from the API and call the render method with this data
      fetch(`http://localhost:3000/reports/${this.donutId}`)
        .then((response) => response.text())
        .then((responseText) => {
          this.render(JSON.parse(responseText));
        })
        .catch((error) => {
          console.error(error);
        });
    }

    // Fill the respective areas of the card using DOM manipulation APIs
    render(data) {
      if (data) {
        // All of our components elements reside under shadow dom. So we created a this.shadowRoot property
        // We use this property to call selectors so that the DOM is searched only under this subtree
        this.shadowRoot.querySelector('.donut__title').innerHTML = data.title;
        this.shadowRoot.querySelector('.donut__total').innerHTML = `${data.total}${data.currency}`;
      }

    }

    refresh() {
      this.fetchData();
    }
  }

  customElements.define('donut-chart', DonutChart);
})();