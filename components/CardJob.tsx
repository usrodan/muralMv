/* This example requires Tailwind CSS v2.0+ */
import Image from "next/image"
import { format } from 'date-fns'
import { zonedTimeToUtc } from 'date-fns-tz';
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
  const znDate = zonedTimeToUtc(date || '2022-03-03T10:00:38.765Z', 'America/Sao_Paulo');
  const formatedData = format(znDate, "dd/MM/yyy")

  function string_to_slug(str, separator) {
    str = str.trim();
    str = str.toLowerCase();

    // remove accents, swap ñ for n, etc
    const from = "åàáãäâèéëêìíïîòóöôùúüûñç·/_,:;";
    const to = "aaaaaaeeeeiiiioooouuuunc------";

    for (let i = 0, l = from.length; i < l; i++) {
      str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
    }

    return str
      .replace(/[^a-z0-9 -]/g, "") // remove invalid chars
      .replace(/\s+/g, "-") // collapse whitespace and replace by -
      .replace(/-+/g, "-") // collapse dashes
      .replace(/^-+/, "") // trim - from start of text
      .replace(/-+$/, "") // trim - from end of text
      .replace(/-/g, separator);
  }


  return (
    <a href={`/${id}-${string_to_slug(title, "-")}`} className="flex  hover:-mt-2 transition-all duration-500 ease-in-out	 border border-gray-200 h-96 lg:h-80 xl:h-96 font-bold flex-col  rounded-lg bg-white">
      <Image className="rounded-t-lg object-cover hover:opacity-80  " alt={title} width={256} height={310} src={image || "http://placehold.jp/ffffff/ffffff/256x310.png?text=%20"} />
      <div className="w-full flex text-sm flex-col p-2">
        <span className="text-primary uppercase">{title}</span>
        <div className="flex uppercase justify-between w-full">
          <span>{city}<br />
            <span className="text-xs text-gray-500">{formatedData}</span>
          </span>
          <div><span className={`inline-flex   uppercase items-center px-2 py-1 rounded-full font-medium bg-${color}-100 text-${color}-800`}>{type}</span></div>
        </div>
      </div>
    </a>

  )
}

export default CardJob