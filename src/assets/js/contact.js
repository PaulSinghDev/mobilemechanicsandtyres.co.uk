import {
    msQuery,
    msQueryAll,
    msCreate,
    msAppend
} from 'making-stuffs-queries';
import { validateFields } from './fieldValidator';

const forms = msQueryAll('form');

const submitHandler = (e) => {
    e.preventDefault();
    const form = e.target;
    const blackout = msCreate('span', {class: 'blackout', id: 'blackout'});
    const loader = msCreate('span', {class: 'loader', id: 'loader'});
    msAppend([blackout, loader], form);
    const fields = msQueryAll('.form-field', form);
    const validator = new validateFields();
    const validated = validator.validate(fields);
    return validated === true ? sendForm(form, fields) : formRespond(validated);
}

const sendForm = async (form, fields) => {
    const url = form.getAttribute('action');
    const body = {};

    for(let field of fields) {
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
}

const formRespond = (data) => {
    if(data.response && data.response.includes('250 OK')) {
        msQuery('#loader').classList.add('success');
        setTimeout(() => {
            msQuery('#loader').classList.remove('success');
            msQuery('#blackout').remove();
            msQuery('#loader').remove();
        }, 1500);
    } else if(data[0] && data[0].error){
        msQuery('#loader').classList.add('fail');
        for(let input of data) {
            input.field.classList.add('failed');
            input.field.addEventListener('click', () => {
                input.field.classList.remove('failed');
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
}

forms.forEach(form => form.addEventListener('submit', function (e) {
    return submitHandler(e);
}));