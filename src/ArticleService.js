import axios from 'axios';

let url = 'http://localhost:5000/api/articles/';

class ArticleService {

    static getArticle(){
        return new Promise(async (resolve,reject) =>{
            try{
                const res = await axios.get(url);
                const data = res.data;
                resolve(
                    data.map(article =>({
                        id : article._id,
                        Name : article.Name,
                        Desc : article.Desc,
                        Qte : article.Qte,
                        CreatedAt : new Date( article.CreatedAt)

                    }))
                )
            }catch(err){
                reject(err);
            }
        })
    }

    static getArticleSortedAsc(){
        let asc ='sortedAsc'
        return new Promise(async (resolve,reject) =>{
            try{
                const res = await axios.get(`${url}${asc}`);
                const data = res.data;
                resolve(
                    data.map(article =>({
                        id : article._id,
                        Name : article.Name,
                        Desc : article.Desc,
                        Qte : article.Qte,
                        CreatedAt : new Date( article.CreatedAt)

                    }))
                )
            }catch(err){
                reject(err);
            }
        })
    }
    static getArticleSortedDesc(){
        let desc = 'sortedDesc'
        return new Promise(async (resolve,reject) =>{
            try{
                const res = await axios.get(`${url}${desc}`);
                const data = res.data;
                resolve(
                    data.map(article =>({
                        id : article._id,
                        Name : article.Name,
                        Desc : article.Desc,
                        Qte : article.Qte,
                        CreatedAt : new Date( article.CreatedAt)

                    }))
                )
            }catch(err){
                reject(err);
            }
        })
    }

    static getOneArticle(id){
        return new Promise(async (resolve,reject) =>{
            try{
                const res = await axios.get(`${url}${id}`);
                const data = res.data;
                resolve(
                    data.map(article =>({
                        id : article._id,
                        Name : article.Name,
                        Desc : article.Desc,
                        Qte : article.Qte,
                        CreatedAt : new Date(article.CreatedAt)
                    }))
                )
            }catch(err){
                reject(err);
            }
        })
    }
    static SearchArticle(name){
        return new Promise(async (resolve,reject) =>{
            try{
                const res = await axios.get(`${url}${name}`);
                const data = res.data;
                resolve(
                    data.map(article =>({
                        id : article._id,
                        Name : article.Name,
                        Desc : article.Desc,
                        Qte : article.Qte,
                        CreatedAt : new Date(article.CreatedAt)
                    }))
                )
            }catch(err){
                reject(err);
            }
        })
    }

    static createArticle(Name,Desc,Qte){
        return axios.post(url,{
            Name,
            Desc,
            Qte
        })
    }

    static updateArticle(id,Name,Desc,Qte){
        return axios.put(`${url}${id}`,{
            Name,
            Desc,
            Qte
        }) 
    }

    static deleteArticle(id){
        return axios.delete(`${url}${id}`);
    }

}

export default ArticleService
