function HomePage(){
    return(
        <div className="flex flex-col gap-10 ">
          <p className="text-left text-2xl font-satoshi-bold">Hi, I am Chris</p>
          <p className="text-left  ">
             I am a full stack developer and Accountant with a passion for building new things. I love learn and find how to solve people's problems. In my free time I make content on social media to share my knowledge.  
          </p>
          <div className="flex flex-col gap-5">
          <div className="flex w-[100%] justify-between gap-5 ">
                <img src="/images/verticalPic.jpg" alt="" className="w-[35%] rounded-md object-cover " />
                <img src="/images/Logo.png" alt="image-2" className="w-[65%] rounded-md object-cover " />
          </div>
            <div className="flex w-[100%] justify-between gap-5 ">
                <img src="/images/CharlaCTPE.jpeg" alt="image-1" className="w-[65%] rounded-md object-none " />
                <img src="/images/Logo2.png" alt="" className="w-[35%] rounded-md" />
          </div>
        </div>
        <p className="text-left text-xl">I currently looking for an opportunity to develop my skills and learn new things.</p>
        </div>
    )
}
export default HomePage;
