import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import connectDB from "../utils/db.js";
import { User } from "../models/user.model.js";
import { Company } from "../models/company.model.js";
import { Job } from "../models/job.model.js";

import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, "../.env") });

const companies = [
  { name: "Google", description: "Technology giant specializing in internet-related services", website: "https://google.com", location: "Mountain View, CA" },
  { name: "Microsoft", description: "Multinational technology corporation", website: "https://microsoft.com", location: "Redmond, WA" },
  { name: "Amazon", description: "E-commerce and cloud computing leader", website: "https://amazon.com", location: "Seattle, WA" },
  { name: "Meta", description: "Social media and technology conglomerate", website: "https://meta.com", location: "Menlo Park, CA" },
  { name: "Apple", description: "Consumer electronics and software innovator", website: "https://apple.com", location: "Cupertino, CA" },
  { name: "Netflix", description: "Streaming entertainment service", website: "https://netflix.com", location: "Los Gatos, CA" },
  { name: "Tesla", description: "Electric vehicles and clean energy", website: "https://tesla.com", location: "Austin, TX" },
  { name: "Spotify", description: "Audio streaming and media services", website: "https://spotify.com", location: "Stockholm, Sweden" },
  { name: "Adobe", description: "Creative software solutions", website: "https://adobe.com", location: "San Jose, CA" },
  { name: "Salesforce", description: "Cloud-based CRM platform", website: "https://salesforce.com", location: "San Francisco, CA" },
  { name: "Uber", description: "Ride-sharing and delivery platform", website: "https://uber.com", location: "San Francisco, CA" },
  { name: "Airbnb", description: "Online marketplace for lodging", website: "https://airbnb.com", location: "San Francisco, CA" },
  { name: "LinkedIn", description: "Professional networking platform", website: "https://linkedin.com", location: "Sunnyvale, CA" },
  { name: "Twitter", description: "Social networking service", website: "https://twitter.com", location: "San Francisco, CA" },
  { name: "Shopify", description: "E-commerce platform", website: "https://shopify.com", location: "Ottawa, Canada" },
  { name: "Stripe", description: "Online payment processing", website: "https://stripe.com", location: "San Francisco, CA" },
  { name: "Zoom", description: "Video communications platform", website: "https://zoom.us", location: "San Jose, CA" },
  { name: "Slack", description: "Business communication platform", website: "https://slack.com", location: "San Francisco, CA" },
  { name: "Dropbox", description: "Cloud storage and file sharing", website: "https://dropbox.com", location: "San Francisco, CA" },
  { name: "Oracle", description: "Enterprise software and cloud solutions", website: "https://oracle.com", location: "Austin, TX" },
  { name: "IBM", description: "Technology and consulting services", website: "https://ibm.com", location: "Armonk, NY" },
  { name: "Intel", description: "Semiconductor chip manufacturer", website: "https://intel.com", location: "Santa Clara, CA" },
];

