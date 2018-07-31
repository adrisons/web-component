(function () {
  const currentDocument = document.currentScript.ownerDocument;

  class PieChart extends HTMLElement {
    constructor() {
      super();

      // Setup a click listener on <pie-chart>
      this.addEventListener('click', e => {
        this.refresh();
      });
    }

    // Called when element is inserted in DOM
    connectedCallback() {
      this.createShadowDom('#pie-chart-template');
      this.getPieAttributes();
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
    // <pie-chart pie-id="1"></pie-chart>
    getPieAttributes() {
      this.pieId = this.getAttribute('pie-id');
    }

    // Fetch the data to be shown and call render function
    fetchData() {
      // Fetch the data for that user Id from the API and call the render method with this data
      fetch(`http://localhost:3000/reports/${this.pieId}`)
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
        this.shadowRoot.querySelector('.pie__title').innerHTML = data.title;
        this.shadowRoot.querySelector('.pie__total').innerHTML = `${data.total}${data.currency}`;
      }

    }

    refresh() {
      this.fetchData();
    }
  }

  customElements.define('pie-chart', PieChart);
})();