/* globals $ */

// Function for find challenge field - Uses text to search challenges by name
export function findChallenges() {
	const text = $(this).val();

	// Look through each row to find match for a value in input field -- display none for all things that are not that
	$('#table-body tr').toArray().forEach((row) => {
		if (text) {
			let title = row.cells[2].innerText.toLowerCase();

			if (title.includes(text.toLowerCase())) {
				row.style.display = 'table-row';
			} else {
				row.style.display = 'none';
			}

		} else {
			row.style.display = 'table-row';
		}
	});
}
