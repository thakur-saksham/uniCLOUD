const fs = require('fs');
let html = fs.readFileSync('main.html', 'utf8');

// Title case function
function titleCase(str) {
  return str.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');
}

// We will find the const branchData = { ... }; block
const startIdx = html.indexOf('const branchData = {');
if (startIdx === -1) process.exit(1);

// We need to find the matching closing brace.
// But it's easier to just do a regex replace for the `name: "..."` strings inside branchData.
let endIdx = html.indexOf('};', startIdx);

let branchDataStr = html.substring(startIdx, endIdx + 2);

// Title case all names in the branchData string
branchDataStr = branchDataStr.replace(/name:\s*"([^"]+)"/g, (match, p1) => {
  return `name: "${titleCase(p1)}"`;
});

// Fix specific acronyms
branchDataStr = branchDataStr.replace(/Oop/g, 'OOP').replace(/Aem/g, 'AEM').replace(/Evs/g, 'EVS').replace(/Dsa/g, 'DSA');

// Replace the Civil block with the new one
const civilRegex = /Civil:\s*\{[\s\S]*?(?=Aerospace:)/;
const newCivil = `Civil: {
        sem1: [
          { icon: "ph-pencil-line", name: "Engineering Graphics" },
          { icon: "ph-atom", name: "Physics" },
          { icon: "ph-code", name: "OOP" },
          { icon: "ph-math-operations", name: "AEM I" },
          { icon: "ph-leaf", name: "EVS" }
        ],
        sem2: [
          { icon: "ph-gear", name: "Engineering Mechanics" },
          { icon: "ph-users", name: "Living Conversations" },
          { icon: "ph-flask", name: "Chemistry" },
          { icon: "ph-lightning", name: "Basic Electrical And Electronics Eng" },
          { icon: "ph-wrench", name: "Basic Of Mechanical" },
          { icon: "ph-math-operations", name: "AEM II" },
          { icon: "ph-leaf", name: "EVS" }
        ],
        sem3: [
          { icon: "ph-flask", name: "Intro To Chemical Eng" },
          { icon: "ph-mountains", name: "Engineering Geology And Groundwater" },
          { icon: "ph-building", name: "Building Materials And Concrete Technology" },
          { icon: "ph-map-trifold", name: "Surveying And Remote Sensing" },
          { icon: "ph-drop", name: "Elements Of Fluid Mechanics" },
          { icon: "ph-lightbulb", name: "Design Thinking" }
        ],
        sem4: [
          { icon: "ph-brain", name: "Edge" },
          { icon: "ph-file-code", name: "Python" },
          { icon: "ph-database", name: "Working With Data" },
          { icon: "ph-drop", name: "Elements Of Hydraulic Eng" },
          { icon: "ph-pipe", name: "Water Supply And Sanitation" },
          { icon: "ph-leaf", name: "Green Building And Energy Efficiency" },
          { icon: "ph-tent", name: "Survey Camp" },
          { icon: "ph-desktop", name: "Computer Aided Civil Eng Design Lab" },
          { icon: "ph-cube", name: "Solid Mechanics Lab" },
          { icon: "ph-bridge", name: "Strength Of Material" }
        ]
      },
      `;
branchDataStr = branchDataStr.replace(civilRegex, newCivil);

html = html.substring(0, startIdx) + branchDataStr + html.substring(endIdx + 2);

fs.writeFileSync('main.html', html);
console.log('Fixed casing in main.html and updated Civil subjects.');
