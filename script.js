document.addEventListener('DOMContentLoaded', () => {
    console.log('====================================');
    console.log("script.js loaded!");
    console.log('====================================');

    const form = document.getElementById('contactForm');
    const successMessage = document.getElementById('success');
    const closeBtn = document.querySelector('.close');
    const errorMessages = {
        'first-name': 'First Name is required',
        'last-name': 'Last Name is required',
        'email': 'Email is required',
        'query': 'Query Type is required',
        'message': 'Message is required',
        'terms': 'You must agree to the terms'
    };

    const showError = (fieldId, message) => {
        document.getElementById(`error-${fieldId}`).textContent = message;
    };

    const clearError = (fieldId) => {
        document.getElementById(`error-${fieldId}`).textContent = '';
    };

    const validateForm = (data) => {
        let isValid = true;
        Object.keys(errorMessages).forEach(fieldId => {
            if (!data[fieldId] || (fieldId === 'query' && !form.querySelector('input[name="query"]:checked'))) {
                showError(fieldId, errorMessages[fieldId]);
                isValid = false;
            } else {
                clearError(fieldId);
            }
        });
        return isValid;
    };

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const data = {};
        for (let [key, value] of formData.entries()) {
            data[key] = value;
        }

        if (validateForm(data)) {
            console.log(data);
            successMessage.style.opacity = "1";
            successMessage.style.translateY = 0;
            form.reset();
            setTimeout(() => {
                successMessage.style.opacity = '0';
            }, 3000);
        }
    });

    closeBtn?.addEventListener('click', () => {
        successMessage.style.opacity = "0";
    });
});
