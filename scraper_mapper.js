const mappingRules = {
  'Chemical': {
    1: [
      { canonical: 'Mathematics I', variants: ['advanced engineering mathematics-i', 'engineering mathematics-i', 'mathematics i', 'mathematics-i'] },
      { canonical: 'Physics I', variants: ['physics', 'physics i'] },
      { canonical: 'Chemistry I', variants: ['basic chemistry', 'chemistry', 'chemistry i'] },
      { canonical: 'Programming for Engineers', variants: ['programming for engineers', 'object oriented programming', 'programming for problem solving'] },
      { canonical: 'Basic Electrical & Electronics Engineering', variants: ['basic electrical and electronics engineering', 'basic electronics engineering', 'basic electrical & electronics engineering'] },
      { canonical: 'Workshop Practices', variants: ['workshop practices'] },
      { canonical: 'Engineering Graphics', variants: ['engineering graphics'] }
    ],
    2: [
      { canonical: 'Mathematics II', variants: ['advanced engineering mathematics ii', 'engineering mathematics ii', 'mathematics ii'] },
      { canonical: 'Physics II', variants: ['physics', 'physics-i', 'physics ii'] },
      { canonical: 'Process Chemistry', variants: ['process chemistry', 'chemistry'] },
      { canonical: 'Materials & Energy Balance Calculations', variants: ['materials & energy balance calculations', 'materials and energy balance calculations'] },
      { canonical: 'Chemical Technology', variants: ['chemical technology'] },
      { canonical: 'Basic Electrical & Electronics Engineering', variants: ['basic electrical & electronics engineering', 'basic electrical and electronics engineering'] },
      { canonical: 'Workshop Practices / Engineering Graphics', variants: ['workshop practices / engineering graphics', 'workshop practices', 'engineering graphics'] }
    ],
    3: [
      { canonical: 'Chemical Engineering Thermodynamics', variants: ['chemical engineering thermodynamics', 'thermodynamics-i'] },
      { canonical: 'Momentum Transfer / Transport Phenomena', variants: ['momentum transfer / transport phenomena', 'momentum transfer', 'transport phenomena'] },
      { canonical: 'Material & Energy Balance Computations', variants: ['material & energy balance computations', 'material and energy balance computations', 'chemical process calculations'] },
      { canonical: 'Process Heat Transfer', variants: ['process heat transfer'] },
      { canonical: 'Chemical Process Calculations', variants: ['chemical process calculations'] },
      { canonical: 'Materials Science', variants: ['materials science'] },
      { canonical: 'Mathematics III', variants: ['mathematics iii'] }
    ],
    4: [
      { canonical: 'Chemical Reaction Engineering', variants: ['chemical reaction engineering'] },
      { canonical: 'Mass Transfer', variants: ['mass transfer', 'mass transfer-i'] },
      { canonical: 'Chemical Engineering Thermodynamics-II', variants: ['chemical engineering thermodynamics-ii', 'thermodynamics-ii'] },
      { canonical: 'Heat Transfer', variants: ['heat transfer', 'process heat transfer'] },
      { canonical: 'Numerical Methods in Chemical Engineering', variants: ['numerical methods in chemical engineering'] },
      { canonical: 'Fluid Mechanics', variants: ['fluid mechanics'] },
      { canonical: 'Particulate Technology', variants: ['particulate technology'] }
    ]
  },
  'Fire & Safety': {
    1: [
      { canonical: 'Mathematics I', variants: ['advanced engineering mathematics-i', 'engineering mathematics-i', 'mathematics i'] },
      { canonical: 'Physics I', variants: ['physics', 'physics i'] },
      { canonical: 'Chemistry I', variants: ['chemistry', 'chemistry i'] },
      { canonical: 'Programming for Engineers', variants: ['programming for engineers', 'object oriented programming'] },
      { canonical: 'Basic Electrical & Electronics Engineering', variants: ['basic electrical and electronics engineering', 'basic electrical engineering', 'basic electrical & electronics engineering'] },
      { canonical: 'Basic of Mechanical Engineering', variants: ['basic of mechanical engineering', 'basics of mechanical engineering'] },
      { canonical: 'Workshop Practices / Engineering Graphics', variants: ['workshop practices', 'engineering graphics'] }
    ],
    2: [
      { canonical: 'Mathematics II', variants: ['advanced engineering mathematics ii', 'engineering mathematics ii', 'mathematics ii', 'mathematics-ii'] },
      { canonical: 'Physics II', variants: ['physics', 'physics-i', 'physics ii'] },
      { canonical: 'Chemistry', variants: ['chemistry'] },
      { canonical: 'Basic Electrical & Electronics Engineering', variants: ['basic electrical and electronics engineering', 'basic electronics engineering', 'basic electrical & electronics engineering'] },
      { canonical: 'Engineering Mechanics', variants: ['engineering mechanics'] },
      { canonical: 'Basic of Mechanical Engineering', variants: ['basic of mechanical engineering', 'basics of mechanical engineering'] },
      { canonical: 'Workshop Practices', variants: ['workshop practices'] }
    ],
    3: [
      { canonical: 'Fire Engineering I (Fundamentals)', variants: ['fire engineering i (fundamentals)', 'fundamentals of fire engineering', 'fire engineering-i'] },
      { canonical: 'Chemical Engineering I (Thermodynamics & Analytical Instruments)', variants: ['chemical engineering i (thermodynamics & analytical instruments)', 'thermodynamics & analytical instruments', 'chemical engineering i (thermodynamics & measuring analytical instruments)', 'chemical engineering i (thermodynamics & measuring a. inst.)'] },
      { canonical: 'Fluid Mechanics', variants: ['fluid mechanics', 'fluid mechanics & fluid flow machines'] },
      { canonical: 'First Aid & Emergency Procedure', variants: ['first aid & emergency procedure', 'first aid and emergency procedure'] },
      { canonical: 'Behaviour Based Safety & Human Factor Engineering', variants: ['behaviour based safety & human factor engineering', 'behavior based safety', 'bbs & human factor engineering', 'behaviour based safety'] },
      { canonical: 'Mathematics III / Applied Numerical Methods', variants: ['mathematics iii / applied numerical methods', 'mathematics iii', 'applied numerical methods', 'transforms and numerical methods'] },
      { canonical: 'Safety in Construction / Principles of Safety Management', variants: ['safety in construction / principles of safety management', 'safety in construction', 'principles of safety management'] }
    ],
    4: [
      { canonical: 'Fire Engineering II (Planning & Design of Fire Protection Systems)', variants: ['fire engineering ii (planning & design of fire protection systems)', 'planning and design of fire protection systems', 'fire engineering ii (planning & design of fire protection system)', 'fire protection equipment & design', 'fire engineering-ii'] },
      { canonical: 'Strength of Material', variants: ['strength of material', 'strength of materials'] },
      { canonical: 'Occupational Health & Safety / Industrial Hygiene', variants: ['occupational health & safety / industrial hygiene', 'occupational health & safety engineering', 'occupational safety and industrial hygiene', 'occupational health & hygiene management'] },
      { canonical: 'Principles of Engineering Design', variants: ['principles of engineering design'] },
      { canonical: 'Electrical System Safety & Design', variants: ['electrical system safety & design', 'electrical system safety and its design', 'electrical technology and safety in electrical systems'] },
      { canonical: 'Chemical Engineering II (Unit Operations)', variants: ['chemical engineering ii (unit operations)'] },
      { canonical: 'Behaviour Based Safety & Human Factor Engineering', variants: ['behaviour based safety & human factor engineering', 'behavior based safety', 'bbs & human factor engineering', 'behaviour based safety'] }
    ]
  },
  'Mechanical': {
    1: [
      { canonical: 'Mathematics I', variants: ['advanced engineering mathematics-i', 'engineering mathematics-i', 'mathematics i', 'mathematics-i'] },
      { canonical: 'Physics I', variants: ['physics', 'physics i', 'physics-i'] },
      { canonical: 'Chemistry I', variants: ['chemistry', 'chemistry i'] },
      { canonical: 'Programming for Engineers', variants: ['programming for engineers', 'object oriented programming', 'programming for problem solving'] },
      { canonical: 'Basic Electrical & Electronics Engineering', variants: ['basic electrical and electronics engineering', 'basic electronics engineering', 'basic electrical & electronics engineering', 'basic electrical engineering'] },
      { canonical: 'Workshop Practices', variants: ['workshop practices', 'workshop technology'] },
      { canonical: 'Engineering Graphics', variants: ['engineering graphics'] }
    ],
    2: [
      { canonical: 'Mathematics II', variants: ['advanced engineering mathematics ii', 'engineering mathematics ii', 'mathematics ii'] },
      { canonical: 'Physics II', variants: ['physics-i', 'physics ii'] },
      { canonical: 'Chemistry', variants: ['chemistry'] },
      { canonical: 'Engineering Mechanics', variants: ['engineering mechanics'] },
      { canonical: 'Introduction to Mechanical Engineering', variants: ['introduction to mechanical engineering'] },
      { canonical: 'Basic Electrical & Electronics Engineering', variants: ['basic electrical and electronics engineering', 'basic electrical engineering', 'basic electrical & electronics engineering'] },
      { canonical: 'Workshop Practices / Engineering Graphics', variants: ['workshop practices', 'engineering graphics', 'workshop practices / engineering graphics'] }
    ],
    3: [
      { canonical: 'Materials Science / Engineering', variants: ['materials science / engineering', 'materials science', 'materials engineering', 'material science'] },
      { canonical: 'Fluid Mechanics', variants: ['fluid mechanics'] },
      { canonical: 'Engineering Thermodynamics', variants: ['engineering thermodynamics', 'thermodynamics and heat engines', 'thermodynamics'] },
      { canonical: 'Manufacturing Processes', variants: ['manufacturing processes', 'manufacturing process'] },
      { canonical: 'Manufacturing / Machine Assembly Drawing', variants: ['manufacturing / machine assembly drawing', 'manufacturing assembly drawing', 'machine and assembly drawing'] },
      { canonical: 'Mathematics III / Statistical & Numerical Methods', variants: ['mathematics iii / statistical & numerical methods', 'mathematics iii (statistical and numerical methods)', 'applied numerical methods', 'statistical and numerical methods', 'computational methods', 'mathematics iii'] },
      { canonical: 'Physics (continued)', variants: ['physics (continued)', 'physics'] }
    ],
    4: [
      { canonical: 'Strength of Materials', variants: ['strength of materials', 'mechanics of materials'] },
      { canonical: 'Heat Transfer', variants: ['heat transfer'] },
      { canonical: 'Applied Thermodynamics', variants: ['applied thermodynamics', 'thermal engineering'] },
      { canonical: 'Fluid Mechanics & Fluid Machines', variants: ['fluid mechanics & fluid machines', 'fluid machinery'] },
      { canonical: 'Manufacturing Technology', variants: ['manufacturing technology', 'manufacturing process', 'manufacturing processes', 'manufacturing technology i'] },
      { canonical: 'Theory of Machines', variants: ['theory of machines', 'theory of machine'] },
      { canonical: 'Instrumentation & Control / Mechanical Measurement & Metrology', variants: ['instrumentation & control / mechanical measurement & metrology', 'instrumentation & control', 'mechanical measurement & metrology', 'mechanical measurements & metrology'] }
    ]
  },
  'BCA': {
    1: [
      { canonical: 'Mathematics', variants: ['basic mathematics', 'mathematics', 'mathematics-i'] },
      { canonical: 'Programming in C / Problem Solving', variants: ['programming in c / problem solving', 'programming in c', 'problem solving using c', 'programming and data structure'] },
      { canonical: 'Computer Fundamentals', variants: ['computer fundamentals', 'fundamentals of computer'] },
      { canonical: 'Database Management Systems / SQL', variants: ['database management systems / sql', 'database management systems', 'dbms', 'introduction to sql', 'database management system'] },
      { canonical: 'Web Technologies', variants: ['web technologies'] },
      { canonical: 'English Communication', variants: ['english communication'] }
    ],
    2: [
      { canonical: 'Mathematics II / Discrete Mathematics', variants: ['mathematics ii / discrete mathematics', 'basic mathematics ii', 'statistics numerical methods & algorithms', 'discrete mathematical structures', 'mathematics ii'] },
      { canonical: 'Data Structures', variants: ['data structures', 'databases'] },
      { canonical: 'Object-Oriented Analysis & Design (OOPs with C++)', variants: ['object-oriented analysis & design (oops with c++)', 'object-oriented analysis and design', 'object oriented analysis and design (using uml)', 'oops with c++', 'object oriented analysis and design'] },
      { canonical: 'Operating Systems (incl. Linux/Shell)', variants: ['operating systems (incl. linux/shell)', 'operating systems', 'linux os and shell programming'] },
      { canonical: 'Advanced DBMS / PL-SQL', variants: ['advanced dbms / pl-sql', 'advanced dbms', 'pl/sql fundamentals'] },
      { canonical: 'Computer System Architecture / Digital Electronics', variants: ['computer system architecture / digital electronics', 'computer system architecture', 'digital electronics'] },
      { canonical: 'Business Communication / Accounting', variants: ['business communication / accounting', 'business communication', 'business accounting'] }
    ],
    3: [
      { canonical: 'Computer Networks', variants: ['computer networks', 'networking and technology'] },
      { canonical: 'Java Programming', variants: ['java programming', 'java se fundamentals'] },
      { canonical: 'Python Programming / Scripting', variants: ['python programming / scripting', 'python programming', 'python scripting', 'unix and linux essentials'] },
      { canonical: 'Database Management Systems (Advanced)', variants: ['database management systems (advanced)', 'advanced databases', 'database management systems and data modelling', 'database management systems'] },
      { canonical: 'Design and Analysis of Algorithms', variants: ['design and analysis of algorithms'] },
      { canonical: 'Statistics & Discrete Mathematics', variants: ['statistics & discrete mathematics', 'applied statistics and probability', 'statistics for data science', 'probability and statistics for engineers', 'discrete mathematics', 'formal languages & automata theory'] },
      { canonical: 'Operating Systems', variants: ['operating systems'] }
    ],
    4: [
      { canonical: 'Software Engineering (incl. Project Management / Agile)', variants: ['software engineering (incl. project management / agile)', 'software engineering', 'software engineering & project management', 'agile systems'] },
      { canonical: 'Computer Networks / Data Communication', variants: ['computer networks / data communication', 'data communication and networks', 'computer networks', 'routing and switching essentials', 'r&s', 'r&s connecting networks'] },
      { canonical: 'Web Technologies (Front-end / PHP / Django)', variants: ['web technologies (front-end / php / django)', 'web technologies (html, django, css)', 'front-end web application development', 'web technology with php', 'front-end web application', 'front-end'] },
      { canonical: 'Database Management Systems', variants: ['database management systems', 'database management systems and data modelling', 'pl/sql and dba'] },
      { canonical: 'Java Programming', variants: ['java programming', 'java se programming', 'java iot developer'] },
      { canonical: 'Operating Systems', variants: ['operating systems'] },
      { canonical: 'Design and Analysis of Algorithms / Computer System Architecture', variants: ['design and analysis of algorithms / computer system architecture', 'design and analysis of algorithms', 'computer system architecture'] }
    ]
  }
};

function normalizeName(branch, semester, rawName) {
  if (!mappingRules[branch] || !mappingRules[branch][semester]) return rawName; // Fallback
  
  let lowerRaw = rawName.toLowerCase().trim();
  const rules = mappingRules[branch][semester];
  
  for (let rule of rules) {
    if (rule.variants.includes(lowerRaw) || lowerRaw === rule.canonical.toLowerCase()) {
      return rule.canonical;
    }
  }
  
  // Also do a simple partial match on variants as fallback if exact match fails
  for (let rule of rules) {
    for (let variant of rule.variants) {
      if (lowerRaw.includes(variant) && variant.length > 5) {
         return rule.canonical;
      }
    }
  }

  return null; // Return null to indicate it should be dropped (unmapped / elective)
}

module.exports = { normalizeName };
