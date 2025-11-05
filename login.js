function login() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const statusEl = document.getElementById("status");

  if (!email || !password) {
    statusEl.innerText = "Please fill in both fields.";
    return;
  }

  // Firebase sign in
  auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      // store email for any parts of the app that rely on localStorage
      localStorage.setItem("currentUserEmail", user.email);
      statusEl.innerText = "Login successful!";
      setTimeout(() => {
        window.location.href = "dashboard.html";
      }, 1000);
    })
    .catch((err) => {
      console.error(err);
      statusEl.innerHTML =
        `Invalid login. <a href="signup.html">Create an account?</a>`;
    });
}