let Songs = JSON.parse(localStorage.getItem("allSongs")) || []

function handleOnLoad()
{
    ClearScreen()
    PopulateSongs()
}



//clears screen in order to ensure tables aren't stacking up
function ClearScreen()
{
    document.getElementById(`app`).innerHTML = ''
}
function getDate()
{
    const today = new Date();
    const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    return date
}
function handleAddClick()
{
    var newSong =
    {
        ID: createID(),
        title: "",
        artist: "",
        date: getDate(),
        favorited: false, 
        deleted: false,
    }
    newSong.title=document.getElementById("title").value
    newSong.artist=document.getElementById("artist").value
    newSong.favorited = false
    newSong.deleted = false
    Songs.unshift(newSong)
    localStorage.setItem("allSongs", JSON.stringify(Songs))
    BlankFields()
    
}
function handleDeleteClick(ID)
{
    const foundIndex = Songs.findIndex(x => x.ID == ID)
    if (foundIndex !== -1) {
        Songs[foundIndex].deleted = true
        localStorage.setItem("allSongs", JSON.stringify(Songs))
        PopulateSongs()
    }
    BlankFields()
}

function handleFavoriteClick(ID)
{
    const foundIndex = Songs.findIndex(x => x.ID == ID)
    if (foundIndex !== -1) {
        Songs[foundIndex].favorited = !Songs[foundIndex].favorited
        localStorage.setItem("allSongs", JSON.stringify(Songs))
        PopulateSongs()
        console.log(Songs[foundIndex])
    }
    BlankFields()

  
}

function createID() 
{ 
    const ids = Songs.map(song => song.ID);
    const maxId = ids.length > 0 ? Math.max(...ids) : 0;
    return maxId + 1;
}
//reset fields after submit
function BlankFields()
{
    document.getElementById("title").value = ""
    document.getElementById("artist").value = ""
    document.getElementById("deleteID").value = ""
    document.getElementById("favoriteID").value = ""
}

function PopulateSongs()
{
    let table = document.createElement('table')
    table.classList.add('song-table')
    table.style.padding = "20px 10px"
    table.style.margin = "auto"
    let thead = table.createTHead()
    let row = thead.insertRow()
    let th = document.createElement('th')
    th.setAttribute('colspan', '1');
    let text = document.createTextNode('Song ID')
    th.appendChild(text)
    row.appendChild(th)
    let th2 = document.createElement('th')
    th.setAttribute('colspan', '1');
    let text2 = document.createTextNode('Title')
    th2.appendChild(text2)
    row.appendChild(th2)
    let th3 = document.createElement('th')
    th3.setAttribute('colspan', '1');
    let text3 = document.createTextNode('Artist')
    th3.appendChild(text3)
    row.appendChild(th3)
    let th4 = document.createElement('th')
    th4.setAttribute('colspan', '1');
    let text4 = document.createTextNode("Date Added")
    th4.appendChild(text4)
    row.appendChild(th4)
    let th5 = document.createElement('th')
    th5.setAttribute('colspan', '1');
    let text5 = document.createTextNode("Favorited")
    th5.appendChild(text5)
    row.appendChild(th5)
    Songs.forEach(function(song)
    {
        if(song.deleted == false){

            let dataRow = thead.insertRow()
            let td = document.createElement('td')
            let text = document.createTextNode(song.ID)
            td.appendChild(text)
            dataRow.appendChild(td)
            let td2 = document.createElement('td')
            let text2 = document.createTextNode(song.title)
            td2.appendChild(text2)
            dataRow.appendChild(td2)
            let td3 = document.createElement('td')
            let text3 = document.createTextNode(song.artist)
            td3.appendChild(text3)
            dataRow.appendChild(td3)
            let td4 = document.createElement('td')
            let text4 = document.createTextNode(song.date)
            td4.appendChild(text4)
            dataRow.appendChild(td4)
            let td5 = document.createElement('td')
            let text5 = document.createTextNode(song.favorited ? 'Yes' : 'No')
            td5.appendChild(text5)
            dataRow.appendChild(td5)
        }

    })
    document.getElementById(`app`).appendChild(table)
}
