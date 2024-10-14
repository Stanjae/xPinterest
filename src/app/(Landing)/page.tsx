
import Image from 'next/image'
import CarouselPage from '../Ui/landingPages/CarouselPage'
import DefaultPage from '../Ui/landingPages/DefaultPage'
import LeftImage from '../../../public/left.png'
import TopRightImage from '../../../public/topRight.png'
import BottomImage from '../../../public/right-2.png'
import CenterImage from '../../../public/center.png'
import {Button } from '@nextui-org/react'
import PromoImg from '../../../public/creator-pin-img-3bed5463.png'
import AvatarImg from '../../../public/creator-avatar-262dfeba.png'
import FifthSection from '../Ui/landingPages/FifthSection'
import dayjs from 'dayjs'
import Link from 'next/link'



const view = dayjs().date() % 2

export default async function LandingPage() {
    
    return (
        <div className=' overflow-hidden'>
           {view == 1 ? <DefaultPage/> : <CarouselPage/> }

           {/* 2nd section */}
           <section className='bg-secondary-900 h-dvh py-10 px:5 md:p-10'>
                <div>
                    <div className=' h-80 w-80  p-4 relative'>
                        <Image src={LeftImage} className='absolute inset-y-1/3 h-36 w-24 left-1/5' 
                        width={500} height={500} alt='left'/> 
                        <Image src={TopRightImage} className='absolute inset-y-1/6 h-28 w-20 left-52' 
                        width={500} height={500} alt='top'/> 
                         <Image src={BottomImage} className='absolute bottom-3 h-32 w-20 right-10' 
                        width={500} height={500} alt='bottom'/> 
                        <Image src={CenterImage} className='absolute h-56 w-36 top-12 left-1/4' 
                        width={500} height={500} alt='center'/>
                    </div>
                </div>
                <div className=' max-w-lg my-7 space-y-4 text-center mx-auto'>
                    <h2 className='text-primary-400 text-3xl font-bold'>Discover Our Unique Offerings</h2>
                    <p className='text-primary-400'>
                        LWhat do you want to try next? Think of something you &apos; re into—like
                         “easy chicken dinner”—and see what you find.
                    </p>
                    <Button as={Link} href='/explore' variant='solid' color="primary" radius='full'>Get Started</Button>
                </div>
           </section>

           {/* third section */}
           <section className='bg-[#DAFFF6] p-10'>
                <div className=' mx-auto max-w-md'>
                    <div className=' h-96  p-4 relative'>
                        <div className=' bg-section3-img1 flex items-center p-4 text-background bg-blend-overlay bg-foreground absolute w-48 h-52 rounded-3xl'>
                            <div className=' text-2xl font-semibold'>
                                Food Vibes<br/>
                                Fern Future
                            </div>
                        </div> 

                        <div className=' right-2 top-2 bg-section3-img2 flex items-end p-4 text-background bg-blend-overlay bg-foreground absolute w-28 h-28 rounded-3xl'>
                            <div className=' text-xs font-medium'>
                                My Scandanavian Bedroom
                            </div>
                        </div> 

                        <div className=' right-10 top-1/3 bg-section3-img3 flex items-center p-3 text-background bg-blend-overlay bg-foreground absolute w-24 h-24 rounded-3xl'>
                            <div className=' text-xs font-medium'>
                            The deck of my Dreams
                            </div>
                        </div> 

                        <div className=' right-12 bottom-1 bg-section3-img4 flex items-end p-4 text-background bg-blend-overlay bg-foreground absolute w-28 h-28 rounded-3xl'>
                            <div className=' text-xs font-medium'>
                                Our Bedroom Upgrade
                            </div>
                        </div> 

                        <div className=' left-[35%] top-[60%] bg-section3-img5 flex items-end p-4 text-background bg-blend-overlay bg-foreground absolute w-24 h-24 rounded-3xl'>
                            <div className=' text-xs font-medium'>
                                Serve my drinks in style
                            </div>
                        </div> 
                    </div>

                    <div className=' text-[#006B6C] my-5 space-y-5 text-center mx-auto'>
                        <h2 className=' text-3xl font-bold'>Save ideas you like</h2>
                        <p className=''>
                        Collect your favorites so you can get back to them later.
                        </p>
                        <Button variant='solid' color="primary" radius='full'>Learn More</Button>
                    </div>
                </div>    
           </section>

           {/* 4th section */}
           <section className=' border-y-2 border-y-[#7FB3F5] min-h-dvh '>
                <div className=' p-10 flex items-end section4-bg h-3/5'>
                    <div className='  w-52 relative'>
                        <Image className=' w-3/4 h-60' src={PromoImg} width={150} height={200} alt="promo-img"/>
                        <Image src={AvatarImg} className={' h-12 w-12 rounded-full absolute top-3/4 -left-5'} alt='avatar'/>
                        <div className=' text-white py-1 pr-3 text-right'>
                            <p>Scout the City</p>
                            <p className="text-sm">117.k Followers</p>
                        </div>
                    </div>
                </div>
                <div className=" h-2/5 p-3 bg-slate-100">
                    <div className=' max-w-lg md:px-0 px-5 my-7 space-y-4 text-center mx-auto'>
                        <h2 className='text-primary-700 text-3xl font-bold'>Discover Our Unique Offerings</h2>
                        <p className='text-primary-700'>
                            What do you want to try next? Think of something you &apos; re into—like
                            “easy chicken dinner”—and see what you find.
                        </p>
                        <Button variant='solid' color="primary" radius='full'>Learn More</Button>
                    </div>
                </div>
           </section>

           {/* fifth section */}
           <FifthSection/>
        </div>
    )
}