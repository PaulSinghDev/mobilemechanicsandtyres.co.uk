import { msQuery, msAppend, msCreate } from 'making-stuffs-queries';
import CSS from './sass/main.modal.scss';

class msModal extends HTMLElement {
    constructor() {
        super();
        this.close = this.close.bind(this);
    }

    connectedCallback() {
        if (this.isConnected) {
            // Attach shadow
            this.shadow = this.attachShadow({ mode: 'open' });
            // Create css node
            const style = msCreate('style');
            style.innerHTML = CSS.toString();
            msAppend([style], this.shadow);
            // Attach template
            const template = msQuery(`#${this.getAttribute('templateID')}`);
            const content = document.importNode(template.content, true);
            this.shadow.appendChild(content);
            // Add event listener for close
            this.closeBtn = msQuery('#close', this.shadowRoot);
            this.closeBtn.addEventListener('click', e => this.close(e));
            // Define wrapper variable
            this.wrapper = msQuery('.wrapper', this.shadowRoot);
            // Open the modal
            return this.open();
        }
    }

    disconnectedCallback() {
        // Clean up when removing element
        this.closeBtn.removeEventListener('click', e => this.close(e));
    }

    open() {
        document.body.style.overflow = 'hidden';
        document.addEventListener('click', e => this.close(e));
        setTimeout(() => {
            this.wrapper.classList.add('active');
        }, 100);
    }

    close(e) {
        e.stopPropagation();
        this.wrapper.classList.remove('active');
        document.body.style.overflow = 'auto';
        setTimeout(() => {
            this.remove();
        }, 500);
    }
}

customElements.define('ms-modal', msModal);