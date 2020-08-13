Vue.component('app-element', {
    template: `
        <div class="element-container-item"
            :class="{hover: hover}"
            :style="setStyle"
            @mouseover="hover = true"
            @mouseleave="hover = false"
            @mousedown="startMove">
            <div class="element">
                <div class="path" @click="createElement('top')" @mousedown.shift="cloneStart($event, 'top')" @mouseup.shift="cloneEnd('top')">
                    <span>1</span>
                </div>
                <div class="path" @click="createElement('right')" @mousedown.shift="cloneStart($event, 'right')" @mouseup.shift="cloneEnd('right')">
                    <span>2</span>
                </div>
                <div class="path" @click="createElement('left')" @mousedown.shift="cloneStart($event, 'left')" @mouseup.shift="cloneEnd('left')">
                    <span>4</span>
                </div>
                <div class="path" @click="createElement('bottom')" @mousedown.shift="cloneStart($event, 'bottom')" @mouseup.shift="cloneEnd('bottom')">
                    <span>3</span>
                </div>
            </div>
            <div class="controls">
                <button class="btn btn-sm btn-primary" @click="editElement">Edit</button>
                <button class="btn btn-sm btn-danger" @click="removeElement">Delete</button>
            </div>
        </div>
    `,
    props:{
        element: Object
    },
    data(){
        return{
            hover: false,
            move: 0
        }
    },
    computed:{
        setStyle(){
            return {
                left: `${this.element.x}px`,
                top: `${this.element.y}px`,
            }
        }
    },
    methods:{
        createElement(direction){
            if(this.move > 0) return;

            if(this.element.direction[direction].id){
                return this.$root.setToast("This direction of element linked", "danger");
            }else{
                const element = newElement(this.element, direction);
                this.element.direction[direction].id = element.id;
                element.direction[getOppositeDirection(direction)].id = this.element.id;
                this.$root.elements.push(element);

                const link = newLink(this.element.id, direction, element.id, getOppositeDirection(direction));
                this.$root.links.push(link);
            }
        },

        startMove(event){
            if(!event.shiftKey){
                this.move = 0;
                document.addEventListener("mousemove", this.incMove);
                document.addEventListener("mouseup", this.endMove);
            }
        },

        incMove(e){
            this.move += 1;
            this.element.x = e.pageX;
            this.element.y = e.pageY;
        },

        endMove(){
            document.removeEventListener("mousemove", this.incMove);
            document.removeEventListener("mouseup", this.endMove);
        },

        cloneStart(event, direction){
            event.stopPropagation();
            if(this.element.direction[direction].id){
                return this.$root.setToast("This direction of element linked", "danger");
            }
            EventBus.$emit('element.cloneStart', this.element, direction);
        },

        cloneEnd(direction){
            if(this.element.direction[direction].id){
                return this.$root.setToast("This direction of element linked", "danger");
            }
            EventBus.$emit('element.cloneEnd', this.element, direction);
        },

        removeElement(){
            removeLink(this.$root.links, this.$root.elements, this.element);
            this.$root.elements.splice(this.$root.elements.indexOf(this.element), 1);
        },

        editElement(){
            EventBus.$emit('element.edit', this.element);
        }
    }
})