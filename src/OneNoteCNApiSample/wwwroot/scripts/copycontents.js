(function() {
    var authContext = new AuthenticationContext(config);
    var user = authContext.getCachedUser();
    var sectionSelectorTitle = '<option value="0">Select section to copy</option>';

    // Get copy contents-related UI elements
    var $message = $("#copyContentsMessage");
    var $sourceSelector = $("#copyContentsSelectSource");
    var $sectionSelector = $("#copyContentsSelectSection");
    var $destinationSelector = $("#copyContentsSelectDestination");
    var $copyContentsButton = $("#copyContentsButton");

    $sourceSelector.change(function () {
        if (!user) { return; }

        // Load sections into second drop-down menu. Disable menu until contents are ready.
        $sectionSelector.prop("disabled", true);
        var notebookId = $sourceSelector.val();

        // Don't attempt to load sections if user selected the drop-down title
        if (notebookId === "0") {
            $sectionSelector.html(sectionSelectorTitle);
            return;
        }

        authContext.acquireToken("https://onenote.com/", function (error, authToken) {
            if (error || !authToken) {
                $message.html(error);
            }
            getSections(notebookId, authToken);
        });
    });

    $copyContentsButton.click(function () {
        clearMessage();
        if ($sectionSelector.val() === "0" || $destinationSelector.val() === "0") {
            $message.html("Please select a section to copy and a destination notebook");
            return;
        }
        if ($sourceSelector.val() === $destinationSelector.val()) {
            $message.html("Please select a destination notebook that is different from the source notebook");
            return;
        }

        authContext.acquireToken("https://onenote.com/", function (error, authToken) {
            if (error || !authToken) {
                $message.html(error);
            }
            copyContents($sectionSelector.val(), $destinationSelector.val(), authToken);
        });
    });

    function getSections(notebookId, authToken) {
        $.ajax({
            type: "GET",
            url: "https://www.onenote.com/api/v1.0/me/notes/notebooks/" + notebookId + "/sections",
            dataType: "json",
            headers: {
                "Authorization": "Bearer " + authToken
            }
        }).done(function (response) {
            // Populate second drop-down menu with sections
            var dropDownMenuElements = [sectionSelectorTitle];
            $.each(response.value, function (i, item) {
                dropDownMenuElements.push('<option value="' + item.id + '">' + item.name + '</option>');
            });
            $sectionSelector.html(dropDownMenuElements.join(''));
            $sectionSelector.prop("disabled", false);
        }).fail(function () {
            $message.html("Error: could not get the list of section groups for the selected notebook.");
        });
    }

    function copyContents(sectionId, destinationNotebookId, authToken) {
        $.ajax({
            type: "POST",
            url: "https://www.onenote.com/api/beta/me/notes/classNotebooks/" + destinationNotebookId + "/copySectionsToContentLibrary",
            contentType: "application/json",
            headers: {
                "Authorization": "Bearer " + authToken
            },
            data: JSON.stringify({ "sectionIds": [sectionId] })
        }).done(function () {
            $message.html("Section successfully copied to target notebook!");
        }).fail(function () {
            $message.html("Error: could not copy sections to destination notebook.");
        });
    }

    function clearMessage() {
        $message.empty();
    }
}());