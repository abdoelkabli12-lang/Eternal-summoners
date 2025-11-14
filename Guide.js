const questions = document.querySelectorAll(".QA");

questions.forEach(q => {
  q.addEventListener("click", () => {

    // Close all other responses
    document.querySelectorAll(".response").forEach(r => {
      if (r !== q.querySelector(".response")) r.classList.add("hidden");
    });

    // Toggle clicked one
    q.querySelector(".response").classList.toggle("hidden");
  });
});
