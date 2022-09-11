class Notification{
    static toasty(text, color){
        let cor1 = '#00b09b';
        let cor2 = '#96c93d';

        if(color == 'red'){
            cor1 = "#FF0000";
            cor2 = '#B53737'
        }

        Toastify({
            text: text,
            className: "info",
            style: {
                background: `linear-gradient(to right,${cor1} , ${cor2} )`,
            }
          }).showToast();
    } 
}

export {Notification}

