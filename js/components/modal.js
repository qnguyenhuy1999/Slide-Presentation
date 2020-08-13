Vue.component('app-modal', {
    template:`
        <div class="modal" tabindex="-1" role="dialog">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Modal title</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="closeModal">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body" >
                        <div ref="editor"></div>
                    </div>
                    <div class="modal-footer">
                        <input class="form-control" placeholder="Top" 
                            :disabled="!element.direction.top.id" 
                            :value="element.direction.top.text"
                            @change="changeTitle($event, 'top')"/>
                            
                        <input class="form-control" placeholder="Right"
                            :disabled="!element.direction.right.id" 
                            :value="element.direction.right.text"
                            @change="changeTitle($event, 'right')"/>
                            
                        <input class="form-control" placeholder="Bottom" 
                            :disabled="!element.direction.bottom.id" 
                            :value="element.direction.bottom.text"
                            @change="changeTitle($event, 'bottom')"/>
                            
                        <input class="form-control" placeholder="Left" 
                            :disabled="!element.direction.left.id"
                            :value="element.direction.left.text"
                            @change="changeTitle($event, 'left')"/>
                    </div>
                </div>
            </div>
        </div>
    `,
    props:{
        element: Object
    },
    mounted(){
        const editor = CKEDITOR.replace(this.$refs.editor);
        editor.setData(this.element.content);
        editor.on('change', () => {
            this.element.content = editor.getData();
        })
    },
    methods:{
        closeModal(){
            EventBus.$emit('modal.close');
        },

        changeTitle(event, direction){
            this.element.direction[direction].text = event.target.value;
        }
    }
})