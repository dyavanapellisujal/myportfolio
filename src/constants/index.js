import project1 from "../assets/projects/project-1.jpg";
import project2 from "../assets/projects/project-2.jpg";
import project3 from "../assets/projects/project-3.jpg";
import project4 from "../assets/projects/project-4.jpg";
import googlecert from "../assets/projects/New-Google-Logo-497x500.webp"
import { FaLinkedin } from "react-icons/fa"
import defendergpo from "../assets/projects/defender.webp"
import Apache_Tomcat from "../assets/projects/Apache_Tomcat_Logo.png"
// import { Link } from 'react-router-dom';  

export const HERO_CONTENT = `I am a passionate full stack developer with a knack for crafting robust and scalable web applications. With 5 years of hands-on experience, I have honed my skills in front-end technologies like React and Next.js, as well as back-end technologies like Node.js, MySQL, PostgreSQL, and MongoDB. My goal is to leverage my expertise to create innovative solutions that drive business growth and deliver exceptional user experiences.`;

export const ABOUT_TEXT = `I'm Dyavanapelli Sujal, an engineering student deeply passionate about cybersecurity, particularly on the blue team side, with a specialization in SOC analysis. Proficient in a range of cybersecurity essentials, I prioritize defensive strategies to safeguard digital assets. With expertise in computer networking and a keen interest in network security, I'm well-equipped to analyze and respond to threats effectively. Actively engaging in continuous learning and competitions in cybersecurity, I'm driven to excel as a SOC Analyst. Leveraging my knowledge in networking and broad cybersecurity expertise, I'm committed to fortifying defenses against evolving threats.`;

export const EXPERIENCES = [
  {
    year: "2023 - Present",
    role: "Senior Full Stack Developer",
    company: "Google Inc.",
    description: `Led a team in developing and maintaining web applications using JavaScript, React.js, and Node.js. Implemented RESTful APIs and integrated with MongoDB databases. Collaborated with stakeholders to define project requirements and timelines.`,
    technologies: ["Javascript", "React.js", "Next.js", "mongoDB"],
  },
  {
    year: "2022 - 2023",
    role: "Frontend Developer",
    company: "Adobe",
    description: `Designed and developed user interfaces for web applications using Next.js and React. Worked closely with backend developers to integrate frontend components with Node.js APIs. Implemented responsive designs and optimized frontend performance.`,
    technologies: ["HTML", "CSS", "Vue.js", "mySQL"],
  },
  {
    year: "2021 - 2022",
    role: "Full Stack Developer",
    company: "Facebook",
    description: `Developed and maintained web applications using JavaScript, React.js, and Node.js. Designed and implemented RESTful APIs for data communication. Collaborated with cross-functional teams to deliver high-quality software products on schedule.`,
    technologies: ["Python", "Svelte", "Three.js", "Postgres"],
  },
  {
    year: "2020 - 2021",
    role: "Software Engineer",
    company: "Paypal",
    description: `Contributed to the development of web applications using JavaScript, React.js, and Node.js. Managed databases and implemented data storage solutions using MongoDB. Worked closely with product managers to prioritize features and enhancements.`,
    technologies: ["Ruby", "Rails", "PHP", "Sqlite"],
  },
];

