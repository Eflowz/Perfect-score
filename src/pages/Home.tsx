import Fotter from "../components/components/Footer";
import LazySection from "../components/components/LazySection";
import Navbar from "../components/components/Navbar";
import Courses from "../sections/Courses";
import CTA from "../sections/CTA";
import FAQ from "../sections/FAQ";
import Features from "../sections/Features";
import Hero from "../sections/Hero";
import HowItWork from "../sections/HowItWork";
import Rating from "../sections/Rating";
import Testimonial from "../sections/Testimonal";

const Home = () => {
    return (<div className="dark:bg-[#060e20] ">
        <Navbar />
     
            <Hero />
      
           <Rating /> 
        
        <LazySection>
            <Features />
        </LazySection>
        <LazySection>
             <HowItWork />
        </LazySection>
        <LazySection>
            <Courses />
        </LazySection>
        <LazySection>
            <Testimonial />
        </LazySection>
         <LazySection>
<FAQ />
         </LazySection>
   <LazySection>
 <CTA />
         </LazySection>
         <LazySection>
<Fotter />
         </LazySection>
   
    
    
    
    
   
    
    </div>  );
}
export default Home;