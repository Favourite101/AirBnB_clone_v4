$(document).ready(function() {
    // Variable to store selected amenity IDs
    const selectedAmenities = [];
  
    // Listen for changes on all amenity checkboxes
    $('.amenities input[type="checkbox"]').change(function() {
      const amenityId = $(this).data('id'); // Get amenity ID from data attribute
  
      if ($(this).is(':checked')) {
        // Add amenity ID to the list if checkbox is checked
        selectedAmenities.push(amenityId);
      } else {
        // Remove amenity ID from the list if checkbox is unchecked
        const index = selectedAmenities.indexOf(amenityId);
        if (index > -1) {
          selectedAmenities.splice(index, 1);
        }
      }
  
      // Update h4 tag with the list of selected amenity names
      let amenityNames = "";
      if (selectedAmenities.length > 0) {
        amenityNames = `(${selectedAmenities.join(', ')})`;
      }
      $('.amenities h4').text(amenityNames);
    });
  });
  