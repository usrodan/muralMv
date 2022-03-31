import Image from "next/image"
import slugify from "@/utils/slugify";
import { timezoneBrazil } from "@/utils/timezoneBrazil";

interface CardJobProps {
  image: string;
  title: string;
  city: string;
  date: string;
  type: string;
  id: string;
  color?: string;
}

const CardJob: React.FC<CardJobProps> = ({ image, title, city, date, type, color = "blue", id }) => {
  let formatedData = timezoneBrazil(date)
  
  return (
    <a href={`/${id}-${slugify(title)}`} className="flex  hover:-mt-2 transition-all duration-500 ease-in-out	 border border-gray-200 h-96 lg:h-80 xl:h-96 font-bold flex-col  rounded-lg bg-white">
      <Image className="rounded-t-lg object-cover hover:opacity-80  " alt={title} width={350} height={400} src={image || "http://placehold.jp/ffffff/ffffff/256x310.png?text=%20"} />
      <div className="w-full flex text-sm flex-col p-2">
        <span className="text-primary uppercase">{title}</span>
        <div className="flex uppercase justify-between w-full">
          <span>{city.replace("1. ", "").replace("2. ", "")}<br />
            <span className="text-xs text-gray-500">{formatedData}</span>
          </span>
          <div><span className={`inline-flex   uppercase items-center px-2 py-1 rounded-full font-medium bg-${color}-100 text-${color}-800`}>{type}</span></div>
        </div>
      </div>
    </a>
  )
}

export default CardJob