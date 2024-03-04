const leaderBoard = document.querySelector(".userList");
const leaderBtn = document.querySelector(".leaderBtn");

const leaderBoardList = (user) => {
  const newLi = document.createElement("li");
  newLi.classList = "leaders";
  newLi.innerHTML = `${user.name} - Rs. ${user.totalExpense}`;
  document.querySelector(".userList").appendChild(newLi);
};

leaderBtn.onclick = async (e) => {
  try {
    const users = await axios.get(
      `http://localhost:3000/premiumFeatures/leaderboard`,
      { Authorization: token }
    );
    if (
      document.querySelector(".userList h2") &&
      document.querySelector(".leaders")
    ) {
      document.querySelector(".leaderBoard h2").remove();
      document.querySelector(".leaders").remove();
    }
    document.querySelector(
      ".leaderBoard"
    ).innerHTML = `<div class="leader-header"><h3>🏆 Leader Board:</h3></div><ol class="userList"></ol>`;
    users.data.forEach((user) => {
      leaderBoardList(user);
    });
  } catch (err) {
    console.log(err);
  }
};
