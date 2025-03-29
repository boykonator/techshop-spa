import {defineStore} from 'pinia';

export const useCatalogStore = defineStore('counter', () => {
    const catalog = [
        {title: "Бытовая техника", url: "bytovaya-tehnika"},
        {title: "Красота и здоровье", url: "krasota-i-zdorovye"},
        {title: "Смартфоны и фототехника", url: "smartfony-i-fototehnika"},
        {title: "ТВ, консоли и аудио", url: "tv-konsoli-i-audio"},
        {title: "ПК, ноутбуки, периферия", url: "pc-noutbuki-periferiya"},
        {title: "Комплектующие для ПК", url: "komplektuyushchie-dlya-pk"},
        {title: "Офис и мебель", url: "ofis-i-mebel"},
        {title: "Сетевое оборудование", url: "setevoe-oborudovanie"},
        {title: "Отдых и развлечения", url: "otdykh-i-razvlecheniya"},
        {title: "Инструмент и стройка", url: "instrument-i-stroyka"},
        {title: "Садовая техника", url: "sadovaya-tehnika"},
        {title: "Дом, декор и посуда", url: "dom-dekor-i-posuda"},
        {title: "Умный дом", url: "umnyy-dom"},
        {title: "Автотовары", url: "avtotovary"},
        {title: "Аксессуары и услуги", url: "aksessuary-i-uslugi"},
        {title: "Расширяем ассортимент", url: "rasshiryayem-assortiment"},
        {title: "Уценённые товары", url: "utsenennye-tovary"}
    ]

    const bytovaya_tehnika = [
        {"title": "Встраиваемая техника", "url": "/catalog/vstraivaemaya-tekhnika"},
        {"title": "Варочные панели", "url": "/catalog/varochnye-paneli"},
        {"title": "Духовые шкафы", "url": "/catalog/dukhovye-shkafy"},
        {"title": "Вытяжки", "url": "/catalog/vytyazhki"},
        {"title": "Встраиваемые микроволновые печи", "url": "/catalog/vstraivaemye-mikrovolnovye-pechi"},
        {"title": "Встраиваемые холодильники", "url": "/catalog/vstraivaemye-kholodilniki"},
        {"title": "Встраиваемые морозильные шкафы", "url": "/catalog/vstraivaemye-morozilnye-shkafy"},
        {"title": "Встраиваемые посудомоечные машины", "url": "/catalog/vstraivaemye-posudomoechnye-mashiny"},
        {"title": "Встраиваемые стиральные машины", "url": "/catalog/vstraivaemye-stiralnye-mashiny"},
        {"title": "Комплекты встраиваемой техники", "url": "/catalog/komplekty-vstraivaemoy-tekhniki"},
        {"title": "Встраиваемые винные шкафы", "url": "/catalog/vstraivaemye-vinnye-shkafy"},
        {"title": "Встраиваемые кофемашины", "url": "/catalog/vstraivaemye-kofemashiny"},
        {"title": "Встраиваемые вакуумизаторы", "url": "/catalog/vstraivaemye-vakuumizatory"},
        {"title": "Встраиваемые подогреватели для посуды", "url": "/catalog/vstraivaemye-podogrevateli-dlya-posudy"},
        {"title": "Чистящие средства для кухни", "url": "/catalog/chistyaschie-sredstva-dlya-kukhni"}
    ]

    const activeTab = 'bytovaya-tehnika'

    return {catalog, bytovaya_tehnika, activeTab}
})