

class ResultComponent extends HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })

    this._prop = null // Initialize the property

    var div = document.createElement("div");

    setInterval(() => {
      div.innerHTML = `Time: ${new Date().toLocaleString('en-US')} ${this._prop ? ', ' + this._prop : ''}`; // Use the property
    }, 1000)

    document.getElementsByClassName('sticky-header__container')[0].appendChild(div)
  }

  set prop(value) { // Define a setter for the property
    this._prop = value
  }

  get prop() { // Define a getter for the property
    return this._prop
  }
}

customElements.define('result-component', ResultComponent)
