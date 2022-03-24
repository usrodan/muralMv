import { InformationCircleIcon } from '@heroicons/react/solid'
import {colors} from "@/configs/colors"
interface Props {
  texto: string;
  cor?: "slate" | "gray" | "zinc" | "neutral" | "stone" | "red" | "orange" | "amber" | "yellow" | "lime" | "green" | "emerald" | "teal" | "cyan" | "sky" | "blue" | "indigo" | "violet" | "purple" | "fuchsia" | "pink" | "rose";
}

const Info: React.FC<Props> = ({ texto, cor = "blue" }: Props,) => {
  return (
    <>
      <div className={`rounded-md font-semibold border border-${cor}-100  bg-${cor}-50 p-4`}>
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <InformationCircleIcon className={`h-5 w-5 text-${cor}-500 `} aria-hidden="true" />
          </div>
          <div className="ml-3 flex-1 md:flex md:justify-between">
            <p className={`text-sm text-${cor}-500`} dangerouslySetInnerHTML={{ __html: texto }} />
          </div>
        </div>

      </div>
   
    </>
  );
}

export default Info