// product-loader.js

class ProductLoader extends HTMLElement {
    constructor() {
        super();

        // Create a shadow root
        this.attachShadow({ mode: 'open' });

        // Initialize prop
        this._prop = '';

        // Create the input and button
        this.shadowRoot.innerHTML = `
            <style>
                /* Styles for the input and button */
            </style>
            <input type="number" id="inputNumber" placeholder="Enter a number">
            <button id="submitButton">Get Product</button>
            <div id="resultDiv"></div>
        `;

        // Bind the event listener for the button
        this.shadowRoot.querySelector('#submitButton').addEventListener('click', () => {
            this.getResult();
        });
    }

    async getResult() {
        try {
            // Get the input value
            const inputNumber = this.shadowRoot.querySelector('#inputNumber').value;
            
            // Fetch product data
            const response = await fetch(`https://dummyjson.com/products/${inputNumber}`);
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();

            // Display the product data
            this.shadowRoot.querySelector('#resultDiv').innerHTML = `
                <h1>Name: ${data.title}</h1>
                <h3>Price: ${data.price}</h3>
                <h3>Description:</h3>
                <p>${data.description}</p>
                <img src="${data.images[0]}" alt="Product Image" width="500" height="500">
            `;

        } catch (error) {
            console.error(error);
        }
    }
}

// Define the custom element
customElements.define('product-loader', ProductLoader);
