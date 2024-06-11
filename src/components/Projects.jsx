import { PROJECTS } from "../constants"
import { motion } from "framer-motion"

const Projects = () => {
  return (
    <div className="border-b border-neutral-900 pb-4 mx-20">
      <motion.h2 whileInView={ {opacity: 1 , y:0}} initial={{opacity: 0 , y: -100}} transition={{duration: 1}} className="my-20 text-center text-4xl">Projects/Blogs</motion.h2>
      <div className="container mx-auto">
        {PROJECTS.map((project, index) => (
          <div key={index} className="mb-8 lg:flex">
            <motion.div whileInView={ {opacity: 1 , x:0}} initial={{opacity: 0 , x: -100}} transition={{duration: 1}} className="w-full h-full lg:w-2/4 h-4/4 my-2">
              <img
                
                src={project.image}
                width={1000}
                height={1000}
                alt={project.title}
                className="mb-6 mx-auto lg:mx-0 rounded h-4/4  "
              />
            </motion.div>
            <motion.div whileInView={ {opacity: 1 , x:0}} initial={{opacity: 0 , x: 100}} transition={{duration: 1}} className="w-full lg:w-3/4 lg:pl-4 mx-4">
              <a href={project.link} target="_blank" rel="noopener noreferrer">
                <h6 className="mb-2 font-semibold text-white-600 underline">{project.title}</h6>
              </a>
              <p className="mb-4 text-neutral-400">{project.description}</p>
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Projects