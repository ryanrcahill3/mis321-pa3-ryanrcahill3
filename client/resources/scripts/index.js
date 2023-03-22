const url = 'https://localhost:7250/api/Songs'

function handleOnLoad(){
  ClearScreen()
  PopulateSongs()
}


async function handlePost(){
  console.log("inside handle post")
  var newSong =
  {
      Title: "",
      Artist: "",
      Date: getDate(),
      Favorited: false, 
  }
  newSong.title=document.getElementById("title").value
  newSong.artist=document.getElementById("artist").value
  BlankFields()
  await fetch(url, {
        method: "POST",
        body: JSON.stringify(newSong),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      });
     
}

async function handlePut(){
  console.log("inside handle put")
  const updatedSong = {
    ID: document.getElementById("updateID").value,
    Title: "",
    Artist: "",
    Date: "",
    Favorited: null,
    Deleted: null,
  }
  const putUrl = url + "/" + document.getElementById("updateID").value;
  updatedSong.Title = document.getElementById("updateTitle").value;
  updatedSong.Artist = document.getElementById("updateArtist").value;
  updatedSong.Date = document.getElementById("updateDate").value;
  console.log(putUrl)
 
  fetch(putUrl)
  .then(response => response.json())
  .then(song => {
    updatedSong.Favorited = song.favorited;
    updatedSong.Deleted = song.deleted
    console.log(updatedSong)
    return fetch(putUrl, {
      method: "PUT",
      body: JSON.stringify(updatedSong),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    });
  })
  .catch(error => console.error(error));

      BlankFields()
      document.getElementById("updateFields").style.display = "none";
}

async function handleFavorite() {
  console.log("inside handle favorite")
  const id = document.getElementById("favoriteID").value;
  const songUrl = url + "/" + id;
  const response = await fetch(songUrl);
  const song = await response.json();

  const updatedSong = {
    ID: song.id,
    Title: song.title,
    Artist: song.artist,
    Date: song.date,
    Favorited: !song.favorited,
    Deleted : song.deleted,
  }

  console.log(updatedSong)
  console.log(songUrl)

  await fetch(songUrl, {
    method: "PUT",
    body: JSON.stringify(updatedSong),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }

    
  });

  BlankFields()
}

async function handleDelete() {
  console.log("inside handle delete")
  const id = document.getElementById("deleteID").value;
  const songUrl = url + "/" + id;
  const response = await fetch(songUrl);
  const song = await response.json();

  const updatedSong = {
    ID: song.id,
    Title: song.title,
    Artist: song.artist,
    Date: song.date,
    Favorited: song.favorited,
    Deleted: !song.deleted,
  }

  console.log(updatedSong)
  console.log(songUrl)

  await fetch(songUrl, {
    method: "PUT",
    body: JSON.stringify(updatedSong),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }

    
  });

  BlankFields()
}



function showFields() {
  const updateFields = document.getElementById("updateFields");
  updateFields.style.display = "block";
  const id = document.getElementById("updateID").value;
  const songUrl = url + "/" + id;
  fetch(songUrl)
    
    .then(response => response.json())
    .then(song => {
      document.getElementById("updateTitle").value = song.title;
      document.getElementById("updateArtist").value = song.artist;
      document.getElementById("updateDate").value = song.date;
    })
    .catch(error => console.error(error));
}




function PopulateSongs() {
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
    th2.setAttribute('colspan', '1');
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
    
    
    fetch(url)
        .then(response => response.json())
        .then(songs => {
            songs.forEach(function(song) {
                    if(song.deleted == false){
                      console.log(song.deleted)
                      let dataRow = thead.insertRow()
                      let td = document.createElement('td')
                      let text = document.createTextNode(song.id)
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
        })
        .catch(error => console.error(error))

        document.getElementById(`app`).appendChild(table)
}

function ClearScreen()
{
    document.getElementById(`app`).innerHTML = ''
}

function getDate()
{
  const today = new Date();
  const date = (today.getMonth() + 1) + '/' + today.getDate() + '/' + today.getFullYear();  
  return(date)
}

function BlankFields()
{
    document.getElementById("title").value = ""
    document.getElementById("artist").value = ""
    document.getElementById("deleteID").value = ""
    document.getElementById("favoriteID").value = ""
    document.getElementById("updateID").value = ""
}


