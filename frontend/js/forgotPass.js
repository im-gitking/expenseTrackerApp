const forgotPassForm = document.querySelector('.forgotPass');
const email = document.querySelector('#email');

forgotPassForm.addEventListener('submit', forgotPassActions);
async function forgotPassActions(e) {
    try {
        e.preventDefault();
        const response = await axios.post('http://13.48.27.91:3000/password/forgotpassword', {
            email: email.value
        });
        forgotPassForm.remove();
        document.querySelector('.newUser').remove();
        document.querySelector('main').innerHTML = `<p>${response.data.message}</p>`
    }
    catch(err) {
        console.log(err);
    }
}