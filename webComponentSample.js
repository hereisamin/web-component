class ResultComponent extends HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })

    this._prop = null // Initialize the property


    const container = document.createElement('div')
      container.innerHTML = `
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
      this.shadowRoot.appendChild(container)

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
