/* This example requires Tailwind CSS v2.0+ */
import Image from "next/image"
import {format} from 'date-fns'
interface CardJobProps {
  image: string;
  title: string;
  city: string;
  date: string;
  type: string;
  
}

const CardJob: React.FC<CardJobProps> = ({ image, title, city, date, type }) => {
const formatedData = format(new Date(date),"dd/MM/yyy")
  return (
    <div className="flex   h-96 font-bold flex-col  rounded-lg bg-white">
      <Image className="rounded-t-lg object-cover" width={256} height={310} src={image} />
      <div className="w-full flex text-sm flex-col p-2">
        <span className="text-primary">{title}</span>
        <div className="flex justify-between w-full">
          <span>{city} • {formatedData}</span>
          <span>{type}</span>
        </div>
      </div>
    </div>

  )
}

export default CardJob