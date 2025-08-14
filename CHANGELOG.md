# Studio Ghibli Style AI Website Project - Changelog

This document records all important updates and changes to the project.

## [v1.1.0] - 2025-03-31

### Added
- Integrated Gradio API generation functionality
  - Added GradioApiGenerator component with Hugging Face model API calls
  - Implemented direct API calls for Studio Ghibli style image generation
  - Added fallback API call methods to improve reliability
- Enhanced GradioGenerator component
  - Added multiple fallback URLs to improve loading success rate
  - Optimized iframe loading experience
- Improved ImageGeneratorPage component
  - Added new tab switching functionality supporting multiple generation methods
  - Optimized user interface and interaction experience

### Internationalization Improvements
- Completed internationalization support for all new components
  - GradioGenerator component English translation
  - GradioApiGenerator component English translation
- Updated English translation files with new translation keys
- Ensured all user interface elements support multilingual display

### Technical Improvements
- Used axios library for API requests
- Added error handling and fallback solutions to improve system stability
- Optimized image generation and display workflow

## [v1.0.0] - 2025-03-28

### Added Features
- Completed internationalization for all page components
  - HomePage
  - GalleryPage
  - AboutPage
  - ImageGeneratorPage
  - NotFoundPage
- Added i18next translation system
- Implemented language switching functionality
- Created English translation files
- All UI elements support multilingual display

### Technical Improvements
- Used react-i18next for React component internationalization
- Implemented on-demand loading of translation resources
- Optimized translation key organization structure
- Added automatic language detection functionality

### Fixes
- Fixed layout issues of some UI elements under different languages
- Ensured all text content uses translation keys

## [v0.2.0] - 2025-03-15

### Added Features
- Added NotFoundPage (404 page)
- Completed GalleryPage functionality
- Implemented AboutPage
- Added image preview and sharing functionality

### Technical Improvements
- Optimized page loading speed
- Improved responsive layout
- Enhanced user interaction experience

## [v0.1.0] - 2025-03-01

### Initial Version
- Created project foundation architecture
- Implemented HomePage basic layout
- Developed ImageGeneratorPage core functionality
- Added photo upload and text generation features
- Implemented basic style selection system
