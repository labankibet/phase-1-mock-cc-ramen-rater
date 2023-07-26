// write your code here
const newRamen = () =>{
    return fetch("http://localhost:3000/ramens")
    .then(res => res.json())
    .then(data => submitRaman(data))
}
console.log(newRamen());
const submitRaman = (raman) =>{
    let menu = document.getElementById("ramen-menu");
    let h2 = document.querySelector(".name");
    let h3 = document.querySelector(".restaurant");
    
    raman.forEach(d => {
        let comment = document.getElementById("comment-display");
        let rating = document.getElementById("rating-display");
       
    let images = document.createElement('img');
    images.setAttribute("src",d.image);
    images.addEventListener('click', singleImageDisplay);
    menu.appendChild(images);
// update
// })
// }
// handle single image display
    function singleImageDisplay(){
        let image = document.getElementsByClassName('detail-image')[0];
        let btn = document.createElement('button');
        let editBtn = document.createElement('button');
        let p = document.createElement('p');
        p.setAttribute("id", "image-button");
        btn.addEventListener("click", handleDelete)
        editBtn.addEventListener("click", handleUpdate)
        image.setAttribute("src", d.image );
        rating.textContent = d.rating;
        comment.textContent = d.comment;
        h2.textContent = d.name;
        h3.innerText = d.restaurant;
    
        btn.textContent = ` X`
        btn.style.color = "red"
        btn.style.cursor = "pointer"
        p.appendChild(btn);
        editBtn.textContent = "Edit";
        editBtn.style.cursor = "pointer"
        p.appendChild(editBtn);
        comment.appendChild(p);
}
// update
    function handleUpdate(){
        
// ratingInput.placeholder = d.rating;
        rating.innerHTML = `
        <input type="text" id="ratingUpdate" name="ratingUpdate" value=${d.rating}>
        `
        comment.innerHTML = `
        <input type="text" id="commentUpdate" name="commentUpdate" value="${d.comment}">
        `
// let h3Rating = document.getElementsByTagName('h3')[2]
// h3Rating.style.display = 'flex'
// h3Rating.style.flexDirection = 'column-reverse'
       document.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            let ratingUpd = document.getElementById('ratingUpdate').value;
            let commentUpd = document.getElementById('commentUpdate').value;
                newUpdateObj = {
                rating: `${ratingUpd}`,
                comment: `${commentUpd}`
            }
            fetch(`http://localhost:3000/ramens/${d.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                        },
                body: JSON.stringify(newUpdateObj),
            })
            .then(res => res.json())
            // Update DOM with new data.
             d.rating = ratingUpd;
            d.comment = commentUpd;
            // alert("Successfully updated")
            // window.location.reload();
            // singleImageDisplay(d.rating, d.comment);
            }
        })
    }
// Delete method
    const handleDelete = () => {
        fetch(`http://localhost:3000/ramens/${d.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
                },
           })
         .then(resp => {
            if(resp.ok){
                alert (`${d.name} deleted successfully`)
                //reload page
                window.location.reload();
            }else{
                alert (`Error when deleting ${d.name} `)
                 }
            })
        }
    })   
}
// Post method
    let newObj;
    const formSubmit = (e) => {
    e.preventDefault();
    let nameRamen = document.getElementById('new-name').value;
    let restaurant = document.getElementById('new-restaurant').value;
    let imageRamen = document.getElementById('new-image').value;
    let rating = document.getElementById('new-rating').value;
    let comment = document.getElementById('new-comment').value;
    newObj = {
        name: `${nameRamen}`,
        restaurant: `${restaurant}`,
        image: `${imageRamen}` ,
        rating: `${rating}`,
        comment: `${comment}`
    }
    handleCreate(newObj)
    form.reset();
    window.location.reload();
}
    let form = document.getElementById("new-ramen");
    form.addEventListener('submit', formSubmit);
// Post Method
    const handleCreate = (newObj) =>{
    return fetch("http://localhost:3000/ramens",{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(newObj)
        })
        .then(resp => resp.json())
        .then(data => console.log(data))
} 
