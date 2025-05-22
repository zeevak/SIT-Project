import React from "react";
import { useState } from "react";
import { Carousel } from "@material-tailwind/react";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import { SlideLeft, SlideRight } from "../animation/direction";
import { SlideUp } from "../animation/direction";

const Home = () => {
  const [bd, setBd] = useState(false);

  const handleBg = () => {
    setBd(!bd);
  };                                                                                                                                        
  return (
    <>
      <div>
        <div></div>
        <div className="  relative flex items-center justify-center h-screen overflow-hidden">
          <video
            src="../src/assets/11641333-uhd_4096_2160_24fps (1).mp4"
            autoPlay
            loop                                                           
            muted                                                                       
            className="absolute w-auto min-w-full min-h-full object-cover shadow-2xl "
          ></video>

          <div className="z-10 text-center text-white px-4">
            <motion.h1
                 variants={SlideUp(0.1)}
                 initial="hidden"
                 whileInView={"visible"}
            className="text-3xl sm:text-4xl lg:text-7xl font-bold">
              National Fuel Pass
            </motion.h1>
            <motion.p 
                variants={SlideUp(0.3)}
                initial="hidden"
                whileInView={"visible"}
            className="mt-4 text-base sm:text-lg lg:text-xl">
              Enjoy the immersive experience
            </motion.p>
          </div>

          <div className="absolute bottom-10 text-center text-neutral-500 px-4">
            <div className="flex flex-wrap justify-center items-center space-x-3 text-xs sm:text-sm font-bold">
              <p className="text-red-700">CEYPETCO</p>
              <p>
                <span className="text-blue-800">LANKA</span>
                <span className="text-orange-500"> IOC</span>
              </p>
            </div>
            <div className="mt-2 text-xs sm:text-sm">
              <p>
                Copyright 2022 © Ceylon Petroleum Corporation – All Rights
                Reserved
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full bg-gradient-to-r from-slate-800 to-gray-800">
        <div className="container mx-auto px-4">
          <h1 className="text-center text-3xl sm:text-4xl lg:text-5xl text-white pt-20">
            Motive
          </h1>
          <div className="grid grid-cols-1 lg:grid-cols-2 mt-20 lg:mt-40 gap-10">
            <div className="flex flex-col items-start space-y-5">
              <motion.p 
                   variants={SlideUp(0.1)}
                   initial="hidden"
                   whileInView={"visible"}
              
              className="text-neutral-500 text-sm sm:text-base lg:text-base text-justify">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Obcaecati consectetur repellendus exercitationem maxime! Omnis,
                pariatur cum laborum neque expedita earum magnam voluptas
                debitis est nihil numquam eos quia provident tempora mollitia
                saepe explicabo sequi! Alias, nesciunt qui obcaecati voluptate
                nobis perspiciatis veritatis recusandae sunt accusantium
                corrupti rem reprehenderit natus. Amet! Lorem ipsum dolor sit,
                amet consectetur adipisicing elit. Nostrum, cumque et culpa id
                delectus rem iusto assumenda. Ipsa, ea ad ut id repellendus
                aliquam iusto. Corporis magnam asperiores repellat doloremque.
              </motion.p>
              <motion.button
                   variants={SlideUp(0.2)}
                   initial="hidden"
                   whileInView={"visible"}
              className="text-black bg-white font-semibold px-6 sm:px-10 py-2 hover:bg-black hover:text-white transition">
                View More
              </motion.button>
            </div>

            <motion.div 
               variants={SlideLeft(0.1)}
               initial="hidden"
               whileInView={"visible"}
            className="flex justify-center items-center">
              <img
                src="../src/assets/news4.png"
                alt=""
                className="rounded-2xl shadow-2xl w-full"
              />
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 mt-20 lg:mt-40 gap-10 pb-20">
            <motion.div
                variants={SlideRight(0.1)}
                initial="hidden"
                whileInView={"visible"}
            
            className="flex justify-center items-center">
              <img
                src="../src/assets/fuel5.png"
                alt=""
                className="rounded-2xl shadow-2xl w-full"
              />
            </motion.div>

            <div className="flex flex-col items-start space-y-5">
              <motion.p 
                 variants={SlideUp(0.1)}
                 initial="hidden"
                 whileInView={"visible"}
              className="text-neutral-500 text-sm sm:text-base lg:text-base text-justify">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Obcaecati consectetur repellendus exercitationem maxime! Omnis,
                pariatur cum laborum neque expedita earum magnam voluptas
                debitis est nihil numquam eos quia provident tempora mollitia
                saepe explicabo sequi! Alias, nesciunt qui obcaecati voluptate
                nobis perspiciatis veritatis recusandae sunt accusantium
                corrupti rem reprehenderit natus. Amet! Lorem ipsum dolor sit
                amet consectetur adipisicing elit. Quasi, repudiandae voluptates
                excepturi est voluptate ducimus quia molestiae dolorum earum
                quos, animi asperiores accusamus laborum! Temporibus deleniti
                quia voluptates doloribus nulla?
              </motion.p>
              <motion.button
                 variants={SlideUp(0.2)}
                 initial="hidden"
                 whileInView={"visible"}
              className="text-black bg-white font-semibold px-6 sm:px-10 py-2 hover:bg-black hover:text-white transition">
                View More
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="w-full h-screen">
          <div className="w-full relative h-full bg-[url('../src/assets/photo-1697575806262-c3553b142b54.avif')] bg-cover bg-center">
            <div className="absolute inset-0 bg-black bg-opacity-80">
              <div className="flex flex-col md:flex-row justify-between space-x-3 mt-32 container px-4">
                <div className="flex flex-col items-center w-full md:w-1/2 text-center">
                  <motion.h1
                       variants={SlideUp(0.1)}
                       initial="hidden"
                       whileInView={"visible"}
                  className="text-neutral-100 text-4xl sm:text-5xl md:text-7xl font-play font-semibold">
                    Ceylon Petroleum Corporation
                  </motion.h1>
                  <motion.span
                       variants={SlideUp(0.2)}
                       initial="hidden"
                       whileInView={"visible"}
                  className="bg-neutral-600 text-orange-500 mt-5 font-semibold py-2 px-6">
                    Since 1961
                  </motion.span>
                  <motion.p
                      variants={SlideUp(0.3)}
                      initial="hidden"
                      whileInView={"visible"}
                  className="text-justify px-4 sm:px-10 text-neutral-500 mt-10">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Delectus debitis quaerat sed iure architecto minima sint
                    impedit nam voluptatibus tenetur. Lorem ipsum dolor sit amet
                    consectetur adipisicing elit. Iste voluptas id repudiandae
                    aperiam laborum tempore eaque odio veniam impedit maiores ea
                    laudantium magni, earum architecto sequi. Sit minima quam
                    molestiae?
                  </motion.p>
                </div>
                <div className="w-full md:w-1/2 text-neutral-500 text-justify mt-8 md:mt-0 md:mb-80">
                  <motion.p
                       variants={SlideUp(0.3)}
                       initial="hidden"
                       whileInView={"visible"}
                  
                  >
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Voluptatem necessitatibus officiis exercitationem harum
                    dolorem itaque, reiciendis nisi. Soluta est explicabo
                    molestias aperiam quis, eaque sunt odio esse nulla veritatis
                    voluptas, inventore quia non architecto saepe nemo earum
                    sint dicta cumque praesentium voluptatum. Lorem ipsum, dolor
                    sit amet consectetur adipisicing elit. Ratione itaque,
                    voluptatum aspernatur modi obcaecati, aliquam perferendis
                    nesciunt assumenda deleniti, quis necessitatibus dolorum
                    eaque totam ab optio aliquid! Itaque at, in quos quam
                    quisquam amet pariatur harum officia deleniti excepturi sit!
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Et
                    ut delectus eveniet ullam harum odit ducimus eos voluptas,
                    consequatur omnis nesciunt laudantium quisquam
                    necessitatibus ipsam repellendus recusandae? Dolor voluptate
                    libero, neque sequi facere ad nisi doloremque eligendi?
                    Impedit magnam nihil cum, officiis, dolorem, nemo eius
                    recusandae placeat aspernatur eaque reiciendis.
                  </motion.p>
                  <motion.button
                      variants={SlideUp(0.5)}
                      initial="hidden"
                      whileInView={"visible"}
                  className="bg-neutral-600 px-6 py-2 text-orange-500 mt-5 font-semibold">
                    View More
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full transform -translate-y-20">
          <motion.div
               variants={SlideRight(0.1)}
               initial="hidden"
               whileInView={"visible"}
          className="mx-44 flex flex-col md:flex-row justify-center   bg-gradient-to-r from-slate-800 to-gray-800">
            <div className="rounded-xl w-full md:w-1/2 h-full mb-8 md:mb-0">
              <Carousel>
                <img
                  src="../src/assets/h1.jpg"
                  alt="image 1"
                  className="h-full w-full object-cover opacity-55"
                />
                <img
                  src="../src/assets/h2.jpg"
                  alt="image 2"
                  className="h-full w-full object-cover"
                />
              </Carousel>
            </div>

            <div className="w-full md:w-1/2 text-neutral-500 text-justify">
              <div className="relative">
                <div className="grid grid-cols-2 w-full absolute top-0">
                  <button
                    className={`py-2 px-4 font-semibold ${
                      bd ? "secondary-btn" : "third-btn"
                    } transition duration-300 ease-in-out transform`}
                    onClick={handleBg}
                  >
                    Vision
                  </button>
                  <button
                    className={`py-2 px-4 font-semibold ${
                      bd ? "third-btn" : "secondary-btn"
                    } transition duration-300 ease-in-out transform`}
                    onClick={handleBg}
                  >
                    Mission
                  </button>
                </div>
              </div>
              <div className="flex justify-center items-center w-full h-full p-5">
                {bd && (
                  <motion.p
                  variants={SlideUp(0.3)}
                  initial="hidden"
                  whileInView={"visible"}
                  >
                    To be a sustainable entity in the petroleum and related
                    industries; pioneer new opportunities and deliver value to
                    our stakeholders.
                  </motion.p>
                )}
                {!bd && (
                  <motion.p
                  variants={SlideUp(0.3)}
                  initial="hidden"
                  whileInView={"visible"}
                  >
                    <h1>
                      <span className="text-orange-400">Competitiveness</span> :
                      Strive to be a market leader by procuring and supplying
                      petroleum and related products at competitive prices.
                    </h1>
                    <h1>
                      <span className="text-orange-400">Sustainability</span> :
                      Be a financially, socially, and environmentally
                      sustainable business that places emphasis in long run
                      gains.
                    </h1>
                    <h1>
                      <span className="text-orange-400">
                        Continuous Improvement
                      </span>{" "}
                      : Drive growth through continuous improvement of process
                      and people. Always monitor the Corporation’s growth for
                      potential areas of improvement. Integrity :Integrity : Act
                      in a reliable manner ensuring the Corporation’s best
                      interest at all times.
                    </h1>
                    <h1>
                      <span className="text-orange-400">Public Focus</span> :
                      Aim to support the growth of the country.
                    </h1>
                  </motion.p>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Home;
