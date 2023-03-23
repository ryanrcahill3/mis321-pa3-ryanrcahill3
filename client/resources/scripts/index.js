const url = "https://localhost:7250/api/Songs";

function handleOnLoad() {
  ClearScreen();
  PopulateSongs();
}

async function handlePost() {
  var newSong = {
    Title: "",
    Artist: "",
    Date: getDate(),
    Favorited: false,
  };
  newSong.title = document.getElementById("title").value;
  newSong.artist = document.getElementById("artist").value;
  BlankFields();
  await fetch(url, {
    method: "POST",
    body: JSON.stringify(newSong),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
}

async function handlePut(putSong) {
  const songUrl = url + "/" + putSong.ID;

  const updatedSong = {
    ID: putSong.ID,
    Title: putSong.Title,
    Artist: putSong.Artist,
    Date: putSong.Date,
    Favorited: putSong.Favorited,
    Deleted: putSong.Deleted,
  };

  await fetch(songUrl, {
    method: "PUT",
    body: JSON.stringify(updatedSong),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });

  handleOnLoad();
}

async function handleFavorite(favoritedSong) {
  const songUrl = url + "/" + favoritedSong.id;

  const updatedSong = {
    ID: favoritedSong.id,
    Title: favoritedSong.title,
    Artist: favoritedSong.artist,
    Date: favoritedSong.date,
    Favorited: !favoritedSong.favorited,
    Deleted: favoritedSong.deleted,
  };

  await fetch(songUrl, {
    method: "PUT",
    body: JSON.stringify(updatedSong),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });

  handleOnLoad();
}

async function handleDelete(deletedSong) {
  const songUrl = url + "/" + deletedSong.id;

  const updatedSong = {
    ID: deletedSong.id,
    Title: deletedSong.title,
    Artist: deletedSong.artist,
    Date: deletedSong.date,
    Favorited: deletedSong.favorited,
    Deleted: !deletedSong.deleted,
  };

  await fetch(songUrl, {
    method: "PUT",
    body: JSON.stringify(updatedSong),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });

  handleOnLoad();
}

function showFields() {
  const updateFields = document.getElementById("updateFields");
  updateFields.style.display = "block";
  const id = document.getElementById("updateID").value;
  const songUrl = url + "/" + id;
  fetch(songUrl)
    .then((response) => response.json())
    .then((song) => {
      document.getElementById("updateTitle").value = song.title;
      document.getElementById("updateArtist").value = song.artist;
      document.getElementById("updateDate").value = song.date;
    })
    .catch((error) => console.error(error));
}

function PopulateSongs() {
  let table = document.createElement("table");
  table.classList.add("song-table");
  table.style.padding = "20px 10px";
  table.style.margin = "auto";
  let thead = table.createTHead();
  let row = thead.insertRow();
  let th = document.createElement("th");
  th.setAttribute("colspan", "1");
  let text = document.createTextNode("Title");
  th.appendChild(text);
  row.appendChild(th);
  let th2 = document.createElement("th");
  th2.setAttribute("colspan", "1");
  let text2 = document.createTextNode("Artist");
  th2.appendChild(text2);
  row.appendChild(th2);
  let th3 = document.createElement("th");
  th3.setAttribute("colspan", "1");
  let text3 = document.createTextNode("Date Added");
  th3.appendChild(text3);
  row.appendChild(th3);
  let th4 = document.createElement("th");
  th4.setAttribute("colspan", "1");
  let text4 = document.createTextNode("Favorited");
  th4.appendChild(text4);
  row.appendChild(th4);

  fetch(url)
    .then((response) => response.json())
    .then((songs) => {
      songs.forEach(function (song) {
        if (song.deleted == false) {
          let dataRow = thead.insertRow();
          let td = document.createElement("td");
          let text = document.createTextNode(song.title);
          td.appendChild(text);
          dataRow.appendChild(td);
          let td2 = document.createElement("td");
          let text2 = document.createTextNode(song.artist);
          td2.appendChild(text2);
          dataRow.appendChild(td2);
          let td3 = document.createElement("td");
          let text3 = document.createTextNode(song.date);
          td3.appendChild(text3);
          dataRow.appendChild(td3);
          let td4 = document.createElement("td");
          let text4 = document.createTextNode(song.favorited ? "Yes" : "No");
          td4.appendChild(text4);
          dataRow.appendChild(td4);

          let editButton = document.createElement("button");
          editButton.classList.add("edit-Button");
          dataRow.appendChild(editButton);
          editButton.innerHTML = "Edit";
          editButton.style.margin = "23px 20px 0 60px";
          editButton.className = "btn";
          editButton.addEventListener("click", function () {
            let newTitle = prompt("What should the title be?");
            let newArtist = prompt("What should the artist be?");

            const updatedSong = {
              ID: song.id,
              Title: newTitle,
              Artist: newArtist,
              Date: song.date,
              Favorited: song.favorited,
              Deleted: song.deleted,
            };
            handlePut(updatedSong);
          });

          let deleteButton = document.createElement("button");
          deleteButton.classList.add("delete-Button");
          dataRow.appendChild(deleteButton);
          deleteButton.innerHTML = "Delete";
          deleteButton.style.margin = "23px 20px 0 0";
          deleteButton.className = "btn";
          deleteButton.addEventListener("click", function () {
            handleDelete(song);
          });

          let favoriteButton = document.createElement("button");
          favoriteButton.classList.add("favorite-Button");
          dataRow.appendChild(favoriteButton);
          favoriteButton.innerHTML = "Favorite";
          favoriteButton.style.margin = "23px 20px 0 0";
          favoriteButton.className = "btn";
          favoriteButton.addEventListener("click", function () {
            handleFavorite(song);
          });
        }
      });
    })
    .catch((error) => console.error(error));

  document.getElementById(`app`).appendChild(table);
}

function ClearScreen() {
  document.getElementById(`app`).innerHTML = "";
}

function getDate() {
  const today = new Date();
  const date =
    today.getMonth() + 1 + "/" + today.getDate() + "/" + today.getFullYear();
  return date;
}

function BlankFields() {
  document.getElementById("title").value = "";
  document.getElementById("artist").value = "";
  document.getElementById("deleteID").value = "";
  document.getElementById("favoriteID").value = "";
  document.getElementById("updateID").value = "";
}
