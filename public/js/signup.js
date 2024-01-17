const signupForm = document.querySelector('.signupForm');
const name = document.querySelector('#name');
const email = document.querySelector('#email');
const password = document.querySelector('#password');

// signup data submission
signupForm.addEventListener('submit', signupSubmit);
async function signupSubmit(e) {
    e.preventDefault();
    try {
        const signupSubmitedData = await axios.post(`http://localhost:3000/user/signup`, {
            name: name.value,
            email: email.value,
            password: password.value
        });
        // console.log(signupSubmitedData.data);
        if (!alert(signupSubmitedData.data.message)) {
            window.location.href = 'login.html';
        }

    }
    catch (err) {
        if (err.response.status === 302) {
            // console.log(err.response.data.message);
            if (!alert(err.response.data.message)) {
                location.reload();
            }
        }
        else {
            console.log(err);
        }
    }
}