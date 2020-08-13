const EventBus = new Vue();

const app = new Vue({
    el: "#root",
    router,
    data(){
        return {
            elements: [{
                id: uuid(),
                x: window.innerWidth / 2 + 25,
                y: window.innerHeight / 2 + 25,
                content: "<p>Root Element</p><img src='public/images/AP-1SPE7X4G51W11_news.jpg'/>",
                direction: {
                    top: {id: "", text: "Top"},
                    right: {id: "", text: "Right"},
                    bottom: {id: "", text: "Bottom"},
                    left: {id: "", text: "Left"}
                }
            }],

            links: [],

            toast: {
                message: "",
                classname: "",
                timer: null
            }
        }
    },

    created(){
        this.elements = JSON.parse(localStorage.getItem('elements')) ?? this.elements;
        this.links = JSON.parse(localStorage.getItem('links')) ?? this.links;
        this.updateData();

        EventBus.$on('link.selected', this.selectedLink);
        document.addEventListener("mouseup", this.deSelectedLink);
        document.addEventListener("keydown", this.removeLink);
    },

    updated(){
        this.updateData();
    },

    watch:{
        elements:{
            deep: true,
            handler(){
                this.updateData()
            }
        },
        links:{
            deep: true,
            handler(){
                this.updateData()
            }
        },
    },

    methods:{
        updateData(){
            localStorage.setItem('elements', JSON.stringify(this.elements));
            localStorage.setItem('links', JSON.stringify(this.links));
        },

        setToast(message, classname){
            const {toast} = this;
            toast.message = message;
            toast.classname = classname;
            clearTimeout(toast.timer);
            toast.timer = setTimeout(() => {
                toast.message = "";
                toast.classname = "";
            }, 3000)
        },

        deSelectedLink(){
            this.links.map(link => link.selected = false);
        },

        selectedLink(link){
            link.selected = true;
        },

        removeLink(e){
            if(e.key === 'Backspace' || e.key === 'Delete'){
                e.preventDefault();
                const link = this.links.find(link => link.selected);

                const oElement = findElement(this.elements, link.oId);
                oElement.direction[link.oDirect] = {};
                const tElement = findElement(this.elements, link.tId);
                tElement.direction[link.tDirect] = {};
                this.links.splice(this.links.indexOf(link), 1);
            }
        }
    }
})