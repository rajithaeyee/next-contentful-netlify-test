
import * as contentful from "contentful";

export const client = contentful.createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

let allArticles = [];
export async function getAllArticles(){
  const entries = await client.getEntries({content_type: "blogArticles"});
  allArticles = entries.items;
  return allArticles;
}

export async function getArticle(slug){
  if(allArticles.length === 0){
    allArticles = await getAllArticles();
  }
  return allArticles.find(article=> article.fields.slug === slug);
}