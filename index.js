new Vue({
    el: '#app',
    data: {
        events: [],
        dic: dc,
        years: []
    },
    created: function () {
        this.fetchData()

        this.formYearsArr();
    },
    methods: {
        formYearsArr: function () {
            const date = new Date();
            const curYear = date.getFullYear();
            for (let i = 2016; i <= curYear; i++){
                this.years.push(i);
            }
        },
        fetchData: function () {
            const url = 'http://127.0.0.1:8080/events.json';
            const xhr = new XMLHttpRequest();
            const self = this;
            xhr.open('GET', url);
            xhr.onload = function () {
                let data = JSON.parse(xhr.responseText);
                //sorting events by field date
                data.sort(function (a, b) {
                    return self.getUnix(a.date) > self.getUnix(b.date) ? 1 : -1;
                });
                self.events = data;
            };
            xhr.send()
        },
        getUnix: function(date) {
          //incoming date string format: dd.mm.yyyy hh:ss
            const o = {
                year : Number(date.slice(6,10)),
                day : Number(date.slice(0,2)),
                month : Number(date.slice(3,5)),
                hours : Number(date.slice(11,13)),
                minutes : Number(date.slice(-2)),
            };
            return  new Date (o.year, o.month, o.day, o.hours, o.minutes);
        },
        translate: function (field, value) {
            return this.dic[field][value];
        }
    },
    computed: {
        filteredEvents: function () {
            let data = this.events.filter( row => {
                return this.getUnix(row.date) > Date.now();
            });
            return data
        }
    }
});