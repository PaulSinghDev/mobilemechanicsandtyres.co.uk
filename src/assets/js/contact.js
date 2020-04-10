import {
    msQuery,
    msQueryAll,
    msCreate,
    msAppend
} from 'making-stuffs-queries';
import {
    validateFields
} from './fieldValidator';

const forms = msQueryAll('form');

const submitHandler = (e) => {
    e.preventDefault();

    const form = e.target;
    // Add a loader
    const blackout = msCreate('span', {
        class: 'blackout',
        id: 'blackout'
    });
    const loader = msCreate('span', {
        class: 'loader',
        id: 'loader'
    });
    msAppend([blackout, loader], form);

    // Google recaptcha 
    grecaptcha.ready(function () {
        grecaptcha.execute('6LeotNEUAAAAAFa02LZQ2rXFcnil1ppPpILrPuQt', {
            action: 'submit'
        }).then(async function (token) {
            const reply = await fetch('https://localhost:60002/auth', {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify({
                    token
                })
            });

            const data = await reply.json();
            if (!data.success) {
                return alert('It seems that Google reCaptcha thinks you are a robot');
            }
        });
    });
    const fields = msQueryAll('.form-field', form);
    const validator = new validateFields();
    const validated = validator.validate(fields);
    return validated === true ? sendForm(form, fields) : formRespond(validated);
};

const sendForm = async (form, fields) => {
    const url = form.getAttribute('action');
    const body = {};

    for (let field of fields) {
        body[field.name] = field.value;
    }
    const reply = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });
    const data = await reply.json();
    return formRespond(data);
};

const formRespond = (data) => {
    if (data.response && data.response.includes('250 OK')) {
        msQuery('#loader').classList.add('success');
        setTimeout(() => {
            msQuery('#loader').classList.remove('success');
            msQuery('#blackout').remove();
            msQuery('#loader').remove();
        }, 1500);
    } else if (data[0] && data[0].error) {
        msQuery('#loader').classList.add('fail');
        for (let input of data) {
            const elem = msQuery(`[name="${input.field}"`);
            elem.classList.add('failed');
            elem.addEventListener('click', () => {
                elem.classList.remove('failed');
            });
        }
        setTimeout(() => {
            msQuery('#loader').classList.remove('fail');
            msQuery('#blackout').remove();
            msQuery('#loader').remove();
        }, 1500);
    } else {
        msQuery('#loader').classList.add('fail');
        setTimeout(() => {
            msQuery('#loader').classList.remove('fail');
            msQuery('#blackout').remove();
            msQuery('#loader').remove();
        }, 1500);
    }
};

forms.forEach(form => form.addEventListener('submit', function (e) {
    return submitHandler(e);
}));