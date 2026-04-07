// Objeto responsável por toda a validação do formulário
let B7Validator = {

    // Função executada quando o formulário é enviado
    handleSubmit: (event) => {
        // Impede o envio padrão do formulário (reload da página)
        event.preventDefault();

        // Variável que controla se o formulário pode ser enviado
        let send = true;

        // Antes de validar, limpamos erros antigos (boa prática)
        B7Validator.clearErrors();

        // Seleciona todos os inputs dentro do formulário
        let inputs = form.querySelectorAll('input');

        // Percorre todos os inputs
        for (let i = 0; i < inputs.length; i++) {
            let input = inputs[i];

            // Verifica se o input atende às regras definidas
            let check = B7Validator.checkInput(input);

            // Se não for válido
            if (check !== true) {
                send = false; // impede envio
                B7Validator.showError(input, check); // mostra erro na tela
            }
        }

        // Se tudo estiver válido, envia o formulário
        if (send) {
            form.submit();
        }
    },

    // Função que valida um único input
    checkInput: (input) => {
        // Pega as regras definidas no HTML (data-rule)
        let rules = input.getAttribute('data-rule');

        // Se existir alguma regra
        if (rules !== null) {

            // Divide as regras (ex: "required|min=3")
            rules = rules.split('|');

            // Percorre cada regra
            for (let k in rules) {

                // Divide regra e valor (ex: "min=3")
                let rDetails = rules[k].split('=');

                // Verifica qual regra aplicar
                switch (rDetails[0]) {

                    // Regra: campo obrigatório
                    case 'required':
                        if (input.value.trim() === '') {
                            return 'Campo obrigatório';
                        }
                        break;

                    // Regra: tamanho mínimo
                    case 'min':
                        let min = parseInt(rDetails[1]);
                        if (input.value.length < min) {
                            return `Campo deve ter no mínimo ${min} caracteres`;
                        }
                        break;
                    case 'email':
                        // Expressão regular simples para validar email
                        let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                        if (!emailPattern.test(input.value)) {
                            return 'E-mail inválido';
                        }
                        break;    
                }
            }
        }

        // Se passou por todas regras, está válido
        return true;
    },

    // Função que exibe o erro na tela
    showError: (input, error) => {

        // Adiciona classe CSS no input (para estilizar com borda vermelha, etc)
        input.classList.add('error');

        // Cria uma div para mostrar a mensagem de erro
        let errorElement = document.createElement('div');

        // Adiciona uma classe para estilizar a mensagem
        errorElement.classList.add('error-message');

        // Define o texto do erro
        errorElement.innerText = error;

        // Insere a mensagem logo após o input
        input.parentNode.insertBefore(errorElement, input.nextSibling);
    },

    // Função que limpa todos os erros antigos
    clearErrors: () => {

        // Remove a classe de erro de todos os inputs
        let inputs = form.querySelectorAll('input');
        for (let i = 0; i < inputs.length; i++) {
            inputs[i].classList.remove('error');
        }

        // Remove todas as mensagens de erro da tela
        let errorElements = document.querySelectorAll('.error-message');
        for (let i = 0; i < errorElements.length; i++) {
            errorElements[i].remove();
        }
    }
};

// Seleciona o formulário pelo nome da classe
let form = document.querySelector('.b7validator');

// Adiciona evento de envio ao formulário
// Quando o usuário clicar em "submit", chama a função handleSubmit
form.addEventListener('submit', B7Validator.handleSubmit);