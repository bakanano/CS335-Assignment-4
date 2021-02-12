var signedIn = false;
var loginUsername = document.getElementById("loginUsername");
var loginPassword = document.getElementById("loginPassword");

window.onload = () => {
  showHomeTab();
  document.getElementById("userName").value = "";
  document.getElementById("userMessage").value = "";
};

function showHomeTab() {
  document.getElementById("home").style.display = "block";
  document.getElementById("products").style.display = "none";
  document.getElementById("location").style.display = "none";
  document.getElementById("news").style.display = "none";
  document.getElementById("guest").style.display = "none";
  document.getElementById("register").style.display = "none";
  document.getElementById("signin").style.display = "none";
}

function showProductsTab() {
  document.getElementById("home").style.display = "none";
  document.getElementById("products").style.display = "block";
  document.getElementById("itemsTable").style.display = "block";
  getItems("itemTable");
  document.getElementById("location").style.display = "none";
  document.getElementById("news").style.display = "none";
  document.getElementById("guest").style.display = "none";
  document.getElementById("register").style.display = "none";
  document.getElementById("signin").style.display = "none";
}

function showLocationTab() {
  document.getElementById("home").style.display = "none";
  document.getElementById("products").style.display = "none";
  document.getElementById("location").style.display = "block";
  document.getElementById("news").style.display = "none";
  document.getElementById("guest").style.display = "none";
  getLocations();
  document.getElementById("register").style.display = "none";
  document.getElementById("signin").style.display = "none";
}

function showNewsTab() {
  document.getElementById("home").style.display = "none";
  document.getElementById("products").style.display = "none";
  document.getElementById("location").style.display = "none";
  document.getElementById("news").style.display = "block";
  getNews("newsTable");
  document.getElementById("guest").style.display = "none";
  document.getElementById("register").style.display = "none";
  document.getElementById("signin").style.display = "none";
}

function showGuestTab() {
  document.getElementById("home").style.display = "none";
  document.getElementById("products").style.display = "none";
  document.getElementById("location").style.display = "none";
  document.getElementById("news").style.display = "none";
  document.getElementById("guest").style.display = "block";
  document.getElementById("register").style.display = "none";
  document.getElementById("signin").style.display = "none";
}

function showRegisterTab() {
  document.getElementById("home").style.display = "none";
  document.getElementById("products").style.display = "none";
  document.getElementById("location").style.display = "none";
  document.getElementById("news").style.display = "none";
  document.getElementById("guest").style.display = "none";
  document.getElementById("register").style.display = "block";
  document.getElementById("signin").style.display = "none";
}

