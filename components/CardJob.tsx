/* This example requires Tailwind CSS v2.0+ */
import Image from "next/image"
import {format} from 'date-fns'
interface CardJobProps {
  image: string;
  title: string;
  city: string;
  date: string;
  type: string;
  id: string;
  
}

const CardJob: React.FC<CardJobProps> = ({ image, title, city, date, type,id }) => {
const formatedData = format(new Date(date || '2022-03-03T10:00:38.765Z' ),"dd/MM/yyy")
  return (
    <a href={`/${id}`} className="flex  h-72 border border-gray-200 lg:h-80 xl:h-96 font-bold flex-col  rounded-lg bg-white">
      <Image className="rounded-t-lg object-cover" width={256} height={310} src={image || "http://placehold.jp/ffffff/ffffff/256x310.png?text=%20" } />
      <div className="w-full flex text-sm flex-col p-2">
        <span className="text-primary">{title}</span>
        <div className="flex justify-between w-full">
          <span>{city} • {formatedData}</span>
          <span>{type}</span>
        </div>
      </div>
    </a>

  )
}

export default CardJob