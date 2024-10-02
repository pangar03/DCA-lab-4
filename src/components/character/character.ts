import styles from './character.css';

export enum Attribute {
    "image" = "image",
    "name" = "name",
    "status" = "status",
    "species" = "species",
    "chartype" = "chartype",
    "origin" = "origin",
    "firstepisode" = "firstepisode"
}

class CharacterCard extends HTMLElement {
    image?: string;
    name?: string;
    status?: string;
    species?: string;
    chartype?: string;
    origin?: string;
    firstepisode?: string;

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    static get observedAttributes() {
        return Object.keys(Attribute);
    }

    attributeChangedCallback(propName: Attribute, oldValue: string | undefined, newValue: string | undefined) {
        switch(propName) {
            default:
                this[propName] = newValue;
                break;
        }
    }

    connectedCallback() {
        this.render();
    }

    render() {
        if(this.shadowRoot){
            this.shadowRoot.innerHTML = `
                <li>
                    <div id="character-image" style="background-image: url('${this.image}');"></div>
                    <h1 class="character-info">${this.name ? this.name : "No Name Registered"}</h1>
                    <h3 class="character-info">${this.status ? this.status : "Status Unknown"}</h3>
                    <h3 class="character-info">${this.species ? this.species : "Specie Unknown"}</h3>
                    <h3 class="character-info">${this.chartype ? this.chartype : "Regular " + this.species}</h3>
                    <h3 class="character-info">${this.origin ? this.origin : "Origin Unknown"}</h3>
                    <h2>First Episode:</h2>
                    <h3 class="character-info"></h3>${this.firstepisode ? this.firstepisode : "No Episode Registered"}</h3>
                </li>
            `;

            console.log(this.chartype);
        }

        const cssCharacter = document.createElement('style');
        cssCharacter.innerHTML = styles;
        this.shadowRoot?.appendChild(cssCharacter);
    }
}

customElements.define('character-card', CharacterCard);
export default CharacterCard;