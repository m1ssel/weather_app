import { MdArrowForwardIos } from 'react-icons/md';
import { IoRainy } from 'react-icons/io5';

const Slider = () => {
    return (
        <div className='flex items-center justify-between'>
            <div>
                <MdArrowForwardIos className='-scale-x-100' />
            </div>
            <div className='flex flex-col items-center'>
                <div className='uppercase'>Sun</div>
                <div>
                    <IoRainy className='w-[2rem] h-auto' />
                </div>
            </div>
            <div>
                <MdArrowForwardIos />
            </div>
        </div>
    );
};

export default Slider;
