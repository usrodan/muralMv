import { InformationCircleIcon } from '@heroicons/react/solid'
export default function Info(props) {

  return (
    
     <div className="rounded-md font-semibold border border-blue-100  bg-blue-50 p-4">
     <div className="flex items-center">
       <div className="flex-shrink-0">
         <InformationCircleIcon className="h-5 w-5 text-blue-500" aria-hidden="true" />
       </div>
       <div className="ml-3 flex-1 md:flex md:justify-between">
         <p className="text-sm text-blue-500"> {props.children}</p>
          
       </div>
     </div>
   </div>
  );
}
