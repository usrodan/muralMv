import { InformationCircleIcon } from '@heroicons/react/solid'

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
      {false && <>
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
          Badge
        </span>
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
          Badge
        </span>
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
          Badge
        </span>
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
          Badge
        </span>
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          Badge
        </span>
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
          Badge
        </span>
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
          Badge
        </span>
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-pink-100 text-pink-800">
          Badge
        </span>
      </>}
    </>
  );
}

export default Info