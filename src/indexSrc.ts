import * as components from './components/indexComponents';
import { getRMData } from "./services/fetchRMApi";
import CharacterCard from "./components/character/character";

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
                        <input type="number" id="number" placeholder="Enter a number" />
                        <button type="submit">Get data</button>
                    </form>
                </div>
                <section class="cards-container"></section>
            `;

            const form = this.shadowRoot.querySelector('#number-input');
            form?.addEventListener('submit', async (e) => {
                e.preventDefault();

                const input = this.shadowRoot?.querySelector('#number') as HTMLInputElement;
                const value = Number(input?.value) > 826 ? 826 : Number(input?.value);

                this.getDataApi(value);
            });
        }
    }

    async getDataApi(characterAmount: number) {
        const arr = Array.from({ length: characterAmount }, (_, i) => i + 1);
        
        this.dataApi = await getRMData(arr);

        // Generar cartas de personajes
        this.generateCards();
    }

    generateCards() {
        const cardsContainer = this.shadowRoot?.querySelector('.cards-container');

        this.dataApi.forEach((character) =>{
            const card = this.shadowRoot?.ownerDocument.createElement('character-card') as CharacterCard;
            cardsContainer?.appendChild(card);
        });
    }
}

customElements.define('app-container', AppContainer);
