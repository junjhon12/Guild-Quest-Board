const myQuest = [];

// Constructor function for creating new Quest objects
// We use a constructor to standardize the structure of our data
function Quest(title, rank, reward, status) {
    this.title = title;
    this.rank = rank;
    this.reward = reward;
    this.status = status;
    // Generate a unique ID for each quest to easily identify it later (for deleting/toggling)
    this.id = crypto.randomUUID();
}

// Adding a method to the prototype allows all Quest instances to share this function
// instead of creating a new copy of the function for every single quest.
Quest.prototype.toggleStatus = function () {
    this.status = !this.status;
}

// Save the current state of the myQuest array to the browser's Local Storage
function saveQuest() {
    // localStorage can only store strings, so we convert our array of objects into a JSON string
    localStorage.setItem("myQuest", JSON.stringify(myQuest));
}

function addQuest(title, rank, reward, status) {
    // Check if a quest with the same title already exists to prevent duplicates
    if (myQuest.some(quest => quest.title === title)) {
        return alert("Quest has already been added!");
    }
    // Create a new Quest instance and add it to our array
    myQuest.push(new Quest(title, rank, reward, status));
    saveQuest();
}

// Function to render the quests to the HTML page
// defaults to using the main myQuest array if no specific array is passed (like for filtering)
function displayQuest(questsToRender = myQuest) {
    const container = document.querySelector(".quest-board");
    // Clear the current HTML inside the board so we don't duplicate items when re-rendering
    container.innerHTML = "";
    
    questsToRender.forEach(quest => {
        const questCard = document.createElement("div");
        questCard.classList.add("quest-card");
        // Add a dynamic class based on rank for styling (e.g., .rank-s, .rank-a)
        questCard.classList.add(`rank-${quest.rank.toLowerCase()}`);
        
        // If the quest is completed, add a specific class for styling
        if (quest.status) {
            questCard.classList.add("completed");
        }
        
        // Use Template Literals (backticks) to insert variables directly into the HTML string
        questCard.innerHTML = `
            <div class="quest-info">
                <h3 class="quest-title">${quest.title}</h3>
                <p class="quest-rank">Rank: ${quest.rank}</p>
                <p class="quest-reward">Reward: ${quest.reward}</p>
            </div>
            <!-- Store the ID in a data attribute so we know which quest this button belongs to -->
            <button class="toggle-status" data-id="${quest.id}">${quest.status ? "Mark Incomplete" : "Mark Complete"}</button>
            <button class="delete-quest" data-id="${quest.id}">Delete</button>`;
        
        container.appendChild(questCard);
    });
}

function loadQuest() {
    const savedQuest = localStorage.getItem("myQuest");

    if (savedQuest) {
        // Parse the JSON string back into a JavaScript array
        const parsedQuest = JSON.parse(savedQuest);
        
        // We need to loop through the plain objects and convert them back into Quest instances
        // This ensures they have access to prototype methods like .toggleStatus()
        parsedQuest.forEach(obj => {
            const quest = new Quest(obj.title, obj.rank, obj.reward, obj.status);
            // We must restore the original ID, otherwise a new random one is generated
            quest.id = obj.id;
            myQuest.push(quest);
        });
        displayQuest();
    }
}

// Filter Logic
document.getElementById("filter-rank").addEventListener("change", (e) => {
    const selectedRank = e.target.value;
    if (selectedRank === "All") {
        // If "All" is selected, show the original full list
        displayQuest(myQuest);
    } else {
        // Create a new array containing only quests that match the selected rank
        const filtered = myQuest.filter(quest => quest.rank === selectedRank);
        displayQuest(filtered);
    }
});

// Sort Logic
document.getElementById("sort-btn").addEventListener("click", () => {
    // Create a COPY using [...myQuest] so we don't mess up the original order
    // Sort B - A for "High to Low"
    const sorted = [...myQuest].sort((a, b) => b.reward - a.reward);
    displayQuest(sorted);
});

const form = document.getElementById("quest-form");
form.addEventListener("submit", function (e) {
    // Prevent the default form submission behavior (which reloads the page)
    e.preventDefault();

    const title = document.querySelector("#title").value;
    const rank = document.querySelector("#rank").value;
    // Convert the reward input string to a Number for proper sorting later
    const reward = Number(document.querySelector("#reward").value);
    const status = false; // New quests start as incomplete
    
    addQuest(title, rank, reward, status);
    displayQuest();
    form.reset(); // Clear the form inputs
});

// Event Delegation:
// Instead of adding event listeners to every single button (which are created dynamically),
// we add ONE listener to the parent container. We check e.target to see what was clicked.
const container = document.querySelector(".quest-board");
container.addEventListener("click", (e) => {
    const id = e.target.getAttribute("data-id");

    if (e.target.classList.contains("delete-quest")) {
        // Find the index of the quest with the matching ID
        const index = myQuest.findIndex(quest => quest.id === id);
        if (index !== -1) {
            // Remove 1 item at that index
            myQuest.splice(index, 1);
            saveQuest();
            displayQuest();
        } 
    } else if (e.target.classList.contains("toggle-status")) {
        // Find the actual quest object
        const quest = myQuest.find(quest => quest.id === id);
        if (quest) {
            quest.toggleStatus();
            saveQuest();
            displayQuest();
        }
    }
});

// Load quests from local storage when the script runs
loadQuest();