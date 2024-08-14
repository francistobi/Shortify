document
  .getElementById("signupForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const firstname = document.getElementById("firstname").value;
    const lastname = document.getElementById("lastname").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const user = {
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: password,
    };

    console.log("User signed up:", user);

    fetch("http://localhost:4001/api/v1/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("Success:", data);
        window.location.href = "http://localhost:4001/login";
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });