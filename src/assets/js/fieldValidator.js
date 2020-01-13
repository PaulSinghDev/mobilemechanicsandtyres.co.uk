export class validateFields {
    validate(fields) {
        let errors = [];
        const textRegex = /^[a-zA-Z]+(([ -][a-zA-Z ])?[a-zA-Z]*)*$/;
        const textAreaRegex = /[\w\d\s]/gi;
        const postcodeRegex = /^([a-zA-Z]{1,2}[0-9]{1,2}[a-zA-Z]?){1}( |-)?([0-9]{1,2}[a-zA-Z]{1,2}){1}$/;
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const phoneRegex = /^0{1}\d{10}$/;
        textRegex.lastIndex = 0;
        textAreaRegex.lastIndex = 0;
        postcodeRegex.lastIndex = 0;
        emailRegex.lastIndex = 0;
        for (let field of fields) {

            if (field.getAttribute('type') === 'submit') continue;

            if (!field.value) {
                errors.push({
                    field: field,
                    name: field.getAttribute('name'),
                    error: 'Must be at least 3 characters'
                });
                continue;
            }

            if (field.name === 'postcode') {
                if (!postcodeRegex.test(field.value)) {
                    errors.push({
                        field: field,
                        name: field.getAttribute('name'),
                        error: 'Illegal character detected'
                    });
                    continue;
                } else continue;
            }

            if(field.name === 'phone') {
                if(!phoneRegex.test(field.value)) {
                    errors.push({
                        field: field,
                        name: field.getAttribute('name'),
                        error: 'Not a phone number'
                    });
                    continue;
                } else continue;
            }

            if (field.tagName.toLowerCase() === 'textarea') {
                if (!textAreaRegex.test(field.value)) {
                    errors.push({
                        field: field,
                        name: field.getAttribute('name'),
                        error: 'Illegal character detected'
                    });
                    continue;
                } else continue;
            }

            if (field.type === 'email') {
                if (!emailRegex.test(field.value)) {
                    errors.push({
                        field: field,
                        name: field.getAttribute('name'),
                        error: 'Illegal character detected'
                    });
                    continue;
                } else continue;
            }

            if (field.type === 'text' && !textRegex.test(field.value)) {
                errors.push({
                    field: field,
                    name: field.getAttribute('name'),
                    error: 'Illegal character detected'
                });
                continue;
            }

        }

        return errors[0] ? errors : true;
    }
}