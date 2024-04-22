class ProductLoader extends HTMLElement {
    constructor() {
        super();

        // Create a shadow root
        this.attachShadow({ mode: 'open' });

        // Create a loading indicator
        this.shadowRoot.innerHTML = `
            <style>
                .loader {
                    border: 8px solid #f3f3f3; /* Light grey */
                    border-top: 8px solid #3498db; /* Blue */
                    border-radius: 50%;
                    width: 50px;
                    height: 50px;
                    animation: spin 2s linear infinite;
                }

                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            </style>
            <div class="loader"></div>
        `;
    }

    connectedCallback() {
        // Simulate loading product data
        setTimeout(() => {
            this.loadProductData();
        }, 2000); // Simulating a 2-second delay
    }

    loadProductData() {
        // Replace the loader with the actual product content
        this.shadowRoot.innerHTML = `
            <div>
                <h2>Product Name</h2>
                <p>Description of the product goes here...</p>
                <p>Price: $XX.XX</p>
            </div>
        `;
    }
}

// Define the custom element
customElements.define('product-loader', ProductLoader);
