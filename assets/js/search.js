// Website Search Functionality
class WebsiteSearch {
    constructor() {
        this.searchData = [];
        this.searchInput = null;
        this.searchResults = null;
        this.isSearchOpen = false;
        this.init();
    }

    init() {
        this.createSearchData();
        this.setupSearchElements();
        this.bindEvents();
    }

    createSearchData() {
        // Define searchable content for the website
        this.searchData = [
            // Pages
            {
                title: "Home",
                url: "index.html",
                content: "Takes Two Construction home page construction building renovation",
                type: "page"
            },
            {
                title: "About Us - Our Company",
                url: "about.html",
                content: "about company history team experience construction management",
                type: "page"
            },
            {
                title: "Contact Us",
                url: "contact.html",
                content: "contact information phone email address location get in touch",
                type: "page"
            },
            {
                title: "Careers - Job Opportunities",
                url: "careers.html",
                content: "careers jobs employment opportunities apply work team",
                type: "page"
            },
            {
                title: "Projects - Our Work",
                url: "project.html",
                content: "projects portfolio construction work completed buildings",
                type: "page"
            },
            {
                title: "News & Insights - Blog",
                url: "blog-grid.html",
                content: "blog news insights articles construction industry updates",
                type: "page"
            },
            {
                title: "Job Description",
                url: "job-description.html",
                content: "job description apply position career opportunity employment",
                type: "page"
            },
            
            // Our Approach Services
            {
                title: "Preconstruction Services",
                url: "Preconstruction.html",
                content: "preconstruction planning design development cost estimating schedule planning constructability reviews permit coordination value engineering",
                type: "service"
            },
            {
                title: "Construction Management",
                url: "Construction-management.html",
                content: "construction management project oversight contractor coordination quality control safety budget schedule",
                type: "service"
            },
            {
                title: "Project Management",
                url: "Project-management.html",
                content: "project management strategic planning risk management stakeholder communication resource optimization quality assurance",
                type: "service"
            },
            
            // Expertise Services
            {
                title: "Custom Home Renovations & Additions",
                url: "Custom-home-renovations.html",
                content: "home renovation kitchen bathroom remodel addition room expansion custom design",
                type: "service"
            },
            {
                title: "Custom Pools & Spas",
                url: "Custom-pools-spas.html",
                content: "pool spa swimming pool hot tub water features luxury backyard outdoor",
                type: "service"
            },
            {
                title: "Outdoor Living Spaces",
                url: "Outdoor-living.html",
                content: "outdoor living patio deck pergola outdoor kitchen fire pit backyard entertainment",
                type: "service"
            },
            {
                title: "Concrete & Masonry",
                url: "Concrete-masonry.html",
                content: "concrete masonry driveway walkway stamped concrete retaining walls stonework brickwork",
                type: "service"
            },
            {
                title: "Roofing & Exterior Upgrades",
                url: "Roofing-exterior-upgrades.html",
                content: "roofing exterior upgrades windows doors siding painting asphalt shingle metal roof",
                type: "service"
            },
            {
                title: "Project Management & Permitting",
                url: "Project-management-permitting.html",
                content: "project management permitting budgeting scheduling coordination inspections compliance",
                type: "service"
            },
            
            // Contact Information
            {
                title: "Phone: +1(972) 360-9250",
                url: "contact.html",
                content: "phone number call contact telephone",
                type: "contact"
            },
            {
                title: "Email: info@takestwoconstruction.com",
                url: "contact.html",
                content: "email contact information support",
                type: "contact"
            },
            {
                title: "Address: P.O. Box 292293 Lewisville, TX 75029",
                url: "contact.html",
                content: "address location office Lewisville Texas",
                type: "contact"
            }
        ];
    }

    setupSearchElements() {
        // Update the search input area HTML
        const searchArea = document.querySelector('.search-input-area');
        if (searchArea) {
            searchArea.innerHTML = `
                <div class="container">
                    <div class="search-input-inner">
                        <div class="input-div">
                            <input class="search-input autocomplete" type="text" placeholder="Search our website..." id="website-search-input">
                            <button type="button" id="search-submit-btn"><i class="far fa-search"></i></button>
                        </div>
                        <div class="search-results" id="search-results" style="display: none;">
                            <div class="search-results-header">
                                <h5>Search Results</h5>
                                <span class="results-count" id="results-count"></span>
                            </div>
                            <div class="search-results-list" id="search-results-list"></div>
                        </div>
                    </div>
                </div>
                <div id="close" class="search-close-icon"><i class="far fa-times"></i></div>
            `;
        }

        this.searchInput = document.getElementById('website-search-input');
        this.searchResults = document.getElementById('search-results');
        this.searchResultsList = document.getElementById('search-results-list');
        this.resultsCount = document.getElementById('results-count');
    }

