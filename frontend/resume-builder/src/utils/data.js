export const TEMPLATE_OPTIONS = [
  {
    id: '01',
    label: 'Modern Minimalist',
    description: 'Clean layout ideal for tech, finance, and corporate roles',
  },
  {
    id: '02',
    label: 'Creative Professional',
    description: 'Visually engaging with accent colors for creative fields',
  },
  {
    id: '03',
    label: 'Executive',
    description: 'Authoritative design with premium accents for leadership',
  },
];

export const themeColorPalette = {
  themeOne: [
    // Classic Monochrome (Corporate)
    ["#F8F9FA", "#E9ECEF", "#DEE2E6", "#495057", "#212529"],

    // Trustworthy Blue (Finance/Tech)
    ["#F0F7FF", "#B6D6F2", "#7DB5E5", "#1E6FD9", "#0A2E6D"],

    // Eco Green (Healthcare/Environment)
    ["#F0FAF5", "#C2E8D6", "#7AC5A3", "#2E8B57", "#1D4C34"],

    // Creative Purple (Design/Marketing)
    ["#F9F6FF", "#D9CBF7", "#B79CED", "#6A3CB7", "#3D1A86"],

    // Warm Accent (Startups)
    ["#FFF9F5", "#FFE0CC", "#FFB380", "#FF6B00", "#662900"],

    // Slate Teal (Engineering/Academia)
    ["#F5F9F9", "#C3D8D8", "#8FB3B3", "#4D7C7C", "#1A3E3E"],

    // Berry Bold (Leadership)
    ["#FDF2F8", "#F5C2E0", "#E893C4", "#C2185B", "#6A0D36"],

    // Gold & Navy (Executive)
    ["#FFFDF2", "#FFEDB3", "#FFD700", "#003366", "#001A33"],

    // Modern Coral (UX/Nonprofit)
    ["#FFF5F3", "#FFD4C8", "#FFA38A", "#FF4E2D", "#801D0A"],

    // Deep Ocean (Consulting)
    ["#F2F9FF", "#C7E0F4", "#8FC1E8", "#1A5D9F", "#0A2A4D"],

    // Soft Clay (Education)
    ["#FBF7F4", "#EDDDD2", "#D9BBA3", "#A67C52", "#4E3629"],

    // Cool Gray (Legal)
    ["#FAFAFA", "#E0E0E0", "#BDBDBD", "#616161", "#212121"]
  ]
};


export const DUMMY_RESUME_DATA = {
  profileInfo: {
    profileImg: null,
    previewUrl:"",
    fullName: "Jane Doe",
    designation: "Frontend Developer",
    summary:
      "Creative and detail-oriented frontend developer with 3+ years of experience in building responsive web apps."
  },
  contactInfo: {
    email: "jane.doe@example.com",
    phone: "+1234567890",
    location: "New York, USA",
    linkedin: "https://linkedin.com/in/janedoe",
    github: "https://github.com/janedoe",
    website: "https://janedoe.dev"
  },
  workExperience: [
    {
      company: "Tech Corp",
      role: "Frontend Developer",
      startDate: "2021-01",
      endDate: "2023-05",
      description: "Developed interactive UIs using React and Tailwind CSS."
    }
  ],
  education: [
    {
      degree: "BSc in Computer Science",
      institution: "New York University",
      startDate: "2016-09",
      endDate: "2020-06"
    }
  ],
  skills: [
    { name: "React", progress: 90 },
    { name: "Tailwind CSS", progress: 85 }
  ],
  projects: [
    {
      title: "Portfolio Website",
      description: "Personal portfolio built with Next.js",
      github: "https://github.com/janedoe/portfolio",
      LiveDemo: "https://janedoe.dev"
    }
  ],
  certifications: [
    {
      title: "Responsive Web Design",
      issuer: "freeCodeCamp",
      year: "2021"
    }
  ],
  languages: [
    { name: "English", progress: 100 },
    { name: "Spanish", progress: 70 }
  ],
  interests: ["UI Design", "Traveling", "Reading"]
};
