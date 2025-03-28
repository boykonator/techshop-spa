import { defineStore } from 'pinia';

export const useCatalogStore = defineStore('counter', () => {
    const catalog = [
        { "title": "Бытовая техника", "url": "bytovaya-tehnika" },
        { "title": "Красота и здоровье", "url": "krasota-i-zdorovye" },
        { "title": "Смартфоны и фототехника", "url": "smartfony-i-fototehnika" },
        { "title": "ТВ, консоли и аудио", "url": "tv-konsoli-i-audio" },
        { "title": "ПК, ноутбуки, периферия", "url": "pc-noutbuki-periferiya" },
        { "title": "Комплектующие для ПК", "url": "komplektuyushchie-dlya-pk" },
        { "title": "Офис и мебель", "url": "ofis-i-mebel" },
        { "title": "Сетевое оборудование", "url": "setevoe-oborudovanie" },
        { "title": "Отдых и развлечения", "url": "otdykh-i-razvlecheniya" },
        { "title": "Инструмент и стройка", "url": "instrument-i-stroyka" },
        { "title": "Садовая техника", "url": "sadovaya-tehnika" },
        { "title": "Дом, декор и посуда", "url": "dom-dekor-i-posuda" },
        { "title": "Умный дом", "url": "umnyy-dom" },
        { "title": "Автотовары", "url": "avtotovary" },
        { "title": "Аксессуары и услуги", "url": "aksessuary-i-uslugi" },
        { "title": "Расширяем ассортимент", "url": "rasshiryayem-assortiment" },
        { "title": "Уценённые товары", "url": "utsenennye-tovary" }
    ]

    return { catalog }
})