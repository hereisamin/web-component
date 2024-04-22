// product-loader.js

class ProductLoader extends HTMLElement {
    constructor() {
        super();

        // Create a shadow root
        this.attachShadow({ mode: 'open' });

        // Initialize prop
        this._prop = '';

        // Create the input and button with placeholders
        this.shadowRoot.innerHTML = `
            <style>
                /* Container styles */
                :host {
                    display: block;
                    max-width: 500px;
                    margin: 0 auto;
                    font-family: Arial, sans-serif;
                    background-color: lightblue;
                    padding: 20px;
                    margin-top: 24px;
                    margin-bottom: 24px;
                    border-radius: 6px;
                }

                /* Input container */
                .input-container {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin-bottom: 20px;
                }

                /* Input field */
                input[type="number"] {
                    padding: 10px;
                    border: 1px solid #ccc;
                    border-radius: 5px;
                    font-size: 16px;
                    width: 70%;
                }

                /* Button */
                button {
                    padding: 10px 20px;
                    border: none;
                    border-radius: 5px;
                    background-color: #4CAF50;
                    color: white;
                    font-size: 16px;
                    cursor: pointer;
                    width: 25%;
                }

                button:hover {
                    background-color: #45a049;
                }

                /* Result container */
                .result-container {
                    background-color: #f9f9f9;
                    border-radius: 5px;
                    padding: 20px;
                }

                /* Product info */
                .product-info {
                    margin-top: 20px;
                    padding: 20px;
                    background-color: #fff;
                    border: 1px solid #ccc;
                    border-radius: 5px;
                }

                .product-info h1, .product-info h3 {
                    margin: 0;
                }

                .product-info img {
                    margin-top: 10px;
                    max-width: 100%;
                    height: auto;
                }
            </style>
            <div class="input-container">
                <input type="number" id="inputNumber" placeholder="Enter product number">
                <button id="submitButton">Search</button>
            </div>
            <div class="result-container">
                <p>Enter a product number above to search</p>
            </div>
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
            this.shadowRoot.querySelector('.result-container').innerHTML = `
                <div class="product-info">
                    <h1>Name: ${data.title}</h1>
                    <h3>Price: ${data.price}</h3>
                    <h3>Description:</h3>
                    <p>${data.description}</p>
                    <img src="${data.images[0]}" alt="Product Image">
                </div>
            `;

        } catch (error) {
            console.error(error);
            // Display error message if fetching fails
            this.shadowRoot.querySelector('.result-container').innerHTML = `<p>Failed to fetch product data</p>`;
        }
    }
}

// Define the custom element
customElements.define('product-loader', ProductLoader);
