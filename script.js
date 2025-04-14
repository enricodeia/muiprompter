/**
 * UI Prompt Builder
 * 
 * This script powers the UI Prompt Builder, a tool for creating detailed prompts
 * for AI-powered mobile UI mockups. It handles all the interactive elements,
 * state management, and prompt generation.
 */

document.addEventListener('DOMContentLoaded', function() {
    // State Management
    const state = {
        darkMode: true, // Start with dark mode by default
        userThemePreference: true,
        formData: {
            appName: '',
            ageRangeMin: 18,
            ageRangeMax: 35,
            audienceDesc: '',
            appLogo: '',
            deviceType: 'iphone15Pro',
            customWidth: 1179,
            customHeight: 2556
        },
        uiStyle: 'Dark Mode', // Default UI style
        customStyle: '',
        categories: ['Social'], // Default selected category
        customTones: [],
        tones: ['Friendly'], // Default selected tone
        selectedScreen: 'home', // Default to home screen
        screenOptions: {
            login: {
                options: [
                    { id: 'socialLogin', label: 'Include social login', checked: true, icon: 'fab fa-google' },
                    { id: 'rememberMe', label: 'Include "Remember Me" checkbox', checked: true, icon: 'fas fa-check-square' },
                    { id: 'forgotPassword', label: 'Include forgot password link', checked: true, icon: 'fas fa-key' },
                    { id: 'biometricLogin', label: 'Include biometric login', checked: false, icon: 'fas fa-fingerprint' }
                ],
                customOptions: []
            },
            signUp: {
                options: [
                    { id: 'socialSignUp', label: 'Include social signup', checked: true, icon: 'fab fa-facebook' },
                    { id: 'termsCheckbox', label: 'Include terms & conditions checkbox', checked: true, icon: 'fas fa-file-contract' },
                    { id: 'marketingConsent', label: 'Include marketing consent', checked: false, icon: 'fas fa-envelope' },
                    { id: 'phoneVerification', label: 'Include phone verification', checked: false, icon: 'fas fa-mobile-alt' }
                ],
                customOptions: []
            },
            onboarding: {
                options: [
                    { id: 'pagination', label: 'Include pagination dots', checked: true, icon: 'fas fa-ellipsis-h' },
                    { id: 'skipButton', label: 'Include skip button', checked: true, icon: 'fas fa-forward' },
                    { id: 'progressIndicator', label: 'Include progress indicator', checked: true, icon: 'fas fa-tasks' },
                    { id: 'animations', label: 'Include animations', checked: true, icon: 'fas fa-photo-video' }
                ],
                customOptions: []
            },
            home: {
                options: [
                    { id: 'fab', label: 'Include floating action button (FAB)', checked: true, icon: 'fas fa-plus-circle' },
                    { id: 'cardLayout', label: 'Use card layout', checked: true, icon: 'fas fa-th-large' },
                    { id: 'listLayout', label: 'Use list layout', checked: false, icon: 'fas fa-list' },
                    { id: 'searchBar', label: 'Include search bar', checked: false, icon: 'fas fa-search' },
                    { id: 'bottomNav', label: 'Include bottom navigation bar', checked: true, icon: 'fas fa-grip-lines' }
                ],
                customOptions: []
            },
            profile: {
                options: [
                    { id: 'avatar', label: 'Include avatar', checked: true, icon: 'fas fa-user-circle' },
                    { id: 'editButton', label: 'Include edit button', checked: true, icon: 'fas fa-edit' },
                    { id: 'stats', label: 'Include user stats', checked: true, icon: 'fas fa-chart-bar' },
                    { id: 'activityFeed', label: 'Include activity feed', checked: false, icon: 'fas fa-history' },
                    { id: 'logoutButton', label: 'Include logout button', checked: true, icon: 'fas fa-sign-out-alt' }
                ],
                customOptions: []
            },
            chat: {
                options: [
                    { id: 'messageInput', label: 'Include message input', checked: true, icon: 'fas fa-keyboard' },
                    { id: 'attachmentButton', label: 'Include attachment button', checked: true, icon: 'fas fa-paperclip' },
                    { id: 'emojiPicker', label: 'Include emoji picker', checked: true, icon: 'fas fa-smile' },
                    { id: 'voiceMessage', label: 'Include voice message', checked: false, icon: 'fas fa-microphone' },
                    { id: 'readReceipts', label: 'Include read receipts', checked: true, icon: 'fas fa-check-double' }
                ],
                customOptions: []
            },
            search: {
                options: [
                    { id: 'filterOptions', label: 'Include filter options', checked: true, icon: 'fas fa-filter' },
                    { id: 'recentSearches', label: 'Include recent searches', checked: true, icon: 'fas fa-history' },
                    { id: 'voiceSearch', label: 'Include voice search', checked: false, icon: 'fas fa-microphone' },
                    { id: 'categoryFilters', label: 'Include category filters', checked: true, icon: 'fas fa-tags' },
                    { id: 'sortOptions', label: 'Include sort options', checked: true, icon: 'fas fa-sort' }
                ],
                customOptions: []
            },
            contentView: {
                options: [
                    { id: 'saveButton', label: 'Include save button', checked: true, icon: 'fas fa-bookmark' },
                    { id: 'shareButton', label: 'Include share button', checked: true, icon: 'fas fa-share-alt' },
                    { id: 'commentSection', label: 'Include comment section', checked: true, icon: 'fas fa-comments' },
                    { id: 'relatedContent', label: 'Include related content', checked: true, icon: 'fas fa-link' },
                    { id: 'likeButton', label: 'Include like button', checked: true, icon: 'fas fa-heart' }
                ],
                customOptions: []
            },
            checkout: {
                options: [
                    { id: 'orderSummary', label: 'Include order summary', checked: true, icon: 'fas fa-receipt' },
                    { id: 'paymentOptions', label: 'Include payment options', checked: true, icon: 'fas fa-credit-card' },
                    { id: 'shippingAddress', label: 'Include shipping address', checked: true, icon: 'fas fa-map-marker-alt' },
                    { id: 'promoCode', label: 'Include promo code field', checked: true, icon: 'fas fa-tag' },
                    { id: 'savePaymentInfo', label: 'Include save payment info option', checked: false, icon: 'fas fa-save' }
                ],
                customOptions: []
            },
            settings: {
                options: [
                    { id: 'darkModeToggle', label: 'Include dark mode toggle', checked: true, icon: 'fas fa-moon' },
                    { id: 'notificationsToggle', label: 'Include notifications toggle', checked: true, icon: 'fas fa-bell' },
                    { id: 'privacySettings', label: 'Include privacy settings', checked: true, icon: 'fas fa-lock' },
                    { id: 'accountSettings', label: 'Include account settings', checked: true, icon: 'fas fa-user-cog' },
                    { id: 'helpSupport', label: 'Include help & support', checked: true, icon: 'fas fa-question-circle' }
                ],
                customOptions: []
            },
            custom: {
                name: '',
                options: [],
                customOptions: []
            }
        },
        copyStatus: '',
        lastUpdate: null,
        expandedCards: new Set(['general-info', 'ui-style', 'category', 'tone', 'ui-flow']),
        dragState: {
            draggedElement: null,
            initialY: 0,
            currentY: 0
        }
    };

    // DOM Elements
    // Card headers for toggle
    const cardHeaders = document.querySelectorAll('.card-header');
    
    // Theme toggle
    const themeToggle = document.getElementById('theme-toggle');
    
    // Form inputs
    const appNameInput = document.getElementById('appName');
    const ageRangeMinInput = document.getElementById('ageRangeMin');
    const ageRangeMaxInput = document.getElementById('ageRangeMax');
    const audienceDescInput = document.getElementById('audienceDesc');
    const appLogoInput = document.getElementById('appLogo');
    const deviceTypeSelect = document.getElementById('deviceType');
    const customWidthInput = document.getElementById('customWidth');
    const customHeightInput = document.getElementById('customHeight');
    const customSizeContainer = document.getElementById('customSizeContainer');
    
    // UI Style options
    const styleTagsContainer = document.getElementById('style-tags');
    const styleTags = document.querySelectorAll('#style-tags .tag-item');
    const customStyleInput = document.getElementById('customStyle');
    const addCustomStyleBtn = document.getElementById('addCustomStyle');
    
    // Category and tone tags
    const categoryTags = document.querySelectorAll('#category-tags .tag-item');
    const toneTags = document.querySelectorAll('#tone-tags .tag-item');
    const customToneInput = document.getElementById('customTone');
    const addCustomToneBtn = document.getElementById('addCustomTone');
    
    // Screen selection
    const screenRadios = document.querySelectorAll('.screen-radio');
    const flowItems = document.querySelectorAll('.flow-item');
    
    // Screen options container
    const screenOptionsContainer = document.getElementById('screen-options-container');
    const screenOptionsContent = document.getElementById('screen-options-content');
    const addCustomOptionBtn = document.getElementById('addCustomOption');
    const draggableOptionsContainer = document.getElementById('draggable-options-container');
    
    // Output elements
    const promptOutput = document.getElementById('prompt-output');
    const selectedFeaturesContainer = document.getElementById('selected-features-container');
    const selectedFeaturesList = document.getElementById('selected-features-list');
    
    // Action buttons
    const copyButton = document.getElementById('copy-button');
    const downloadButton = document.getElementById('download-button');
    const resetButton = document.getElementById('reset-button');

    // Templates
    const draggableOptionTemplate = document.getElementById('draggable-option-template');
    const customOptionTemplate = document.getElementById('custom-option-template');

    // Initialize the app
    function initApp() {
        // Apply dark mode preference
        loadUserPreferences();
        updateDarkModeUI();
        
        // Initialize all event listeners
        setupEventListeners();
        
        // Initialize card toggles
        initCardToggles();
        
        // Initialize selections
        initializeSelections();
        
        // Initialize screen options for default screen (home)
        loadScreenOptions('home');
        
        // Generate initial prompt
        updateGeneratedPrompt();
        
        // Update selected features
        updateSelectedFeaturesBadges();
        
        // Setup drag and drop for options
        setupDragAndDrop();
    }
    
    // Load user preferences from localStorage
    function loadUserPreferences() {
        const savedTheme = localStorage.getItem('ui-prompt-builder-theme');
        if (savedTheme) {
            state.darkMode = savedTheme === 'dark';
            state.userThemePreference = true;
        }
    }

    // Save user preferences to localStorage
    function saveUserPreferences() {
        localStorage.setItem('ui-prompt-builder-theme', state.darkMode ? 'dark' : 'light');
    }
    
    // Initialize card toggles
    function initCardToggles() {
        cardHeaders.forEach(header => {
            const card = header.parentElement;
            const cardId = card.id;
            const content = card.querySelector('.card-content');
            const toggle = header.querySelector('.card-toggle i');
            
            // Set initial state based on expandedCards set
            if (!state.expandedCards.has(cardId)) {
                content.style.display = 'none';
                toggle.classList.remove('fa-chevron-up');
                toggle.classList.add('fa-chevron-down');
                card.classList.add('card-expanded');
            }
        });
    }
    
    // Initialize default selections
    function initializeSelections() {
        // Set UI style
        styleTags.forEach(tag => {
            if (tag.dataset.value === state.uiStyle) {
                tag.classList.add('selected');
            } else {
                tag.classList.remove('selected');
            }
        });
        
        // Set category selection
        categoryTags.forEach(tag => {
            if (state.categories.includes(tag.dataset.value)) {
                tag.classList.add('selected');
            } else {
                tag.classList.remove('selected');
            }
        });
        
        // Set tone selection
        toneTags.forEach(tag => {
            if (state.tones.includes(tag.dataset.value)) {
                tag.classList.add('selected');
            } else {
                tag.classList.remove('selected');
            }
        });
        
        // Set device type
        deviceTypeSelect.value = state.formData.deviceType;
        customWidthInput.value = state.formData.customWidth;
        customHeightInput.value = state.formData.customHeight;
        
        // Show/hide custom size container
        customSizeContainer.classList.toggle('hidden', state.formData.deviceType !== 'custom');
        
        // Set screen selection
        const selectedRadio = document.getElementById(`${state.selectedScreen}Screen`);
        if (selectedRadio) {
            selectedRadio.checked = true;
            
            // Mark the flow item
            const selectedFlowItem = document.querySelector(`.flow-item[data-screen="${state.selectedScreen}"]`);
            if (selectedFlowItem) {
                selectedFlowItem.classList.add('selected');
            }
        }
        
        // Set form values
        appNameInput.value = state.formData.appName;
        ageRangeMinInput.value = state.formData.ageRangeMin;
        ageRangeMaxInput.value = state.formData.ageRangeMax;
        audienceDescInput.value = state.formData.audienceDesc;
        appLogoInput.value = state.formData.appLogo;
    }

    // Set up all event listeners
    function setupEventListeners() {
        // Card toggles
        cardHeaders.forEach(header => {
            header.addEventListener('click', toggleCard);
        });
        
        // Theme toggle
        themeToggle.addEventListener('click', toggleDarkMode);
        
        // General form inputs
        appNameInput.addEventListener('input', updateFormData);
        ageRangeMinInput.addEventListener('input', updateFormData);
        ageRangeMaxInput.addEventListener('input', updateFormData);
        audienceDescInput.addEventListener('input', updateFormData);
        appLogoInput.addEventListener('input', updateFormData);
        deviceTypeSelect.addEventListener('change', handleDeviceTypeChange);
        customWidthInput.addEventListener('input', updateFormData);
        customHeightInput.addEventListener('input', updateFormData);
        
        // UI Style tags
        styleTags.forEach(tag => {
            tag.addEventListener('click', selectUIStyle);
        });
        
        // Custom style
        addCustomStyleBtn.addEventListener('click', addCustomStyle);
        customStyleInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                addCustomStyle();
            }
        });
        
        // Category tags
        categoryTags.forEach(tag => {
            tag.addEventListener('click', toggleCategory);
        });
        
        // Tone tags
        toneTags.forEach(tag => {
            tag.addEventListener('click', toggleTone);
        });
        
        // Custom tone
        addCustomToneBtn.addEventListener('click', addCustomTone);
        customToneInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                addCustomTone();
            }
        });
        
        // Screen selection
        screenRadios.forEach(radio => {
            radio.addEventListener('change', selectScreen);
        });
        
        // Make entire flow item clickable
        flowItems.forEach(item => {
            item.addEventListener('click', function(e) {
                // Don't trigger if clicking directly on the radio button
                if (e.target.type !== 'radio') {
                    const radio = this.querySelector('input[type="radio"]');
                    radio.checked = true;
                    
                    // Trigger change event
                    const event = new Event('change');
                    radio.dispatchEvent(event);
                }
            });
        });
        
        // Add custom option button
        addCustomOptionBtn.addEventListener('click', showCustomOptionForm);
        
        // Buttons
        copyButton.addEventListener('click', copyToClipboard);
        downloadButton.addEventListener('click', downloadPrompt);
        resetButton.addEventListener('click', resetAllFields);
        
        // Listen for system dark mode changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
            if (!state.userThemePreference) {
                state.darkMode = e.matches;
                updateDarkModeUI();
            }
        });
        
        // Add keyboard shortcuts
        document.addEventListener('keydown', handleKeyboardShortcuts);
    }

    // Handle card toggle
    function toggleCard() {
        const card = this.parentElement;
        const cardId = card.id;
        const content = card.querySelector('.card-content');
        const toggle = this.querySelector('.card-toggle i');
        
        card.classList.toggle('card-expanded');
        
        if (card.classList.contains('card-expanded')) {
            content.style.display = 'none';
            toggle.classList.remove('fa-chevron-up');
            toggle.classList.add('fa-chevron-down');
            state.expandedCards.delete(cardId);
        } else {
            content.style.display = 'block';
            toggle.classList.remove('fa-chevron-down');
            toggle.classList.add('fa-chevron-up');
            state.expandedCards.add(cardId);
            
            // Animate content
            setTimeout(() => {
                content.classList.add('fade-in');
            }, 10);
        }
    }

    // Toggle dark mode
    function toggleDarkMode() {
        state.darkMode = !state.darkMode;
        state.userThemePreference = true;
        updateDarkModeUI();
        saveUserPreferences();
    }

    // Update dark mode UI
    function updateDarkModeUI() {
        document.body.classList.toggle('dark-mode', state.darkMode);
        
        themeToggle.innerHTML = state.darkMode 
            ? '<i class="fas fa-sun"></i>' 
            : '<i class="fas fa-moon"></i>';
    }

    // Update form data
    function updateFormData(e) {
        const { id, value, type } = e.target;
        
        if (type === 'number') {
            const numValue = parseInt(value) || 0;
            
            // Age range validation
            if (id === 'ageRangeMin' && numValue > state.formData.ageRangeMax) {
                state.formData.ageRangeMax = numValue;
                ageRangeMaxInput.value = numValue;
            } else if (id === 'ageRangeMax' && numValue < state.formData.ageRangeMin) {
                state.formData.ageRangeMin = numValue;
                ageRangeMinInput.value = numValue;
            }
            
            state.formData[id] = numValue;
        } else {
            state.formData[id] = value;
        }
        
        state.lastUpdate = id;
        updateGeneratedPrompt();
    }

    // Handle device type change
    function handleDeviceTypeChange() {
        const deviceType = deviceTypeSelect.value;
        state.formData.deviceType = deviceType;
        
        // Show/hide custom size inputs
        if (deviceType === 'custom') {
            customSizeContainer.classList.remove('hidden');
        } else {
            customSizeContainer.classList.add('hidden');
            
            // Set resolution based on device type
            const resolutions = {
                'iphone15Pro': { width: 1179, height: 2556 },
                'iphone15ProMax': { width: 1290, height: 2796 },
                'iphone15': { width: 1179, height: 2556 },
                'iphone14Pro': { width: 1179, height: 2556 },
                'iphone13-15': { width: 1170, height: 2532 },
                'iphoneSE': { width: 750, height: 1334 },
                'galaxyS23': { width: 1080, height: 2340 },
                'galaxyS23Ultra': { width: 1440, height: 3088 },
                'galaxyS24': { width: 1080, height: 2340 },
                'galaxyS24Ultra': { width: 1440, height: 3120 },
                'galaxyA54': { width: 1080, height: 2340 },
                'galaxyZFlip': { width: 1080, height: 2640 },
                'galaxyZFold': { width: 1812, height: 2176 },
                'pixel7': { width: 1080, height: 2400 },
                'pixel7Pro': { width: 1440, height: 3120 },
                'pixel8': { width: 1080, height: 2400 },
                'pixel8Pro': { width: 1344, height: 2992 },
                'oneplus12': { width: 1440, height: 3168 },
                'xiaomi14': { width: 1200, height: 2670 },
                'xiaomi14Pro': { width: 1440, height: 3200 },
                'motorolaEdge40': { width: 1080, height: 2400 },
                'nothing2': { width: 1080, height: 2412 }
            };
            
            if (resolutions[deviceType]) {
                state.formData.customWidth = resolutions[deviceType].width;
                state.formData.customHeight = resolutions[deviceType].height;
                
                // Update input values
                customWidthInput.value = state.formData.customWidth;
                customHeightInput.value = state.formData.customHeight;
            }
        }
        
        state.lastUpdate = 'deviceType';
        updateGeneratedPrompt();
        updateSelectedFeaturesBadges();
    }

    // Select UI Style
    function selectUIStyle() {
        const style = this.dataset.value;
        
        // Update tag selection
        styleTags.forEach(tag => {
            tag.classList.toggle('selected', tag.dataset.value === style);
        });
        
        state.uiStyle = style;
        
        state.lastUpdate = 'uiStyle';
        updateGeneratedPrompt();
        updateSelectedFeaturesBadges();
    }

    // Add custom style
    function addCustomStyle() {
        const value = customStyleInput.value.trim();
        
        if (!value) return;
        
        // Create new tag
        const newTag = document.createElement('div');
        newTag.className = 'tag-item';
        newTag.dataset.value = value;
        newTag.innerHTML = `
            <i class="fas fa-paint-brush"></i> ${value}
            <span class="custom-tag-remove"><i class="fas fa-times"></i></span>
        `;
        
        // Add click handler
        newTag.addEventListener('click', function(e) {
            if (e.target.closest('.custom-tag-remove')) {
                e.stopPropagation();
                this.remove();
                
                // Reset to default if this was selected
                if (state.uiStyle === value) {
                    state.uiStyle = 'Dark Mode';
                    
                    // Select the default tag
                    const defaultTag = document.querySelector('#style-tags .tag-item[data-value="Dark Mode"]');
                    if (defaultTag) {
                        defaultTag.classList.add('selected');
                    }
                    
                    updateGeneratedPrompt();
                    updateSelectedFeaturesBadges();
                }
            } else {
                // Select this style
                styleTags.forEach(tag => tag.classList.remove('selected'));
                this.classList.add('selected');
                state.uiStyle = value;
                
                state.lastUpdate = 'uiStyle';
                updateGeneratedPrompt();
                updateSelectedFeaturesBadges();
            }
        });
        
        // Add to container
        styleTagsContainer.appendChild(newTag);
        
        // Select this new tag
        styleTags.forEach(tag => tag.classList.remove('selected'));
        newTag.classList.add('selected');
        state.uiStyle = value;
        
        // Reset input
        customStyleInput.value = '';
        
        state.lastUpdate = 'uiStyle';
        updateGeneratedPrompt();
        updateSelectedFeaturesBadges();
        
        // Show notification
        showNotification(`Added custom style: "${value}"`);
    }

    // Toggle category selection
    function toggleCategory() {
        const value = this.dataset.value;
        this.classList.toggle('selected');
        
        if (this.classList.contains('selected')) {
            if (!state.categories.includes(value)) {
                state.categories.push(value);
            }
        } else {
            state.categories = state.categories.filter(cat => cat !== value);
        }
        
        state.lastUpdate = 'category';
        updateGeneratedPrompt();
        updateSelectedFeaturesBadges();
    }

    // Toggle tone selection
    function toggleTone() {
        const value = this.dataset.value;
        this.classList.toggle('selected');
        
        if (this.classList.contains('selected')) {
            if (!state.tones.includes(value)) {
                state.tones.push(value);
            }
        } else {
            state.tones = state.tones.filter(tone => tone !== value);
        }
        
        state.lastUpdate = 'tone';
        updateGeneratedPrompt();
        updateSelectedFeaturesBadges();
    }

    // Add custom tone
    function addCustomTone() {
        const value = customToneInput.value.trim();
        
        if (!value) return;
        
        if (!state.customTones.includes(value) && !state.tones.includes(value)) {
            state.customTones.push(value);
            
            // Create and add new tag
            const tagContainer = document.querySelector('#tone-tags');
            const newTag = document.createElement('div');
            newTag.className = 'tag-item selected';
            newTag.dataset.value = value;
            newTag.innerHTML = `<i class="fas fa-comment-dots"></i> ${value} <span class="custom-tag-remove">×</span>`;
            tagContainer.appendChild(newTag);
            
            // Add remove event
            const removeBtn = newTag.querySelector('.custom-tag-remove');
            removeBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                removeCustomTone(value, newTag);
            });
            
            // Add toggle event
            newTag.addEventListener('click', function(e) {
                if (!e.target.closest('.custom-tag-remove')) {
                    this.classList.toggle('selected');
                    
                    if (this.classList.contains('selected')) {
                        if (!state.tones.includes(value)) {
                            state.tones.push(value);
                        }
                    } else {
                        state.tones = state.tones.filter(tone => tone !== value);
                    }
                    
                    state.lastUpdate = 'tone';
                    updateGeneratedPrompt();
                    updateSelectedFeaturesBadges();
                }
            });
            
            // Add to selected tones
            if (!state.tones.includes(value)) {
                state.tones.push(value);
            }
            
            // Reset input
            customToneInput.value = '';
            
            state.lastUpdate = 'tone';
            updateGeneratedPrompt();
            updateSelectedFeaturesBadges();
            
            // Show notification
            showNotification(`Added custom tone: "${value}"`);
        } else {
            showNotification(`Tone "${value}" already exists`, true);
        }
    }

    // Remove custom tone
    function removeCustomTone(value, tagElement) {
        state.customTones = state.customTones.filter(tone => tone !== value);
        state.tones = state.tones.filter(tone => tone !== value);
        
        tagElement.remove();
        
        state.lastUpdate = 'tone';
        updateGeneratedPrompt();
        updateSelectedFeaturesBadges();
    }

    // Select screen
    function selectScreen() {
        const screenType = this.id.replace('Screen', '');
        
        // Mark selected in UI
        flowItems.forEach(item => {
            item.classList.remove('selected');
        });
        
        const parentItem = this.closest('.flow-item');
        if (parentItem) {
            parentItem.classList.add('selected');
        }
        
        // Update state
        state.selectedScreen = screenType;
        
        // Load options for this screen
        loadScreenOptions(screenType);
        
        state.lastUpdate = 'screen';
        updateGeneratedPrompt();
        updateSelectedFeaturesBadges();
        
        // Show options container
        screenOptionsContainer.classList.remove('hidden');
    }

    // Load options for the selected screen
    function loadScreenOptions(screenType) {
        // Skip if we're already showing the same screen
        if (screenOptionsContent.dataset.currentScreen === screenType) {
            return;
        }
        
        // Clear current options
        screenOptionsContent.innerHTML = '';
        screenOptionsContent.dataset.currentScreen = screenType;
        
        // Add options group
        const optionsGroup = document.createElement('div');
        optionsGroup.className = 'options-group';
        optionsGroup.id = 'draggable-options-container';
        screenOptionsContent.appendChild(optionsGroup);
        
        // Add standard options
        const screenData = state.screenOptions[screenType];
        if (screenData) {
            // Handle special case for custom screen
            if (screenType === 'custom') {
                // Add name input
                const nameGroup = document.createElement('div');
                nameGroup.className = 'form-group mb-4';
                nameGroup.innerHTML = `
                    <label for="customScreenName">Custom Screen Name</label>
                    <input type="text" id="customScreenName" placeholder="Enter custom screen name" value="${screenData.name || ''}">
                `;
                screenOptionsContent.insertBefore(nameGroup, optionsGroup);
                
                // Add event listener
                const nameInput = nameGroup.querySelector('#customScreenName');
                nameInput.addEventListener('input', function() {
                    screenData.name = this.value;
                    state.lastUpdate = 'customName';
                    updateGeneratedPrompt();
                    updateSelectedFeaturesBadges();
                });
            }
            
            // Add standard options
            screenData.options.forEach(option => {
                addDraggableOption(optionsGroup, screenType, option);
            });
            
            // Add custom options
            screenData.customOptions.forEach(option => {
                addDraggableOption(optionsGroup, screenType, option, true);
            });
        }
        
        // Setup drag and drop
        setupDragAndDrop();
    }

    // Add a draggable option
    function addDraggableOption(container, screenType, option, isCustom = false) {
        // Clone template
        const template = draggableOptionTemplate.content.cloneNode(true);
        const optionRow = template.querySelector('.option-row');
        
        // Set attributes
        optionRow.dataset.id = option.id;
        optionRow.dataset.screen = screenType;
        
        const checkbox = optionRow.querySelector('.screen-option-checkbox');
        checkbox.id = `${screenType}-${option.id}`;
        checkbox.checked = option.checked;
        
        const label = optionRow.querySelector('label');
        if (label) {
            label.setAttribute('for', checkbox.id);
        }
        
        const labelText = optionRow.querySelector('.option-label');
        labelText.textContent = option.label;
        
        // Setup checkbox change event
        checkbox.addEventListener('change', updateScreenOption);
        
        // Make the whole row clickable
        optionRow.addEventListener('click', function(e) {
            if (e.target.type !== 'checkbox' && !e.target.closest('.drag-handle') && 
                !e.target.closest('.option-actions')) {
                checkbox.checked = !checkbox.checked;
                
                // Trigger change event
                const event = new Event('change');
                checkbox.dispatchEvent(event);
            }
        });
        
        // Setup delete button for custom options
        if (isCustom) {
            const actionsDiv = document.createElement('div');
            actionsDiv.className = 'option-actions';
            actionsDiv.innerHTML = '<button class="btn-icon delete-option"><i class="fas fa-times"></i></button>';
            optionRow.appendChild(actionsDiv);
            
            const deleteBtn = actionsDiv.querySelector('.delete-option');
            deleteBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                deleteCustomOption(screenType, option.id);
            });
        }
        
        container.appendChild(optionRow);
    }

    // Update screen option
    function updateScreenOption() {
        const checkbox = this;
        const optionRow = checkbox.closest('.option-row');
        const screenType = optionRow.dataset.screen;
        const optionId = optionRow.dataset.id;
        
        // Find and update the option
        const screenData = state.screenOptions[screenType];
        if (screenData) {
            // Check if it's a standard option
            const standardOption = screenData.options.find(opt => opt.id === optionId);
            if (standardOption) {
                standardOption.checked = checkbox.checked;
            } else {
                // Must be a custom option
                const customOption = screenData.customOptions.find(opt => opt.id === optionId);
                if (customOption) {
                    customOption.checked = checkbox.checked;
                }
            }
        }
        
        state.lastUpdate = `option-${screenType}-${optionId}`;
        updateGeneratedPrompt();
        updateSelectedFeaturesBadges();
    }

    // Delete custom option
    function deleteCustomOption(screenType, optionId) {
        // Remove from state
        state.screenOptions[screenType].customOptions = 
            state.screenOptions[screenType].customOptions.filter(opt => opt.id !== optionId);
        
        // Remove from DOM
        const optionRow = document.querySelector(`.option-row[data-id="${optionId}"]`);
        if (optionRow) {
            optionRow.remove();
        }
        
        state.lastUpdate = 'deleteOption';
        updateGeneratedPrompt();
        updateSelectedFeaturesBadges();
        
        showNotification('Custom option removed');
    }

    // Show form to add custom option
    function showCustomOptionForm() {
        if (!state.selectedScreen) {
            showNotification('Please select a screen type first', true);
            return;
        }
        
        // Clone template
        const template = customOptionTemplate.content.cloneNode(true);
        const formContainer = template.querySelector('.custom-option-form');
        
        // Add event listeners
        const saveBtn = formContainer.querySelector('.save-custom-option');
        const cancelBtn = formContainer.querySelector('.cancel-custom-option');
        const input = formContainer.querySelector('.custom-option-input');
        
        saveBtn.addEventListener('click', () => saveCustomOption(input.value, formContainer));
        cancelBtn.addEventListener('click', () => formContainer.remove());
        
        // Enter key to save
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                saveCustomOption(input.value, formContainer);
            }
        });
        
        // Add to DOM
        const optionsContainer = document.getElementById('draggable-options-container');
        optionsContainer.insertBefore(formContainer, optionsContainer.firstChild);
        
        // Focus the input
        input.focus();
    }

    // Save custom option
    function saveCustomOption(value, formContainer) {
        const label = value.trim();
        
        if (!label) {
            formContainer.remove();
            return;
        }
        
        // Create unique ID
        const id = 'custom_' + Date.now();
        
        // Create option object
        const newOption = {
            id,
            label: `Include ${label}`,
            checked: true,
            icon: 'fas fa-star' // Default icon
        };
        
        // Add to state
        state.screenOptions[state.selectedScreen].customOptions.push(newOption);
        
        // Update UI
        formContainer.remove();
        
        // Add the new option to DOM
        const optionsContainer = document.getElementById('draggable-options-container');
        addDraggableOption(optionsContainer, state.selectedScreen, newOption, true);
        
        // Setup drag and drop for new element
        setupDragAndDrop();
        
        state.lastUpdate = 'customOption';
        updateGeneratedPrompt();
        updateSelectedFeaturesBadges();
        
        showNotification(`Added custom option: "${label}"`);
    }
    
    // Setup drag and drop functionality
    function setupDragAndDrop() {
        const container = document.getElementById('draggable-options-container');
        if (!container) return;
        
        const draggables = container.querySelectorAll('.draggable');
        
        draggables.forEach(draggable => {
            // Drag start
            draggable.addEventListener('dragstart', function(e) {
                this.classList.add('dragging');
                state.dragState.draggedElement = this;
                
                // For Firefox compatibility
                e.dataTransfer.setData('text/plain', '');
                e.dataTransfer.effectAllowed = 'move';
            });
            
            // Drag end
            draggable.addEventListener('dragend', function() {
                this.classList.remove('dragging');
                state.dragState.draggedElement = null;
                
                // Remove all drag-over classes
                draggables.forEach(item => {
                    item.classList.remove('drag-over');
                });
                
                // Update prompt with new order
                updateOptionsOrder();
            });
            
            // Drag over
            draggable.addEventListener('dragover', function(e) {
                e.preventDefault();
                if (state.dragState.draggedElement === this) return;
                
                // Reset all drag-over classes
                draggables.forEach(item => {
                    item.classList.remove('drag-over');
                });
                
                this.classList.add('drag-over');
            });
            
            // Drop
            draggable.addEventListener('drop', function(e) {
                e.preventDefault();
                if (state.dragState.draggedElement === this) return;
                
                // Insert before or after based on position
                const rect = this.getBoundingClientRect();
                const y = e.clientY - rect.top;
                const isInTopHalf = y < rect.height / 2;
                
                if (isInTopHalf) {
                    container.insertBefore(state.dragState.draggedElement, this);
                } else {
                    container.insertBefore(state.dragState.draggedElement, this.nextSibling);
                }
                
                this.classList.remove('drag-over');
            });
        });
        
        // Container drop zone
        container.addEventListener('dragover', function(e) {
            e.preventDefault();
            const dragging = document.querySelector('.dragging');
            if (!dragging) return;
            
            // Find the closest draggable element based on mouse position
            const afterElement = getDragAfterElement(container, e.clientY);
            
            if (afterElement) {
                container.insertBefore(dragging, afterElement);
            } else {
                container.appendChild(dragging);
            }
        });
    }

    // Helper function for drag and drop
    function getDragAfterElement(container, y) {
        const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')];
        
        return draggableElements.reduce((closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = y - box.top - box.height / 2;
            
            if (offset < 0 && offset > closest.offset) {
                return { offset: offset, element: child };
            } else {
                return closest;
            }
        }, { offset: Number.NEGATIVE_INFINITY }).element;
    }

    // Update options order in state based on DOM order
    function updateOptionsOrder() {
        if (!state.selectedScreen) return;
        
        const container = document.getElementById('draggable-options-container');
        if (!container) return;
        
        const optionRows = container.querySelectorAll('.option-row');
        
        // Create arrays for standard and custom options
        const standardOptions = [];
        const customOptions = [];
        
        // Collect options in their DOM order
        optionRows.forEach(row => {
            const id = row.dataset.id;
            const checkbox = row.querySelector('.screen-option-checkbox');
            const checked = checkbox.checked;
            
            // Find the option in state
            const screenData = state.screenOptions[state.selectedScreen];
            
            // Check if it's a standard option
            const standardOption = screenData.options.find(opt => opt.id === id);
            if (standardOption) {
                standardOption.checked = checked;
                standardOptions.push(standardOption);
            } else {
                // Must be a custom option
                const customOption = screenData.customOptions.find(opt => opt.id === id);
                if (customOption) {
                    customOption.checked = checked;
                    customOptions.push(customOption);
                }
            }
        });
        
        // Update state with new order if we found options
        if (standardOptions.length > 0) {
            state.screenOptions[state.selectedScreen].options = standardOptions;
        }
        
        if (customOptions.length > 0) {
            state.screenOptions[state.selectedScreen].customOptions = customOptions;
        }
        
        state.lastUpdate = 'optionsOrder';
        updateGeneratedPrompt();
    }
    
    // Update selected features badges
    function updateSelectedFeaturesBadges() {
        // Clear current badges
        selectedFeaturesList.innerHTML = '';
        
        // Add device type badge
        const deviceLabel = deviceTypeSelect.options[deviceTypeSelect.selectedIndex].text;
        addFeatureBadge('device', `<i class="fas fa-mobile-alt"></i> ${deviceLabel}`, 'primary');
        
        // Add UI style badge if selected
        if (state.uiStyle) {
            addFeatureBadge('style', `<i class="fas fa-palette"></i> ${state.uiStyle}`, 'primary');
        }
        
        // Add selected screen type badge
        if (state.selectedScreen) {
            const screenName = state.selectedScreen === 'custom' && state.screenOptions.custom.name 
                ? state.screenOptions.custom.name 
                : state.selectedScreen.charAt(0).toUpperCase() + state.selectedScreen.slice(1);
            
            addFeatureBadge('screen', `<i class="fas fa-mobile-screen"></i> ${screenName}`, 'primary');
            
            // Add screen options badges
            const screenData = state.screenOptions[state.selectedScreen];
            
            // Add standard options
            screenData.options.forEach(option => {
                if (option.checked) {
                    addFeatureBadge(`${state.selectedScreen}-${option.id}`, `<i class="fas fa-check"></i> ${option.label}`, 'secondary');
                }
            });
            
            // Add custom options
            screenData.customOptions.forEach(option => {
                if (option.checked) {
                    addFeatureBadge(`${state.selectedScreen}-${option.id}`, `<i class="fas fa-check"></i> ${option.label}`, 'custom');
                }
            });
        }
        
        // Add category badges
        state.categories.forEach(category => {
            addFeatureBadge(`category-${category}`, `<i class="fas fa-tag"></i> ${category}`, 'primary');
        });
        
        // Add tone badges
        state.tones.forEach(tone => {
            // Check if it's a custom tone
            const isCustom = state.customTones.includes(tone);
            addFeatureBadge(`tone-${tone}`, `<i class="fas fa-comment"></i> ${tone}`, isCustom ? 'custom' : 'secondary');
        });
        
        // Show or hide container based on content
        if (selectedFeaturesList.children.length > 0) {
            selectedFeaturesContainer.style.display = 'block';
        } else {
            selectedFeaturesContainer.style.display = 'none';
        }
    }

    // Helper to add a feature badge
    function addFeatureBadge(id, html, type = 'primary') {
        const badge = document.createElement('div');
        badge.className = `feature-badge ${type}`;
        badge.dataset.id = id;
        badge.innerHTML = html;
        selectedFeaturesList.appendChild(badge);
    }
    
    // Show notification
    function showNotification(message, isError = false) {
        // Remove any existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => {
            notification.remove();
        });
        
        const notification = document.createElement('div');
        notification.className = `notification ${isError ? 'notification-error' : 'notification-success'}`;
        notification.innerHTML = isError ? 
            `<i class="fas fa-exclamation-circle"></i> ${message}` : 
            `<i class="fas fa-check-circle"></i> ${message}`;
            
        document.body.appendChild(notification);
        
        // Show notification
        setTimeout(() => {
            notification.classList.add('visible');
        }, 10);
        
        // Remove after delay
        setTimeout(() => {
            notification.classList.remove('visible');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }
    
    // Copy to clipboard
    function copyToClipboard() {
        navigator.clipboard.writeText(promptOutput.textContent)
            .then(() => {
                showNotification('Prompt copied to clipboard!');
            })
            .catch(err => {
                console.error('Failed to copy:', err);
                showNotification('Failed to copy to clipboard', true);
            });
    }
    
    // Download prompt as .txt
    function downloadPrompt() {
        const element = document.createElement('a');
        const file = new Blob([promptOutput.textContent], {type: 'text/plain'});
        element.href = URL.createObjectURL(file);
        
        // Create filename based on app name or current date
        const timestamp = new Date().toISOString().slice(0, 10);
        const filename = state.formData.appName ? 
            `${state.formData.appName.replace(/[^a-z0-9]/gi, '-').toLowerCase()}-prompt.txt` : 
            `ui-mockup-prompt-${timestamp}.txt`;
            
        element.download = filename;
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
        
        showNotification(`Prompt downloaded as ${filename}`);
    }
    
    // Get device info for the prompt
    function getDeviceInfo() {
        const deviceType = state.formData.deviceType;
        let deviceName = deviceTypeSelect.options[deviceTypeSelect.selectedIndex].text;
        let width, height;
        
        if (deviceType === 'custom') {
            width = state.formData.customWidth;
            height = state.formData.customHeight;
        } else {
            // Extract resolution from text (e.g., "iPhone 15 Pro (1179 x 2556 px)")
            const match = deviceName.match(/\((\d+) x (\d+) px\)/);
            if (match) {
                width = parseInt(match[1]);
                height = parseInt(match[2]);
                
                // Remove resolution from display name
                deviceName = deviceName.replace(/\s*\(\d+ x \d+ px\)/, '');
            } else {
                // Fallback to state values
                width = state.formData.customWidth;
                height = state.formData.customHeight;
            }
        }
        
        // Determine OS
        let os = 'iOS';
        if (deviceName.includes('Galaxy') || 
            deviceName.includes('Pixel') || 
            deviceName.includes('OnePlus') || 
            deviceName.includes('Xiaomi') || 
            deviceName.includes('Motorola') || 
            deviceName.includes('Nothing')) {
            os = 'Android';
        } else if (deviceType === 'custom') {
            os = 'iOS/Android';
        }
        
        return { deviceName, width, height, os };
    }

    // Get all selected options for the current screen
    function getSelectedOptions() {
        if (!state.selectedScreen) return [];
        
        const screenData = state.screenOptions[state.selectedScreen];
        const selectedOptions = [];
        
        // Get standard options
        screenData.options.forEach(option => {
            if (option.checked) {
                selectedOptions.push(option.label);
            }
        });
        
        // Get custom options
        screenData.customOptions.forEach(option => {
            if (option.checked) {
                selectedOptions.push(option.label);
            }
        });
        
        return selectedOptions;
    }

    // Generate prompt based on inputs
    function updateGeneratedPrompt() {
        // Get device info
        const deviceInfo = getDeviceInfo();
        
        // Prepare screen info
        let screenName = '';
        let screenFeatures = [];
        
        if (state.selectedScreen) {
            // Format screen name
            if (state.selectedScreen === 'custom' && state.screenOptions.custom.name) {
                screenName = state.screenOptions.custom.name;
            } else {
                screenName = state.selectedScreen.charAt(0).toUpperCase() + state.selectedScreen.slice(1);
            }
            
            // Get selected options in order
            screenFeatures = getSelectedOptions();
        }
        
        // Prepare categories and tones
        const categoriesText = state.categories.length > 0 ? state.categories.join(', ') : '[APP CATEGORY]';
        const tonesText = state.tones.length > 0 ? state.tones.join(', ') : '[TONE OF VOICE]';
        
        // Prepare UI style
        const styleText = state.uiStyle || '[USER-SELECTED THEME]';
        
        // Prepare logo section if provided
        const logoSection = state.formData.appLogo ? 
            `App Logo: Include the logo from this URL: ${state.formData.appLogo}\n` : '';
        
        // Generate prompt template
        const prompt = `Design a modern, clean mobile UI screen for an ${deviceInfo.os}-style app titled: "${state.formData.appName || '[APP NAME]'}"

🖼️ Format & Resolution
Output resolution: ${deviceInfo.width} x ${deviceInfo.height} pixels
Device frame: Simulate a full ${deviceInfo.deviceName} screen
Orientation: Portrait

✅ Include the entire screen layout inside the visible area — top and bottom bars must be fully shown
✅ Do not crop any part of the UI — all content should fit clearly inside the phone frame and be readable
✅ Respect full safe area padding (status bar, navigation bar, and spacing around rounded corners)

🎯 Visual Direction
Theme: ${styleText}
${logoSection}Color Palette: [Auto-generated or optional input]
Typography: [Auto or selected style]
Icon Style: [Line, Filled, Lottie-inspired, etc.]
UI Density: [Compact, Balanced, Spacious]

📲 Mobile UI Layout Structure
Status Bar: ${deviceInfo.os} indicators (time, signal, battery)
Header Section: [Layout, logo, greeting, profile image — if selected]
Main Sections: [Based on screens selected]
Bottom Navigation: ${state.selectedScreen === 'home' && state.screenOptions.home.options.find(o => o.id === 'bottomNav')?.checked ? 'Include bottom navigation with tabs and icons' : '[If selected — with tabs, icons, label style]'}

🧩 Included Screen: ${screenName || '[SCREEN TYPE]'}
🧠 Selected Features: ${screenFeatures.length > 0 ? screenFeatures.join(', ') : '[Features for selected screen]'}

✨ Final Note
Render this UI in ${deviceInfo.width} x ${deviceInfo.height} px inside a full ${deviceInfo.deviceName} frame, in portrait.
✅ No top/bottom UI cropping
✅ Use a white background margin around the device to prevent cutoff.
✅ Prioritize modern spacing, readable typography, and accessible UI practices.

Target Audience: ${state.formData.ageRangeMin} to ${state.formData.ageRangeMax} year olds, ${state.formData.audienceDesc || '[AUDIENCE DESCRIPTION]'}
App Categories: ${categoriesText}
Tone of Voice: ${tonesText}`;

        // Update prompt output with highlight effect
        promptOutput.textContent = prompt;
        
        if (state.lastUpdate) {
            promptOutput.classList.add('highlight');
            setTimeout(() => {
                promptOutput.classList.remove('highlight');
            }, 1500);
            
            state.lastUpdate = null;
        }
    }

    // Initialize the app
    initApp();
});
