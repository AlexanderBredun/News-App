

const API_BASE_URL = 'https://newsapi.org/v2/everything'
const API_KEY = 'f29f3cf158584f3f9f7ca50e09e2121d'
const lang = navigator.language.match(/[a-z]{2}/)[0];

const passibleLangs = ['ar', 'de', 'en', 'es', 'fr', 'he', 'it', 'nl', 'no', 'pt', 'ru', 'se', 'ud', 'zh']

export async function fetchNews(query) {

    return await fetch(`${API_BASE_URL}?q=${query}&apiKey=${API_KEY}&language=${passibleLangs.includes(lang) ? lang : 'en'}&sortBy=relevancy`)
        .then(data => data.json())
        .catch((e) => e)

}