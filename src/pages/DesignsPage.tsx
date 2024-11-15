
function DesignsPage(){
    return(
        <>
        <p className="text-left mb-5 font-satoshi-medium ">
            These are some designs that I have made in this year.   
        </p>
        <div className="flex flex-col gap-5 mb-5">
            <div className="flex w-[100%] justify-between gap-5 ">
                            <img className="flex w-[35%] rounded-md" src="/images/EstralPoster.png" alt="ImageDesign"/>
                            <img className="flex w-[65%] rounded-md" src="/images/Design1.png" alt="ImageDesign"/>
            </div>
            <div className="flex w-[100%] justify-between gap-5">
                            <img className="flex w-[50%] rounded-md object-scale-down " src="./public/images/C1.jpg" alt="ImageDesign"/>
                            <img className="flex w-[50%] rounded-md" src="./public/images/C5.jpg" alt="ImageDesign"/>  
            </div>
            <div className="flex w-[100%] justify-between gap-5">
                            <img className="flex w-[50%] rounded-md object-scale-down " src="./public/images/C2.jpg" alt="ImageDesign"/>
                            <img className="flex w-[50%] rounded-md" src="./public/images/C7.jpg" alt="ImageDesign"/>  
            </div>
        </div>
        <p className="text-left text-xl font-satoshi-bold-italic ">
            New designs coming soon.
        </p>
        </>
    )
}

export default DesignsPage;
