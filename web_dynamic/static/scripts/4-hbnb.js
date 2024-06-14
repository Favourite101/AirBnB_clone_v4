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
  
    // Check API status on document ready
    $.ajax({
      url: "http://0.0.0.0:5001/api/v1/status",
      success: function(data) {
        if (data.status === "OK") {
          $("#api_status").addClass("available");
        } else {
          $("#api_status").removeClass("available");
        }
      },
      error: function() {
        console.error("Error fetching API status");
        // Optionally add a class or message indicating error
      }
    });
  
    // Fetch places on document ready
    $.ajax({
      url: "http://0.0.0.0:5001/api/v1/places_search",
      method: "POST", // Ensure it's a POST request
      contentType: "application/json",
      data: JSON.stringify({}), // Empty JSON object in the body
      success: function(data) {
        // Clear existing place elements before adding new ones
        $('.section.places').empty();
  
        for (const place of data) {
          // Create article element for each place
          const article = $('<article>');
  
          // Create title_box div
          const titleBox = $('<div class="title_box">');
          titleBox.append(`<h2>${place.name}</h2>`);
          titleBox.append(`<div class="price_by_night">${place.price_by_night}</div>`);
          article.append(titleBox);
  
          // Create information div
          const information = $('<div class="information">');
          information.append(`<div class="max_guest">${place.max_guest} Guest${place.max_guest !== 1 ? 's' : ''}</div>`);
          information.append(`<div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms !== 1 ? 's' : ''}</div>`);
          information.append(`<div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms !== 1 ? 's' : ''}</div>`);
          article.append(information);
  
          // Create description div (without Owner)
          const description = $('<div class="description">');
          description.text(place.description);
          article.append(description);
  
          // Append the article to the places section
          $('.section.places').append(article);
        }
      },
      error: function() {
        console.error("Error fetching places");
        // Optionally add a message indicating error loading places
      }
    });
  });
  