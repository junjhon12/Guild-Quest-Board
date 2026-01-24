# ⚔️ Guild Quest Board: Adventurer's Task Registry

![JavaScript](https://img.shields.io/badge/Logic-JavaScript_ES6+-f7df1e?logo=javascript&logoColor=black)
![HTML5](https://img.shields.io/badge/Structure-HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/Style-CSS3-1572B6?logo=css3&logoColor=white)
![Status](https://img.shields.io/badge/Status-Playable-brightgreen)

**Guild Quest Board** is a specialized task management application built with pure JavaScript. It replaces the sterile environment of a standard To-Do list with a high-fantasy bounty board, allowing users to organize their daily "quests" with RPG-style metadata and priority levels.

🔗 **Live Demo:** [Insert Your GitHub Pages Link Here]

---

## 🛠️ Technical Implementation

### **1. Modular Data Architecture**
The system is built on a modular foundation, using **Factory Functions** or **Classes** to instantiate quest objects. Each quest tracks:
* **Rank/Priority:** S-Rank to E-Rank difficulty scaling.
* **Due Date:** Time-sensitive tracking for urgent bounties.
* **Description:** Narrative-rich context for each objective.
* **Completion State:** Real-time updates to the visual quest log.

### **2. DOM Orchestration**
The application manages a complex UI without external frameworks. It utilizes efficient **DOM Manipulation** to:
* Dynamically render quest cards based on a central data array.
* Filter tasks by guild rank or completion status.
* Handle real-time updates through event delegation, ensuring high performance even with large logs.


### **3. Local Persistence (Optional Focus)**
The application is designed to store your guild's progress locally, ensuring that your quest log remains intact even after a browser refresh.

---

## ✨ Key Features

* **📜 Dynamic Board Rendering:** A visual interface that mirrors a physical guild board.
* **🛡️ Priority Management:** Categorize tasks into different tiers based on importance.
* **✍️ Quest Creation Modal:** A clean, immersive form for drafting new objectives.
* **🧹 Quest Dismissal:** Logic for removing completed or expired bounties from the registry.

---

## 📂 Repository Structure

```text
/
├── index.html   # The Guild Hall (Main UI)
├── style.css    # Thematic styling and layout
├── script.js    # Core Quest Logic and DOM updates
└── README.md    # Documentation
🚀 Deployment & Usage
Clone the registry:

Bash

git clone [https://github.com/junjhon12/Guild-Quest-Board.git](https://github.com/junjhon12/Guild-Quest-Board.git)
Enter the Guild Hall: Open index.html in any modern web browser to start managing your daily quests.

Developed as a deep dive into complex UI state management and creative frontend design.
