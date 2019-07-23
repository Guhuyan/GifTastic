$(document).ready(function(){
    var topics = ["Cat", "Dog", "Bird"];

    function remakeButtons() {
      $(".btn").remove();
      for (let i = 0; i < topics.length; i++) {
        $(".buttons").append(`
        <button class="btn" topic="${topics[i]}">${topics[i]}</button>
        `)
      }
    };

    $("#submit").on("click", function(event) {
        event.preventDefault();
        let query = $("#query-input").val().trim();
          $("#query-input").val("");
        let queryURL = `http://api.giphy.com/v1/gifs/search?api_key=tjLr9Q7fD2Ji4Z8r2WFxFSr4M8y10Ve7&q=${query}&rating=&limit=10`;

        // Push to query value into topics array and call function to remake buttons
        topics.push(query);
        console.log(topics);
        remakeButtons();

        $.ajax({
          url: queryURL,
          method: "GET"
          }).then(function(response) {
            console.log("success got data", response);
            let img = response.data;
            // Loop through and fill with 10 query images
            for (let i = 0; i < img.length; i++) {
              // Using template literals to append elements, class, and attibutes into the <div> with class giphy-container.
              $(".giphy-container").append(`
              <div class="gif-item">
              <img class="gif" src="${img[i].images.fixed_height_still.url}" image-still="${img[i].images.fixed_height_still.url}" image-animate="${img[i].images.fixed_height.url}" image-state="still" alt="${query} image">
              <div class="rating">${img[i].rating}</div>
              </div>
              `)
            }
          });
    });

    $(document).on("click", ".btn", function() {
      let query = $(this).attr("topic");
      let queryURL = `http://api.giphy.com/v1/gifs/search?api_key=tjLr9Q7fD2Ji4Z8r2WFxFSr4M8y10Ve7&q=${query}&rating=&limit=10`;

      $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
        console.log("success got data", response);
          let img = response.data;
          // Loop through and fill with 10 query images
          for (let i = 0; i < img.length; i++) {
            // Using template literals to append elements, class, and attibutes into the <div> with class giphy-container.
            $(".giphy-container").append(`
            <div class="gif-item">
            <img class="gif" src="${img[i].images.fixed_height_still.url}" image-still="${img[i].images.fixed_height_still.url}" image-animate="${img[i].images.fixed_height.url}" image-state="still" alt="${query} image">
            <div class="rating">${img[i].rating}</div>
            </div>
            `)
          }
      });
    });
    
    /* When an element with class "gif" is clicked, get the attribute "image-state" from the element that has been clicked and set it equal to a variable.
    If this variable has "still" as a value, then change the value of the src attribute to the value in the image-animate attribute and change the image-state attribute 
    to 'animate'.  Else, the variable must have "animate" in its value.  This time, change the element's attributes back to their original value.*/
    $(document).on("click", ".gif", function() {
      let imgState = $(this).attr("image-state");
      if (imgState === "still") {
        $(this).attr("src", $(this).attr("image-animate"));
        $(this).attr("image-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("image-still"));
        $(this).attr("image-state", "still");
      }
    });
});