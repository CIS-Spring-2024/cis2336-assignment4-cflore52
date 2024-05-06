function scrollToSection(sectionId) {
    const element = document.querySelector('#' + sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}
