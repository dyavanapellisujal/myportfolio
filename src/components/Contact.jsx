import { CONTACT } from "../constants";
import { motion } from "framer-motion";

const Contact = () => {
  return (
    <motion.div 
      whileInView={{ opacity: 1, y: 0 }} 
      initial={{ opacity: 0, y: -100 }} 
      transition={{ duration: 1 }} 
      className="border-b border-neutral-900 pb-20"
    >
      <h2 className="my-10 text-center text-4xl">Get in Touch</h2>
      <div className="text-center tracking-tighter">
       <a href="https://medium.com/@dyavanapellisujal7" target="_blank"> <p className="my-4 underline">{CONTACT.medium}</p></a>
       <a href="https://www.linkedin.com/in/dyavanapelli-sujal-409766249/ " target="_blank" > <p className="my-4 underline">{CONTACT.linkedin}</p> </a>
       
        <a href="mailto:dyavanpellisujal7@gmail.com" className="border-b">{CONTACT.email}</a>
      </div>
    </motion.div>
  );
};

export default Contact;
