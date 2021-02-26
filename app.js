window.onload = () => {
  showHomeTab();
};

function showHomeTab() {
  document.querySelector(".home").style.display = "block";
  document.querySelector(".products").style.display = "none";
  document.querySelector(".location").style.display = "none";
  document.querySelector(".news").style.display = "none";
  document.querySelector(".guest").style.display = "none";
  document.querySelector(".signup").style.display = "none";
  document.querySelector(".signin").style.display = "none";
}

function showProductsTab() {
  document.querySelector(".home").style.display = "none";
  document.querySelector(".products").style.display = "block";
  document.querySelector(".itemsTable").style.display = "block";
  getItems("itemTable");
  document.querySelector(".location").style.display = "none";
  document.querySelector(".news").style.display = "none";
  document.querySelector(".guest").style.display = "none";
  document.querySelector(".signup").style.display = "none";
  document.querySelector(".signin").style.display = "none";
}

function showLocationTab() {
  document.querySelector(".home").style.display = "none";
  document.querySelector(".products").style.display = "none";
  document.querySelector(".location").style.display = "block";
  document.querySelector(".news").style.display = "none";
  document.querySelector(".guest").style.display = "none";
  document.querySelector(".signup").style.display = "none";
  getLocations();
  document.querySelector(".signin").style.display = "none";
}

function showNewsTab() {
  document.querySelector(".home").style.display = "none";
  document.querySelector(".products").style.display = "none";
  document.querySelector(".location").style.display = "none";
  document.querySelector(".news").style.display = "block";
  getNews("newsTable");
  document.querySelector(".guest").style.display = "none";
  document.querySelector(".signup").style.display = "none";
document.querySelector(".signin").style.display = "none";
}

function showGuestTab() {
  document.querySelector(".home").style.display = "none";
  document.querySelector(".products").style.display = "none";
  document.querySelector(".location").style.display = "none";
  document.querySelector(".news").style.display = "none";
  document.querySelector(".guest").style.display = "block";
  document.querySelector(".signup").style.display = "none";
document.querySelector(".signin").style.display = "none";
}

function showSignupTab() {
  document.querySelector(".home").style.display = "none";
  document.querySelector(".products").style.display = "none";
  document.querySelector(".location").style.display = "none";
  document.querySelector(".news").style.display = "none";
  document.querySelector(".guest").style.display = "none";
  document.querySelector(".signup").style.display = "block";
  document.querySelector(".signin").style.display = "none";
}

function showSigninTab() {
  document.querySelector(".home").style.display = "none";
  document.querySelector(".products").style.display = "none";
  document.querySelector(".location").style.display = "none";
  document.querySelector(".news").style.display = "none";
  document.querySelector(".guest").style.display = "none";
  document.querySelector(".signup").style.display = "none";
  document.querySelector(".signin").style.display = "block";
}

function getItems() {
  const itemsEndpoint =
    "http://redsox.uoa.auckland.ac.nz/ds/DairyService.svc/items";
  fetch(itemsEndpoint, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  })
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    showItems(data);
  })
  .catch((error) => {
    console.error(error);
  })
}

function showItems(data) {
  const json = data;
  let itemLayout = "";
  let count = 0;
  const itemImg = "http://redsox.uoa.auckland.ac.nz/ds/DairyService.svc/itemimg?id=";

  const addItem = item => {
    itemLayout +=
      "<td>" +
        "<img src=" + itemImg + item.ItemId + " height=125 width=125>" +
      "</td>" +
      
      "<td>" +
          "<b>" + item.Title + "</b>" + 
          "<br>" + 
          item.Origin + 
          "<br><b class=itemPrice>$" + 
          item.Price + 
          "</b><br>" + 
          item.Type +
          "<br><button type=submit class=buy>Buy</button>" +
      "</td>";
    count += 1;

    if (count >= 4) {
      itemLayout += "</tr>\n"
      count = 0;
    }
  };
  json.forEach(addItem);
  document.querySelector(".itemsTable").innerHTML = itemLayout;
}

