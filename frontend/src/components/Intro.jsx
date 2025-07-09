import React from 'react'
import IntroPic from '../assets/intro-pic.jpg'
import Fluffy_pic from '../assets/intro-fluffy.jpg'
import Lap_pic from '../assets/intro-lap.jpg'
import Meal_pic from '../assets/intro-meal.jpg'
import Empathy_pic from '../assets/intro-empathy.jpg'

const Intro = () => {
  return (
    <div>
      <div className='flex flex-col pt-[5%] '>
        <h1 className='text-center font-content text-2xl md:text-3xl'>
          Who is Senko?
        </h1>
        <div className='flex items-center bg-amber-200 mx-5 my-8 rounded-4xl shadow-xs'>
          <img src={IntroPic} alt="Senko-pic" 
          className='w-30 md:w-40 rounded-full m-10' />
          <p className='font-content'>
          Senko-san is an 800-year-old fox spirit who brings peace, warmth, and a bit of fluff into the lives of overworked humans with her gentle care and timeless charm.
          </p>
        </div>
      </div>
      <div>
        <div>
          <h1 className='text-center font-content text-2xl md:text-3xl p-10'>
            Why you need Senko at home?
          </h1>
          <ul className='grid md:grid-cols-2 grid-cols-1 gap-15 font-content mx-2'>
            <li>
              <div className='flex flex-col gap-5 items-center text-center'>
                <img src={Lap_pic} alt="Senko's lap" className='w-70' />
                <h1 className='text-xl font-bold'>
                  Therapeutic Head Pats
                </h1>
                <p>
                Nothing melts stress faster than gentle pats from a divine kitsune. Close your eyes... feel her hand on your head... all worries—gone~
                </p>
              </div>
            </li>
            <li>
              <div className='flex flex-col gap-5 items-center text-center'>
                <img src={Fluffy_pic} alt="Senko's tail" className='w-70' />
                <h1 className='text-xl font-bold'>
                  A Tail That Cures Burnout
                </h1>
                <p>
                  Her tail is not just fluffy—it's legendary! One snuggle and your fatigue poofs away like magic. Warning: side effects may include squealing and face-diving into fluff! 
                </p>
              </div>
            </li>
            <li>
              <div className='flex flex-col gap-5 items-center text-center'>
                <img src={Meal_pic} alt="Senko's meal" className='w-70' />
                <h1 className='text-xl font-bold'>
                  Warm Meals, Warmer Heart
                </h1>
                <p>
                  Senko-san always has dinner ready. Steaming rice, miso soup, and the comforting hum of someone who cares. No more lonely nights~
                </p>
              </div>
            </li>
            <li>
              <div className='flex flex-col gap-5 items-center text-center'>
                <img src={Empathy_pic} alt="Senko's empathy" className='w-70' />
                <h1 className='text-xl font-bold'>
                  She Loves You Just the Way You Are
                </h1>
                <p>
                  No achievements needed. No perfection expected. Just come home—and be loved, unconditionally, eternally. Because to Senko-san, you’re already enough
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    
  )
}

export default Intro