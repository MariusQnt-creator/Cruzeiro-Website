function signup() {
  const email = document.getElementById("signup-email").value.trim();
  const password = document.getElementById("signup-password").value;
  const statusEl = document.getElementById("signup-status");

  if (!email || !password) {
    statusEl.innerText = "Please fill in all fields.";
    return;
  }

  if (!email.includes("@")) {
    statusEl.innerText = "Please enter a valid email address.";
    return;
  }

  if (!window.auth) {
    statusEl.innerText = "Firebase not initialized. Check firebase-init.js.";
    return;
  }

  // Create user in Firebase Authentication
  auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      // keep compatibility with other scripts
      localStorage.setItem("currentUserEmail", user.email);

      // write a small user profile record in the Realtime DB (optional)
      try {
        const emailKey = (window.emailToKey && typeof window.emailToKey === 'function')
          ? emailToKey(user.email)
          : user.uid;
        database.ref('users/' + emailKey).set({
          uid: user.uid,
          email: user.email,
          createdAt: new Date().toISOString()
        }).catch(() => { /* non-fatal */ });
      } catch (e) {
        console.warn('Could not write user profile:', e);
      }

      statusEl.innerText = "Account created! Redirecting...";
      setTimeout(() => {
        window.location.href = "index.html";
      }, 1500);
    })
    .catch((err) => {
      console.error(err);
      // friendly message for common errors
      if (err.code === 'auth/email-already-in-use') {
        statusEl.innerText = "This email is already in use. Try logging in.";
      } else if (err.code === 'auth/weak-password') {
        statusEl.innerText = "Password is too weak. Use at least 6 characters.";
      } else {
        statusEl.innerText = err.message || "Failed to create account.";
      }
    });
}