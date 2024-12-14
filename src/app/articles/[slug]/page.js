import { getArticle } from "./../../lib/api";
import Image from "next/image";
import Link from "next/link";
export default async function Article({params}) {

   const {slug} = await params;
   const fullArticle = await getArticle(slug);
    return (
        <div className="container mx-auto p-6">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-8">
        <Image
          src={`https://${fullArticle.fields.cover.fields.file.url}`}
          className="w-full h-72 object-cover"
          height={720}
          width={1080}
          alt={slug}
        />
        <div className="p-6">
          <h1 className="text-3xl font-bold text-gray-800">{fullArticle.fields.title}</h1>
          <p className="text-sm text-gray-500 mt-2">
            by {fullArticle.fields.author} | {new Date(fullArticle.fields.date).toLocaleDateString()}
          </p>
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="prose max-w-none">
          <p>{fullArticle.fields.details.content[0].content[0].value}</p>
        </div>
        <div className="mt-6">
          <Link
            href="/"
            className="text-blue-600 hover:text-blue-800 inline-block"
          >
            Back to Articles
          </Link>
        </div>
      </div>
    </div>
    )
}