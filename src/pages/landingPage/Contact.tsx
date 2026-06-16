import { MdOutlineArrowBack, MdOutlineCall, MdOutlineMailOutline } from "react-icons/md";
import { Input } from "../../components/common/Input";
import { Button } from "../../components/common/Button";
import { Link } from "react-router-dom";
const Contact = () => {
  return (
    <section className="mx-5 md:mx-20 my-10">
        <Link to="/" className="flex items-center text-sm mb-10">
            <p>Back</p>
            <MdOutlineArrowBack  className="text-xl"/>
        </Link>
      <div className="flex justify-center">
        <div className="w-full max-w-5xl bg-[#16423C] border border-gray-200 rounded-3xl overflow-hidden flex flex-col md:flex-row">

          {/* Left Contact Information */}
          <div className="w-full bg-[#16423C] px-10 py-10 flex flex-col justify-center">
            <div className="mb-10">
              <h1 className="text-white md:text-4xl text-2xl font-semibold mb-3">
                Get in Touch
              </h1>

              <p className="text-gray-300 leading-relaxed">
                Have questions? Our team is here to help you on your learning
                journey. Whether you are a student, educator, or enterprise
                partner, we are ready to assist.
              </p>
            </div>

            <div className="flex flex-col gap-5">

              {/* Email */}
              <div className="flex items-center gap-3">
                <div className="bg-white w-12 h-12 flex items-center justify-center rounded-full shadow-md hover:bg-[#3ab3a2] transition-all">
                  <MdOutlineMailOutline className="text-[#16423C] text-xl hover:text-white" />
                </div>

                <p className="text-gray-200 break-all">
                  perfectscore23@gmail.com
                </p>
              </div>


              {/* Phone */}
              <div className="flex items-center gap-3">
                <div className="bg-white w-12 h-12 flex items-center justify-center rounded-full shadow-md hover:bg-[#3ab3a2] transition-all">
                  <MdOutlineCall className="text-[#16423C] text-xl hover:text-white" />
                </div>

                <p className="text-gray-200">
                  +234 800 000 0000
                </p>
              </div>

            </div>
          </div>


          {/* Form Section */}
          <div className="w-full bg-white p-8 md:p-10 flex flex-col gap-5 md:rounded-tl-xl md:rounded-bl-3xl">

            <div className="flex flex-col gap-5">
              <Input
                label="Full Name"
                type="text"
                placeholder="John Doe"
              />

              <Input
                label="Email"
                type="email"
                placeholder="Enter your email"
              />
            </div>


            <Input
              label="Subject"
              type="text"
              placeholder="Subject"
            />


            <div>
              <label className="font-semibold">
                Message
              </label>

              <textarea
                className="
                  w-full 
                  h-32
                  mt-2
                  border 
                  border-gray-200
                  bg-gray-50
                  rounded-2xl
                  px-6
                  py-4
                  text-[#1d1a24]
                  placeholder:text-[#7b7486]
                  focus:ring-1
                  focus:ring-[#16423C]
                  outline-none
                  transition-all
                  text-md
                  md:text-lg
                  resize-none
                "
              />
            </div>


            <Button text="Contact Us" />

          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;