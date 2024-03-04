const resetPassForm = document.querySelector(".resetPass");
const newPassoword = document.querySelector("#passoword");

// get reset id
let url = window.location.href;
let params = new URL(url).searchParams;
const resetId = params.get("id");
console.log(resetId);

// change password
resetPassForm.addEventListener("submit", changePassword);
async function changePassword(e) {
  e.preventDefault();
  try {
    const response = await axios.post(
      `http://localhost:3000/password/resetpassword/${resetId}`,
      {
        password: newPassoword.value,
      }
    );
    console.log(response.data.uuid);
    if (response.data.uuid != undefined) {
      if (!alert("Password Changed Successfully.")) {
        window.location.href = "login.html";
      }
    } else {
      if (!alert("Invalid Reset Link, Try Again.")) {
        window.location.href = "forgotPass.html";
      }
    }
  } catch (err) {
    console.log(err);
  }
}
