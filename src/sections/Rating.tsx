import { useEffect, useRef, useState } from "react";

const Rating = () => {
  const [counts, setCounts] = useState({
    learners: 0,
    courses: 0,
    certs: 0,
    passRate: 0,
  });

  const sectionRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          animateNumbers();
        }
      },
      {
        threshold: 0.3,
        rootMargin: "0px 0px -100px 0px",
      },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const animateNumbers = () => {
    const targetValues = {
      learners: 2000,
      courses: 50,
      certs: 3000,
      passRate: 98,
    };

    const duration = 2000;
    const stepTime = 20;
    const steps = duration / stepTime;

    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;

      if (currentStep >= steps) {
        setCounts({
          learners: targetValues.learners,
          courses: targetValues.courses,
          certs: targetValues.certs,
          passRate: targetValues.passRate,
        });
        clearInterval(interval);
        return;
      }

      const progress = currentStep / steps;
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);

      setCounts({
        learners: Math.floor(targetValues.learners * easeOutQuart),
        courses: Math.floor(targetValues.courses * easeOutQuart),
        certs: Math.floor(targetValues.certs * easeOutQuart),
        passRate: Math.floor(targetValues.passRate * easeOutQuart),
      });
    }, stepTime);
  };

  // Modified helper slightly to safely format everything explicitly based on suffix rules
  const formatNumber = (num: number, isPercent: boolean = false): string => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K+";
    }
    return num + (isPercent ? "%" : "+");
  };

  return (
    <div ref={sectionRef}>
      <div className="max-w-7xl mx-auto py-10 bg-transparent">
        <div className="grid grid-cols-3 gap-5 py-6 md:grid-cols-3 px-8 md:py-12">
          <div className="text-center flex flex-col gap-2">
            <p className="text-[#16423C] dark:text-[#C2FFC1] text-center font-bold text-4xl md:text-5xl">
              {formatNumber(counts.learners)}
            </p>
            <p className="text-[#4a4455] dark:text-[#cac4cf] text-center font-semibold md:text-lg">
              Active Learners
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-[#16423C] dark:text-[#C2FFC1] text-center font-bold text-4xl md:text-5xl">
              {formatNumber(counts.courses)}
            </p>
            <p className="text-[#4a4455] dark:text-[#cac4cf] text-center font-semibold md:text-lg">
              Expert Courses
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-[#16423C] dark:text-[#C2FFC1] text-center font-bold text-4xl md:text-5xl">
              {formatNumber(counts.certs)}
            </p>
            <p className="text-[#4a4455] dark:text-[#cac4cf] text-center font-semibold md:text-lg">
              Certs Issued
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rating;
