function returnvalidateForm()
{
var username = document.getElementById("username").value;
var password = document.getElementById("password").value;
if(username == "apple123" && password == "apple")
    {
        window.open('home.html');
        return true;
    }
    else if(username !== "apple123" && password !== "apple")
    {
        alert("Incorrect password or Username");
        return false;
    }
}


