const View = {
    template:`
        <div id="view">
            <app-header></app-header>
            
            <div class="slide" :class="direction" v-html="slideElement.content"></div>
            
            <div class="direction">
                <div class="btn btn-primary" 
                    v-if="checkDirection('top')"
                    @click="nextSlide('top')">
                    {{slideElement.direction.top.text}}
                </div>
                
                <div class="btn btn-primary" 
                    v-if="checkDirection('right')"
                    @click="nextSlide('right')">
                    {{slideElement.direction.right.text}}
                </div>
                
                <div class="btn btn-primary" 
                    v-if="checkDirection('bottom')"
                    @click="nextSlide('bottom')">
                    {{slideElement.direction.bottom.text}}
                </div>
                
                <div class="btn btn-primary" 
                    v-if="checkDirection('left')"
                    @click="nextSlide('left')">
                    {{slideElement.direction.left.text}}
                </div>
            </div>
            
            <div class="mini-map">
                <template v-for="element in elements">
                    <div class="element-container-item" :style="setStyle(element)" :class="{selected: element.id === slideElement.id}"></div>
                </template>
                
                <svg>
                    <template v-for="link in links">
                        <line :x1="posLink1(link).x" :y1="posLink1(link).y" :x2="postLink2(link).x" :y2="postLink2(link).y"></line>
                    </template>
                </svg>
            </div>
        </div>
    `,
    props:{
        elements: Array,
        links: Array,
    },
    data(){
        return{
            slideElement: this.elements[0],
            direction: "",
            timeout: null
        }
    },
    methods:{
        setStyle(element){
            return {
                left: `${element.x}px`,
                top: `${element.y}px`,
            }
        },
        posLink1(link){
            const element = findElement(this.$root.elements, link.oId);
            return getPosLink(element, link.oDirect);
        },
        postLink2(link){
            const element = findElement(this.$root.elements, link.tId);
            return getPosLink(element, link.tDirect);
        },
        checkDirection(direction){
            let status = false;

            this.links.map(link => {
                if(link.oId === this.slideElement.id && link.oDirect === direction){
                    status = true;
                }
                else if(link.tId === this.slideElement.id && link.tDirect === direction){
                    status = true;
                }
            });

            return status;
        },
        nextSlide(direction){
            if(!this.checkDirection(direction)){
                return this.$root.setToast("Fail move to next slide", "danger");
            }else{
                this.links.map(link => {
                    if(link.oId === this.slideElement.id && link.oDirect === direction){
                        this.slideElement = findElement(this.elements, link.tId);
                    }
                    else if(link.tId === this.slideElement.id && link.tDirect === direction){
                        this.slideElement = findElement(this.elements, link.oId);
                    }
                });
                clearTimeout(this.timeout);
                this.direction = direction;
                this.timeout = setTimeout(() => {
                    this.direction = "";
                }, 2000)
            }
        }
    },
}