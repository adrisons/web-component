(function () {
    const currentDocument = document.currentScript.ownerDocument;
    class PieController extends HTMLElement {
        constructor() {
            super();
        }

        // Called when element is inserted in DOM
        connectedCallback() {
            this.createShadowDom('#pie-controller-template');
            // _fetchAndPopulateData(this);
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
    }

    customElements.define('pie-controller', PieController);
})();