const jobs = [
  { title: "Senior Frontend Developer", description: "Build responsive web applications using React and modern JavaScript", requirements: ["React", "TypeScript", "CSS", "Redux"], salary: 120, experienceLevel: 4, location: "Remote", jobType: "Full-time", position: 2 },
  { title: "Backend Engineer", description: "Design and implement scalable backend services", requirements: ["Node.js", "MongoDB", "Express", "REST APIs"], salary: 110, experienceLevel: 3, location: "Hybrid", jobType: "Full-time", position: 3 },
  { title: "Full Stack Developer", description: "Work on both frontend and backend technologies", requirements: ["React", "Node.js", "PostgreSQL", "Docker"], salary: 130, experienceLevel: 5, location: "Remote", jobType: "Full-time", position: 2 },
  { title: "DevOps Engineer", description: "Manage cloud infrastructure and CI/CD pipelines", requirements: ["AWS", "Kubernetes", "Docker", "Terraform"], salary: 125, experienceLevel: 4, location: "On-site", jobType: "Full-time", position: 1 },
  { title: "Data Scientist", description: "Analyze data and build machine learning models", requirements: ["Python", "TensorFlow", "SQL", "Statistics"], salary: 140, experienceLevel: 3, location: "Hybrid", jobType: "Full-time", position: 2 },
  { title: "Mobile App Developer", description: "Create native mobile applications", requirements: ["React Native", "iOS", "Android", "JavaScript"], salary: 115, experienceLevel: 3, location: "Remote", jobType: "Full-time", position: 2 },
  { title: "UI/UX Designer", description: "Design intuitive user interfaces and experiences", requirements: ["Figma", "Adobe XD", "User Research", "Prototyping"], salary: 95, experienceLevel: 2, location: "Hybrid", jobType: "Full-time", position: 1 },
  { title: "Product Manager", description: "Lead product strategy and development", requirements: ["Agile", "Product Strategy", "Analytics", "Communication"], salary: 135, experienceLevel: 5, location: "On-site", jobType: "Full-time", position: 1 },
  { title: "QA Engineer", description: "Ensure software quality through testing", requirements: ["Selenium", "Jest", "Test Automation", "CI/CD"], salary: 90, experienceLevel: 2, location: "Remote", jobType: "Full-time", position: 2 },
  { title: "Machine Learning Engineer", description: "Build and deploy ML models at scale", requirements: ["Python", "PyTorch", "MLOps", "Cloud"], salary: 150, experienceLevel: 4, location: "Hybrid", jobType: "Full-time", position: 1 },
  { title: "Cloud Architect", description: "Design cloud infrastructure solutions", requirements: ["AWS", "Azure", "GCP", "Architecture"], salary: 160, experienceLevel: 6, location: "Remote", jobType: "Full-time", position: 1 },
  { title: "Security Engineer", description: "Protect systems from cyber threats", requirements: ["Security", "Penetration Testing", "Compliance", "Networking"], salary: 145, experienceLevel: 5, location: "On-site", jobType: "Full-time", position: 1 },
  { title: "iOS Developer", description: "Build native iOS applications", requirements: ["Swift", "SwiftUI", "Xcode", "iOS SDK"], salary: 120, experienceLevel: 3, location: "Remote", jobType: "Full-time", position: 2 },
  { title: "Android Developer", description: "Develop Android applications", requirements: ["Kotlin", "Android SDK", "Jetpack Compose", "MVVM"], salary: 118, experienceLevel: 3, location: "Remote", jobType: "Full-time", position: 2 },
  { title: "Data Engineer", description: "Build data pipelines and infrastructure", requirements: ["Python", "Spark", "Airflow", "SQL"], salary: 130, experienceLevel: 4, location: "Hybrid", jobType: "Full-time", position: 2 },
  { title: "Frontend Intern", description: "Learn and contribute to frontend projects", requirements: ["HTML", "CSS", "JavaScript", "React"], salary: 40, experienceLevel: 0, location: "Remote", jobType: "Internship", position: 3 },
  { title: "Backend Intern", description: "Assist in backend development", requirements: ["Node.js", "Express", "MongoDB", "Git"], salary: 42, experienceLevel: 0, location: "Hybrid", jobType: "Internship", position: 2 },
  { title: "Site Reliability Engineer", description: "Ensure system reliability and performance", requirements: ["Linux", "Monitoring", "Automation", "Incident Management"], salary: 135, experienceLevel: 4, location: "Remote", jobType: "Full-time", position: 1 },
  { title: "Technical Writer", description: "Create technical documentation", requirements: ["Writing", "Documentation", "API Docs", "Markdown"], salary: 80, experienceLevel: 2, location: "Remote", jobType: "Full-time", position: 1 },
  { title: "Scrum Master", description: "Facilitate agile development processes", requirements: ["Scrum", "Agile", "Jira", "Team Management"], salary: 100, experienceLevel: 3, location: "Hybrid", jobType: "Full-time", position: 1 },
  { title: "Business Analyst", description: "Analyze business requirements and processes", requirements: ["SQL", "Excel", "Business Analysis", "Communication"], salary: 85, experienceLevel: 2, location: "On-site", jobType: "Full-time", position: 2 },
  { title: "Solutions Architect", description: "Design technical solutions for clients", requirements: ["Architecture", "Cloud", "Consulting", "Communication"], salary: 155, experienceLevel: 6, location: "Hybrid", jobType: "Full-time", position: 1 },
  { title: "Blockchain Developer", description: "Build decentralized applications", requirements: ["Solidity", "Ethereum", "Web3", "Smart Contracts"], salary: 140, experienceLevel: 3, location: "Remote", jobType: "Full-time", position: 1 },
  { title: "Game Developer", description: "Create engaging gaming experiences", requirements: ["Unity", "C#", "3D Graphics", "Game Design"], salary: 105, experienceLevel: 3, location: "On-site", jobType: "Full-time", position: 2 },
  { title: "AI Research Scientist", description: "Research and develop AI algorithms", requirements: ["PhD", "Deep Learning", "Research", "Python"], salary: 180, experienceLevel: 7, location: "On-site", jobType: "Full-time", position: 1 },
  { title: "Database Administrator", description: "Manage and optimize databases", requirements: ["SQL", "PostgreSQL", "MongoDB", "Performance Tuning"], salary: 110, experienceLevel: 4, location: "Hybrid", jobType: "Full-time", position: 1 },
  { title: "Network Engineer", description: "Design and maintain network infrastructure", requirements: ["Networking", "Cisco", "TCP/IP", "Security"], salary: 105, experienceLevel: 3, location: "On-site", jobType: "Full-time", position: 1 },
  { title: "Embedded Systems Engineer", description: "Develop embedded software solutions", requirements: ["C", "C++", "Embedded Systems", "RTOS"], salary: 115, experienceLevel: 4, location: "On-site", jobType: "Full-time", position: 1 },
  { title: "AR/VR Developer", description: "Create augmented and virtual reality experiences", requirements: ["Unity", "ARKit", "ARCore", "3D Modeling"], salary: 125, experienceLevel: 3, location: "Hybrid", jobType: "Full-time", position: 1 },
  { title: "Customer Success Manager", description: "Ensure customer satisfaction and retention", requirements: ["Communication", "CRM", "Customer Service", "Analytics"], salary: 90, experienceLevel: 2, location: "Remote", jobType: "Full-time", position: 2 },
];

