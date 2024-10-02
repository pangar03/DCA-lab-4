import * as components from './components/indexComponents';
import styles from './indexSrc.css';
import { getRMData } from "./services/fetchRMApi";
import { getEpisodeData } from "./services/fetchEpisode";
import CharacterCard, { Attribute } from "./components/character/character";
import "./components/character/character"

class AppContainer extends HTMLElement {
    dataApi: any[] = [];

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    async connectedCallback() {        
        this.render();
    }

    render() {
        if(this.shadowRoot){
            this.shadowRoot.innerHTML = `
                <div>
                    <form id="number-input">
                        <input type="number" id="number" placeholder="Enter a number" min="1 max="826"/>
                        <button type="submit">Get data</button>
                    </form>
                </div>
                <ul class="cards-container"></ul>
            `;

            const form = this.shadowRoot.querySelector('#number-input');
            form?.addEventListener('submit', async (e) => {
                e.preventDefault();

                const input = this.shadowRoot?.querySelector('#number') as HTMLInputElement;
                const value = Number(input?.value) > 826 ? 826 : Number(input?.value);

                this.getDataApi(value);
            });
        }

        const css = document.createElement('style');
        css.innerHTML = styles;
        this.shadowRoot?.appendChild(css);
    }

    async getDataApi(characterAmount: number) {

        const arr = Array.from({ length: characterAmount }, (_, i) => i + 1);
        
        this.dataApi = await getRMData(arr);

        // Generar cartas de personajes
        this.generateCards();
    }

    async generateCards() {
        const cardsContainer = this.shadowRoot?.querySelector('.cards-container');
        if (cardsContainer) {
            cardsContainer.innerHTML = '';
        }

        let charArr: any[] = [];

        if(!Array.isArray(this.dataApi)){
            charArr.push(this.dataApi);
        } else charArr = this.dataApi;

        charArr.forEach(async (character) =>{
            const card = this.shadowRoot?.ownerDocument.createElement('character-card') as CharacterCard;
            // Seteando los atributos del personaje
            card.setAttribute(Attribute.image, character.image);
            card.setAttribute(Attribute.name, character.name);
            card.setAttribute(Attribute.status, character.status);
            card.setAttribute(Attribute.species, character.species);
            card.setAttribute(Attribute.chartype, character.type);
            card.setAttribute(Attribute.origin, character.origin.name);

            // Obtener el primer episodio
            const episode = await getEpisodeData(character.episode[0]);            

            card.setAttribute(Attribute.firstepisode, episode.name);
            cardsContainer?.appendChild(card);
        });
        
    }
}

customElements.define('app-container', AppContainer);
