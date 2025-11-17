const questions = document.querySelectorAll(".QA");

questions.forEach(q => {
  q.addEventListener("click", () => {


    document.querySelectorAll(".response").forEach(r => {
      if (r !== q.querySelector(".response")) r.classList.add("hidden");
    });


    q.querySelector(".response").classList.toggle("hidden");
  });
});
