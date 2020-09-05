const verifyForms = () => {
    const forms = document.forms;
    const message = {
        initial: '',
        loading: 'Loading...',
        success: 'Thanks for your message',
        postError: 'Error',
        inputError: 'Email is incorrect',
    };
    const typeError = {
        emptyField: 'emptyField',
        wrongEmail: 'wrongEmail',
    };

    for (let form of forms) {
        form.addEventListener('submit', event => {
            event.preventDefault();
            const submitButton = getSubmitButton(form);
            const messageArea = getMessageArea(form);
            let result = checkForm(form);
            // если проверка вернула пустой массив - поле правильно заполнено
            if (!result.length) {
                submitButton.setAttribute('type', 'button');
                messageArea.textContent = message.loading;
                postForm(form.action, form)
                    .then(response => {
                        messageArea.textContent = message.success;
                    })
                    .catch(error => {
                        messageArea.textContent = message.error;
                    })
                    .finally(() => {
                        submitButton.setAttribute('type', 'submit');
                        cleanFields(form);
                        setTimeout(() => {
                            messageArea.textContent = message.initial;
                        }, 3000);
                    })
            } else {
                result.forEach(item => {
                    switch (item.typeError) {
                        case typeError.emptyField:
                            item.element.classList.add('with-error');
                            item.element.setAttribute('data-origin-placeholder', item.element.placeholder);
                            item.element.placeholder = 'Field is required';
                            break;
                        case typeError.wrongEmail:
                            item.element.classList.add('with-error');
                            messageArea.textContent = message.inputError;
                        default:
                            break;
                    }
                });
            }
        })
    }

    const checkForm = form => {
        const pattern = /^[-a-z0-9!#$%&'*+/=?^_`{|}~]+(?:\.[-a-z0-9!#$%&'*+/=?^_`{|}~]+)*@(?:[a-z0-9]([-a-z0-9]{0,61}[a-z0-9])?\.)*(?:aero|arpa|asia|biz|cat|com|coop|edu|gov|info|int|jobs|mil|mobi|museum|name|net|org|pro|tel|travel|[a-z][a-z])$/;
        const elementErrorCreator = (element, typeError) => ({ element, typeError });
        let elementWithError = [];

        for (let element of form.elements) {

            if (element.tagName === 'INPUT' && element.type === 'email') {
                if (element.value) {
                    let email = element.value;
                    let result = pattern.test(email);
                    if (!result) {
                        elementWithError.push(elementErrorCreator(element, typeError.wrongEmail));
                    }
                } else {
                    elementWithError.push(elementErrorCreator(element, typeError.emptyField));
                }
            }
        };
        return elementWithError;
    };

    const postForm = async (url, form) => {
        const formData = new FormData(form);
        let response = await fetch(url, {
            method: 'POST',
            body: formData,
        })
        return await response.text();
    };

    const getSubmitButton = form => {
        for(element of form.elements){
            if(element.type === 'submit') return element;
        }
    };

    const getMessageArea = form => {
        for(child of form.children){
            if(child.classList.contains('massageBox')) return child;
        }
    }; 

    const cleanFields = form => {
        for(let field of form.elements){
            field.value = '';
            if(field.dataset.originPlaceholder){
                field.placeholder = field.dataset.originPlaceholder;
                field.removeAttribute('data-origin-placeholder')
            }    
    
        }
    };
    
    for (let form of forms) {
        form.addEventListener('input', event => {
            if (event.target.tagName === 'INPUT') {
                if (event.target.classList.contains('with-error')) {
                    event.target.classList.remove('with-error')
                }
            }
        })
    };
}