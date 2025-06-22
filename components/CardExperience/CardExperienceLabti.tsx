import React from 'react'
import { motion } from 'framer-motion'

type Props = {}

const CardExperienceLabti = (props: Props) => {
  return (
    <article className='flex flex-col rounded-lg items-center space-y-7 flex-shrink-0 w-[500px] md:w-[600px] xl:w-[900px] snap-center bg-[#292929] p-10 hover:opacity-100 opacity-40 cursor-pointer transition-opacity duration-200 overflow-hidden '>
      <motion.img
        initial={{
          y: -100,
          opacity: 0,
        }}
        transition={{ duration: 1.2 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className='w-32 h-32 rounded-full xl:w-[200px] xl:h-[200px] object-cover object-center '
        src='https://ik.imagekit.io/osw9g36vxc/logo-labti_uo3uqcX83.png?ik-sdk-version=javascript-1.4.3&updatedAt=1665206063551'
        alt=''
      />
      <div className='flex flex-col items-center px-0 md:px-10 md:block'>
        <h4 className='text-2xl md:text-4xl font-light'>
          Laboratory Assistant
        </h4>
        <p className='font-bold text-xl md:text-2xl mt-1'>Labti Gunadarma</p>
        <div className='flex space-x-2 my-2'>
          <img
            className='h-10 w-10 rounded-full'
            src='https://cdn-icons-png.flaticon.com/512/6132/6132222.png'
            alt=''
          />
          <img
            className='h-10 w-10 rounded-full object-cover'
            src='https://staruml.io/image/staruml_logo.png'
            alt=''
          />
          <img
            className='h-10 w-10 rounded-full'
            src='https://cdn-icons-png.flaticon.com/512/226/226777.png'
            alt=''
          />
        </div>
        <p className='uppercase py-5 text-gray-300'>March 2021 - March 2022</p>
        <ul className='list-disc space-y-4 ml-5 text-lg'>
          <li>
            Supporting lecture activities for students majoring in Informatics
            Engineering Gunadarma University.
          </li>
          <li>Correcting and Assessing student work during class.</li>
          <li>Work in a team to support the course of study.</li>
        </ul>
      </div>
    </article>
  )
}

export default CardExperienceLabti
