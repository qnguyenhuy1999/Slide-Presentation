Vue.component('app-header', {
    template: `
        <nav class="navbar navbar-expand-lg fixed-top">
            <router-link :to="{name: 'editor'}" class="navbar-brand">Slide presentation</router-link>
        
            <div class="collapse navbar-collapse">
                <ul class="navbar-nav">
                    <li class="nav-item" v-if="mode === 'editor'" @click="changeMode('view')">
                        <router-link :to="{name: 'view'}" class="nav-link">View</router-link>
                    </li>
                    <li class="nav-item" v-if="mode === 'editor'" @click="reset">
                        <a class="nav-link">Reset</a>
                    </li>
                    <li class="nav-item" v-else @click="changeMode('editor')">
                        <router-link :to="{name: 'editor'}" class="nav-link">Editor</router-link>
                    </li>
                </ul>
            </div>
        </nav>
    `,
    data(){
        return{
            mode: 'editor'
        }
    },
    methods:{
        reset(){
            localStorage.clear();
            location.reload();
        },
        changeMode(mode){
            this.mode = mode;
            if(this.mode === 'view'){
                document.documentElement.requestFullscreen();
            }else{
                document.exitFullscreen();
            }
        }
    }
})