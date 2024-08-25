import project1 from "../assets/projects/project-1.jpg";

import googlecert from "../assets/projects/New-Google-Logo-497x500.webp"
import { FaLinkedin } from "react-icons/fa"
import defendergpo from "../assets/projects/defender.webp"
import Apache_Tomcat from "../assets/projects/Apache_Tomcat_Logo.png"
import password_spray from "../assets/projects/password_spraying.png"
import kerberoast from "../assets/projects/kerberoasting.png"
import Homelab from "../assets/projects/Homelab.png"
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
    title: "Cybersecurity Home Lab",
    image: Homelab,
    description:
      "Demonstrated my skills in networking , virtualization and network security through my home lab project. The home lab is built with a perspective of a blue team to simulate attacks and detect them using splunk and suricata, utilized Pfsense firewall to manage the traffic in and out of the network. The lab is completely a virtualized lab using virtualbox.",
    technologies:[ "Splunk,Virtualbox,Pfsense,Suricata"],
    link: "https://medium.com/@dyavanapellisujal7/soc-home-lab-part-1-6309b5b91118"
  },

  {
    title: "Detecting Kerberoasting with Honeypot and Splunk.",
    image: kerberoast,
    description:
      "This project delves into demonstrating the kerberoasting attack and discussing the opportunities to detect the kerberoasting attack. Leveraged a honeypot service account and the windows event logs to detect potential Kerberoasting attack in the active directory environment.",
    technologies: ["Splunk,Windows Event Logs,Active Directory, Powerview"],
    link: "https://medium.com/@dyavanapellisujal7/detecting-kerberoasting-with-honeypot-and-splunk-d10dfc0c4dd5"
  },

  {
    title: "Detecting Password Spraying with Splunk",
    image: password_spray,
    description:
      "In this project I have demonstrated how password spraying works and how it can be detected using Splunk as a SIEM Solution. Demonstrated the lab in my own active directory environment. ",
    technologies:[ "Splunk,Active Directory , Windows Event Logs"],
    link: "https://medium.com/@dyavanapellisujal7/detecting-password-spraying-attacks-in-active-directory-environment-39e5088288f4"
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
    technologies: ["Active Directory"],
    link: "https://medium.com/@dyavanapellisujal7/securely-configure-shares-in-active-directory-group-based-access-control-and-permissions-5bd840fac05e"
  },
  

  {title: "Configuring Firewall rules using GPO's ",
    image: defendergpo,
    description:
      "Configuring firewall rules on end hosts can be exhausting when done manually on every device. However, there is an efficient way to configure these policies on devices within a domain using Active Directory services. The blog above explains how to configure firewall policies in an AD environment. This project demonstrates how to restrict domain users and devices from accessing websites based on the policies defined by the organization.",
    technologies: ["Windows Defenders, Group Policy Management , Active Directory"],
    link: "https://medium.com/@dyavanapellisujal7/configuring-firewall-policies-using-gpos-in-active-directory-f12a95632b51"
  },
    
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

