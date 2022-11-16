var offset=0;
async function displaySearchResult(){
    let searchDistrict=document.getElementById("search-input").value;     
    // console.log("offset is",offset);
    let url=`https://api.data.gov.in/resource/dc5c0828-8142-42fd-af64-1cf1a412ecd3?api-key=579b464db66ec23bdd000001cdd3946e44ce4aad7209ff7b23ac571b&format=json&offset=${offset}&limit=100&count=50`;
    let apidata= await fetch(url).then(data=>data.json());
    // console.log(apidata);
    findMatch(apidata,searchDistrict);

}

async function findMatch(apidata,searchDistrict){
    let filteredDistObjArray;   
    // console.log("apidata is",apidata);  
  
    filteredDistObjArray=apidata.records.filter((obj)=>obj.city_district.toLowerCase().indexOf(searchDistrict.toLowerCase())>-1);
    // console.log("found Object is",filteredDistObjArray);
    // console.log("found Array Length is",filteredDistObjArray.length);
    if((filteredDistObjArray.length===0)&& (offset<40)){ 
            offset+=10;    
            // console.log("offset value is",offset) 
           await displaySearchResult();             
    } 

    displayCard(filteredDistObjArray); 
    
    function displayCard(resultObjArray){
        console.log("run display");
        console.log(resultObjArray);
        
        if(resultObjArray.length===0){
            let errorEl=document.getElementById("search-error");
            errorEl.innerText=`No Matching District Found Please check your Input`;
            console.log("No Matching District Found Please check your Input")
        }

        else {   
            let resultWrapperEl=document.createElement("div");
            resultWrapperEl.classList.add("container","d-flex","justify-content-center","rac");
        
            for(let i=0;i<resultObjArray.length;i++){

                let cardEl=document.createElement("div");
                cardEl.classList.add("m-3");
                cardEl.innerHTML=`
               
                <div id="" class="card card-wrapper mx-auto mt-3 rounded-4" style="width:350px;height:500px">
                <h3 class="text-center">${resultObjArray[i].city_district} </h3>
                <img class="rounded-top " src="https://img.freepik.com/premium-vector/car-crash-accident-side-impact_201904-859.jpg" alt="accident image" srcset="">
                <div class="accidents-c d-flex justify-content-between bg-primary text-white">
                    <img width=100px height="80px" class="logo" src="https://imgeng.jagran.com/images/2021/oct/29_10_2020-road_accident-daily_20976128_1616196501633412763909.jpg" alt="accident image" srcset="">
                    <div class="logo-content" >
                        <p class="text-center m-0 fs-3 ">Total Accidents</p>
                        <p class="text-center m-0 fs-4 fw-bold">${resultObjArray[i].total_number_of_accidents_2018_}</p>
                    </div>
                </div>
                <div class="accidents-c d-flex justify-content-between bg-danger text-white">
                    
                    <div class="logo-content" >
                        <p class="text-center m-0 fs-3 ">Injured</p>
                        <p class="text-center m-0 fs-4 fw-bold">${resultObjArray[i].number_of_persons_injured_2018_}</p>
                    </div>
                    <img width=100px height="80px" class="logo" src="https://st.depositphotos.com/1017187/3485/i/600/depositphotos_34856941-stock-photo-close-up-image-of-a.jpg" alt="accident image" srcset="">
                </div>
                <div class="accidents-c d-flex justify-content-between bg-dark text-white">
                    <img width=100px height="80px" class="logo" src="https://m.economictimes.com/thumb/msid-91670651,width-1200,height-900,resizemode-4,imgsize-39156/families-ask-for-second-autopsy-after-three-mysterious-deaths-at-bahamas-sandals-resort.jpg" alt="accident image" srcset="">
                    <div class="logo-content" >
                        <p class="text-center m-0 fs-3 ">Total Death</p>
                        <p class="text-center m-0 fs-4 fw-bold">${resultObjArray[i].number_of_persons_killed_2018_}</p>
                    </div>
                </div>
            </div>`

            resultWrapperEl.append(cardEl);
            }
            var alreadyAppendedEl=document.getElementsByClassName("rac");
            for(x of alreadyAppendedEl){
                x.remove();
            }
            document.body.append(resultWrapperEl);
        }
    }

 
}





