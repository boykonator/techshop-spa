import fs from 'fs';

const catalog = [
    "Встраиваемая техника",
    "Варочные панели",
    "Духовые шкафы",
    "Вытяжки",
    "Встраиваемые микроволновые печи",
    "Встраиваемые холодильники",
    "Встраиваемые морозильные шкафы",
    "Встраиваемые посудомоечные машины",
    "Встраиваемые стиральные машины",
    "Комплекты встраиваемой техники",
    "Встраиваемые винные шкафы",
    "Встраиваемые кофемашины",
    "Встраиваемые вакуумизаторы",
    "Встраиваемые подогреватели для посуды",
    "Чистящие средства для кухни",
]

const transliterate = (text) => {
    const translitMap = {
        'А': 'A', 'Б': 'B', 'В': 'V', 'Г': 'G', 'Д': 'D', 'Е': 'E', 'Ё': 'YO', 'Ж': 'ZH', 'З': 'Z',
        'И': 'I', 'Й': 'Y', 'К': 'K', 'Л': 'L', 'М': 'M', 'Н': 'N', 'О': 'O', 'П': 'P', 'Р': 'R',
        'С': 'S', 'Т': 'T', 'У': 'U', 'Ф': 'F', 'Х': 'KH', 'Ц': 'TS', 'Ч': 'CH', 'Ш': 'SH', 'Щ': 'SCH',
        'Ь': '', 'Ы': 'Y', 'Ъ': '', 'Э': 'E', 'Ю': 'YU', 'Я': 'YA', 'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g',
        'д': 'd', 'е': 'e', 'ё': 'yo', 'ж': 'zh', 'з': 'z', 'и': 'i', 'й': 'y', 'к': 'k', 'л': 'l',
        'м': 'm', 'н': 'n', 'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u', 'ф': 'f', 'х': 'h',
        'ц': 'ts', 'ч': 'ch', 'ш': 'sh', 'щ': 'sch', 'ь': '', 'ы': 'y', 'ъ': '', 'э': 'e', 'ю': 'yu', 'я': 'ya',
        ' ': '-'
    }
    return text.split('').map(char => translitMap[char] || char).join('')
}

export const createCatalogLinks = (catalog) => {
    return catalog.map(item => {
        const link = transliterate(item).toLowerCase()
        return {
            title: item.charAt(0).toUpperCase() + item.slice(1),
            url: `${link}`
        }
    })
}


// const catalogLinks = createCatalogLinks(catalog);
//
// fs.writeFile('array.txt', JSON.stringify(catalogLinks), (err) => {
//     if (err) console.error(err);
//     else console.log('success')
// })

export default createCatalogLinks;