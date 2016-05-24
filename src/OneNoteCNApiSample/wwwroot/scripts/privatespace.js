(function () {
    var authContext = new AuthenticationContext(config);

    var $message = $("#privateSpaceMessage");
    var $privateSpaceButton = $("#privateSpaceButton");

    function createPrivateSpace(authToken) {
        $.ajax({
            type: "PATCH",
            url: "https://www.onenote.com/api/v1.0/me/notes/classNotebooks/" + $("#privateSpaceSelect").val(),
            dataType: "json",
            contentType: "application/json",
            headers: {
                "Authorization": "Bearer " + authToken
            },
            data: JSON.stringify({ "hasTeacherOnlySectionGroup": "true" })
        }).done(function () {
            $message.html("Teacher-only section group successfully created!");
        }).fail(function () {
            $message.html("Error: could not create private space.");
        });
    };

    function clearMessage() {
        $message.empty();
    }

    $privateSpaceButton.click(function () {
        clearMessage();
        authContext.acquireToken("https://onenote.com/", function (error, authToken) {
            if (error || !authToken) {
                $message.html(error);
            }
            createPrivateSpace(authToken);
        });
    });
}());