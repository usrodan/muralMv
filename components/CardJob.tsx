/* This example requires Tailwind CSS v2.0+ */
import Image from "next/image"
import { format } from 'date-fns'
interface CardJobProps {
  image: string;
  title: string;
  city: string;
  date: string;
  type: string;
  id: string;

}

const CardJob: React.FC<CardJobProps> = ({ image, title, city, date, type, id }) => {
  const formatedData = format(new Date(date || '2022-03-03T10:00:38.765Z'), "dd/MM/yyy")

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
    <a href={`/${id}-${string_to_slug(title, "-")}`} className="flex  h-72 border border-gray-200 lg:h-80 xl:h-96 font-bold flex-col  rounded-lg bg-white">
      <Image className="rounded-t-lg object-cover" alt={title} width={256} height={310} src={image || "http://placehold.jp/ffffff/ffffff/256x310.png?text=%20"} />
      <div className="w-full flex text-sm flex-col p-2">
        <span className="text-primary uppercase">{title}</span>
        <div className="flex uppercase justify-between w-full">
          <span>{city}<br />
            <span className="text-xs text-gray-500">{formatedData}</span></span>
          <span >{type}</span>
        </div>
      </div>
    </a>

  )
}

export default CardJob