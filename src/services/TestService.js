

export async function fetchTestNews(query) {

    const data1 = {
            "status": "ok",
            "totalResults": 8488,
        "articles": [
        {
        "source": {
        "id": null,
            "name": "New Atlas"
            },
            "author": "Nick Lavars",
                "title": "Test",
                "description": "Test descr",
                "url": "https://newatlas.com/automotive/pikes-peak-2020-unlimited-winner-tesla-model-3/",
                "urlToImage": "https://assets.newatlas.com/dims4/default/d0ffdd1/2147483647/strip/true/crop/1299x682+0+92/resize/1200x630!/quality/90/?url=http%3A%2F%2Fnewatlas-brightspot.s3.amazonaws.com%2F59%2Fa9%2F58d1de8a48f2946aa7cd6e718f48%2Feneos-evs-tesla-sow-edit-018-20mwsmall.jpg",
                "publishedAt": "2021-06-24T06:39:53Z",
                "content": "hello"
        },
            {
                "source": {
                    "id": null,
                    "name": "New Atlas"
                },
                "author": "Nick Lavars",
                "title": "Test 1",
                "description": "Test descr ",
                "url": "https://newatlas.com/automotive/pikes-peak-2020-unlimited-winner-tesla-model-3/",
                "urlToImage": "https://assets.newatlas.com/dims4/default/d0ffdd1/2147483647/strip/true/crop/1299x682+0+92/resize/1200x630!/quality/90/?url=http%3A%2F%2Fnewatlas-brightspot.s3.amazonaws.com%2F59%2Fa9%2F58d1de8a48f2946aa7cd6e718f48%2Feneos-evs-tesla-sow-edit-018-20mwsmall.jpg",
                "publishedAt": "2021-06-24T06:39:53Z",
                "content": "hello 1"
            },
            {
                "source": {
                    "id": null,
                    "name": "New Atlas"
                },
                "author": "Nick Lavars",
                "title": "Test 2",
                "description": "Test descr 2",
                "url": "https://newatlas.com/automotive/pikes-peak-2020-unlimited-winner-tesla-model-3/",
                "urlToImage": "https://assets.newatlas.com/dims4/default/d0ffdd1/2147483647/strip/true/crop/1299x682+0+92/resize/1200x630!/quality/90/?url=http%3A%2F%2Fnewatlas-brightspot.s3.amazonaws.com%2F59%2Fa9%2F58d1de8a48f2946aa7cd6e718f48%2Feneos-evs-tesla-sow-edit-018-20mwsmall.jpg",
                "publishedAt": "2021-06-24T06:39:53Z",
                "content": "hello 2"
            },
            {
                "source": {
                    "id": null,
                    "name": "New Atlas"
                },
                "author": "Nick Lavars",
                "title": "Test 232432zzzzz",
                "description": "Test descr 2",
                "url": "https://newatlas.com/automotive/pikes-peak-2020-unlimited-winner-tesla-model-3/",
                "urlToImage": "https://assets.newatlas.com/dims4/default/d0ffdd1/2147483647/strip/true/crop/1299x682+0+92/resize/1200x630!/quality/90/?url=http%3A%2F%2Fnewatlas-brightspot.s3.amazonaws.com%2F59%2Fa9%2F58d1de8a48f2946aa7cd6e718f48%2Feneos-evs-tesla-sow-edit-018-20mwsmall.jpg",
                "publishedAt": "2021-06-27T06:39:53Z",
                "content": "hello 2"
            },
    ]
}
    const data2 = {
        "status": "ok",
        "totalResults": 1111,
        "articles": [
            {
                "source": {
                    "id": null,
                    "name": "New Atlas"
                },
                "author": "Nick Lavars",
                "title": "Test 222",
                "description": "Test descr 2222",
                "url": "https://newatlas.com/automotive/pikes-peak-2020-unlimited-winner-tesla-model-3/",
                "urlToImage": "https://assets.newatlas.com/dims4/default/d0ffdd1/2147483647/strip/true/crop/1299x682+0+92/resize/1200x630!/quality/90/?url=http%3A%2F%2Fnewatlas-brightspot.s3.amazonaws.com%2F59%2Fa9%2F58d1de8a48f2946aa7cd6e718f48%2Feneos-evs-tesla-sow-edit-018-20mwsmall.jpg",
                "publishedAt": "2021-06-24T06:39:53Z",
                "content": "hello 2222"
            },
            {
                "source": {
                    "id": null,
                    "name": "New Atlas"
                },
                "author": "Nick Lavars",
                "title": "Test 2344",
                "description": "Test descr 22324",
                "url": "https://newatlas.com/automotive/pikes-peak-2020-unlimited-winner-tesla-model-3/",
                "urlToImage": "https://assets.newatlas.com/dims4/default/d0ffdd1/2147483647/strip/true/crop/1299x682+0+92/resize/1200x630!/quality/90/?url=http%3A%2F%2Fnewatlas-brightspot.s3.amazonaws.com%2F59%2Fa9%2F58d1de8a48f2946aa7cd6e718f48%2Feneos-evs-tesla-sow-edit-018-20mwsmall.jpg",
                "publishedAt": "2021-06-24T06:39:53Z",
                "content": "hello 2344"
            },
            {
                "source": {
                    "id": null,
                    "name": "New Atlas"
                },
                "author": "Nick Lavars",
                "title": "Test 4545656",
                "description": "Test descr 456546",
                "url": "https://newatlas.com/automotive/pikes-peak-2020-unlimited-winner-tesla-model-3/",
                "urlToImage": "https://assets.newatlas.com/dims4/default/d0ffdd1/2147483647/strip/true/crop/1299x682+0+92/resize/1200x630!/quality/90/?url=http%3A%2F%2Fnewatlas-brightspot.s3.amazonaws.com%2F59%2Fa9%2F58d1de8a48f2946aa7cd6e718f48%2Feneos-evs-tesla-sow-edit-018-20mwsmall.jpg",
                "publishedAt": "2021-06-24T06:39:53Z",
                "content": "hello 456567"
            },
        ]
    }

    return new Promise((resolve) => {
        if(query === 'test'){
            setTimeout(()=> resolve(data1), 2000 )
        }
        if(query === 'test1'){
            setTimeout(()=> resolve(data2), 2000 )
        }
    })

}