    bindEvents() {
        // Search input events
        if (this.searchInput) {
            this.searchInput.addEventListener('input', (e) => {
                this.performSearch(e.target.value);
            });

            this.searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    this.performSearch(e.target.value);
                }
            });
        }

        // Search submit button
        const searchSubmitBtn = document.getElementById('search-submit-btn');
        if (searchSubmitBtn) {
            searchSubmitBtn.addEventListener('click', () => {
                this.performSearch(this.searchInput.value);
            });
        }

        // Clear search when closing
        const closeBtn = document.getElementById('close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                this.clearSearch();
            });
        }

        // Clear search when clicking outside
        const anywhereHome = document.getElementById('anywhere-home');
        if (anywhereHome) {
            anywhereHome.addEventListener('click', () => {
                this.clearSearch();
            });
        }
    }

    performSearch(query) {
        if (!query || query.trim().length < 2) {
            this.hideResults();
            return;
        }

        const results = this.searchContent(query.trim().toLowerCase());
        this.displayResults(results, query);
    }

    searchContent(query) {
        const results = [];
        
        this.searchData.forEach(item => {
            const titleMatch = item.title.toLowerCase().includes(query);
            const contentMatch = item.content.toLowerCase().includes(query);
            
            if (titleMatch || contentMatch) {
                let relevance = 0;
                
                // Higher relevance for title matches
                if (titleMatch) relevance += 10;
                if (contentMatch) relevance += 5;
                
                // Boost relevance for exact matches
                if (item.title.toLowerCase() === query) relevance += 20;
                
                results.push({
                    ...item,
                    relevance: relevance
                });
            }
        });

        // Sort by relevance
        return results.sort((a, b) => b.relevance - a.relevance);
    }

    displayResults(results, query) {
        if (results.length === 0) {
            this.showNoResults(query);
            return;
        }

        this.resultsCount.textContent = `${results.length} result${results.length !== 1 ? 's' : ''} found`;
        
        this.searchResultsList.innerHTML = results.map(result => `
            <div class="search-result-item" data-type="${result.type}">
                <a href="${result.url}" class="search-result-link">
                    <div class="search-result-content">
                        <h6 class="search-result-title">${this.highlightMatch(result.title, query)}</h6>
                        <p class="search-result-description">${this.getResultDescription(result, query)}</p>
                        <span class="search-result-type">${this.getTypeLabel(result.type)}</span>
                    </div>
                    <i class="fa-regular fa-arrow-right search-result-arrow"></i>
                </a>
            </div>
        `).join('');

        this.showResults();
    }

    showNoResults(query) {
        this.resultsCount.textContent = 'No results found';
        this.searchResultsList.innerHTML = `
            <div class="search-no-results">
                <i class="fa-regular fa-search"></i>
                <h6>No results found for "${query}"</h6>
                <p>Try searching for:</p>
                <ul>
                    <li>Construction services</li>
                    <li>Home renovation</li>
                    <li>Project management</li>
                    <li>Contact information</li>
                </ul>
            </div>
        `;
        this.showResults();
    }

    highlightMatch(text, query) {
        const regex = new RegExp(`(${query})`, 'gi');
        return text.replace(regex, '<mark>$1</mark>');
    }

    getResultDescription(result, query) {
        const words = result.content.split(' ');
        const queryIndex = words.findIndex(word => word.toLowerCase().includes(query.toLowerCase()));
        
        if (queryIndex !== -1) {
            const start = Math.max(0, queryIndex - 8);
            const end = Math.min(words.length, queryIndex + 8);
            let excerpt = words.slice(start, end).join(' ');
            
            if (start > 0) excerpt = '...' + excerpt;
            if (end < words.length) excerpt = excerpt + '...';
            
            return this.highlightMatch(excerpt, query);
        }
        
        return result.content.substring(0, 100) + '...';
    }

    getTypeLabel(type) {
        const labels = {
            'page': 'Page',
            'service': 'Service',
            'contact': 'Contact Info'
        };
        return labels[type] || 'Page';
    }

    showResults() {
        this.searchResults.style.display = 'block';
    }

    hideResults() {
        this.searchResults.style.display = 'none';
    }

    clearSearch() {
        if (this.searchInput) {
            this.searchInput.value = '';
        }
        this.hideResults();
    }
}

// Initialize search when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    new WebsiteSearch();
});