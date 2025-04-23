// Variables for User Selections
let characters = [];
let plots = [];
let creationStep = 1;

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
  // Set up event listeners for custom inputs
  document.getElementById('customCharacter').addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
      addCustomCharacter();
    }
  });
  
  document.getElementById('customPlot').addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
      addCustomPlot();
    }
  });

  // Add animation to featured stories on homepage
  animateStoryCards();
});

// Animate story cards on homepage
function animateStoryCards() {
  const cards = document.querySelectorAll('.story-card');
  cards.forEach((card, index) => {
    setTimeout(() => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      setTimeout(() => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, 300);
    }, index * 200);
  });
}

// Navigation Functions
function startNewStory() {
  document.querySelector('.hero').style.display = 'none';
  document.querySelector('#story-creation').style.display = 'block';
  updateProgress();
}

function exploreStories() {
  // Create a bouncing animation for the alert
  const heroContent = document.querySelector('.hero-content');
  heroContent.style.animation = 'bounce 0.5s';
  setTimeout(() => { heroContent.style.animation = ''; }, 500);
  
  alert("Explore Existing Stories coming soon! Check back later for amazing adventures.");
}

function goToHomepage() {
  document.querySelector('.hero').style.display = 'block';
  document.querySelector('#story-creation').style.display = 'none';
  resetStoryCreation();
}

// Character Functions
function selectCharacter(character) {
  if (!characters.includes(character)) {
    characters.push(character);
    updateCharacterTags();
    updateFeedback();
    updateProgress();
  }
}

function addCustomCharacter() {
  const customChar = document.getElementById('customCharacter').value.trim();
  if (customChar && !characters.includes(customChar)) {
    characters.push(customChar);
    document.getElementById('customCharacter').value = '';
    updateCharacterTags();
    updateFeedback();
    updateProgress();
  }
}

function removeCharacter(index) {
  characters.splice(index, 1);
  updateCharacterTags();
  updateFeedback();
  updateProgress();
}

function updateCharacterTags() {
  const tagsContainer = document.getElementById('character-tags');
  tagsContainer.innerHTML = '';
  
  characters.forEach((char, index) => {
    const tag = document.createElement('div');
    tag.className = 'tag';
    tag.innerHTML = `
      ${char}
      <button class="remove-tag" onclick="removeCharacter(${index})">
        <i class="fas fa-times"></i>
      </button>
    `;
    tagsContainer.appendChild(tag);
  });
}

// Plot Functions
function selectPlot(plot) {
  if (!plots.includes(plot)) {
    plots.push(plot);
    updatePlotTags();
    updateFeedback();
    updateProgress();
  }
}

function addCustomPlot() {
  const customPlotValue = document.getElementById('customPlot').value.trim();
  if (customPlotValue && !plots.includes(customPlotValue)) {
    plots.push(customPlotValue);
    document.getElementById('customPlot').value = '';
    updatePlotTags();
    updateFeedback();
    updateProgress();
  }
}

function removePlot(index) {
  plots.splice(index, 1);
  updatePlotTags();
  updateFeedback();
  updateProgress();
}

function updatePlotTags() {
  const tagsContainer = document.getElementById('plot-tags');
  tagsContainer.innerHTML = '';
  
  plots.forEach((plot, index) => {
    const tag = document.createElement('div');
    tag.className = 'tag';
    tag.innerHTML = `
      ${plot}
      <button class="remove-tag" onclick="removePlot(${index})">
        <i class="fas fa-times"></i>
      </button>
    `;
    tagsContainer.appendChild(tag);
  });
}

// Update Progress Bar
function updateProgress() {
  let progress = 0;
  
  if (characters.length > 0) progress += 33;
  if (plots.length > 0) progress += 33;
  if (characters.length > 0 && plots.length > 0) progress += 34;
  
  document.getElementById('creation-progress').style.width = `${progress}%`;
}

// Feedback Function
function updateFeedback() {
  const feedbackElement = document.getElementById('diversity-feedback');
  const customFeedback = document.getElementById('custom-feedback');
  
  if (characters.length > 0 && plots.length > 0) {
    feedbackElement.innerHTML = `Great choices! You're creating a story with ${characters.join(', ')} in a ${plots.join(', ')} setting.`;
    
    // Personalized feedback
    if (characters.includes('Hero') && characters.includes('Villain')) {
      customFeedback.innerHTML = 'Classic conflict setup! Consider adding unique traits to your characters.';
    } else if (characters.length >= 3) {
      customFeedback.innerHTML = 'Multiple characters will make your story rich and complex!';
    } else if (plots.includes('Adventure')) {
      customFeedback.innerHTML = 'Adventure plots work well with diverse settings and challenges!';
    } else if (plots.includes('Mystery')) {
      customFeedback.innerHTML = 'Great mysteries need interesting clues and unexpected twists!';
    } else {
      customFeedback.innerHTML = 'Personalizing your story increases creativity and promotes inclusivity.';
    }
  } else if (characters.length > 0) {
    feedbackElement.innerHTML = `You've chosen ${characters.join(', ')}. Now select a plot!`;
    customFeedback.innerHTML = 'Think about what kind of story would best showcase these characters.';
  } else if (plots.length > 0) {
    feedbackElement.innerHTML = `You've chosen a ${plots.join(', ')} plot. Now add some characters!`;
    customFeedback.innerHTML = 'Consider what types of characters would thrive in this plot.';
  } else {
    feedbackElement.innerHTML = 'Start by selecting characters and plot elements!';
    customFeedback.innerHTML = 'Add diversity to your characters and plot to make your story more engaging.';
  }
}

