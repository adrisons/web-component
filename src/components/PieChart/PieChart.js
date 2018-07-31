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
    const shadowRoot = this.attachShadow({
      mode: 'open'
    });

    // Select the template and clone it. Finally attach the cloned node to the shadowDOM's root.
    // Current document needs to be defined to get DOM access to imported HTML
    const template = currentDocument.querySelector('#pie-chart-template');
    const instance = template.content.cloneNode(true);
    shadowRoot.appendChild(instance);

    // Extract the attribute pie-id from our element.
    // Note that we are going to specify our cards like:
    // <pie-chart pie-id="1"></pie-chart>
    const userId = this.getAttribute('pie-id');

    // Fetch the data for that user Id from the API and call the render method with this data
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
      .then((response) => response.text())
      .then((responseText) => {
        this.render(JSON.parse(responseText));
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render(userData) {
    // Fill the respective areas of the card using DOM manipulation APIs
    // All of our components elements reside under shadow dom. So we created a this.shadowRoot property
    // We use this property to call selectors so that the DOM is searched only under this subtree
    this.shadowRoot.querySelector('.pie__full-name').innerHTML = userData.name;
    this.shadowRoot.querySelector('.pie__user-name').innerHTML = userData.username;
    this.shadowRoot.querySelector('.pie__website').innerHTML = userData.website;
    this.shadowRoot.querySelector('.pie__address').innerHTML = `<h4>Address</h4>
      ${userData.address.suite}, <br />
      ${userData.address.street},<br />
      ${userData.address.city},<br />
      Zipcode: ${userData.address.zipcode}`
  }

  refresh() {

  }
}

customElements.define('pie-chart', PieChart);