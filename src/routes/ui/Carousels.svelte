<script lang="ts">
	let elemCarousel: HTMLDivElement;
	const unsplashIds = [
		'https://rtdjvfvzmmlnyahskscf.supabase.co/storage/v1/object/sign/photos/Slideshow/IMG_0004.JPG?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJwaG90b3MvU2xpZGVzaG93L0lNR18wMDA0LkpQRyIsImlhdCI6MTcwNDMzNTgwNywiZXhwIjoyMDE5Njk1ODA3fQ.f0IfWx2OuKitprmCcKHU5QHDrEFmT8UXorCIiFtqFOI',
		'https://rtdjvfvzmmlnyahskscf.supabase.co/storage/v1/object/sign/photos/Slideshow/IMG_0132.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJwaG90b3MvU2xpZGVzaG93L0lNR18wMTMyLmpwZyIsImlhdCI6MTcwNDMzNTk5MSwiZXhwIjoxNzA0OTQwNzkxfQ.IciX-vwbbZ1qKkDUJKVCsBeqwYFqHtvEERviwRJYo6U&t=2024-01-04T02%3A39%3A51.805Z',
		'https://rtdjvfvzmmlnyahskscf.supabase.co/storage/v1/object/public/photos/Slideshow/IMG_0179.JPG',
		'https://rtdjvfvzmmlnyahskscf.supabase.co/storage/v1/object/public/photos/Slideshow/IMG_8952.jpg',
		'https://rtdjvfvzmmlnyahskscf.supabase.co/storage/v1/object/public/photos/Slideshow/IMG_4815%202.jpeg?t=2024-01-04T17%3A56%3A09.060Z',
		'https://rtdjvfvzmmlnyahskscf.supabase.co/storage/v1/object/public/photos/Slideshow/IMG_4814.jpeg'
	];
	function carouselRight(): void {
		const x =
			elemCarousel.scrollLeft === elemCarousel.scrollWidth - elemCarousel.clientWidth
				? 0 // loop
				: elemCarousel.scrollLeft + elemCarousel.clientWidth; // step right
		elemCarousel.scroll(x, 0);
	}

	function carouselLeft(): void {
		const x =
			elemCarousel.scrollLeft === 0
				? elemCarousel.clientWidth * elemCarousel.childElementCount // loop
				: elemCarousel.scrollLeft - elemCarousel.clientWidth; // step left
		elemCarousel.scroll(x, 0);
	}
</script>

<div class=" p-4 grid grid-cols-[auto_1fr_auto] gap-4 items-center">
	<!-- Button: Left -->
	<button type="button" class="btn-icon variant-filled-primary" on:click={carouselLeft}>
        <i class="fa-solid fa-arrow-right"> - </i>
	</button>
	<!-- Full Images -->
	<div bind:this={elemCarousel} class="snap-x snap-mandatory scroll-smooth flex overflow-x-auto">
		{#each unsplashIds as unsplashId}
			<img
				class="snap-center w-[1024px] rounded-container-token"
				src={unsplashId}
				alt={unsplashId}
				loading="lazy"
			/>
		{/each}
	</div>
	<!-- Button: Right -->
	<button type="button" class="btn-icon variant-filled-primary" on:click={carouselRight}>
        <i class="fa-solid fa-arrow-right">-></i>
	</button>
</div>