// Save Story Function
function saveStory() {
  if (characters.length === 0 || plots.length === 0) {
    alert('Please select at least one character and plot before saving!');
    return;
  }
  
  // Animation for save button
  const saveBtn = document.querySelector('.action-btn.save');
  saveBtn.innerHTML = '<i class="fas fa-check"></i> Saved!';
  setTimeout(() => {
    saveBtn.innerHTML = '<i class="fas fa-save"></i> Save Draft';
  }, 2000);
  
  // Here you would normally save to a database
  console.log('Saved story with characters:', characters, 'and plots:', plots);
}

// Finish Story Function
function finishStory() {
  if (characters.length === 0 || plots.length === 0) {
    alert('Please select at least one character and plot to finish your story!');
    return;
  }
  
  alert('Your story is complete! Sharing options will be available soon.');
  
  // Simulate sharing completion
  setTimeout(function() {
    resetStoryCreation();
    goToHomepage();
  }, 1500);
}

// Reset Story Creation
function resetStoryCreation() {
  characters = [];
  plots = [];
  updateCharacterTags();
  updatePlotTags();
  updateFeedback();
  updateProgress();
  document.getElementById('customCharacter').value = '';
  document.getElementById('customPlot').value = '';
}

let selectedCharacters = [];
let selectedPlots = [];

function selectCharacter(character) {
  if (!selectedCharacters.includes(character)) {
    selectedCharacters.push(character);
    updateCharacterTags();
    updateFeedback();
  }
}

function selectPlot(plot) {
  if (!selectedPlots.includes(plot)) {
    selectedPlots.push(plot);
    updatePlotTags();
    updateFeedback();
  }
}

function addCustomCharacter() {
  const input = document.getElementById('customCharacter');
  const value = input.value.trim();
  if (value && !selectedCharacters.includes(value)) {
    selectedCharacters.push(value);
    updateCharacterTags();
    input.value = '';
    updateFeedback();
  }
}

function addCustomPlot() {
  const input = document.getElementById('customPlot');
  const value = input.value.trim();
  if (value && !selectedPlots.includes(value)) {
    selectedPlots.push(value);
    updatePlotTags();
    input.value = '';
    updateFeedback();
  }
}

function updateCharacterTags() {
  const container = document.getElementById('character-tags');
  container.innerHTML = selectedCharacters.map(c => `<span class="tag">${c}</span>`).join('');
}

function updatePlotTags() {
  const container = document.getElementById('plot-tags');
  container.innerHTML = selectedPlots.map(p => `<span class="tag">${p}</span>`).join('');
}

// 💬 AI-like feedback logic
function updateFeedback() {
  const feedback = document.getElementById('diversity-feedback');
  const custom = document.getElementById('custom-feedback');

  let messages = [];

  // Diversity check
  if (selectedCharacters.includes("Hero") && selectedCharacters.includes("Villain") && selectedCharacters.includes("Sidekick")) {
    messages.push("Nice! You've selected a classic mix of roles.");
  }

  if (selectedCharacters.some(c => c.toLowerCase().includes("girl") || c.toLowerCase().includes("female"))) {
    messages.push("Awesome! You've included female representation.");
  }

  if (selectedCharacters.some(c => c.toLowerCase().includes("alien") || c.toLowerCase().includes("robot") || c.toLowerCase().includes("animal"))) {
    messages.push("Cool choice! You've added a non-human character.");
  }

  if (selectedCharacters.length === 0 && selectedPlots.length === 0) {
    feedback.textContent = "No story elements selected yet.";
    custom.textContent = "Select characters and plot to get started!";
    return;
  }

  if (selectedCharacters.length > 0 && messages.length === 0) {
    messages.push("Consider adding more diverse characters or unique roles!");
  }

  if (selectedPlots.length > 0) {
    messages.push(`You've chosen the "${selectedPlots.join(', ')}" plot. Sounds exciting!`);
  }

  feedback.textContent = "✨ " + messages.join(" ");
  custom.textContent = "Keep going! The more creative, the better.";
}


// Add this to your CSS
document.head.insertAdjacentHTML('beforeend', `
  <style>
    @keyframes bounce {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-10px); }
    }
  </style>
`);