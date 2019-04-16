(function() {
    new Vue({
        el: "#main",
        data: {
            images: [],
            form: {
                title: "",
                description: "",
                username: "",
                file: null
            }
        },
        mounted: function() {
            var self = this;
            console.log(this.images);
            axios.get("/get-info").then(function(resp) {
                self.images = resp.data;
                console.log(self.images);
            });
        },
        methods: {
            handleFileChange: function(e) {
                console.log(e.target.files[0]);
                this.form.file = e.target.files[0];
            },
            uploadFile: function() {
                var formData = new FormData();
                formData.append("file", this.form.file);
                formData.append("username", this.form.username);
                formData.append("title", this.form.title);
                formData.append("description", this.form.description);

                var self = this;
                axios.post("/upload", formData).then(function(resp) {
                    self.images.unshift(resp.data[0]);
                });
            }
        }
    });
})();
