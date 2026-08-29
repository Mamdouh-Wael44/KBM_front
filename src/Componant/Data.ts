export interface Lesson {
  id: number;
  img: string;
  title: string;
  rate: number;
  description: string;
}
export const Development = [
  {
    id: 1,
    category: "Development",
    
  },
  {
    id: 2,
    category: "Backend",
    
  },
  {
    id: 3,
    category: "Fullstack",
    
  },
  {
    id: 4,
    category: "Frontend",
    
  },
  {
    id: 5,
    category: "UI/UX",
    
  },
  {
    id: 6,
    category: "Machine Learning",
    
  },
  {
    id: 7,
    category: "DevOps",
    
  },
  {
    id: 8,
    category: "Next.js",
    
  }
]
const lessons: Lesson[] = [
  {
    id: 1,
    img: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&q=80",
    title: "Web Development Basics",
    rate: 4.8,
    description: "Learn the fundamentals of HTML, CSS, and JavaScript and start building modern websites."
  },
  {
    id: 2,
    img: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=600&q=80",
    title: "React Fundamentals",
    rate: 4.9,
    description: "Learn how to build interactive and dynamic user interfaces using React."
  },
  {
    id: 3,
    img: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?auto=format&fit=crop&w=600&q=80",
    title: "JavaScript Masterclass",
    rate: 4.7,
    description: "Improve your JavaScript skills and learn modern programming concepts."
  },
  {
    id: 4,
    img: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&w=600&q=80",
    title: "Python Programming",
    rate: 4.9,
    description: "Learn Python programming from the basics to advanced concepts."
  },
  {
    id: 5,
    img: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?auto=format&fit=crop&w=600&q=80",
    title: "Introduction to UI/UX",
    rate: 4.6,
    description: "Discover principles of user interface design and learn how to create intuitive user experiences."
  },
  {
    id: 6,
    img: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=600&q=80",
    title: "Machine Learning Foundations",
    rate: 4.9,
    description: "Step into the world of AI with supervised and unsupervised machine learning algorithms."
  },
  {
    id: 7,
    img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80",
    title: "DevOps & Docker Basics",
    rate: 4.7,
    description: "Learn containerization and continuous integration to streamline development workflows."
  },
  {
    id: 8,
    img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80",
    title: "Next.js Advanced Routing",
    rate: 4.8,
    description: "Master React frameworks, Server Components, page caching, and modern dynamic routes."
  }
];

export default lessons;