function searchItem() {
  let userSearchTerm = document.getElementById("userInput").value;
  const searchEndPoint =
    "http://redsox.uoa.auckland.ac.nz/ds/DairyService.svc/search?term=" +
    userSearchTerm;
  fetch(searchEndPoint, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  })
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    showItems(data);
  })
  .catch((error) => {
    console.error(error);
  });
}

function getLocations() {
  const locationEndpoint = "http://redsox.uoa.auckland.ac.nz/ds/DairyService.svc/vcard";
  fetch(locationEndpoint, {
    headers: {
      "Accept": "application/json"
    },
  })
  .then((response) => {
    return response.text();
  })
  .then((data) => {
    showLocations(data);
  })
}

/**
*
* Function shows user information on where to contact and ring Dunedin Dairy.
* Clicking on the Add to Contacts opens up VCard to download
*
 */

function showLocations(data) {
  const line = data.split("\n");
  const dictionary = {};
  
  for (var i = 0; i < line.length; i++) {
    const lineArray = line[i].split(":");
    //console.log(lineArray);
    const lineHeaders = lineArray[0].split(";")[0]; // text headers
    //console.log(lineHeaders);  
    let value;
    if (lineHeaders == "ADR") {
      value = lineArray[1].slice(2, lineArray[1].length); //get address value from the array
      value = lineArray[1].split(";"); //split array in semicolons separately
      value = value.slice(2, value.length).join(","); //joins the address into one string
    }
    else {
      value = lineArray[1];
    }
    dictionary[lineHeaders] = value;
  }
  document.querySelector("#locationContent").innerHTML = 
    "Address: " + dictionary["ADR"] + "<br>" + 
    "Email: " + "<a class=vcard href=mailto:" + dictionary["EMAIL"] + ">" + dictionary["EMAIL"] + "</a><br>" + 
    "Phone: " + "<a class=vcard href=tel:" + dictionary["TEL"] + ">" + dictionary["TEL"] + "</a><br>" +
    "Download VCard: " + 
    "<button type=button class=vcardBtn>" +
      "<a href=http://redsox.uoa.auckland.ac.nz/ds/DairyService.svc/vcard>🖫</a>" +
    "</button>";
    
}

function getNews(items) {
  const newsEndpoint = "http://redsox.uoa.auckland.ac.nz/ds/DairyService.svc/news";
  fetch(newsEndpoint, {
    method: "GET",
    headers: {
      Accept: "application/json"
    },
  })
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    showNews(data);
  })
  .catch((error) => {
    console.error(error);
  })
  
}

/**
*
* Function displays news articles and their links
*
 */

function showNews(data) {
  console.log(data);
  var json = data;
  let newsLayout = "";
  let count = 0;
  const addNews = news => {
    newsLayout +=
      "<td>" +
        "<img class=newsImg src=" + news.enclosureField.urlField + ">" +
      "</td>" +
      "<td>" +
        "<a href=" + news.linkField + ">" +
            "<b>" + news.titleField + "</b>" + 
        "</a>" +
        "<br>" +
        "<p>" + news.descriptionField + "</p>" +
        "<b>Date Published: " + news.pubDateField.substring(0, 16) + "</b>";
    count += 1;

    if (count >= 1) {
      newsLayout += "</tr>\n"
      count = 0;
    }
  }
  json.forEach(addNews);
  document.querySelector("#newsTable").innerHTML = newsLayout;
}

/**
*
* Function handles user entering feedback and displays it in the iframe
*
 */

function postComment() {
  var name = document.getElementById("userName");
  var message = document.getElementById("userMessage");
  if (name.value == "") {
    name.value = "anonymous";
  }
  var commentsEndPoint = "http://redsox.uoa.auckland.ac.nz/ds/DairyService.svc/comment?name=" + name.value;
  fetch(commentsEndPoint, {
    method: "POST",
    body: JSON.stringify(message.value),
    headers: {
      "Content-Type": "application/json;"
    }
  })
  .then((response) => {
    return response.json();
  })
  .then(() => {
    document.querySelector(".commentSection").src = "http://redsox.uoa.auckland.ac.nz/ds/DairyService.svc/htmlcomments";
  })
}

const guestForm = document.querySelector(".guest-form");
guestForm.addEventListener("submit", e => {
  e.preventDefault();
})
