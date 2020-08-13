const Editor = {
    template:`
        <div id="editor">
            <app-header></app-header>
            <main>
                <template v-for="element in elements">
                    <app-element :element="element"></app-element>
                </template>
        
                <svg>
                    <marker id="markerCircle" markerWidth="6" markerHeight="6" refY="3" refX="3">
                        <circle cx="3" cy="3" r="3" style="stroke: none;fill: #2f8ec4"></circle>
                    </marker>
        
                    <template v-for="link in links">
                        <app-link :link="link"></app-link>
                    </template>
                </svg>
                
                <app-modal v-if="editElement.id" :element="editElement"></app-modal>
            </main>
        </div>
    `,
    props:{
        elements: Array,
        links: Array,
    },

    data(){
        return{
            cloneElement: {},
            editElement: {}
        }
    },

    created(){
        EventBus.$on('element.cloneStart', this.cloneStart);
        EventBus.$on('element.cloneEnd', this.cloneEnd);
        EventBus.$on('element.edit', this.showModal);
        EventBus.$on('modal.close', this.closeModal);

        document.addEventListener("mouseup", this.removeCloneElement);
    },

    methods:{
        removeCloneElement(){
            this.cloneElement = {};
        },

        cloneStart(element, direction){
            this.cloneElement.oElement = element;
            this.cloneElement.oDirect = direction;
        },

        cloneEnd(element, direction){
            const {oElement, oDirect} = this.cloneElement;

            if(oElement.id === element.id){
                return this.$root.setToast("Fail connect", "danger");
            }else{
                oElement.direction[oDirect].id = element.id;
                element.direction[direction].id = oElement.id;

                const link = newLink(oElement.id, oDirect, element.id, direction);
                this.$root.links.push(link);
            }
        },

        showModal(element){
            this.editElement = element;
        },

        closeModal(){
            this.editElement = {};
        }
    }
}