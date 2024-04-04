class ResultComponent extends HTMLElement {
    static get observedAttributes() {
        return ['data'];
      }

    constructor () {
      super()
      this.productNumber = 0

      this.attachShadow({ mode: 'open' })
  
      const container = document.createElement('div')
      container.innerHTML = `
      <div style="padding: 24px; border: 9px solid blue;">
      <p>DATA IS: ${this.getAttribute('data')}</p>
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

    attributeChangedCallback(name, oldValue, newValue) {
      console.log({name, oldValue, newValue})
      if (name === 'data') {
        this.productNumber = newValue
        this.shadowRoot.querySelector('p').textContent = `Product number is: ${newValue}`;
        this.shadowRoot.getElementById('catchButton').textContent = `Get the product No.${this.productNumber}`;
      }
    }
  
    async getResult () {
      try {
        const response = await fetch(`https://dummyjson.com/products/${this.getAttribute('data')}`)
        if (!response.ok) {
          throw new Error('Failed to fetch data')
        }
        const data = await response.json()
  console.log(data)
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
