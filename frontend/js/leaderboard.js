const leaderBoard = document.querySelector('.userList');
const leaderBtn = document.querySelector('.leaderBtn');

const leaderBoardList = (user) => {
    const newLi = document.createElement('li');
    newLi.classList = 'leaders';
    newLi.innerHTML = `${user.name} - Rs. ${user.totalExpense}`;
    document.querySelector('.userList').appendChild(newLi);
}

leaderBtn.onclick = async (e) => {
    try {
        const users = await axios.get(`http://13.48.27.91:3000/premiumFeatures/leaderboard`, { Authorization: token });
        if(document.querySelector('.userList h2') && document.querySelector('.leaders')) {
            document.querySelector('.userList h2').remove();
            document.querySelector('.leaders').remove();
        }
        document.querySelector('.userList').innerHTML = `<h2>Leader Board:</h2>`;
        users.data.forEach(user => {
            leaderBoardList(user);
        });
    }
    catch (err) {
        console.log(err);
    }
}