const Testimonial = () => {
  return (
    <div id="Testimonial" className="">
      <div className="bg-[#5300b7]  p-5 md:p-15">
        <div className="flex flex-col items-center justify-center gap-4 md:gap-2 mb-10 md:mb-15">
          <h2 className=" text-center md:text-start text-3xl text-white lg:text-4xl font-semibold head">
            Student Success Stories
          </h2>
          <p className="text-gray-300 text-center font-semibold text-lg lg:text-xl">
            Don't just take our word for it. Hear from those who've transformed
            their careers.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 md:flex-row">
          <div className="flex transition-transform duration-300 hover:scale-105 border border-white/10 flex-col gap-5 rounded-2xl md:rounded-4xl p-5 md:p-10 bg-white/10">
            <div className="flex items-center gap-3">
              <img
                src="/images/soft-6.png"
                alt=""
                className="w-12 border-purple-800 border  h-12 md:h-15 md:w-15 rounded-full"
              />
              <div>
                <p className="text-md font-bold text-white lg:text-lg">
                  Marcus Chen
                </p>
                <p className="text-gray-300 text-sm lg:text-md font-semibold">
                  Software Engineer at TechFlow
                </p>
              </div>
            </div>
            <p className="italic  text-gray-200 font-semibold tracking-wide leading-6 text-lg md:text-xl">
              "The Advanced Web Dev certification literally changed my life. I
              landed a senior role within 3 weeks of adding the certificate to
              my LinkedIn."
            </p>
          </div>

          <div className="flex transition-transform duration-300 hover:scale-105 flex-col border border-white/10 gap-5 rounded-4xl p-5 md:p-10 bg-white/10">
            <div className="flex items-center gap-3">
              <img
                src="/images/soft-4.png"
                alt=""
                className="w-12 border-purple-800 border  h-12 md:h-15 md:w-15 rounded-full"
              />
              <div>
                <p className="text-md font-bold text-white lg:text-lg">
                  Sarah Jenkins
                </p>
                <p className="text-gray-300 text-sm lg:text-md font-semibold">
                  Lead Analyst at Global Solutions
                </p>
              </div>
            </div>
            <p className="italic  text-gray-200 font-semibold tracking-wide leading-6 text-lg md:text-xl">
              "The quality of the instructors is unmatched. They don't just
              teach theory; they teach you how to apply it in complex business
              environments."
            </p>
          </div>

          <div className="flex transition-transform duration-300 hover:scale-105 flex-col border border-white/10 gap-5 rounded-4xl p-5 md:p-10 bg-white/10">
            <div className="flex items-center gap-3">
              <img
                src="/images/soft-5.png"
                alt=""
                className="w-12 border-purple-800 border  h-12 md:h-15 md:w-15 rounded-full"
              />
              <div>
                <p className="text-md font-bold text-white lg:text-lg">
                  David Rivera
                </p>
                <p className="text-gray-300 text-sm lg:text-md font-semibold">
                  Senior Project Manager
                </p>
              </div>
            </div>
            <p className="italic  text-gray-200 font-semibold tracking-wide leading-6 text-lg md:text-xl">
              "The assessment process was rigorous but fair. Earning my
              certification gave me the confidence to lead much larger
              international teams."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
