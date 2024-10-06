function getTimeString(time) {
    //get Hour and rest seconds
    const hour = parseInt(time / 3600);
    let remainingSecond = time % 3600;
    const minute = parseInt(remainingSecond / 60);
    remainingSecond = remainingSecond % 60;
    return `${hour} hour  ${minute} minute ${remainingSecond} second ago`;
}



const loadCategories = () => {
    fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
        .then(res => res.json())
        .then(data => displayCategories(data.categories))
        .catch((error) => console.log(error))
}

const loadVideos = () => {
    fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
        .then(res => res.json())
        .then(data => displayVideos(data.videos))
        .catch((error) => console.log(error))
}



const displayCategories = (data) => {

    const categoryContainer = document.getElementById('categories')
    // console.log(data)
    data.forEach(item => {
        // console.log(item);

        const button = document.createElement('button');
        button.classList = 'btn';
        button.innerText = item.category;

        categoryContainer.append(button)
    })
}


const displayVideos = (data) => {
    const videoContainer = document.getElementById('videos')
    // console.log(data)
    data.forEach(item => {
        console.log(item.thumbnail);

        const card = document.createElement('div');
        card.classList = "card card-compact"
        card.innerHTML = `
        <figure class="h-[200px] relative">
             <img src=${item.thumbnail} class="h-full w-full object-cover"
                    alt="" />
                ${item.others.posted_date?.length === 0 ? "" :
            `<span class="absolute right-2 bottom-2 bg-black rounded p-1 text-white">${getTimeString(item.others.posted_date)}</span> `
            }    
                  
        </figure>
        <div class="px-0 py-2 flex gap-2">
            <div>
            </div>
            <img class="w-10 h-10 rounded-full object-cover" src=${item.authors[0].profile_picture
            } />
            <div>
            <h2 class="font-bold">${item.title}</h2>
            <div class="flex items-center gap-2">
                <p class="text-gray-400">${item.authors[0].profile_name}</p>
                ${item.authors[0].verified == true
                ? `<img class="w-5" src="https://img.icons8.com/?size=96&id=D9RtvkuOe31p&format=png" />`
                : ""
            }
            </div>
            <p> <button  onclick="loadDetails('${item.video_id
            }')" class="btn btn-sm btn-error">details</button> </p>
            </div>
        </div>
        `;

        videoContainer.append(card)
    })
}

loadCategories();
loadVideos();