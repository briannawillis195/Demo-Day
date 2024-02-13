var reply = document.getElementsByClassName("fa-plus");
var trash = document.getElementsByClassName("fa-trash");
let modal = document.getElementById("myModal");
let close = document.getElementById("close");

Array.from(reply).forEach(function (element) {
  element.addEventListener("click", function () {
    const [
      name,
      message,
      date,
      replyIcon,
      trashIcon,
    ] = [...this.parentNode.parentNode.childNodes]
      .filter((arr) => arr.nodeName.includes("SPAN"))
      .map((item) => item.innerText.trim());

    modal.style.display = "block";
    if ((modal.style.display = "block")) {
    }
});
});

Array.from(trash).forEach(function (element) {
  element.addEventListener("click", function () {
    const [
      response,
      name,
      message,
      date,
      trashIcon,
    ] = [...this.parentNode.childNodes]
      .filter((arr) => arr.nodeName.includes("SPAN"))
      .map((item) => item.innerText.trim());

    fetch(`/communityforum/deleteMessage/${name}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        response,
        name,
        message,
        date,
        trashIcon,
      }),
    }).then(function (response) {
      window.location.reload();
    });
  });
});

close.addEventListener("click", () => {
  modal.style.display = "none";
});
  

