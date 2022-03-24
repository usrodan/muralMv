import PageHeader from '@/components/pageHeader';
import PageFooter from '@/components/pageFooter';
import PoliticaDePrivacidade from '@/components/PoliticaDePrivacidade'
import { ToastContainer } from 'react-toastify'; 
export default function Layout(props) {

  return (
    <div className="flex flex-col bg-gray-50 text-gray-800 w-full  items-center  min-h-screen"> 
      <PoliticaDePrivacidade />
      <PageHeader /> 
      <section className="flex  border-t border-gray-300 relative z-10 w-full flex-col mt-0 mx-auto ">
        {props.children}
      </section>
      <PageFooter />
      <ToastContainer />
    </div >
  );
}
