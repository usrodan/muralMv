import PageHeader from '@/components/pageHeader';
import PageFooter from '@/components/pageFooter';
import PoliticaDePrivacidade from '@/components/PoliticaDePrivacidade'
import { ToastContainer } from 'react-toastify'; 
export default function Layout(props) {

  return (
    <div className="flex flex-col bg-gray-50 text-gray-800 w-full  items-center  min-h-screen"> 
      <PoliticaDePrivacidade />
      <PageHeader />
      <section className="flex w-full flex-col  mx-auto ">
        {props.children}
      </section>
      <PageFooter />
      <ToastContainer />
    </div >
  );
}
