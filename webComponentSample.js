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
                /* Styles for the component */
                :host {
                    display: block;
                    max-width: 500px;
                    margin: 0 auto;
                    padding: 20px;
                    background-color: #f9f9f9;
                    border-radius: 10px;
                    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
                }

                input[type="number"] {
                    padding: 10px;
                    margin-right: 10px;
                    border: 1px solid #ccc;
                    border-radius: 5px;
                    font-size: 16px;
                    width: 150px;
                }

                button {
                    padding: 10px 20px;
                    border: none;
                    border-radius: 5px;
                    background-color: #4CAF50;
                    color: white;
                    font-size: 16px;
                    cursor: pointer;
                }

                button:hover {
                    background-color: #45a049;
                }

                #resultDiv {
                    margin-top: 20px;
                }

                /* Styles for the product information */
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
        }
    }
}

// Define the custom element
customElements.define('product-loader', ProductLoader);
