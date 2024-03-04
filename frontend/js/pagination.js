const paginations = document.querySelector(".paginations");
document.addEventListener("DOMContentLoaded", addPaginations);

// Load Pagination and Expense List accordingly
async function addPaginations(e, targetPage) {
  const pageNum = targetPage || 1;
  const rowNum = localStorage.getItem("rowNum") || 5;

  try {
    const paginationData = await axios.get(
      `http://localhost:3000/expenses/pagination?page=${pageNum}&rows=${rowNum}`,
      { headers: { Authorization: token } }
    );

    // Clear the expense list and add new expenses
    expenseList.innerHTML = "";
    paginationData.data.userExpenses.forEach((expense) => {
      addToExpenseList(expense);
    });

    // Last number of pages
    const lastPageNum = Math.ceil(paginationData.data.totalExpenses / rowNum);
    console.log(paginationData);

    // Add Paginations
    paginations.innerHTML = "";

    if (pageNum > 1) {
      paginations.innerHTML += `<button id="${
        pageNum - 1
      }" class="pageNumber side">< Previous</button>`;
    }

    if (1 < pageNum - 2) {
      paginations.innerHTML += `<button id="1" class="pageNumber">1</button><span> ... </span>`;
    }

    // if pagination's current & first page (or last & current page) has difference of 2+ then add "..." in between
    for (
      let i = Math.max(1, pageNum - 2);
      i <= Math.min(lastPageNum, pageNum + 2);
      i++
    ) {
      if (i === pageNum) {
        paginations.innerHTML += `<button id="${i}" class="pageNumber active"><strong>${i}</strong></button>`;
      } else if (pageNum === 1 + 3 && i === 1 + 1) {
        // 1..2,3,4, -> so skiping 2 here -> 1...3,4
        continue;
      } else if (pageNum === lastPageNum - 3 && i === lastPageNum - 1) {
        // 4,5,6...7 -> so skiping 6 here -> 4,5...7
        continue;
      } else {
        paginations.innerHTML += `<button id="${i}" class="pageNumber">${i}</button>`;
      }
    }

    if (lastPageNum > pageNum + 2) {
      paginations.innerHTML += `<span> ... </span><button id="${lastPageNum}" class="pageNumber">${lastPageNum}</button>`;
    }

    if (pageNum < lastPageNum) {
      paginations.innerHTML += `<button id="${
        pageNum + 1
      }" class="pageNumber side">Next ></button>`;
    }
  } catch (err) {
    console.error(err);
  }
}

// Chnage pagination numbers & Expenses from pagination buttons
paginations.addEventListener("click", (e) => {
  if (e.target.classList.contains("pageNumber")) {
    addPaginations(null, Number(e.target.id));
  }
});

// Dynamic Pagination - Let user choose Expenses numbers per page
const rowsPerPage = document.querySelector(".rowsPerPage #rows");
rowsPerPage.value = localStorage.getItem("rowNum") || 5;

rowsPerPage.addEventListener("change", (e) => {
  const rowNum = e.target.value;
  localStorage.setItem("rowNum", rowNum);
});
