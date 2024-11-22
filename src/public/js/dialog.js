class DialogATCH {
    constructor(name){
        this.name=name;
        this.dialog = document.getElementById(name);
        this.acceptBtn = this.dialog.querySelector(".accept-btn");
        this.cancelBtn = this.dialog.querySelector(".cancel-btn");

        this.cancelBtn.addEventListener('click', () => {
            this.dialog.close();
        });
        this.acceptBtn.addEventListener('click', () => {
            this.dialog.close();
        });
    }
    open(){
        this.dialog.showModal();
    }
    accept(func){
        if(func){
            this.acceptBtn.addEventListener('click', () => {
                func();
            });
        }
    }
    cancel(func){
        if(func){
            this.cancelBtn.addEventListener('click', () => {
                func();
            });
        }
    }
}