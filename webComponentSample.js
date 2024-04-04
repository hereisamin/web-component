class ResultComponent extends HTMLElement {
  static get observedAttributes() {
    return ['prop']; // Add the prop attribute to the list of observed attributes
  }

  constructor () {
    super()
    this.attachShadow({ mode: 'open' })

    this._prop = this.getAttribute('prop') // Initialize the property from the attribute

    this.container = document.createElement('div')
    this.container.innerHTML = `
      <div style="padding: 24px; border: 9px solid blue;">
      <p>DATA IS: ${this._prop ? this._prop : 0}</p>
          <div id="resultDiv"></div>
          <button style="
          padding: 20px;
          background-color: lightblue;
          font-size: larger;
          font-weight: bold;
          color: darkblue;
      " id="catchButton">READY</button>
          </div>
        `
      

    this.div = document.createElement("div");
    this.header = document.getElementsByClassName('sticky-header__container')[0]

    setInterval(() => {
      this.div.innerHTML = `Time: ${new Date().toLocaleString('en-US')} ${this._prop ? ', ' + this._prop : ''}`; // Use the property
    }, 1000)

    this.renderElements()
  }

  renderElements() {
    if (this.shadowRoot.contains(this.container)) {
      this.shadowRoot.removeChild(this.container)
    }

    if (this.header.contains(this.div)) {
      this.header.removeChild(this.div)
    }

    this.shadowRoot.appendChild(this.container)
    this.header.appendChild(this.div)

    this.shadowRoot.getElementById('catchButton').addEventListener('click', this.getResult.bind(this))
  }

  set prop(value) { // Define a setter for the property
    this._prop = value
    this.renderElements()
  }

  get prop() { // Define a getter for the property
    return this._prop
  }

    async getResult () {
      try {
        const response = await fetch(`https://dummyjson.com/products/${this._prop}`)
        if (!response.ok) {
          throw new Error('Failed to fetch data')
        }
        const data = await response.json()

        this.shadowRoot.getElementById('resultDiv').innerHTML = `
        <h1>Name: ${data.title}</h1>
        <h3>Price: ${data.price}</h1>
        <h3>Description:</h1><p>${data.description}</p>
        <img src="${data.images[0]}" alt="Girl in a jacket" width="500" height="500">
        `

      } catch (error) {
        console.error(error)
      }
    }
}

customElements.define('result-component', ResultComponent)