export const PROJECTS = [
  {
    title: "Intrusion Detection With Splunk",
    image: Apache_Tomcat,
    description:
      "In this project, I utilized a dataset provided by Hack The Box to analyze and detect intrusions using Splunk. The project involved ingesting and parsing data within Splunk to identify malicious activities. Through this lab, I demonstrated my ability to work with Splunk for security information and event management (SIEM), effectively using its powerful search and visualization capabilities to detect security incidents. This project showcases my skills in data analysis, threat detection, and incident response..",
    technologies:[ "Splunk"],
    link: "https://docs.google.com/document/d/1pq__0gzgL9ZI9wHc9WqtmsIzP29068_H/edit?usp=sharing&ouid=101903087259638646553&rtpof=true&sd=true"
  },



  {
    title: "Detection and Analysis of Attacker TTPs on a Compromised Tomcat Webserver",
    image: Apache_Tomcat,
    description:
      "In this Lab project, I successfully detected and analyzed the tactics, techniques, and procedures (TTPs) used by attackers on a compromised Tomcat webserver. The analysis was conducted using PCAP files containing webserver communication logs. Utilizing tools such as Wireshark and NetworkMiner, I performed a detailed examination of the network traffic, identified malicious activities, and uncovered the methods used by the attackers to compromise the server. This project demonstrates my ability to conduct network forensics, interpret network traffic data, and apply blue team methodologies to identify and mitigate security incidents.",
    technologies:[ "NetworkMiner", "wireshark"],
    link: "https://medium.com/@dyavanapellisujal7/securely-configure-shares-in-active-directory-group-based-access-control-and-permissions-5bd840fac05e"
  },


  {
    title: "Securely Configuring Shared Folders in AD",
    image: project1,
    description:
      " In this project, I demonstrate the secure configuration of shared folders in Active Directory (AD), highlighting my expertise in Windows Server administration and cybersecurity. Shared folders are essential for collaborative work environments, but improper configuration can lead to security vulnerabilities. Follow along as I guide you through the process of securely configuring shared folders in AD, including setting appropriate permissions, implementing access controls. Whether you're a system administrator or a cybersecurity enthusiast, this project provides valuable insights into securing shared resources in an enterprise environment.",
    technologies: ["HTML", "CSS", "React", "Node.js", "MongoDB"],
    link: "https://medium.com/@dyavanapellisujal7/securely-configure-shares-in-active-directory-group-based-access-control-and-permissions-5bd840fac05e"
  },
  {
    title: "Hacking Wifi with Aircrack-ng",
    image: project2,
    description:
      "In this project, I present a comprehensive guide to Wi-Fi penetration testing using Aircrack-ng. From understanding Wi-Fi security protocols to performing attacks, this project showcases my skills in ethical hacking and cybersecurity. Follow along as I walk you through setting up the environment, performing Wi-Fi attacks, and cracking Wi-Fi passwords using Aircrack-ng. Gain valuable insights into defending against Wi-Fi attacks and learn best practices for securing Wi-Fi networks. Whether you're a beginner or an experienced enthusiast, this project serves as a valuable resource for exploring the fascinating world of Wi-Fi penetration testing",
    technologies: ["HTML", "CSS", "Angular", "Firebase"],
    link: "https://medium.com/@dyavanapellisujal7/how-to-hack-wi-fi-networks-b73969824e64"
  },
  {title: "Configuring Firewall rules using GPO's ",
    image: defendergpo,
    description:
      "Configuring firewall rules on end hosts can be exhausting when done manually on every device. However, there is an efficient way to configure these policies on devices within a domain using Active Directory services. The blog above explains how to configure firewall policies in an AD environment. This project demonstrates how to restrict domain users and devices from accessing websites based on the policies defined by the organization.",
    technologies: ["HTML", "CSS", "Angular", "Firebase"],
    link: "https://medium.com/@dyavanapellisujal7/configuring-firewall-policies-using-gpos-in-active-directory-f12a95632b51"
  },
    // {
    //   title: "Portfolio Website",
    //   image: project3,
    //   description:
    //     "A personal portfolio website showcasing projects, skills, and contact information.",
    //   technologies: ["HTML", "CSS", "React", "Bootstrap"],
    // },
  // {
  //   title: "Blogging Platform",
  //   image: project4,
  //   description:
  //     "A platform for creating and publishing blog posts, with features like rich text editing, commenting, and user profiles.",
  //   technologies: ["HTML", "CSS", "Vue.js", "Express", "mySQL"],
  // },
];

export const Certifications = [
  {
    title: "Google's CyberSecurity Course",
    image: googlecert,
    description:
      "Completing the Google Cybersecurity Course was a significant milestone for me, as it provided an excellent foundation in cybersecurity. This certificate not only introduced me to the fundamentals of cybersecurity but also equipped me with practical skills and knowledge essential for the field. It served as a stepping stone in my journey towards becoming proficient in cybersecurity and reinforced my passion for safeguarding digital assets",
    technologies: ["HTML", "CSS", "Angular", "Firebase"],
    link: "https://coursera.org/share/3c8d9c3cc766a9be1a43c4f129e933d9"
  },

]

export const CONTACT = {
  address: "Bhiwandi, Maharashtra",
  phoneNo: "+917028393406 ",
  email: "dyavanapellisujal7@gmail.com",
  linkedin: "linkedin@dyavanapellisujal",
  medium: "medium@dyavanapellisujal"
  
};

