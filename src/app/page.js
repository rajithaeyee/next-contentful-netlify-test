import Image from "next/image";
import Link from "next/link";
import { getAllArticles } from "./lib/api";

export default async function Home() {
  const articles = await getAllArticles();
  return (
    <main>
            <header className="bg-gradient-to-r from-[#022630] to-[#11495A] text-white py-20">
        <div className="container mx-auto text-center px-6">
          <h1 className="text-5xl font-bold tracking-tight sm:text-6xl mb-4">
            Welcome to Our Blog
          </h1>
          <p className="text-xl sm:text-2xl max-w-3xl mx-auto">
            Discover insightful articles, tutorials, and stories to enhance your development skills.
          </p>
        </div>
      </header>

      <div className="container mx-auto p-6">
      <h2 className="text-4xl font-bold text-center mb-12">Latest Articles</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map((article) => (
          <div
            key={article.fields.slug}
            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            {/* Cover Image */}
            <Image
              src={`https://${article.fields.cover.fields.file.url}`}
              className="w-full h-48 object-cover"
              height={590}
              width={722}
              slug={article.fields.slug}
              alt={article.fields.slug}
            />
            <div className="p-6">
              {/* Title */}
              <h3 className="text-2xl font-semibold text-gray-800">{article.fields.title}</h3>

              {/* Author & Date */}
              <p className="text-sm text-gray-500 mt-2">
                by {article.fields.author} | {new Date(article.fields.date).toLocaleDateString()}
              </p>

              {/* Summary */}
              <p className="text-gray-600 mt-4">{article.fields.summary}</p>

              {/* Read More Link */}
              <Link
                href={`/articles/${article.fields.slug}`}
                className="text-blue-600 hover:text-blue-800 mt-4 inline-block"
              >
                Read More
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
    </main>
  );
}