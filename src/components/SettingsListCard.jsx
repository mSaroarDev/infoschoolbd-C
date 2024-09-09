
import { Link } from 'react-router-dom';

export default function SettingsListCard({icon, text, link}) {

  return (
    <>
        <Link to={link} className="bg-lightBg/50 border-l-[3px] border-blue-600 p-2 hover:ml-1 transition-all duration-300 flex items-center gap-2">
            <div>
                <div className='bg-blue-600/10 text-black flex items-center justify-center rounded-full p-2'>
                    {icon}
                </div>
            </div>
            <div>
                <h3 className='font-bold'>{text}</h3>
            </div>
        </Link>
    </>
  )
}