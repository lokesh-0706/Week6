async function me() {
  const token = localStorage.getItem("token");
  console.log(token);
  if (token) {
    const response = await axios.get("http://localhost:3000/me", {
      headers: {
        token: token,
      },
    });
    let logged = false;
    console.log("hi1");
    if (response.data.username) {
      logged = true;
    } else {
      logged = false;
    }
    console.log("hi2");
    if (logged == true) {
      document.getElementById("signin").style.display = "none";
      document.getElementById("signup").style.display = "none";
      document.getElementById("login").style.display = "block";
      document.getElementById("information").innerHTML = response.data.username;
    } else if (logged == false) {
      document.getElementById("signin").style.display = "block";
      document.getElementById("signup").style.display = "block";
      console.log("hi");
      document.getElementById("login").style.display = "none";
    }

    console.log(response.data.username);
  }
}

me();

async function signup() {
  const username = document.getElementById("signup_username").value;
  const password = document.getElementById("signup_password").value;
  console.log(username + password);
  const response = await axios.post("http://localhost:3000/signup", {
    username,
    password,
  });
  console.log(response.data);
}

async function signin() {
  const username = document.getElementById("signin_username").value;
  const password = document.getElementById("signin_password").value;
  const response = await axios.post("http://localhost:3000/signin", {
    username,
    password,
  });
  localStorage.setItem("token", response.data.token);
  console.log(response.data);
}

function logout() {
  localStorage.removeItem("token");
  location.reload();
}
