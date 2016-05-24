(function () {
    // Authenticate user using the ADAL for JavaScript library. For more information see
    // https://github.com/AzureAD/azure-activedirectory-library-for-js
    window.config = {
        clientId: "[Enter your clientId here]",
        postLogoutRedirectUri: window.location.origin,
        cacheLocation: 'localStorage'
    };
    var authContext = new AuthenticationContext(config);

    if (authContext.isCallback(window.location.hash)) {
        authContext.handleWindowCallback();
    }

    // Get handles to UI elements
    var $loginButton = $("#loginButton");
    var $logoutButton = $("#logoutButton");
    var $errorMessage = $("#errorMessage");

    // Register callbacks
    $loginButton.click(function() {
        authContext.login();
    });
    $logoutButton.click(function () {
        authContext.logOut();
    });

    var user = authContext.getCachedUser();
    if (user) {
        $loginButton.hide();
        $logoutButton.show();
        $("#demoArea").show();

        authContext.acquireToken("https://onenote.com/", function(error, token) {
            if (error || !token) {
                $errorMessage.html(error);
            }

            $.ajax({
                type: "GET",
                url: "https://www.onenote.com/api/v1.0/me/notes/classNotebooks",
                dataType: "json",
                headers: {
                    "Authorization": "Bearer " + token
                }
            }).done(function (response) {
                // Display class notebooks list
                var listElements = [];
                $.each(response.value, function(i, item) {
                    listElements.push('<li><a href="' + item.links.oneNoteWebUrl.href + '">' + item.name + '</a></li>');
                });
                $("#classNotebooksList").append(listElements.join(''));

                // Populate drop down menus
                var dropDownMenuElements = [];
                $.each(response.value, function (i, item) {
                    dropDownMenuElements.push('<option value="' + item.id + '">' + item.name + '</option>');
                });
                $(".classNotebooksDropDown").append(dropDownMenuElements.join(''));

                $("#loading").hide();
                $("#demos").show();
            }).fail(function() {
                $errorMessage.html("Error when trying to access class notebooks");
            });
        });
    }
}());