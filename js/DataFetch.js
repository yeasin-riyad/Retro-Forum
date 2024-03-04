const card = document.getElementById('card')
const button = document.querySelectorAll(".button")
const childCard = document.getElementById('child-card')
const latestPost=document.getElementById('latestPost')
const search=document.getElementById('search')
const Button=document.getElementById('Button')
const firstLoading=document.getElementById('first-loading');
const secondLoading=document.getElementById('second-loading');
let readCount=document.getElementById('readCount');
let heading=document.getElementById('heading')
let count=0;

let getData = async () => {
    let response = await fetch('https://openapi.programming-hero.com/api/retro-forum/posts')
    let data = await response.json();
    let Data = await data.posts
    setTimeout(()=>{
        singleCard(Data);
        firstLoading.classList.add('hidden')
    },2000)



}


// Method for Every Single Card

let singleCard = (Data) => {

    Data.forEach(({ id, category, image, isActive, title, description, comment_count, view_count, posted_time, author }) => {

        let div = document.createElement('div');
        div.innerHTML = `
           
            <div id="card" class="w-full">
                <div class="card bg-base-100 shadow-xl my-10">
                    <div class="card-body">
                        <!-- Card Container -->
                        <div class="flex flex-col items-start gap-x-5 lg:flex-row ">
                           
                                
                      

                                <div class="relative">
                                     <img class="w-24 h-24 rounded-full" src="${image}" alt="">
                                     <span class="absolute top-0 left-8 transform -translate-y-1/2 w-3.5 h-3.5 ${isActive ? "bg-green-500" : "bg-red-500"} border-2 border-white dark:border-gray-800 rounded-full"></span>
                                </div>
                                
                           
    
                            <div class="flex flex-col justify-start text-start gap-y-7">
                                <div class="flex gap-x-5 text-[#12132dcc] text-lg font-medium">
                                    <h1>#${category}</h1>
                                    <h1>Author:${author.name}</h1>
                                </div>
                                <div>
                                    <h1 class="mulish text-slate-900 text-2xl font-bold mb-5">${title}</h1>
                                    <p class="inter text-[#12132d99] text-sm font-normal">${description}</p>
                                    <!-- Divider section -->
                                    <div class="divider"></div> 
    
                                    <!-- Icon Section -->
                                    <div class="flex justify-between">
                                        <div class="flex gap-x-4">
                                            <div class="flex items-center gap-x-2">
                                                <i class="fa-regular fa-message"></i>
                                                <h1>${comment_count}</h1>
                                            </div>
                                            <div class="flex items-center gap-x-2">
                                                <i class="fa-regular fa-eye"></i>
                                                <h1>${view_count}</h1>
                                            </div>
                                            <div class="flex items-center gap-x-2">
                                                <i class="fa-regular fa-clock"></i>
                                                <h1>${posted_time} min</h1>
                                            </div>
                                        </div>
    
                                        <div class="button " onclick="handleClick('${title}',${view_count})">
                                            <i class=" fa-regular fa-envelope-open bg-emerald-500 text-white rounded-full p-1"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    
                     
                    </div>
                  </div>

        
        `


        card.appendChild(div)
    });

}

const handleClick = (title, view_count) => {
    heading.classList.remove('hidden')
    let div = document.createElement('div');
    div.innerHTML = `

    <div class="card w-full bg-base-100 shadow-xl truncate">
        <div class="card-body">
            <div class=" flex justify-between">
                <h1 class="font-bold text-slate-900">${title}</h1>
                <div class="flex items-center gap-x-2">
                  <i class="fa-regular fa-eye"></i>
                  <h1>${view_count}</h1>
            </div>
            </div> 
        </div>
    </div>
    
    `

    childCard.appendChild(div)
    count++;
    readCount.innerText=`(${count})`
}

// Latest Posts
let latestPosts=async()=>{
     let response=await fetch('https://openapi.programming-hero.com/api/retro-forum/latest-posts');
     let data=await response.json()
     console.log(data)
     setTimeout(()=>{

        data.forEach(({cover_image,profile_image,title,description,author}) => {
            let div=document.createElement('div');
            div.innerHTML=`
            <div class="card  bg-base-100 shadow-xl mx-auto pb-4 h-[500px]">
            <figure class="px-10 pt-10">
              <img src="${cover_image}" alt="Shoes" class="rounded-xl" />
            </figure>
            <div class="flex flex-col items-start gap-y-3 text-start px-10">
                <div class="flex items-center  pt-3 gap-x-3 text-[#12132d99] text-sm font-medium">
                    <i class="fa-regular fa-calendar-days"></i>
                    <p>${author.posted_date?author.posted_date:"No Publish Date"}</p>
                </div>
                <h1 class="text-xl font-extrabold text-slate-900">${title}</h1>
                <p class="text-[#12132d99] text-sm font-medium">${description}</p>
                <div class="flex items-start gap-x-3">
                    <div class="avatar">
                        <div class="w-12 rounded-full">
                          <img src="${profile_image}" />
                        </div>
                      </div>
                      <div >
                        <h1 class="text-lg font-bold text-slate-900">${author.name}</h1>
                        <h1 class="text-[#12132d99] text-sm font-medium">${author.designation?author.designation:"Unknown"}</h1>
                      </div>
                </div>
            </div>
           
          </div>
            
            `
            latestPost.appendChild(div)
            
         });
         secondLoading.classList.add('hidden')

     },2000)

     
}

// Apply Search Button Mechanism...
let searchCategory= async (category)=>{
    let response=await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${category}`);
    let data=await response.json();
    let Data=data.posts;
    card.innerHTML='';
    singleCard(Data);

}
Button.addEventListener('click',()=>{
    firstLoading.classList.remove('hidden')

    setTimeout(()=>{
        searchCategory(search.value);
        firstLoading.classList.add('hidden')
    },2000)
    
    
})

getData()
latestPosts()

