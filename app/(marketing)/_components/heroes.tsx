import Image from "next/image";

export const Heroes=()=>{
    return(
        <div className="flex flex-col items-center justify-center max-w-5xl">
            <div className="flex items-center">
                <div className=" relative flex  items-center w-[300px] h-[300px] sm:w-[500px] sm:h-[280px] md:h-[200px] md:w-[800px]">    
            <Image src='/a.png' fill  alt="hero" />
            </div>
        </div>
        </div>
    )
}