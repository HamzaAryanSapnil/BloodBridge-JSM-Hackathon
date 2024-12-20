import "@/app/globals.css";
const layout = ({ children }) => {
  return (
    <div className="min-h-screen w-full  flex justify-center items-center flex-col gap-y-20 ">
      
      <div className="  w-full   flex justify-around items-center xl:flex-row flex-col  container mx-auto ">
        <div className="xl:flex justify-center items-center  h-full hidden bg-yellow-400">
          <img
            src={"/bloodBridge-loginbgRemoved.png"}
            className="w-full h-full border-none "
            alt=""
          />
        </div>
        <div className=" w-full flex justify-center items-center xl:items-center  flex-col pl-10">
          {children}
        </div>
      </div>
    </div>
  );
};

export default layout;
