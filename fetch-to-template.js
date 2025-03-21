document.addEventListener('alpine:init', () => {
    Alpine.directive('fetch-to-template', (el, { expression }, { evaluate }) => {
        const config = evaluate(expression);
        const url = config.url;
        const target_id = config.target_id;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                let templateElement;

                // If `id` is provided, use that; otherwise, fallback to first <template> in `el`
                if (target_id) {
                    templateElement = el.querySelector(target_id);
                } else {
                    templateElement = el;
                }

                if (!templateElement) {
                    console.error('Template not found.');
                    return;
                }

                const template = templateElement.innerHTML;
                const rendered = nunjucks.renderString(template, { data });
                el.innerHTML = rendered;
            });
    });
