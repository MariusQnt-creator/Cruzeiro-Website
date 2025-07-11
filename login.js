function login() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const storedPassword = localStorage.getItem(email);

  if (!email || !password) {
    document.getElementById("status").innerText = "Please fill in both fields.";
    return;
  }

  if (storedPassword === password) {
    document.getElementById("status").innerText = "Login successful!";
    setTimeout(() => {
      window.location.href = "dashboard.html";
    }, 1000);
  } else {
    document.getElementById("status").innerHTML = 
      `Invalid login. <a href="signup.html">Create an account?</a>`;
  }
}