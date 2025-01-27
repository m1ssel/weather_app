import Navbar from '@/components/navbar';
import Slider from '@/components/slider';
import { IoPartlySunny } from 'react-icons/io5';
import { FaLocationDot } from 'react-icons/fa6';
import { FaThermometerEmpty } from 'react-icons/fa';
import { RiWindyFill } from 'react-icons/ri';
import { FaDroplet } from 'react-icons/fa6';
import { MdWbSunny } from 'react-icons/md';

// https://api.openweathermap.org/data/2.5/forecast?q=moscow&appid=a2d2dfc953421323710b2fe4d06d7b43&cnt=56
export default function Home() {
    const options: Intl.DateTimeFormatOptions = {
        timeZone: 'GMT',
        timeZoneName: 'shortGeneric',
        hour: '2-digit',
        minute: '2-digit',
    };
    const time = new Date().toLocaleTimeString('en-US', options);
    const anotherOptions: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    };
    const currentDate = new Date().toLocaleDateString('en-US', anotherOptions);
    const formattedDate = currentDate.replace(',', ' |');
    return (
        <div className='flex flex-col gap-4 bg-primary_s min-h-screen text-white'>
            <Navbar />
            <main>
                <section className='flex justify-between'>
                    <div className='ml-[10rem] rounded-lg my-4'>
                        <div className='flex items-center gap-2 mb-[2rem] bg-secondary_s rounded-lg py-4 px-7'>
                            <FaLocationDot className='scale-125' />
                            <h3 className='text-xl'>New York</h3>
                        </div>
                        <div className='bg-secondary_s rounded-lg py-4 px-7'>
                            <h1 className='text-3xl mb-[1rem]'>Cloudy</h1>
                            <h2 className='text-3xl'>26°C</h2>
                            <p>{formattedDate}</p>
                        </div>
                    </div>
                    <div className='mr-[10rem]'>
                        <IoPartlySunny className='w-[15rem] h-auto' />
                    </div>
                </section>
                <section className='flex justify-between mt-[2rem]'>
                    <div className='bg-secondary_s w-[68rem] h-[30rem] ml-[10rem] rounded-lg py-4 px-7'>
                        asd
                    </div>
                    <div className='bg-secondary_s w-[30rem] mr-[10rem] rounded-lg py-4 px-7'>
                        <div className='mb-[1rem]'>
                            <Slider />
                        </div>
                        <div className='flex justify-center mb-[1rem]'>
                            {time}
                        </div>
                        <div className='flex flex-col items-start gap-[1rem]'>
                            <h4 className='uppercase'>Air Conditions</h4>
                            <div className='flex gap-2'>
                                <FaThermometerEmpty className='w-[2rem] h-[2rem]' />
                                <div className='flex flex-col'>
                                    <p>Real Feel</p>
                                    <p>30°</p>
                                </div>
                            </div>
                            <div className='flex gap-2'>
                                <RiWindyFill className='w-[2rem] h-[2rem]' />
                                <div className='flex flex-col'>
                                    <p>Wind</p>
                                    <p>0.8 km/hr</p>
                                </div>
                            </div>
                            <div className='flex gap-2'>
                                <FaDroplet className='w-[2rem] h-[2rem]' />
                                <div className='flex flex-col'>
                                    <p>Chance of rain</p>
                                    <p>2%</p>
                                </div>
                            </div>
                            <div className='flex gap-2'>
                                <MdWbSunny className='w-[2rem] h-[2rem]' />
                                <div className='flex flex-col'>
                                    <p>UV Index</p>
                                    <p>4</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
