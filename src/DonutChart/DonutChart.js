// DonutChart
// Component for representing data as a donut chart
"use strict";
import * as d3 from "d3";
import donutChartD3 from './DonutChartD3';

const currentDocument = document.currentScript.ownerDocument;

export class DonutChart extends HTMLElement {
  constructor() {
    super();
  }

  // Called when element is inserted in DOM
  connectedCallback() {
    this.createShadowDom('.donut-chart-container');
    this.getDonutAttributes();
    this.fetchData();

  }

  // Create the shadow dom for the current component
  createShadowDom(element) {
    const shadowRoot = this.attachShadow({
      mode: 'open'
    });

    // Select the container and clone it. Finally attach the cloned node to the shadowDOM's root.
    // Current document needs to be defined to get DOM access to imported HTML
    const container = currentDocument.querySelector(element);
    const instance = container.cloneNode(true);
    shadowRoot.appendChild(instance);

  }

  // Extract the attributes from our element
  getDonutAttributes() {
    this.dataUrl = this.getAttribute('data-url');
  }

  // Fetch the data to be shown and call render function
  fetchData() {
    // Fetch the data for that user Id from the API and call the render method with this data
    fetch(`${this.dataUrl}`)
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
      donutChartD3(data, this.shadowRoot.querySelector("#donut-chart"));

    }

  }

}