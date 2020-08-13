Vue.component('app-link', {
    template: `
        <line :x1="posLink1.x" :y1="posLink1.y" :x2="postLink2.x" :y2="postLink2.y" 
            marker-start="url(#markerCircle)" 
            marker-end="url(#markerCircle)"
            :class="{selected: link.selected}"
            @click="selectedLink"></line>
    `,
    props:{
        link: Object
    },
    computed:{
        posLink1(){
            const element = findElement(this.$root.elements, this.link.oId);
            return getPosLink(element, this.link.oDirect);
        },
        postLink2(){
            const element = findElement(this.$root.elements, this.link.tId);
            return getPosLink(element, this.link.tDirect);
        }
    },
    methods:{
        selectedLink(){
            EventBus.$emit('link.selected', this.link);
        }
    }
})