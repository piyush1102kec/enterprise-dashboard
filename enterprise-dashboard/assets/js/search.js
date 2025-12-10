/**
 * Search Functionality
 * Handles global search input and results rendering.
 */

document.addEventListener('DOMContentLoaded', () => {
    initSearch();
});

function initSearch() {
    const searchInput = document.getElementById('global-search');
    // Create results container dynamically
    const resultsContainer = document.createElement('div');
    resultsContainer.id = 'search-results';
    resultsContainer.className = 'absolute top-full left-0 w-full bg-white rounded-xl shadow-xl border border-gray-100 mt-2 max-h-96 overflow-y-auto hidden z-50';

    // Insert after search input's parent div
    if (searchInput) {
        searchInput.parentElement.appendChild(resultsContainer);

        // Add minimal style for scrollbar
        resultsContainer.style.scrollbarWidth = 'thin';

        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            if (query.length < 2) {
                resultsContainer.classList.add('hidden');
                return;
            }

            const matches = window.MockData.allCompanies.filter(c =>
                c.symbol.toLowerCase().includes(query) ||
                c.name.toLowerCase().includes(query)
            );

            renderResults(matches, resultsContainer);
        });

        // Hide on click outside
        document.addEventListener('click', (e) => {
            if (!searchInput.parentElement.contains(e.target)) {
                resultsContainer.classList.add('hidden');
            }
        });
    }
}

function renderResults(matches, container) {
    if (matches.length === 0) {
        container.innerHTML = `
            <div class="p-4 text-center text-gray-500 text-sm">
                No results found.
            </div>
        `;
    } else {
        container.innerHTML = matches.map(c => {
            const changeColor = c.change >= 0 ? 'text-green-600' : 'text-red-600';
            const changeIcon = c.change >= 0 ? '▲' : '▼';

            return `
                <div class="px-4 py-3 hover:bg-gray-50 flex justify-between items-center bg-white cursor-pointer border-b border-gray-50 last:border-none transition-colors">
                    <div>
                        <div class="font-bold text-gray-900">${c.symbol}</div>
                        <div class="text-xs text-gray-500">${c.name}</div>
                    </div>
                    <div class="text-right">
                        <div class="font-medium text-gray-900">$${c.price.toFixed(2)}</div>
                        <div class="text-xs ${changeColor} font-medium">${changeIcon} ${Math.abs(c.change)}%</div>
                    </div>
                </div>
            `;
        }).join('');
    }

    container.classList.remove('hidden');
}
