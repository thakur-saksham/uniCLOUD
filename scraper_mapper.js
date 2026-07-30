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
      { canonical: 'Programming in C', variants: ['programming in c', 'programming and data structure'] },
      { canonical: 'Problem Solving Using C', variants: ['problem solving using c'] },
      { canonical: 'Computer Fundamentals', variants: ['computer fundamentals', 'fundamentals of computer'] },
      { canonical: 'Database Management Systems / SQL', variants: ['database management systems / sql', 'database management systems', 'dbms', 'introduction to sql', 'database management system'] },
      { canonical: 'Web Technologies', variants: ['web technologies'] },
      { canonical: 'English Communication', variants: ['english communication'] }
    ],
    2: [
      { canonical: 'Mathematics II', variants: ['basic mathematics ii', 'mathematics ii'] },
      { canonical: 'Discrete Mathematics', variants: ['discrete mathematical structures', 'discrete mathematics'] },
      { canonical: 'Statistics Numerical Methods & Algorithms', variants: ['statistics numerical methods & algorithms'] },
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
      { canonical: 'Design and Analysis of Algorithms', variants: ['design and analysis of algorithms'] },
      { canonical: 'Computer System Architecture', variants: ['computer system architecture'] }
    ]
  },
  'B.Tech Applied Petroleum Engineering – Gas Stream': {
    1: [
      { canonical: 'Mathematics I', variants: ['advanced engineering mathematics-i', 'mathematics i', 'mathematics-i'] },
      { canonical: 'Physics I', variants: ['physics', 'physics i'] },
      { canonical: 'Chemistry I', variants: ['chemistry', 'chemistry i'] },
      { canonical: 'Programming for Engineers', variants: ['programming for engineers', 'object oriented programming', 'programming for problem solving'] },
      { canonical: 'Basic Electrical & Electronics Engineering', variants: ['basic electrical and electronics engineering', 'basic electronics engineering', 'basic electrical & electronics engineering'] },
      { canonical: 'Workshop Practices', variants: ['workshop practices', 'workshop technology'] }
    ],
    2: [
      { canonical: 'Mathematics II', variants: ['advanced engineering mathematics ii', 'engineering mathematics ii', 'mathematics ii', 'mathematics-ii'] },
      { canonical: 'Physics II', variants: ['physics-i'] },
      { canonical: 'Chemistry', variants: ['chemistry'] },
      { canonical: 'Engineering Graphics', variants: ['engineering graphics'] },
      { canonical: 'Workshop Practices', variants: ['workshop practices'] },
      { canonical: 'Basic Electrical & Electronics Engineering', variants: ['basic electrical & electronics engineering', 'basic electrical engineering', 'basic electrical and electronics engineering'] },
      { canonical: 'Introduction to Geology', variants: ['introduction to geology'] }
    ],
    3: [
      { canonical: 'Engineering Thermodynamics', variants: ['engineering thermodynamics', 'chemical engineering thermodynamics-i', 'thermodynamics and heat engines'] },
      { canonical: 'Fluid Mechanics', variants: ['fluid mechanics'] },
      { canonical: 'Material & Energy Balance Computations', variants: ['material & energy balance computations', 'material and energy balance computations', 'chemical process calculations'] },
      { canonical: 'Petroleum Engineering Fundamentals', variants: ['petroleum engineering fundamentals', 'introduction to oil & gas operations', 'introduction to petroleum engineering', 'introduction to petroleum operations', 'petroleum exploration', 'fundamentals of drilling/reservoir/production engineering'] },
      { canonical: 'Sedimentary and Petroleum Geology', variants: ['sedimentary and petroleum geology'] },
      { canonical: 'Mathematics III', variants: ['mathematics iii', 'statistical and numerical methods'] },
      { canonical: 'Engineering Mechanics', variants: ['engineering mechanics'] }
    ],
    4: [
      { canonical: 'Natural Gas Engineering', variants: ['natural gas engineering'] },
      { canonical: 'Mass Transfer', variants: ['mass transfer', 'mass transfer operations'] },
      { canonical: 'Heat Transfer', variants: ['heat transfer'] },
      { canonical: 'Chemical Engineering Thermodynamics-II', variants: ['chemical engineering thermodynamics-ii'] },
      { canonical: 'Drilling Technology', variants: ['drilling technology', 'drilling engineering & well completion', 'drilling engineering and well completion'] },
      { canonical: 'Reservoir Engineering I', variants: ['reservoir engineering i'] },
      { canonical: 'Geophysics', variants: ['geophysics'] }
    ]
  },
  'B.Sc (Hons) - Chemistry': {
    1: [
      { canonical: 'Inorganic Chemistry I', variants: ['inorganic chemistry i', 'atomic structure and bonding'] },
      { canonical: 'Physical Chemistry I', variants: ['physical chemistry i', 'states of matter and ionic equilibria'] },
      { canonical: 'Linear Algebra', variants: ['linear algebra', 'matrices'] },
      { canonical: 'Geology GE', variants: ['geology ge', 'fundamental of geology', 'rocks and minerals', 'essentials of geology'] },
      { canonical: 'Physics GE', variants: ['physics ge', 'introductory mathematical physics', 'electricity & magnetism'] },
      { canonical: 'Environmental Science', variants: ['environmental science'] }
    ],
    2: [
      { canonical: 'Organic Chemistry-I', variants: ['organic chemistry-i', 'fundamentals of organic chemistry', 'organic chemistry i'] },
      { canonical: 'Physical Chemistry-II', variants: ['physical chemistry-ii', 'chemical thermodynamics & solution'] },
      { canonical: 'Analytical Chemistry', variants: ['analytical chemistry', 'principles of analytical chemistry', 'pharmaceutical compounds'] },
      { canonical: 'Calculus', variants: ['calculus'] },
      { canonical: 'Physics GE', variants: ['physics ge', 'nuclear and particle physics', 'solid state physics', 'physics and chemistry of earth'] },
      { canonical: 'Constitution and Indian Polity', variants: ['constitution and indian polity'] },
      { canonical: 'English Communication', variants: ['english communication'] }
    ],
    3: [
      { canonical: 'Physical Chemistry III', variants: ['physical chemistry iii', 'solutions/phase equilibrium – chemistry ii', 'solutions/phase equilibrium'] },
      { canonical: 'Organic Chemistry II', variants: ['organic chemistry ii'] },
      { canonical: 'Inorganic Chemistry II', variants: ['inorganic chemistry ii'] },
      { canonical: 'Fuel/Pesticide Chemistry', variants: ['fuel/pesticide chemistry', 'fuel chemistry', 'pesticide chemistry'] },
      { canonical: 'Elements of Modern Physics', variants: ['elements of modern physics'] },
      { canonical: 'Differential Equations', variants: ['differential equations'] }
    ],
    4: [
      { canonical: 'Physical Chemistry IV', variants: ['physical chemistry iv'] },
      { canonical: 'Organic Chemistry III', variants: ['organic chemistry iii'] },
      { canonical: 'Inorganic Chemistry-III', variants: ['inorganic chemistry-iii'] },
      { canonical: 'Pharmaceutical/Analytical Chemistry', variants: ['pharmaceutical/analytical chemistry', 'pharmaceutical chemistry', 'basic analytical chemistry'] },
      { canonical: 'Nuclear and Particle Physics', variants: ['nuclear and particle physics'] },
      { canonical: 'Numerical Methods / Probability & Statistics', variants: ['numerical methods / probability & statistics', 'numerical methods', 'probability & statistics'] }
    ]
  },
  'B.Sc (Hons) - Geology': {
    1: [
      { canonical: 'Mineral Science', variants: ['mineral science', 'economic geology'] },
      { canonical: 'Earth System Science', variants: ['earth system science'] },
      { canonical: 'Chemistry GE', variants: ['chemistry ge', 'inorganic chemistry', 'atomic structure/bonding/general organic chemistry'] },
      { canonical: 'Linear Algebra', variants: ['linear algebra', 'matrices'] },
      { canonical: 'Physics GE', variants: ['physics ge', 'introductory mathematical physics', 'electricity & magnetism'] },
      { canonical: 'Information Security / Computer Programming', variants: ['information security / computer programming', 'information security', 'computer programming'] }
    ],
    2: [
      { canonical: 'Igneous Petrology', variants: ['igneous petrology'] },
      { canonical: 'Sedimentary Petrology', variants: ['sedimentary petrology'] },
      { canonical: 'Structural Geology / Elements of Geochemistry', variants: ['structural geology / elements of geochemistry', 'structural geology', 'elements of geochemistry'] },
      { canonical: 'Chemistry GE', variants: ['chemistry ge', 'organic chemistry', 'chemical energetics/equilibria & fgoc-i'] },
      { canonical: 'Physics GE', variants: ['physics ge', 'nuclear and particle physics', 'solid state physics', 'foundational mechanics'] },
      { canonical: 'Calculus', variants: ['calculus'] },
      { canonical: 'Environmental Science', variants: ['environmental science'] }
    ],
    3: [
      { canonical: 'Metamorphic Petrology', variants: ['metamorphic petrology'] },
      { canonical: 'Structural Geology', variants: ['structural geology'] },
      { canonical: 'Elements of Geochemistry', variants: ['elements of geochemistry'] },
      { canonical: 'Palaeontology', variants: ['palaeontology', 'paleontology'] },
      { canonical: 'Chemistry GE', variants: ['chemistry ge', 'physical chemistry', 'spece & fgoc', 'solutions/phase equilibrium'] },
      { canonical: 'Physics GE', variants: ['physics ge', 'introduction to electricity & magnetism', 'elements of modern physics'] },
      { canonical: 'Differential Equations', variants: ['differential equations'] }
    ],
    4: [
      { canonical: 'Hydrogeology', variants: ['hydrogeology'] },
      { canonical: 'Remote Sensing and GIS', variants: ['remote sensing and gis'] },
      { canonical: 'Stratigraphic Principles and Indian Stratigraphy', variants: ['stratigraphic principles and indian stratigraphy', 'stratigraphic principles', 'indian stratigraphy'] },
      { canonical: 'Paleontology / Metamorphic Petrology', variants: ['paleontology / metamorphic petrology', 'paleontology', 'metamorphic petrology'] },
      { canonical: 'Chemistry GE', variants: ['chemistry ge', 'analytical chemistry', 'chemistry of d-block elements', 's&p-block elements/states of matter/chemical kinetics'] },
      { canonical: 'Physics GE', variants: ['physics ge', 'thermodynamics', 'nuclear and particle physics'] },
      { canonical: 'Math GE', variants: ['math ge', 'partial differential equations', 'numerical methods', 'probability and statistics', 'probability & statistics'] }
    ]
  },
  'B.Sc (Hons) - Mathematics': {
    1: [
      { canonical: 'Differential Calculus', variants: ['differential calculus', 'calculus', 'calculus and analytical geometry'] },
      { canonical: 'Linear Algebra I', variants: ['linear algebra i', 'algebra'] },
      { canonical: 'Chemistry GE', variants: ['chemistry ge', 'inorganic chemistry', 'atomic structure/bonding/general organic chemistry'] },
      { canonical: 'Physics GE', variants: ['physics ge', 'introductory mathematical physics', 'electricity & magnetism'] },
      { canonical: 'Geology GE', variants: ['geology ge', 'fundamental of geology'] },
      { canonical: 'Environmental Science', variants: ['environmental science'] }
    ],
    2: [
      { canonical: 'Real Analysis I', variants: ['real analysis i', 'real analysis'] },
      { canonical: 'Linear Algebra-II', variants: ['linear algebra-ii', 'linear algebra ii', 'linear algebra'] },
      { canonical: 'Analytical Geometry', variants: ['analytical geometry'] },
      { canonical: 'Integral Calculus', variants: ['integral calculus'] },
      { canonical: 'Chemistry GE', variants: ['chemistry ge', 'organic chemistry', 'chemical energetics/equilibria & fgoc-i'] },
      { canonical: 'Physics GE', variants: ['physics ge', 'nuclear and particle physics', 'solid state physics', 'foundational mechanics'] },
      { canonical: 'Constitution and Indian Polity / English Communication', variants: ['constitution and indian polity / english communication', 'constitution and indian polity', 'english communication'] }
    ],
    3: [
      { canonical: 'Ordinary Differential Equations', variants: ['ordinary differential equations'] },
      { canonical: 'Complex Analysis', variants: ['complex analysis'] },
      { canonical: 'Analytical Geometry', variants: ['analytical geometry'] },
      { canonical: 'Logic and Sets', variants: ['logic and sets'] },
      { canonical: 'Group Theory I', variants: ['group theory i'] },
      { canonical: 'Theory of Real Functions', variants: ['theory of real functions'] },
      { canonical: 'Chemistry/Physics GE', variants: ['chemistry/physics ge', 'physical chemistry', 'introduction to electricity & magnetism', 'elements of modern physics', 'spece & fgoc', 'solutions/phase equilibrium'] }
    ],
    4: [
      { canonical: 'Real Analysis II', variants: ['real analysis ii', 'riemann integration and series of functions'] },
      { canonical: 'Partial Differential Equations', variants: ['partial differential equations', 'pde and system of ode', 'function of several variables and pdes'] },
      { canonical: 'Graph Theory', variants: ['graph theory'] },
      { canonical: 'Probability & Statistics', variants: ['probability & statistics'] },
      { canonical: 'Ring Theory and Linear Algebra I', variants: ['ring theory and linear algebra i'] },
      { canonical: 'Complex Analysis', variants: ['complex analysis'] },
      { canonical: 'Chemistry/Physics/Geology GE', variants: ['chemistry/physics/geology ge', 'introduction to structural geology', 'mechanics', 'analytical chemistry', 'thermodynamics', 's&p-block elements', 'nuclear and particle physics', 'fossils & their applications', 'chemistry of d-block elements'] }
    ]
  },
  'B.Sc (Hons) - Physics': {
    1: [
      { canonical: 'Mathematical Physics-I', variants: ['mathematical physics-i'] },
      { canonical: 'Mechanics', variants: ['mechanics'] },
      { canonical: 'Linear Algebra I', variants: ['linear algebra i', 'matrices'] },
      { canonical: 'Chemistry GE', variants: ['chemistry ge', 'inorganic chemistry', 'atomic structure/bonding/general organic chemistry'] },
      { canonical: 'Geology GE', variants: ['geology ge', 'fundamental of geology', 'rocks and minerals', 'essentials of geology'] },
      { canonical: 'Introduction to Metrology', variants: ['introduction to metrology'] },
      { canonical: 'Environmental Science', variants: ['environmental science'] }
    ],
    2: [
      { canonical: 'Mathematical Physics II', variants: ['mathematical physics ii'] },
      { canonical: 'Thermal Physics', variants: ['thermal physics'] },
      { canonical: 'Electricity and Magnetism', variants: ['electricity and magnetism'] },
      { canonical: 'Waves & Optics', variants: ['waves & optics'] },
      { canonical: 'Chemistry GE', variants: ['chemistry ge', 'organic chemistry', 'chemical energetics/equilibria & fgoc-i'] },
      { canonical: 'Calculus', variants: ['calculus'] },
      { canonical: 'Constitution and Indian Polity / English Communication', variants: ['constitution and indian polity / english communication', 'constitution and indian polity', 'english communication'] }
    ],
    3: [
      { canonical: 'Waves & Optics', variants: ['waves & optics'] },
      { canonical: 'Elements of Modern Physics', variants: ['elements of modern physics'] },
      { canonical: 'Analog & Digital Systems and Applications', variants: ['analog & digital systems and applications', 'analog systems and applications', 'digital systems and applications'] },
      { canonical: 'Computational Physics', variants: ['computational physics', 'operating system: linux'] },
      { canonical: 'Thermal Physics', variants: ['thermal physics'] },
      { canonical: 'Differential Equations', variants: ['differential equations', 'ordinary differential equations'] },
      { canonical: 'Chemistry GE', variants: ['chemistry ge', 'physical chemistry', 'spece & fgoc', 'solutions/phase equilibrium'] }
    ],
    4: [
      { canonical: 'Mathematical Physics III', variants: ['mathematical physics iii'] },
      { canonical: 'Solid State Physics', variants: ['solid state physics'] },
      { canonical: 'Statistical Physics', variants: ['statistical physics'] },
      { canonical: 'Radiation Safety', variants: ['radiation safety', 'renewable energy and energy harvesting'] },
      { canonical: 'Math GE', variants: ['math ge', 'partial differential equations', 'numerical methods', 'probability and statistics'] },
      { canonical: 'Chemistry GE', variants: ['chemistry ge', 's&p-block elements/states of matter/chemical kinetics', 'fossils & their applications'] },
      { canonical: 'Digital Systems / MATLAB', variants: ['digital systems / matlab', 'digital system and application', 'introduction to matlab programming', 'mechanical drawing'] }
    ]
  },
  'B.Sc (CSE)': {
    1: [
      { canonical: 'Mathematical Sciences-I', variants: ['mathematical sciences-i'] },
      { canonical: 'Digital Electronics', variants: ['digital electronics'] },
      { canonical: 'Programming in C', variants: ['programming in c'] }
    ],
    2: [
      { canonical: 'Mathematical Sciences-II', variants: ['mathematical sciences-ii'] },
      { canonical: 'OOPs Using C++', variants: ['oops using c++'] }
    ],
    3: [
      { canonical: 'Databases', variants: ['databases'] },
      { canonical: 'Discrete Mathematics & Linear Algebra', variants: ['discrete mathematics & linear algebra'] },
      { canonical: 'Design and Analysis of Algorithms', variants: ['design and analysis of algorithms'] },
      { canonical: 'Elements of AIML', variants: ['elements of aiml'] }
    ],
    4: [
      { canonical: 'Information Technology and Cyber Security', variants: ['information technology and cyber security'] },
      { canonical: 'Fundamentals of Data Science', variants: ['fundamentals of data science'] },
      { canonical: 'Applied Machine Learning', variants: ['applied machine learning'] },
      { canonical: 'Probability, Computing and Statistics', variants: ['probability, computing and statistics'] },
      { canonical: 'Operating Systems', variants: ['operating systems'] },
      { canonical: 'Computer Organization and Architecture', variants: ['computer organization and architecture'] }
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
