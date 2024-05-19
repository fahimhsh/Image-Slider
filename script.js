const initSlider = () => {
  const imageList = document.querySelector(".image-list");
  const slideButtons = document.querySelectorAll(".slide-button");
  const sliderScrollbar = document.querySelector(".slide-scrollbar");
  const scrollbarThumb = document.querySelector(".scrollbar-thumb");
  const maxScrollLeft = imageList.scrollWidth - imageList.clientWidth;

  scrollbarThumb.addEventListener("mousedown", (e) => {
    const startX = e.clientX;
    const thumbPosition = scrollbarThumb.offsetLeft;

    //Update thum position on mousemove
    const handleMouseMove = (e) => {
      const deltaX = e.clientX - startX;
      const newThumbPosition = thumbPosition + deltaX;
      const maxThumbPosition =
        sliderScrollbar.getBoundingClientRect().width -
        scrollbarThumb.offsetWidth;

      const boundedPosition = Math.max(
        0,
        Math.min(maxThumbPosition, newThumbPosition),
      );
      const scrollPosition =
        (boundedPosition / maxThumbPosition) * maxScrollLeft;

      scrollbarThumb.style.left = `${boundedPosition}px`;
      imageList.scrollLeft = scrollPosition;
    };

    //Remove event listener on mouseup
    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    //Event listener for drag interaction
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  });

  //Slide according to slide button click
  slideButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const direction = button.id === "prev-slide" ? -1 : 1;
      const scrollAmount = imageList.clientWidth * direction;
      imageList.scrollBy({ left: scrollAmount, behavior: "smooth" });
    });
  });

  //Function that handles appearence of slide buttons
  slideButtons[0].style.display = "none";
  const handleSlideButtons = () => {
    slideButtons[0].style.display =
      imageList.scrollLeft <= 0 ? "none" : "block";
    slideButtons[1].style.display =
      imageList.scrollLeft >= maxScrollLeft ? "none" : "block";

    if (document.body.offsetWidth < 1023) {
      slideButtons.forEach((e) => {
        e.style.display = "none";
      });
    }
  };

  //Update scrollbar thumb position based on user's scroll
  const updateScrollThumbPosition = () => {
    const scrollPosition = imageList.scrollLeft;
    const thumbPosition =
      (scrollPosition / maxScrollLeft) *
      (sliderScrollbar.clientWidth - scrollbarThumb.offsetWidth);
    scrollbarThumb.style.left = `${thumbPosition}px`;
  };

  //Functions to be called at every scroll
  imageList.addEventListener("scroll", () => {
    handleSlideButtons();
    updateScrollThumbPosition();
  });
};

window.addEventListener("load", initSlider);
