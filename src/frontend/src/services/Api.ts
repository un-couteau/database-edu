import React from "react";
import NewsItem from "../dto/NewsItem";

const BASE_URL = 'http://localhost:8080';

class ApiService {
        async getNewsList(): Promise<NewsItem[]> {
        let url = BASE_URL + '/news';
        const queryParameters = new URLSearchParams(window.location.search)
        const limit = queryParameters.get('limit')
        const page = queryParameters.get('page')

        if (limit !== null) {
            url += '?limit=' + limit;
        }

        if (page !== null) {
            url += '&page=' + page;
        }
        

        return fetch(url)
            .then(response => {
                return response.json();
            })
            .then((json: Array<NewsItem>) => {
                return json.map(item => {
                    return new NewsItem(
                        item.id,
                        item.alias,
                        item.title,
                        item.anonce,
                        item.description,
                        new Date(item.public_at),
                        item.image
                    );
                });
            })
            .catch(() => {
                return [];
            });
    }
    async getNewsByAlias(alias:string): Promise<NewsItem|null> {
        return fetch(BASE_URL + '/news/get_by_alias/' + alias)
            .then(response => {
                return response.json();
            })
            .then((item: NewsItem) => {
                return new NewsItem(
                    item.id,
                    item.alias,
                    item.title,
                    item.anonce,
                    item.description,
                    new Date(item.public_at),
                    item.image
                );
            })
            .catch(()=>{
                return null;
            });
    }
    async getNewsById(id:number): Promise<NewsItem|null> {
        return fetch(BASE_URL + '/news/get_by_id/' + id)
            .then(response => {
                return response.json();
            })
            .then((item: NewsItem) => {
                return new NewsItem(
                    item.id,
                    item.alias,
                    item.title,
                    item.anonce,
                    item.description,
                    new Date(item.public_at),
                    item.image
                );
            })
            .catch(()=>{
                return null;
            });
    }
}

const Api = new ApiService();

export default Api;