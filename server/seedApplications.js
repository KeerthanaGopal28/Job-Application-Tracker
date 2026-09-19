const mongoose = require('mongoose');
const JobApplication = require('./models/JobApplication');

require('dotenv').config();

const USER_ID = '6aadfbd9b3ed40f2af33eaaf'; // your existing user ID
const COUNT = 1000;

const companies = [
  'Google',
  'Microsoft',
  'Amazon',
  'IBM',
  'Oracle',
  'Deloitte',
  'Infosys',
  'Accenture',
  'TCS',
  'Wipro'
];

const roles = [
  'Software Engineer',
  'SDE Intern',
  'Frontend Developer',
  'Backend Developer',
  'Full Stack Developer'
];

const stages = [
  'Saved',
  'Applied',
  'OA',
  'Phone Screen',
  'Interview',
  'Offer',
  'Rejected',
  'Withdrawn',
  'Accepted'
];

const sources = [
  'LinkedIn',
  'Indeed',
  'Company Site',
  'Referral',
  'Naukri',
  'Internshala',
  'Other'
];

const generateApplications = () => {
  const applications = [];

  for (let i = 0; i < COUNT; i++) {
    applications.push({
      user: USER_ID,
      company: `${companies[i % companies.length]} ${i + 1}`,
      role: roles[i % roles.length],
      location: 'Bengaluru',
      jobUrl: 'https://example.com/job',
      source: sources[i % sources.length],
      salaryNote: '10 LPA',
      stage: stages[i % stages.length],
      statusNote: '',
      appliedDate: new Date(),
      interviewDate: null,
      deadlineDate: null,
      notes: 'Test application',
      tags: ['javascript', 'react'],
      priority: i % 5 === 0
    });
  }

  return applications;
};

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log('Connected to MongoDB');

    const applications = generateApplications();

    await JobApplication.insertMany(applications);

    console.log(`${COUNT} applications inserted successfully`);

    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');

  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
};

seed();