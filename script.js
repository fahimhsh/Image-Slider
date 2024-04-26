const initSlider = () => {
	const slideButtons = document.querySelectorAll(".slide-button");
	const imageList = document.querySelector(".image-list");
	const sliderScrollbar = document.querySelector(".slide-scrollbar");
	const scrollbarThumb = sliderScrollbar.querySelector(".scrollbar-thumb");
	const maxScrollWidth = imageList.scrollWidth - imageList.clientWidth;

	scrollbarThumb.addEventListener("mousedown", (e) => {
		const startX = e.clientX;
		const thumbPosition = scrollbarThumb.offsetLeft;

		// Update thumb position on mousemove
		const handleMousemove = (e) => {
			const deltaX = e.clientX - startX;
			const newThumbPosition = thumbPosition + deltaX;
			const maxThumbPosition =
				sliderScrollbar.getBoundingClientRect().width -
				scrollbarThumb.offsetWidth;

			const boundedPosition = Math.max(
				0,
				Math.min(maxThumbPosition, newThumbPosition)
			);
			const scrollPosition =
				(boundedPosition / maxThumbPosition) * maxScrollWidth;

			scrollbarThumb.style.left = `${boundedPosition}px`;
			imageList.scrollLeft = scrollPosition;
		};

		// Removes event listeners after releasing mouse
		const handleMouseup = () => {
			document.removeEventListener("mousemove", handleMousemove);
			document.removeEventListener("mouseup", handleMouseup);
		};

		// Add event listener for Drag interactions
		document.addEventListener("mousemove", handleMousemove);
		document.addEventListener("mouseup", handleMouseup);
	});

	// Slide images according to the targetted button
	slideButtons.forEach((button) => {
		button.addEventListener("click", () => {
			const direction = button.id === "prev-slide" ? -1 : 1;
			const scrollAmount = imageList.clientWidth * direction;
			imageList.scrollBy({ left: scrollAmount, behavior: "smooth" });
		});
	});

	const handleScrollBtn = () => {
		slideButtons[0].style.display =
			imageList.scrollLeft <= 0 ? "none" : "block";
		slideButtons[1].style.display =
			imageList.scrollLeft >= maxScrollWidth ? "none" : "block";
	};

	//Update scrollbar position based on scrollwidth
	const updateScrollThumbPosition = () => {
		const scrollPosition = imageList.scrollLeft;
		const thumbPosition =
			(imageList.scrollLeft / maxScrollWidth) *
			(sliderScrollbar.clientWidth - scrollbarThumb.offsetWidth);

		scrollbarThumb.style.left = `${thumbPosition}px`;
	};

	imageList.addEventListener("scroll", () => {
		handleScrollBtn();
		updateScrollThumbPosition();
	});
};

window.addEventListener("load", initSlider);
