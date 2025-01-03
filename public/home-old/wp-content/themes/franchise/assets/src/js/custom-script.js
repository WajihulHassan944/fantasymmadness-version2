jQuery(document).ready(function($) {
    function fetch_locations(search_location = '', manual_search = 'false') {
        $.ajax({
            type: 'POST',
            url: ajax_object.ajax_url,
            beforeSend: function() {
                $('.from-loader').css('display', 'block');
                $('#search-button').prop('disabled', true);
                $('.nearest_club_list').css('display', 'none');
                $('.error_response, .matched-locations').empty();
            },
            data: {
                action: 'fetch_clubs',
                search_location: search_location,
                manual_search: manual_search,
            },
            success: function(response) {
                $('#search-button').prop('disabled', false);
                if (response.success) {

                    var locations = response.data;
                    console.log(locations);
                    var output = '<ul>';
                    locations.forEach(function(location) {
                        var clubName = Object.keys(location)[0];
                        var clubInfo = location[clubName];
                        var contactNumberLink = clubInfo.contact_number.replace(/[-\s]/g, '');
                        // var contactNumberLink = clubInfo.contact_number ? clubInfo.contact_number.replace(/[-\s]/g, '') : 'N/A';
                        output += '<li>';
                        output += '<h3><span class="loc-icon address-icon"><svg xmlns="http://www.w3.org/2000/svg" width="17.559" height="20" viewBox="0 0 17.559 24.901"><path id="Icon_material-location-on" data-name="Icon material-location-on" d="M15.779,3A8.273,8.273,0,0,0,7.5,11.279c0,6.209,8.279,15.376,8.279,15.376s8.279-9.166,8.279-15.376A8.273,8.273,0,0,0,15.779,3Zm0,11.236a2.957,2.957,0,1,1,2.957-2.957A2.958,2.958,0,0,1,15.779,14.236Z" transform="translate(-7 -2.5)" fill="none" stroke="#16b4ca" stroke-width="1"></path></svg></span> ' + clubName + ' </h3>';
                        output += '<p>' + clubInfo.address + '</p>';
                        output += '<p>' + clubInfo.locality + ', ' + clubInfo.region + ' ' + clubInfo.postalcode + '</p>';
                        output += '<p><span class="loc-icon phone-icon"><svg xmlns="http://www.w3.org/2000/svg" width="24.61" height="16" viewBox="0 0 24.61 24.657"><path id="Icon_feather-phone" data-name="Icon feather-phone" d="M26.776,20.71v3.561a2.374,2.374,0,0,1-2.588,2.374A23.492,23.492,0,0,1,13.944,23a23.147,23.147,0,0,1-7.122-7.122A23.491,23.491,0,0,1,3.177,5.588,2.374,2.374,0,0,1,5.54,3H9.1a2.374,2.374,0,0,1,2.374,2.042,15.241,15.241,0,0,0,.831,3.336,2.374,2.374,0,0,1-.534,2.5l-1.508,1.508a18.993,18.993,0,0,0,7.122,7.122L18.894,18a2.374,2.374,0,0,1,2.5-.534,15.241,15.241,0,0,0,3.336.831A2.374,2.374,0,0,1,26.776,20.71Z" transform="translate(-2.667 -2.5)" fill="none" stroke="#16b4ca" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"></path></svg></span><a href="tel:' + contactNumberLink + '">' + contactNumberLink + ' </a></p>';
                        output += '<p><svg xmlns="http://www.w3.org/2000/svg" width="24.62" height="16" viewBox="0 0 24.62 20.088">';
                        output += '<path id="Icon_awesome-envelope" data-name="Icon awesome-envelope" d="M23.173,10.723a.278.278,0,0,1,.447.217v9.434a2.215,2.215,0,0,1-2.214,2.214H2.214A2.215,2.215,0,0,1,0,20.374v-9.43a.276.276,0,0,1,.447-.217c1.033.8,2.4,1.822,7.109,5.241.973.71,2.616,2.205,4.253,2.2,1.647.014,3.322-1.513,4.258-2.2C20.774,12.55,22.139,11.526,23.173,10.723ZM11.81,15.31c1.07.018,2.611-1.347,3.386-1.91,6.122-4.443,6.588-4.83,8-5.937a1.1,1.1,0,0,0,.424-.872V5.714A2.215,2.215,0,0,0,21.406,3.5H2.214A2.215,2.215,0,0,0,0,5.714v.877a1.111,1.111,0,0,0,.424.872c1.412,1.1,1.878,1.495,8,5.937C9.2,13.963,10.74,15.328,11.81,15.31Z" transform="translate(0.5 -3)" fill="none" stroke="#16b4ca" stroke-width="1"></path>';
                        output += '</svg><a href="mailto:' + clubInfo.email_address + '"> ' + clubInfo.email_address + '</a></p>';
                        output += '<p class="club-btn"><a href="' + clubInfo.club_url + '" target="_blank"> Select Club </a></p>';
                        output += '</li>';
                    });
                    output += '</ul>';
                    $('.matched-locations').html(output).css('display', 'block');
                    $('.nearest_club_list').css('display', 'block');
                    $('.from-loader').css('display', 'none');
                } else {
                    $('.error_response').html(response.data.message);
                    $('.from-loader').css('display', 'none');
                }
            }
        });
    }
    fetch_locations();

    $('#search-button').on('click', function(e) {
        e.preventDefault();
        var search_location = $('#search_location').val();
        var trimmed_location_data = $.trim(search_location);

        if (trimmed_location_data.length >= 3) {
            fetch_locations(trimmed_location_data, 'true');
        } else {
            $('.error_response').html("Please enter a correct location with at least 3 characters.");
        }
    });

    $("#search_club_form").on("submit", function(event) {
        event.preventDefault(); // Prevent form from submitting the traditional way
        $("#search-button").click(); // Trigger search button click
    });

    // Trigger search button click on Enter key press
    $("#search_location").on("keydown", function(event) {
        if (event.key === "Enter") {
            event.preventDefault(); // Prevent default Enter key behavior
            $("#search-button").click(); // Trigger search button click
        }
    });

});