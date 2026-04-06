let B7Validator = {
    handleSubmit: (event) => {
        event.preventDefault();

        let inputs = form.querySelectorAll('input');

        for(let i=0; i<inputs.length; i++){
            let input = inputs[i];
            let check = B7Validator.ckeckInput(input);
            if(check !== true){
                send = false;
                console.log(check);
            }
        }

        if(send){
            form.submit();
        }
    },
    ckeckInput: (input) => {
        let rules = input.getAttribute('data-rule');
        if(rules !== null){
            rules = rules.split('|');
            for(let k in rules){
                let rDetails = rules[k].split('=');
                switch(rDetails[0]){
                    case 'required':
                        if(input.value.trim() === ''){
                            return 'Campo obrigatório';
                        }
                        break;
                    case 'min':
                        let min = parseInt(rDetails[1]);
                        if(input.value.length < min){
                            return `Campo deve ter no mínimo ${min} caracteres`;
                        }
                        break;
                }
            }

        }
        return true;
    }

};

let form = document.querySelector('.b7validator');
form.addEventListener('submit', B7Validator.handleSubmit);