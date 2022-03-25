import { InformationCircleIcon } from '@heroicons/react/solid'

interface Props {
  texto: string;
  cor?: "slate" | "gray" | "zinc" | "neutral" | "stone" | "red" | "orange" | "amber" | "yellow" | "lime" | "green" | "emerald" | "teal" | "cyan" | "sky" | "blue" | "indigo" | "violet" | "purple" | "fuchsia" | "pink" | "rose";
}

const Info: React.FC<Props> = ({ texto, cor = "blue" }: Props,) => {
  const options = ` 
  text-slate-100 border-slate-100 bg-slate-50 text-slate-500 
  text-gray-100 border-gray-100 bg-gray-50 text-gray-500
  text-zinc-100 border-rezincd-100 bg-zinc-50 text-rzinced-500
  text-neutral-100 border-neutral-100 bg-neutral-50 text-neutral-500
  text-stone-100 border-stone-100 bg-stone-50 text-stone-500
  text-red-100 border-red-100 bg-red-50 text-red-500 
  text-orange-100 border-orange-100 bg-orange-50 text-orange-500
  text-amber-100 border-amber-100 bg-amber-50 text-amber-500
  text-yellow-100 border-yellow-100 bg-yellow-50 text-yellow-500
  text-lime-100 border-lime-100 bg-lime-50 text-lime-500
  text-green-100 border-green-100 bg-green-50 text-green-500 
  text-emerald-100 border-emerald-100 bg-emerald-50 text-emerald-500
  text-teal-100 border-teal-100 bg-teal-50 text-teal-500
  text-cyan-100 border-cyan-100 bg-cyan-50 text-cyan-500
  text-sky-100 border-sky-100 bg-sky-50 text-sky-500
  text-blue-100 border-blue-100 bg-blue-50 text-blue-500
  text-indigo-100 border-indigo-100 bg-indigo-50 text-indigo-500
  text-violet-100 border-violet-100 bg-violet-50 text-violet-500
  text-purple-100 border-purple-100 bg-purple-50 text-purple-500
  text-fuchsia-100 border-fuchsia-100 bg-fuchsia-50 text-fuchsia-500
  text-pink-100 border-pink-100 bg-pink-50 text-pink-500
  text-rose-100 border-rose-100 bg-rose-50 text-rose-500
  `

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
      {false && <hr id="colorConfigsNotRendered" className={options} />}
    </>
  );
}

export default Info