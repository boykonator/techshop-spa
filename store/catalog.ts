import {defineStore} from 'pinia';

export const useCatalogStore = defineStore('counter', () => {
    const catalog = [
        {"title": "Бытовая техника", "url": "bytovaya-tehnika"},
        {"title": "Красота и здоровье", "url": "krasota-i-zdorovye"},
        {"title": "Смартфоны и фототехника", "url": "smartfony-i-fototehnika"},
        {"title": "ТВ, консоли и аудио", "url": "tv-konsoli-i-audio"},
        {"title": "ПК, ноутбуки, периферия", "url": "pc-noutbuki-periferiya"},
        {"title": "Комплектующие для ПК", "url": "komplektuyushchie-dlya-pk"},
        {"title": "Офис и мебель", "url": "ofis-i-mebel"},
        {"title": "Сетевое оборудование", "url": "setevoe-oborudovanie"},
        {"title": "Отдых и развлечения", "url": "otdyh-i-razvlecheniya"},
        {"title": "Инструмент и стройка", "url": "instrument-i-stroyka"},
        {"title": "Садовая техника", "url": "sadovaya-tehnika"},
        {"title": "Дом, декор и посуда", "url": "dom-dekor-i-posuda"},
        {"title": "Умный дом", "url": "umnyy-dom"},
        {"title": "Автотовары", "url": "avtotovary"},
        {"title": "Аксессуары и услуги", "url": "aksessuary-i-uslugi"},
        {"title": "Расширяем ассортимент", "url": "rasshiryayem-assortiment"},
        {"title": "Уценённые товары", "url": "utsenennye-tovary"}
    ]

    const categories = ref({
        "bytovaya-tehnika": [
            { title: "Встраиваемая техника", url: "/catalog/vstraivaemaya-tehnika", subcategories: [
                    { title: "Варочные панели", url: "/catalog/varochnye-paneli" },
                    { title: "Духовые шкафы", url: "/catalog/duhovye-shkafy" },
                    { title: "Вытяжки", url: "/catalog/vytyazhki" },
                    { title: "Встраиваемые микроволновые печи", url: "/catalog/vstraivaemye-mikrovolnovye-pechi" },
                    { title: "Встраиваемые холодильники", url: "/catalog/vstraivaemye-holodilniki" },
                    { title: "Встраиваемые морозильные шкафы", url: "/catalog/vstraivaemye-morozilnye-shkafy" },
                    { title: "Встраиваемые посудомоечные машины", url: "/catalog/vstraivaemye-posudomoechnye-mashiny" },
                    { title: "Встраиваемые стиральные машины", url: "/catalog/vstraivaemye-stiralnye-mashiny" },
                    { title: "Комплекты встраиваемой техники", url: "/catalog/komplekty-vstraivaemoy-tehniki" },
                    { title: "Встраиваемые винные шкафы", url: "/catalog/vstraivaemye-vinnye-shkafy" },
                    { title: "Встраиваемые кофемашины", url: "/catalog/vstraivaemye-kofemashiny" },
                    { title: "Встраиваемые вакуумизаторы", url: "/catalog/vstraivaemye-vakuumizatory" },
                    { title: "Встраиваемые подогреватели для посуды", url: "/catalog/vstraivaemye-podogrevateli-dlya-posudy" },
                    { title: "Чистящие средства для кухни", url: "/catalog/chistyaschie-sredstva-dlya-kuhni" }
                ]
            },
            { title: "Техника для кухни", url: "/catalog/tehnika-dlya-kuhni", subcategories: [
                    { title: "Плиты, СВЧ и печи", url: "/catalog/plity-svch-i-pechi" },
                    { title: "Холодильное оборудование", url: "/catalog/holodilnoe-oborudovanie" },
                    { title: "Посудомоечные машины", url: "/catalog/posudomoechnye-mashiny" },
                    { title: "Приготовление напитков", url: "/catalog/prigotovlenie-napitkov" },
                    { title: "Электрочайники и термопоты", url: "/catalog/elektrochayniki-i-termopoty" },
                    { title: "Нарезка и смешивание", url: "/catalog/narezka-i-smeshivanie" },
                    { title: "Грили, сэндвичницы, шашлычницы", url: "/catalog/grili-sendvichnitsy-shashlychnitsy" },
                    { title: "Фритюрницы и тостеры", url: "/catalog/frityurnitsy-i-tostery" },
                    { title: "Мультиварки и техника для варки", url: "/catalog/multivarki-i-tehnika-dlya-varki" },
                    { title: "Приготовление десертов", url: "/catalog/prigotovlenie-desertov" },
                    { title: "Вакуумная упаковка", url: "/catalog/vakuumnaya-upakovka" },
                    { title: "Измерения", url: "/catalog/izmereniya" },
                    { title: "Измельчение пищевых отходов", url: "/catalog/izmельchenie-pishchevyh-othodov" },
                    { title: "Домашние заготовки", url: "/catalog/domashnie-zagotovki" },
                    { title: "Супницы и мармиты", url: "/catalog/supnitsy-i-marmity" },
                    { title: "Сушка овощей и фруктов", url: "/catalog/sushka-ovoschey-i-fruktov" },
                    { title: "Прочая техника для кухни", url: "/catalog/prochaya-tehnika-dlya-kuhni" },
                    { title: "Посуда и кухонные предметы", url: "/catalog/posuda-i-kuhonnye-predmety" }
                ]}

        ],
    })

    const activeTab = ref('bytovaya-tehnika')

    return {
        catalog,
        categories,
        activeTab,
    }
})