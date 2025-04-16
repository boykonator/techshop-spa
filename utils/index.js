const transliterate = (text) => {
    const translitMap = {
        'А': 'A', 'Б': 'B', 'В': 'V', 'Г': 'G', 'Д': 'D', 'Е': 'E', 'Ё': 'YO', 'Ж': 'ZH', 'З': 'Z',
        'И': 'I', 'Й': 'Y', 'К': 'K', 'Л': 'L', 'М': 'M', 'Н': 'N', 'О': 'O', 'П': 'P', 'Р': 'R',
        'С': 'S', 'Т': 'T', 'У': 'U', 'Ф': 'F', 'Х': 'KH', 'Ц': 'TS', 'Ч': 'CH', 'Ш': 'SH', 'Щ': 'SCH',
        'Ь': '', 'Ы': 'Y', 'Ъ': '', 'Э': 'E', 'Ю': 'YU', 'Я': 'YA', 'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g',
        'д': 'd', 'е': 'e', 'ё': 'yo', 'ж': 'zh', 'з': 'z', 'и': 'i', 'й': 'y', 'к': 'k', 'л': 'l',
        'м': 'm', 'н': 'n', 'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u', 'ф': 'f', 'х': 'h',
        'ц': 'ts', 'ч': 'ch', 'ш': 'sh', 'щ': 'sch', 'ь': '', 'ы': 'y', 'ъ': '', 'э': 'e', 'ю': 'yu', 'я': 'ya',
        ' ': '-', ',': '',
    }

    return text
        .trim()
        .split('')
        .map(char => translitMap.hasOwnProperty(char) ? translitMap[char] : char)
        .filter(char => char !== undefined && char !== '')
        .join('')
}

export const createCatalogLinks = (title) => {
    const url = transliterate(title).toLowerCase()
    const trimmedTitle = title.trim()

    return {
        title: trimmedTitle.charAt(0).toUpperCase() + trimmedTitle.slice(1),
        url,
    }
}

export const createProductData = (title) => {
    const url = transliterate(title).toLowerCase()

    const trimmedTitle = title.trim()

    const brand = trimmedTitle.split(' ')[0].toLowerCase()

    const titleToUppercase = trimmedTitle
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')

    return {
        title: titleToUppercase,
        brand,
        url
    }
}


// const catalogLinks = createCatalogLinks(catalog);
//
// fs.writeFile('array.txt', JSON.stringify(catalogLinks), (err) => {
//     if (err) console.error(err);
//     else console.log('success')
// })

export default {
    createCatalogLinks, createProductData
}