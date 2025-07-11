function signup() {
  const email = document.getElementById("signup-email").value.trim();
  const password = document.getElementById("signup-password").value;

  if (!email || !password) {
    document.getElementById("signup-status").innerText = "Please fill in all fields.";
    return;
  }

  if (!email.includes("@")) {
    document.getElementById("signup-status").innerText = "Please enter a valid email address.";
    return;
  }

  if (localStorage.getItem(email)) {
    document.getElementById("signup-status").innerText = "Account already exists. Try logging in.";
    return;
  }

  localStorage.setItem(email, password);
  document.getElementById("signup-status").innerText = "Account created! Redirecting...";

  setTimeout(() => {
    window.location.href = "index.html";
  }, 1500);
}