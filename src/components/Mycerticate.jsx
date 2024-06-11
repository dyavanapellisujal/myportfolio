import { Certifications } from '../constants';
import { motion } from 'framer-motion';
const Mycertificate = () => {
  return (
    <div className="border-b border-neutral-900 pb-4 mx-4 lg:mx-20">
      <motion.h2  whileInView={ {opacity: 1 , y:0}} initial={{opacity: 0 , y: -100}} transition={{duration: 1}}className="my-20 text-center text-4xl">Certificates</motion.h2>
      <div className="container mx-auto">
        {Certifications.map((project, index) => (
          <div key={index} className="mb-8 lg:flex">
            <motion.div whileInView={ {opacity: 1 , x:0}} initial={{opacity: 0 , x: -100}} transition={{duration: 1}} className="w-full h-full lg:w-2/4 h-4/4">
              <img
                src={project.image}
                alt={project.title}
                width={400}
                height={220}
                className="mb-6 w-full h-auto lg:max-w-xs rounded-lg"
              />
            </motion.div>
            <motion.div whileInView={ {opacity: 1 , x:0}} initial={{opacity: 0 , x: 100}} transition={{duration: 1}} className="w-full lg:w-3/4 lg:pl-4 mx-2 flex flex-col justify-center">
            <a href={project.link} target="_blank" rel="noopener noreferrer"> <h6 className="mb-2 font-semibold underline">{project.title}</h6>
              <p className="mb-4 text-neutral-400 ">{project.description}</p>
              </a>
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Mycertificate;