const run = async () => {
  await connectDB();

  // Create recruiter user
  let recruiter = await User.findOne({ email: "recruiter@example.com" });
  if (!recruiter) {
    const hashed = await bcrypt.hash("Password123!", 10);
    recruiter = await User.create({
      fullname: "Recruiter Admin",
      email: "recruiter@example.com",
      phoneNumber: 9999999999,
      password: hashed,
      role: "recruiter",
      profile: {}
    });
    console.log("Created recruiter user");
  }

  // Create companies
  const createdCompanies = [];
  for (const companyData of companies) {
    let company = await Company.findOne({ name: companyData.name });
    if (!company) {
      company = await Company.create({
        ...companyData,
        userId: recruiter._id
      });
      console.log(`Created company: ${company.name}`);
    }
    createdCompanies.push(company);
  }

  // Create jobs - distribute across companies
  const existingJobs = await Job.countDocuments();
  if (existingJobs < 10) {
    for (let i = 0; i < jobs.length; i++) {
      const jobData = jobs[i];
      const company = createdCompanies[i % createdCompanies.length]; // Distribute jobs across companies

      await Job.create({
        ...jobData,
        company: company._id,
        created_by: recruiter._id
      });
      console.log(`Created job: ${jobData.title} at ${company.name}`);
    }
    console.log(`\nSuccessfully created ${jobs.length} jobs across ${createdCompanies.length} companies!`);
  } else {
    console.log("Jobs already exist, skipping job creation");
  }

  console.log("\n✅ Seed completed successfully!");
  process.exit(0);
};

run().catch(err => {
  console.error("Error seeding database:", err);
  process.exit(1);
});