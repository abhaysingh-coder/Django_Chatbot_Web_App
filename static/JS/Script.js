function hid(){
    const sidebar = document.getElementById('add');
    const content = document.getElementById('remove');
    const r = document.getElementsByClassName('r');
    // Mobile View
    if(window.innerWidth <= 768){
        sidebar.classList.toggle('d-none');
        if(sidebar.classList.contains('d-none')){
            content.classList.remove('col-sm-10');
            content.classList.add('col-sm-12');
        }else{
            content.classList.remove('col-sm-12');
            content.classList.add('col-sm-10');
        }
    }
    // Desktop View
    else{
        if(sidebar.classList.contains('col-md-2')){
            sidebar.classList.replace('col-md-2','col-sm-0_5');
            content.classList.replace('col-md-10','col-sm-11_5');
            for(let i = 0; i < r.length; i++){
                r[i].classList.add('d-none');
            }
        }else{
            sidebar.classList.replace('col-sm-0_5','col-md-2');
            content.classList.replace('col-sm-11_5','col-md-10');
            for(let i = 0; i < r.length; i++){
                r[i].classList.remove('d-none');
            }
        }
    }
}

window.onload = function () {
    const chatBox = document.getElementById("chatBox");
    if (chatBox) {
        chatBox.scrollTo({ top: chatBox.scrollHeight });
    }
};