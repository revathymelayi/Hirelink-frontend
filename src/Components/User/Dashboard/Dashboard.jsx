import JobsList from "../Jobs/JobsList"
export default function Index() {

  return (
    <div className>
      <div className="flex mt-6 justify-end items-center">
        <img
          className="object-cover md:hidden  w-full h-60"
          src=""
          alt="background"
        />
        <img
          className="hidden md:block object-cover  w-full h-56 lg:h-52"
          src="/images/yes.jpeg"
          alt="background"
        />
      </div>
      <div className="mt-10 mb-4 sm:mb-0 md:mb-0 lg:mb-0 xl:mb-0 lg:w-1/2">
        <h2 className="text-blue-800 dark:text-gray-100 text-xl  font-bold">
          Jobs Hiring Now
        </h2>
        <p className="font-normal text-sm text-gray-600 dark:text-gray-400 mt-1">
        Explore endless opportunities and learn alongside talented professionals in Hirelink.
        </p>
      </div>
         <JobsList/>
        
     
    </div>
  );
}
