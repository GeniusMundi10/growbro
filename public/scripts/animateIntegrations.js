// Simple animation script for the integrations page
// Animates integration cards as they enter the viewport

document.addEventListener('DOMContentLoaded', () => {
  // Observer for fade-in animations
  const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in-visible');
        fadeInObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.2
  });

  // Apply fade-in animation to integration cards
  const integrationCards = document.querySelectorAll('.integration-card');
  
  integrationCards.forEach((card, index) => {
    // Add fade-in class with staggered delay based on index
    card.classList.add('fade-in');
    card.style.transitionDelay = `${index * 0.05}s`;
    
    // Observe the card
    fadeInObserver.observe(card);
  });
});
