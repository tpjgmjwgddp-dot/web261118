function average(list) {
 let sum = 0;
 for (const m of list) {
 sum += m.rating;
 }
 return sum / list.length;
}
console.log("평균:", average(movies));

function best(list) {
     let top = list[0];
    for (const m of list) {
        if (m.rating > top.rating) {
            top = m;
        }
    }
 return top;
}
console.log("최고:", best(movies).title);

const filterByRating = (list, min) => { return list.filter(m => m.rating >= min);}
console.log("8점 이상:", filterByRating(movies, 8).length + "편");

const sortByRating = (list) => { return [...list].sort((a, b) => b.rating - a.rating)}
const sorted = sortByRating(movies);
console.log("정렬 1위:", sorted[0].title, "/ 원본 1번:", movies[0].title)

const yearsSince = (dateStr)=> {return new Date().getFullYear() - new Date(dateStr).getFullYear();}
console.log(yearsSince(movies[0].date) + "년 전 개봉");

const posterUrl = (path, size)=>{ return "https://image.tmdb.org/t/p/" + size + path;};
console.log(posterUrl(movies[0].poster, "w342"));

// renderCards : 영화 배열 ⇒ 보드에 카드 생성(반환값 없음) 
function renderCards(list) { 
    const board = document.querySelector(".board"); 
    board.innerHTML = ""; 
    document.getElementById("count").textContent = list.length + "편"; 
    if (list.length === 0) {
             board.classList.add("is-empty"); 
        }
        else{
             board.classList.remove("is-empty"); 
        } 
    for (const m of list) { 
        const card = document.createElement("article");  
        card.className = "card"; 
         if (m.rating >= 8) {
             card.classList.add("hot"); 
            }
        card.innerHTML = ` 
        <img class="poster" src="${posterUrl(m.poster, "w342")}" alt="${m.title} 포스터"> 
        <span class="badge">${m.rating}</span> 
        <div class="info"> 
        <h2>${m.title}</h2> 
        <p class="year">${m.year}</p> 
        <button class="like" type="button">♥</button>
        </div>`; 
        board.appendChild(card);
        }
    updateLikeCount(); 
}                               
function sortBy(list, key, desc) { 
    const copy = [...list]; 
    copy.sort((a, b) => { 
        if (typeof a[key] === "string") return a[key].localeCompare(b[key]); 
        return a[key] - b[key]; 
    }); 
    if (desc) copy.reverse(); 
    return copy; 
} 


function getView() {
    const keyword = document.getElementById("q").value.trim().toLowerCase();
    const found = movies.filter(m => m.title.toLowerCase().includes(keyword));
    const key = document.getElementById("sort").value;
    return sortBy(found, key, key !== "title");
}

function applySort() { 
    renderCards(getView()); 
} 

document.getElementById("q").addEventListener("input", applySort);
document.getElementById("sort").addEventListener("change", applySort);

applySort();
// function은 보드 안요소만
// 화살표 함수는 보드 밖전체를 잡으며 this 범위가 달라진다.

document.querySelector(".board").addEventListener("click", function (e) {
    if(e.target.classList.contains("like")) {
         e.target.classList.toggle("liked"); updateLikeCount(); 
        }
     }
    );
 function updateLikeCount() { document.getElementById("likeCount").textContent = document.querySelectorAll(".liked").length; }
 document.getElementById("q").addEventListener("keydown", (e) => {
     if (e.key === "Escape"){
         e.target.value = "";
         renderCards(getView()
        ); 
    } 
}
);
