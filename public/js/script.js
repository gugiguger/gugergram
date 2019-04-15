(function() {
    new Vue({
        el: "#main",
        data: {
            images: []
        },
        mounted: function() {
            var self = this;
            axios.get("/get-info").then(function(resp) {
                self.images = resp.data;
            });
        },
        methods: {}
    });
})();
