class CharacterCard extends HTMLElement {
    constructor() {
        console.log("FLAG CONSTRUCTOR!");
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        console.log("FLAG CONNECTEDCALLBACK!");
        this.render();
    }

    render() {
        console.log("FLAG RENDER!");
        if(this.shadowRoot){
            this.shadowRoot.innerHTML = `
                <div>
                    <h1>Hola, esto es un CharacterCard</h1>
                </div>
            `;
        }
    }
}

customElements.define('character-card', CharacterCard);
export default CharacterCard;