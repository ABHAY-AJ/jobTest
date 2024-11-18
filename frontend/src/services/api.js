// src/services/api.js
export const fetchJobs = async () => {
    return {
      data: [
        { _id: '1', title: 'Frontend Developer', description: 'Develop UI/UX' },
        { _id: '2', title: 'Backend Developer', description: 'Develop APIs' },
      ],
    };
  };
  
  export const fetchInternships = async () => {
    return {
      data: [
        { _id: '1', title: 'Data Science Intern', description: 'Analyze data' },
        { _id: '2', title: 'Software Engineering Intern', description: 'Assist in software development' },
      ],
    };
  };
  
  export const fetchUserProfile = async () => {
    return {
      data: {
        name: 'John Doe',
        email: 'john@example.com',
        skills: ['JavaScript', 'React', 'Node.js'],
        experience: 2,
        education: 'B.Tech in Computer Science',
      },
    };
  };
  