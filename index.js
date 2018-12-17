Vue.component('v-select', VueSelect.VueSelect);

Array.prototype.diff = function(a) {
    return this.filter(function(i) {return a.indexOf(i) < 0;});
};

new Vue({
    el: '#app',
    data: {
        events: [],
        dic: dc,
        years: [],
        year:'now',
        filters: {
            dateStart: '',
            dateEnd: '',
            title: '',
            type: [], // выпадающий список  с множественным выбором (ВСсМН)
            state: [], // ВСсМН
            series: [],  //ВСсМН
            place: '',
            desc: ''
        }
    },
    created: function () {
        this.fetchData();
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
            //todo: обдумать реализацию, найти решение получше!
            const o = {
                year : Number(date.slice(6,10)),
                day : Number(date.slice(0,2)),
                month : Number(date.slice(3,5)) - 1, // for constructor Date argument month is beginning with 0 for January to 11 for December.
                hours : Number(date.slice(11,13)),
                minutes : Number(date.slice(-2)),
            };
            return  new Date (o.year, o.month, o.day, o.hours, o.minutes);
        },
        translate: function (field, value) {
            return this.dic[field][value];
        },
        transformForSelect: function (obj) {
            let data = [];
            for (let key in obj){
                data.push({label: obj[key], value: key});
            }
            return data;
        },
        computeFiltersArr: function() {
            let arr = [];
            const filtres = this.filters;
            for (key in filtres){
                if (filtres[key]){
                    if (Array.isArray(filtres[key])) {
                        arr = arr.concat(arr, filtres[key].map(item => item.value));
                    } else if (key == 'dateStart' || key == 'dateStart'){
                        const d = new Date (filtres[key]);
                        const options = { day: '2-digit', month: '2-digit',year: 'numeric'};
                        arr.push(d.toLocaleDateString('ru-RU', options));
                    } else {
                        arr.push(filtres[key]);
                    }
                }
            }
            arr = arr.filter((elem, pos, ar) => {
                return ar.indexOf(elem) == pos;
            });
            return arr;
        }
    },
    computed: {
        filteredEvents: function () {
            //todo: нужно определить логику фильтрации для текстовых полей и списков: объединение совпадений или пересечение

            let data;
            if (this.year === 'now') {
                data = this.events.filter( row => {
                    return this.getUnix(row.date) > Date.now();
                });
            } else {
                data = this.events.filter( row => {
                    return this.getUnix(row.date).getFullYear() === Number(this.year);
                });
            }

            const filters = this.computeFiltersArr();

            if (filters.length > 0){
                data = data.filter( row => {
                    let values = Object.keys(row).map(key => row[key]);
                    return filters.diff(values).length == 0
                });
            }
            return data
        }
    }
});