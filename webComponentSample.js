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
      div.innerHTML = `Time: ${new Date().toLocaleString('en-US')} ${this._prop ? ', ' + this._prop : ''}`; // Use the property
    }, 1000)

    
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
  }

  set prop(value) { // Define a setter for the property
    this._prop = value
    this.renderElements()
  }

  get prop() { // Define a getter for the property
    return this._prop
  }
}

customElements.define('result-component', ResultComponent)
