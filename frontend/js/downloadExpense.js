const downloadExpenses = document.querySelector('.downloadExpenses');

downloadExpenses.addEventListener('click', downloadFunction);
async function downloadFunction(e) {
    try {
        const UserExpenses = await axios.get('http://13.48.27.91:3000/expenses/download', { headers: { Authorization: token } });
        console.log(UserExpenses.data);
        if (UserExpenses.data.success === true) {
            const a = document.createElement('a');
            a.href = UserExpenses.data.fileURL;
            a.download = 'myexpense.txt';   // file name will not be changed due to this -> as AWS file is from CROSS-ORIGIN
            a.click();
        }
    }
    catch (err) {
        console.log(err);
    }
}