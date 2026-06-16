import Navbar from "../../components/components/Navbar";
import Fotter from "../../components/components/Footer";
import LazySection from "../../components/components/LazySection";

// Sections
import Hero from "../../sections/Hero";
import Rating from "../../sections/Rating";
import Features from "../../sections/Features";
import HowItWork from "../../sections/HowItWork";
import Courses from "../../sections/Courses";
// i feel like there's no need for testimonial now maybe later sha
// import Testimonial from "../sections/Testimonal";
import FAQ from "../../sections/FAQ";
import CTA from "../../sections/CTA";

const sections = [
  { Component: Hero, lazy: false },
  { Component: Rating, lazy: false },
  { Component: Features, lazy: true },
  { Component: Courses, lazy: true },
  { Component: HowItWork, lazy: true },
  // { Component: Testimonial, lazy: true }, // Commented out for now to focus on core sections
  { Component: CTA, lazy: true },
  { Component: FAQ, lazy: true },
  { Component: Fotter, lazy: true },
];

const Home = () => {
  return (
    <div className="dark:bg-gray-900 bg-[#f9f1ff]">
      <Navbar />
      
      {sections.map(({ Component, lazy }, index) => (
        lazy ? (
          <LazySection key={index}>
            <Component />
          </LazySection>
        ) : (
          <Component key={index} />
        )
      ))}
    </div>
  );
};

export default Home;