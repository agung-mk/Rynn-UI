document.addEventListener('DOMContentLoaded', async () => {
    try {
        const settings = await fetch('/src/settings.json').then(res => res.json());

        const setContent = (id, property, value) => {
            const element = document.getElementById(id);
            if (element) element[property] = value;
        };

        setContent('dynamicImage', 'src', settings.imageSrc || "");
        setContent('page', 'textContent', settings.name || "Rynn UI");
        setContent('header', 'textContent', settings.name || "Rynn UI");
        setContent('name', 'textContent', settings.name || "Rynn UI");
        setContent('version', 'textContent', settings.version || "v1.0 Beta");
        setContent('url', 'textContent', `[ ${window.location.origin} ]`);
        setContent('description', 'textContent', settings.description || "Simple API's");

        const apiLinksContainer = document.getElementById('apiLinks');
        if (apiLinksContainer && settings.links?.length) {
            settings.links.forEach(({ url, name }) => {
                const link = Object.assign(document.createElement('a'), {
                    href: url,
                    textContent: name,
                    target: '_blank',
                    className: 'lead'
                });
                apiLinksContainer.appendChild(link);
            });
        }

        const apiContent = document.getElementById('apiContent');
        Object.entries(settings.categories || {}).forEach(([category, { apis }]) => {
            const sortedApis = Object.entries(apis).sort(([a], [b]) => a.localeCompare(b));
            const categoryContent = sortedApis.map(([name, { desc, path }], index, array) => {
                const isLastApi = index === array.length - 1;
                const apiClass = `col-md-6 col-lg-4 api-item ${isLastApi ? 'mb-4' : 'mb-2'}`;
                return `
                    <div class="${apiClass}" data-name="${name}" data-desc="${desc}">
                        <div class="hero-section d-flex align-items-center justify-content-between" style="height: 80px;">
                            <div>
                                <h5 class="mb-0">${name}</h5>
                                <p class="text-muted mb-0" style="font-size: 0.8rem;">${desc}</p>
                            </div>
                            <button class="btn btn-dark btn-sm get-api-btn" data-api-path="${path}" data-api-name="${name}" data-api-desc="${desc}">
                                GET
                            </button>
                        </div>
                    </div>
                `;
            }).join('');
            apiContent.insertAdjacentHTML('beforeend', `<h3 class="mb-3 category-header">${category}</h3><div class="row">${categoryContent}</div>`);
        });

        const searchInput = document.getElementById('searchInput');
        searchInput.addEventListener('input', () => {
            const searchTerm = searchInput.value.toLowerCase();
            const apiItems = document.querySelectorAll('.api-item');
            const categoryHeaders = document.querySelectorAll('.category-header');

            apiItems.forEach(item => {
                const name = item.getAttribute('data-name').toLowerCase();
                const desc = item.getAttribute('data-desc').toLowerCase();
                item.style.display = (name.includes(searchTerm) || desc.includes(searchTerm)) ? '' : 'none';
            });

            categoryHeaders.forEach(header => {
                const categoryRow = header.nextElementSibling;
                const visibleItems = categoryRow.querySelectorAll('.api-item:not([style*="display: none"])');
                header.style.display = visibleItems.length ? '' : 'none';
            });
        });

        document.addEventListener('click', event => {
            if (!event.target.classList.contains('get-api-btn')) return;

            const { apiPath, apiName, apiDesc } = event.target.dataset;
            const modal = new bootstrap.Modal(document.getElementById('apiResponseModal'));
            const modalRefs = {
                label: document.getElementById('apiResponseModalLabel'),
                desc: document.getElementById('apiResponseModalDesc'),
                content: document.getElementById('apiResponseContent'),
                endpoint: document.getElementById('apiEndpoint'),
                spinner: document.getElementById('apiResponseLoading'),
                queryInputContainer: document.getElementById('apiQueryInputContainer'),
                submitBtn: document.getElementById('submitQueryBtn')
            };

            modalRefs.label.textContent = apiName;
            modalRefs.desc.textContent = apiDesc;
            modalRefs.content.textContent = '';
            modalRefs.endpoint.textContent = '';
            modalRefs.spinner.classList.add('d-none');
            modalRefs.content.classList.add('d-none');
            modalRefs.endpoint.classList.add('d-none');

            const queryPlaceholder = new URLSearchParams(apiPath.split('?')[1]).keys().next().value || 'query';
            const inputField = Object.assign(document.createElement('input'), {
                type: 'text',
                className: 'form-control',
                placeholder: `Enter ${queryPlaceholder}...`
            });

            modalRefs.queryInputContainer.replaceChildren(inputField);

            modalRefs.submitBtn.classList.remove('d-none');
            modalRefs.submitBtn.onclick = async () => {
                const query = inputField.value;
                if (!query) {
                    modalRefs.content.textContent = 'Please enter a query.';
                    modalRefs.content.classList.remove('d-none');
                    return;
                }

                modalRefs.spinner.classList.remove('d-none');
                modalRefs.content.classList.add('d-none');
                modalRefs.submitBtn.classList.add('d-none');
                modalRefs.queryInputContainer.innerHTML = '';

                try {
                    const apiUrl = `${window.location.origin}${apiPath}${encodeURIComponent(query)}`;
                    const data = await fetch(apiUrl).then(res => res.json());
                    modalRefs.content.textContent = JSON.stringify(data, null, 2);
                    modalRefs.endpoint.textContent = apiUrl;
                    modalRefs.endpoint.classList.remove('d-none');
                } catch (error) {
                    modalRefs.content.textContent = `Error: ${error.message}`;
                } finally {
                    modalRefs.spinner.classList.add('d-none');
                    modalRefs.content.classList.remove('d-none');
                }
            };

            modal.show();
        });
    } catch (error) {
        console.error('Error loading settings:', error);
    }
});

window.addEventListener('scroll', function () {
    const navbar = document.querySelector('.navbar');
    const navbarBrand = document.querySelector('.navbar-brand');
    if (window.scrollY > 0) {
        navbarBrand.classList.add('visible');
        navbar.classList.add('scrolled');
    } else {
        navbarBrand.classList.remove('visible');
        navbar.classList.remove('scrolled');
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const loadingScreen = document.getElementById("loadingScreen");
    const body = document.body;
    body.classList.add("no-scroll");
    setTimeout(() => {
        loadingScreen.style.display = "none";
        body.classList.remove("no-scroll");
    }, 2000);
});
