const fileInputs = document.querySelectorAll(".file-input");

fileInputs.forEach(input => {

    input.addEventListener("change", function () {

        const file = this.files[0];

        if (!file) return;

        const maxSize = 30 * 1024 * 1024;

        const allowedTypes = [
            "application/pdf",
            "image/jpeg",
            "image/jpg",
            "image/png"
        ];

        if (file.size > maxSize) {
            alert("File size must be less than 30 MB.");
            this.value = "";
            return;
        }

        if (!allowedTypes.includes(file.type)) {
            alert("Only PDF, JPG, JPEG and PNG files are allowed.");
            this.value = "";
        }
    });

});

document
.getElementById("doctorForm")
.addEventListener("submit", function(e){

    e.preventDefault();

    alert(
        "Doctor Registration Submitted Successfully!"
    );

});