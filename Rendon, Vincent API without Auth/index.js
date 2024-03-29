function getNews(){
    const apiEndPoint = "https://api.spaceflightnewsapi.net/v3/articles";
    const display = document.querySelector(".gallery");

    const getData = async () =>{
        const res = await fetch(apiEndPoint);
        const data = await res.json();
        return data;
    }

    const displayNews = async () =>{
        const payload = await getData();
        // console.log(payload);
        let dataDisplay  = payload.map((object) => {
            const{title,url,imageUrl,summary} = object;

            if(imageUrl != null){
                return `            
                <div class="imageContainer">
                    <a target="_blank" href="${url}">
                        <img class="nImage" loading="lazy" src="${imageUrl}" alt="${title}">
                    
                    <figcaption class="desc">${title}<p>"${summary}"</p></figcaption></a>
                </div>
                `
            }
            
        }).join("");

        display.innerHTML = dataDisplay;
    }
    displayNews();
}