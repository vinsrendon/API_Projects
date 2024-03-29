function showSidebar(){
    const sidebar = document.querySelector('.sidebar');
    sidebar.style.display = 'flex';
}

function hideSidebar(){
    const sidebar = document.querySelector('.sidebar');
    sidebar.style.display = 'none';
}

function vw(){
    let w,h;
    let txt="";
    if(window.innerWidth !== undefined && window.innerHeight !== undefined) { 
      w = window.innerWidth;
    } else {  
      w = document.documentElement.clientWidth;
    }
    if(w >= 750)
    {
        hideSidebar()
    }
  }


async function validateEmail(){
    let email = document.getElementById('emailTxt').value
    let url = 'https://validect-email-verification-v1.p.rapidapi.com/v1/verify?email=' +email;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '9cbbfa10cfmshe035ba5a48d6d40p1fed25jsna0a20886b78c',
            'X-RapidAPI-Host': 'validect-email-verification-v1.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.text();
        const obj = JSON.parse(result)
        let status = obj.status
        if(status == "valid")
        {
            alert("LOGIN SUCCESSFUL");                  
            location.href = "landing.html"   
        }
        else if(status == "invalid"){
            alert("EMAIL INVALID");
        }
    } catch (error) {
        console.error(error);
        alert("UNEXPECTED ERROR OCCURED");
    }
}


function getNews(){
    const apiEndPoint = "https://newsapi.org/v2/everything?q=Philippines&apiKey=e9a9085e9fae481fa8b7d362adb984bf";
    const display = document.querySelector(".gallery");

    const getData = async () =>{
        const res = await fetch(apiEndPoint);
        const data = await res.json();
        return data;
    }

    const displayNews = async () =>{
        const payload = await getData();
        const temp = payload.articles;
        console.log(temp);
        let dataDisplay  = temp.map((object) => {
            const{title,url,urlToImage} = object;

            if(urlToImage != null){
                return `            
                <div class="imageContainer">
                    <a target="_blank" href="${url}">
                        <img class="nImage" loading="lazy" src="${urlToImage}" alt="${title}">
                    </a>
                    <figcaption>${title}</figcaption>
                </div>
                `
            }
            
        }).join("");

        display.innerHTML = dataDisplay;
    }
    displayNews();
}