function showSignInTab() {
  document.getElementById("home").style.display = "none";
  document.getElementById("products").style.display = "none";
  document.getElementById("location").style.display = "none";
  document.getElementById("news").style.display = "none";
  document.getElementById("guest").style.display = "none";
  document.getElementById("register").style.display = "none";
  document.getElementById("signin").style.display = "block";
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
  var json = data;
  let items = "";

  for (var key in json) {
    var url = "http://redsox.uoa.auckland.ac.nz/ds/DairyService.svc/itemimg?id=" + json[key].ItemId;
    var img = `<img class="itemImg" src="` + url + `">`;
    var itemTitle = json[key].Title;
    var itemPrice = json[key].Price;
    var itemOrigin = json[key].Origin;
    var id = json[key].ItemId;

    
    items +=
    img + 
    "<h2>" + itemOrigin + "</h2>" + 
    "<h2 id=`itemTitle`>" + itemTitle + "</h2>" +
    "<h2>" + "<span>" + "$" + "</span>" + itemPrice + " </h2>" +
    "<button onclick=buyItem(" + id + ")>" +  "Buy Item </button>" + 
    "<hr>";
  }
  document.getElementById("itemsTable").innerHTML = items;
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
  .catch((error) => {
    console.error(error);
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
    var lineArray = line[i].split(":");
    var lineHeaders = lineArray[0].split(";")[0];

    let value;
    if (lineHeaders == "ADR") {
      value = lineArray[1].slice(2, lineArray[1].length); 
      value = lineArray[1].split(";");
      value = value.slice(2, value.length).join(",");
    }
    else {
      value = lineArray[1];
    }
    dictionary[lineHeaders] = value;
  }

  document.getElementById("locationContent").innerHTML = dictionary["ADR"] + "<br>" + 
  "<a href=mailto:" + dictionary["EMAIL"] + ">" + dictionary["EMAIL"] + "</a><br>" + 
  "<a href=tel:" + dictionary["TEL"] + ">" + dictionary["TEL"] + "</a><br>" + 
  "<a href=http://redsox.uoa.auckland.ac.nz/ds/DairyService.svc/vcard>Please add us to your contacts!</a>";
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
  var json = data;
  let items = "";

  for (var key in json) {
    var record = json[key];
    var newsTitle = record.titleField;
    var newsLinkURL = record.linkField;
    var newsImgURL = record.enclosureField.urlField;
    var newsPublishDate = record.pubDateField;
    var newsDescription = record.descriptionField;

    items +=
    "<div class=`newsContent`>" + 
    "<h2>" + `<a href="` + newsLinkURL + `">` + newsTitle + `</a>` + "</h2>" + 
    "<div>" + `<img class="newsImg" src="` + newsImgURL + `" >` + "</div>" + 
    "<div>" + "<h3>" + newsPublishDate + "</h3>" + "</div>" +
    "<p>" + newsDescription + "</p>" + 
    "<hr>" + 
    "</div>";
  }
  document.getElementById("newsTable").innerHTML = items;
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
    document.getElementById("commentSection").src = "http://redsox.uoa.auckland.ac.nz/ds/DairyService.svc/htmlcomments";
  })
}

/**
*
* Function handles registering a user
*
 */
function register() {
  var email = document.getElementById("email").value;
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;
  var formData = {
      "Email": email,
      "Name": username,
      "Password": password
  };
  if (email.length && username.length && password.length > 0) {
  var registerEndpoint = "http://localhost:8188//DairyService.svc/register";
  fetch(registerEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(formData),
  })
  .then((response) => {
      if (response.status === 200) {
        document.getElementById("registerMessage").innerHTML = "Registered!";
        document.getElementById("email").value = "";
        document.getElementById("username").value = "";
        document.getElementById("password").value = "";
      }
      else {
        alert("Registration not successful!");
      }
      return response.json();
    })
  } else {
    alert("All fields must be filled in!");
  }
}

/**
*
* Function handles buying an item when the user is logged in else it directs to sign in page 
*
 */

function buyItem(id) {
  if (loginUsername == "" || loginPassword == "") {
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    var buyEndpoint = "http://localhost:8189/Service.svc/buy?id=" + id;
    xhr.open("GET", buyEndpoint, true, loginUsername, loginPassword);
    xhr.onload = () => {
      if (xhr.status === 200) {
        var xml = xhr.responseText;
        console.log(xml);
      }
    }
  } else {
    showSignInTab();
  }
}

/**
*
* Function displays message when user is signed in or signed out
*
 */

function showSignIn() {
  if (!signedIn) {
    showSignInTab();
  }
  else {
    signedIn = false;
    document.getElementById("signinMessage").innerHTML = "Signed in!";
    loginUsername = "";
    loginPassword = "";
    document.getElementById("signinMessage").innerHTML = "Signed out!";
  }
}

/**
*
* Function handling a registered user sign in 
*
**/

function signIn() {
  loginUsername = document.getElementById("loginUsername").value;
  loginPassword = document.getElementById("loginPassword").value;

  if (loginUsername.length && loginPassword.length > 0) {
    let xhr = new XMLHttpRequest();
    let userEndpoint = "http://localhost:8189/Service.svc/user"; 
		xhr.open("GET", userEndpoint, true, loginUsername, loginPassword);
    xhr.withCredentials = true;
    xhr.onload = () => {
			if (this.status === 200) {
        showProductsTab();
        signedIn = true;
				document.getElementById("signinMessage").innerHTML = "Signed in successful!";
			} else {
				document.getElementById("signinMessage").innerHTML = "Signed in unsuccessful!"; 
			}      
		}
		xhr.send();
	} else {
		alert("Please enter your Username and Password");
	}
}