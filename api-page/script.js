document.addEventListener('DOMContentLoaded', () => {
    fetch('/src/settings.json')
        .then(response => response.json())
        .then(settings => {
            document.getElementById('dynamicImage').src = settings.imageSrc || "";
            document.getElementById('page').textContent = settings.name || "Rynn UI";
            document.getElementById('header').textContent = settings.name || "Rynn UI";
            document.getElementById('name').textContent = settings.name || "Rynn UI";
            document.getElementById('version').textContent = settings.version || "v1.0 Beta";
            document.getElementById('url').textContent = `[ ${window.location.origin} ]`;
            document.getElementById('description').textContent = settings.description || "Simple API's";

            const apiLinks = document.getElementById('apiLinks');
            if (settings.links && settings.links.length > 0) {
                settings.links.forEach(link => {
                    const linkElement = document.createElement('a');
                    linkElement.href = link.url;
                    linkElement.textContent = link.name;
                    linkElement.target = '_blank';
                    linkElement.className = 'lead';
                    apiLinks.appendChild(linkElement);
                });
            }

            const apiContent = document.getElementById('apiContent');
            const categories = settings.categories;
            const apiList = [];
            Object.keys(categories).forEach(category => {
                const categoryData = categories[category];
                const categoryHeader = `<h3 class="mb-3 category-header">${category}</h3>`;
                const apis = categoryData.apis;
                const sortedApis = Object.entries(apis).sort(([nameA], [nameB]) => nameA.localeCompare(nameB));

                const categoryApis = sortedApis.map(([name, details], index, array) => {
                    apiList.push({ name, details, category });
                    const isLastApi = index === array.length - 1; // Check if it's the last API in the category
                    const apiItemClass = isLastApi ? 'col-md-6 col-lg-4 mb-2 mb-4 api-item' : 'col-md-6 col-lg-4 mb-2 api-item';

                    return `
                        <div class="${apiItemClass}" data-name="${name}" data-desc="${details.desc}">
                            <div class="hero-section d-flex align-items-center justify-content-between" style="height: 80px;">
                                <div>
                                    <h5 class="mb-0 align-middle">${name}</h5>
                                    <p class="text-muted mb-0" style="font-size: 0.8rem;">${details.desc}</p>
                                </div>
                                <button 
                                    class="btn btn-dark btn-sm get-api-btn" 
                                    data-api-name="${name}" 
                                    data-api-desc="${details.desc}" 
                                    data-api-path="${details.path}">
                                    GET
                                </button>
                            </div>
                        </div>
                    `;
                }).join('');

                if (categoryApis.length > 0) {
                    apiContent.insertAdjacentHTML('beforeend', categoryHeader + `<div class="row">${categoryApis}</div>`);
                }
            });

            const searchInput = document.getElementById('searchInput');
            searchInput.addEventListener('input', () => {
                const searchTerm = searchInput.value.toLowerCase();
                const apiItems = document.querySelectorAll('.api-item');
                const categoryHeaders = document.querySelectorAll('.category-header');

                apiItems.forEach(item => {
                    const name = item.getAttribute('data-name').toLowerCase();
                    const desc = item.getAttribute('data-desc').toLowerCase();
                    if (name.includes(searchTerm) || desc.includes(searchTerm)) {
                        item.style.display = '';
                    } else {
                        item.style.display = 'none';
                    }
                });

                categoryHeaders.forEach(header => {
                    const categoryRow = header.nextElementSibling;
                    const categoryApis = categoryRow.querySelectorAll('.api-item');
                    let hasMatchingApis = Array.from(categoryApis).some(apiItem => {
                        const name = apiItem.getAttribute('data-name').toLowerCase();
                        const desc = apiItem.getAttribute('data-desc').toLowerCase();
                        return name.includes(searchTerm) || desc.includes(searchTerm);
                    });

                    if (hasMatchingApis) {
                        header.style.display = ''; 
                    } else {
                        header.style.display = 'none';
                    }
                });
            });

            document.addEventListener('click', function (event) {
                if (event.target.classList.contains('get-api-btn')) {
                    const apiName = event.target.getAttribute('data-api-name');
                    const apiDesc = event.target.getAttribute('data-api-desc');
                    const apiPath = event.target.getAttribute('data-api-path');
                    const modalContent = document.getElementById('apiResponseContent');
                    const loadingSpinner = document.getElementById('apiResponseLoading');
                    const apiEndpoint = document.getElementById('apiEndpoint');
                    const queryInputContainer = document.getElementById('apiQueryInputContainer');
                    const submitQueryBtn = document.getElementById('submitQueryBtn');

                    document.getElementById('apiResponseModalLabel').textContent = apiName;
                    document.getElementById('apiResponseModalDesc').textContent = apiDesc;

                    submitQueryBtn.classList.remove('d-none');
                    modalContent.textContent = '';
                    modalContent.classList.add('d-none');
                    loadingSpinner.classList.add('d-none');
                    apiEndpoint.textContent = '';
                    apiEndpoint.classList.add('d-none');

                    const inputQueryField = document.createElement('input');
                    inputQueryField.type = 'text';
                    inputQueryField.className = 'form-control';
                    
                    const queryParams = new URLSearchParams(apiPath.split('?')[1]);
                    if (queryParams.has('text')) {
                        inputQueryField.placeholder = 'Enter text...';
                    } else if (queryParams.has('q')) {
                        inputQueryField.placeholder = 'Enter query...';
                    } else if (queryParams.has('url')) {
                        inputQueryField.placeholder = 'Enter URL...';
                    } else {
                        inputQueryField.placeholder = 'Enter query...';
                    }

                    queryInputContainer.innerHTML = '';
                    queryInputContainer.appendChild(inputQueryField);

                    submitQueryBtn.onclick = () => {
                        const queryValue = inputQueryField.value;
                        if (queryValue) {
                            loadingSpinner.classList.remove('d-none');
                            modalContent.classList.add('d-none');
                            queryInputContainer.innerHTML = '';
                            submitQueryBtn.classList.add('d-none');

                            const fullApiUrl = `${window.location.origin}${apiPath}${encodeURIComponent(queryValue)}`;
                            fetch(fullApiUrl)
                                .then(response => response.json())
                                .then(data => {
                                    modalContent.textContent = JSON.stringify(data, null, 2);
                                    modalContent.classList.remove('d-none');
                                    loadingSpinner.classList.add('d-none');
                                    apiEndpoint.textContent = fullApiUrl;
                                    apiEndpoint.classList.remove('d-none');
                                })
                                .catch(error => {
                                    modalContent.textContent = `Error: ${error.message}`;
                                    modalContent.classList.remove('d-none');
                                    loadingSpinner.classList.add('d-none');
                                });
                        } else {
                            modalContent.textContent = 'Please enter a query.';
                            modalContent.classList.remove('d-none');
                            loadingSpinner.classList.add('d-none');
                        }
                    };

                    const apiModal = new bootstrap.Modal(document.getElementById('apiResponseModal'));
                    apiModal.show();
                }
            });
        })
        .catch(error => console.error('Error loading settings:', error));
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
