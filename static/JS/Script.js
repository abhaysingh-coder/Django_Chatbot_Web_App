function hid(){
    const rem=document.getElementById('add')
    const add=document.getElementById('remove')
    const collaps=document.getElementById('collaps')
    const r=document.getElementsByClassName('r')
    console.log(r);
    
    if(rem.classList.contains('col-sm-2')){
        rem.classList.replace('col-sm-2','col-sm-0_5')
        add.classList.replace('col-sm-10','col-sm-11_5')
        for (let i = 0; i < r.length; i++) {
            r[i].classList.add('d-none');
        }
        // collaps.classList.add('d-none')
    }else{
        rem.classList.replace('col-sm-0_5','col-sm-2')
        add.classList.replace('col-sm-11_5','col-sm-10')
        // collaps.classList.remove('d-none')
        for (let i = 0; i < r.length; i++) {
            r[i].classList.remove('d-none');
        }
    }
}

window.onload = function () {
    const chatBox = document.getElementById("chatBox");
    chatBox.scrollTo({top: chatBox.scrollHeight});
};