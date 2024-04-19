
class ResultComponent extends HTMLElement {
    constructor () {
      super()
      this.attachShadow({ mode: 'open' })

      this._prop = null
  
      const container = document.createElement('div')
      container.innerHTML = `
      <div style="padding: 24px; border: 9px solid blue;">
      <p>DATA IS: ${this._prop}</p>
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
  
      this.shadowRoot.getElementById('catchButton').addEventListener('click', this.getResult.bind(this))

      var div = document.createElement("div");

      setInterval(() => {
        div.innerHTML = `Time: ${new Date().toLocaleString('en-US')}`;
      }, 1000)

      // document.getElementsByClassName('sticky-header__container').style
      const foo = document.getElementsByClassName('sticky-header__container')[0].appendChild(div)
      console.log({foo})
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

    set prop(value) {
      this._prop = value
    }
  
    get prop() {
      return this._prop
    }
  }
  
  customElements.define('product-loader', ResultComponent)
