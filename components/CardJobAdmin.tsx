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

const CardJobAdmin: React.FC<CardJobProps> = ({ image, title, city, date, type, color = "blue", id }) => {
  let formatedData = timezoneBrazil(date)

  return (<>
 
    {/* MOBILE */}
    <a href={`/${id}-${slugify(title)}`} className="grid grid-cols-3 md:grid-cols-6 focus:border-gray-300  transition-all duration-500 ease-in-out	 border border-gray-200     font-bold  rounded-lg bg-white">
      <Image className="rounded-l-lg object-cover hover:opacity-80  " alt={title} width={200} height={200} src={image || "http://placehold.jp/ffffff/ffffff/256x310.png?text=%20"} />
      <div className="w-full justify-between flex text-sm md:text-lg flex-col col-span-2 md:col-span-5 p-3">
        <span className="text-primary uppercase">{title}</span>
        <div className="flex uppercase justify-between items-end w-full">
          <span className="text-xs  md:text-sm ">{city.replace("1. ", "").replace("2. ", "")}<br />
            <span className="text-xs   md:text-sm text-gray-500">{formatedData}</span>
          </span>
          <div><span className={`inline-flex text-xs  md:text-sm uppercase items-center px-3 py-1 rounded-lg  bg-${color}-100 text-${color}-800`}>{type}</span></div>
        </div>
      </div>
    </a>
  </>
  )
}

export default CardJobAdmin